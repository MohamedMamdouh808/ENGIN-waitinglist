-- ENGIN waitlist migration 0002 — tracking + open leaderboard
-- Run AFTER supabase/schema.sql (and supabase/fix_rls.sql if applied).
-- Additive only: no already-applied statement is modified here.

-- 3.1 tracking: source attribution per signup
alter table waitlist_users
  add column if not exists display_name text,
  add column if not exists show_on_leaderboard boolean not null default true,
  add column if not exists utm_source text;

-- 3.1 tracking: first-party product events (own data, no third-party quota)
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email_normalized text,
  user_id uuid references waitlist_users (id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists events_name_created_at_idx
  on events (name, created_at desc);

alter table events enable row level security;

drop policy if exists "no public reads" on events;
create policy "no public reads"
  on events for select
  using (false);

-- 3.2 open leaderboard: every non-opted-out signup appears by default
-- (previously only referral_count > 0). The view still never exposes raw
-- email to anon — the API resolves display labels server-side (see
-- lib/mask.ts) and anon has no SELECT on the base table anyway.
-- NOTE: DROP + CREATE (not CREATE OR REPLACE) because the column list
-- changed shape — OR REPLACE matches columns by position and fails with
-- 42P16 when the first column differs. Views store no data, and nothing
-- depends on this view, so recreate is lossless.
drop view if exists waitlist_leaderboard;
create view waitlist_leaderboard as
  select
    id,
    display_alias,
    display_name,
    email_normalized,
    referral_count,
    row_number() over (order by referral_count desc, created_at asc) as rank
  from waitlist_users
  where coalesce(show_on_leaderboard, true) = true
  order by referral_count desc, created_at asc
  limit 50;
