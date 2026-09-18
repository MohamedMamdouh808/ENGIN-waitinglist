# ENGIN — waitlist site

A production-structured waitlist site for ENGIN: email signup, live queue
position, unique referral links, a real-time signup counter, a referral
leaderboard, and an interactive six-step walkthrough of how ENGIN turns
plain-English intent into deployed software.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Supabase** (Postgres) for the waitlist, referrals, queue position,
  and leaderboard — this is the source of truth; nothing important is
  computed only in the browser

## What's real vs. mocked

- **Waitlist, referrals, queue position, counter, leaderboard** are all
  real: they read and write actual rows in Postgres via the API routes
  in `app/api/waitlist/`.
- **The six-step walkthrough** (`components/Walkthrough/`) is an
  educational simulation with static "restaurant booking app" data, as
  specified. It is not wired to a real compiler.

## Setup

1. **Create a Supabase project** at supabase.com.
2. **Run the schema.** Open the SQL editor in your Supabase project and
   run the contents of `supabase/schema.sql`. This creates the
   `waitlist_users` and `referral_events` tables, the
   `waitlist_queue` / `waitlist_leaderboard` views, RLS policies, and
   the `increment_referral_count` function.
3. **Copy environment variables.**
   ```
   cp .env.example .env.local
   ```
   Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` —
     from Supabase → Project Settings → API.
   - `SUPABASE_SERVICE_ROLE_KEY` — same page, the service role secret.
     **Never** expose this to the client; it's only read inside
     `app/api/**` route handlers (`lib/supabase/server.ts`).
   - `NEXT_PUBLIC_SITE_URL` — your deployed domain (used to build
     referral links). `http://localhost:3000` while developing.
4. **Install and run.**
   ```
   npm install
   npm run dev
   ```
5. **Enable Realtime** (optional but recommended) on the
   `waitlist_users` table in Supabase → Database → Replication, so the
   live counter updates instantly on new signups instead of waiting for
   its 15-second poll.

## How the queue position works

Position is ordered by signup time; each verified referral moves the
referrer forward by 25 positions worth of priority. This rule lives in
one place — the `waitlist_queue` view in `supabase/schema.sql` — and
`lib/queue.ts` holds the same number only so the UI copy can state it
accurately. The client never computes or sends a position; it only
ever displays what the server returns.

## Referral integrity

- A referral is only credited once a *new, distinct* signup completes
  — recorded as a row in `referral_events`, which has a unique
  constraint on `referred_id`. That makes double-crediting the same
  signup structurally impossible, even if the signup request is
  retried.
- Self-referral (signing up with the email tied to the referral code
  you're using) is rejected server-side.
- Referral codes are validated server-side before being accepted.
- A simple in-memory rate limit sits in front of the signup endpoint;
  for production traffic, pair it with rate limiting at your CDN/edge.

## Privacy

The public leaderboard and counter never expose emails. Leaderboard
entries use a generated `Builder #XXX` alias derived from each user's
internal id (`lib/referral.ts`), and the `waitlist_leaderboard` /
`waitlist_queue` views only select non-identifying columns.

## Deploying

This is a standard Next.js app — Vercel is the path of least
resistance (`vercel deploy`), with the same environment variables set
in the project's dashboard. Any Node-capable host works too.

## Project structure

```
app/
  api/waitlist/           signup, returning-user lookup, stats, leaderboard
  layout.tsx               fonts, SEO metadata
  page.tsx                  assembles all sections, owns waitlist state
components/
  Walkthrough/              the 6-step interactive mechanism explainer
  ui/                        Button, Input primitives
lib/
  supabase/                 browser (anon) + server (service role) clients
  referral.ts, queue.ts, validation.ts, types.ts
supabase/schema.sql          tables, views, RLS, functions
```
