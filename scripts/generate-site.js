const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const today = "2026-05-15";
const siteUrl = "https://quickvs.co.uk";
const heroImage =
  "https://cdn.tagbox.io/assets/679926e59dc9490011086236/d0e23379-97e2-4982-a2de-b61b831ba496---ak-2.jpg";
const garageImage =
  "https://cdn.tagbox.io/assets/679926e59dc9490011086236/da18ca47-44e6-423e-9474-9ec075bdcb47---ak-1.jpg";

const business = {
  legalName: "Quick Solution Vehicles Ltd",
  name: "Quick Solution Vehicles",
  address: "56a Stratford Street North, Sparkbrook, Birmingham, B11 1BP, United Kingdom",
  streetAddress: "56a Stratford Street North",
  locality: "Sparkbrook",
  city: "Birmingham",
  postcode: "B11 1BP",
  country: "United Kingdom",
  primaryPhone: "07514 277218",
  primaryTel: "+447514277218",
  secondaryPhone: "07762 145453",
  secondaryTel: "+447762145453",
  email: "quickvs@outlook.com",
  hours: "Monday-Saturday 10:00-18:00. Closed Sundays.",
  companiesHouse: "16525397",
  incorporated: "June 2025",
  warranty: "3 months or 10,000 miles, parts and labour",
  timeframe: "1-3 weeks depending on parts availability and damage extent"
};

const areas = [
  "Birmingham",
  "Sparkbrook",
  "B11",
  "Solihull",
  "Dudley",
  "Walsall",
  "Sandwell",
  "Coventry",
  "Wolverhampton",
  "West Bromwich"
];

const nav = [
  ["Home", "/"],
  ["Services", "/services/"],
  ["Blog", "/blog/"],
  ["About", "/about/"],
  ["Reviews", "/testimonials/"],
  ["Contact", "/contact/"]
];

const coreLinks = [
  ["BMW N47 engine rebuild", "/services/bmw-n47-engine-rebuild/"],
  ["BMW N57 engine rebuild", "/services/bmw-n57-engine-rebuild/"],
  ["JLR Ingenium engine rebuild", "/services/jlr-ingenium-engine-rebuild/"],
  ["Range Rover engine rebuild", "/services/range-rover-engine-rebuild/"],
  ["Engine rebuilds Birmingham", "/services/engine-rebuild-birmingham/"]
];

