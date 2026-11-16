// 138億年年表: evolution.html (events live in the DOM), en/evolution.html, evolution-deep-time.js, evolution-philosophy.js — read only.
import { read, text, slugify, parseJaDate, extractLiteral } from '../util.mjs';

const THEME_TO_LENS = { tools: 'lens:tools', energy: 'lens:energy', body: 'lens:body', environment: 'lens:environment', mobility: 'lens:mobility',
  cooperation: 'lens:cooperation', power: 'lens:power', information: 'lens:information', worldview: 'lens:worldview', philosophy: 'lens:philosophy' };
const lensesFor = (themes) => [...new Set(themes.map((t) => THEME_TO_LENS[t]).filter(Boolean))];
const workFromHref = (href) => { const m = href.match(/^parts\/([a-z0-9_]+)\.html/); return m ? 'work:' + (m[1] === 'part8_2' ? 'part8-2' : m[1]) : null; };

function eras(html) {
  return html.split(/<section class="[^"]*\bera\b[^"]*" id="/).slice(1).map((chunk) => {
    const id = chunk.slice(0, chunk.indexOf('"'));
    return { id, title: text((chunk.match(/<h2 class="era-title"[^>]*>([\s\S]*?)<\/h2>/) || [])[1]), body: chunk };
  });
}

export default function timeline(g, { ids }) {
  const deepTime = read('assets/js/evolution-deep-time.js');
  const themes = extractLiteral(deepTime, 'EVENT_LENSES', 'evolution-deep-time.js');
  const curated = new Map(extractLiteral(deepTime, 'CURATED_ADDITIONS', 'evolution-deep-time.js').map((c) => [c.id, c]));
  const core = new Set((deepTime.match(/CORE_SOURCE_INDICES = new Set\(\[([\s\S]*?)\]\)/) || [, ''])[1].split(',').map(Number).filter(Boolean));

  const en = eras(read('en/evolution.html')).flatMap((era) => [...era.body.matchAll(/<article class="en-event" data-date="([^"]*)" data-title="([^"]*)"/g)].map((m) => ({ era: era.id, date: text(m[1]), title: text(m[2]) })));
  const jaEras = eras(read('evolution.html'));
  g.node({ id: 'stream:deep-time', type: 'stream', title: { ja: '138億年の年表', en: 'Deep Time Timeline' }, page: 'page:evolution', eras: jaEras.map((e) => ({ id: e.id, title: { ja: e.title } })) });

  let index = 0, imageIndex = 0, linked = 0;
  const byTitle = new Map();
  jaEras.forEach((era) => {
    era.body.split(/<div class="event (?:event-left|event-right)[^"]*"/).slice(1).forEach((chunk) => {
      const attrs = chunk.slice(0, chunk.indexOf('>'));
      const curatedId = (attrs.match(/data-curated-event="([^"]+)"/) || [])[1];
      const date = text((chunk.match(/<div class="event-date">([\s\S]*?)<\/div>/) || [])[1]);
      const heading = (chunk.match(/<h3 class="event-title">([\s\S]*?)<\/h3>/) || [])[1] || '';
      const icon = text((heading.match(/<span class="icon">([\s\S]*?)<\/span>/) || [])[1]);
      const title = text(heading.replace(/<span class="icon">[\s\S]*?<\/span>/, ''));
      const english = en[index];
      if (!english || english.era !== era.id) throw new Error(`evolution.html and en/evolution.html are out of step at event ${index + 1} (${title})`);
      if (byTitle.has(title)) throw new Error('Duplicate timeline title: ' + title);
      index += 1;
      const sourceIndex = curatedId ? 0 : ++imageIndex;
      const id = ids.get('timeline|' + title, () => 'event:' + (curatedId || slugify(english.title)));
      const future = era.id === 'era-future';
      const time = parseJaDate(date);
      const tags = (themes[title] || '').split(/\s+/).filter(Boolean);
      const links = [...chunk.matchAll(/<a href="([^"]+)" class="event-link[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], label: text(m[2]) }))
        .concat(((curated.get(curatedId) || {}).links || []));
      g.node({
        id, type: 'event', stream: 'deep-time', era: era.id, icon,
        title: { ja: title, en: english.title }, summary: { ja: text((chunk.match(/<p class="event-desc">([\s\S]*?)<\/p>/) || [])[1]) },
        time: time ? [{ ...time, label: { ja: date, en: english.date } }] : [], timeLabel: { ja: date, en: english.date },
        ...(future && { future: true }),
        lenses: lensesFor(tags), legacyThemes: tags,
        core: curatedId ? curated.has(curatedId) : core.has(sourceIndex),
        image: curatedId ? `assets/images/evolution/curated/curated-${curatedId}.webp` : `assets/images/evolution/event-${String(sourceIndex).padStart(3, '0')}.webp`,
        sources: links.filter((l) => /^https?:/.test(l.href)).filter((l, i, all) => all.findIndex((x) => x.href === l.href) === i),
        aliases: [curatedId ? 'deep-curated-' + curatedId : 'deep-event-' + index],
        source: { from: 'evolution.html', id: title }
      });
      byTitle.set(title, id);
      if (!themes[title]) g.note(`年表「${title}」に EVENT_LENSES の対応がありません`);
      links.map((l) => workFromHref(l.href)).filter(Boolean).forEach((work) => { g.edge(work, id, 'happenedAt'); linked += 1; });
    });
  });
  if (index !== en.length) throw new Error(`Timeline count mismatch: ja ${index}, en ${en.length}`);

  const points = extractLiteral(read('assets/js/evolution-philosophy.js'), 'points', 'evolution-philosophy.js');
  points.forEach((p) => {
    const id = 'event:philosophy-' + p.id;
    const time = parseJaDate(p.dateJa);
    const tags = p.themes.split(/\s+/);
    g.node({ id, type: 'event', stream: 'deep-time', layer: 'philosophy', title: { ja: p.titleJa, en: p.titleEn }, summary: { ja: p.bodyJa, en: p.bodyEn },
      question: { ja: p.questionJa, en: p.questionEn }, time: time ? [{ ...time, label: { ja: p.dateJa, en: p.dateEn } }] : [], timeLabel: { ja: p.dateJa, en: p.dateEn },
      lenses: lensesFor(tags), legacyThemes: tags, core: true, image: `assets/images/evolution/philosophy/philosophy-${p.id}.webp`,
      sources: [{ href: p.source, label: p.sourceLabelJa || '哲学事典' }], insertedAfter: byTitle.get(p.beforeJa) || null, aliases: ['event-philosophy-' + p.id],
      source: { from: 'assets/js/evolution-philosophy.js', id: p.id } });
    if (!byTitle.has(p.beforeJa)) g.note(`哲学レイヤー「${p.titleJa}」の挿入位置「${p.beforeJa}」が年表に見つかりません`);
  });
  return { events: index, philosophyPoints: points.length, workLinks: linked, core: [...g.nodes.values()].filter((n) => n.stream === 'deep-time' && n.core).length };
}
