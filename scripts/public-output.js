const fs = require("node:fs");
const path = require("node:path");

const sourceRoot = path.resolve(__dirname, "..");
const publicRoot = path.join(sourceRoot, "dist");
const publicFiles = [
  "styles.css", "script.js", "quote-form.js", "mobile-service-sections.js",
  "CNAME", "favicon.ico", "favicon-96x96.png", "apple-touch-icon.png"
];

function isPublicAsset(source) {
  const name = path.basename(source);
  if (name.startsWith(".") || /\.md$/i.test(name) || /^package.*\.json$/i.test(name)) return false;
  if (["_internal", "scripts", "content", "node_modules"].includes(name)) return false;
  const entry = fs.lstatSync(source);
  return entry.isDirectory() || entry.isFile();
}

function preparePublicOutput() {
  fs.rmSync(publicRoot, { recursive: true, force: true });
  fs.mkdirSync(publicRoot);
  for (const filename of publicFiles) {
    const source = path.join(sourceRoot, filename);
    if (!fs.lstatSync(source).isFile()) throw new Error(`Expected a regular public file: ${filename}`);
    fs.copyFileSync(source, path.join(publicRoot, filename));
  }
  fs.cpSync(path.join(sourceRoot, "assets"), path.join(publicRoot, "assets"), {
    recursive: true,
    filter: isPublicAsset
  });
}

module.exports = { sourceRoot, publicRoot, publicFiles, preparePublicOutput };
