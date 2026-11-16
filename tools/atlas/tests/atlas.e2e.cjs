const { chromium, devices } = require('playwright');
// End-to-end check of atlas.html. Needs Playwright (not a dependency of the site).
//   python3 -m http.server 8765 & node tools/atlas/tests/atlas.e2e.cjs [url] [screenshot-dir]
const U = process.argv[2] || 'http://localhost:8765/atlas.html', S = process.argv[3] || require('os').tmpdir();
require('fs').mkdirSync(S + '/shots', { recursive: true });
const out = []; const ok = (name, cond, extra = '') => out.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? ' — ' + extra : ''));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 860 } });
  const errs = []; p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  const t0 = Date.now(); await p.goto(U); await p.waitForFunction(() => document.getElementById('atlasCount').textContent.includes('出来事')); ok('loads all three data files', true, (Date.now() - t0) + 'ms');

  // search -> focus -> card
  await p.fill('#atlasSearch', 'ソシュール'); await p.waitForSelector('#atlasResults [data-go]');
  const first = await p.textContent('#atlasResults li:first-child'); await p.keyboard.press('Enter');
  await p.waitForSelector('#atlasCard:not([hidden])');
  ok('search finds a person or work', /ソシュール|言葉の網/.test(first), first.trim().slice(0, 30));
  // go to work via URL and use the bridge
  await p.goto(U + '?focus=work:philosophy1'); await p.waitForSelector('#atlasCard h2');
  ok('card title', (await p.textContent('#atlasCard h2')) === '言葉の網と、網の外の顔');
  const bridges = await p.$$eval('#atlasCard .atlas-go span', els => els.filter(e => e.textContent.length > 30).length); ok('bridges show their reason', bridges >= 3, bridges + ' bridges');
  await p.click('#atlasCard .atlas-go[data-go="work:part5"]'); await p.waitForFunction(() => location.search.includes('work:part5'));
  ok('following a bridge updates URL', true, await p.evaluate(() => location.search));
  await p.goBack(); await p.waitForFunction(() => document.querySelector('#atlasCard h2').textContent.includes('言葉の網')); ok('browser back restores focus', true);

  // path finding: math2 -> part18 (direct bridge) and eastern1 -> math1 (multi-step)
  await p.goto(U + '?focus=work:eastern1'); await p.click('[data-act="start"]');
  await p.fill('#atlasSearch', '微分'); await p.waitForSelector('#atlasResults [data-go]'); await p.keyboard.press('Enter');
  await p.waitForSelector('[data-act="path"]'); await p.click('[data-act="path"]');
  await p.waitForSelector('#atlasTrail .is-path'); const path = await p.$$eval('#atlasTrail .is-path', els => els.map(e => e.textContent));
  ok('finds a path across series', path.length >= 3, path.join(' → ')); ok('path is in URL', (await p.evaluate(() => location.search)).includes('path='));
  await p.waitForTimeout(900); await p.screenshot({ path: S + '/shots/07-path.png' });

  // views by keyboard, constellation switching
  await p.keyboard.press('Escape'); await p.keyboard.press('3'); await p.waitForFunction(() => document.getElementById('atlas').dataset.view === 'stars'); ok('key 3 switches to constellation', true);
  await p.click('#atlasRandom'); await p.waitForFunction(() => location.search.includes('q=q:')); ok('random question sets the centre', true, await p.evaluate(() => location.search));
  await p.click('#atlasByTime'); ok('time order toggle', (await p.getAttribute('#atlasByTime', 'aria-pressed')) === 'true');
  await p.waitForTimeout(900); await p.screenshot({ path: S + '/shots/08-stars-time.png' });

  // keyboard navigation on the canvas
  await p.goto(U + '?focus=work:part5'); await p.evaluate(() => { const d = document.getElementById('atlasDepth'); d.value = 50; d.dispatchEvent(new Event('input')); });
  await p.waitForTimeout(700); await p.focus('#atlasCanvas'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
  const moved = await p.evaluate(() => location.search); ok('arrow key moves focus on canvas', !moved.includes('work:part5'), moved);
  const liveText = await p.textContent('#atlasLive'); ok('announces selection', liveText.length > 4, liveText);

  // river: event focus + same-era, lens filter
  await p.goto(U + '?view=river&focus=event:philosophy-confucius'); await p.waitForSelector('#atlasCard h2');
  const era = await p.$$eval('#atlasCard h3', els => els.map(e => e.textContent)); ok('event card has same-topic and same-era blocks', era.includes('別の場所での扱い') && era.includes('同じ頃、ほかの流れでは'), era.join(' / '));
  await p.waitForTimeout(1000); await p.screenshot({ path: S + '/shots/09-river-event.png' });
  await p.click('[data-scale="human"]'); await p.waitForFunction(() => location.search.includes('scale=human'));
  const scaleText = await p.textContent('#atlasScaleText'); ok('ruler explains its share of 13.8 billion years', scaleText.includes('分の1'), scaleText.slice(0, 60));
  await p.waitForTimeout(900); await p.screenshot({ path: S + '/shots/13-river-human.png' });
  await p.click('[data-lens="lens:energy"]'); ok('lens in URL', (await p.evaluate(() => location.search)).includes('lens=lens:energy'));

  // space and relations: river by region, causes and consequences, a concept's thread, the world map
  await p.goto(U + '?view=river&scale=history'); await p.waitForSelector('[data-lanes="region"]'); await p.click('[data-lanes="region"]');
  ok('river can be cut by region', (await p.evaluate(() => location.search)).includes('lanes=region'));
  await p.goto(U + '?view=river&focus=event:gutenberg-s-printing-system'); await p.waitForFunction(() => document.querySelector('#atlasCard h2') && document.querySelector('#atlasCard h2').textContent.includes('グーテンベルク'));
  const heads = await p.$$eval('#atlasCard h3', els => els.map(e => e.textContent)); ok('event card shows what followed, with a place', heads.includes('その先に起きたこと') && (await p.textContent('.atlas-card__when')).includes('マインツ'), heads.slice(0, 3).join(' / '));
  await p.goto(U + '?focus=concept:writing-and-record'); await p.waitForSelector('#atlasCard h2');
  const thread = await p.$$eval('#atlasCard .atlas-go strong', els => els.map(e => e.textContent)); ok('concept card lists its thread in time order', thread.indexOf('文字の発明') >= 0 && thread.indexOf('文字の発明') < thread.indexOf('グーテンベルク活版印刷'), thread.length + ' steps');
  await p.keyboard.press('Escape'); await p.keyboard.press('4'); await p.waitForFunction(() => document.getElementById('atlas').dataset.view === 'world');
  await p.evaluate(() => { const d = document.getElementById('atlasUntil'); d.value = 500; d.dispatchEvent(new Event('input')); });
  const until = await p.textContent('#atlasUntilText'); ok('world view filters by time', until.includes('〜'), until);
  await p.goto(U + '?view=world&focus=region:africa'); await p.waitForSelector('#atlasCard h2'); ok('region card lists events', (await p.$$eval('#atlasCard .atlas-go', els => els.length)) >= 10);
  await p.waitForTimeout(800); await p.screenshot({ path: S + '/shots/14-world.png' });

  await p.goto(U + '?view=world&focus=work:part11'); await p.waitForSelector('#atlasCard h2');
  const stage = await p.$$eval('#atlasCard h3', els => els.map(e => e.textContent)); const where = await p.textContent('.atlas-card__when');
  ok('a learning work takes its place from where the research was done', stage.some(t => t.startsWith('研究の舞台')) && where.includes('北アメリカ'), where.trim());
  await p.waitForTimeout(900); await p.screenshot({ path: S + '/shots/15-world-research.png' });

  // routes across series: offered when nothing is chosen, each leg with its reason, walkable and shareable
  await p.goto(U); await p.waitForSelector('#atlasTrail [data-go^="route:"]');
  ok('routes are offered before anything is chosen', (await p.$$('#atlasTrail [data-go^="route:"]')).length === 3);
  await p.click('#atlasTrail [data-go="route:words-and-world"]'); await p.waitForSelector('[data-act="walk"]');
  const legs = await p.$$eval('#atlasCard .atlas-go span', els => els.filter(e => e.textContent.length > 30).length);
  ok('a route card gives a reason for every step after the first', legs === 3, legs + ' reasons for 4 steps');
  await p.click('[data-act="walk"]'); await p.waitForFunction(() => location.search.includes('path='));
  const walked = await p.evaluate(() => ({ url: location.search, name: (document.querySelector('#atlasTrail .is-path') || {}).textContent, steps: document.querySelectorAll('#atlasTrail .is-path').length }));
  ok('walking a route puts it in the address and names it in the trail', walked.url.includes('work:part5,work:philosophy1,work:part8,work:math2') && walked.name.includes('言葉は、世界を') && walked.steps === 5, walked.name);
  await p.waitForTimeout(900); await p.screenshot({ path: S + '/shots/16-route.png' });
  await p.goto(U + '?view=list'); await p.waitForSelector('#atlasListRoutes');
  ok('the list shows the routes across series', (await p.$$eval('#atlasList [data-go^="route:"]', els => els.length)) === 13);

  // list view as the accessible path
  await p.goto(U); await p.waitForFunction(() => document.getElementById('atlasLenses').children.length > 0); await p.keyboard.press('Tab'); await p.keyboard.press('Enter'); await p.waitForFunction(() => document.getElementById('atlas').dataset.view === 'list');
  const listed = await p.$$eval('#atlasList [data-go^="work:"]', els => els.length); ok('skip link opens list with every work', listed === 41, listed + ' works');
  const genres = await p.$$eval('#atlasList h2', els => els.map(e => e.firstChild.textContent)); ok('programme is split into genre series', ['文明史', 'AIと社会', '言葉・文字・数', '科学と思考', '心と身体', '学びの科学'].every(g => genres.includes(g)) && !genres.includes('ハルとおじいさん'), genres.slice(0, 6).join('、'));
  const planned = await p.$$eval('#atlasList [data-go^="series:"]', els => els.map(e => e.querySelector('strong').textContent)); ok('planned series listed', planned.includes('おはなし おはなし') && planned.includes('AIの源流'), planned.join('、'));
  await p.click('#atlasList [data-go="series:ohanashi"]'); await p.waitForSelector('#atlasCard h2'); const oh = await p.textContent('#atlasCard'); ok('ohanashi card links Kawai and Jung', oh.includes('河合隼雄') && oh.includes('ユング'));

  // AI hand-off prompt is built from the trail
  await p.goto(U + '?focus=work:part5'); await p.waitForSelector('#atlasCard .ai-handoff'); ok('AI hand-off mounted', true);

  // performance: frame cost while dragging the galaxy at mid depth
  await p.evaluate(() => { const d = document.getElementById('atlasDepth'); d.value = 55; d.dispatchEvent(new Event('input')); });
  const fps = await p.evaluate(() => new Promise(res => { let n = 0; const t = performance.now(); const c = document.getElementById('atlasCanvas'); const tick = () => { n++; c.dispatchEvent(new WheelEvent('wheel', { deltaY: n % 2 ? 4 : -4, bubbles: true, cancelable: true })); performance.now() - t < 1500 ? requestAnimationFrame(tick) : res(Math.round(n / 1.5)); }; tick(); }));
  ok('frame rate while moving (headless)', fps >= 30, fps + ' fps');
  ok('no console errors (desktop)', errs.length === 0, errs.join(' | '));

  // phone
  const m = await b.newPage({ ...devices['iPhone 13'] }); const merr = []; m.on('pageerror', e => merr.push(e.message));
  await m.goto(U); await m.waitForTimeout(1200); await m.screenshot({ path: S + '/shots/10-phone-galaxy.png' });
  await m.goto(U + '?view=stars&focus=work:part17'); await m.waitForTimeout(1200); await m.screenshot({ path: S + '/shots/11-phone-card.png' });
  await m.goto(U + '?view=river'); await m.waitForTimeout(1200); await m.screenshot({ path: S + '/shots/12-phone-river.png' });
  const overflow = await m.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1); ok('no horizontal overflow on phone', !overflow); ok('no errors (phone)', merr.length === 0, merr.join('|'));
  console.log(out.join('\n')); await b.close(); if (out.some((l) => l.startsWith('FAIL'))) process.exit(1);
})().catch(e => { console.log(out.join('\n')); console.error('TEST CRASH', e.message.split('\n')[0]); process.exit(1); });
