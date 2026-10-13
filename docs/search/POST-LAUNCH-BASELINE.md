# Post-launch search baseline

Recorded: 24 September 2026 (Africa/Johannesburg)

Production: `https://growthcred.co.za`

## Verified locally and in a real browser

- The deployed homepage and `/workshop` render the intended release in a normal browser.
- The repository still passes `npm run verify:seo`: 43 routes, 32 sitemap URLs and 1,748 internal references, including the negative controls.
- The repository still passes `npm run verify:search-behavior`: consent, PII filtering, safe page URLs, successful leads and purchase deduplication remain covered.
- Google PageSpeed Insights fetched both tested production URLs successfully. This is useful evidence that Google's Lighthouse infrastructure can reach the deployed content, but it is not a substitute for Search Console's live URL inspection.

## Mobile PageSpeed baseline

These are one-off lab results, not field Core Web Vitals. Scores and timings can vary between runs.

| URL | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Speed Index |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 90 | 88 | 100 | 100 | 1.8 s | 1.8 s | 50 ms | 0.185 | 2.3 s |
| `/ai-proposal-automation` | 89 | 95 | 100 | 100 | 2.7 s | 2.8 s | 0 ms | 0 | 4.4 s |

Reports:

- Homepage: `https://pagespeed.web.dev/analysis/https-growthcred-co-za/z0dly7coje?form_factor=mobile`
- Proposal automation: `https://pagespeed.web.dev/analysis/https-growthcred-co-za-ai-proposal-automation/6wzospr6fh?form_factor=mobile`

Priority performance follow-up: investigate the homepage CLS of 0.185. It remains below Lighthouse's 0.25 poor threshold, but above the 0.1 good threshold. The service page's largest lab opportunity was an estimated 750 ms of render-blocking work. Re-measure before changing code because these are single runs.

## Hosting edge finding

Unauthenticated command-line requests received the Imunify360/WebShield JavaScript verification page before reaching the site. The same challenge cleared automatically in a normal browser. Spoofing a Googlebot or Bingbot user-agent did not bypass it, which is expected: Imunify validates known crawlers rather than trusting a user-agent string. Imunify's documentation says legitimate crawlers should be whitelisted, but Search Console's live URL test is still the authoritative check for this domain.

The WebShield/OpenResty response did not include `Strict-Transport-Security`, even though the repository's Apache configuration includes a one-year HSTS rule. Because the edge response is produced before Apache, the hosting provider must confirm crawler whitelisting and add HSTS at the edge or otherwise preserve the origin header.

Provider support request submitted as Domains.co.za ticket `#20260924-GHS-662500` on 24 September 2026:

> Subject: Search crawler access and HSTS on growthcred.co.za
>
> Please confirm that verified Googlebot and Bingbot traffic bypasses the Imunify360/WebShield JavaScript splash challenge for growthcred.co.za. Non-browser requests currently receive “Please wait while your request is being verified” from OpenResty. Google Search Console's live test can currently access the homepage, and the submitted sitemap is successful, but we would still like confirmation that verified Bingbot also bypasses the challenge.
>
> Please also add or preserve `Strict-Transport-Security: max-age=31536000` on every HTTPS response, including WebShield challenge responses. The origin `.htaccess` already sets this header, but it is absent at the edge. Please do not add `includeSubDomains` or `preload`, because mail and cPanel subdomains are intentionally excluded.

Relevant provider documentation: `https://docs.imunify360.com/features/under_attack_mode/` and `https://docs.imunify360.com/features/`.

Resolution check, 25 September 2026: Domains.co.za replied that it could not find a matching WebShield incident and requested a source IP, timestamp and User-Agent. Before transmitting those details, a fresh diagnostic request at 09:02 UTC returned directly from LiteSpeed, included `Strict-Transport-Security: max-age=31536000`, and did not present the JavaScript challenge. The complete live verifier then passed all 32 sitemap URLs, redirects, HSTS, robots, noindex and 404 checks. The issue is therefore not currently reproducible; retain ticket `#20260924-GHS-662500` and capture a fresh incident sample only if the challenge returns.

