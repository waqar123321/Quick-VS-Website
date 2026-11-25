const jobs = {
  engine_rebuild: "Engine rebuild / replacement",
  wet_belt: "Wet belt replacement",
  timing_chain: "Timing chain replacement",
  cambelt: "Cambelt & water pump",
  clutch: "Clutch & flywheel",
  vag_engine_timing: "VW/Audi engine or timing",
  diagnostics: "Engine diagnostics (£50 — waived on rebuilds)",
  servicing_repair: "Servicing, brakes or MOT repairs",
  other: "Other mechanical repair"
};

const replyTime = "within 30 minutes, Mon–Sat 10am–6pm";
const warranty = "6 months or 10,000 miles, whichever comes first; exact cover confirmed in writing";
const payment = "Parts deposit upfront; balance due on collection by debit card or bank transfer";
const reviewSummary = "5.0 from 18 Google reviews";
const recoveryOffer = "Free recovery within 10 miles on engine rebuilds · UK-wide recovery arranged";
const diagOffer = "£50 diagnostic fee waived when you book your engine rebuild";
const sameDayOffer = "Same-day turnaround available on routine servicing, brakes, diagnostics and standard clutches";

function quoteForm({ job, id = "quote", business, whatsapp }) {
  const field = (name, label, control, full = false) => {
    const fieldId = id + "-" + name;
    return `<div class="quote-field${full ? " quote-field-full" : ""}"><label for="${fieldId}">${label}</label>${control.replace("FIELD_ID", fieldId)}<span class="quote-error" id="${fieldId}-error" hidden></span></div>`;
  };
  const options = Object.entries(jobs).map(([value, label]) =>
    `<option value="${value}"${value === job ? " selected" : ""}>${label}</option>`).join("");
  const recoveryOptions = [
    ["drives", "Vehicle drives safely"],
    ["free_local_recovery", "Non-runner — FREE recovery (within 10 miles of B11, rebuilds)"],
    ["uk_recovery", "Non-runner — need UK-wide recovery quote"]
  ].map(([value, label]) => `<option value="${value}">${label}</option>`).join("");

  return `<section class="section quote-section" id="${id}" aria-labelledby="${id}-heading">
    <div class="contact-card quote-card">
      <h2 id="${id}-heading">Get a free quote</h2>
      <p>We reply ${replyTime}. Messages after 6pm are answered from 10am.</p>
      <ul class="quote-offer-pills" aria-label="Workshop guarantees">
        <li>Free recovery within 10 miles (rebuilds)</li>
        <li>£50 diagnostic waived on rebuilds</li>
        <li>Same-day routine repairs</li>
        <li>Written price before work</li>
      </ul>
      <form data-quote-form action="https://api.web3forms.com/submit" method="post" novalidate>
        <div class="quote-fields">
          ${field("registration", "Registration (required)", '<input id="FIELD_ID" name="registration" required maxlength="10" autocapitalize="characters" spellcheck="false" placeholder="e.g. AB12 CDE">')}
          ${field("name", "Name (required)", '<input id="FIELD_ID" name="name" autocomplete="name" required maxlength="100">')}
          ${field("phone", "Phone (required)", '<input id="FIELD_ID" name="phone" type="tel" autocomplete="tel" required maxlength="24">')}
          ${field("email", "Email (optional — for written quotes)", '<input id="FIELD_ID" name="email" type="email" autocomplete="email" maxlength="120">')}
          ${field("job", "Job", `<select id="FIELD_ID" name="job" required>${options}</select>`)}
          ${field("recovery", "Running status / recovery (optional)", `<select id="FIELD_ID" name="recovery">${recoveryOptions}</select>`)}
          ${field("mileage", "Mileage (optional)", '<input id="FIELD_ID" name="mileage" inputmode="numeric" maxlength="9">')}
          ${field("message", "Fault symptoms or job details (optional, up to 500 characters)", '<textarea id="FIELD_ID" name="message" rows="3" maxlength="500"></textarea>', true)}
        </div>
        <input type="checkbox" name="botcheck" hidden tabindex="-1" autocomplete="off">
        <button class="button button-primary" type="submit" disabled>Send quote request</button>
        <p class="quote-privacy">Parts deposit upfront; balance on collection (debit card or bank transfer). We use your details to reply to your enquiry. <a href="/privacy/">Privacy &amp; cookies</a></p>
        <div class="quote-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
        <template data-quote-success>Thanks – we'll reply within 30 minutes in opening hours. Need us now? <a data-contact-location="form" href="tel:${business.primaryTel}">Call ${business.primaryPhone}</a></template>
        <template data-quote-failure>We couldn't send your request. Your details are still here. Try again, <a data-contact-location="form" href="tel:${business.primaryTel}">call ${business.primaryPhone}</a> or <a data-contact-location="form" href="${whatsapp}">use WhatsApp</a>.</template>
      </form>
      <noscript><p>To get a quote, <a href="tel:${business.primaryTel}">call ${business.primaryPhone}</a> or <a href="${whatsapp}">use WhatsApp</a>.</p></noscript>
    </div>
  </section>`;
}

function trustStrip(maps, recovery = false, coverage = "") {
  const items = [
    `<a href="${maps}">★ ${reviewSummary}</a>`,
    "Written price before work",
    recovery ? "Free 10-mile recovery (rebuilds) &amp; UK-wide arranged" : "Free 10-mile recovery on rebuilds",
    "Diagnostic waived on rebuilds",
    coverage || "Same-day routine repairs",
    "Sparkbrook B11 · Open Saturdays"
  ];
  return `<div class="trust-strip quote-trust"><span>${items.join(" · ")}</span></div>`;
}

function offerBand() {
  return `<section class="section offer-band" aria-label="Workshop guarantees and offers">
    <div class="offer-grid">
      <article class="offer-card">
        <p class="offer-tag">Rebuilds &amp; non-runners</p>
        <h3>Free recovery within 10 miles</h3>
        <p>Free collection within 10 miles of our Sparkbrook B11 workshop when you go ahead with an engine rebuild. UK-wide flatbed recovery arranged with upfront pricing.</p>
      </article>
      <article class="offer-card">
        <p class="offer-tag">Zero-risk diagnosis</p>
        <h3>£50 diagnostic waived on rebuilds</h3>
        <p>Snap-on fault finding and mechanical assessment is £50 — and 100% waived when you book your engine rebuild with us.</p>
      </article>
      <article class="offer-card">
        <p class="offer-tag">4-ramp Birmingham workshop</p>
        <h3>Same-day turnaround on routine jobs</h3>
        <p>Same-day completion available on oil services, brakes, diagnostics, standard clutches and cambelts when booked in with confirmed parts.</p>
      </article>
      <article class="offer-card">
        <p class="offer-tag">Clear written terms</p>
        <h3>6-month / 10,000-mile warranty</h3>
        <p>Written quote agreed before work begins. Parts deposit upfront and balance due on collection by debit card or bank transfer.</p>
      </article>
    </div>
  </section>`;
}

function nextSteps() {
  return '<section class="section next-steps"><h2>What happens next</h2><ol><li>Call, WhatsApp or send your reg</li><li>We reply within 30 minutes in opening hours, or book an assessment (diagnostic waived on rebuilds)</li><li>Approve the written price — parts deposit upfront, balance on collection</li></ol></section>';
}

module.exports = { quoteForm, trustStrip, offerBand, nextSteps, replyTime, warranty, payment, reviewSummary, recoveryOffer, diagOffer, sameDayOffer };