const generalServices = [
  {
    slug: "engine-rebuilds",
    title: "Engine Rebuilds in Birmingham",
    short: "Petrol and diesel engine rebuilds where rebuilding is commercially sensible.",
    desc: "Engine rebuilds in Birmingham for BMW, JLR, Range Rover and other petrol or diesel engines where repair makes commercial sense.",
    intro:
      "When an engine has failed, the expensive part is not just the repair. It is choosing the right repair. Quick Solution Vehicles inspects the fault, explains the damage and helps you decide whether a rebuild, replacement or further testing is the sensible route.",
    points: ["Strip-down inspection", "OEM-grade components where suitable", "Warranty included on rebuilds"],
    related: ["/services/bmw-n47-engine-rebuild/", "/services/jlr-ingenium-engine-rebuild/"]
  },
  {
    slug: "engine-diagnostics",
    title: "Engine Diagnostics in Birmingham",
    short: "Fault finding for warning lights, limp mode, smoke, no-start and poor running.",
    desc: "Engine diagnostics in Birmingham for warning lights, limp mode, misfires, smoke, no-start issues and serious mechanical faults.",
    intro:
      "Good repair work starts with the right diagnosis. We investigate warning lights, limp mode, poor running, smoke, overheating and no-start faults before parts are fitted or major labour begins.",
    points: ["Fault code and live data checks", "Mechanical checks where needed", "Clear findings before repair"],
    related: ["/services/engine-rebuilds/", "/services/dpf-egr-emissions/"]
  },
  {
    slug: "timing-chain-replacement",
    title: "Timing Chain Replacement in Birmingham",
    short: "Timing chain, guide, tensioner and related repair work.",
    desc: "Timing chain replacement in Birmingham for rattles, chain stretch, guide failure and serious timing-related engine faults.",
    intro:
      "Timing chain faults can move quickly from a noise to major engine damage. We inspect the symptoms, confirm the likely cause and replace chain-related components carefully where repair is viable.",
    points: ["Chain, guide and tensioner replacement", "BMW N47 and N57 knowledge", "Engine damage checks before repair"],
    related: ["/services/bmw-n47-engine-rebuild/", "/services/bmw-n57-engine-rebuild/"]
  },
  {
    slug: "timing-belt-replacement",
    title: "Timing Belt Replacement in Birmingham",
    short: "Timing belt and related component replacement.",
    desc: "Timing belt replacement in Birmingham with practical advice on belts, water pumps and age or mileage-related replacement.",
    intro:
      "A timing belt is not a part to ignore. We replace belts and related components where required, using a careful process that protects the engine from avoidable timing damage.",
    points: ["Belt condition advice", "Water pump checks where applicable", "Correct timing procedure"],
    related: ["/services/engine-diagnostics/", "/services/servicing/"]
  },
  {
    slug: "clutch-replacement",
    title: "Clutch Replacement in Birmingham",
    short: "Clutch, flywheel and related driveline work.",
    desc: "Clutch replacement in Birmingham for slipping, vibration, heavy pedals, biting point changes and related mechanical faults.",
    intro:
      "A slipping or noisy clutch can leave a vehicle unusable. We inspect the symptoms, check related components and explain whether clutch, flywheel or associated mechanical work is needed.",
    points: ["Clutch fault diagnosis", "Flywheel advice", "Driveline checks"],
    related: ["/services/gearbox-repairs/", "/services/engine-diagnostics/"]
  },
  {
    slug: "brakes",
    title: "Brake Servicing and Repairs in Birmingham",
    short: "Brake discs, pads, safety checks and mechanical brake repairs.",
    desc: "Brake servicing and repair in Birmingham for discs, pads, braking noise, vibration, MOT failure items and safety checks.",
    intro:
      "Brake faults need straight answers. We inspect discs, pads and related mechanical items, then explain what is worn, what is still serviceable and what needs replacing.",
    points: ["Brake discs and pads", "Noise and vibration checks", "MOT failure brake repairs"],
    related: ["/services/mot-failure-repairs/", "/services/servicing/"]
  },
  {
    slug: "gearbox-repairs",
    title: "Gearbox-Related Mechanical Work in Birmingham",
    short: "Investigation and mechanical work for gearbox and driveline symptoms.",
    desc: "Gearbox-related mechanical work in Birmingham for shifting issues, vibration, noises and related drivetrain symptoms.",
    intro:
      "Gearbox symptoms can come from several areas, including clutch, mounts, linkages and driveline components. We investigate the fault and explain the repair options before expensive work begins.",
    points: ["Noise and vibration checks", "Clutch and flywheel links", "Practical repair advice"],
    related: ["/services/clutch-replacement/", "/services/engine-diagnostics/"]
  },
  {
    slug: "dpf-egr-emissions",
    title: "DPF, EGR and Emissions Investigation in Birmingham",
    short: "Diagnosis for DPF, EGR, boost, sensor and poor running faults.",
    desc: "DPF, EGR and emissions investigation in Birmingham for warning lights, limp mode, poor running, boost leaks and sensor faults.",
    intro:
      "Emissions faults are often misdiagnosed. We investigate DPF, EGR, boost, sensor and poor running issues so the repair is based on evidence rather than guesswork.",
    points: ["DPF and EGR diagnosis", "Boost and sensor checks", "No unnecessary parts advice"],
    related: ["/services/engine-diagnostics/", "/services/servicing/"]
  },
  {
    slug: "servicing",
    title: "Vehicle Servicing in Birmingham",
    short: "Oil, filters, fluids, plugs and practical vehicle inspections.",
    desc: "Vehicle servicing in Birmingham for oil, filters, fluids, spark plugs, inspections and preventative maintenance.",
    intro:
      "Regular servicing keeps small issues from becoming expensive ones. We carry out oil, filter, fluid, plug and inspection work with clear advice on what needs attention now and what can wait.",
    points: ["Oil and filters", "Fluids and plugs", "Inspection notes"],
    related: ["/services/brakes/", "/services/engine-diagnostics/"]
  },
  {
    slug: "mot-failure-repairs",
    title: "MOT Failure Repairs in Birmingham",
    short: "Mechanical repairs for MOT failures and advisories before retest elsewhere.",
    desc: "MOT failure repairs in Birmingham for mechanical faults and advisories so customers can return for an MOT test elsewhere.",
    intro:
      "Quick Solution Vehicles is not an MOT test centre. We repair mechanical MOT failures and advisories so you can return to your chosen test centre with the issues rectified.",
    points: ["Failure item repair", "Advisory repair planning", "Clear retest advice"],
    related: ["/services/brakes/", "/services/servicing/"]
  },
  {
    slug: "customer-supplied-tyre-fitting",
    title: "Customer-Supplied Tyre Fitting in Birmingham",
    short: "Tyre fitting only for tyres supplied by the customer.",
    desc: "Customer-supplied tyre fitting in Birmingham. Quick Solution Vehicles fits tyres supplied by customers and does not stock or sell tyres.",
    intro:
      "We can fit tyres supplied by the customer. We do not stock tyres and we do not sell tyres, so please arrange the correct tyres before booking fitting.",
    points: ["Customer supplies tyres", "Fitting only", "No tyre stock held"],
    related: ["/services/brakes/", "/contact/"]
  },
  {
    slug: "trade-warranty-repairs",
    title: "Trade and Warranty Company Repairs",
    short: "Mechanical repair work for trade customers and warranty companies.",
    desc: "Trade and warranty-company repair work for engine rebuilds, diagnostics and serious mechanical repairs, with UK-wide recovery support where funded by the customer.",
    intro:
      "We support trade customers and warranty companies with serious mechanical repair work, diagnostics and engine rebuild enquiries. UK-wide recovery can be arranged for suitable work where the customer funds recovery.",
    points: ["Trade repair support", "Warranty-company communication", "UK-wide recovery support"],
    related: ["/services/engine-rebuilds/", "/services/engine-diagnostics/"]
  }
];

