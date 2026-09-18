import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { referralLink } from "@/lib/referral";
import type { WaitlistState } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") ?? "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ found: false }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data: user } = await db
    .from("waitlist_users")
    .select("id, referral_code, referred_by, referral_count, display_alias, created_at")
    .eq("email_normalized", normalizeEmail(email))
    .maybeSingle();

  if (!user) {
    return NextResponse.json({ found: false });
  }

  const { data: queueRow } = await db
    .from("waitlist_queue")
    .select("queue_position")
    .eq("id", user.id)
    .single();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const state: WaitlistState = {
    ...user,
    queue_position: queueRow?.queue_position ?? 0,
    referral_link: referralLink(siteUrl, user.referral_code),
  };

  return NextResponse.json({ found: true, state });
}
