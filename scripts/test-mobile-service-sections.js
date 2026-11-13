const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { paths } = require('../content/mobile-service-sections');
const root = path.resolve(__dirname, '..');
const origin = 'https://quickvs.test';

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    args: ['--disable-gpu', '--disable-software-rasterizer', '--use-gl=disabled'] });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      const file = path.join(root, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
      return url.origin === origin && fs.existsSync(file) ? route.fulfill({ path: file }) : route.abort();
    });
    for (const pathname of paths) {
      for (const width of [390, 767, 768, 1350]) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(origin + pathname);
        const state = await page.evaluate(() => ({
          open: [...document.querySelectorAll('.mobile-explanation')].map(d => d.open),
          forms: document.querySelectorAll('form[data-quote-form]').length,
          overflow: document.documentElement.scrollWidth > innerWidth,
          protectedBlocks: [...document.querySelectorAll('.landing-cost, .wet-prices, .price-table, .wet-included, .review-grid, .faq-list')]
            .every(e => !e.closest('.mobile-explanation'))
        }));
        assert.ok(state.open.length > 0, pathname + ': no explanatory sections');
        assert.ok(state.open.every(open => open === (width >= 768)), pathname + ': wrong initial disclosure state at ' + width);
        assert.equal(state.forms, 1, pathname + ': exactly one delivery form');
        assert.equal(state.overflow, false, pathname + ': horizontal overflow at ' + width);
        assert.equal(state.protectedBlocks, true, pathname + ': price, included work, review or FAQ folded');
        const summary = page.locator('.mobile-explanation > summary').first();
        if (width < 768) {
          await summary.press('Enter');
          assert.equal(await page.locator('.mobile-explanation').first().getAttribute('open'), '', 'Keyboard opens native details');
          await summary.press('Space');
          assert.equal(await page.locator('.mobile-explanation').first().getAttribute('open'), null, 'Keyboard closes native details');
        } else assert.equal(await summary.isVisible(), false, 'No desktop disclosure controls');
      }
      // Crossing the breakpoint opens all desktop content, then restores phone defaults.
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForFunction(() => [...document.querySelectorAll('.mobile-explanation')].every(d => !d.open));
      const target = await page.locator('.mobile-explanation [id]').first().getAttribute('id');
      assert.ok(target, pathname + ': existing jump target retained');
      await page.goto(origin + pathname + '#' + target);
      assert.equal(await page.locator('.mobile-explanation [id="'+target+'"]').evaluate(e => e.closest('details').open), true, 'Existing fragment reveals content');
      assert.equal(await page.locator('#quote-bottom a').getAttribute('href'), '#quote', 'Return button uses first form');
    }
    console.log('Mobile explanatory sections passed on three pages at 390, 767, 768 and 1350px: native keyboard toggles, breakpoint changes, fragment links, one form, protected open blocks and no overflow.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