const specialistServices = [
  {
    slug: "bmw-n47-engine-rebuild",
    title: "BMW N47 Engine Rebuild Specialist in Birmingham",
    desc: "BMW N47 engine rebuilds and timing chain failure repair in Birmingham, with recovery support, OEM-grade parts and rebuild warranty.",
    keyword: "BMW N47 engine rebuild",
    opening:
      "BMW N47 engines are often booked in after chain rattle, non-start faults, oil pressure concerns or sudden engine failure. Quick Solution Vehicles helps owners understand whether timing chain repair, engine rebuild or further diagnosis is the sensible route before committing to major spend.",
    why:
      "The BMW N47 is well known for timing chain wear and chain-related failures. Damage can affect guides, tensioners, valves and internal components if the chain jumps or fails.",
    symptoms: ["Rattle from the rear of the engine", "Non-start after chain failure", "Engine management light or timing faults", "Poor running, smoke or loss of power", "Metal contamination in oil"],
    process: ["Initial symptom and fault-code assessment", "Mechanical testing where appropriate", "Strip-down and damage report", "Rebuild with OEM-grade components where commercially sensible", "Final checks before handover"],
    parts: "OEM-grade components are used where suitable. IWIS chain kits may be used where appropriate, but final parts choice depends on vehicle, availability and confirmed repair plan.",
    faqs: [
      ["Can an N47 timing chain failure be repaired?", "Often yes, but the engine must be inspected so the extent of damage is clear."],
      ["Do you replace N47 timing chains?", "Yes. We handle N47 timing chain replacement and chain-related engine repair."],
      ["Should I keep driving if the chain is rattling?", "No. Continuing to drive can increase the damage and cost."],
      ["How long does an N47 rebuild take?", `Typical rebuild timeframe is ${business.timeframe}.`],
      ["What warranty is included?", `Engine rebuilds include ${business.warranty}.`],
      ["Can you arrange recovery?", "Yes, UK-wide recovery can be arranged at customer cost for non-running cars and engine work."]
    ],
    related: ["/services/bmw-n57-engine-rebuild/", "/services/timing-chain-replacement/", "/services/engine-diagnostics/"]
  },
  {
    slug: "bmw-n57-engine-rebuild",
    title: "BMW N57 Engine Rebuild Specialist in Birmingham",
    desc: "BMW N57 3.0 diesel engine rebuilds in Birmingham for serious mechanical faults, timing issues and rebuild assessment.",
    keyword: "BMW N57 engine rebuild",
    opening:
      "BMW N57 owners usually contact us when the car has a serious noise, poor running, oil pressure concern or suspected internal damage. We inspect the fault and explain whether rebuild, repair or replacement is the commercially sensible path.",
    why:
      "BMW N57 failures can involve timing components, oil-related damage, overheating, turbo-related issues or wear from high mileage and poor maintenance history.",
    symptoms: ["Heavy engine noise", "Timing-related fault codes", "Oil pressure warnings", "Smoke, misfire or poor running", "Non-start or seized engine"],
    process: ["Diagnostic assessment", "Oil and mechanical checks", "Strip-down if rebuild is viable", "Rebuild plan and parts approval", "Road test and final checks where possible"],
    parts: "We use OEM-grade components where suitable and agree the parts route before major work begins.",
    faqs: [
      ["Is an N57 worth rebuilding?", "It can be, depending on the vehicle value, damage extent and parts availability."],
      ["Do you inspect before quoting final cost?", "Yes. Final cost depends on confirmed internal damage."],
      ["Can you work with warranty companies?", "Yes, we handle trade and warranty-company repair work."],
      ["How long does an N57 rebuild take?", `Typical rebuild timeframe is ${business.timeframe}.`],
      ["What warranty is included?", `Engine rebuilds include ${business.warranty}.`],
      ["Can recovery be arranged?", "Yes, recovery can be arranged at customer cost."]
    ],
    related: ["/services/bmw-n47-engine-rebuild/", "/services/engine-rebuilds/", "/services/timing-chain-replacement/"]
  },
  {
    slug: "jlr-ingenium-engine-rebuild",
    title: "JLR Ingenium Engine Rebuild Specialist in Birmingham",
    desc: "JLR Ingenium 2.0d, 2.2d and 3.0 engine rebuilds in Birmingham, including wet belt and oil dilution-related issues.",
    keyword: "JLR Ingenium engine rebuild",
    opening:
      "Ingenium diesel faults can become expensive quickly, especially where wet belt, oil dilution or internal engine damage is suspected. We investigate the cause, explain the repair options and help owners decide whether rebuild work is sensible.",
    why:
      "JLR Ingenium engines can suffer from wet belt deterioration, oil dilution concerns and timing or lubrication-related damage.",
    symptoms: ["Oil pressure warning", "Wet belt concern", "Rattle, knocking or poor running", "Excess smoke", "Non-start or internal engine damage"],
    process: ["Fault and oil condition checks", "Assessment of wet belt or timing concerns", "Strip-down and damage confirmation", "Rebuild using suitable OEM-grade components", "Final checks and customer handover"],
    parts: "We use OEM-grade components where suitable. Parts choice depends on confirmed damage and availability.",
    faqs: [
      ["Do you rebuild JLR Ingenium engines?", "Yes, including 2.0d, 2.2d and 3.0 engine rebuild enquiries."],
      ["Do you handle wet belt failures?", "Yes, wet belt and related engine damage enquiries are part of this specialist work."],
      ["Can oil dilution damage the engine?", "Oil dilution can contribute to lubrication concerns and must be assessed properly."],
      ["How long does an Ingenium rebuild take?", `Typical rebuild timeframe is ${business.timeframe}.`],
      ["What warranty is included?", `Engine rebuilds include ${business.warranty}.`],
      ["Can recovery be arranged?", "Yes, recovery can be arranged at customer cost."]
    ],
    related: ["/services/range-rover-engine-rebuild/", "/services/engine-rebuilds/", "/services/dpf-egr-emissions/"]
  },
  {
    slug: "range-rover-engine-rebuild",
    title: "Range Rover Engine Rebuild Specialist in Birmingham",
    desc: "Range Rover engine rebuilds in Birmingham for serious mechanical faults, non-running vehicles and JLR-related engine failure.",
    keyword: "Range Rover engine rebuild specialist",
    opening:
      "Range Rover engine faults are rarely cheap, so diagnosis and repair planning matter. We help owners understand the fault, the likely damage and whether rebuild work is the right decision before major parts are ordered.",
    why:
      "Range Rover engine failures may relate to timing, lubrication, overheating, oil dilution, emissions-system issues or wear.",
    symptoms: ["Engine knock or rattle", "Oil pressure warning", "Smoke or loss of power", "Timing or wet belt concern", "Non-running vehicle"],
    process: ["Initial diagnosis", "Mechanical and oil checks", "Strip-down where rebuild is viable", "OEM-grade rebuild parts where suitable", "Warranty-backed handover"],
    parts: "OEM-grade components are used where suitable, with parts choices confirmed before major work starts.",
    faqs: [
      ["Do you rebuild Range Rover engines?", "Yes, where rebuilding is commercially sensible after inspection."],
      ["Can you arrange recovery for a non-running Range Rover?", "Yes, UK-wide recovery can be arranged at customer cost."],
      ["Do you work with warranty companies?", "Yes, we handle warranty-company repair work."],
      ["How long does a Range Rover rebuild take?", `Typical rebuild timeframe is ${business.timeframe}.`],
      ["What warranty is included?", `Engine rebuilds include ${business.warranty}.`],
      ["Do you give a fixed price online?", "No. Costs are confirmed after inspection because damage and parts requirements vary."]
    ],
    related: ["/services/jlr-ingenium-engine-rebuild/", "/services/engine-rebuilds/", "/services/engine-diagnostics/"]
  },
  {
    slug: "engine-rebuild-birmingham",
    title: "Engine Rebuilds in Birmingham",
    desc: "Engine rebuilds in Birmingham and Sparkbrook for petrol and diesel vehicles, with recovery support and rebuild warranty.",
    keyword: "engine rebuild Birmingham",
    opening:
      "If your car has serious engine damage, the decision is usually repair, rebuild or replace. Quick Solution Vehicles in Sparkbrook, Birmingham helps drivers make that decision with practical diagnosis and honest advice before major money is spent.",
    why:
      "Engines fail for many reasons: timing faults, lubrication problems, overheating, oil contamination, component wear or previous poor repairs. The correct route depends on the damage found during inspection.",
    symptoms: ["Knocking or rattling", "Smoke or overheating", "Oil pressure warnings", "Loss of compression", "Non-start or seized engine"],
    process: ["Initial checks", "Damage assessment", "Repair route and cost discussion", "Rebuild using suitable OEM-grade parts", "Final checks before return"],
    parts: "We use OEM-grade components where suitable and agree the parts plan before work proceeds.",
    faqs: [
      ["Is rebuilding cheaper than replacing an engine?", "Sometimes. It depends on the damage, vehicle value and parts availability."],
      ["Do you rebuild petrol and diesel engines?", "Yes, where rebuilding is commercially sensible."],
      ["Do you provide prices online?", "No. Costs are confirmed after inspection because damage and parts requirements vary."],
      ["How long does an engine rebuild take?", `Typical rebuild timeframe is ${business.timeframe}.`],
      ["What warranty is included?", `Engine rebuilds include ${business.warranty}.`],
      ["Can you recover the vehicle?", "Yes, recovery can be arranged at customer cost."]
    ],
    related: ["/services/engine-rebuilds/", "/services/engine-diagnostics/", "/contact/"]
  }
];

