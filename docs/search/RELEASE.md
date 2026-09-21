# Search release — 21 September 2026

## What is ready

GitHub main contains source and the built `dist/` release. Public pages render meaningful HTML before JavaScript. The release includes 14 indexable sitemap URLs, unique metadata, canonical URLs, structured organization/person/article/service/breadcrumb data, ten new search pages, readable FAQs and direct answers, responsive WebP images, local fonts, deferred video, and real 404 responses. Funnel, personal builder and legal routes are noindex. Existing payment and contact features are retained.

Workshop facts confirmed by the owner: online, R990, date/time/joining details confirmed on registration. There is no invented event date, review rating, accreditation, client case study or VAT statement. Missing downloadable packs now direct visitors to working free resources. Existing refund terms remain.

## cPanel deployment — owner action

1. In cPanel Git Version Control, open the GrowthCred repository. Select **Update from Remote** for `main`.
2. Open **Pull or Deploy** and select **Deploy HEAD Commit**. The checked-in `.cpanel.yml` copies `dist/` to `/home/growthc2/public_html/`, including `.htaccess` and `.well-known`. No npm build is needed in cPanel.
3. If deploying manually, upload the **contents** of `dist/` into the domain document root. Enable hidden files and include `.htaccess` and `.well-known`. Keep mail, verification and unrelated hosting files intact.
4. Purge any existing website cache. Check `/`, `/ai-training-south-africa`, `/resources`, `/contact`, `/robots.txt`, `/sitemap.xml`, `/checkout`, and a made-up URL. The made-up URL must return HTTP 404, not homepage HTML. HTTP and www must redirect to HTTPS non-www. `/agency` must redirect to `/ai-automation-south-africa`.
5. Run `SEARCH_BASE_URL=https://growthcred.co.za npm run verify:http` from the repository after deployment. Test one real registration with your own details and check it reaches your registration system; no registration or payment was submitted during development QA.

A Git push is not confirmation of a live deployment. This release was tested against local Apache with the actual .htaccess. Live indexing, provider caches and live Lighthouse must be checked after your deployment. Do not change DNS or email hosting for this release.

## Rebuild

Use Node 22+ and `npm ci`, then `npm run deploy:prepare`, `npm run verify:seo`, and `npm run verify:search-behavior`. Commit source and regenerated dist together. Preview using `npm run preview:search`; use Apache/LiteSpeed for authoritative .htaccess checks. A simple SPA dev server cannot prove HTTP status or host redirects.

## Measurement and account work

GA4 is deliberately inactive because no measurement ID was supplied. Create a GA4 web property, set `VITE_GA4_MEASUREMENT_ID=G-...` in your local build environment, rebuild, and deploy. Verify consent opt-in in DebugView before counting conversions. These privacy controls apply to the new GA4 integration; the existing Whop checkout/pixel integration has its own collection policy. Only registered page paths are sent to GA4; query strings, hashes, form fields and private builder answers are excluded. Disable GA4 Enhanced Measurement form interactions and automatic history pageviews to avoid duplicate events or unintended form collection.

Track `generate_lead`, `begin_checkout` if configured in GA4 from `gc_checkout_submit`, and purchase. Purchase events require a Whop completion receipt, are deduplicated per session, and omit promotional payments when actual discounted amounts are unknown. Browser analytics is directional: redirect-only, blocked and non-consenting purchases are absent. Whop/server webhook records are the revenue source of truth; server-confirmed analytics with actual amount and receipt IDs is a future account-level integration, not included here.

Verify growthcred.co.za in Google Search Console (DNS domain property) and Bing Webmaster Tools. Submit `https://growthcred.co.za/sitemap.xml`, inspect the home/training/automation pages and request indexing. Review Page Indexing, canonical selection and real-user Core Web Vitals after deployment. Do not block noindex URLs in robots: crawlers must read the noindex instruction.

The source includes existing Supabase functions for contact, brain email and payment email. A static cPanel deployment does not deploy these functions or database policies. Follow the existing README/STATUS backend setup if these are not already deployed; keep service-role/Resend/Whop webhook secrets server-side. Direct email/WhatsApp remain available. No successful email delivery or live payment has been asserted by this release.

See [GROWTH-PLAN.md](GROWTH-PLAN.md) for the ongoing work requiring accounts, real evidence and outreach approval.
