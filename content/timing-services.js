// Engine-family guidance is checked against the manufacturer/component references
// recorded in _internal/docs/VAG_CAMBELT_REVIEW.md. Dates are context, not fitment rules.
const vagSlug = 'vw-audi-engine-repairs-birmingham';
const cambeltSlug = 'cambelt-replacement-birmingham';
const quoteLine = 'Quote by registration — WhatsApp your reg and mileage';

const services = [
  {
    slug: vagSlug,
    timingLanding: true,
    title: 'VW, Audi, Skoda & SEAT engine and timing repairs in Birmingham',
    metaTitle: 'VW & Audi Engine & Timing Repairs Birmingham | QuickVS',
    desc: 'VW, Audi, Skoda and SEAT engine, timing chain and cambelt repairs in Birmingham. Independent workshop. WhatsApp your reg and mileage for a quote.',
    short: 'VW, Audi, Skoda and SEAT petrol and diesel engine and timing repair enquiries.',
    intro: 'Timing rattle, a warning light or a non-running engine? Our independent all-makes garage assesses VW, Audi, Skoda and SEAT petrol and diesel engines at our Sparkbrook workshop.',
    sections: [
      ['Start with the engine, not just the badge',
        'A Golf or Polo can have a different timing drive from another car carrying the same TSI badge. Likewise, an Audi A3, A4 or A5, Skoda Octavia or Superb, and SEAT Leon or Ibiza need engine identification. Tell us the registration, mileage, fuel type and what has changed. An engine code or existing diagnostic report helps.\n\nQuick Solution Vehicles Ltd is an independent all-makes garage, not a VW or Audi main dealer or an approved manufacturer repairer. This is a workshop-based service; we do not offer mobile repairs.'],
      ['TSI and TFSI timing chain concerns',
        'Older 1.2 and 1.4 TSI EA111 petrol engines use timing chains. They are associated with the late-2000s and early-2010s cars, although changeover dates overlap by model. Early 1.8 and 2.0 TSI/TFSI EA888 Gen 1 and Gen 2 engines, broadly from the 2008–2013 period, also use chains and can develop chain wear or tensioner problems. These dates are a guide, not a way to identify your fitted engine.\n\nA cold-start rattle, cam/crank correlation fault or warning light needs investigation. None proves a failed chain on its own. We consider the noise, fault information, oil history and mechanical timing before agreeing the repair. Our [timing chain replacement page](/services/timing-chain-replacement/) explains the assessment. The 3.0 TDI V6 uses timing chains too; it should not be treated as a four-cylinder TDI cambelt job.'],
      ['Cambelts on later TSI and TDI engines',
        'The newer EA211 family includes belt-driven 1.0, 1.2, 1.4 and 1.5 TSI engines, introduced across different models from around 2012 onwards. Most 1.6 and 2.0 TDI engines in the EA189 and EA288 families also use a cambelt for the camshaft drive. The replacement schedule and parts depend on the actual engine.\n\nThat distinction matters when booking a Tiguan, Passat, Q3 or Q5, as well as a Golf or Octavia. Transporter enquiries also need the fitted engine identified: different generations do not all use the same layout. For planned dry-belt maintenance, see [cambelt replacement](/services/cambelt-replacement-birmingham/). Send the service history or previous belt invoice if available.'],
      ['When there may be internal engine damage',
        'After timing loss, heavy knocking, overheating or an oil-pressure warning, fitting a chain or belt may be only part of the work. We discuss the checks needed to establish whether there is valve, piston, bearing or casting damage. Stop safely and switch off a distressed engine rather than keep restarting it to demonstrate the fault.\n\nThe condition found determines whether a repair, rebuild or replacement is sensible. Read about the [engine rebuild process and repair options](/services/engine-rebuilds/). Standard engine-rebuild warranty: 6 months or 10,000 miles (whichever first), exact cover confirmed in writing. That is an engine-rebuild term, not a promise that every timing repair has the same cover. Recovery for suitable engine work can be arranged at customer cost.']
    ],
    faqs: [
      ['Does my VW or Audi use a chain or a cambelt?', 'It depends on the engine code and year, not just the model or TSI/TFSI badge. WhatsApp your reg and mileage. If it is a dry-belt engine, use our [cambelt replacement page](/services/cambelt-replacement-birmingham/).'],
      ['Is a cold-start rattle always the timing chain?', 'No. Describe when it happens and send any existing fault report. The noise and timing system need checking before parts are selected. Avoid repeatedly starting the engine to record it.'],
      ['Do you work on Skoda and SEAT engines too?', 'Yes. We consider Skoda and SEAT petrol and diesel engine and timing enquiries alongside VW and Audi. Shared engine families still require the fitted variant to be confirmed.'],
      ['Can you give a price from my registration?', 'The registration starts parts identification. Mileage, symptoms and service history help define the job. Planned maintenance can differ from repairing an existing fault; inspection may be needed before a written price is agreed.'],
      ['Do I need a replacement engine after timing failure?', 'Not automatically. The internal damage and reusable parts determine whether repair or rebuilding is viable. Call before arranging delivery of a non-runner.']
    ]
  },
  {
    slug: cambeltSlug,
    timingLanding: true,
    title: 'Cambelt (timing belt) replacement in Birmingham',
    metaTitle: 'Cambelt Replacement Birmingham | Timing Belts | QuickVS',
    desc: 'Dry cambelt replacement in Sparkbrook, Birmingham. Belt kits and water pumps where applicable. WhatsApp your reg and mileage for a vehicle-specific quote.',
    short: 'Conventional dry cambelts, tensioners, idlers and water pumps where applicable.',
    intro: 'Planning a cambelt change? Send your registration, mileage and service history to our Sparkbrook workshop. We identify the engine and agree the work before booking the replacement.',
    sections: [
      ['Conventional dry cambelts',
        'This page covers conventional dry cambelts, also called timing belts. They run behind covers rather than in the engine oil. Ford EcoBoost and PureTech wet-belt applications are handled on our separate [wet belt replacement page](/services/wet-belt-replacement/). If you are unsure which system your car has, send the registration before choosing a service.\n\nThe cambelt keeps the crankshaft and camshaft in step. Its condition matters even when the engine starts and drives normally. Follow the maintenance schedule rather than wait for a warning.'],
      ['When is your cambelt due?',
        'Check the service book and the manufacturer’s current schedule for the fitted engine. Where both a mileage limit and an age limit are specified, use whichever comes first. There is no single replacement interval that applies to every make, engine or model year; some schedules specify inspection requirements instead.\n\nLow mileage does not cancel a specified age limit. An ordinary service stamp does not prove the belt was replaced. Look for an invoice recording the date, mileage and timing work. Send the records you have.'],
      ['What is normally replaced?',
        'A planned job normally considers the belt, tensioner and idler pulleys as a system. The kit and procedure must match the engine. The water pump is included where applicable: for example, when driven by the cambelt or when replacement is recommended for that application. A different pump drive may require separate work.\n\nWe explain the proposed scope before work. Leaks, damaged covers or worn related components can require attention too. A new belt should not be fitted over an unresolved source of contamination or a damaged pulley.'],
      ['Warning signs and the risk of failure',
        'A belt can deteriorate without an obvious warning. Damage, contamination or abnormal noise needs assessment. A quiet engine or a quick visual check does not establish the whole drive’s condition.\n\nOn an interference engine, loss of timing can allow valves and pistons to contact, causing serious damage. If the engine stops suddenly or a belt failure is suspected, do not keep trying to restart it. Call first: checking the damage is a different job from a routine scheduled replacement.'],
      ['Common makes and how we quote',
        'We handle dry-belt enquiries across makes, including VW, Audi, Skoda and SEAT. Applicable EA211 1.0/1.2/1.4/1.5 TSI petrol engines and most EA189/EA288 1.6/2.0 TDI diesels use a cambelt for the camshaft drive. Other makes, including Vauxhall, have both belt-driven and chain-driven engines, so the fitted version must be checked. For a broader fault enquiry, see [VW Group engine and timing repairs](/services/vw-audi-engine-repairs-birmingham/).\n\nWhatsApp your reg, mileage and previous belt invoice if available. The engine, access, kit and applicable pump work determine the quote. An existing fault may need inspection first. We agree the price and scope in writing before starting; additional findings are discussed with you.']
    ],
    faqs: [
      ['Are a cambelt and a timing belt the same thing?', 'Yes. Both names describe the toothed belt used to keep the engine’s crankshaft and camshaft synchronised. This page is for conventional dry belts.'],
      ['Should the water pump be changed at the same time?', 'Where applicable. A cambelt-driven pump and the manufacturer or kit guidance inform the scope. A different pump-drive layout needs its own assessment; your quote confirms the work.'],
      ['Can I wait until the belt makes a noise?', 'No. A cambelt may fail without an audible warning. Follow the schedule for your engine rather than waiting for symptoms.'],
      ['My car has low mileage. Could the belt still be due?', 'Yes, where the manufacturer specifies an age limit. Check the date as well as mileage of the last documented replacement.'],
      ['Do you offer mobile cambelt replacement?', 'No. Repairs are carried out at our Birmingham workshop. Call or WhatsApp before bringing the vehicle in, especially if there is a suspected failure.']
    ]
  }
];

