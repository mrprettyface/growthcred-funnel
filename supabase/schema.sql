-- ============================================================
-- GrowthCred funnel schema
-- Run in the Supabase SQL editor.
--
-- SECURITY MODEL
-- The public site uses the ANON key, which is public. RLS is therefore the
-- only thing protecting this data. We grant INSERT and nothing else, so the
-- site can capture leads and orders but can never read them back. Reading and
-- updating is done from the Supabase dashboard (service role bypasses RLS).
-- This mirrors the Fumba `candidates` pattern.
-- ============================================================

-- ---------- leads: free class opt-ins ----------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null,
  source      text not null default 'free_class'
);

alter table public.leads enable row level security;

drop policy if exists "anon can submit a lead" on public.leads;
create policy "anon can submit a lead"
  on public.leads for insert to anon with check (true);
-- Intentionally NO select, update or delete policy for anon.


-- ---------- orders: purchase intents ----------
-- NOTE: with manual wire payment, a row here is a REQUEST, not proof of
-- payment. `status` is only ever moved to 'paid' by a human (or later, by a
-- verified payment webhook running with the service role). Never trust the
-- browser for payment status.
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  reference       text not null unique,
  email           text not null,
  name            text,
  items           text[] not null default '{}',
  amount_cents    integer not null default 0,
  status          text not null default 'awaiting_payment'
                    check (status in ('awaiting_payment','paid','cancelled')),
  payment_method  text not null default 'manual_wire',
  -- Phase 2 (Stitch): stores the provider token used for one-click upsells.
  -- NEVER store raw card numbers or CVV here, only the provider's token.
  provider_ref    text,
  authorization_code text
);

alter table public.orders enable row level security;

drop policy if exists "anon can create an order" on public.orders;
create policy "anon can create an order"
  on public.orders for insert to anon with check (true);
-- Intentionally NO select/update/delete for anon: a customer must never be
-- able to read another customer's order or mark their own as paid.

create index if not exists orders_reference_idx on public.orders (reference);
create index if not exists orders_status_idx on public.orders (status);


-- ---------- upsell_events: funnel decisions ----------
create table if not exists public.upsell_events (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  reference   text not null,           -- matches orders.reference
  offer       text not null,           -- 'upsell' | 'downsell'
  accepted    boolean not null
);

alter table public.upsell_events enable row level security;

drop policy if exists "anon can record an upsell decision" on public.upsell_events;
create policy "anon can record an upsell decision"
  on public.upsell_events for insert to anon with check (true);

create index if not exists upsell_events_reference_idx on public.upsell_events (reference);


-- ---------- applications: high-ticket call requests ----------
-- The thoughtful questions live here. Reading these BEFORE the call is the
-- whole point, so unlike other tables you will actually work this data.
-- Still anon INSERT-only: the public may apply, never read applications back.
create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  whatsapp      text not null,
  business      text not null,
  business_does text,
  reason        text,   -- what made you apply today
  outcome       text,   -- what a successful outcome looks like
  frustration   text,   -- the most frustrating part so far
  team_size     text,
  status        text not null default 'new'
                  check (status in ('new','contacted','booked','declined'))
);

alter table public.applications enable row level security;

drop policy if exists "anon can submit an application" on public.applications;
create policy "anon can submit an application"
  on public.applications for insert to anon with check (true);
-- Intentionally NO select/update/delete for anon.

create index if not exists applications_status_idx on public.applications (status);


-- ---------- build_requests: "Build It for You" qualifications ----------
-- The top-tier done-for-you offer, taken as a mini application after the
-- upsell is declined. You work this data (audit, then reach out), so read it
-- from the dashboard. Still anon INSERT-only.
create table if not exists public.build_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  reference     text not null,   -- matches orders.reference
  name          text not null,
  email         text not null,
  whatsapp      text not null,
  industry      text,
  invest_timing text,            -- Today | Tomorrow | This week | Still exploring
  availability  text,
  notes         text,
  status        text not null default 'new'
                  check (status in ('new','audited','contacted','won','declined'))
);

alter table public.build_requests enable row level security;

drop policy if exists "anon can submit a build request" on public.build_requests;
create policy "anon can submit a build request"
  on public.build_requests for insert to anon with check (true);
-- Intentionally NO select/update/delete for anon.

create index if not exists build_requests_status_idx on public.build_requests (status);


-- ---------- convenience view for you (service role only) ----------
create or replace view public.orders_awaiting_payment as
  select reference, created_at, name, email, items, amount_cents
  from public.orders
  where status = 'awaiting_payment'
  order by created_at desc;

create or replace view public.applications_new as
  select created_at, name, whatsapp, email, business, business_does,
         reason, outcome, frustration, team_size
  from public.applications
  where status = 'new'
  order by created_at desc;

create or replace view public.build_requests_new as
  select created_at, reference, name, whatsapp, email, industry,
         invest_timing, availability, notes
  from public.build_requests
  where status = 'new'
  order by created_at desc;
