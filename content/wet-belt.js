// Starting prices approved by the owner on 31 October 2026.
const service = {
  slug: 'wet-belt-replacement',
  title: 'Wet Belt Replacement in Birmingham',
  short: 'Ford EcoBoost, PureTech and Transit EcoBlue wet belts. From £650.',
  desc: 'Wet belt replacement in Sparkbrook, Birmingham: PureTech from £650, Ford 1.0 EcoBoost from £850 and 2.0 EcoBlue from £1,050. Call or WhatsApp your reg.',
  metaTitle: 'Wet Belt Replacement Birmingham | Ford & PureTech | QuickVS',
  related: ['/services/timing-belt-replacement/', '/services/engine-diagnostics/', '/services/engine-rebuilds/']
};

const engines = [
  { name: '1.2 PureTech', makes: 'Peugeot · Citroën · DS · Vauxhall', price: '£650', label: 'Petrol wet belt',
    detail: 'Wet-belt versions fitted to cars such as the Peugeot 208, 308 and 2008, Citroën C3 and C4, and selected Vauxhall Corsa, Crossland and Grandland models. We check the engine version before quoting.' },
  { name: 'Ford 1.0 EcoBoost', makes: 'Fiesta · Focus · EcoSport · B-Max', price: '£850', label: 'Petrol wet belt',
    detail: 'For the 1.0 EcoBoost engines that use a wet timing belt, including applicable Fiesta, Focus, EcoSport and B-Max models. Later versions can have a different timing layout, so the model badge alone is not enough.' },
  { name: 'Ford 2.0 EcoBlue', makes: 'Transit · Transit Custom', price: '£1,050', label: 'Diesel wet belt',
    detail: 'Wet belt replacement for applicable 2.0 EcoBlue Transit and Transit Custom vans. Tell us the mileage and how the van is used, along with its service history, so we can plan the right work.' }
];

const faqs = [
  ['When should a wet belt be replaced?', 'The interval depends on the engine, vehicle age and manufacturer’s current schedule. Send your registration, mileage and any belt replacement invoice so we can check the correct starting point. Do not wait for a warning light: a belt can deteriorate before there is an obvious driving problem.'],
  ['Does every EcoBoost or PureTech have a wet timing belt?', 'No. Some engine versions use a timing chain, and a wet oil-pump drive belt is a separate component. We identify the engine and timing layout before recommending the job. If you have a 1.5 EcoBoost or another version not listed above, send your registration for advice.'],
  ['How long will my vehicle be in the workshop?', 'We confirm the workshop time when we quote, once we know the engine and whether this is planned maintenance or an existing fault. Please arrange a booking before bringing the vehicle in. Belt debris, oil-pressure concerns or additional damage can require more investigation and time.'],
  ['Can you check a wet belt without removing it?', 'On applicable PureTech engines, an accessible section of the belt can be inspected and measured with the correct tool. Ford EcoBoost belts cannot be assessed in the same way. An accessible visual check does not reveal the entire belt or replace the manufacturer’s replacement schedule.'],
  ['Could my PureTech repair qualify for manufacturer support?', 'Some earlier PureTech engines may qualify for manufacturer support for certain belt-related faults, subject to the vehicle and service history. Check eligibility with the manufacturer before authorising a paid repair. We are an independent workshop; we cannot approve manufacturer claims.']
];