const allServices = [...specialistServices, ...generalServices];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function urlFor(pathname) {
  return `${siteUrl}${pathname}`;
}

function relPrefix(pathname) {
  const depth = pathname.split("/").filter(Boolean).length;
  return depth ? "../".repeat(depth) : "";
}

function writeFile(filePath, content) {
  const full = path.join(root, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

function jsonLd(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    "@id": `${siteUrl}/#business`,
    name: business.name,
    legalName: business.legalName,
    url: siteUrl,
    image: heroImage,
    telephone: business.primaryTel,
    email: business.email,
    priceRange: "GBP",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: `${business.locality}, ${business.city}`,
      postalCode: business.postcode,
      addressCountry: "GB"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:00"
      }
    ],
    areaServed: [...areas, "United Kingdom"],
    sameAs: [`${siteUrl}/`],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Companies House",
      value: business.companiesHouse
    }
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item[0],
      item: urlFor(item[1])
    }))
  };
}

function serviceSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    serviceType: page.keyword || page.title,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: [...areas, "United Kingdom"],
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        description: "Costs are confirmed after inspection because damage and parts requirements vary."
      }
    }
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a }
    }))
  };
}

function analyticsSnippet() {
  return `<!-- GA4 is configured with the live Quick Solution Vehicles Measurement ID. -->
<script>
  (function () {
    var ga4MeasurementId = "G-GEJR9VMEYV";
    if (!ga4MeasurementId) return;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4MeasurementId);
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", ga4MeasurementId);
  })();
</script>
<!-- Search Console is verified by Domain name provider / DNS, so no HTML verification meta tag is required. -->
<!-- Google Tag Manager is disabled until a real container ID is provided. -->`;
}

function head({ title, description, pathname, type = "website", image = heroImage, extra = "" }) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#111827">
<link rel="canonical" href="${urlFor(pathname)}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${urlFor(pathname)}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<link rel="preconnect" href="https://cdn.tagbox.io">
${analyticsSnippet()}
<link rel="stylesheet" href="${relPrefix(pathname)}styles.css">
<script defer src="${relPrefix(pathname)}script.js"></script>
${extra}`;
}

function header(pathname) {
  const prefix = relPrefix(pathname);
  const navLinks = nav
    .map(([label, href]) => `<a href="${prefix}${href.replace(/^\//, "")}"${href === pathname ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("");
  return `<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="${prefix}" aria-label="Quick Solution Vehicles home">
      <img class="brand-logo" src="${prefix}assets/qsv-logo.svg" alt="Quick Solution Vehicles logo">
      <span><strong>${business.name}</strong><small>Engine rebuild specialists</small></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle aria-label="Open navigation"><span></span><span></span><span></span></button>
    <nav id="site-nav" class="site-nav" data-nav>${navLinks}</nav>
    <div class="header-actions"><a class="button button-light" href="tel:${business.primaryTel}">${business.primaryPhone}</a></div>
  </div>
</header>`;
}

