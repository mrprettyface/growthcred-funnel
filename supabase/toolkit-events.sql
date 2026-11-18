-- ---------- toolkit_events: what people choose and click on /toolkit ----------
-- One paste in the Supabase SQL editor. Idempotent, safe to re-run.
--
-- The website (anon key) can only INSERT. Signed-in Command dashboard admins
-- (public.is_dash_admin(), from growthcred-dashboard/supabase/dashboard.sql)
-- can read. Nobody else can read a row.
--
-- Rows carry an anonymous session id, never a name or email: the opt-in row in
-- magnet_signups already holds those. Heatmap clicks are stored relative to the
-- page section they landed in (rx, ry are 0..1 of that section's box).
create table if not exists public.toolkit_events (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  session_id  text not null check (char_length(session_id) <= 64),
  page_state  text not null check (page_state in ('gate','vault')),
  event       text not null check (char_length(event) <= 40),
  target      text check (char_length(target) <= 200),
  detail      text check (char_length(detail) <= 200),
  industry    text check (char_length(industry) <= 40),
  section     text check (char_length(section) <= 60),
  rx          real check (rx is null or (rx >= 0 and rx <= 1)),
  ry          real check (ry is null or (ry >= 0 and ry <= 1)),
  device      text check (device in ('mobile','tablet','desktop')),
  vw          integer check (vw is null or (vw > 0 and vw < 10000))
);

alter table public.toolkit_events enable row level security;

drop policy if exists "anon can log toolkit events" on public.toolkit_events;
create policy "anon can log toolkit events"
  on public.toolkit_events for insert to anon with check (true);

create index if not exists toolkit_events_created_idx on public.toolkit_events (created_at desc);
create index if not exists toolkit_events_event_idx on public.toolkit_events (event, created_at desc);

-- Dashboard read access, only if the dashboard's admin function exists.
do $$
begin
  if to_regprocedure('public.is_dash_admin()') is not null then
    execute 'drop policy if exists "dash admin can read" on public.toolkit_events';
    execute 'create policy "dash admin can read" on public.toolkit_events for select to authenticated using (public.is_dash_admin())';
  end if;
end $$;

-- Live updates in the dashboard.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1 from pg_publication_tables
       where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'toolkit_events'
     ) then
    execute 'alter publication supabase_realtime add table public.toolkit_events';
  end if;
end $$;
