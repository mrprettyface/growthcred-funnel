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
  authorization_code text,
  paid_at         timestamptz,
  whop_plan_id    text
);

-- Safe to run after the original orders table already exists.
alter table public.orders add column if not exists paid_at timestamptz;
alter table public.orders add column if not exists whop_plan_id text;

alter table public.orders enable row level security;

drop policy if exists "anon can create an order" on public.orders;
create policy "anon can create an order"
  on public.orders for insert to anon with check (true);
-- Intentionally NO select/update/delete for anon: a customer must never be
-- able to read another customer's order or mark their own as paid.

create index if not exists orders_reference_idx on public.orders (reference);
create index if not exists orders_status_idx on public.orders (status);


-- ---------- payment_webhook_events: verified provider events ----------
-- This table is written only by the Whop webhook Edge Function with the
-- service role. The webhook id and payment id make retries idempotent, while
-- the email fields let a failed Resend call be retried without trusting the
-- browser or sending the same message twice (Resend also receives the payment
-- id as an idempotency key).
create table if not exists public.payment_webhook_events (
  webhook_id       text primary key,
  payment_id       text not null unique,
  received_at      timestamptz not null default now(),
  email            text not null,
  plan_id          text not null,
  order_reference  text,
  email_status     text not null default 'pending'
                     check (email_status in ('pending','sent','failed')),
  email_provider_id text,
  last_error       text
);

alter table public.payment_webhook_events enable row level security;
-- Intentionally no anon policies: customers must never write or read payment
-- events. The service role used by the webhook bypasses RLS.

create index if not exists payment_webhook_events_status_idx
  on public.payment_webhook_events (email_status, received_at desc);


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
-- security_invoker = true is REQUIRED on every view here. Without it a view
-- runs with its owner's rights and bypasses the underlying table's RLS, and
-- Supabase's default grants let anon SELECT from public views -- which would
-- expose all this PII to anyone holding the public anon key. With it, the view
-- respects the caller's RLS (anon gets nothing; service_role sees all).
create or replace view public.orders_awaiting_payment
  with (security_invoker = true) as
  select reference, created_at, name, email, items, amount_cents
  from public.orders
  where status = 'awaiting_payment'
  order by created_at desc;

create or replace view public.applications_new
  with (security_invoker = true) as
  select created_at, name, whatsapp, email, business, business_does,
         reason, outcome, frustration, team_size
  from public.applications
  where status = 'new'
  order by created_at desc;

create or replace view public.build_requests_new
  with (security_invoker = true) as
  select created_at, reference, name, whatsapp, email, industry,
         invest_timing, availability, notes
  from public.build_requests
  where status = 'new'
  order by created_at desc;


-- ---------- webinar_registrations: free live class seats ----------
-- Separate from `leads` because a webinar seat needs a name and a WhatsApp
-- number (we send the joining link by email and a reminder on WhatsApp), and
-- because registrations are per-event: `webinar` is the event slug, so one
-- table serves every future live class. Same security model as everything
-- else here: anon INSERT only, read from the dashboard.
create table if not exists public.webinar_registrations (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  webinar     text not null,            -- event slug, e.g. 'ai-80-2026-09-02'
  name        text not null,
  email       text not null,
  whatsapp    text not null,
  source      text not null default 'webinar_page'
);

alter table public.webinar_registrations enable row level security;

drop policy if exists "anon can register for a webinar" on public.webinar_registrations;
create policy "anon can register for a webinar"
  on public.webinar_registrations for insert to anon with check (true);
-- Intentionally NO select/update/delete for anon.

create index if not exists webinar_registrations_webinar_idx
  on public.webinar_registrations (webinar, created_at desc);

-- Referral loop. `ref_code` is this registrant's own stable share code (derived
-- client-side from their email, so no lookup table is needed); `referred_by` is
-- the code of whoever's link brought them, or null. To reward a referral, match
-- a row's `referred_by` against the `ref_code` of the referrer. Added as an
-- idempotent ALTER so a live table upgrades in place without a drop.
alter table public.webinar_registrations
  add column if not exists ref_code    text,
  add column if not exists referred_by text;

create or replace view public.webinar_registrations_recent
  with (security_invoker = true) as
  select created_at, webinar, name, whatsapp, email, source, ref_code, referred_by
  from public.webinar_registrations
  order by created_at desc;


