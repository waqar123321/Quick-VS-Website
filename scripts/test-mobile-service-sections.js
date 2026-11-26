const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { paths } = require('../content/mobile-service-sections');
const { publicRoot: root } = require('./public-output');
const origin = 'https://quickvs.test';

async function waitForJump(page, id) {
  await page.waitForFunction(targetId => {
    const target = document.getElementById(targetId);
    if (!target || !target.getClientRects().length) return false;
    const top = target.getBoundingClientRect().top;
    const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
    const disclosure = target.closest('details.mobile-explanation');
    return top >= headerBottom - 1 && top < innerHeight / 2 && (!disclosure || disclosure.open);
  }, id, { timeout: 4000 });
}

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
      const target = await page.locator('.mobile-explanation[id]').first().getAttribute('id');
      assert.ok(target, pathname + ': existing jump target retained');
      await page.goto('about:blank');
      await page.goto(origin + pathname + '#' + target);
      await waitForJump(page, target);
      await page.locator('.mobile-explanation[id="'+target+'"] > summary').click();
      await page.locator('.jump-menu a[href="#'+target+'"]').click();
      await waitForJump(page, target);
      assert.equal(await page.locator('#quote-bottom a').getAttribute('href'), '#quote', 'Return button uses first form');
    }

    for (const width of [390, 1350]) {
      await page.setViewportSize({ width, height: 844 });
      for (const pathname of [...paths, '/services/brakes/', '/pricing/', '/blog/severe-engine-block-damage/']) {
        await page.goto(origin + pathname);
        const topLink = page.getByRole('link', { name: 'Back to top', exact: true });
        assert.equal(await topLink.isVisible(), false, pathname + ': Back to top starts hidden');
        const links = page.locator('.jump-menu a[href^="#"]');
        for (const link of await links.all()) {
          const hash = await link.getAttribute('href');
          await link.click();
          try {
            await waitForJump(page, hash.slice(1));
          } catch (error) {
            throw new Error(pathname + hash + ' failed to land below the header at ' + width + 'px', { cause: error });
          }
        }
        if (width === 390) {
          const topBox = await topLink.boundingBox();
          const dockBox = await page.locator('.mobile-call-bar').boundingBox();
          const consentBox = await page.locator('.consent-panel').boundingBox();
          assert.ok(topBox && dockBox && topBox.y + topBox.height <= dockBox.y, 'Back to top clears the contact bar');
          assert.ok(!consentBox || topBox.y + topBox.height <= consentBox.y, 'Back to top clears the consent panel');
        }
        await topLink.click();
        await page.waitForFunction(() => window.scrollY === 0);
        assert.equal(new URL(page.url()).hash, '#top');
        await page.waitForFunction(() => document.querySelector('.back-to-top').hidden);
        assert.equal(await page.locator('#top').evaluate(body => document.activeElement === body), true, 'Back to top returns keyboard focus to the start');
      }
    }
    console.log('Section navigation passed on mobile and desktop, including disclosure links, repeated jumps, deep links and Back to top.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
