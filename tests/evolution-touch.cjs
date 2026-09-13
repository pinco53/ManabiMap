// Run against a local preview. Requires Playwright and an installed Chrome.
// PLAYWRIGHT_MODULE can point to a bundled Playwright installation.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const preview = process.env.PREVIEW_URL || 'http://localhost:4173/evolution.html';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(preview, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(900);
    const session = await page.context().newCDPSession(page);
    const touch = (type, points) => session.send('Input.dispatchTouchEvent', {
      type, touchPoints: points.map(([x, y, id = 1]) => ({ x, y, id, radiusX: 3, radiusY: 3 }))
    });
    const state = () => page.evaluate(() => {
      const window = document.getElementById('deepTimeWindow');
      return {
        zoom: parseFloat(document.getElementById('deepTimeZoomLabel').textContent),
        center: +document.getElementById('deepTimeScrubber').value / 1000,
        left: parseFloat(window.style.left) / 100,
        width: parseFloat(window.style.width) / 100,
        modal: document.getElementById('deepTimeDialog').open
      };
    });
    const reset = async () => { await page.locator('#deepTimeReset').click(); await page.waitForTimeout(1000); };
    const swipe = async (x, y, dx, dy) => {
      await touch('touchStart', [[x, y]]);
      for (let i = 1; i <= 10; i++) {
        await touch('touchMove', [[x + dx * i / 10, y + dy * i / 10]]);
        await page.waitForTimeout(16);
      }
      await touch('touchEnd', []);
    };
    assert.equal(await page.locator('.timeline-container .event').count(), 118);
    assert.equal(await page.locator('#era-future .event').count(), 5);
    assert.equal((await state()).zoom, 1);
    assert.equal((await state()).width, 1);
    for (let i = 0; i < 2; i++) {
      await touch('touchStart', [[160, 305]]);
      await touch('touchEnd', []);
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(700);
    assert.ok(Math.abs((await state()).zoom - 2.2) < .2, 'Blank-space double tap must zoom once, not twice');
    await reset();

    await swipe(240, 430, -140, 0);
    await page.waitForTimeout(450);
    assert.ok((await state()).zoom >= 2, 'A full overview swipe must continue beyond the first move');
    assert.ok((await state()).center > .6, 'Swipe left must move toward the present');
    assert.equal((await state()).modal, false);
    await reset();
    await swipe(190, 500, 0, -140);
    assert.ok((await state()).zoom > 2, 'One-finger upward travel must zoom in');
    await reset();

    await page.locator('[data-time-stop=".60,8"]').click();
    await page.waitForTimeout(1100);
    const before = await state();
    assert.ok(await page.locator('.deep-time-point[hidden]').count() > 0);
    assert.equal(await page.locator('.deep-time-point[hidden]:visible').count(), 0, 'Off-screen events must really be hidden, not left at their previous positions');
    await touch('touchStart', [[120, 400, 1], [200, 400, 2]]);
    for (let i = 1; i <= 10; i++) {
      await touch('touchMove', [[120 - 4 * i, 400, 1], [200 + 4 * i, 400, 2]]);
      await page.waitForTimeout(16);
    }
    const pinched = await state();
    assert.ok(Math.abs(pinched.zoom - before.zoom * 2) < .3, 'Pinch must follow finger distance');
    const anchor = 160 / 390;
    const oldWorld = before.center + (anchor - .5) / (.92 * before.zoom);
    const newWorld = pinched.center + (anchor - .5) / (.92 * pinched.zoom);
    assert.ok(Math.abs(oldWorld - newWorld) < .002, 'The time beneath the pinch midpoint must stay anchored');
    await touch('touchEnd', [[80, 400, 1]]);
    await touch('touchMove', [[82, 400, 1]]);
    assert.ok(Math.abs((await state()).zoom - pinched.zoom) < .2, 'Lifting one finger must not jump zoom');
    await touch('touchEnd', []);
    assert.equal((await state()).modal, false);

    await reset();
    const star = await page.locator('.deep-time-point:visible').evaluateAll(elements => elements.map(e => {
      const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
    }).find(p => p.x > 45 && p.x < 250 && p.y > 320 && p.y < 500));
    assert.ok(star);
    await swipe(star.x, star.y, 85, 0);
    assert.ok((await state()).zoom > 1.5, 'A swipe starting on a star must continue');
    assert.equal((await state()).modal, false, 'Dragging a star must not open its description');

    await reset();
    await page.locator('[data-time-stop=".60,8"]').click();
    await page.waitForTimeout(1000);
    await page.locator('.deep-time-point.has-image:visible').first().tap();
    assert.equal((await state()).modal, true, 'A deliberate star tap must still open its description');
    await page.locator('#deepTimeDialogClose').tap();
    await reset();
    await touch('touchStart', [[190, 410]]);
    await touch('touchMove', [[120, 410]]);
    await touch('touchCancel', []);
    await page.waitForTimeout(300);
    const cancelled = await state();
    await page.waitForTimeout(200);
    assert.equal((await state()).center, cancelled.center, 'Cancellation must stop inertia');
    assert.equal(await page.locator('.is-dragging').count(), 0);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await reset();
    await swipe(200, 460, 0, -100);
    const reduced = await state();
    await page.waitForTimeout(300);
    assert.equal((await state()).zoom, reduced.zoom, 'Reduced motion must disable post-gesture inertia');
    await page.locator('#deepTimeSurface').focus();
    await page.keyboard.press('Home');
    await page.waitForTimeout(100);
    assert.equal((await state()).zoom, 1);
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(100);
    assert.ok((await state()).zoom > 1);
    for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(100);
    assert.equal((await state()).zoom, 48);
    await reset();

    for (const [width, height] of [[390, 844], [320, 568], [1024, 768], [844, 390]]) {
      await page.setViewportSize({ width, height });
      await reset();
      const fits = await page.locator('.deep-time__controls').evaluate(e => e.getBoundingClientRect().bottom <= innerHeight + 1);
      assert.ok(fits, `Controls must fit ${width}×${height}`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (process.env.QA_SCREENSHOTS) await page.screenshot({ path: `${process.env.QA_SCREENSHOTS}/time-${width}-${height}.png` });
    }
    await page.locator('.deep-time__read').click();
    await page.waitForTimeout(500);
    assert.ok(await page.evaluate(() => scrollY > 200), 'There must be a working exit to the reading timeline');
    assert.deepEqual(errors, []);
    const desktop = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    desktop.on('pageerror', error => errors.push(error.message));
    await desktop.goto(preview, { waitUntil: 'domcontentloaded' });
    await desktop.mouse.move(600, 430);
    await desktop.mouse.wheel(0, -500);
    await desktop.waitForTimeout(900);
    assert.ok(parseFloat(await desktop.locator('#deepTimeZoomLabel').textContent()) > 2, 'Mouse wheel zoom must remain available');
    const desktopPosition = +await desktop.locator('#deepTimeScrubber').inputValue();
    await desktop.mouse.down();
    await desktop.mouse.move(450, 430, { steps: 10 });
    await desktop.mouse.up();
    await desktop.waitForTimeout(400);
    assert.ok(+await desktop.locator('#deepTimeScrubber').inputValue() > desktopPosition, 'Mouse drag must still pan');
    assert.deepEqual(errors, []);
    console.log('PASS: double tap, overview swipe, vertical travel, anchored pinch, two-to-one transition, star drag/tap, cancellation, reduced motion, keyboard/bounds, four viewport layouts, reading exit, mouse wheel/drag, 118-item inventory');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
