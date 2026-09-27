import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const revalidate = 0;

// Secret-gated reporting: signups grouped by utm_source.
// Requires ADMIN_SECRET env (never NEXT_PUBLIC_). Pass as:
//   Authorization: Bearer <secret>   or   ?secret=<secret>
export async function GET(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "admin_not_configured" }, { status: 500 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const provided =
    auth.startsWith("Bearer ") ? auth.slice(7) : req.nextUrl.searchParams.get("secret") ?? "";

  if (provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("waitlist_users")
    .select("utm_source, referred_by, created_at");

  if (error || !data) {
    console.error("[admin] signups-by-source failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const bySource: Record<string, number> = {};
  let referred = 0;
  for (const row of data) {
    const key = (row.utm_source || "direct").slice(0, 64);
    bySource[key] = (bySource[key] ?? 0) + 1;
    if (row.referred_by) referred += 1;
  }

  return NextResponse.json({
    total_signups: data.length,
    referred_signups: referred,
    by_source: bySource,
  });
}