function footer(pathname) {
  const prefix = relPrefix(pathname);
  const serviceItems = [
    ["Engine Rebuilds", "/services/engine-rebuilds/"],
    ["BMW N47 Rebuilds", "/services/bmw-n47-engine-rebuild/"],
    ["Diagnostics", "/services/engine-diagnostics/"],
    ["Timing Chains", "/services/timing-chain-replacement/"],
    ["MOT Failure Repairs", "/services/mot-failure-repairs/"],
    ["Customer Tyre Fitting", "/services/customer-supplied-tyre-fitting/"]
  ];
  return `<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-grid">
      <div class="footer-brand">
        <img class="footer-logo" src="${prefix}assets/qsv-logo.svg" alt="Quick Solution Vehicles logo">
        <h2 class="footer-title">${business.name}</h2>
        <p>Honest, mechanic-led engine rebuilds, diagnostics and serious mechanical repairs in Sparkbrook, Birmingham.</p>
        <div class="footer-actions">
          <a class="button button-light" href="tel:${business.primaryTel}">Call ${business.primaryPhone}</a>
          <a class="button button-light" href="mailto:${business.email}">Email us</a>
        </div>
      </div>
      <div class="footer-column">
        <h3>Quick Links</h3>
        <ul>${nav.map(([label, href]) => `<li><a href="${prefix}${href.replace(/^\//, "")}">${label}</a></li>`).join("")}</ul>
      </div>
      <div class="footer-column">
        <h3>Our Services</h3>
        <ul>${serviceItems.map(([label, href]) => `<li><a href="${prefix}${href.replace(/^\//, "")}">${label}</a></li>`).join("")}</ul>
      </div>
      <div class="footer-column">
        <h3>Contact Info</h3>
        <ul class="footer-contact">
          <li><span class="footer-icon">T</span><a href="tel:${business.primaryTel}">${business.primaryPhone}</a></li>
          <li><span class="footer-icon">M</span><a href="tel:${business.secondaryTel}">${business.secondaryPhone}</a></li>
          <li><span class="footer-icon">@</span><a href="mailto:${business.email}">${business.email}</a></li>
          <li><span class="footer-icon">P</span><span>${business.address}</span></li>
          <li><span class="footer-icon">H</span><span>${business.hours}</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; <span data-year></span> ${business.name}. All rights reserved.</p>
    <div class="footer-links"><a href="${prefix}contact/">Contact</a><a href="${prefix}sitemap.xml">Sitemap</a><a href="${prefix}robots.txt">Robots</a></div>
  </div>
</footer>
<div class="mobile-call-bar"><a href="tel:${business.primaryTel}">Call ${business.primaryPhone}</a><a href="${prefix}contact/">Enquire</a></div>`;
}

function layout({ title, description, pathname, body, extraSchemas = [], type = "website" }) {
  const schemas = [localBusinessSchema(), ...extraSchemas].map(jsonLd).join("\n");
  return `<!doctype html>
<html lang="en-GB">
<head>
${head({ title, description, pathname, type, extra: schemas })}
</head>
<body>
${header(pathname)}
<main id="main-content">
${body}
</main>
${footer(pathname)}
</body>
</html>
`;
}

function pageHero(kicker, h1, copy) {
  return `<section class="page-hero"><div class="page-hero-content"><p class="eyebrow">${kicker}</p><h1>${h1}</h1><p class="page-hero-copy">${copy}</p></div></section>`;
}

function ctaBlock(prefix = "") {
  return `<section class="section cta-band">
  <div><p class="section-kicker">Speak to the workshop</p><h2>Need a straight answer on a serious mechanical fault?</h2><p>Call, email or send the contact form details. For non-running cars and engine work, recovery can be arranged at customer cost.</p></div>
  <div class="cta-actions">
    <a class="button button-primary" href="tel:${business.primaryTel}">Call ${business.primaryPhone}</a>
    <a class="button button-dark" href="mailto:${business.email}">Email ${business.email}</a>
    <a class="button button-light on-white" href="${prefix}contact/">Contact form</a>
    <a class="button button-light on-white" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}" target="_blank" rel="noopener">Directions</a>
  </div>
</section>`;
}

function serviceCards(prefix = "") {
  return generalServices
    .map((service, index) => `<article class="service-card"><a href="${prefix}services/${service.slug}/"><span class="service-icon">${String(index + 1).padStart(2, "0")}</span><h3>${service.title}</h3><p>${service.short}</p></a></article>`)
    .join("");
}

function specialistCards(prefix = "") {
  return specialistServices
    .map((service) => `<article class="service-card highlight-card"><a href="${prefix}services/${service.slug}/"><span class="service-icon">Specialist</span><h3>${service.title}</h3><p>${service.opening}</p></a></article>`)
    .join("");
}

