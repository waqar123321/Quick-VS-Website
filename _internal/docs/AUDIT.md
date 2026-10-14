# Final website audit — 14 October 2026

## Search Console evidence supplied by the owner
- 19 URLs are “Discovered — currently not indexed”, with last crawl shown as N/A.
- One HTTP MOT-repair URL is an alternate page with a proper canonical.
- Ownership screen shows the user as a verified owner.
- This does not establish a crawl rejection caused by content, nor prove that every host redirect is configured correctly.
- A correctly excluded HTTP alternate is expected when the HTTPS canonical is indexed. Indexing is Google's decision; no immediate-indexing guarantee is made.

## Completed code changes
- 26 canonical indexable routes; all lowercase HTTPS quickvs.com directory URLs. Separate noindex 404.
- All 19 service pages linked directly from home, services hub and every shared footer.
- Unique titles/descriptions, matching canonical and og:url, valid schema, existing and new internal resources checked.
- Twelve short general service pages expanded with service-specific diagnosis, repair scope and FAQs.
- The two existing broad rebuild URLs now explain distinct topics: rebuild process versus local workshop/booking.
- New performance/prestige and all-makes/car/van rebuild pages, with engine-family details and contextual links.
- JLR Ingenium wording corrected throughout templates and generated output. Diesel rear-chain access is distinguished from petrol procedures.
- Ford variants separated rather than describing all EcoBoost engines as wet-belt units.
- Company name, number, address, primary phone, new email, hours, Maps CID, coordinates, payment methods and rebuild terms aligned.
- Jotform and BookMyGarage removed from every public page; enquiries use phone, WhatsApp or info@quickvs.com.
- Five owner-supplied Google review texts reproduced verbatim on home, reviews and all rebuild pages; individual review schema without an invented aggregate rating or review count.
- Shared mobile call/WhatsApp bar, contact buttons near the top of each page and clear running-status guidance.
- Existing GA4 G-GEJR9VMEYV retained. Google code loads only after analytics consent; withdrawal, expiry and blocked browser storage handled.
- Phone, WhatsApp, email and directions clicks measured without vehicle/message text in event parameters.
- No Google Ads configuration added: the owner has not created the account/actions yet.
- Privacy/cookie information, reusable validation/tracking tests, useful repair-advice page and .nojekyll added.
- Sitemap dates change when generated page content changes; unchanged rebuilds preserve their dates.
- Retired or missing URLs have a helpful noindex 404. No unsupported server-redirect configuration has been invented for GitHub Pages.

## Validation
- npm run build: 27 HTML files, 26 sitemap entries and 19 service pages passed.
- npm test: consent, withdrawal, real GA4 ID, all contact channels, cancelled/unrelated links, navigation and PII redaction passed.
- Unchanged rebuild preserved lastmod dates.
- Chrome rendered home, performance, all-makes and contact at exact 375/768/1440 px viewports: no horizontal overflow, one H1 each, mobile bar correctly shown/hidden.
- Mobile and desktop screenshots inspected; mobile CTA sizing corrected.
- External CDN hero photography was not loaded in the local render environment; its live fetch/performance remains to be checked.

## Remaining launch work, in priority order
1. After deployment, use Search Console URL Inspection > Test live URL for the all-makes, performance and Ingenium pages, then request indexing and submit https://quickvs.com/sitemap.xml.
2. Verify GitHub Pages Enforce HTTPS. The owner has no access to quickvs.co.uk, so old-domain forwarding cannot be configured from this repository. HTTP/non-www redirect chains and headers cannot be proven from repository files alone. GitHub Pages does not execute Apache .htaccess redirects.
3. Create the real Google Ads account and conversion actions. Website-call number swapping needs the actual Ads ID and call label; phone clicks, WhatsApp clicks and completed calls are separate actions. Do not install unconfigured tags.
4. Keep contact clicks as intent indicators. For ROI, distinguish qualified calls/enquiries, booked jobs and completed profitable repairs. Avoid counting a phone click and its completed call twice as primary leads.
5. Confirm GA4 receipt and stream settings using Realtime/DebugView after consenting. Code tests do not prove account-side ingestion.
6. Use genuine workshop/rebuild photographs and factual case studies when available. Do not invent jobs, power figures, certifications or prices.
7. Consider CI validation of future repository changes; current build/test commands provide the checks, but no Actions workflow permissions were requested or changed.

## Primary references consulted
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- https://support.google.com/webmasters/answer/7440203
- https://developers.google.com/tag-platform/security/guides/consent
- https://support.google.com/google-ads/answer/6095883
- https://www.lasertools.co.uk/items/pdf/products/8417_Instructions.pdf
- https://www.sealey.co.uk/timing-tool-kit-for-jlr-2-0-2-0d-ingenium-engine-chain-drive-vse3037/
- https://static.nhtsa.gov/odi/tsbs/2017/MC-10127526-9999.pdf
- https://media.ford.com/content/dam/fordmedia/Europe/en/2016/04/EcoBlue_engine_EU.pdf

