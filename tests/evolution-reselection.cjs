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
  assert.equal(await page.locator('.timeline-container .event').count(), 130, '詳しい年表も130点');
  assert.equal(await page.locator('.timeline-container .event[data-curated-event]').count(), 12, '詳しい年表へ追加12点を統合');
  assert.equal(await page.locator('.timeline-container .timeline-ai-event-button').count(), 130, '追加点もAIガイドを利用できる');
  const curatedIds = [
    'first-stars-galaxies',
    'ediacaran-life',
    'indus-cities',
    'classic-maya',
    'east-asian-printing',
    'great-zimbabwe',
    'haitian-revolution',
    'udhr',
    'decolonization',
    'smallpox-eradication',
    'cedaw',
    'climate-response'
  ];
  const curatedImageChecks = await page.evaluate(async ids => Promise.all(ids.map(async id => {
    const src = `assets/images/evolution/curated/curated-${id}.webp`;
    const response = await fetch(src);
    const blob = await response.blob();
    return { src, ok: response.ok, type: blob.type, size: blob.size };
  })), curatedIds);
  curatedImageChecks.forEach(({ src, ok, type, size }) => {
    assert.equal(ok, true, `${src} を読み込める`);
    assert.equal(type, 'image/webp', `${src} はWebP画像`);
    assert.ok(size > 10_000, `${src} は空画像ではない`);
  });

  const originalCards = page.locator('.timeline-container .event:not([data-curated-event]) .event-card');
  assert.equal(await originalCards.count(), 118, '既存118点を維持');
  const originalFirstImage = await originalCards.first().evaluate(card => getComputedStyle(card).getPropertyValue('--event-image'));
  const originalLastImage = await originalCards.last().evaluate(card => getComputedStyle(card).getPropertyValue('--event-image'));
  assert.match(originalFirstImage, /event-001\.webp/, '既存先頭カードの画像番号を維持');
  assert.match(originalLastImage, /event-118\.webp/, '既存末尾カードの画像番号を維持');

  for (const id of curatedIds) {
    const detailed = page.locator(`#event-curated-${id}`);
    assert.equal(await detailed.count(), 1, `${id} を詳しい年表に表示`);
    assert.equal(await detailed.locator('.event-link[href^="http"]').count(), 1, `${id} の確認先を表示`);
    const detailedImage = await detailed.locator('.event-card').evaluate(card => getComputedStyle(card).getPropertyValue('--event-image'));
    assert.match(detailedImage, new RegExp(`curated-${id}\\.webp`), `${id} は詳しい年表でも専用画像を使う`);
  }

  for (const id of curatedIds) {
    await page.locator('#deepTimeReset').click();
    await page.waitForFunction(() => Number.parseFloat(document.querySelector('#deepTimeZoomLabel').textContent) < 1.05);
    await page.locator(`[data-event-id="deep-curated-${id}"]`).click({ force: true });
    await page.waitForTimeout(850);
    const pointState = await page.locator(`[data-event-id="deep-curated-${id}"]`).evaluate(point => {
      const image = point.querySelector('img');
      return {
        hidden: point.hidden,
        hasImage: point.classList.contains('has-image'),
        imageLoaded: Boolean(image && image.complete && image.naturalWidth > 0),
        src: image && image.getAttribute('src')
      };
    });
    assert.equal(pointState.hidden, false, `${id} は選択後に表示される`);
    assert.equal(pointState.hasImage, true, `${id} は選択後に円形画像になる`);
    assert.equal(pointState.imageLoaded, true, `${id} の円形画像を読み込める`);
    assert.match(pointState.src || '', new RegExp(`curated-${id}\\.webp$`), `${id} は対応する専用画像を使う`);
  }
  await page.locator('#deepTimeReset').click();
  await page.waitForFunction(() => Number.parseFloat(document.querySelector('#deepTimeZoomLabel').textContent) < 1.05);
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
  assert.equal(await page.locator('#deepTimeDialogImage').isVisible(), true, '追加点にも専用画像を表示');
  assert.match(await page.locator('#deepTimeDialogImage').getAttribute('src'), /evolution\/curated\/curated-.+\.webp$/, '追加点は専用画像ディレクトリを使う');
  assert.ok(await page.locator('#deepTimeDialogLinks a').count() >= 1, '追加点には確認先を示す');
  assert.match(await page.locator('#deepTimeDetailLink').getAttribute('href'), /^#event-curated-/, '追加点から詳しい年表の該当カードへ直接移動');

  assert.deepEqual(errors, [], 'ページ実行時エラーなし');
  await browser.close();
  console.log('PASS: 時の宇宙130点、詳しい年表130点、追加12点の専用画像・出典・直接リンク、既存118画像対応');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