function renderHome() {
  const faqs = [
    ["Do you rebuild BMW N47 and N57 engines?", "Yes. BMW N47 and N57 rebuilds are core specialist services."],
    ["Do you repair JLR Ingenium wet belt failures?", "Yes. We investigate and rebuild JLR Ingenium engines where rebuilding is commercially sensible."],
    ["Are you an MOT test centre?", "No. We rectify MOT failures and advisories so customers can return for a test elsewhere."],
    ["Do you sell tyres?", "No. We only fit tyres supplied by the customer."],
    ["How long does an engine rebuild take?", `Typical rebuild timeframe is ${business.timeframe}.`],
    ["What warranty is included on engine rebuilds?", `Engine rebuilds include ${business.warranty}.`]
  ];
  const body = `${pageHero("Birmingham engine rebuild specialists", "Engine rebuilds and serious mechanical repairs in Sparkbrook, Birmingham.", "Quick Solution Vehicles specialises in engine rebuilds, diagnostics, timing chains and major mechanical repair work. Honest advice first, clear repair options second.")}
<section class="trust-strip" aria-label="Key trust points"><span>BMW N47 and N57 rebuilds</span><span>JLR Ingenium wet belt faults</span><span>${business.warranty}</span><span>${business.timeframe}</span><span>5-star rated on Google</span></section>
<section class="section intro-grid"><div><p class="section-kicker">Mechanic-led advice</p><h2>For drivers facing expensive engine or mechanical problems.</h2></div><div class="intro-copy"><p>We support retail customers across Birmingham and around a 50-mile radius, while trade and warranty-company repair work can be handled UK-wide where recovery is arranged or funded.</p><p>The focus is practical: diagnose the fault, explain the damage, then agree a repair route that makes sense for the vehicle.</p></div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Specialist engine work</p><h2>High-value rebuild services for known engine failure patterns.</h2></div><a class="text-link" href="services/">See all services</a></div><div class="service-grid">${specialistCards()}</div></section>
<section class="section feature"><div class="media-image"><img src="${garageImage}" alt="Quick Solution Vehicles workshop exterior in Birmingham" loading="lazy"></div><div class="feature-copy"><p class="section-kicker">Rebuild warranty</p><h2>Clear process, realistic timescales and no invented prices.</h2><p>Engine rebuilds include ${business.warranty}. Typical rebuild timeframe is ${business.timeframe}. Costs are confirmed after inspection because internal damage and parts availability change the repair route.</p><ul class="check-list"><li>Diagnostics before major labour</li><li>OEM-grade components where suitable</li><li>Recovery arranged at customer cost for non-running cars</li><li>Trade and warranty-company repair work supported</li></ul><a class="button button-dark" href="contact/">Talk to us about an engine fault</a></div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Garage services</p><h2>Mechanical repair services with dedicated pages.</h2></div></div><div class="service-grid">${serviceCards()}</div></section>
<section class="section local-seo"><p class="section-kicker">Areas we cover</p><h2>Serving drivers across Birmingham and the wider area.</h2><p>We support drivers across Birmingham, Solihull, Dudley, Walsall, Sandwell, Coventry, Wolverhampton and West Bromwich. For non-running cars and engine work we can arrange recovery from anywhere in the UK.</p><div class="area-list" aria-label="Areas served">${areas.map((area) => `<span>${area}</span>`).join("")}</div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Reviews</p><h2>5-star rated on Google.</h2></div><a class="text-link" href="testimonials/">Review details</a></div><p class="wide-copy">For the latest customer feedback, visit the Google profile from the reviews page. Individual review text is shown on this site only after it has been checked against the original listing.</p></section>
<section class="section"><div class="section-heading"><div><p class="section-kicker">Frequently asked questions</p><h2>Quick answers before you call.</h2></div></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></section>
${ctaBlock()}`;
  writeFile("index.html", layout({ title: "Quick Solution Vehicles | Engine Rebuilds Birmingham", description: "Quick Solution Vehicles specialises in engine rebuilds, BMW N47 and N57 timing faults, JLR Ingenium repairs and serious mechanical work in Sparkbrook, Birmingham.", pathname: "/", body, extraSchemas: [faqSchema(faqs)] }));
}

function renderServicesIndex() {
  const body = `${pageHero("Garage services Birmingham", "Services for engine rebuilds, diagnostics and serious mechanical repairs.", "Quick Solution Vehicles focuses on practical diagnosis and mechanical repair work for retail customers, trade customers and warranty companies.")}
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Specialist landing pages</p><h2>Engine rebuild pages for the searches that matter most.</h2></div></div><div class="service-grid">${specialistCards("../")}</div></section>
<section class="section"><div class="section-heading"><div><p class="section-kicker">All services</p><h2>Every service has its own page and clear booking route.</h2></div></div><div class="service-grid">${serviceCards("../")}</div></section>
${ctaBlock("../")}`;
  writeFile("services/index.html", layout({ title: "Garage Services Birmingham | Quick Solution Vehicles", description: "Engine rebuilds, diagnostics, timing chains, timing belts, clutches, brakes, gearbox work, emissions investigation, servicing and MOT failure repairs in Birmingham.", pathname: "/services/", body, extraSchemas: [breadcrumbSchema([["Home", "/"], ["Services", "/services/"]])] }));
}

function renderGeneralService(service) {
  const faqs = [
    [`Do you offer ${service.title.toLowerCase()}?`, `Yes. ${service.short}`],
    ["Do you give a price online?", "No. Costs are confirmed after inspection because repair requirements vary."],
    ["Can I call before booking?", `Yes, call ${business.primaryPhone} for practical advice.`],
    ["Can you arrange recovery?", "For non-running cars and engine work, recovery can be arranged at customer cost."],
    ["Where are you based?", business.address]
  ];
  const body = `${pageHero("Quick Solution Vehicles services", service.title, service.intro)}
<section class="section intro-grid"><div><p class="section-kicker">What we do</p><h2>${service.short}</h2></div><div class="intro-copy"><p>${service.desc}</p><ul class="check-list">${service.points.map((point) => `<li>${point}</li>`).join("")}</ul></div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Related services</p><h2>Useful next pages.</h2></div></div><div class="link-grid">${service.related.map((href) => `<a class="link-card" href="../../${href.replace(/^\//, "")}">${labelForHref(href)}</a>`).join("")}<a class="link-card" href="../../contact/">Contact the workshop</a></div></section>
<section class="section"><div class="section-heading"><div><p class="section-kicker">FAQs</p><h2>Questions about this service.</h2></div></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></section>
${ctaBlock("../../")}`;
  writeFile(`services/${service.slug}/index.html`, layout({ title: `${service.title} | Quick Solution Vehicles`, description: service.desc, pathname: `/services/${service.slug}/`, body, extraSchemas: [serviceSchema(service), breadcrumbSchema([["Home", "/"], ["Services", "/services/"], [service.title, `/services/${service.slug}/`]]), faqSchema(faqs)] }));
}

