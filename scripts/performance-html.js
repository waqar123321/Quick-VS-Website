// Keep sitemap dates stable across rebuilds and changes to how the same
// navigation is delivered. The grouped service links still count as content.
function contentForDateComparison(html) {
  return stripInternalComments(html).replace(/<head>[\s\S]*?<\/head>/, head => head
    .replace(/<style data-critical-css>[\s\S]*?<\/style>\n?/g, "")
    .replace(/<noscript><link rel="stylesheet"[^>]*><\/noscript>\n?/g, "")
    .replace(/<link rel="(?:stylesheet|preload)"[^>]*>\n?/g, "")
    .replace(/(<script defer src="\/script\.js)\?v=[\w-]+(?=")/, "$1")
    .replace(/<script defer src="\/mobile-service-sections\.js\?v=[\w-]+"><\/script>\n?/g, ""))
    .replace(/(<button [^>]*\bdata-nav-toggle\b[^>]*?) hidden>/, "$1>")
    .replace('<a class="nav-fallback" href="/services/">Services</a>', "")
    .replace('<div class="site-content" id="top" tabindex="-1">', '<div class="site-content">')
    .replace('<a class="back-to-top" href="#top" hidden><span aria-hidden="true">↑</span> Back to top</a>', "")
    .replace(/(<details class="mobile-explanation" open) id="[^"]+" tabindex="-1"/g, "$1")
    .replace(/(<section\b[^>]*?) id="(?:wet-work|wet-engines)"/g, "$1")
    .replace(/(<h2 data-mobile-heading) id="[^"]+"/g, "$1");
}

function stripInternalComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, comment =>
    /TODO/i.test(comment) || comment.startsWith("<!-- Slot: ") ? "" : comment
  );
}

module.exports = { contentForDateComparison, stripInternalComments };
