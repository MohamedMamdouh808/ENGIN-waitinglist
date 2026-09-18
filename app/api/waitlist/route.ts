import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isValidEmail, isValidReferralCode, normalizeEmail } from "@/lib/validation";
import { generateReferralCode, displayAliasFrom, referralLink } from "@/lib/referral";
import type { WaitlistState } from "@/lib/types";

export const runtime = "nodejs";

// Simple in-memory rate limit per IP — good enough for a waitlist form.
// A real deployment behind a CDN should also rate-limit at the edge.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 8;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

async function queuePositionFor(id: string): Promise<number> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("waitlist_queue")
    .select("queue_position")
    .eq("id", id)
    .single();
  if (error || !data) return 0;
  return data.queue_position as number;
}

function siteUrl(req: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: { code: "server_error", message: "Too many attempts. Try again in a minute." } },
      { status: 429 }
    );
  }

  let body: { email?: string; ref?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_email", message: "Enter a valid email address." } },
      { status: 400 }
    );
  }

  const rawEmail = body.email ?? "";
  if (!isValidEmail(rawEmail)) {
    return NextResponse.json(
      { error: { code: "invalid_email", message: "Enter a valid email address." } },
      { status: 400 }
    );
  }

  const email = normalizeEmail(rawEmail);
  const db = supabaseAdmin();

  // Resolve the referral code, if any, to an actual referrer row.
  let referrer: { id: string; referral_code: string; email_normalized: string } | null = null;
  const rawRef = (body.ref ?? "").trim();
  if (rawRef) {
    if (!isValidReferralCode(rawRef)) {
      return NextResponse.json(
        { error: { code: "invalid_referral_code", message: "That referral link doesn't look right." } },
        { status: 400 }
      );
    }
    const { data: refRow } = await db
      .from("waitlist_users")
      .select("id, referral_code, email_normalized")
      .eq("referral_code", rawRef.toUpperCase())
      .maybeSingle();

    if (!refRow) {
      return NextResponse.json(
        { error: { code: "invalid_referral_code", message: "That referral link doesn't look right." } },
        { status: 400 }
      );
    }
    if (refRow.email_normalized === email) {
      return NextResponse.json(
        { error: { code: "self_referral", message: "You can't refer yourself." } },
        { status: 400 }
      );
    }
    referrer = refRow;
  }

  // Generate a referral code, retrying on the rare unique-constraint collision.
  let newUser: { id: string; referral_code: string } | null = null;
  let insertError: { code?: string; message: string } | null = null;

  for (let attempt = 0; attempt < 5 && !newUser; attempt++) {
    const referral_code = generateReferralCode();
    const { data, error } = await db
      .from("waitlist_users")
      .insert({
        email,
        referral_code,
        referred_by: referrer?.referral_code ?? null,
        display_alias: "pending",
      })
      .select("id, referral_code")
      .single();

    if (data) {
      newUser = data;
      break;
    }

    insertError = error;
    // 23505 = unique_violation. Figure out which constraint failed.
    if (error?.code === "23505") {
      if (error.message.includes("email_normalized")) {
        // Already registered — return their existing state instead of erroring.
        const { data: existing } = await db
          .from("waitlist_users")
          .select("id, referral_code, referred_by, referral_count, display_alias, created_at")
          .eq("email_normalized", email)
          .single();

        if (existing) {
          const queue_position = await queuePositionFor(existing.id);
          const state: WaitlistState = {
            ...existing,
            queue_position,
            referral_link: referralLink(siteUrl(req), existing.referral_code),
          };
          return NextResponse.json({ already_registered: true, state });
        }
      }
      // Otherwise it was a referral_code collision — loop and retry with a new code.
      continue;
    }
    break;
  }

  if (!newUser) {
    return NextResponse.json(
      { error: { code: "server_error", message: insertError?.message ?? "Signup failed. Try again." } },
      { status: 500 }
    );
  }

  // Set a stable, privacy-safe display alias now that we have a real id.
  const display_alias = displayAliasFrom(newUser.id);
  await db.from("waitlist_users").update({ display_alias }).eq("id", newUser.id);

  // Credit the referrer exactly once. The unique constraint on
  // referral_events.referred_id makes a duplicate credit for this
  // same signup impossible even under a retried request.
  if (referrer) {
    const { error: eventError } = await db
      .from("referral_events")
      .insert({ referrer_id: referrer.id, referred_id: newUser.id });

    if (!eventError) {
      await db.rpc("increment_referral_count", { referrer_id: referrer.id }).then(
        async (res) => {
          if (res.error) {
            // Fallback if the RPC isn't installed: read-modify-write.
            const { data: r } = await db
              .from("waitlist_users")
              .select("referral_count")
              .eq("id", referrer!.id)
              .single();
            await db
              .from("waitlist_users")
              .update({ referral_count: (r?.referral_count ?? 0) + 1 })
              .eq("id", referrer!.id);
          }
        }
      );
    }
  }

  const queue_position = await queuePositionFor(newUser.id);
  const state: WaitlistState = {
    id: newUser.id,
    referral_code: newUser.referral_code,
    referred_by: referrer?.referral_code ?? null,
    referral_count: 0,
    display_alias,
    created_at: new Date().toISOString(),
    queue_position,
    referral_link: referralLink(siteUrl(req), newUser.referral_code),
  };

  return NextResponse.json({ already_registered: false, state });
}
