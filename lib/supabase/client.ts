import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

// Browser client — uses the public anon key only. Only ever reads data
// that's already safe to expose (see the RLS policies in
// supabase/schema.sql). All writes go through /api/waitlist instead.
// Supports both NEXT_PUBLIC_* (your .env) and SUPABASE_* (Vercel Supabase Integration)
// so a 1-click Vercel+Supabase connect works without duplicating vars.
function getBrowserEnv() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    "";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    "";
  return { url, anonKey };
}

const { url, anonKey } = getBrowserEnv();

// Dummy placeholder lets `next build` succeed even if env is not set at build time.
// At runtime LiveCounter falls back to polling /api/waitlist/stats, so the app still works.
export const supabaseBrowser = createClient<Database>(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  {
    auth: { persistSession: false },
  }
);