-- ---------- magnet_signups: lead magnet opt-ins ----------
-- The parallel funnel. Someone trades their details for a pack, is given the
-- file immediately on the same page, and is then offered a one-tap seat at the
-- live class. Separate from `leads` because that table only carries an email
-- and a source, and a magnet opt-in needs a name and a WhatsApp number to be
-- worth anything afterwards.
--
-- `magnet` is the pack slug, so one table serves every future lead magnet
-- without a migration -- the same trick `webinar` plays in the table above.
--
-- `consent` records that the POPIA consent box was ticked. It is stored rather
-- than assumed, because the point of consent is being able to show it later.
-- `company` is nullable on purpose: every required field costs opt-ins, and
-- nothing downstream depends on it yet.
create table if not exists public.magnet_signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  magnet      text not null,            -- pack slug, e.g. 'ten-hours-back'
  name        text not null,
  email       text not null,
  whatsapp    text not null,
  company     text,                     -- optional, by design
  consent     boolean not null default false,
  source      text not null default 'magnet_page'
);

alter table public.magnet_signups enable row level security;

drop policy if exists "anon can claim a lead magnet" on public.magnet_signups;
create policy "anon can claim a lead magnet"
  on public.magnet_signups for insert to anon with check (true);
-- Intentionally NO select/update/delete for anon. Same model as every other
-- table here: the browser writes, the dashboard reads.

create index if not exists magnet_signups_magnet_idx
  on public.magnet_signups (magnet, created_at desc);

create or replace view public.magnet_signups_recent
  with (security_invoker = true) as
  select created_at, magnet, name, whatsapp, email, company, consent, source
  from public.magnet_signups
  order by created_at desc;

-- ---------- business_brains: /brain builder completions ----------
-- The /brain page walks a visitor through the fifteen Business Brain
-- questions and assembles the paste-ready instruction document client-side.
-- When they ask for it by email, the browser posts the STRUCTURED ANSWERS to
-- the `brain-send` Edge Function, which re-generates the document from the
-- server-side template, saves the row here, and mails it. No policies on this
-- table, same reasoning as `contact_messages`: the function is the only door,
-- so the email content can never be anything but the fixed template.
create table if not exists public.business_brains (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  name              text not null,
  email             text not null,
  answers           jsonb not null,
  source            text not null default 'brain_builder',
  email_status      text not null default 'pending'
                      check (email_status in ('pending','sent','failed','skipped')),
  email_provider_id text,
  email_error       text
);

alter table public.business_brains enable row level security;
-- Intentionally NO policies: only the Edge Function (service role) writes here.

create index if not exists business_brains_created_idx
  on public.business_brains (created_at desc);
create index if not exists business_brains_email_idx
  on public.business_brains (email, created_at desc);

-- ---------- contact_messages: contact form + auto-acknowledgment ----------
-- The /contact form does not write here directly. The browser posts to the
-- `contact-autoresponder` Edge Function, which validates the payload, applies
-- a light rate limit, stores the row with the service role, and then sends the
-- acknowledgment email through Resend. Because the browser never inserts, this
-- table has NO anon policy at all: the rate limit cannot be bypassed by
-- writing straight to the table with the public anon key.
--
-- `reply_status` tracks the autoresponder so a failed acknowledgment can be
-- spotted and retried without re-sending anything (`payment_webhook_events`
-- plays the same trick for purchase email). 'skipped' means Resend is not
-- configured: the message was saved, no email was attempted.
create table if not exists public.contact_messages (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  name              text not null,
  email             text not null,
  whatsapp          text,
  message           text not null,
  source            text not null default 'contact_page',
  reply_status      text not null default 'pending'
                      check (reply_status in ('pending','sent','failed','skipped')),
  reply_provider_id text,
  reply_error       text
);

alter table public.contact_messages enable row level security;
-- Intentionally NO policies: only the Edge Function (service role) writes here.

create index if not exists contact_messages_created_idx
  on public.contact_messages (created_at desc);
create index if not exists contact_messages_email_idx
  on public.contact_messages (email, created_at desc);

create or replace view public.contact_messages_recent
  with (security_invoker = true) as
  select created_at, name, email, whatsapp, message, source,
         reply_status, reply_provider_id, reply_error
  from public.contact_messages
  order by created_at desc;