function renderSpecialist(service) {
  const body = `${pageHero("Engine rebuild specialist", service.title, service.opening)}
<section class="section intro-grid"><div><p class="section-kicker">Why this engine fails</p><h2>Diagnosis comes before commitment.</h2></div><div class="intro-copy"><p>${service.why}</p><p><strong>Timeframe:</strong> ${business.timeframe}. <strong>Warranty:</strong> ${business.warranty}.</p><p><strong>Cost:</strong> confirmed after inspection because damage and parts requirements vary.</p></div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Common symptoms</p><h2>Symptoms customers usually report.</h2></div></div><div class="value-grid">${service.symptoms.map((item) => `<article class="value-card"><h3>${item}</h3><p>Book diagnosis before continuing to drive if a serious engine fault is suspected.</p></article>`).join("")}</div></section>
<section class="section feature"><div class="media-image"><img src="${garageImage}" alt="Quick Solution Vehicles workshop for engine rebuilds in Birmingham" loading="lazy"></div><div class="feature-copy"><p class="section-kicker">Our rebuild process</p><h2>A careful route from inspection to handover.</h2><ol class="number-list">${service.process.map((step) => `<li>${step}</li>`).join("")}</ol><p><strong>Parts we use:</strong> ${service.parts}</p><p><strong>Recovery:</strong> UK-wide recovery can be arranged for non-running cars and engine work at customer cost.</p></div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Before major work starts</p><h2>Inspection comes first.</h2></div></div><p class="wide-copy">Every rebuild enquiry starts with diagnosis, damage assessment and a clear repair route before major parts are ordered.</p></section>
<section class="section"><div class="section-heading"><div><p class="section-kicker">FAQs</p><h2>Practical questions about ${service.keyword}.</h2></div></div><div class="faq-list">${service.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Related services</p><h2>Keep researching the right repair route.</h2></div></div><div class="link-grid">${service.related.map((href) => `<a class="link-card" href="../../${href.replace(/^\//, "")}">${labelForHref(href)}</a>`).join("")}<a class="link-card" href="../">Back to services</a><a class="link-card" href="../../">Homepage</a></div></section>
${ctaBlock("../../")}`;
  writeFile(`services/${service.slug}/index.html`, layout({ title: `${service.title} | Quick Solution Vehicles`, description: service.desc, pathname: `/services/${service.slug}/`, body, extraSchemas: [serviceSchema(service), breadcrumbSchema([["Home", "/"], ["Services", "/services/"], [service.title, `/services/${service.slug}/`]]), faqSchema(service.faqs)] }));
}

function labelForHref(href) {
  const slug = href.split("/").filter(Boolean).pop();
  const found = allServices.find((service) => service.slug === slug);
  if (found) return found.title;
  if (href === "/contact/") return "Contact Quick Solution Vehicles";
  return "Related page";
}

function renderAbout() {
  const body = `${pageHero("About Quick Solution Vehicles", "Honest, technical and no-nonsense mechanical repair.", "Quick Solution Vehicles is based in Sparkbrook, Birmingham and specialises in engine rebuilds and serious mechanical repair work.")}
<section class="section intro-grid"><div><p class="section-kicker">Legal details</p><h2>${business.legalName}</h2></div><div class="intro-copy"><p>Companies House number ${business.companiesHouse}, incorporated ${business.incorporated}, SIC 45200. Customer-facing copy uses ${business.name}.</p><p>We are not an MOT test centre and we do not stock or sell tyres. We repair MOT failures and fit customer-supplied tyres only.</p></div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Where we work</p><h2>Retail local, trade and warranty work wider.</h2></div></div><p class="wide-copy">Retail customers are normally supported across Birmingham and around a 50-mile radius. Trade and warranty-company work can be UK-wide where the customer arranges or funds recovery.</p></section>
${ctaBlock("../")}`;
  writeFile("about/index.html", layout({ title: "About Quick Solution Vehicles | Birmingham Engine Specialists", description: "About Quick Solution Vehicles Ltd, a Sparkbrook Birmingham garage specialising in engine rebuilds, diagnostics and serious mechanical repair work.", pathname: "/about/", body, extraSchemas: [breadcrumbSchema([["Home", "/"], ["About", "/about/"]])] }));
}

function renderContact() {
  const mapQuery = encodeURIComponent(business.address);
  const body = `${pageHero("Contact Quick Solution Vehicles", "Call, email or visit the workshop in Sparkbrook, Birmingham.", "Use the contact form for diagnostics, engine rebuilds, timing chains, MOT failure repairs, trade work or recovery enquiries.")}
<section class="section contact-grid"><div class="contact-card"><p class="section-kicker">Workshop details</p><h2>${business.name}</h2><address>${business.streetAddress}<br>${business.locality}<br>${business.city}<br>${business.postcode}<br>${business.country}</address><ul class="contact-list"><li>Primary phone: <a href="tel:${business.primaryTel}">${business.primaryPhone}</a></li><li>Email: <a href="mailto:${business.email}">${business.email}</a></li><li>Hours: ${business.hours}</li></ul><div class="contact-actions"><a class="button button-primary" href="tel:${business.primaryTel}">Call now</a><a class="button button-light" href="mailto:${business.email}?subject=Quick%20Solution%20Vehicles%20enquiry">Email us</a></div></div><div class="contact-panel"><h2>Enquiry form</h2><p>Include the vehicle registration, engine, symptoms, warning lights and whether the car runs.</p><iframe class="form-frame" src="https://form.jotform.com/250505154565050" loading="lazy" title="Quick Solution Vehicles booking form"></iframe></div></section>
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Directions</p><h2>Find us in Sparkbrook, Birmingham B11.</h2></div><a class="button button-dark" href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener">Open directions</a></div><iframe class="map-frame" title="Map for Quick Solution Vehicles" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${mapQuery}&output=embed"></iframe></section>`;
  writeFile("contact/index.html", layout({ title: "Contact Quick Solution Vehicles | Sparkbrook Birmingham B11", description: `Contact Quick Solution Vehicles at ${business.address}. Call ${business.primaryPhone} or email ${business.email} for engine rebuilds, diagnostics and serious mechanical repairs.`, pathname: "/contact/", body, extraSchemas: [breadcrumbSchema([["Home", "/"], ["Contact", "/contact/"]])] }));
}

