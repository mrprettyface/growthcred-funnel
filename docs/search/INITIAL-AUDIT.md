# GrowthCred: SEO, AEO and GEO audit and implementation plan

Audit date: 20 September 2026. Website: https://growthcred.co.za/.

GrowthCred has a coherent commercial offer, a named founder, South African positioning and a functioning JavaScript-rendered sales page. Its discovery infrastructure is substantially weaker than its sales presentation. The first investment should be making the existing offer reliably crawlable, current and explicit, then building a small body of useful, evidenced content around the searches buyers actually make.

SEO means discovery in conventional search; AEO means answering specific questions well; GEO means being usable as a source in generative search and AI answers. These overlap. This plan treats them as one publishing and measurement system, with platform-specific crawler controls where needed.

## Scope and confidence

Reviewed live HTTP responses, rendered homepage and webinar, rendered metadata and FAQ text, the deployed JavaScript bundle, local routing/components/configuration, sampled public search results and current primary documentation. Ten additional paths were fetched beyond the homepage, including a deliberately nonexistent path. Saved response files and route-summary.json accompany this report.

**Live evidence** is distinguished from **local code evidence**: production loads index-b6s82r7i.js; local dist/index.html uses a newer asset. The local contact and brain routes are absent from the inspected deployed router. Do not redeploy the entire dirty working tree without reviewing the unrelated changes.

No authenticated Search Console, analytics, Bing Webmaster Tools, Business Profile, server logs, backlink index or keyword-planning account was accessed. Search volume, CPC, ranking history, actual conversions, index coverage and AI citation share remain unmeasured. Public search samples are not a complete Google index or a reproducible Johannesburg rank tracker. The PageSpeed API returned HTTP 429; browser-based PageSpeed was also attempted. Its final status is recorded in the performance addendum below.

## Findings and remediation

| Priority | Finding and evidence | Why it matters | Concrete action |
|---|---|---|---|
| P0 | Homepage initial response is 1,736 bytes and contains an empty root div, no body copy or H1. Ten tested paths return the identical document. | JavaScript must execute before content can be understood. Google can render JS, but this adds dependency and other fetchers may receive almost no usable content. | Generate complete HTML for public marketing pages at build time, or use SSR. Keep forms and animation as enhancements. |
| P0 | /robots.txt and /sitemap.xml return HTTP 200, text/html, with homepage HTML. | No usable crawl policy or sitemap is being served at those endpoints. This does not prove all bots are blocked. | Ship real plain-text robots.txt and XML sitemap; exclude these files from SPA fallbacks and verify response types. |
| P0 | http://growthcred.co.za/ and https://www.growthcred.co.za/ both returned HTTP 200 on HEAD, without Location. | Protocol/host variants are not consolidated at the server. | Choose https://growthcred.co.za/; redirect alternate hosts/protocols in one permanent hop, preserving path and query. Verify GET too after implementation. |
| P0 | No canonical, robots meta or JSON-LD on the rendered homepage; no Open Graph or Twitter metadata. Tested initial responses repeat the homepage title/description. | Weak page differentiation, duplicate signals and uncontrolled sharing previews. | Build a route metadata registry and emit it in initial HTML. Add self-canonicals to intended indexed pages and suitable social images. |
| P0 | /seo-audit-missing-20260920 returned HTTP 200. Local and deployed routers send unknown paths home. /workshop and /agency also return 200 before JS navigation. | Soft-404 risk and avoidable client-side redirects. | Server-side 301/308 for real aliases; actual HTTP 404 plus useful page for unknown URLs. Restrict fallback to known application routes. |
| P0 | Live /webinar still advertises Wednesday 9 September 2026 and offers seat registration. | Past-event urgency undermines conversion and factual freshness. | Show a verified replay, next confirmed event or truthful waitlist. Use date-aware content/state, including calendar and signup confirmation. |
| P0 | Workshop date/venue block and proof section do not appear live. Local WORKSHOP_EVENT=null and PROOF=[]. | A booking decision lacks event logistics; strong outcome claims lack published case evidence. | Confirm next event and publish facts near booking CTA. If no date exists, clearly explain scheduling/waitlist before taking payment. Publish approved measured proof when available. |
| P1 | /contact redirects to homepage in the live browser despite a local Contact.tsx. | The code improvement is not deployed; public trust/navigation remains limited. | Include the verified contact page in a controlled release and link it in navigation/footer. |
| P1 | H1 is “Get 10 Hours a Week Back, in One Day.” Eyebrow is “The one-day workshop.” | Benefit is clear, service category and locality are absent from the principal heading. | Add explicit AI workshop/training language and Johannesburg context where delivery is confirmed. Preserve the outcome as supporting copy. |
| P1 | /call copy describes taking work off the owner's plate but has little concrete scope, pricing explanation or implementation detail. | A buyer comparing automation providers has unanswered questions. | Add a dedicated service page covering workflows, integrations, process, deliverables, ownership, maintenance and quote factors. |
| P1 | No dedicated guide, case-study or about routes in the inspected routers. | Few useful landing destinations for distinct discovery intents. | Add a small resource hub, founder profile and approved case studies; link them to offers. |
| P1 | Seven homepage FAQs exist in native details elements after JS, but mostly address sales objections. | Useful starting point; insufficient coverage of factual buying questions. | Add direct answers about cost, location, format, requirements, tool costs, outcomes and support. Keep answers in initial HTML. |
| P1 | Local analytics only pushes dataLayer events; inspected live scripts show Whop tracking but no Google tag/GTM loader. | Event calls alone do not prove organic attribution or conversion reporting. | Select/configure analytics, verify delivered events and reconcile paid purchases with the payment system. Do not claim all analytics is absent. |
| P1 | Live JPEG Content-Length: the-drain.jpg 856,041 bytes; the-outcome.jpg 688,793 bytes. | These two images alone total 1,544,834 bytes before responsive variants. | Create responsive WebP/AVIF, preserve image quality and layout space, defer below-fold loading. |
| P2 | Image dimensions are absent as HTML attributes, but inspected components reserve space using CSS height/aspect ratio. | A reason to validate stability, not proof of a CLS failure. | Keep reserved space and test actual layout shifts on mobile. |
| P2 | A guarantee heading is exposed in the accessibility tree as separated characters. | Animation can harm reading and extraction. | Give animated text an intact accessible equivalent; verify no duplicate reading. |

