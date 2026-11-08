import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generate } from "critical";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dimensions = [{ width: 375, height: 812 }, { width: 1350, height: 940 }];
const stylesheetPattern = /<link rel="stylesheet" href="([^"]+)">/g;

// Scan only delivered pages, never node_modules, reports or preview output.
async function pagesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".") || ["node_modules", "_internal", "dist"].includes(entry.name)) continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await pagesIn(file));
    else if (entry.name.endsWith(".html")) files.push(file);
  }
  return files.sort();
}

const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
let browser;
async function getBrowser() {
  // Share one browser across all pages and both measured viewports.
  if (!browser?.connected) browser = await puppeteer.launch({
    executablePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--disable-software-rasterizer", "--use-gl=disabled"]
  });
  return browser;
}

try {
  let count = 0;
  for (const file of await pagesIn(root)) {
    const html = await fs.readFile(file, "utf8");
    const links = [...html.matchAll(stylesheetPattern)];
    if (!links.length) continue; // The existing legacy redirect has no stylesheet.
    const cssFiles = links.map(([, href]) => path.join(root, href.split("?")[0]));
    // Extraction uses an inert copy. No analytics, forms or network requests run
    // during a build. The delivered scripts and their order are never rewritten.
    const extractionHtml = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
      .replace(/<link rel="preload"[^>]*>/g, "")
      .replace(stylesheetPattern, "")
      .replace('<html lang="en-GB">', '<html lang="en-GB" data-consent-pending>');
    const { css } = await generate({
      base: root,
      html: extractionHtml,
      css: cssFiles,
      dimensions,
      inline: false,
      strict: true,
      concurrency: 1,
      rebase: asset => asset.url,
      penthouse: {
        puppeteer: { getBrowser },
        unstableKeepBrowserAlive: true,
        renderWaitTime: 0,
        // These controls can appear before deferred CSS arrives. Keep their
        // hidden/open/focus states as well as the measured first viewport.
        forceInclude: [/consent/, /mobile-/, /site-nav/, /nav-/, /services-dropdown/, /services-nav/, /site-header/, /skip-link/, /\[hidden\]/],
        keepLargerMediaQueries: true
      }
    });
    if (!css) throw new Error(`No critical CSS generated for ${file}`);
    let first = true;
    const output = html.replace(stylesheetPattern, (link, href) => {
      const inline = first ? `<style data-critical-css>${css}</style>\n` : "";
      first = false;
      return inline + `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">\n<noscript>${link}</noscript>`;
    });
    await fs.writeFile(file, output);
    console.log(`Critical CSS: ${path.relative(root, file)} (${Buffer.byteLength(css)} bytes; 375×812 + 1350×940)`);
    count++;
  }
  console.log(`Optimised CSS loading on ${count} pages.`);
} finally {
  if (browser?.connected) await browser.close();
}
