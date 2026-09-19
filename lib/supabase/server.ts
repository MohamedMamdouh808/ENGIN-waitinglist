import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

// Server-only client. Uses the service role key, which bypasses RLS,
// so this file must never be imported from a client component — it is
// only ever used inside app/api/** route handlers.
let cached: ReturnType<typeof createClient<Database>> | null = null;

export function supabaseAdmin() {
  if (cached) return cached;

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    undefined;
  // Vercel Supabase Integration uses different names depending on version:
  // SUPABASE_SERVICE_ROLE_KEY, SUPABASE_SERVICE_KEY, SUPABASE_SECRET_KEY
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_T_SECRET ||
    process.env.SUPABASE_CRET_KEY ||
    undefined;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase server env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or connect the Vercel Supabase Integration)."
    );
  }

  cached = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false },
  });
  return cached;
}
