-- Run this once in Supabase SQL editor if you already ran the old schema.sql
-- with the permissive "leaderboard is public" policy. New projects running
-- the updated supabase/schema.sql do not need this.
drop policy if exists "leaderboard is public" on waitlist_users;

drop policy if exists "no public reads" on waitlist_users;
create policy "no public reads"
  on waitlist_users for select
  using (false);

drop policy if exists "no public reads" on referral_events;
create policy "no public reads"
  on referral_events for select
  using (false);
