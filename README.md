# ENGIN — waitlist site

A production-structured waitlist site for ENGIN: email signup, live queue
position, unique referral links, a real-time signup counter, an open
referral leaderboard, first-party signup/source tracking, and an
interactive six-step walkthrough of how ENGIN turns plain-English intent
into deployed software.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling (class-based light/dark themes via CSS vars)
- **Supabase** (Postgres) for the waitlist, referrals, queue position,
  leaderboard, and product events — this is the source of truth; nothing
  important is computed only in the browser

## What's real vs. mocked

- **Waitlist, referrals, queue position, counter, leaderboard, tracking**
  are all real: they read and write actual rows in Postgres via the API
  routes in `app/api/`.
- **The six-step walkthrough** (`components/Walkthrough/`) is an
  educational simulation with static "restaurant booking app" data, as
  specified. It is not wired to a real compiler.
- **FAQ answers and Pricing tiers** are drafts grounded in
  `ENGIN_PRD_v1.7` (Screen 5 tiers, phased roadmap) — see the header
  comments in `components/FAQ.tsx` / `components/Pricing.tsx`. Team
  approval still needed before treating them as final.

## Setup

1. **Create a Supabase project** at supabase.com.
2. **Run the schema.** Open the SQL editor in your Supabase project and
   run the contents of `supabase/schema.sql`. This creates the
   `waitlist_users` and `referral_events` tables, the
   `waitlist_queue` / `waitlist_leaderboard` views, RLS policies, and
   the `increment_referral_count` function.
   Then run (in order):
   - `supabase/fix_rls.sql` — locks down anon reads (only needed if you
     ran the original permissive schema).
   - `supabase/migrations/0002_tracking_and_leaderboard.sql` — adds
     `display_name` / `show_on_leaderboard` / `utm_source` columns, the
     first-party `events` table, and the open leaderboard view.
     (Uses DROP + CREATE for the view: `CREATE OR REPLACE` fails with
     `42P16` when the column list changes shape.)
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
   - `ADMIN_SECRET` — any long random string (`openssl rand -hex 32`).
     Gates `GET /api/admin/signups-by-source` (pass as
     `Authorization: Bearer <secret>`). Server-only, never `NEXT_PUBLIC_`.
4. **Install and run.**
   ```
   npm install
   npm run dev
   ```
5. **Enable Realtime** (optional but recommended): Supabase → Database →
   **Publications** → `supabase_realtime` → add the `waitlist_users`
   table, so the live counter updates instantly on new signups instead
   of waiting for its 15-second poll.

## Feature brief — everything added since launch

### Tracking (investor numbers)
- `?utm_source=` captured on landing (`app/page.tsx` reads it
  server-side) and stored per signup (`waitlist_users.utm_source`).
- Referral codes stored per signup (`referred_by`) as before.
- First-party `events` table + `POST /api/events` (allowlisted names,
  rate-limited, never breaks the product path): `walkthrough_started`,
  `walkthrough_finished`, `signup` (server-side), `share_click`
  (every share path, with channel + queue position).
- `GET /api/admin/signups-by-source` (gated by `ADMIN_SECRET`) returns
  `{ total_signups, referred_signups, by_source }` — the deck breakdown.
- No third-party analytics snippet; own data is the source of truth.

### Open leaderboard (social proof)
- Every signup appears by default (view filters only explicit opt-outs),
  sorted by referrals then join order — `supabase/migrations/0002_*`.
- Optional name field at signup; public label resolves server-side as
  display name → masked email (`mo***@gmail.com`, `lib/mask.ts`) →
  generated alias. Raw email never leaves the server.
- Opt-out checkbox ("Keep me off the public leaderboard"), default shown.

### Share flow
- Post-signup screen shows queue position, referral link, and a native
  one-tap Share button on mobile with a position-aware prefilled message
  ("I'm #N in line…"); WhatsApp/X/LinkedIn fallbacks on desktop.
- Every share path logs `share_click`.

### Content sections
- **Developer section** directly under the hero — exact brief copy
  ("Built for developers who don't trust black boxes…"), CTA scrolls to
  `#how-it-works`.
