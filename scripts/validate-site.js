const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://quickvs.co.uk";
const requiredNap = [
  "Quick Solution Vehicles",
  "56a Stratford Street North, Sparkbrook, Birmingham, B11 1BP, United Kingdom",
  "07514 277218",
  "quickvs@outlook.com",
  "Monday-Saturday 10:00-18:00. Closed Sundays."
];
const bannedPublicPhrases = [
  ["Local", "garage", "SEO"].join(" "),
  "Birmingham" + "Solihull" + "Dudley" + "Walsall" + "Sandwell" + "Coventry" + "Wolverhampton" + "WestBromwich",
  ["tyre", "sales"].join(" "),
  ["wheel", "alignment"].join(" "),
  "track" + "ing",
  "body" + "work",
  "pa" + "int",
  ["cosmetic", "repair"].join(" "),
  ["vehicle", "sales"].join(" ")
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full;
  });
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const htmlFiles = walk(root).filter((file) => {
  const rel = path.relative(root, file);
  return file.endsWith(".html") && !rel.startsWith(`_internal${path.sep}`);
});
const publicTextFiles = walk(root).filter((file) => {
  const rel = path.relative(root, file);
  if (rel.startsWith(`_internal${path.sep}`)) return false;
  if (rel.startsWith(`scripts${path.sep}`) || rel.startsWith(`content${path.sep}`)) return false;
  if (["AUDIT.md", "CHANGES.md", "AGENTS.md"].includes(rel)) return false;
  return /\.(html|css|js|xml|txt)$/i.test(file) && !file.includes(`${path.sep}node_modules${path.sep}`);
});

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  const h1Count = (text.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) fail(`${rel}: expected one H1, found ${h1Count}`);
  if (!text.includes('rel="canonical"')) fail(`${rel}: missing canonical`);
  if (!text.includes('name="description"')) fail(`${rel}: missing meta description`);
  if (!text.includes('property="og:title"')) fail(`${rel}: missing Open Graph title`);
  if (!text.includes('name="twitter:card"')) fail(`${rel}: missing Twitter card`);
  if (text.includes("TODO: Add genuine Google review text") && rel.includes("testimonials")) {
    fail(`${rel}: review TODO is publicly displayed`);
  }
  for (const phrase of ["TODO", "Waqar", "placeholder", "G-XXXXXXXXXX", "TODO_SEARCH_CONSOLE_VERIFICATION_CODE"]) {
    if (text.includes(phrase)) fail(`${rel}: public HTML contains ${phrase}`);
  }
  if (/\bdraft\b/i.test(text)) fail(`${rel}: public HTML contains draft`);
  if (/name=["']google-site-verification["']/i.test(text)) fail(`${rel}: Search Console verification meta tag should not be output`);
  const jsonBlocks = [...text.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
  for (const block of jsonBlocks) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      fail(`${rel}: invalid JSON-LD: ${error.message}`);
    }
  }
  const hrefs = [...text.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    if (href.includes("{#")) fail(`${rel}: TODO marker inside href ${href}`);
    const target = href.endsWith("/") ? `${href}index.html` : href;
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) fail(`${rel}: broken internal link ${href}`);
  }
}

const combinedPublic = publicTextFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
for (const phrase of bannedPublicPhrases) {
  if (combinedPublic.toLowerCase().includes(phrase.toLowerCase())) {
    fail(`Public files contain banned or non-customer-facing phrase: ${phrase}`);
  }
}

for (const nap of requiredNap) {
  if (!combinedPublic.includes(nap)) fail(`Missing source-of-truth detail in public files: ${nap}`);
}

if (!combinedPublic.includes("Areas we cover")) fail('Missing required heading "Areas we cover"');
if (!combinedPublic.includes("We support drivers across Birmingham, Solihull, Dudley, Walsall, Sandwell, Coventry, Wolverhampton and West Bromwich. For non-running cars and engine work we can arrange recovery from anywhere in the UK.")) {
  fail("Missing exact required area copy");
}
if (!combinedPublic.includes("G-GEJR9VMEYV")) fail("Missing live GA4 Measurement ID");
if (combinedPublic.includes("G-XXXXXXXXXX")) fail("GA4 placeholder still appears in public files");
if (combinedPublic.includes("TODO_SEARCH_CONSOLE_VERIFICATION_CODE")) fail("Search Console placeholder still appears in public files");
if (combinedPublic.includes('name="google-site-verification"')) fail("Search Console HTML verification meta tag should not be output");
if (combinedPublic.includes("GTM-")) fail("GTM should remain disabled and unconfigured");

if (!process.exitCode) {
  console.log(`Validated ${htmlFiles.length} HTML files, JSON-LD blocks, internal links and public copy checks.`);
}