## Search-engine setup state

- Google Search Console Domain property for `growthcred.co.za` is verified under `pn56562677@gmail.com`; the verification TXT record is live in Domains.co.za DNS.
- Search Console reports `https://growthcred.co.za/sitemap.xml` as Success, last read 24 September 2026, with 32 discovered pages.
- Search Console's live URL test reports the homepage available to Google and indexable. Indexing requests were accepted for all five priority URLs below.
- Bing Webmaster Tools imported the verified property from Search Console successfully. The production sitemap was submitted separately and currently shows Processing, with 0 errors and 0 warnings.

Priority URLs for Google live inspection and indexing request:

1. `https://growthcred.co.za/`
2. `https://growthcred.co.za/stories`
3. `https://growthcred.co.za/ai-proposal-automation`
4. `https://growthcred.co.za/ai-follow-up-automation`
5. `https://growthcred.co.za/ai-admin-automation`

## Google Business Profile eligibility

Do not create a profile on the currently documented facts. Google's current policy requires in-person customer contact during stated hours. An online-only business is ineligible; an ongoing class or meeting at a location the business does not own or have authority to represent is also ineligible. A co-working address may be shown only when the business has clear signage, receives customers there during business hours, and is staffed by the business during those hours.

GrowthCred's WeWork talks establish real-world activity but do not establish those storefront conditions. A service-area profile becomes appropriate only if GrowthCred regularly travels to customers to deliver services in person; in that case the operating address should be hidden and only honest service areas listed.

Official policy:

- `https://support.google.com/business/answer/13763036`
- `https://support.google.com/business/answer/3038177`
- `https://support.google.com/business/answer/9157481`

## Relationship outreach — drafts only

No message has been sent. Each recipient and final wording requires owner approval.

### MNE Waste

> Hi Sandile — we published the story of the Operator's Brain you built with GrowthCred: https://growthcred.co.za/stories/mne-waste. If it accurately reflects the work and would help your audience, would MNE Waste consider linking to it from your website or a relevant company update? Please change anything that does not sound right before it is shared.

### Demure International / Enigma Essentials

> Hi Macaela — we published the story of how you sharpened the AI workflow for Enigma Essentials: https://growthcred.co.za/stories/demure-international. If it accurately reflects the session and is useful to your audience, would you consider linking to it from the company website or a relevant update? Please flag any wording you would like corrected first.

### WeWork Rosebank

> Hi — GrowthCred has published a recap of the sold-out Operator Intensive at WeWork Rosebank: https://growthcred.co.za/stories/operators-intensive-wework-rosebank. Could you confirm that you are comfortable with the WeWork name appearing in the story and, if the recap is useful to members, consider linking to it from an event recap or resources page?

### TaiAscend

> Hi — GrowthCred now references the approved “three days to two hours” workflow result on its client-stories hub: https://growthcred.co.za/stories. If the wording is accurate and useful to your audience, would TaiAscend consider linking to the page from a relevant company update or resources page?

### Ncedo Afrika, Melsoft Academy and MpiloTech

> Hi — GrowthCred has launched its practical AI automation and training site at https://growthcred.co.za. If the work we have done together is relevant to your audience, would you consider linking to the most useful page from a resources, partner or event page? I can suggest one specific page based on what your audience needs; no generic directory link is necessary.

### Review request after an eligible profile exists

> Hi — would you be willing to leave an honest review of your direct experience with GrowthCred, in your own words? Please mention only what you personally experienced; there is no incentive and no need to use suggested wording. I will send the direct profile link once it is ready.

## Measurement checkpoint

Recheck on 22 October 2026:

- Search Console Performance by page, query and country
- Page indexing reasons and Google-selected canonicals
- Core Web Vitals field data, if enough traffic exists
- Bing search performance and crawl issues
- the same two PageSpeed mobile URLs
- enquiries and confirmed sales separately; browser analytics is not the revenue source of truth