- **FAQ** (6 items: what/coding/different/time/cost/post-join) —
  answers drafted from existing repo claims, marked DRAFT pending team
  approval. **Pricing** — PRD v1.7 Screen 5 tiers (Free $0, Pro $25,
  Team $75, Enterprise Custom) with roadmap phase tags (P1/P2/P3); only
  custom domain is explicitly tier-gated in the docs, the rest is
  phase-inferred — see the file header. Still open: real FAQ sign-off,
  privacy policy page, confirmation email + unsubscribe (needs a
  sending-domain decision).

### Design system + themes
- Light/dark toggle (`components/ThemeToggle.tsx`, zero-dep
  `ThemeProvider` with `localStorage` + `prefers-color-scheme`,
  FOUC-guard inline script in `app/layout.tsx`).
- `components/ui/Card.tsx`, `Button` on `cva + tailwind-merge`,
  `.container-engin` spacing token, `lib/constants.ts` (no magic
  numbers), `lib/scroll.ts`, `lib/useReducedMotion.ts` gating all
  JS-driven animations.
- Non-technical copy pass throughout (kept "Blueprint" as the proper
  noun with a plain-English clause per brief §6); walkthrough gate kept.

### Performance / SEO / a11y
- `app/page.tsx` is a server component (`?ref=` / `?utm_source=` read
  via `searchParams`); interactive signup island extracted to
  `components/SignupSection.tsx`.
- Security headers (`next.config.mjs`), OG image with real Plex font +
  `alt`, static sitemap date, `viewport` themeColor, skip-to-content
  link, `role=progressbar`, theme-aware placeholder contrast (AA both
  themes), polling paused when tab hidden.

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
- In-memory rate limits sit in front of the signup and events
  endpoints (`x-forwarded-for` chain split to the leftmost entry); for
  production traffic, pair with rate limiting at your CDN/edge.

## Privacy

The public leaderboard and counter never expose emails. Labels resolve
server-side (`lib/mask.ts`): user-chosen display name → masked email →
generated `Builder #XXX` alias, and the `waitlist_leaderboard` view is
only ever read through the service-role API route. Anon has no SELECT
on the base tables (`supabase/fix_rls.sql`).

## Deploying

This is a standard Next.js app — Vercel is the path of least
resistance (`vercel deploy`), with the same environment variables set
in the project's dashboard (plus `ADMIN_SECRET`). Any Node-capable host
works too. `NEXT_PUBLIC_*` values are baked at build time, so set them
before the build. The Vercel Supabase Integration vars (`SUPABASE_URL`
/ `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` aliases) are
accepted as fallbacks — see `lib/supabase/server.ts`.

## Project structure

```
app/
  api/waitlist/           signup, returning-user lookup, stats, leaderboard
  api/events/             first-party product events (walkthrough/signup/share)
  api/admin/signups-by-source/  secret-gated source breakdown
  layout.tsx              fonts, SEO metadata, theme provider + FOUC guard
  page.tsx                server component: sections + searchParams
  opengraph-image.tsx / robots.ts / sitemap.ts / icon.svg
components/
  Walkthrough/            the 6-step interactive mechanism explainer
  SignupSection.tsx       client island: form/success + returning-user check
  DeveloperSection.tsx    exact-brief dev copy under the hero
  Leaderboard.tsx / LiveCounter.tsx / FAQ.tsx / Pricing.tsx / SocialProof.tsx
  ShareButtons.tsx        native share + fallbacks, position-aware message
  ThemeProvider.tsx / ThemeToggle.tsx
  ui/                     Button (cva), Input, Card
lib/
  supabase/               browser (anon, safe fallback) + server (service role)
  mask.ts                 server-side email masking + label resolution
  events.ts               fire-and-forget client event helper
  constants.ts            all timing/rate-limit numbers in one place
  referral.ts, queue.ts, validation.ts, types.ts, scroll.ts, useReducedMotion.ts
supabase/
  schema.sql              tables, views, RLS, functions (frozen — don't edit)
  fix_rls.sql             one-time anon lockdown for old deployments
  migrations/0002_tracking_and_leaderboard.sql   events + open leaderboard
```

## Internal docs

Product source docs (PRD v1.7, Feature Matrix v1.2, specs) live in a
local `DOCS/` folder that is **gitignored and never pushed** — the repo
stays public-safe. Pricing/FAQ claims cite `ENGIN_PRD_v1.7` Screen 5 and
the phased roadmap; only custom domain is explicitly tier-gated there,
the rest is phase-inferred (see `components/Pricing.tsx` header).
