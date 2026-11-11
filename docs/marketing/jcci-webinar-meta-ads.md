# Meta ads for the JCCI webinar: many small ad sets, each one named in the copy

The structure Alex Becker describes, applied to the 18 November webinar.

His argument in one line: **on Meta today, your targeting is your copy.** You do
not pick the audience in the targeting boxes, you name them in the headline, and
Meta's AI finds them. Say "if you run a SaaS for dentists" and that is who sees
it. The audiences that convert cheapest are small, so the ad set has to stay
small too — push it past what that audience can absorb and Meta branches out to
people the ad was never written for, and the cost climbs.

So instead of one big CBO campaign letting the AI spread the budget, you run
**one campaign per broad demographic, and inside it many small ad sets, each
aimed at a micro-audience named in its own copy, each on its own small budget.**
You check them weekly, throttle anything over your cost limit, and grow by
adding more ad sets rather than by pushing more money through the same ones.

## Before you spend anything: the three things that break this

**1. Seven days is not his timeline.** Becker is describing an always-on account
that learns over months. The webinar is on 18 November. These ad sets will not
get out of the learning phase, so treat week one as buying registrations, not as
finding winners. The structure still earns its keep — the cheap micro-audiences
are cheap on day one — but do not kill an ad set on two days of data.

**2. His cost figures are his, not ours.** $400 a call, $500 limits, Hyros
subscriptions at $35,000 a month. None of that transfers. Our arithmetic is
below, built from what is actually in `src/lib/offers.ts`.

**3. He runs this on Hyros; we have UTM parameters.** His whole weekly loop
depends on knowing cost per call per ad set. We now capture `utm_content` (the
ad set) on every registration row, so you get:

```
Meta's reported spend for an ad set  ÷  registrations carrying its utm_content
  = cost per registration, for that ad set
```

Query it straight off `webinar_registrations_by_adset` in Supabase. That is
Meta's own spend figure, not independent attribution, and it misses anyone who
clicks today and registers from a bookmark next week. It is good enough to
decide what to throttle. It is not good enough to settle an argument about ROI.

## What a registration is worth

Nothing on this page is a guess; every figure comes from `src/lib/offers.ts`.

| | |
| --- | --- |
| Free seat | R0 |
| VIP seat | **R495**, 20 of them = R9,900 if they all go |
| The conversation after the webinar | Operators Intensive, **R25,000** |

Note: the brief called the Intensive R30,000. `offers.ts` and the Whop plan both
say R25,000. **Settle which is right before any of this runs**, because it moves
every number below.

Work your limit backwards from what you are willing to pay, not from a
benchmark:

```
If 1 in 25 registrations takes a VIP seat (R495)
  → R19.80 of VIP revenue per registration

If 1 in 100 registrations ends in an Intensive (R25,000)
  → R250 per registration

Together, about R270 per registration, at those rates.
```

Those two rates are **assumptions, not measured** — GrowthCred has not run this
funnel before, so nobody knows them yet. Pick the conversion rates you actually
believe, redo the two lines, and the number that comes out is your ceiling. A
sensible opening limit is a fraction of it: if R270 is the ceiling, **start the
throttle at R60 per registration** and raise it only once a real Intensive has
come out of this list.

## The structure

Six campaigns, about twenty ad sets. Each campaign is one broad demographic;
each ad set is one micro-audience, named in its own first line.

Campaign-level settings, the same for all six:

- Objective: **Leads**, optimising for landing page views → registration
- **ABO, not CBO.** This is the whole point. Budget at the ad set, so a small
  audience that works at R80/day is never starved by one that can absorb R500.
- Targeting boxes: **South Africa, 25–65, broad.** No interests, no lookalikes.
  The copy does the targeting. Add Gauteng-only for Campaign 4.
- Placements: Advantage+ on. Let it place; don't let it target.
- Every destination URL carries `?seg=`, `utm_campaign` and `utm_content`.

### Campaign 1 — Owners running things that move · R260/day

