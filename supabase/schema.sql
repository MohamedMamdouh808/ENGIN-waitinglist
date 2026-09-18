-- ENGIN waitlist schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists pgcrypto;

create table if not exists waitlist_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_normalized text generated always as (lower(trim(email))) stored,
  referral_code text not null unique,
  referred_by text references waitlist_users (referral_code) on delete set null,
  referral_count integer not null default 0,
  display_alias text not null,
  created_at timestamptz not null default now()
);

-- One waitlist row per person. Case/whitespace-insensitive.
create unique index if not exists waitlist_users_email_normalized_key
  on waitlist_users (email_normalized);

create index if not exists waitlist_users_referred_by_idx
  on waitlist_users (referred_by);

create index if not exists waitlist_users_created_at_idx
  on waitlist_users (created_at);

-- Every successful referral is recorded once here, which is what makes
-- "duplicate referral credit for the same signup" structurally impossible:
-- the unique constraint on referred_id means a given new user can only
-- ever grant credit a single time, no matter how many times the signup
-- request is retried.
create table if not exists referral_events (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references waitlist_users (id) on delete cascade,
  referred_id uuid not null unique references waitlist_users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Positions move as referrals come in, so we compute rather than store
-- a stale column. Base order is signup time; each verified referral
-- pulls a user forward by REFERRAL_BOOST positions (see queue.ts) —
-- expressed here as a priority score so it's one deterministic sort.
create or replace view waitlist_queue as
  select
    id,
    email_normalized,
    referral_code,
    referred_by,
    referral_count,
    display_alias,
    created_at,
    row_number() over (
      order by referral_count * 25 desc, created_at asc
    ) as queue_position
  from waitlist_users;

create or replace view waitlist_leaderboard as
  select
    display_alias,
    referral_count,
    row_number() over (order by referral_count desc, created_at asc) as rank
  from waitlist_users
  where referral_count > 0
  order by referral_count desc, created_at asc
  limit 20;

-- Atomic increment so two concurrent referral credits can never clobber
-- each other (the API route falls back to read-modify-write if this
-- function is missing, but this is the safe path).
create or replace function increment_referral_count(referrer_id uuid)
returns void
language sql
as $$
  update waitlist_users
  set referral_count = referral_count + 1
  where id = referrer_id;
$$;

alter table waitlist_users enable row level security;
alter table referral_events enable row level security;

-- No public reads on the base tables. All reads/writes go through the
-- API routes with the service role key (lib/supabase/server.ts), which
-- bypasses RLS. The anon key therefore cannot list emails, even though
-- the app previously shipped with `using (true)`.
-- Note: LiveCounter falls back to 15s polling against /api/waitlist/stats,
-- so blocking direct anon SELECT does not break the counter — the
-- postgres_changes subscription will just stay idle.
drop policy if exists "leaderboard is public" on waitlist_users;
drop policy if exists "no public reads" on waitlist_users;
create policy "no public reads"
  on waitlist_users for select
  using (false);

drop policy if exists "no public reads" on referral_events;
create policy "no public reads"
  on referral_events for select
  using (false);

-- (The API layer is responsible for never selecting/returning the
-- `email` column in any public-facing response — see
-- the /api/waitlist/leaderboard route, which selects only
-- display_alias and referral_count.)