Google's [JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) explains rendering and status-code considerations. This audit does **not** infer that React makes Google indexing impossible.

## Offer and content readiness

The price shown live is R990 at a founding rate, with a stated later R1,950 price. Keep any price, VAT treatment, available seats and dates synchronized with checkout. Do not add these to markup from memory or infer a workshop date from source comments. The refund promise includes attendance, doing the builds and 30 days of use: make that clear near the promise and consistent with the refund policy.

The live bundle contains freeClass:null, matching the local video configuration. Local Class.tsx offers “Watch the class” then renders that slot after signup. This is a **delivery risk identified in code**, not a tested signup failure: no lead was submitted during the audit. Verify the real video/replay and success flow before sending more organic visitors there.

Strengths to retain: one clear homepage H1; genuine founder identity and social profile links; legal company name/registration and Rosebank context; descriptive alt text; ordinary crawlable links after render; readable FAQ answers in the rendered DOM; pricing; an outcome calculator with disclosed assumptions. Do not replace these with keyword stuffing or invent testimonials.

## Search strategy: attract buyers rather than generic AI traffic

Recommended initial market: owners of businesses with roughly 3–50 people, as the current copy states, starting with Johannesburg/Gauteng and extending nationally only for genuinely available services. Prioritize in-person practical training and scoped done-for-you automation. “Hot” below means **high purchase intent hypothesis**, not verified search volume or a rising trend.

| Priority | Search cluster and examples | Intended destination | What the page must resolve | Conversion |
|---|---|---|---|---|
| First | AI workshop Johannesburg; AI workshop for business owners Johannesburg | Improve / initially | Audience, real venue/date, price, agenda, requirements, outcomes | Book confirmed workshop or join explicit waitlist |
| First | AI training for small business South Africa; practical AI training for business owners | /ai-training-south-africa | Available formats, programme choices, skill level, geographic coverage | Choose workshop or team enquiry |
| First | AI automation services South Africa; AI automation company Johannesburg | /ai-automation-south-africa | Actual workflows, scope, integration, timeline, support, ownership | Qualified application at /call |
| First | AI workshop cost South Africa; AI training prices Johannesburg | Price section on /; supporting /guides/ai-training-cost-south-africa | Per-person vs team rate, VAT and tool costs, what is included | Book or request team quote |
| First | ChatGPT training for business Johannesburg | Relevant section within training page initially | Confirm taught tools and hands-on tasks | Workshop booking |
| Second | AI automation cost South Africa; how much does business automation cost | /guides/ai-automation-cost-south-africa | Scope drivers, setup vs ongoing costs, grounded examples | Scope assessment |
| Second | AI training for teams Johannesburg; corporate AI workshop South Africa | /team-ai-training only if offered | Group size, role-based exercises, delivery options and procurement needs | Team enquiry |
| Second | AI for proposals and quotations; automate business follow-ups | /guides/ai-proposals-and-follow-ups | Real walkthrough, inputs, approvals, limitations and result | Workshop / service |
| Second | How to give ChatGPT context about my business; business knowledge base for AI | /guides/business-brain | Practical example and explanation of the GrowthCred method | Playbook or builder |
| Second | AI workshop vs consultant; AI training vs done-for-you automation | /guides/ai-training-vs-automation | Fair comparison of effort, cost, ownership and fit | Choose offer |
| Later | AI for construction businesses South Africa; AI for professional services | Evidence-led sector case studies | Real client work and relevant constraints | Qualified enquiry |
| Later | How much time can AI save my business | /tools/admin-time-calculator | Current calculator, formula, assumptions, illustrative result | Workshop / assessment |

