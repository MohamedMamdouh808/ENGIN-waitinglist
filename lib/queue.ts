// The one queue rule ENGIN uses, in plain language:
//
//   Position is ordered by signup time. Each verified referral moves
//   you forward by REFERRAL_BOOST positions worth of priority.
//
// This constant must match the multiplier baked into the
// `waitlist_queue` view in supabase/schema.sql (referral_count * 25).
// It's duplicated here only so the UI copy can state the real number
// instead of a guess — the database is still the source of truth for
// the actual position.
export const REFERRAL_BOOST = 25;
