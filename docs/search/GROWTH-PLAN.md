# Search growth operating plan

## Owner actions for first-page rankings (24 September 2026)

The on-site checklist is implemented and enforced by `GATES-seo-firstpage.md`. What is
left needs Phila's accounts, DNS and relationships. In order of impact:

1. **Deploy first.** Push, then cPanel → Update from Remote → Deploy HEAD. Nothing
   below works on pages Google cannot fetch.
2. **Google Search Console.** Add a *Domain* property for `growthcred.co.za` and
   verify it with the DNS TXT record Google gives you (in the DNS panel of the
   hosting provider). Submit `https://growthcred.co.za/sitemap.xml`. Then use
   URL Inspection → Request indexing for `/`, `/stories`, and the new service
   pages. Check the Pages report after a week for anything "Crawled – not indexed".
3. **Bing Webmaster Tools.** Import the site from Search Console (one click) and
   submit the same sitemap. Bing's index also feeds several AI search products.
4. **Google Business Profile — check eligibility honestly.** Google requires
   in-person contact with customers. The WeWork Rosebank sessions may qualify
   you as a *service-area business* (address hidden). Do not list WeWork's
   address as GrowthCred's own, and do not invent opening hours.
5. **Links from real relationships** (the highest-value item on the list). Ask
   each client and partner for one link, for example to their story:
   MNE Waste → `/stories/mne-waste`; Demure International / Enigma Essentials →
   `/stories/demure-international`; TaiAscend, Ncedo Afrika, Melsoft Academy,
   MpiloTech → `/` or the relevant service page. Ask WeWork for an event or blog
   mention of the talks (this also settles the brand sign-off). If the
   Parliament presentation was covered anywhere, ask for a link from that page.
6. **A few real directory profiles, not bulk listings.** Clutch and GoodFirms,
   plus one or two South African business directories you would actually be
   found in. Use exactly the same details everywhere: GrowthCred (Pty) Ltd ·
   Rosebank, Johannesburg · info@growthcred.co.za · https://growthcred.co.za.
7. **Reviews.** Once a Business Profile or Clutch profile exists, ask Sandile,
   Macaela and TaiAscend to leave a review in their own words. Never offer
   anything in return; Google and Clutch both prohibit incentivised reviews.
8. **Keep publishing.** One real story or task demonstration a month, from
   actual work with permission. Share each on LinkedIn with a link to the page.
9. **Measure after four weeks.** Search Console → Performance, by page and by
   country. Run PageSpeed Insights on mobile for `/` and one service page.
   Improve the titles of pages with impressions but a weak click-through rate.

Confirmed by Phila on 24 September 2026: the practices on `/data-and-security`
(now published), that UK, US, Australia and Africa engagements run online, and
that Macaela and Sandile are happy to be named.

## Priorities and measurement

The initial audit is in INITIAL-AUDIT.md. Candidate topics below reflect relevant commercial intent, not verified high search volumes. No Search Console, paid keyword data or GA4 ID was available. Do not equate broad trending AI searches with customers ready to buy.

| Intent | Primary page | Queries to validate |
| --- | --- | --- |
| Learn practical business AI | /ai-training-south-africa | AI training South Africa; AI workshop for business owners; online AI training for small business |
| Hire implementation help | /ai-automation-south-africa | AI automation South Africa; business process automation for small business |
| Compare options | /guides/ai-training-vs-automation | AI training vs automation; should I hire an AI consultant |
| Budget training | /guides/ai-training-cost-south-africa | AI training cost South Africa; business AI workshop price |
| Budget implementation | /guides/ai-automation-cost-south-africa | AI automation cost South Africa |
| Solve a concrete task | /guides/ai-proposals-and-follow-ups | AI for business proposals; automate customer follow-ups |
| Understand business context | /guides/business-brain | AI business brain; how to give ChatGPT business context |

Weeks 1–2: deploy and verify crawling; connect Search Console/Bing; collect a baseline of indexed pages, branded/nonbranded impressions, clicks and qualified enquiries. Configure GA4 with consent when an ID exists. Run mobile PageSpeed after deployment and record LCP/CLS/INP field data separately from lab results.

Weeks 3–4: export Search Console queries by page and South Africa; compare with Keyword Planner/Trends if available. Choose two high-intent queries with impressions and weak CTR to improve titles and introductions. Record the change date; do not change titles every day. Avoid city doorway pages for an online workshop. (24 Sep 2026: market pages were added at the owner's request, each with distinct content; `verify-seo-onpage.mjs` fails if any two share more than 25% of their text.)

Weeks 5–8: publish one consented case study and two task demonstrations based on actual work. Capture baseline task time, sample size, dates, workflow, tools, review steps and the measured result. Obtain written client approval for names/quotes/screenshots. Until then use clearly labelled examples. Publish one useful video with an accurate transcript and link the relevant guide.

Weeks 9–12: revise the pages generating qualified enquiries; expand only where actual query or customer evidence supports a distinct need. Compare 28-day periods for nonbrand clicks, enquiry quality and consented conversion rate, noting the denominator and tracking gaps. Choose actions from evidence rather than ranking promises.

## AEO/GEO checks

The release supplies direct answers, stable entity facts, authorship, visible HTML and links between relevant guides. Structured data must match visible facts. There is no special schema or llms.txt file that guarantees inclusion in AI answers. Keep search crawler access separate from any future model-training policy decision.

Every two weeks, run the same five questions in the same chosen AI/search products: “Where can a South African business owner learn practical AI online?”, “How much does AI training in South Africa cost?”, “Should a small business learn AI or hire automation help?”, “How can AI help with proposals and follow-ups?”, and “What is an AI business brain?” Record product/model, date, exact prompt, citations, whether GrowthCred appeared, cited URL and factual errors in query-log.csv. Use a fresh session and consistent South Africa context. This is a sample of variable answers, not a market-share measurement.

## Trust and authority requiring owner input

Keep the legal name, public contact details, founder biography and social profiles consistent. Confirm tool subscriptions and VAT treatment before adding definite claims. Add Event markup only when an actual date/time is announced; expire registrations when the session has ended. Add Course markup only when a genuine published course satisfies the relevant requirements.

Google Business Profile is not automatically appropriate: online-only businesses generally do not qualify. Check Google's eligibility rules against your actual in-person operations before creating a listing. Do not invent a public venue, opening hours or service area.

Build relevant links through real partnerships, guest workshops and useful demonstrations. No outreach has been sent. Suggested draft for an existing partner: “We have published a practical guide to [specific task] for South African business owners. If it is useful to your audience, would you consider including it in your resources? Here is the guide: [relevant URL]. Happy to contribute a practical demonstration.” Personalise and approve recipients before sending. Do not buy bulk directory or AI citation placements.

## Limits

Better technical accessibility and relevant content improve eligibility, not guaranteed rankings, traffic, AI citations or sales. The build does not manufacture demand, customer proof, backlinks or account access. The historical audit's live scores are baseline measurements; there is no claimed post-deployment Lighthouse score yet.
