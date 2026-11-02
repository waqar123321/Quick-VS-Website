# VW Group and cambelt pages — review notes

Branch: `feat/vag-cambelt-pages`. Base: `d6e27639e00402c97fb7cfe374f7e64e1b56eac0` (merged PR #13).

## Baseline and existing patterns

Before editing, all 37 canonical URLs in the main-branch sitemap were fetched from quickvs.com and compared with the checked-out HTML after normalising line endings. No differences were found. Reviewed merged PRs #7–#13, including #7's genuine workshop photographs, contextual links, consent controls and rejection of self-serving review schema, and the later navigation, pricing and review changes.

The Node generator writes HTML directly into the repository; there is no `dist/` build directory. New pages use the existing page hero, section layout, native FAQ disclosures, contact buttons, five genuine reviews and schema helpers. The existing review data, shared tracking script and original image bytes are unchanged.

## URLs and intent

- `/services/vw-audi-engine-repairs-birmingham/`: VW, Audi, Skoda and SEAT engine identification, timing-drive faults and the assessment/repair route. 992 words in the main element, including reviews, FAQ answers and CTA.
- `/services/cambelt-replacement-birmingham/`: conventional dry-cambelt maintenance. 897 words in the main element, including reviews, FAQ answers and CTA.
- `/services/timing-belt-replacement/`: retained as an immediate HTML redirect to the new cambelt URL, with destination canonical and noindex. GitHub Pages does not provide a repository-configured HTTP 301 here. The old page is excluded from the sitemap and internal links now use the destination. This avoids publishing competing dry-belt pages.

Existing prices are retained. VW Group timing chain and cambelt rows are quote-by-registration only. Contact-page main content is unchanged; shared service lists gain the new destinations. The chain page keeps its existing sections and contact buttons, with a compact three-card coverage block and an extra FAQ.

## Technical references

Dates are context, not fitment rules. The pages ask for the registration and engine code; model badges and model years are not treated as a definitive timing-drive lookup.

- [Volkswagen: new Golf powertrain / EA211](https://www.volkswagen-newsroom.com/en/the-new-golf-das-auto-international-driving-presentation-2797/the-new-golf-powertrain-structure-engines-and-gearboxes-2835): toothed camshaft-belt drive on EA211.
- [Volkswagen: 1.0 and 1.5 TSI evo family](https://www.volkswagen-newsroom.com/en/press-releases/the-compact-all-rounder-tsi-evo-engine-with-a-capacity-of-10-and-15-litres-6695): engine-family development and later introduction dates.
- [Volkswagen EA211 self-study programme](https://content.datarunners.net/content/SSP/890511AG.pdf): belt layout and engine-specific drive design.
- [Bilstein EA111 1.4 TSI technical note](https://cdn.partsfinder.bilsteingroup.com/pf-document/FTEC138_GB.PDF): chain wear, tensioning and overlapping production years. Avoids an inaccurate universal 2012 cut-off.
- [Audi EA888 timing-chain/tensioner bulletin, via NHTSA](https://static.nhtsa.gov/odi/tsbs/2018/MC-10153151-9999.pdf): documented early EA888 chain/tensioner issues. Its US warranty terms are not advertised or implied to apply in the UK.
- [Audi: 3.0 TDI technical description](https://www.audi.com/en/the-audi-a7-sportback-until-2025-progressive-in-design-and-technology-9831/driving-experience-9839): chain drive on the 3.0 TDI.
- [Continental: EA288 evo belt drive](https://www.continental-engineparts.com/eu/en-gb/aftermarket/support/videos/watch-and-work-videos/know-how-%E2%80%93-ea288-evo): application-specific belt-drive maintenance.
- [Gates: timing-belt-driven water pumps](https://www.gatestechzone.com/gb/en/articles/the-importance-of-respecting-the-water-pump-change-interval.html): why pump replacement is considered where applicable. No universal pump layout or replacement interval is promised.

## TODO WAQAR CONFIRM

None. No unverified workshop equipment, qualifications, completed jobs, diagnoses, customer outcomes or new prices have been added. Only the existing reviews and workshop images are reused. No manufacturer logos or dealer affiliation claims are added.

## Validation

- `npm run build`: passes. 38 canonical sitemap URLs, 27 service pages; 39 full HTML pages plus the separately checked legacy redirect (40 HTML files total).
- Existing link/resource checks pass against the actual downloaded assets, verified against their main-branch Git blob hashes. No placeholder images or synthetic file-existence checks were used for this branch's final validation.
- JSON-LD parses; both new pages contain exactly one AutoRepair, Service, BreadcrumbList and FAQPage object. New titles are at most 60 characters, descriptions at most 155; unique metadata, canonical URLs, one H1 and sitemap membership pass.
- All five review texts and names match the existing `content/reviews.json`. No Review or AggregateRating schema is added.
- Browser QA at 360px and 390px for both new pages and the timing-chain page: no horizontal scrolling; all three chain cards stack; main telephone links use `tel:+447522179040`; WhatsApp links use the existing business destination.
- FAQ-to-cambelt navigation and the old timing-belt redirect were checked in the browser.
- `npm test`: passes, including actual contact URLs extracted from both new pages. Each of phone_call_click, whatsapp_click, email_click and directions_click is emitted once after consent, with correct page attribution. None emits before consent or after withdrawal. The shared script is unchanged. These tests do not claim account-side GA4 receipt or Google Ads conversion setup.
- Lighthouse 13.6.0, local simulated mobile viewport 390×844: both pages score 99 performance / 100 accessibility / 100 SEO. Existing responsive WebP photographs are preloaded on the new pages. Remaining shared-CSS and local-server cache/compression suggestions do not represent measured production field performance.
- Mobile screenshots are 390×844 crops of the final Lighthouse full-page captures; see `_internal/qa/vag-cambelt/`. Scores, timestamps and metrics are recorded in `lighthouse-summary.json` there.

This branch is for review only. It has not been merged or deployed.
