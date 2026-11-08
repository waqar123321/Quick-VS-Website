// Loading hints and generated CSS are not editorial changes. Keep sitemap dates
// stable when only these parts of the head change (including subsequent builds).
function contentForDateComparison(html) {
  return html.replace(/<head>[\s\S]*?<\/head>/, head => head
    .replace(/<style data-critical-css>[\s\S]*?<\/style>\n?/g, "")
    .replace(/<noscript><link rel="stylesheet"[^>]*><\/noscript>\n?/g, "")
    .replace(/<link rel="(?:stylesheet|preload)"[^>]*>\n?/g, ""));
}

module.exports = { contentForDateComparison };