Avoid targeting credit, funding or loans because of the brand name. Avoid broad “AI” or academic “machine learning courses” as initial goals. Avoid mass city pages and tool-specific service claims that GrowthCred cannot deliver.

Keep the homepage as the primary workshop destination initially, protecting existing links and the funnel. The training page should be a distinct programme overview, not a duplicate workshop page. If future data justifies moving the workshop to a descriptive URL, do it as a mapped migration. URLs alone will not overcome weak content.

Validate demand in Google Keyword Planner with South Africa and Gauteng/Johannesburg geography, English initially, and monthly history; separate broad and close-match terms. Compare seasonality in Trends where data exists. Combine this with Search Console queries, real enquiries and SERP intent. Rank opportunities by offer fit, buying intent, attainable competition and evidence available, then volume. No volume/CPC numbers are fabricated here.

## Competitors: what the sampled results show

These are pages surfaced by the available search service, not a measured Google top-three ranking.

| Provider | Observed strength | GrowthCred response |
|---|---|---|
| [DB23 workshop page](https://db23.co.za/ai-workshops/) | Dedicated workshop destination; explicit formats, starting price, audience and practical FAQs. | Make the GrowthCred workshop facts equally easy to compare; lead with what participants actually build. |
| [DFE Consulting](https://dfeconsulting.co.za/) | Johannesburg context, named facilitator and differentiated training formats/rate card. | Explain facilitator experience and exactly what a seat includes. Team rates and per-person rates are not directly comparable. |
| [QuantumBerry AI education](https://quantumberryai.co.za/services/ai-education) | Clear programme levels, tools and delivery options. | Publish only the tools/programmes you deliver, with concrete outcomes for each. |
| [Cognexa pricing](https://cognexa.co.za/pricing.html) | Dedicated explanation of automation costs and scope. | Answer commercial scope questions before the application, even if final prices remain bespoke. |

The opportunity is specific: a founder-led, practical workshop that produces usable business workflows. R990 is a potentially attractive entry price, but low pricing alone does not establish quality or equivalent value. Add demonstrated work and clearly separate the workshop from later paid engagements.

## Suggested homepage treatment

Proposed title: **AI Workshop Johannesburg for Business Owners | GrowthCred**.

Proposed H1: **A practical AI workshop for Johannesburg business owners.**

Supporting promise: **Build AI workflows around your business—and get time back every week.**

Suggested factual introduction, subject to delivery confirmation: “GrowthCred helps South African business owners put AI to work on repetitive admin. In our one-day workshop, you document your business context, connect it to an AI worker and build routines using your own work. The current founding rate is R990.”

Immediately follow with a short facts panel: location/format, next confirmed date, duration, seat price and VAT treatment, tools/subscriptions required, what to bring, named facilitator and booking status. Where facts are not yet settled, say so honestly. Keep the current benefit-led narrative below this introduction and measure conversion after the change.

Suggested description: “Build practical AI workflows around your business in a one-day GrowthCred workshop. Explore the agenda, current price and Johannesburg session details.” Use only once those details are actually published. Metadata is a description, not a guaranteed search snippet.

Add concrete examples: proposal drafting with review, quote preparation with approved pricing, scheduled internal research and follow-up drafting. Distinguish demonstration data from customer results, and human approval from autonomous sending.

## AEO: publish answers people can use

On offer pages, start important sections with a plain answer, then explain it with examples. This is an editorial choice, not a required word-count formula or a special ranking mechanism.

Answer these before asking someone to book: What is GrowthCred? Who teaches it? Who is it for? Where/when does it happen? What does it cost? Which tools are needed? What subscriptions cost extra? What will be built? What still needs human review? How much support follows? How does the guarantee work? How does training differ from the service?

Example grounded answer: “GrowthCred currently advertises its one-day workshop at a R990 founding rate. Participants build workflows around their own business with guided instruction. Before booking, check the confirmed session details and whether any tool subscriptions are required.” Replace uncertainty with verified facts before publication.

Give each useful guide an identifiable author, honest review date, example input/output, limitations, sources where relevant and links to the appropriate offer. Turn the calculator into a standalone resource with a static worked example so it is useful before anyone moves a slider. Do not present illustrative annual time value as guaranteed cash savings.

FAQ answers already exist in details elements; do not misdiagnose collapsed answers as entirely missing. The important gap is initial HTML delivery and factual coverage. Google [retired FAQ rich results from 7 May 2026](https://developers.google.com/search/updates), so do not spend this project chasing FAQ rich-result badges. Useful questions and answers still matter to visitors.

## GEO: become a credible source that AI search can retrieve

Google says ordinary SEO remains foundational for its AI features and no special AI schema/text file is required. Prioritize useful, accessible and original content. See [Google's AI feature guidance](https://developers.google.com/search/docs/appearance/ai-features).

1. Make public HTML complete and allow intended search crawlers. OAI-SearchBot controls ChatGPT search crawling independently of GPTBot training preferences; see [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots). PerplexityBot is its search crawler; see [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers). Inspect real logs and host rules before changing firewall policies. Merely sending a bot user-agent locally cannot prove real crawler access.
2. Establish a consistent entity: GrowthCred (Pty) Ltd, founder Phila Ngwenya, actual location/service area, contact details and matching official profiles. Add an About page with substantiated experience and links to work. Use durable Organization/Person identifiers in JSON-LD.
3. Publish primary evidence: before/after task time, workflow screenshots, measurement period, sample size, what changed, what still requires people and limitations. Get permission for customer identity, quotes and assets. The existing empty proof array is an opportunity to populate responsibly.
4. Create resources worth citing: annotated business-context template, a real proposal workflow, a workshop-vs-implementation comparison and a transparent costing guide. Original experience is more defensible than generic AI listicles.
5. Earn relevant references from actual partners, event hosts and customers. Prepare useful workshop summaries and case studies that partners may voluntarily link to. No fake reviews, purchased link packages or automated forum seeding.
6. Reuse founder videos as public tutorial pages with edited transcripts, descriptive titles and relevant offer links. Check video availability first. Add VideoObject only for a real video with correct required details; metadata alone cannot fix inaccessible media.

Organization, Person, BreadcrumbList and genuinely relevant Service/Course/Event/VideoObject types can describe facts. Validate current schemas and eligibility during implementation. Do not attach a fake address, Event without confirmed dates, fabricated ratings, or mark all offers as retail products for stars. Structured data does not guarantee rankings or AI recommendations. llms.txt is optional and low priority here.

## Local visibility

The site names Rosebank/Johannesburg; no Business Profile ownership or eligibility was verified. First establish whether GrowthCred has an eligible staffed customer-facing location or qualifying in-person service-area business. A hired workshop room is not automatically a qualifying permanent office. Google's [business representation rules](https://support.google.com/business/answer/3038177?hl=en) specifically address coworking offices.

If eligible, complete one accurate profile: real name, best available matching category, true hours, website and booking link, real photographs, services and consistent contact details. Request honest feedback from actual attendees without incentives or review gating. Do not create a profile per suburb. Build a Johannesburg landing section with actual delivery information; extend location pages only where there is distinct useful evidence.

## Technical implementation design

Use build-time rendering for stable marketing pages while retaining React for interactive areas. This fits the current static deployment more directly than assuming a Node server or replacing the whole framework. Audit browser-only code and animation initial states: prerendered text must remain visible before hydration and with reduced motion. Do not serve different sales claims to bots.

A metadata/content registry should drive title, description, canonical, indexing policy, social tags, sitemap inclusion and schema. A public sitemap should contain only canonical, indexable HTTP-200 destinations. Exclude checkout, order states, aliases, unknown paths and unready pages. Use truthful lastmod values.

| Route group | Proposed handling |
|---|---|
| / and new training/service/about/resource pages | Complete initial HTML; 200; unique metadata; self-canonical; sitemap inclusion |
| /workshop | Permanent redirect to / |
| /agency | Redirect to /call initially; revise once the service page is approved and migration mapped |
| /call | Preserve application; keep indexable only if it supplies distinct service content, otherwise noindex after service page replaces discovery role |
| /class | Index only after media delivery and substantial public description are verified |
| /webinar | Refresh to legitimate next session or replay; index only when current/useful |
| /webinar-plain | Canonical to /webinar if substantially equivalent and retained as an alternative |
| /playbook | Index if public description offers independent value; keep user submission state out of search |
| /checkout, /upsell, /downsell, /build, /thank-you | Initial noindex or response X-Robots-Tag; absent from sitemap; preserve payment and session behavior |
| /brain | Decide based on public-tool readiness; user-entered content must not become indexable URLs |
| /terms, /privacy, /refunds | Readable, linked, uniquely titled; indexability optional by policy, not keyword targets |
| Unknown path | Actual 404, with helpful navigation |

Do not robots-disallow a page merely to remove it from results: the crawler must be able to fetch noindex. Noindex is also not access control. Preserve canonical paths while retaining functional campaign/referral queries. Do not strip payment query parameters during host redirects.

Production reports LiteSpeed; .htaccess is therefore the primary host-rule candidate to verify. _redirects and _headers files alone are not evidence those rules run on this host. Keep Apple Pay .well-known handling and existing payment/lead integrations working.

## Performance and measurement

Compress/rescale the large images; use responsive source selection; reserve layout space; retain lazy loading below the fold. Review the embedded video loading strategy, font requests and heavy animation startup. Existing code already splits some animation packages and legal pages, so do not assume all JS is loaded everywhere. Measure waterfall/main-thread cost before choosing libraries to remove.

Acceptance targets for real-user 75th-percentile experience: LCP at most 2.5 seconds, INP at most 200 ms and CLS at most 0.1, segmented by device. These are [Web Vitals targets](https://web.dev/articles/vitals), not measured GrowthCred values. A Lighthouse score or Total Blocking Time does not establish real-user INP.

Measurement setup: verify domain ownership in Search Console and Bing Webmaster Tools; submit sitemap; inspect important URLs and Google-selected canonicals; check any manual actions or indexing reasons. Configure pageviews on client navigation and verified conversions. Record form success only after accepted submission, payment only after verified payment, and WhatsApp clicks separately from actual leads. Deduplicate purchases and exclude personal information from analytics payloads.

Dashboard: indexed intended pages; nonbrand clicks/impressions by landing page and intent; relevant query positions and CTR; qualified organic enquiries; workshop purchases/revenue; call-to-sale outcomes; page speed; attributable AI referrals. Track original source through checkout where supported. AI referrals are incomplete because referrer data can be absent. Add a voluntary “How did you hear about us?” question as supplementary evidence.

Maintain a fixed monthly set of unbranded AI queries, including “Where can a Johannesburg business owner learn practical AI?”, “Who helps South African small businesses automate admin?” and “What does an AI workshop in Johannesburg cost?”. Record platform, date, wording, search mode, cited sources and whether GrowthCred is accurately described. Small samples are directional, not a universal rank. No AI-platform visibility baseline was measured in this audit.

## Roadmap and acceptance criteria

| Window | Deliverables | Acceptance criteria | Dependency |
|---|---|---|---|
| Days 1–7 | Crawl files, redirects, status handling, page metadata, initial HTML pilot, refreshed event state, measurement baseline | robots is text; sitemap parses; aliases permanently redirect; unknown path returns 404; homepage source contains H1/body/canonical; dated offers are truthful | Hosting access; next-event facts; analytics ownership |
| Days 8–21 | Public-page rendering rollout, homepage facts, contact/about, service/training pages, image work, indexing requests | All intended pages have complete HTML and distinct intent; mobile conversion paths work; schema matches visible content; no regression to checkout/forms | Offer scope, prices/tool requirements, verified business details |
| Days 22–45 | First three useful guides, one approved case study, founder tutorial transcript, eligible Business Profile improvements | Each asset answers a specific buyer question and links to an offer; case evidence is documented and approved | Founder expertise, customer permission, real media |
| Days 46–90 | Second case study and further guides chosen from query data; relevant partner outreach drafts; iteration from conversions | Report nonbrand traffic and qualified conversions; update content based on actual impressions/questions; remove stale offers automatically | Sufficient traffic and reporting access |

First guide sequence: workshop/training costs; practical business-context setup; proposals and follow-ups. Next: training vs implementation and automation cost. Prefer a few original, maintained assets over dozens of generic AI-written pages.

Indicative implementation effort, not a fixed quote or ranking deadline: technical foundations 3–6 focused developer days; offer/trust pages 2–4 days after facts are available; initial guides and case-study production 4–8 editorial days depending on evidence. Account setup, approvals, indexing and search growth have separate elapsed time. Review progress at 30/60/90 days; competition and a small starting footprint may require longer for meaningful nonbrand results.

## What I can do for you

I can implement the rendering and SEO foundation, host-rule changes, metadata, sitemap, truthful schema, performance improvements, offer/resource pages, analytics wiring and regression verification in this project. I can draft guides, case studies from your evidence, profile descriptions and outreach materials. I can prepare a reviewable deployment and verify production when authorized and access is available.

I need your actual event details, service scope, tools and prices, publishing permission for customer proof, and access or exports for Search Console/analytics/hosting when those steps arise. I cannot manufacture customer results, independently verify an account only you control, or guarantee first-place rankings or AI citations.

No production changes were made during this audit. The next recommended implementation is the technical foundation plus refreshed offer facts, followed by the two commercial discovery pages and proof content.

## Performance addendum: completed live mobile test

The browser-based [PageSpeed analysis](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fgrowthcred.co.za%2F&form_factor=mobile) completed after the API quota failure. Observed report time: 20 September 2026, 23:21 SAST. Emulated Moto G Power, slow 4G, Lighthouse 13.4.1, initial page load. This is one lab run; real-user experience showed **No Data**.

| Metric | Observed result |
|---|---:|
| Performance | 60/100 |
| Accessibility | 97/100 |
| Best Practices | 96/100 |
| Basic Lighthouse SEO | 92/100 |
| First Contentful Paint | 3.4 s |
| Largest Contentful Paint | 3.8 s |
| Total Blocking Time | 440 ms |
| Cumulative Layout Shift | 0.179 |
| Speed Index | 5.4 s |

The SEO score does not evaluate competitive keyword targeting, authority, conversion quality or AI citation likelihood. It must not be read as “92% optimized.” Lighthouse independently flags invalid robots.txt with 20 parsing errors.

Expanded diagnostics identify specific next steps:

- **Video loading:** the unused-JavaScript table attributes 845.6 KiB of transfer to YouTube, with 526.5 KiB estimated unused on initial load. Prioritize a lightweight poster/play-button facade that loads the player on interaction, while preserving an accessible video link and discoverable descriptive content. This is more evidence-based than blaming all the site's animations.
- **First-party JS:** that table reports 226.0 KiB transfer and 128.6 KiB estimated unused across the main, GSAP and React files. Audit eager imports and move checkout-only code off the landing-page path where possible. An unused estimate does not mean code can be deleted without functional review.
- **Render blocking:** the stylesheet and Google Fonts request are listed; Google Fonts contributes 780 ms in the table. The tool estimates 1,350 ms potential savings across render-blocking requests. Consider fewer font variants and carefully measured font delivery changes; these estimates are not additive guarantees.
- **Stability:** the layout-shift diagnostic identifies the footer for the reported 0.179 shift. Inference to test: the short Suspense loading state is replaced by the full page, moving the footer. Complete initial HTML and stable fallback geometry should be tested before attributing this to image dimensions. The report also lists heading shifts in another diagnostic table; do not sum these into the reported CLS.
- **Main thread:** 1.6 seconds JavaScript execution, 3.1 seconds main-thread work and 10 long tasks. Validate improvements with equivalent mobile runs and interaction checks.

Make the video facade and initial-render stability work part of the first technical release. Compare a small set of equivalent before/after runs, and monitor real-user LCP/INP/CLS when field data becomes available. The 1/3 experimental Agentic Browsing result also shown in Lighthouse is not a GEO visibility score; its llms.txt recommendation does not override Google's stated search requirements.

## Public search observation

The available search service returned no results for the focused queries “growthcred.co.za” and site:growthcred.co.za during this audit. This supports investigating discovery promptly, but **does not establish zero Google-indexed pages**, a penalty, zero backlinks or no AI mentions. Search Console URL Inspection and actual performance data are the appropriate follow-up.

## Audit completion evidence

All four audit gates were reviewed: live-vs-local evidence, search/content/source review, actionable roadmap, and claims/limitations review. Four met; zero unmet; zero abandoned. Performance was recovered through the browser after the API quota error. The remaining account data and customer facts are implementation inputs, not invented audit findings.
