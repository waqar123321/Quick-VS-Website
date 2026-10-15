# Website changes — 14 October 2026

The workshop site now focuses enquiries on 07522 179040 and WhatsApp, with info@quickvs.com as the email address. Jotform and BookMyGarage have been removed from every page.

Added performance/prestige and all-makes/car/van engine pages, expanded the existing services, corrected engine-family copy, added the five owner-supplied reviews and aligned business schema. Every service is linked from home, the services hub and the shared footer.

GA4 uses the existing real measurement ID with optional analytics consent and contact-click events. Google Ads is intentionally absent until its real account/actions exist.

Run npm run build and npm test before publishing. Generated HTML must be committed because GitHub Pages serves the repository root. See AUDIT.md for validation and remaining account/hosting checks.

## 15 October 2026: review structured data

Removed self-serving review and rating structured data from all testimonial-bearing pages, including the homepage, reviews page and every engine rebuild page. All five original testimonials remain visible and unchanged. Validation checks their displayed author and text, and rejects review or rating structured data anywhere on the site. Business, service and breadcrumb markup remain in place. This addresses rich-result eligibility separately from Google's crawl and indexing decisions.

