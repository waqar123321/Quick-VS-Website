# Quick Solution Vehicles Website Audit

Audit date: 2026-05-15

## 1. Technical SEO
- Severity: High
- Location/file: `index.html`, `services/index.html`, `about/index.html`, `contact/index.html`, `testimonials/index.html`, `sitemap.xml`
- Problem: Site had only a few crawlable pages and sitemap only listed top-level URLs.
- Planned fix: Generate individual service and specialist landing pages, canonical URLs and a full sitemap.
- Status: fixed

## 2. On-page SEO
- Severity: High
- Location/file: all public HTML pages
- Problem: High-value search targets were mostly handled on one services page, limiting relevance.
- Planned fix: Add unique title tags, meta descriptions, H1s and page copy for each core service and specialist page.
- Status: fixed

## 3. Content quality
- Severity: High
- Location/file: `index.html`, `services/index.html`, `testimonials/index.html`
- Problem: Some copy was broad, some review examples were not verified, and one heading was an internal SEO note.
- Planned fix: Replace visible SEO labels, remove fake review-style quotes, and use practical mechanic-led copy.
- Status: fixed

## 4. Structured data
- Severity: High
- Location/file: generated HTML pages
- Problem: Structured data existed only in limited form and had inconsistent hours/phone details.
- Planned fix: Add valid JSON-LD for AutoRepair/LocalBusiness, Service, FAQPage, BreadcrumbList and Article where appropriate.
- Status: fixed

## 5. Local SEO
- Severity: High
- Location/file: footer, contact page, homepage, schema
- Problem: Address, primary phone and opening hours were inconsistent.
- Planned fix: Standardise NAP details and show Sparkbrook, Birmingham and B11 naturally.
- Status: fixed

## 6. Information architecture
- Severity: Critical
- Location/file: `services/index.html`
- Problem: Distinct services did not have distinct URLs and footer service links pointed to the hub.
- Planned fix: Create individual URLs for all general services and specialist rebuild pages.
- Status: fixed

## 7. Conversion
- Severity: High
- Location/file: all pages
- Problem: CTAs were present but inconsistent and did not always include phone, email, form and directions paths.
- Planned fix: Add reusable CTA blocks, click-to-call links, email links, directions and a mobile call bar.
- Status: fixed

## 8. Accessibility
- Severity: Medium
- Location/file: all pages
- Problem: Navigation and page structure needed stronger consistency across new pages.
- Planned fix: Preserve skip link, semantic landmarks, one H1 per page, descriptive links and focus states.
- Status: fixed

## 9. Performance
- Severity: Medium
- Location/file: all pages, `styles.css`
- Problem: Static site is lightweight, but external imagery and iframes can affect load time.
- Planned fix: Keep JavaScript minimal, lazy-load below-fold images and iframes, and avoid new heavy dependencies.
- Status: fixed

## 10. Analytics readiness
- Severity: Medium
- Location/file: generated page heads
- Problem: No clean GA4/Search Console readiness.
- Planned fix: Add safe GA4, GTM and Search Console placeholders that do not activate live analytics.
- Status: fixed

## 11. Open Graph / social metadata
- Severity: Medium
- Location/file: all generated pages
- Problem: Social metadata was limited and not unique enough across deeper pages.
- Planned fix: Generate Open Graph and Twitter Card metadata for every page.
- Status: fixed

## 12. Trust elements / reviews
- Severity: Critical
- Location/file: `testimonials/index.html`
- Problem: Public page showed fabricated-looking example review quotes.
- Planned fix: Remove fake quotes, add neutral 5-star Google trust copy, and add `content/reviews.json` TODO placeholders for genuine reviews.
- Status: fixed

## 13. NAP consistency
- Severity: Critical
- Location/file: footer, contact page, schema, FAQs
- Problem: Old phone priority and opening hours conflicted with the source of truth.
- Planned fix: Use primary phone 07514 277218, exact address, exact email and exact hours everywhere.
- Status: fixed

## 14. Blog system
- Severity: Medium
- Location/file: new `blog/`, `content/blog/`, `scripts/generate-site.js`
- Problem: No maintainable blog structure existed.
- Planned fix: Add Markdown-based blog content, generated blog index and post template. Draft posts remain hidden.
- Status: fixed

## 15. Specialist landing pages
- Severity: Critical
- Location/file: new `services/*/index.html`
- Problem: No dedicated pages for BMW N47, BMW N57, JLR Ingenium, Range Rover or Birmingham engine rebuild searches.
- Planned fix: Scaffold unique specialist pages with symptoms, failure explanation, process, parts, timeframe, warranty, recovery, FAQs and CTAs.
- Status: fixed
