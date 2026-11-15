// Keep sitemap dates stable across rebuilds and changes to how the same
// navigation is delivered. The grouped service links still count as content.
function contentForDateComparison(html) {
  return html.replace(/<head>[\s\S]*?<\/head>/, head => head
    .replace(/<style data-critical-css>[\s\S]*?<\/style>\n?/g, "")
    .replace(/<noscript><link rel="stylesheet"[^>]*><\/noscript>\n?/g, "")
    .replace(/<link rel="(?:stylesheet|preload)"[^>]*>\n?/g, "")
    .replace(/(<script defer src="\/script\.js)\?v=[\w-]+(?=")/, "$1"))
    .replace(/(<button [^>]*\bdata-nav-toggle\b[^>]*?) hidden>/, "$1>")
    .replace('<a class="nav-fallback" href="/services/">Services</a>', "");
}

module.exports = { contentForDateComparison };
