// Checks the existing pages that read the Atlas work list (home galaxy, map index) and those that must not change.
//   python3 -m http.server 8765 & node tools/atlas/tests/site.e2e.cjs [base-url]
const { chromium, devices } = require('playwright');
const B = process.argv[2] || 'http://localhost:8765/';
const out = []; const ok = (name, cond, extra = '') => out.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? ' — ' + extra : ''));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|favicon/.test(m.text())) errs.push(m.text()); });
  const galaxy = () => p.evaluate(() => ({ parts: document.getElementById('galaxyPartCount').textContent, lens: [...document.querySelectorAll('[data-galaxy-lens] b')].map((x) => x.textContent).join(',') }));

  await p.goto(B + 'index.html'); await p.waitForTimeout(1000);
  let g = await galaxy(); ok('home galaxy shows every series', g.parts === '41', JSON.stringify(g));
  ok('default question is unchanged', (await p.textContent('#galaxy-question')).includes('人間が考えるとは何か'));
  ok('all parts exist as links for screen readers', (await p.$$eval('#galaxy nav.visually-hidden a', (e) => e.length)) === 41);
  await p.focus('#knowledgeGalaxyField'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
  ok('arrow key selects a part and opens its card', await p.evaluate(() => document.getElementById('galaxyCard').classList.contains('is-open') && location.search.includes('part=')), await p.evaluate(() => location.search));
  await p.keyboard.press('Escape'); ok('escape closes the card', !(await p.evaluate(() => document.getElementById('galaxyCard').classList.contains('is-open'))));
  await p.goto(B + 'index.html?lens=number&part=math2'); await p.waitForTimeout(1000);
  const restored = await p.evaluate(() => ({ lens: document.querySelector('[data-galaxy-lens][aria-pressed="true"]').dataset.galaxyLens, part: document.getElementById('galaxyCardPart').textContent, href: document.getElementById('galaxyCardPartLink').getAttribute('href') }));
  ok('address restores lens and part', restored.lens === 'number' && restored.href === 'parts/math2.html', JSON.stringify(restored));

  await p.goto(B + 'en/index.html'); await p.waitForTimeout(1000); g = await galaxy();
  ok('English home is unchanged (21 parts)', g.parts === '21' && g.lens === '21,16,11,5,16,6', JSON.stringify(g));

  await p.goto(B + 'map.html'); await p.waitForTimeout(800);
  const groups = await p.$$eval('.simple-part-group h2', (e) => e.map((x) => x.textContent));
  ok('map index groups by genre series, in order', groups.join('、') === '文明史、AIと社会、言葉・文字・数、科学と思考、心と身体、学びの科学、EDU、西洋哲学、東洋哲学、数学', groups.join('、'));
  const hrefs = await p.$$eval('a.simple-part-card', (e) => e.map((a) => a.href)); let broken = 0;
  for (const h of hrefs) if (!(await p.request.get(h)).ok()) broken += 1;
  ok('map index lists every work and no link is broken', hrefs.length === 42 && broken === 0, hrefs.length + ' cards, ' + broken + ' broken');
  await p.goto(B + 'questions.html'); await p.waitForTimeout(600);
  ok('dialogue index is unchanged (21 parts)', (await p.$$eval('a.simple-part-card', (e) => e.length)) === 21);

  // the bridge panel at the end of every kind of part page
  const fs = require('fs'), path = require('path'), partsDir = path.join(__dirname, '../../../parts');
  const files = fs.readdirSync(partsDir).filter((f) => f.endsWith('.html'));
  let panels = 0, deadLinks = 0;
  const wrongPlace = [];
  for (const file of files) {
    await p.goto(B + 'parts/' + file, { waitUntil: 'domcontentloaded' });   // not 'load': videos and web fonts are not what is checked here
    await p.waitForSelector('.atlas-bridge', { timeout: 8000 }).catch(() => {});
    const info = await p.evaluate(() => {
      const el = document.querySelector('.atlas-bridge');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { count: document.querySelectorAll('.atlas-bridge').length, links: [...el.querySelectorAll('a')].map((a) => a.href), wide: r.width,
        afterContent: r.top + scrollY > document.body.scrollHeight * 0.5, overflow: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    if (!info || info.count !== 1) { wrongPlace.push(file + ':missing'); continue; }
    panels += 1;
    if (!info.afterContent || info.overflow || info.wide < 300) wrongPlace.push(file);
    for (const h of info.links) if (!(await p.request.get(h)).ok()) deadLinks += 1;
  }
  ok('every part page ends with one bridge panel', panels === files.length && panels === 44, panels + ' of ' + files.length);
  ok('the panel sits after the content and its links work', wrongPlace.length === 0 && deadLinks === 0, wrongPlace.join(',') + ' dead:' + deadLinks);
  await p.goto(B + 'parts/philosophy1.html'); await p.waitForSelector('.atlas-bridge');
  const text = await p.textContent('.atlas-bridge');
  ok('bridges carry their reason', text.includes('言葉と思考の旅') && text.includes('ソシュール'));
  await p.goto(B + 'parts/part9_1.html'); await p.waitForSelector('.atlas-bridge');
  ok('a chapter page uses the bridges of its part', (await p.textContent('.atlas-bridge')).includes('工事中の脳'));
  await p.goto(B + 'en/parts/part5.html'); await p.waitForTimeout(600);
  ok('English part pages are unchanged (no panel)', (await p.$$('.atlas-bridge')).length === 0);

  await p.route('**/atlas-works.js*', (r) => r.abort());
  await p.goto(B + 'index.html'); await p.waitForTimeout(1000); ok('without the Atlas list the home galaxy falls back to 21 parts', (await p.textContent('#galaxyPartCount')) === '21');
  await p.unroute('**/atlas-works.js*');
  ok('no script errors', errs.length === 0, errs.join(' | '));

  const m = await b.newPage({ ...devices['iPhone 13'] }); await m.goto(B + 'index.html'); await m.waitForTimeout(1000);
  ok('phone: home has no horizontal overflow', !(await m.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)));
  console.log(out.join('\n')); await b.close(); if (out.some((l) => l.startsWith('FAIL'))) process.exit(1);
})().catch((e) => { console.log(out.join('\n')); console.error('TEST CRASH', e.message.split('\n')[0]); process.exit(1); });