function renderReviews() {
  const reviews = JSON.parse(fs.readFileSync(path.join(root, "content/reviews.json"), "utf8"));
  const verified = reviews.reviews.filter((review) => review.status === "verified");
  const body = `${pageHero("Reviews", "5-star rated on Google.", "Quick Solution Vehicles is 5-star rated on Google. Individual customer reviews are shown on this page only after the text has been checked against the original listing.")}
<section class="section reviews"><div class="review-image"><img src="${garageImage}" alt="Quick Solution Vehicles workshop exterior" loading="lazy"></div><div class="reviews-copy"><p class="section-kicker">Customer feedback</p><h2>Check the latest reviews on Google.</h2><p>For the latest customer feedback, use the Google profile link. Individual review text is shown here only after it has been checked against the original listing.</p><a class="button button-dark" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + " " + business.address)}" target="_blank" rel="noopener">View Google profile</a></div></section>
${verified.length ? `<section class="section section-muted"><div class="review-grid">${verified.map((review) => `<article class="review-card"><h3>${esc(review.author)}</h3><p>${esc(review.text)}</p></article>`).join("")}</div></section>` : ""}
${ctaBlock("../")}`;
  writeFile("testimonials/index.html", layout({ title: "Reviews | Quick Solution Vehicles Birmingham", description: "Quick Solution Vehicles is 5-star rated on Google. Check the Google profile for the latest customer feedback.", pathname: "/testimonials/", body, extraSchemas: [breadcrumbSchema([["Home", "/"], ["Reviews", "/testimonials/"]])] }));
}

function parseBlogPost(file) {
  const raw = fs.readFileSync(file, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter: ${file}`);
  const data = {};
  match[1].split(/\n/).forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
    if (value === "true") value = true;
    if (value === "false") value = false;
    data[key] = value;
  });
  return { ...data, body: match[2].trim() };
}

function renderMarkdown(markdown) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => {
      if (block.startsWith("## ")) return `<h2>${esc(block.slice(3))}</h2>`;
      return `<p>${esc(block)}</p>`;
    })
    .join("\n");
}

function renderBlog() {
  const dir = path.join(root, "content/blog");
  const posts = fs.existsSync(dir) ? fs.readdirSync(dir).filter((file) => file.endsWith(".md")).map((file) => parseBlogPost(path.join(dir, file))) : [];
  const live = posts.filter((post) => !post.draft);
  const body = `${pageHero("Blog", "Practical engine and repair advice.", "Long-form articles will be published here once they are reviewed for accuracy and usefulness.")}
<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Latest posts</p><h2>${live.length ? "Customer-focused repair guidance." : "No published posts yet."}</h2></div></div>${live.length ? `<div class="blog-grid">${live.map((post) => blogCard(post, "../")).join("")}</div>` : `<p class="wide-copy">Practical repair articles will appear here when they are ready for customers.</p>`}</section>
${ctaBlock("../")}`;
  writeFile("blog/index.html", layout({ title: "Blog | Quick Solution Vehicles", description: "Practical engine rebuild, diagnostics and mechanical repair advice from Quick Solution Vehicles in Birmingham.", pathname: "/blog/", body, extraSchemas: [breadcrumbSchema([["Home", "/"], ["Blog", "/blog/"]])] }));
  live.forEach((post) => {
    const postBody = `${pageHero(post.category, post.title, post.description)}
<article class="section article-body">${renderMarkdown(post.body)}</article>${ctaBlock("../../")}`;
    writeFile(`blog/${post.slug}/index.html`, layout({ title: `${post.title} | Quick Solution Vehicles`, description: post.description, pathname: `/blog/${post.slug}/`, type: "article", body: postBody, extraSchemas: [breadcrumbSchema([["Home", "/"], ["Blog", "/blog/"], [post.title, `/blog/${post.slug}/`]]), { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, dateModified: today, author: { "@type": "Organization", name: business.name }, publisher: { "@id": `${siteUrl}/#business` }, mainEntityOfPage: urlFor(`/blog/${post.slug}/`) }] }));
  });
}

function blogCard(post, prefix) {
  return `<article class="blog-card"><p class="section-kicker">${esc(post.category)}</p><h3><a href="${prefix}blog/${post.slug}/">${esc(post.title)}</a></h3><p>${esc(post.description)}</p><time datetime="${post.date}">${post.date}</time></article>`;
}

function renderStaticFiles() {
  const pages = [
    ["/", "1.0"],
    ["/services/", "0.9"],
    ...allServices.map((service) => [`/services/${service.slug}/`, "0.85"]),
    ["/blog/", "0.7"],
    ["/about/", "0.7"],
    ["/testimonials/", "0.7"],
    ["/contact/", "0.9"]
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([pathname, priority]) => `  <url><loc>${urlFor(pathname)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`).join("\n")}\n</urlset>\n`;
  writeFile("sitemap.xml", xml);
  writeFile("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
}

renderHome();
renderServicesIndex();
generalServices.forEach(renderGeneralService);
specialistServices.forEach(renderSpecialist);
renderAbout();
renderContact();
renderReviews();
renderBlog();
renderStaticFiles();

console.log("Generated Quick Solution Vehicles static site.");