| Ad set | Micro-audience, named in the copy | Daily | `?seg=` |
| --- | --- | --- | --- |
| 1.1 | Waste, logistics and fleet owners | R80 | `logistics` |
| 1.2 | Security company owners | R60 | `security` |
| 1.3 | Cleaning and facilities owners | R60 | `cleaning` |
| 1.4 | Construction and trades owners | R60 | `construction` |

This campaign gets the biggest budget because it is the only one with a named,
permissioned client result behind it — Sandile at MNE Waste, trucks, drivers,
compliance, municipal contracts. Lead with that.

### Campaign 2 — Practices that run on documents · R180/day

| Ad set | Micro-audience | Daily | `?seg=` |
| --- | --- | --- | --- |
| 2.1 | Consultants and advisory firms | R80 | `consulting` |
| 2.2 | Accounting and bookkeeping practice owners | R50 | `accounting` |
| 2.3 | Attorneys running their own practice | R50 | `legal` |

TaiAscend's three-days-to-two-hours is the proof here, and the landing page
lifts it to the top for `consulting`. **Do not imply we have law or accounting
clients.** We don't. The ad names the reader's work, not our client list.

### Campaign 3 — The Chat Trap, named outright · R160/day

| Ad set | Micro-audience | Daily | `?seg=` |
| --- | --- | --- | --- |
| 3.1 | Owners already using ChatGPT who still work evenings | R100 | `chatgpt` |
| 3.2 | People who have saved a "best ChatGPT prompts" list | R60 | `prompts` |

The cheapest audience on this list, because the ad disqualifies everyone who has
never tried AI. 3.1 is the one most likely to produce Intensive conversations:
they have already bought the idea, they just can't make it work.

### Campaign 4 — Johannesburg and the JCCI room · R140/day · Gauteng only

| Ad set | Micro-audience | Daily | `?seg=` |
| --- | --- | --- | --- |
| 4.1 | JCCI members | R80 | `jcci` |
| 4.2 | Johannesburg business owners | R60 | `joburg` |

**4.1 does not run until JCCI say yes.** Naming their membership in an ad is
using their brand, and that is their call, not ours.

### Campaign 5 — Retail and beauty · R110/day

| Ad set | Micro-audience | Daily | `?seg=` |
| --- | --- | --- | --- |
| 5.1 | Beauty and cosmetics owners | R60 | `beauty` |
| 5.2 | Retail and e-commerce owners | R50 | `retail` |

Macaela Oor's quote is the proof, and the page lifts it for `beauty`.

### Campaign 6 — The people who ARE the business · R130/day

| Ad set | Micro-audience | Daily | `?seg=` |
| --- | --- | --- | --- |
| 6.1 | Owners who are still the whole business | R80 | `solo` |
| 6.2 | Owners who need hands and can't afford a salary yet | R50 | `hiring` |

The broadest two. Expect them to be the most expensive, and throttle them first.

**Total: about R980/day across 15 ad sets.** Over seven days that is roughly
R6,900. At a R60 limit that is about 115 registrations. Cut every budget in half
if that is more than you want to spend — the structure works the same at R490/day,
which is rather the point of it.

## The URL each ad points at

```
https://growthcred.co.za/webinar
  ?seg=logistics
  &utm_source=meta
  &utm_medium=paid
  &utm_campaign=jcci-movers
  &utm_content=logistics-r80
  &utm_term=hook-trucks-a
```

- `seg` makes the page greet them with their own hook instead of the generic one
- `utm_content` is **the ad set**, and the throttle rule divides by it
- `utm_term` is the individual hook inside it, so you can tell hook A from hook B

Keep `utm_content` identical to the ad set name in Meta. If they drift apart,
the arithmetic quietly stops being about what you think it is about.

## The hooks

Becker's rule: the first line names the audience, so the audience selects
itself. Two or three per ad set, same offer, different opening.

**1.1 Waste, logistics and fleet**
- "If you run trucks and drivers, every compliance question still comes back to you."
- "Waste and logistics owners: your week is quotes, rosters and municipal paperwork."
- "I built an AI with a Joburg waste company in one day. He's now fully operational."

**1.2 Security**
- "Security company owners: rosters, site reports, incident write-ups. All you."
- "You didn't start a security company to type up incident reports at 10pm."

