# Mobile repair and SEO history review — 14 October 2026

## History inspected

Reviewed merged PRs #1, #3, #4, #5 and #6, plus the direct commits from SEODeveloper-dev in July and August 2026. Compared the pre-expert tree at 711fb333 with the last expert commit 20b89285613600605346cde8e05c8ed30323bb8b. The expert primarily changed generated HTML: titles/descriptions, Open Graph/Twitter metadata, contextual links and phone information. Source generation did not retain those edits.

Useful intent-focused titles/descriptions are now maintained in content/seo-metadata.js for the 17 existing services. Layout generates matching social metadata. New all-makes/performance pages retain the owner's specified metadata and gain visible breadcrumbs and relevant diagnosis/timing links. Service hub, homepage, related-service blocks and comprehensive footer already link all 19 services.

Earlier malformed Ingenium link markup, incorrect wet-belt claims, old-domain URLs, unsupported universal warranty and MOT-pass promises are not carried forward. The corrected content and sole current phone are retained.

## Repairs

- Removed the remaining BookMyGarage widgets and appointment copy from servicing and MOT failure pages. No public page has a booking iframe or retired enquiry form. Validator rejects their return on any page.
- Fixed footer contact rows using a 26px icon grid without icons. Phone/email now have their natural width; address/hours use the available column.
- Reduced footer headings to 18px, added space above Payment, and made footer columns shrink safely.
- Kept mobile phone digits together and ensured the navigation can scroll in a short viewport.
- Preserved GA4 G-GEJR9VMEYV, optional consent, contact-click measurement and info@quickvs.com. No Ads account configuration is invented.

## Evidence and practical limits

Google recommends concise, descriptive titles and crawlable contextual links. These are appropriate improvements for the new pages; keyword repetition, metadata alone or a word-count threshold do not guarantee indexing.

- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/page-experience
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet

Firsthand practitioner case studies provide additional, site-specific evidence rather than forecasts for this workshop: SearchPilot reported a 28% organic traffic increase from query-aligned title/H1 changes on a low-traffic retail subset. A related-link test reported an 11% combined uplift at 90% confidence, below its standard 95% threshold. These findings support testing useful titles/links but do not establish expected QuickVS gains.

- https://www.searchpilot.com/resources/case-studies/aligning-keywords-with-search-queries
- https://www.searchpilot.com/resources/case-studies/seo-split-test-lessons-increasing-related-article-links

Google does not grant LocalBusiness review-star eligibility to self-serving testimonials on the business's own website. Visible genuine reviews help customers; no rich-result guarantee is made. Core Web Vitals matter, but perfect scores do not guarantee rankings. Local layout and code checks are not real-user Core Web Vitals measurements.

## Remaining opportunities and limitations

1. The owner cannot access quickvs.co.uk. Old-domain redirects and Change of Address cannot be completed from this repository. Current canonicals, internal links and sitemap use quickvs.com. Existing profile/directory links should be checked against the current domain when those accounts are available.
2. Search Console's actual not-indexed URL list, Google-selected canonicals and real-user Core Web Vitals need account evidence. No claim is made that code changes force Google to index immediately.
3. Google Ads is not set up. Before spending, create real call/contact conversion actions and measure qualified enquiries, booked work and completed job margin. A contact click does not prove a completed call or profitable job.
4. Original workshop photographs and documented rebuild examples can improve trust and distinctiveness. Do not fabricate work, outcomes or prices. Existing photography uses a third-party CDN; local rendering does not establish its live speed or availability.
5. Sites could host private lead/job-margin dashboards or preview experimental campaigns. It is optional; moving the existing GitHub Pages site is not necessary for these repairs and is not an automatic SEO gain.

## Checks

Build validation covers all 27 HTML files, 26 canonical sitemap URLs and 19 services, including metadata, schema, contact information and internal resources. Tracking tests cover consent, withdrawal, navigation and PII redaction. Browser checks cover every page at 393px and representative 320/375/430/768/1440px widths, including footer text geometry, Payment sizing, overflow, menu open/Escape, FAQs and cookie settings. Browser screenshots are also reviewed at the actual footer sections.

## Contractor proposal supplied in screenshots

The proposed scope includes 12 GBP updates, four product features with photographs/pricing, internal links, schema, technical/indexing work, citations/listings/profiles/classifieds/article submissions/competitor outreach/Quora, monitoring and two blog posts.

Implemented two practical customer guides with Article schema, visible authorship/date, self-referencing canonicals, social metadata and sitemap entries. The guides are linked from the homepage, advice hub, related repair pages and every footer. Current validation covers 29 HTML files and 28 sitemap URLs. Added schema/discovery regression checks and browser-rendered the new guides at 320/393/1440px.

Prepared 12 GBP Update post drafts in GBP_POSTS.md, each with a distinct UTM link and no invented offer, price or job. These have not been posted or scheduled. Four service features are proposed, but actual photographs, pricing/editor eligibility and profile access must be established before publishing. Services may be more appropriate than product entries for workshop repair offerings.

Google says local ranking primarily reflects relevance, distance and prominence, and recommends complete information, correct hours, photos and reviews. That supports auditing the actual profile first. It does not establish that twelve posts per month improve rankings. Sterling Sky's firsthand nine-week test across three listings found no measurable ranking effect from posting; this is small-sample practitioner evidence, not a universal causal finding. Posts should be evaluated for customer engagement and useful enquiries.

- https://support.google.com/business/answer/7091
- https://support.google.com/business/answer/7342169
- https://support.google.com/business/answer/9455399
- https://www.sterlingsky.ca/do-google-posts-impact-ranking/
- https://developers.google.com/search/docs/appearance/structured-data/article

Prioritise accurate existing business listings and genuinely relevant local/automotive relationships over link volume. Google identifies automated links, low-quality directories and low-value content created for link manipulation as link spam. Classifieds, profiles, Quora answers and article submissions are not inherently high-quality backlinks; evaluate audience, relevance and genuine purpose individually. No submissions, paid links, profile edits or outreach messages have been made.

- https://developers.google.com/search/docs/essentials/spam-policies

Account-dependent work remains: GBP settings/publication, live GSC indexing examples and performance, GA4 account-side event receipt, and later Ads conversion setup. The old domain is inaccessible to the owner, so that migration limitation cannot be removed through website files.
