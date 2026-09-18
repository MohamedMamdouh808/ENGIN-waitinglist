import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { LeaderboardEntry } from "@/lib/types";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  const db = supabaseAdmin();
  // waitlist_leaderboard selects only display_alias and referral_count —
  // no email ever leaves the server for this endpoint.
  const { data, error } = await db.from("waitlist_leaderboard").select("*");

  if (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const entries: LeaderboardEntry[] = data ?? [];
  return NextResponse.json({ entries });
}
