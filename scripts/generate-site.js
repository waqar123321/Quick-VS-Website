const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const today = new Date().toISOString().slice(0, 10);
const siteUrl = "https://quickvs.com";
const heroImage =
  "https://cdn.tagbox.io/assets/679926e59dc9490011086236/d0e23379-97e2-4982-a2de-b61b831ba496---ak-2.jpg";
const garageImage =
  "https://cdn.tagbox.io/assets/679926e59dc9490011086236/da18ca47-44e6-423e-9474-9ec075bdcb47---ak-1.jpg";

const business = {
  legalName: "Quick Solution Vehicles LTD",
  name: "Quick Solution Vehicles",
  address: "56a Stratford Street North, Sparkbrook, Birmingham, B11 1BP, United Kingdom",
  streetAddress: "56a Stratford Street North",
  locality: "Sparkbrook",
  city: "Birmingham",
  postcode: "B11 1BP",
  country: "United Kingdom",
  primaryPhone: "07522 179040",
  primaryTel: "+447522179040",
  email: "info@quickvs.com",
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
  ["Home", "/"], ["Services", "/services/"],
  ["All-Makes Rebuilds", "/services/all-makes-engine-rebuilds/"],
  ["Performance Rebuilds", "/services/performance-engine-rebuilds/"],
  ["About", "/about/"], ["Reviews", "/testimonials/"], ["Contact", "/contact/"]
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
    title: "Engine Rebuild Process & Repair Options in Birmingham",
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
    desc: "JLR 2.0 Ingenium AJ200D/AJ200P engine rebuilds in Birmingham for timing chain, balance shaft, turbo and oil dilution faults. Call 07522 179040.",
    keyword: "JLR Ingenium engine rebuild",
    opening: "JLR Ingenium timing chain, balance shaft, turbo & oil dilution faults need an engine-specific diagnosis. We assess AJ200D diesel and AJ200P petrol engines, explain the damage and agree a repair or rebuild route before major work proceeds.",
    why: "The 2.0 Ingenium uses timing chains, not a wet timing belt. The diesel's rear-mounted chain, lubrication condition and associated internal components need assessment around the actual symptoms.",
    symptoms: ["Timing chain rattle", "Balance-shaft noise or whine", "Oil warning or rising oil level", "Turbo-related smoke or loss of power", "Non-start or internal damage"],
    process: ["Identify the engine and failure history", "Timing, lubrication and mechanical assessment", "Strip-down and damage confirmation where needed", "Agree parts and machining before rebuilding", "Final lubrication, cooling and running checks"],
    parts: "Components are selected for the fitted engine and the confirmed damage, with OEM-grade parts where suitable.",
    faqs: [
      ["Do Ingenium engines use wet timing belts?", "No. The 2.0 AJ200D diesel and AJ200P petrol are chain-driven. Wet-belt enquiries relate to other engine families."],
      ["Is the 2.2 TD4 an Ingenium engine?", "No. The older 2.2 TD4/SD4 is a separate family. We assess those engines through our all-makes rebuild service."],
      ["Can oil dilution damage the engine?", "Fuel dilution can compromise lubrication. The cause and any associated damage need assessment."],
      ["How long does an Ingenium rebuild take?", `Typical rebuild timeframe is ${business.timeframe}.`],
      ["What warranty is included?", `Engine rebuilds include ${business.warranty}.`]
    ],
    related: ["/services/all-makes-engine-rebuilds/", "/services/range-rover-engine-rebuild/", "/services/timing-chain-replacement/", "/services/dpf-egr-emissions/"]
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
    symptoms: ["Engine knock or rattle", "Oil pressure warning", "Smoke or loss of power", "Timing chain or lubrication concern", "Non-running vehicle"],
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
    title: "Engine Rebuild Workshop in Sparkbrook, Birmingham",
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


const landingPages = require("../content/landing-pages");
const serviceDetails = require("../content/service-details");
const guides = require("../content/guides");
const allServices = [...landingPages, ...specialistServices, ...generalServices];
const seoMetadata = require("../content/seo-metadata");
for (const service of allServices) {
  const meta = seoMetadata[service.slug];
  if (meta) { service.metaTitle = meta[0]; service.metaDescription = meta[1]; }
}
const rebuildSlugs = new Set(allServices.filter(s => /rebuild/.test(s.slug)).map(s => s.slug));
const reviews = JSON.parse(fs.readFileSync(path.join(root, "content/reviews.json"), "utf8")).reviews;
const datesFile = path.join(root, "content/page-dates.json");
const dates = fs.existsSync(datesFile) ? JSON.parse(fs.readFileSync(datesFile, "utf8")) : {};
const sitePages = [];
const whatsapp = "https://wa.me/447522179040?text=Hi%20Quick%20Solution%20Vehicles,%20my%20reg%20is%20";
const maps = "https://maps.google.com/maps?cid=2157141621358514254";
const measurementId = "G-GEJR9VMEYV";

function esc(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function urlFor(pathname) { return siteUrl + pathname; }
function jsonLd(value) { return '<script type="application/ld+json">\n' + JSON.stringify(value, null, 2).replace(/</g, "\\u003c") + "\n</script>"; }
function writePage(pathname, content) {
  const file = path.join(root, pathname.slice(1), "index.html");
  const previous = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (previous !== content || !dates[pathname]) dates[pathname] = today;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  sitePages.push(pathname);
}
function businessSchema(withReviews = false) {
  const schema = {
    "@context": "https://schema.org", "@type": "AutoRepair", "@id": urlFor("/#business"),
    name: business.legalName, legalName: business.legalName, url: urlFor("/"),
    logo: urlFor("/assets/qsv-logo.svg"), image: heroImage, telephone: business.primaryTel,
    email: business.email, address: { "@type": "PostalAddress", streetAddress: business.streetAddress,
      addressLocality: "Birmingham", addressRegion: "West Midlands", postalCode: business.postcode, addressCountry: "GB" },
    geo: { "@type": "GeoCoordinates", latitude: 52.4686661, longitude: -1.877204 },
    hasMap: maps, sameAs: [maps], paymentAccepted: ["Debit Card", "Contactless / Mobile NFC", "Bank Transfer"],
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "18:00" }],
    areaServed: [...areas, "United Kingdom"],
    identifier: { "@type": "PropertyValue", propertyID: "Companies House", value: business.companiesHouse }
  };
  if (withReviews) schema.review = reviews.map(r => ({ "@type": "Review", author: { "@type": "Person", name: r.author },
    reviewBody: r.text, reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5, worstRating: 1 } }));
  return schema;
}
function breadcrumbSchema(pathname, title) {
  const crumbs = [["Home","/"]];
  if (pathname.startsWith("/services/") && pathname !== "/services/") crumbs.push(["Services","/services/"]);
  if (pathname.startsWith("/blog/") && pathname !== "/blog/") crumbs.push(["Repair advice","/blog/"]);
  if (pathname !== "/") crumbs.push([title,pathname]);
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map(([name,url], i) => ({
    "@type": "ListItem", position: i+1, name, item: urlFor(url) })) };
}
function faqSchema(faqs) { return { "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map(([name,text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }; }
function serviceSchema(service) { return { "@context": "https://schema.org", "@type": "Service",
  "@id": urlFor("/services/" + service.slug + "/#service"), url: urlFor("/services/" + service.slug + "/"),
  name: service.title, serviceType: service.keyword || service.title, provider: { "@id": urlFor("/#business") },
  areaServed: [...areas,"United Kingdom"] }; }
function analyticsSnippet() {
  return '<script>\nwindow.dataLayer=window.dataLayer||[];\nfunction gtag(){dataLayer.push(arguments);}\n' +
    'gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});\n' +
    'window.qsvAnalyticsId="' + measurementId + '";\n</script>';
}
function header(pathname) {
  return '<a class="skip-link" href="#main-content">Skip to content</a><header class="site-header"><div class="header-inner">' +
    '<a class="brand" href="/" aria-label="Quick Solution Vehicles home"><img class="brand-logo" src="/assets/qsv-logo.svg" width="94" height="44" alt="Quick Solution Vehicles logo"><span><strong>Quick Solution Vehicles</strong><small>Engine rebuild specialists</small></span></a>' +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle aria-label="Open navigation"><span></span><span></span><span></span></button>' +
    '<nav id="site-nav" class="site-nav" data-nav>' + nav.map(([label,href]) => '<a href="'+href+'"'+(href===pathname?' aria-current="page"':'')+'>'+label+'</a>').join("") +
    '</nav><div class="header-actions"><a class="button button-light" data-contact-location="header" href="tel:'+business.primaryTel+'">'+business.primaryPhone+'</a></div></div></header>';
}
function contactButtons(location = "content") {
  return '<div class="contact-actions"><a class="button button-primary" data-contact-location="'+location+'" href="tel:'+business.primaryTel+'">Call Workshop: '+business.primaryPhone+'</a>' +
    '<a class="button button-whatsapp" data-contact-location="'+location+'" href="'+whatsapp+'">WhatsApp Reg &amp; Fault</a></div>';
}
function footer() {
  const engines = allServices.filter(s=>rebuildSlugs.has(s.slug));
  const other = allServices.filter(s=>!rebuildSlugs.has(s.slug));
  const links = list => list.map(s=>'<li><a href="/services/'+s.slug+'/">'+esc(s.title.replace(/(?: in|,) Birmingham| Birmingham$/,""))+'</a></li>').join("");
  return '<footer class="site-footer"><div class="footer-main"><div class="footer-grid">' +
    '<div class="footer-brand"><img class="footer-logo" width="150" height="70" src="/assets/qsv-logo.svg" alt="Quick Solution Vehicles logo"><h2 class="footer-title">'+business.legalName+'</h2><p>Engine rebuilds across all makes, alongside general mechanical repairs in Sparkbrook, Birmingham.</p><p>Company No. '+business.companiesHouse+'</p><ul class="footer-contact"><li><a data-contact-location="footer" href="tel:'+business.primaryTel+'">'+business.primaryPhone+'</a></li><li><a href="mailto:'+business.email+'">'+business.email+'</a></li><li>'+business.address+'</li><li>'+business.hours+'</li></ul><a class="text-link" href="'+maps+'">Google Maps &amp; directions</a></div>' +
    '<div class="footer-column"><h3>Engine Rebuilds</h3><ul>'+links(engines)+'</ul></div>' +
    '<div class="footer-column"><h3>Mechanical Services</h3><ul>'+links(other)+'</ul></div>' +
    '<div class="footer-column"><h3>Workshop</h3><ul>'+nav.map(([label,href])=>'<li><a href="'+href+'">'+label+'</a></li>').join("")+'<li><a href="/blog/">Repair advice</a></li>'+guides.map(g=>'<li><a href="/blog/'+g.slug+'/">'+esc(g.title)+'</a></li>').join("")+'<li><a href="/privacy/">Privacy &amp; cookies</a></li><li><button class="cookie-settings" type="button" data-cookie-settings>Cookie settings</button></li></ul><h3>Payment</h3><p>Debit cards, contactless / mobile NFC and bank transfer.</p><p>Engine rebuild warranty: 3 months or 10,000 miles, parts and labour.</p></div>' +
    '</div></div><div class="footer-bottom"><p>&copy; <span data-year>2026</span> '+business.legalName+'</p><a href="/sitemap.xml">Sitemap</a></div></footer>' +
    '<div class="mobile-call-bar"><a data-contact-location="mobile_bar" href="tel:'+business.primaryTel+'"><span aria-hidden="true">📞 </span><span>Call Workshop: <span class="phone-number">'+business.primaryPhone+'</span></span></a><a data-contact-location="mobile_bar" class="mobile-whatsapp" href="'+whatsapp+'"><span aria-hidden="true">💬 </span>WhatsApp Reg &amp; Fault</a></div>' +
    '<section class="consent-panel" data-consent-panel hidden aria-labelledby="consent-title"><h2 id="consent-title">Optional analytics cookies</h2><p>Allow analytics to help us understand which pages and contact buttons are useful. You can reject these cookies and still use every workshop contact option. <a href="/privacy/">Privacy &amp; cookies</a></p><div class="consent-actions"><button type="button" data-consent="accept">Accept analytics</button><button type="button" data-consent="reject">Reject analytics</button></div></section>';
}
function layout({ title, description, pathname, body, faqs = [], service, withReviews = false, noindex = false, article }) {
  const schemas = [businessSchema(withReviews), breadcrumbSchema(pathname, title)];
  if (faqs.length) schemas.push(faqSchema(faqs));
  if (service) schemas.push(serviceSchema(service));
  if (article) schemas.push({"@context":"https://schema.org","@type":"Article","@id":urlFor(pathname+"#article"),"headline":article.title,"description":article.description,"mainEntityOfPage":urlFor(pathname),"datePublished":article.published,"dateModified":article.updated,"author":{"@type":"Organization","name":business.legalName,"url":urlFor("/about/"),"logo":urlFor("/assets/qsv-logo.svg")},"publisher":{"@id":urlFor("/#business")}});
  return '<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n' + analyticsSnippet() +
    '\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>'+esc(title)+'</title>\n<meta name="description" content="'+esc(description)+'">\n' +
    '<meta name="robots" content="'+(noindex?'noindex, follow':'index, follow, max-image-preview:large')+'">\n<meta name="theme-color" content="#111827">\n' +
    '<link rel="canonical" href="'+urlFor(pathname)+'">\n<meta property="og:type" content="website">\n<meta property="og:title" content="'+esc(title)+'">\n<meta property="og:description" content="'+esc(description)+'">\n<meta property="og:url" content="'+urlFor(pathname)+'">\n<meta property="og:image" content="'+heroImage+'">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="'+esc(title)+'">\n<meta name="twitter:description" content="'+esc(description)+'">\n<meta name="twitter:image" content="'+heroImage+'">\n<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" sizes="any">\n<link rel="stylesheet" href="/styles.css?v=20261014-2">\n<script defer src="/script.js"></script>\n' +
    schemas.map(jsonLd).join("\n")+'\n</head>\n<body>\n'+header(pathname)+'\n<main id="main-content">'+body+'</main>\n'+footer()+'\n</body>\n</html>\n';
}
function hero(kicker, title, copy) { return '<section class="page-hero"><div class="page-hero-content"><p class="eyebrow">'+esc(kicker)+'</p><h1>'+esc(title)+'</h1><p class="page-hero-copy">'+esc(copy)+'</p>'+contactButtons("hero")+'<p class="hero-reassurance">Mon–Sat 10:00–18:00 · Sparkbrook, Birmingham B11 · Tell us whether your vehicle runs</p></div></section>'; }
function cta() { return '<section class="section cta-band"><div><p class="section-kicker">Speak to the workshop</p><h2>Send your reg and tell us what happened.</h2><p>Include the make/model, mileage, fault symptoms and whether it runs. For a non-runner needing recovery, contact us before arranging delivery.</p><p>Chain rattle · Knocking · Non-start · Oil warning · Overheating</p></div><div class="cta-actions">'+contactButtons("cta")+'<a href="mailto:'+business.email+'">Email '+business.email+'</a></div></section>'; }
function sections(items) { return items.map(([title,copy],i)=>'<section class="section service-detail '+(i%2?'section-muted':'')+'"><h2>'+esc(title)+'</h2><div class="detail-copy">'+copy.split("\n\n").map(p=>'<p>'+esc(p)+'</p>').join("")+'</div></section>').join(""); }
function faqsHtml(items) { return items.length?'<section class="section"><p class="section-kicker">Workshop FAQs</p><h2>Before you book</h2><div class="faq-list">'+items.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join("")+'</div></section>':""; }
function reviewSection() { return '<section class="section section-muted"><div class="section-heading"><div><p class="section-kicker">Customer feedback</p><h2>Five-star Google reviews</h2></div><a class="text-link" href="'+maps+'">View Google profile</a></div><div class="review-grid">'+reviews.map(r=>'<figure class="review-card"><figcaption><strong>'+esc(r.author)+'</strong><span class="review-stars" aria-label="5 out of 5 stars">★★★★★</span></figcaption><blockquote><p>'+esc(r.text)+'</p></blockquote></figure>').join("")+'</div></section>'; }
function cards(list) { return '<div class="service-grid">'+list.map(s=>'<article class="service-card"><a href="/services/'+s.slug+'/"><span class="service-icon">Workshop service</span><h3>'+esc(s.title)+'</h3><p>'+esc(s.short||s.desc)+'</p></a></article>').join("")+'</div>'; }
function related(service) {
  const urls = [...new Set([...(service.related||[]), "/services/all-makes-engine-rebuilds/", "/services/performance-engine-rebuilds/"])].filter(u=>u!=="/services/"+service.slug+"/");
  return '<section class="section section-muted"><p class="section-kicker">Related workshop services</p><h2>Choose the right repair route</h2><div class="link-grid">'+urls.map(u=>{
    const match=allServices.find(s=>u==="/services/"+s.slug+"/");
    return '<a class="link-card" href="'+u+'">'+esc(match?match.title:"Contact the workshop")+'</a>';
  }).join("")+'<a class="link-card" href="/services/">All mechanical services</a></div></section>';
}
function renderService(service) {
  const extra = serviceDetails[service.slug] || { sections: [], faqs: [] };
  const isRebuild = rebuildSlugs.has(service.slug);
  const faqs = [...(service.faqs||[]), ...extra.faqs];
  let items = [...(service.sections||[]), ...extra.sections];
  if (service.why) items.unshift(["Diagnosis before major work",service.why]);
  let body='<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><a href="/services/">Services</a><span aria-hidden="true"> / </span><span aria-current="page">'+esc(service.title)+'</span></nav>'+hero(isRebuild?"Engine rebuild workshop":"Mechanical repairs Birmingham",service.title,service.heroIntro||service.opening||service.intro);
  if(isRebuild) body+='<section class="trust-strip" aria-label="Engine rebuild terms"><span>3 months or 10,000 miles · parts and labour</span><span>Typical turnaround 1–3 weeks</span><span>Parts availability and internal damage affect timing</span></section>';
  if(service.heroIntro) body+=sections([["Discuss your engine rebuild",service.opening]]);
  if(service.points) body+='<section class="section intro-grid"><div><h2>'+esc(service.short)+'</h2></div><div class="intro-copy"><p>'+esc(service.desc)+'</p><ul class="check-list">'+service.points.map(p=>'<li>'+esc(p)+'</li>').join("")+'</ul></div></section>';
  body+=sections(items);
  if(isRebuild) body+='<section class="section service-detail"><h2>Diagnosis and timing repair options</h2><div class="detail-copy"><p>When the extent of damage is unclear, start with <a href="/services/engine-diagnostics/">engine diagnostics and mechanical fault finding</a> before agreeing strip-down work. For chain-driven engines with viable repair options, read about <a href="/services/timing-chain-replacement/">timing chain assessment and replacement</a>. A timing repair and a full rebuild require different scopes; the fitted engine and inspection findings determine the route.</p></div></section>';
  if(service.symptoms) body+='<section class="section section-muted"><p class="section-kicker">Symptoms to report</p><h2>What has changed?</h2><ul class="check-list">'+service.symptoms.map(s=>'<li>'+esc(s)+'</li>').join("")+'</ul><p>Describe when the symptom started, whether warning lights appeared and whether the engine still runs.</p></section>';
  if(service.process) body+='<section class="section"><h2>From assessment to handover</h2><ol class="number-list">'+service.process.map(s=>'<li>'+esc(s)+'</li>').join("")+'</ol><p>'+esc(service.parts)+'</p></section>';
  if(isRebuild) body+='<section class="section assurance-strip"><p><strong>Warranty:</strong> '+business.warranty+'. <strong>Typical turnaround:</strong> '+business.timeframe+'.</p><p>Costs are confirmed after inspection and agreement of the repair scope. Recovery for suitable engine work can be arranged at customer cost.</p></section>'+reviewSection();
  body+=faqsHtml(faqs)+related(service);
  if(isRebuild||service.slug==="timing-chain-replacement") body+=guideCards();
  body+=cta();
  const pathname="/services/"+service.slug+"/";
  writePage(pathname,layout({title:service.metaTitle||service.title+" | Quick Solution Vehicles",description:service.metaDescription||service.desc,pathname,body,faqs,service,withReviews:isRebuild}));
}
const homeFaqs = [
  ["Do you rebuild engines across all makes?","Yes. We handle petrol, diesel, performance and commercial van engine rebuild enquiries across all makes and engine ranges."],
  ["Do Ingenium engines use wet timing belts?","No. JLR 2.0 AJ200D/AJ200P engines use timing chains. We assess timing chain, balance shaft, turbo and oil dilution faults."],
  ["Which engines do you assess for wet-belt concerns?","Wet-belt-equipped Ford 1.0 EcoBoost, Ford 2.0 EcoBlue and earlier 1.2 PureTech variants. Other versions, including Ford 1.5 EcoBoost, are identified before the timing design is specified."],
  ["How long does an engine rebuild take?","Typically 1–3 weeks depending on parts availability and internal damage."],
  ["What warranty is included?","Engine rebuilds include 3 months or 10,000 miles on parts and labour."]
];
function renderHome() {
  const body=hero("Engine rebuilds · General mechanical repairs","All-makes engine rebuilds in Birmingham.","Petrol, diesel, performance cars and commercial vans. Quick Solution Vehicles LTD assesses engine failures and handles general mechanical repairs at our Sparkbrook workshop. Call for advice or WhatsApp your registration, symptoms and running status.")+
    '<section class="trust-strip" aria-label="Workshop details"><span>3 months or 10,000 miles rebuild warranty</span><span>Typical rebuild turnaround 1–3 weeks</span><span>Monday–Saturday 10:00–18:00</span></section>'+
    '<section class="section"><p class="section-kicker">Engine repair enquiries</p><h2>Everyday engines, commercial vans and performance cars</h2>'+cards(landingPages)+'</section>'+
    sections([["JLR Ingenium timing chain, balance shaft, turbo & oil dilution faults","The 2.0 AJ200D diesel and AJ200P petrol use timing chains. We identify the engine and assess timing, lubrication and associated damage before agreeing a repair route. Our JLR and Range Rover pages explain the relevant engine coverage."],["Wet Belt Replacement & Engine Recovery","We assess wet-belt-equipped Ford 1.0 EcoBoost, Ford 2.0 EcoBlue Transit/Transit Custom and relevant Ranger engines, and earlier Peugeot/Citroën/Vauxhall 1.2 PureTech engines. Ford 1.5 EcoBoost enquiries are welcome too, with the actual timing design confirmed first. Oil warnings, belt debris, knocking or timing failure may require internal assessment as well as belt replacement."]])+
    '<section class="section section-muted"><p class="section-kicker">Specialist engine work</p><h2>Explore your engine repair options</h2>'+cards(specialistServices)+'</section>'+
    '<section class="section"><p class="section-kicker">General mechanical repairs</p><h2>Diagnostics, timing, brakes and more</h2>'+cards(generalServices)+'</section>'+
    reviewSection()+faqsHtml(homeFaqs)+
    '<section class="section local-seo"><p class="section-kicker">Areas we cover</p><h2>Sparkbrook workshop, wider Birmingham customers</h2><p>We support drivers across Birmingham, Solihull, Dudley, Walsall, Sandwell, Coventry, Wolverhampton and West Bromwich. For suitable non-running cars and engine work, recovery from further afield can be discussed at customer cost.</p><p>'+business.address+'</p><a class="text-link" href="'+maps+'">Find the workshop on Google Maps</a></section>'+cta();
  writePage("/",layout({title:"Engine Rebuilds Birmingham | All Makes | QuickVS",description:"All-makes petrol, diesel, performance and van engine rebuilds plus mechanical repairs in Birmingham B11. Call 07522 179040 or WhatsApp your reg and fault.",pathname:"/",body:body+guideCards(),faqs:homeFaqs,withReviews:true}));
}
function renderServices() {
  const body=hero("Workshop services","Engine rebuilds and mechanical repairs in Birmingham.","Choose the page that matches your engine or symptoms, then call or WhatsApp the workshop to discuss assessment.")+
    '<section class="section"><h2>All-makes and performance engines</h2>'+cards(landingPages)+'</section>'+
    '<section class="section section-muted"><h2>Engine families and rebuild planning</h2>'+cards(specialistServices)+'</section>'+
    '<section class="section"><h2>General mechanical services</h2>'+cards(generalServices)+'</section>'+cta();
  writePage("/services/",layout({title:"Car Repairs & Engine Rebuilds Birmingham | QuickVS",description:"Engine rebuilds, diagnostics, timing chains and belts, clutches, brakes, servicing and mechanical MOT repairs in Sparkbrook, Birmingham.",pathname:"/services/",body}));
}
function renderContact() {
  const body=hero("Contact the workshop","Call or WhatsApp your registration and fault.","Talk directly to Quick Solution Vehicles LTD about engine rebuilds, diagnosis and mechanical repairs. Tell us whether the vehicle runs before arranging delivery.")+
    '<section class="section contact-grid"><div class="contact-card"><h2>Workshop details</h2><address>'+business.address+'</address><p><a href="tel:'+business.primaryTel+'">'+business.primaryPhone+'</a><br><a href="mailto:'+business.email+'">'+business.email+'</a></p><p>'+business.hours+'</p><p>Debit cards, contactless / mobile NFC and bank transfer accepted.</p><a class="text-link" href="'+maps+'">Google Maps &amp; directions</a></div><div class="contact-panel"><h2>What to send on WhatsApp</h2><ul class="check-list"><li>Your name and vehicle registration</li><li>Make/model, engine and mileage if known</li><li>Chain rattle, knocking, non-start, oil warning or overheating</li><li>Running status: runs, or non-runner needing recovery</li><li>A short video or photographs where useful</li></ul><p>Do not run a distressed engine just to record the noise. We will discuss the appropriate assessment before major work is agreed.</p>'+contactButtons("contact")+'</div></section>'+cta();
  writePage("/contact/",layout({title:"Contact Quick Solution Vehicles LTD | Birmingham Workshop",description:"Call 07522 179040, WhatsApp your reg and fault, or email info@quickvs.com. Visit 56a Stratford Street North, Sparkbrook, Birmingham B11 1BP.",pathname:"/contact/",body}));
}
function renderAbout() {
  const body=hero("Quick Solution Vehicles LTD","A mechanical workshop in Sparkbrook, Birmingham.","We handle general mechanical repairs alongside engine rebuild enquiries across all makes, models and engine ranges.")+
    sections([["A clear repair decision before major work","Our approach starts with the complaint, the engine or vehicle specification and the evidence from inspection. A warning light does not automatically identify a failed component, and a non-runner does not automatically require another engine. We discuss assessment, findings and the scope before major work proceeds. Engine rebuilds typically take 1–3 weeks depending on parts availability and internal damage, with a 3-month or 10,000-mile parts and labour warranty."],["Visit or contact the workshop",business.address+". We are open Monday–Saturday 10:00–18:00 and closed Sundays. Call "+business.primaryPhone+", WhatsApp your registration and fault, or email "+business.email+". Debit cards, contactless/mobile NFC and bank transfer are accepted. Mechanical MOT failures can be repaired here, with the test and retest handled by a testing station."],["Company details","Quick Solution Vehicles LTD is registered under Company No. 16525397. Our workshop covers petrol and diesel engines, commercial vans and performance vehicles, together with diagnostics, timing, brake, clutch and other mechanical work. Recovery for suitable major engine work can be discussed at customer cost."]])+cta();
  writePage("/about/",layout({title:"About Quick Solution Vehicles LTD | Sparkbrook Birmingham",description:"Quick Solution Vehicles LTD, Company No. 16525397. All-makes engine rebuilds and mechanical repairs at 56a Stratford Street North, Birmingham B11 1BP.",pathname:"/about/",body}));
}
function renderReviews() {
  writePage("/testimonials/",layout({title:"Google Customer Reviews | Quick Solution Vehicles Birmingham",description:"Read customer feedback on SVR, Range Rover and MINI engine rebuilds and mechanical repairs at Quick Solution Vehicles in Birmingham.",pathname:"/testimonials/",withReviews:true,
    body:hero("Customer feedback","Google reviews from workshop customers","Read the customer reviews below and visit our Google profile for the current feedback.")+reviewSection()+cta()}));
}
function guideCards() { return '<section class="section section-muted"><h2>Plan your engine assessment</h2><div class="link-grid">'+guides.map(g=>'<a class="link-card" href="/blog/'+g.slug+'/">'+esc(g.title)+'</a>').join("")+'</div></section>'; }
function renderGuide(article) {
  const pathname="/blog/"+article.slug+"/";
  const body='<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog/">Repair advice</a> / <span aria-current="page">'+esc(article.title)+'</span></nav>'+hero("Workshop guide",article.title,article.intro)+'<section class="section"><p>By Quick Solution Vehicles LTD · Published <time datetime="'+article.published+'">14 October 2026</time></p></section>'+sections(article.sections)+'<section class="section section-muted"><h2>Related repair services</h2>'+cards(allServices.filter(s=>article.services.includes(s.slug)))+'</section>'+guideCards()+cta();
  writePage(pathname,layout({title:article.metaTitle,description:article.description,pathname,body,article}));
}
function renderAdvice() {
  const body=hero("Practical repair advice","Before you drive with an engine fault","The symptoms and the circumstances matter. These checks help you describe the problem to the workshop and plan the right next step.")+
    sections([["Red oil warning, knocking or sudden timing noise","A red oil-pressure warning is different from a routine service reminder. Stop safely and switch the engine off if a serious oil warning or heavy knocking develops. Continuing to run a distressed engine can increase internal damage. An oil level check can provide useful information, but a correct level does not prove that pressure is adequate. Tell the workshop when the warning appeared, whether noise accompanied it and what happened immediately beforehand. Do not repeatedly restart the engine merely to see whether the warning goes away."],["Overheating and coolant loss","A temperature warning, steam or sudden coolant loss calls for a safe stop and assessment. Do not open a hot cooling system. The repair may involve a leak, circulation fault or more extensive damage; overheating alone does not prove that the head gasket is the original cause. Tell us whether the coolant level has been dropping, the heater behaviour changed or another garage recently worked on the cooling system. A pressure test and relevant mechanical checks may be needed before choosing parts or deciding whether internal engine work is required."],["Non-start and fault-code reports","Describe whether the engine turns normally, clicks, cranks unusually quickly or will not turn. Those are different starting points for diagnosis. Keep any existing code report and note whether the fault is intermittent, hot or cold. A stored code identifies a detected condition; the wiring, supply, fuel, timing or mechanical cause still needs checking. Tell us about recent battery, engine or timing work and whether the vehicle stopped while moving. Send the registration and running status before arranging recovery so the initial assessment and access can be discussed."],["Timing chains and wet belts are different designs","BMW N47/N57 and JLR 2.0 Ingenium enquiries often involve timing chains. Wet-belt assessment applies to particular Ford EcoBoost/EcoBlue and earlier PureTech engines. Similar names and engine capacities do not prove that the drive design is the same. A preventative belt or chain job also differs from repairing an engine after timing loss. We identify the fitted engine, consider its maintenance record and assess any associated damage before agreeing the scope. Use the service pages below to read about the relevant repair route."]])+
    '<section class="section section-muted"><h2>Relevant workshop services</h2>'+cards(allServices.filter(s=>["engine-diagnostics","timing-chain-replacement","timing-belt-replacement"].includes(s.slug)))+'</section>'+cta();
  writePage("/blog/",layout({title:"Engine Warning Signs & Repair Advice | QuickVS",description:"Practical guidance on oil warnings, knocking, overheating, non-starts, timing chains and wet belts from Quick Solution Vehicles in Birmingham.",pathname:"/blog/",body:body+guideCards()}));
}
function renderPrivacy() {
  const body=hero("Privacy & cookies","Your enquiries and optional analytics","This page explains the contact information you choose to send and the optional analytics used on this website.")+
    sections([["Workshop enquiries","Quick Solution Vehicles LTD, Company No. 16525397, uses information you provide by phone, email or WhatsApp to respond to your enquiry, assess the work and administer an agreed repair. This can include your name, contact details, vehicle registration and fault description. Relevant information may need to be shared with an agreed recovery provider, parts supplier or warranty provider where necessary for the work. Contact info@quickvs.com about how your enquiry information is handled or to request access, correction or deletion, subject to any applicable record-keeping requirements."],["Optional analytics cookies","If you accept analytics, this site loads Google Analytics 4 to measure page use and contact-button clicks. Analytics is not loaded before you accept. If you reject, workshop contact links continue to work. The site stores your cookie choice in your browser so it can remember it, and you can change it using Cookie settings in the footer. Contact-click events record the contact method and page, not the vehicle details or message text you send to the workshop. Advertising tags are not currently configured."],["External contact services and retention","Opening WhatsApp or Google Maps takes you to a service operated by that provider, whose own privacy terms apply. Your email provider and telephone service also process communications through their systems. We retain enquiry and repair information for as long as needed to handle the work and applicable business records. Avoid sending information that is unnecessary for your vehicle enquiry. You can contact the workshop at 56a Stratford Street North, Sparkbrook, Birmingham B11 1BP, or email info@quickvs.com."]]);
  writePage("/privacy/",layout({title:"Privacy & Cookies | Quick Solution Vehicles LTD",description:"How Quick Solution Vehicles LTD handles workshop enquiries and optional website analytics. Contact info@quickvs.com.",pathname:"/privacy/",body}));
}
renderHome(); renderServices(); allServices.forEach(renderService); renderContact(); renderAbout(); renderReviews(); renderAdvice(); guides.forEach(renderGuide); renderPrivacy();
fs.writeFileSync(datesFile, JSON.stringify(dates, null, 2)+"\n");
fs.writeFileSync(path.join(root,"sitemap.xml"),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+sitePages.map(p=>'  <url><loc>'+urlFor(p)+'</loc><lastmod>'+dates[p]+'</lastmod></url>').join("\n")+'\n</urlset>\n');
fs.writeFileSync(path.join(root,"robots.txt"),"User-agent: *\nAllow: /\n\nSitemap: https://quickvs.com/sitemap.xml\n");
fs.writeFileSync(path.join(root,".nojekyll"),"");
const notFoundBody=hero("Page not found","We couldn't find that page.","Use the services list or speak directly to the workshop about your vehicle.")+cta();
fs.writeFileSync(path.join(root,"404.html"),layout({title:"Page Not Found | Quick Solution Vehicles",description:"Find workshop services or contact Quick Solution Vehicles in Birmingham.",pathname:"/404.html",body:notFoundBody,noindex:true}));
console.log("Generated "+sitePages.length+" canonical pages and a dedicated 404 page.");