function render({ esc, business, maps }) {
  const message = encodeURIComponent('Hi Quick Solution Vehicles, I would like a wet belt replacement quote.\nRegistration: \nMileage: \nMake/model: \nAny warning lights or symptoms: ');
  const whatsapp = 'https://wa.me/447522179040?text=' + message;
  const buttons = location => `<div class="contact-actions"><a class="button button-primary" data-contact-location="wet_belt_${location}" href="${whatsapp}">WhatsApp for a quote <span aria-hidden="true">↗</span></a><a class="button button-light" data-contact-location="wet_belt_${location}" href="tel:${business.primaryTel}">Call ${business.primaryPhone}</a></div>`;
  const picture = (name, alt, eager = false) => `<picture><source type="image/webp" srcset="/assets/wet-belt/${name}-640.webp 640w, /assets/wet-belt/${name}-960.webp 960w, /assets/wet-belt/${name}-1440.webp 1440w" sizes="(max-width: 760px) calc(100vw - 36px), 560px"><img src="/assets/wet-belt/${name}-960.webp" width="1440" height="960" alt="${esc(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></picture>`;
  return `<div class="wet-landing">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/services/">Services</a> / <span aria-current="page">Wet belt replacement</span></nav>
    <section class="wet-hero"><div class="wet-container wet-hero-grid"><div class="wet-hero-copy">
      <p class="eyebrow">Quick Solution Vehicles · Sparkbrook</p>
      <h1>Wet belt replacement <span>in Birmingham.</span></h1>
      <p class="wet-lead">Ford EcoBoost, PureTech and Transit EcoBlue wet belts. Tell us your registration and mileage for a quote from our Sparkbrook workshop.</p>
      <p class="wet-hero-price">From <strong>£650</strong> <span>for applicable 1.2 PureTech engines</span></p>
      ${buttons('hero')}
      <p class="wet-hours">Mon–Sat, 10am–6pm <span aria-hidden="true">·</span> Birmingham B11</p>
    </div><figure class="wet-hero-image">${picture('wet-belt-replacement', 'AI-generated illustration of a mechanic working on an exposed wet timing belt', true)}<figcaption>AI-generated illustration of a wet belt replacement.</figcaption></figure></div></section>
    <nav class="wet-jump" aria-label="On this page"><div class="wet-container"><a href="#wet-prices">Prices</a><a href="#wet-work">What’s involved</a><a href="#wet-engines">Your engine</a><a href="#wet-questions">FAQs</a><a href="#wet-quote">Get a quote <span aria-hidden="true">↗</span></a></div></nav>
    <section class="wet-section wet-container" id="wet-prices"><div class="wet-heading"><p class="section-kicker">Clear starting prices</p><h2>Wet belt replacement prices</h2><p>Choose your engine below. We confirm the exact price for your vehicle before booking the work.</p></div>
      <div class="wet-prices">${engines.map(e => `<article class="wet-price-card"><p class="wet-label">${e.label}</p><h3>${e.name}</h3><p class="wet-makes">${e.makes}</p><p class="wet-price"><span>From</span> ${e.price}</p><a href="${whatsapp}" data-contact-location="wet_belt_price">Get my vehicle’s quote <span aria-hidden="true">↗</span></a></article>`).join('')}</div>
      <p class="wet-price-note">Starting prices are for planned wet belt replacement on applicable engines. An existing oil-pressure fault, failed belt or engine damage needs a separate assessment. Any additional work is agreed with you first.</p>
    </section>
    <section class="wet-soft" id="wet-work"><div class="wet-container wet-section"><div class="wet-heading"><p class="section-kicker">The job, explained</p><h2>More than changing a belt</h2><p>A wet timing belt runs inside the engine oil. If it starts to break down, belt material can collect in the oil system. The replacement needs to account for that, as well as the timing itself.</p></div>
      <div class="wet-work-grid"><figure class="wet-detail-image">${picture('wet-belt-replacement-parts', 'AI-generated illustration of a wet timing belt, tensioner and oil pickup strainer on a workbench')}<figcaption>AI-generated illustration. Parts and layout vary by engine.</figcaption></figure>
      <ol class="wet-steps"><li><span aria-hidden="true">01</span><div><h3>Confirm the engine and the job</h3><p>We check the vehicle details, service history and any symptoms. Planned replacement and a belt-related breakdown need different repair plans.</p></div></li><li><span aria-hidden="true">02</span><div><h3>Replace the right components</h3><p>The timing belt, applicable oil-pump drive belt, tensioners, seals and required fixings are identified for your engine. Your quote confirms the parts and work involved.</p></div></li><li><span aria-hidden="true">03</span><div><h3>Check the oil system</h3><p>The oil pickup and relevant lubrication components need attention where belt debris is present. Blockages or wear can require further cleaning, testing or replacement.</p></div></li><li><span aria-hidden="true">04</span><div><h3>Refill and check</h3><p>Correct-specification oil and a new filter form part of the repair. Timing, sealing and the relevant running checks are completed before handover.</p></div></li></ol></div>
    </div></section>
    <section class="wet-section wet-container" id="wet-engines"><div class="wet-heading"><p class="section-kicker">Cars and vans</p><h2>Which engine do you have?</h2><p>These are the main wet-belt applications we cover. A registration check helps us avoid quoting for the wrong engine version.</p></div><div class="wet-engine-list">${engines.map(e => `<article><h3>${e.name}</h3><p>${e.detail}</p></article>`).join('')}</div><p class="wet-inline-help">Not sure? <a data-contact-location="wet_belt_identify" href="${whatsapp}">Send us your registration</a>. For other cambelt jobs, see <a href="/services/timing-belt-replacement/">timing belt replacement</a>.</p>
      <aside class="wet-warning"><div class="wet-warning-mark" aria-hidden="true">!</div><div><h3>Oil-pressure warning or a suspected belt failure?</h3><p>Stop safely and switch the engine off. Do not keep restarting it to check. Call us before arranging delivery: a new belt alone may not resolve damage caused by loss of oil pressure or timing.</p><a class="text-link" href="/services/engine-diagnostics/">Read about engine diagnosis and assessment <span aria-hidden="true">→</span></a></div></aside>
    </section>
    <section class="wet-soft" id="wet-questions"><div class="wet-container wet-section wet-faq-grid"><div class="wet-heading"><p class="section-kicker">Before you book</p><h2>A few useful answers</h2><p>Unsure about your service history or a warning light? Tell us what you know when you get in touch.</p></div><div class="faq-list">${faqs.map(([q,a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>
    <section class="wet-section wet-container" id="wet-quote"><div class="wet-booking"><div><p class="section-kicker">Talk to the workshop</p><h2>Get a quote for your wet belt</h2><p>Send your registration, mileage and any warning lights or symptoms. If you have a service history or an earlier quote, include that too. We’ll confirm the next step for your vehicle.</p>${buttons('booking')}<p class="wet-email">Prefer email? <a href="mailto:${business.email}?subject=Wet%20belt%20replacement%20quote">${business.email}</a></p></div><div class="wet-visit"><h3>Visit Quick Solution Vehicles</h3><p>56a Stratford Street North<br>Sparkbrook, Birmingham<br>B11 1BP</p><p>Monday–Saturday<br>10:00–18:00</p><a href="${maps}" data-contact-location="wet_belt_visit">Directions to the workshop <span aria-hidden="true">↗</span></a><p class="wet-local">Serving drivers from Birmingham, Solihull and across the West Midlands.</p></div></div></section>
  </div>`;
}

module.exports = { service, engines, faqs, render };