function chainCards({ inlineCopy }) {
  const cards = [
    ['BMW N47/N57', 'Cold-start rattle or timing-correlation faults? Explore [BMW N47 repairs](/services/bmw-n47-engine-rebuild/) and [N57 repairs](/services/bmw-n57-engine-rebuild/).'],
    ['JLR 2.0 Ingenium', 'Start-up rattle or timing warning lights need checking. See [Ingenium engine assessment](/services/jlr-ingenium-engine-rebuild/).'],
    ['VW/Audi/Skoda/SEAT TSI/TFSI', 'Cold-start rattle or cam/crank faults on chain-driven petrol engines? See [VW Group timing repairs](/services/vw-audi-engine-repairs-birmingham/).']
  ];
  return '<section class="section chain-coverage"><h2>Engines we commonly see</h2><div class="service-grid">' + cards.map(([name,text])=>'<article class="service-card chain-engine-card"><h3>'+name+'</h3><p>'+inlineCopy(text)+'</p></article>').join('')+'</div></section>';
}

function render(service, { hero, sections, reviewSection, faqsHtml, contactButtons, esc, top, bottom, business }) {
  const isVag = service.slug === vagSlug;
  const process = isVag ? '<section class="section service-detail section-muted"><h2>From your registration to an agreed repair</h2><ol class="number-list"><li><strong>Send your reg and mileage.</strong> Include the symptoms, running status and service history.</li><li><strong>Agree the inspection.</strong> We explain the checks needed, including any proposed dismantling.</li><li><strong>Approve the written price.</strong> Parts, labour and scope are agreed before repair work starts. Further findings are discussed first.</li></ol></section>' : '';
  const cta = '<section class="section cta-band"><div><p class="section-kicker">Talk to the workshop</p><h2>'+(isVag?'Discuss your engine or timing repair':'Plan your cambelt replacement')+'</h2><p>'+esc(quoteLine)+'</p><p>'+business.legalName+'<br>'+business.address+'<br>'+business.hours+'</p><p>Workshop-based only. Please arrange a booking before delivery.</p></div><div class="cta-actions">'+contactButtons(isVag?'vag_quote':'cambelt_quote')+'<a href="mailto:info@quickvs.com">info@quickvs.com</a></div></section>';
  return '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/services/">Services</a> / <span aria-current="page">'+(isVag?'VW Group engine and timing repairs':'Cambelt replacement')+'</span></nav>' +
    hero('Independent all-makes garage', service.title, service.intro).replace('class="page-hero"', 'class="page-hero timing-page-hero"') + top +
    '<div class="service-pricing-link timing-quote-line"><p>'+esc(quoteLine)+'</p></div>' +
    sections(service.sections) + process +
    (isVag ? reviewSection()+faqsHtml(service.faqs) : faqsHtml(service.faqs)+reviewSection()) + cta + bottom;
}

module.exports = { services, render, chainCards, quoteLine, vagSlug, cambeltSlug };
