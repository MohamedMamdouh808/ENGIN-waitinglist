import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

// Browser client — uses the public anon key only. Only ever reads data
// that's already safe to expose (see the RLS policies in
// supabase/schema.sql). All writes go through /api/waitlist instead.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseBrowser = createClient<Database>(url, anonKey, {
  auth: { persistSession: false },
});
