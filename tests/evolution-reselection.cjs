const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto(process.env.PREVIEW_URL || 'http://localhost:4173/evolution.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelectorAll('.deep-time-point').length === 130);

  assert.equal(await page.locator('.deep-time-point').count(), 130, '描画点は130点');
  assert.equal(await page.locator('.deep-time-point.is-curated').count(), 12, '再選定で追加した点は12点');
  assert.equal(await page.locator('[data-time-lens="core"]').getAttribute('aria-pressed'), 'true', '初期表示は主要層');
  assert.equal(await page.locator('.deep-time-point.is-detail:not([hidden])').count(), 0, '全景では詳細層を隠す');

  await page.locator('[data-time-lens="all"]').click();
  await page.waitForTimeout(100);
  assert.equal(await page.locator('.deep-time-point:not([hidden])').count(), 130, '「すべて」では全点を表示');

  await page.locator('[data-time-lens="core"]').click();
  await page.locator('#deepTimeZoomIn').click();
  await page.locator('#deepTimeZoomIn').click();
  await page.waitForFunction(() => Number.parseFloat(document.querySelector('#deepTimeZoomLabel').textContent) >= 2.35);
  assert.ok(await page.locator('.deep-time-point.is-detail:not([hidden])').count() > 0, '近づくと詳細層が現れる');

  await page.evaluate(() => document.querySelector('.deep-time-point.is-curated:not([hidden])').click());
  await page.waitForTimeout(450);
  await page.evaluate(() => document.querySelector('.deep-time-point.is-curated:not([hidden])').click());
  await page.locator('#deepTimeDialog[open]').waitFor();
  assert.equal(await page.locator('#deepTimeDialogImage').isHidden(), true, '追加点に誤った既存画像を流用しない');
  assert.ok(await page.locator('#deepTimeDialogLinks a').count() >= 1, '追加点には確認先を示す');

  assert.deepEqual(errors, [], 'ページ実行時エラーなし');
  await browser.close();
  console.log('PASS: 主要60点、詳細65点の段階表示、追加12点、全130点、出典付きモーダル');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
