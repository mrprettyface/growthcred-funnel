# Product

<!-- impeccable:product-schema 1 -->

Product truth for design work on growthcred.co.za. STATUS.md is the living
handover (routes, prices, open items); docs/editorial/VOICE.md owns every word.
Where this file and those disagree, they win and this file is stale.

## Platform

web

## Users

The primary user is the owner of an established, owner-led firm doing
R20M–R500M a year (confirmed by Phila, October 2026). They are the most
expensive person in the business and they spend 20–40% of their week on admin
that should not need them. They come to the site deciding whether GrowthCred
is worth an application. Future design serves this person first.

Secondary audiences, each with its own pages: organisations buying team
training (`/corporate-ai-training`), and smaller owners entering through the
free live class (`/webinar`, `/class`) and the R990 workshop (`/workshop`).
Regulated buyers in financial services and law have their own market pages.

## Product Purpose

GrowthCred, founded by Phila Ngwenya in Rosebank, Johannesburg, sells
**The Command Core**: private AI. The client's own AI, on equipment GrowthCred
chooses, deploys and looks after, set up around how the business already
works. The pitch, in Phila's words: "Let us help you own your intelligence."

Success on the site is a qualified application at `/call`. Every "Apply" goes
there. The workshop, class, guide and courses are the other ways in.

## Positioning

Owned, not rented. Most firms rent AI per seat, send their documents to
someone else's servers and re-explain their business to a tool that starts
from zero every time. The Command Core sits in the client's building, holds
their data there, and is built around their own work. No per-seat
subscription. GrowthCred chooses, deploys and maintains the equipment, so the
owner never has to think about it.

## Operating Context

Owners evaluate on their phone between meetings and on a laptop at their desk.
The engagement runs Audit (find the hours, put a rand value on them), Deploy
(set it up on equipment that fits, first result in 14 days) and Embed (keep it
sharp, better models go in as they come out, hours back tracked monthly). It is
application only; the qualifying questions happen on the call.

## Capabilities and Constraints

- Vite + React + TypeScript + Tailwind 4, prerendered static build. Supabase
  captures forms; Whop takes payment on the workshop funnel.
- Deployed to cPanel from the committed `dist/` folder, and to Cloudflare Pages
  as a second host. Both must keep working (`.htaccess` and `public/_redirects`,
  `public/_headers`). A production build needs the real `.env`.
- Site prices must match Whop exactly (`src/lib/offers.ts`, `src/lib/whop.ts`).
- Motion is decoration. Every animation has a reduced-motion branch, moves only
  transform or opacity, and never hides content until it finishes. No
  `filter: blur()` on anything driven by scroll; no `backdrop-blur` on sticky
  elements. Mobile rules in STATUS.md are binding.
- Gate scripts in `scripts/verify-*.mjs` enforce SEO, voice, mobile performance,
  proof and host rules. Several GATES-*.md files record what each release must keep.
- Copy rules (Phila): never name hardware or models; sell the outcome. The
  only Command Core deployment so far is GrowthCred's own, so no client is ever
  described as running one.
- Open: the homepage cost line ("For a R20M–R100M firm, that gap costs
  R3M–R10M a year") uses a narrower range than the R20M–R500M audience. Treat
  it as the range the figure was worked out for; do not change it without Phila.

## Brand Commitments

- Name: GrowthCred. Product: The Command Core. Pitch and homepage headline:
  "Let us help you own your intelligence." Both are Phila's and locked.
- Voice: docs/editorial/VOICE.md. Short sentences, "you" and "I", real sourced
  numbers, few bullets, headings a person would say. Phila is the "I".
  `scripts/verify-voice.mjs` measures it.
- Incumbent visual system (recorded in code, not here): midnight, gold, cream
  and paper; Manrope, DM Sans, DM Mono; dark "blueprint" bands with a gold
  light; hand-drawn line scenes. Treat it as the authority for refinement.

## Evidence on Hand

Real, permissioned proof only:

- Client logos (training and build work, not private AI) in
  `public/images/clients/`, generated from `content/client-logos/`.
- Client stories: MNE Waste, Demure International, the Operators Intensive at
  WeWork Rosebank (`/stories/*`). TaiAscend's "3 days → 2 hours" (no page yet).
- 7 AI talks at WeWork Johannesburg; an AI system presented at Parliament,
  Cape Town. Phila's event photo and approved photos in `public/images/`.
- Before/after figures on the homepage are **illustrative benchmarks** and must
  keep that label.

Absent, and never to be invented: client results from private AI, finance or
legal client results, testimonials nobody has given, a published per-employee
corporate rate. Placeholders stay visible (`ToCome`).

## Product Principles

1. Ownership is the argument. Every surface should make "owned, not rented"
   easier to believe.
2. Proof is real or it is absent. A missing figure stays missing.
3. The ask never costs the reader their place. Applying is always one step away
   and never hidden behind an effect.
4. The owner's time is the scarce thing. Pages respect it with clear,
   fast-loading, phone-first reading.
5. Decoration never carries content. If the motion fails, the page still says
   everything.

## Accessibility & Inclusion

WCAG 2.2 AA is the floor (confirmed October 2026): contrast, full keyboard use,
visible focus, 44px tap targets, readable type on phones, and reduced-motion
support on every animated scene.
