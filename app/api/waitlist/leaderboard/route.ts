import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { publicLabel } from "@/lib/mask";
import type { LeaderboardEntry } from "@/lib/types";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  const db = supabaseAdmin();
  // waitlist_leaderboard only ever leaves the server as resolved labels —
  // email_normalized is used for masking here and never returned.
  const { data, error } = await db
    .from("waitlist_leaderboard")
    .select("id, display_alias, display_name, email_normalized, referral_count, rank");

  if (error) {
    console.error("[leaderboard] fetch failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const entries: LeaderboardEntry[] = (data ?? []).map((row) => ({
    id: row.id,
    label: publicLabel({
      displayName: row.display_name,
      emailNormalized: row.email_normalized,
      displayAlias: row.display_alias,
    }),
    referral_count: row.referral_count,
    rank: row.rank,
  }));
  return NextResponse.json({ entries });
}
