const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const runtimeModules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const modulePaths = runtimeModules ? [root, runtimeModules] : [root];
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const origin = "https://quickvs.test";
const viewport = { width: 390, height: 844 };
const pages = ["/", "/services/wet-belt-replacement/", "/services/diesel-injector-repairs/"];

async function testMobileMenu() {
  let playwright;
  try {
    playwright = require.resolve("playwright", { paths: modulePaths });
  } catch (error) {
    if (error.code !== "MODULE_NOT_FOUND") throw error;
    console.log("Mobile menu regression skipped (Playwright unavailable).");
    return;
  }

  const { chromium } = require(playwright);
  if (!executablePath && !fs.existsSync(chromium.executablePath())) {
    console.log("Mobile menu regression skipped (Playwright Chromium unavailable).");
    return;
  }

  const browser = await chromium.launch({
    executablePath,
    args: ["--disable-gpu", "--disable-software-rasterizer", "--use-gl=disabled"]
  });
  try {
    const page = await browser.newPage({ viewport, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
    await page.route("**/*", route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.abort();
      const file = path.join(root, url.pathname, url.pathname.endsWith("/") ? "index.html" : "");
      if (!fs.existsSync(file)) return route.abort();
      return route.fulfill({ path: file });
    });

    const toggle = page.locator("[data-nav-toggle]");
    const menu = page.locator("[data-nav]");
    const header = page.locator(".site-header");
    const backdrop = page.locator("[data-nav-backdrop]");
    const link = menu.locator('a[href="/pricing/"]');
    for (const pathname of pages) {
      await page.goto(origin + pathname);
      for (const scrollY of [0, 2500]) {
        const scenario = pathname + " at scrollY=" + scrollY;
        await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
        assert.equal(await page.evaluate(() => window.scrollY), scrollY, scenario);

        await toggle.tap();
        const headerBox = await header.boundingBox();
        const menuBox = await menu.boundingBox();
        assert.ok(headerBox && menuBox, scenario + " header and menu are visible");
        assert.equal(headerBox.y, 0, scenario + " header top");
        assert.equal(menuBox.y, headerBox.y + headerBox.height, scenario + " menu top");
        assert.deepEqual(await backdrop.boundingBox(), { x: 0, y: 0, ...viewport }, scenario + " backdrop");
        assert.equal(await page.evaluate(() => window.scrollY), scrollY, scenario + " after opening");

        // Allow the real touch event to reach the menu while staying on the same page.
        await link.evaluate(anchor => anchor.addEventListener("click", event => event.preventDefault(), { once: true }));
        await link.tap();
        await menu.waitFor({ state: "hidden" });
        assert.equal(await page.evaluate(() => window.scrollY), scrollY, scenario + " after tapping a link");
        assert.equal(await toggle.evaluate(button => document.activeElement === button), true, scenario + " focus after link tap");

        await toggle.tap();
        if (scrollY === 0) await page.keyboard.press("Escape");
        else await page.touchscreen.tap(10, viewport.height - 10);
        await menu.waitFor({ state: "hidden" });
        assert.equal(await page.evaluate(() => window.scrollY), scrollY, scenario + " after dismissal");
        assert.equal(await toggle.evaluate(button => document.activeElement === button), true, scenario + " focus after dismissal");
      }
    }
    console.log("Mobile menu regression passed at 390×844 with touch on all three pages at scrollY=0 and 2500.");
  } finally {
    await browser.close();
  }
}

testMobileMenu().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
