---
target: homepage
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/growthcred-funnel/src/pages/Home.tsx"
target_fingerprint: "sha256:bb45a6c863c786985a5355a71e3b5c040230a41653c88310e7cffbae165736de"
target_path: /home/user/growthcred-funnel/src/pages/Home.tsx
timestamp: 2026-10-13T05-58-51Z
slug: src-pages-home-tsx
---
Method: dual-agent (A: design review, B: detector + browser evidence)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No sense of place in a 19-screen page |
| 2 | Match System / Real World | 3 | "Agents", stage names, fake terminal path read as vendor jargon |
| 3 | User Control and Freedom | 3 | Guide card closable, but lands over hero at 1 s |
| 4 | Consistency and Standards | 2 | Three Apply labels; three revenue ranges |
| 5 | Error Prevention | 3 | Stage Apply links all go to bare /call; chosen stage lost |
| 6 | Recognition Rather Than Recall | 3 | Guarantee ~5 screens above final Apply |
| 7 | Flexibility and Efficiency | n/a | Single-path landing page |
| 8 | Aesthetic and Minimalist Design | 2 | 14 sections; 27 cards/FAQs between peak and close; inflated h2s |
| 9 | Error Recovery | 3 | Plain, in-voice form errors |
| 10 | Help and Documentation | 3 | FAQ strong; cost answer "It depends" with no next step |
| Total | | 25/36 | Acceptable (69%) |

## Design Specificity Verdict
Half authored, half template. Authored: marker headline, line scenes, R200 vs R20,000 bar, guarantee seal, blueprint grid, founder frame. Template: eyebrow/heading/numbered-card skeleton x10, SaaS-console Before/After with window dots, stock 3-tier stages. Missed: "owned, not rented" has no visual of its own (#renting and #own built identically; #own header leaves right half empty at 1440).
Detector (built page): low-contrast 11 warnings + ~16 advisories, kicker-above-heading 8, radial-spotlight-glow 5, gradient-text 4, marquee 1, tiny-text 3, wide-tracking 1. Brand-deliberate false positives: eyebrows, glows, gold text, marquee (has reduced-motion branch), 7px guide-cover lettering, logo. cramped-padding (26) only in static dist scan: artifacts. Source scan clean because it cannot evaluate TSX.

## Priority Issues
- [P1] Intent leaks after the guarantee: #ways (Start smaller), 12 guide cards, 10 FAQs before the close; guarantee has no Apply. Fix: Apply in guarantee panel, FAQ above ways, guides to 3, ways below close. /impeccable distill, /impeccable layout
- [P1] AA contrast failures on meaningful text: gold on paper 2.3-2.45:1 (client names, revenue bands, founder title, Home.tsx:219 strong line, FAQ +), muted labels 4.43:1, benchmark disclaimer cream/45 3.7:1 (Home.tsx:328). Fix: darker text-gold for light bgs, darker muted, disclaimer >= cream/70. /impeccable colorize, /impeccable polish
- [P1] Guide card competes with first screen and its promise (src/lib/guide.ts:32-33) contradicts the owned-not-rented positioning. Fix: delay/suppress on / only, with Phila's sign-off. /impeccable harden
- [P2] No "what happens next" at Apply; three Apply CTAs in first phone view; secondary link under sticky bar. Fix: sticky bar after hero CTA (CSS only), one process line in Phila's words, guarantee echo at close. /impeccable clarify, /impeccable adapt
- [P2] Defects: "Transformation" overflows stage card at 1440; close heading breaks "20-"/"40%"; story grid voids; header 95% lets text ghost; stage H3 accessible name "Command CoreVelocity"; footer links 36px vs project 44px. /impeccable polish, /impeccable typeset

## Persona Red Flags
Jordan: Agents/equipment unexplained; three revenue ranges; can't tell which person is Phila. Riley: "My Claude" quote (src/lib/home.ts:247) praises a rented tool; illustrative numbers styled as live dashboard; TaiAscend "Client result" links to generic /stories. Casey: 29 screens; bottom sheet mid-argument; triple Apply; hero graph line through sub. Owner between meetings: no fit/commitment/next-step answers within 90 s; guarantee ~12 phone screens down.

## Minor Observations
65 -> 35 lacks unit beside big number; strict light/dark alternation; "Five seats. Sold out." promo graphic; FAQ "R5M to over R200M" conflicts with audience (Phila's call); reduced motion and keyboard correct.

## Questions to Consider
Why is the most prominent proof about a rented model? Does / need "Other ways in" and the field guide? Could the admin-time-calculator number replace illustrative benchmarks?
