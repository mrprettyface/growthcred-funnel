# Release evidence

Verified on 21 September 2026 against the built release and local Apache.

- Build: TypeScript, Vite client and server builds, 19 complete HTML pages / 25 route documents.
- SEO oracle: 14 sitemap URLs, 530 internal references, route-specific metadata/schema, assets and negative controls.
- Behavior oracle: expired/undated event states, no-ID/no-consent GA4, safe URLs, field filtering, lead handling and purchase deduplication.
- Actual Apache: normal pages 200, robots text/plain, sitemap XML, checkout noindex, nested and root unknown URLs 404. Aliases, trailing slash, .html and HTTP/www redirects preserve intended targets and query strings. The first Node fetch Host-header test was corrected to use node:http; fetch ignored its override. Retest passed.
- Browser: 390px mobile layout without horizontal overflow, mobile menu, hydrated homepage/free class/calculator; calculator moved from 12 to 13 hours and displayed R280800 (13 × 48 × R450). Empty free-class form rejected three missing required fields, with no registration submitted. SPA navigation updated title/canonical to resources; no console errors in these checks.
- Video: zero iframes before Play, then the expected YouTube privacy-enhanced iframe. Desktop homepage and contact layouts inspected.
- Existing payment email source/schema and signature runtime checks passed, including tampered and expired signatures. Referral schema/insert/library/share checks passed. No actual purchase, email delivery or backend deployment was tested.
- Two large homepage image assets: 1544834 bytes of original JPEGs versus 187370 bytes of largest WebP variants (87.9% reduction). This is asset size, not a measured Lighthouse improvement. Fonts self-hosted with licences; video deferred.

Live deployment and production performance verification are owner-controlled. Existing dependency advisories found during font installation were not part of this search release; dependency security maintenance remains separate. No assertion of a clean dependency audit is made.
