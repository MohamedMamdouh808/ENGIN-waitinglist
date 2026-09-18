import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { StatsPayload } from "@/lib/types";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  const db = supabaseAdmin();
  const { count, error } = await db
    .from("waitlist_users")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const payload: StatsPayload = { total_signups: count ?? 0 };
  return NextResponse.json(payload);
}
