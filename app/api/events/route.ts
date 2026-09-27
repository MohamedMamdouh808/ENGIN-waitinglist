import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { normalizeEmail } from "@/lib/validation";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";

export const runtime = "nodejs";

const ALLOWED = new Set(["walkthrough_started", "walkthrough_finished", "signup", "share_click"]);

const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").slice(0, 64);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { name?: string; email?: string; metadata?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name : "";
  if (!ALLOWED.has(name)) {
    return NextResponse.json({ error: "unknown_event" }, { status: 400 });
  }

  const rawEmail = typeof body.email === "string" ? body.email : "";
  const email_normalized = rawEmail.includes("@") ? normalizeEmail(rawEmail) : null;
  const metadata =
    body.metadata && typeof body.metadata === "object" ? body.metadata : {};

  try {
    const db = supabaseAdmin();
    let user_id: string | null = null;
    if (email_normalized) {
      const { data } = await db
        .from("waitlist_users")
        .select("id")
        .eq("email_normalized", email_normalized)
        .maybeSingle();
      user_id = data?.id ?? null;
    }
    await db.from("events").insert({ name, email_normalized, user_id, metadata });
  } catch (err) {
    // Events must never break the product path — log server-side, still 200.
    console.error("[events] insert failed", err);
  }

  return NextResponse.json({ ok: true });
}
