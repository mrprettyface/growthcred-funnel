# The human layer

AI drafts the page; a person makes it worth ranking. Search rewards what a
machine cannot write: first-hand experience, details only your business knows,
and a real author standing behind the claims. (The lesson from NP Digital's
744-article test, 24 September 2026: the same AI drafts earned several times
more traffic after one human editing pass.)

Every indexed content page either shows first-hand evidence in its own body, or
is listed below. `scripts/verify-human-layer.mjs` fails the build if a page has
neither, so nothing slips through quietly. Answer a page's questions (about 20
minutes each, in voice notes if easier), send them over, and the page comes off
the list once the answers are on it.

Never answer with an example that did not happen. "We haven't done this yet" is
a useful answer too: it changes what the page should promise.

## Queue

Highest value first.

### `/workshop`
The money page for the R990 funnel shows no attendee result.
1. One workshop attendee: the task they brought, how long it took before, how long after.
2. One sentence in their own words, and permission to use their name and business.
3. That fills the proof section, which appears on its own once `PROOF` in `src/lib/workshopEvent.ts` has a real entry.

### `/ai-follow-up-automation`
1. A real follow-up you or a client now drafts with AI: what kind of message, how long it used to wait, how long it takes now.
2. A redacted screenshot of one draft beside the notes it came from.
3. One mistake the system made early on, and the review rule you added because of it.

### `/ai-automation-uk`, `/ai-automation-united-states`, `/ai-automation-australia`
1. Have you worked with, trained or spoken to a business in this country? One sentence each, even if it was one call.
2. What hours do you actually take calls for this market?
3. How do you invoice international clients (currency, payment method)?
4. If there is no client there yet: what is the first thing you would tell an owner from this country on the call?

### `/guides/how-we-work-first-30-days`
1. What actually happened in MNE Waste's first 14 days: what was built first and why.
2. What the first monthly review looked at.

### `/guides/admin-assistant-vs-ai-automation`
1. A real case where you advised someone to hire a person instead of automating, and why.
2. A real case where a client stopped outsourcing a task after automating it.

### `/guides/business-brain`
1. A redacted excerpt of a real Operator's Brain (MNE Waste's structure, with permission, would be ideal): the headings and one filled-in section.

### `/guides/ai-proposals-and-follow-ups`
1. TaiAscend's three-day document process, step by step: what took the time, and what the two-hour version looks like.

### `/guides/ai-training-cost-south-africa`
1. The questions workshop and Intensive attendees actually asked about cost before booking.

### `/guides/ai-training-vs-automation`
1. A real case where you told an owner to learn it themselves instead of buying implementation, or the reverse.

### `/guides/ai-automation-cost-south-africa`
1. A real range for what implementation has cost, if you are comfortable publishing it, or the three biggest cost drivers you have actually seen.

## Refreshing

Freshness is one of the strongest signals for being cited. Once a quarter,
re-read each page, update anything that changed (prices, dates, tools), and only
then move its reviewed date forward. Never bump a date without reviewing.
