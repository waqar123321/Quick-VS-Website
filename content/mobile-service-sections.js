// Keep the original sections intact. The native disclosure is a phone-only view.
const paths = new Set([
  '/services/wet-belt-replacement/',
  '/services/timing-chain-replacement/',
  '/services/engine-rebuild-birmingham/'
]);

function collapsibleSections(body) {
  const stack = [], sections = [];
  for (const match of body.matchAll(/<section\b[^>]*>|<\/section>/g)) {
    if (match[0].startsWith('</')) {
      const opening = stack.pop();
      if (!opening) throw new Error('Unbalanced service section');
      sections.push({ start: opening.index, end: match.index + match[0].length, tag: opening[0] });
    } else stack.push(match);
  }
  if (stack.length) throw new Error('Unclosed service section');
  const selected = sections.filter(({ start, end, tag }) => {
    const html = body.slice(start, end);
    const heading = html.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)?.[1];
    if (!heading || /what.{0,8}included/i.test(heading)) return false;
    if (/\blanding-cost\b|\bprice-table\b|\bwet-prices\b|\bfaq-list\b|\breview-grid\b/.test(html)) return false;
    return /\bservice-detail\b/.test(tag) || /id="wet-(?:work|engines)"/.test(tag) ||
      ['What has changed?', 'From assessment to handover'].includes(heading);
  });
  // A selected outer section owns any nested sections.
  const outer = selected.filter(s => !selected.some(parent => parent !== s && parent.start < s.start && parent.end > s.end));
  for (const { start, end, tag } of outer.sort((a, b) => b.start - a.start)) {
    const original = body.slice(start, end);
    const [, headingTag, heading] = original.match(/(<h2\b[^>]*>)([\s\S]*?)<\/h2>/);
    // Keep the fragment on a box that stays visible even when the section is closed.
    const fragment = (headingTag.match(/ id="[^"]+"/) || tag.match(/ id="[^"]+"/))?.[0] || '';
    const section = (fragment ? original.replace(fragment, '') : original).replace('<h2', '<h2 data-mobile-heading');
    const anchor = fragment ? fragment + ' tabindex="-1"' : '';
    body = body.slice(0, start) + '<details class="mobile-explanation" open'+anchor+'><summary><span>'+heading+'</span></summary><div class="mobile-section-content">'+section+'</div></details>' + body.slice(end);
  }
  return body.replaceAll('href="#quote-bottom"', 'href="#quote"');
}

function quoteReturn() {
  // Retain the old fragment target for existing inbound links.
  return '<div class="section quote-return" id="quote-bottom"><a class="button button-primary" data-contact-location="quote_return" href="#quote">Get a free quote</a></div>';
}

module.exports = { paths, collapsibleSections, quoteReturn };
