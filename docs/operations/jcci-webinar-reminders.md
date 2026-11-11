# JCCI webinar: reminders, and what is still waiting on a person

The webinar is **Wednesday 18 November 2026, 18:00 SAST**, live with JCCI on
Microsoft Teams. The VIP hour is **16:30–17:30** the same day.

Registration is at [/webinar](https://growthcred.co.za/webinar). A free seat
lands on `/webinar/thanks`; a VIP seat lands on `/webinar/vip`.

Nothing in this codebase sends email or WhatsApp. So this file is the copy, and
the sending is done from wherever the list lives. Every message below is written
to be pasted as it stands.

## Still to confirm

These are blocking or near-blocking, and none of them is something an agent can
settle.

1. **JCCI.** Can this registration page run alongside theirs? Do attendees have
   to be members? Is the session on Teams at 18:00? The page deliberately leaves
   the members-only question as a visible `[TO COME]` rather than guessing, and
   the answer that turns people away at the door is the one worth having early.
2. **The VIP checkout.** There is no Whop plan for the R497 VIP seat, so nothing
   on the site can charge for it. Create the plan in Whop at exactly R497, then
   paste its id into `WHOP_PLANS.vipSeat` in `src/lib/whop.ts`; the checkout
   appears on `/webinar/vip` on its own. Until then that page shows a visible
   placeholder and takes the seat over WhatsApp, by hand. The price itself lives
   in `src/lib/offers.ts` as `VIP_SEAT`, and the site reads it from there.
3. **The database migration.** `supabase/schema.sql` now adds `business`,
   `consent` and `seat` to `webinar_registrations`. Run it before the page goes
   live, or those three are lost — a registration still saves either way,
   because a failed insert is retried without them, but the POPIA consent flag
   is the one you would want on record.
4. **Sandile's testimonial.** The brief quoted "Jeff" from MNE Waste. The client
   record and every published page name **Sandile**, and no quote has been
   approved, so the page shows a visible placeholder instead. Get his exact
   words and his written permission, and it drops straight in. The claim that
   "his WhatsApp assistant answers his customers for him" is also not on the
   page: what is published, with his permission, is that he built his Operator's
   Brain in one day and is now fully operational.
5. **The Chat Trap video.** The 60–90 second clip for the hero. Drop the YouTube
   link into `jcciChatTrap` in `src/lib/videos.ts`. Until then the hero simply
   has no video block, rather than a player saying something is unavailable.
6. **The referral reward.** The brief offers the AI Safety Playbook after **two**
   sign-ups. The site already runs a one-referral promise, live, on both sides
   ("Stop the Leak", the same 2-page AI policy under a different name), and
   fulfilment is already manual. The thank-you page uses that existing promise,
   because a two-referral counter needs tracking nothing here has. Say the word
   and it changes — but the pack still has no file, so either way it is sent by
   hand.
7. **The "10 to 15 hours" figure.** The brief says 10 to 15 hours a week. The
   rest of the site says 10, and nobody has reported 15, so the page says 10.
   Worth deciding once, for every page.

## The reminder sequence

Each one goes out by email and on WhatsApp. `[link]` is the Teams joining link.

**On sign-up**

> You're in for Wednesday 18 November, 18:00. Here's your Brain Builder:
> https://growthcred.co.za/webinar/thanks
> Fill in the first page before the webinar. You'll get much more out of it.

**3 days before (Sunday 15 November)**

> Quick question. What's the one job you're sick of doing every week? Reply and
> tell me. I might use your answer live. No names.

**1 day before (Tuesday 17 November)**

> Tomorrow at 18:00: "Prompts Don't Save Time. Systems Do." The free gifts only
> go to people who stay live to the end. Here's your link: [link]

**2 hours before**

> Tonight at 18:00. Grab a coffee, bring a notebook, keep WhatsApp open.
> Link: [link]

**15 minutes before**

> We start in 15 minutes. Join here: [link]

**Live**

> We're live now: [link]. The free gifts are announced at the end, so stay to
> the end.

**VIP only, 1 hour before the VIP hour (15:30)**

> We talk in an hour, at 16:30. Have your Brain Builder open and I'll go
> through it with you. Link: [VIP link]

**Next morning, to the people who didn't attend**

> You missed it. Your seat for the Operator Intensive conversation is still
> open. Reply "INTENSIVE" and I'll send you the details.

Only send that last one if JCCI's terms allow following up on their members.

## What the funnel records

Every registration writes one row to `webinar_registrations` in Supabase, with
a parallel write to the "Reserve Your Seat" Google Form as a safety net (name
and email only — the form has no WhatsApp, business, consent or seat field).

| Column | What it holds |
| --- | --- |
| `webinar` | `jcci-ai-2026-11-18` |
| `seat` | `free` or `vip` — what they chose, never that they paid |
| `consent` | the POPIA box, as ticked |
| `business` | optional, as typed |
| `ref_code` | their own share code, derived from their email |
| `referred_by` | the code of whoever's link brought them, or empty |
| `source` | `jcci_webinar` |

A `vip` row means a seat Phila is honouring by hand until the Whop plan exists.
Whop's dashboard stays the authority on money.

To reward a referral, match a row's `referred_by` against the referrer's
`ref_code`.
