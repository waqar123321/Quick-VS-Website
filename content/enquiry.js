const jobs = {
  wet_belt: "Wet belt",
  timing_chain: "Timing chain",
  engine_rebuild: "Engine rebuild/replacement",
  cambelt: "Cambelt",
  vag_engine_timing: "VW/Audi engine or timing",
  servicing_repair: "Servicing/repair",
  other: "Other"
};

const replyTime = "within 30 minutes, Mon–Sat 10am–6pm";
const warranty = "6 months or 10,000 miles, whichever comes first; exact cover confirmed in writing";
const payment = "Pay by debit card or bank transfer";
const reviewSummary = "5.0 from 17 Google reviews";

function quoteForm({ job, id = "quote", business, whatsapp }) {
  const field = (name, label, control) => {
    const fieldId = id + "-" + name;
    return `<div class="quote-field"><label for="${fieldId}">${label}</label>${control.replace("FIELD_ID", fieldId)}<span class="quote-error" id="${fieldId}-error" hidden></span></div>`;
  };
  const options = Object.entries(jobs).map(([value, label]) =>
    `<option value="${value}"${value === job ? " selected" : ""}>${label}</option>`).join("");
  return `<section class="section quote-section" id="${id}" aria-labelledby="${id}-heading">
    <div class="contact-card quote-card">
      <h2 id="${id}-heading">Get a free quote</h2>
      <p>We reply ${replyTime}. Messages after 6pm are answered from 10am.</p>
      <form data-quote-form action="https://api.web3forms.com/submit" method="post" novalidate>
        <div class="quote-fields">
          ${field("registration", "Registration (required)", '<input id="FIELD_ID" name="registration" required maxlength="10" autocapitalize="characters" spellcheck="false">')}
          ${field("name", "Name (required)", '<input id="FIELD_ID" name="name" autocomplete="name" required maxlength="100">')}
          ${field("phone", "Phone (required)", '<input id="FIELD_ID" name="phone" type="tel" autocomplete="tel" required maxlength="24">')}
          ${field("job", "Job", `<select id="FIELD_ID" name="job" required>${options}</select>`)}
          ${field("mileage", "Mileage (optional)", '<input id="FIELD_ID" name="mileage" inputmode="numeric" maxlength="9">')}
          ${field("message", "Message (optional, up to 500 characters)", '<textarea id="FIELD_ID" name="message" rows="3" maxlength="500"></textarea>')}
        </div>
        <input type="checkbox" name="botcheck" hidden tabindex="-1" autocomplete="off">
        <button class="button button-primary" type="submit" disabled>Send quote request</button>
        <p class="quote-privacy">We use your details to reply to your enquiry. <a href="/privacy/">Privacy &amp; cookies</a></p>
        <div class="quote-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
        <template data-quote-success>Thanks – we'll reply within 30 minutes in opening hours. Need us now? <a data-contact-location="form" href="tel:${business.primaryTel}">Call ${business.primaryPhone}</a></template>
        <template data-quote-failure>We couldn't send your request. Your details are still here. Try again, <a data-contact-location="form" href="tel:${business.primaryTel}">call ${business.primaryPhone}</a> or <a data-contact-location="form" href="${whatsapp}">use WhatsApp</a>.</template>
      </form>
      <noscript><p>To get a quote, <a href="tel:${business.primaryTel}">call ${business.primaryPhone}</a> or <a href="${whatsapp}">use WhatsApp</a>.</p></noscript>
    </div>
  </section>`;
}

function trustStrip(maps, recovery = false) {
  return `<div class="trust-strip quote-trust"><!-- TODO WAQAR CONFIRM current review count --><span><a href="${maps}">★ ${reviewSummary}</a> · Price agreed in writing before work · Sparkbrook B11 workshop · Open Saturdays${recovery ? " · Recovery can be arranged (customer cost)" : ""}</span></div>`;
}

function nextSteps() {
  return '<section class="section next-steps"><h2>What happens next</h2><ol><li>Call, WhatsApp or send your reg</li><li>We reply with a price within 30 minutes in opening hours, or advise an assessment</li><li>Book in – price agreed in writing before any work</li></ol></section>';
}

module.exports = { quoteForm, trustStrip, nextSteps, replyTime, warranty, payment, reviewSummary };
