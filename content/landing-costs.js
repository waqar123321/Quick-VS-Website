const startingPrices = "Starting prices. Final price agreed in writing before work.";
const repairWarranty = "6 months or 10,000 miles, whichever comes first";
const usedEngineWarranty = "3 months or 3,000 miles, whichever comes first";

const timingChain = [
  ["VW/Audi 1.2 & 1.4 TSI", "549"],
  ["VW/Audi 1.8 & 2.0 TSI/TFSI", "795"],
  ["BMW N47 2.0 diesel", "1,195"],
  ["JLR Ingenium 2.0 diesel", "1,495"]
];
const cambelt = [
  ["Small petrol engines, cambelt & water pump", "299"],
  ["VW/Audi 1.6 & 2.0 TDI, cambelt & water pump", "399"]
];
const clutch = [["Clutch kit fitted (small cars)", "449"]];
const usedEngine = [["Used engine supplied & fitted", "1,395", "For common smaller engines. Larger diesels quoted by registration."]];

const timingCostFaq = [
  "How much does a timing chain replacement cost?",
  timingChain.map(([name, price]) => name + " from £" + price).join(". ") +
    ". BMW N47 and JLR Ingenium chains sit at the back of the engine. The engine has to come out to reach the chain, which is why those jobs cost more."
];
const replacementCostFaq = [
  "How much does an engine replacement cost?",
  "A used engine supplied and fitted starts from £" + usedEngine[0][1] +
    " for common smaller engines. Send your registration for a quote on a larger diesel. A used replacement carries a warranty of " + usedEngineWarranty + "."
];

function priceCards(cards, esc) {
  return '<div class="wet-prices">' + cards.map(({name, price, label, detail, action = ""}) =>
    '<article class="wet-price-card">' + (label ? '<p class="wet-label">'+esc(label)+'</p>' : '') +
    '<h3>'+esc(name)+'</h3>' + (detail ? '<p class="wet-makes">'+esc(detail)+'</p>' : '') +
    '<p class="wet-price"><span>From</span> '+esc(price)+'</p>'+action+'</article>'
  ).join("") + '</div>';
}

function costSection(title, rows, esc, { intro, quote, warranty = repairWarranty, after = "" } = {}) {
  return '<section class="section service-detail landing-cost"><h2>'+esc(title)+'</h2>' +
    (intro ? '<p>'+esc(intro)+'</p>' : '') +
    priceCards(rows.map(([name, price, detail]) => ({name, price:"£"+price, detail})), esc) +
    '<p class="cost-disclaimer">'+startingPrices+'</p>' +
    (quote ? '<p>'+esc(quote)+'</p>' : '') + '<p>Warranty: '+warranty+'.</p>'+after+'</section>';
}

module.exports = { startingPrices, repairWarranty, usedEngineWarranty, timingChain, cambelt, clutch, usedEngine, timingCostFaq, replacementCostFaq, priceCards, costSection };