**1.3 Cleaning and facilities**
- "Cleaning and facilities owners: staff schedules, site checks, quotes, invoices."
- "If your phone is your whole operations system, this one's for you."

**1.4 Construction and trades**
- "You price jobs at 10pm because the day was site visits and supplier calls."
- "Construction owners: every variation, every quote, every update goes through you."

**2.1 Consulting**
- "You sell your thinking, then spend the week typing it up."
- "A consultancy I work with took a 3-day document process down to 2 hours."

**2.2 Accounting**
- "How many times have you typed the same client explanation this month?"
- "Practice owners: month-end, client queries, and the same answers again."

**2.3 Legal**
- "Attorneys: you do the billing after everyone else has gone home."
- "Drafting, matter notes, client updates. None of it is why you went to law school."

**3.1 Already using ChatGPT**
- "You use ChatGPT every day and your week hasn't changed. Here's why."
- "You explain your business to ChatGPT every single time. That's the problem."
- "AI isn't saving you time because you're using a prompt where you need a system."

**3.2 Prompt lists**
- "That 'best ChatGPT prompts' list worked once. Then you went back to zero."
- "Prompts don't save time. Systems do."

**4.1 JCCI members** *(only once JCCI approve)*
- "JCCI members: a free hour on AI that actually does your repeat work."

**4.2 Johannesburg**
- "Joburg business owners: free live session on 18 November."
- "I'm in Rosebank. Five owners built their systems in one day in that room."

**5.1 Beauty**
- "Bookings, stock, supplier messages, client follow-ups. All through your phone."
- "A beauty business owner told me her AI works far better since our session."

**5.2 Retail and e-commerce**
- "Same customer questions, every day, forever. Until you build it once."

**6.1 Solo owners**
- "You're the salesperson, the bookkeeper, the marketer and the admin."
- "Your business can only grow as big as your day. Your day is full."

**6.2 Can't afford to hire**
- "You need another pair of hands. You can't afford another salary yet."

## The weekly loop

Becker checks once a week and only touches what's broken. With seven days to the
webinar, check **Thursday 13 and Sunday 16 November**.

Pull the numbers:

```sql
select * from webinar_registrations_by_adset
where webinar = 'jcci-ai-2026-11-18';
```

Then, per ad set, against Meta's spend:

1. **Over the limit** (start at R60 per registration): cut the daily budget by
   half. Do not switch it off — Becker's point is that a small audience is still
   working at a smaller number.
2. **Under the limit with registrations coming**: leave it. Do not scale it up.
   Pushing more money through a small audience is exactly what makes it stop
   working; Meta branches out to people the copy wasn't written for.
3. **Spent a full day with nothing**: the hook is wrong, not the audience. Swap
   the hook before you touch the budget.
4. **To grow**: add new ad sets, not bigger ones. Another micro-audience at R50
   a day beats another R50 on an existing one.

## After this webinar: the hook-cloning step

His last tip, and the one that matters beyond 18 November. Once an ad is
working, do not write new ads — take the winning hook and re-shoot it many ways:
different opening line, different setting, different framing, same argument.
The audience stops seeing one ad over and over, and the ad set stops fatiguing.

For GrowthCred, the useful version is: find the two or three hooks above that
actually produce registrations, then record each one five or six ways. There is
already a video pipeline in this account for exactly that kind of work.

One line to hold: **he clones hooks with AI actors. Don't put words in a
client's mouth, and don't generate a face that reads as a customer testimonial.**
Cloning your own hook is fine. Manufacturing proof is not, and this project's
rule on invented proof applies to an ad exactly as it applies to the page.

## Before the first rand is spent

1. JCCI's answer, or 4.1 doesn't run.
2. ~~The VIP Whop plan exists.~~ Done 11 Nov: `plan_p4azvJzT5gWRg`, R495, live on `/webinar/vip`.
3. `supabase/schema.sql` has been run, or `utm_content` is not stored and the
   whole weekly loop has no numbers to read.
4. Settle R25,000 vs R30,000 for the Intensive.
5. One real test registration from a `?seg=...&utm_content=...` link, checked in
   `webinar_registrations_by_adset`, before the ads go live. If that row is
   missing its `utm_content`, every budget decision for the next week is blind.
