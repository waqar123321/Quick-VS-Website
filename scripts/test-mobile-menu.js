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
    const fallback = page.locator(".nav-fallback");
    const skipLink = page.locator(".skip-link");
    const link = menu.locator('a[href="/pricing/"]');
    for (const pathname of pages) {
      await page.goto(origin + pathname);
      assert.equal(await fallback.isVisible(), false, pathname + " hides the fallback after initialisation");
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
        assert.equal(await skipLink.evaluate(anchor => anchor.inert), true, scenario + " skip link is inactive behind the open menu");
        assert.equal(await toggle.evaluate(button => document.activeElement === button), true, scenario + " focus starts on the menu toggle");
        await page.keyboard.press("Tab");
        assert.equal(await menu.evaluate(nav => nav.contains(document.activeElement)), true, scenario + " Tab enters the menu");

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
        assert.equal(await skipLink.evaluate(anchor => anchor.inert), false, scenario + " skip link is restored");
      }
    }

    await page.route("**/script.js?*", route => route.abort());
    for (const width of [320, 390, 1024, 1200]) {
      await page.setViewportSize({ width, height: viewport.height });
      await page.goto(origin + "/");
      assert.equal(await fallback.isVisible(), true, width + "px shows the fallback when the script fails");
      assert.equal(await toggle.isVisible(), false, width + "px hides the unavailable toggle");
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, width + "px fits the fallback");
    }
    await fallback.click();
    assert.equal(page.url(), origin + "/services/", "The fallback opens the workshop services directory");
    await page.setViewportSize({ width: 1201, height: viewport.height });
    await page.goto(origin + "/");
    assert.equal(await fallback.isVisible(), false, "Desktop retains the full navigation when the script fails");
    assert.equal(await menu.isVisible(), true, "Desktop navigation is visible without its script");
    console.log("Mobile navigation passed touch and keyboard checks at scrollY=0 and 2500, plus fallback checks from 320px to desktop.");
  } finally {
    await browser.close();
  }
}

testMobileMenu().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
