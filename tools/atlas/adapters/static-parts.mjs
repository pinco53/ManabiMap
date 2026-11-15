// 西洋哲学・東洋哲学・数学: parts/*.html are hand-written static pages with a shared layout — read only.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, read, text, parseJaDate } from '../util.mjs';
import { galaxyLenses } from './human.mjs';

export default function staticParts(g, { ids, series, people }) {
  const rules = series.filter((s) => s.match).map((s) => ({ id: s.id, rule: new RegExp(s.match) }));
  const personByName = new Map(people.flatMap((p) => [p.name.ja, ...(p.aliases || [])].map((n) => [n, p])));
  people.forEach((p) => g.node({ id: p.id, type: 'person', name: p.name, ...(p.time && { time: [p.time] }), source: { from: 'data/atlas/people.json', id: p.id } }));
  const files = fs.readdirSync(path.join(ROOT, 'parts')).filter((f) => rules.some((r) => r.rule.test(f))).sort();
  let episodes = 0, lifeEvents = 0;

  files.forEach((file) => {
    const slug = file.replace('.html', ''), id = 'work:' + slug, rel = 'parts/' + file, html = read(rel);
    const title = text((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]);
    const label = text((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]).split('｜')[0].replace(title.replace(/\s/g, ''), '').trim();
    const eps = [...html.matchAll(/<article class="ep[^"]*" id="(ep\d+)"[^>]*>([\s\S]*?)<\/article>/g)];
    const section = (name) => { const i = html.indexOf(`id="${name}"`); return i < 0 ? '' : html.slice(i, html.indexOf('</section>', i)); };
    const lanes = [...section('timeline').matchAll(/<div class="tl"><h3>([\s\S]*?)<\/h3>([\s\S]*?)<\/ol>/g)];
    const dated = [];

    lanes.forEach(([, heading, body]) => {
      const laneTitle = text(heading), name = laneTitle.split('（')[0];
      const person = personByName.get(name);
      if (person) g.edge(id, person.id, 'features');
      else if (/（.*\d/.test(laneTitle)) g.note(`${rel}: 人物「${name}」が data/atlas/people.json にありません`);
      [...body.matchAll(/<span class="y">([\s\S]*?)<\/span><span class="d">([\s\S]*?)<\/span>/g)].forEach(([, y, d]) => {
        const when = text(y), what = text(d), time = parseJaDate(when);
        const eid = ids.get(`${slug}|${when}|${what}`, () => `event:${slug}-${time ? String(time.start).replace('-', 'bce') : 'undated'}`);
        g.node({ id: eid, type: 'event', stream: 'work-timeline', work: id, lane: laneTitle, title: { ja: what }, time: time ? [{ ...time, label: { ja: when } }] : [], timeLabel: { ja: when },
          ...(person && { person: person.id }), source: { from: rel + '#timeline', id: when } });
        g.edge(id, eid, 'happenedAt');
        if (time) dated.push(time);
        lifeEvents += 1;
      });
    });

    g.node({
      id, type: 'work', series: rules.find((r) => r.rule.test(file)).id, number: (slug.match(/\d+$/) || [''])[0], label: { ja: label },
      title: { ja: title }, summary: { ja: text((html.match(/<meta name="description" content="([^"]*)"/) || [])[1]) }, url: { ja: rel },
      ...(dated.length && { time: [{ start: Math.min(...dated.map((t) => t.start)), end: Math.max(...dated.map((t) => t.end)), precision: 'circa', origin: 'derived:timeline' }] }),
      lenses: galaxyLenses([title, ...eps.map((e) => text(e[2].match(/<h3>([\s\S]*?)<\/h3>/)?.[1]))]), lensOrigin: 'derived:knowledge-galaxy.js',
      status: 'published', source: { from: rel, id: slug }
    });
    eps.forEach(([, anchor, body], i) => {
      const eid = `ep:${slug}-${i + 1}`;
      g.node({ id: eid, type: 'episode', work: id, order: i + 1, anchor, code: text(body.match(/<small>([\s\S]*?)<\/small>/)?.[1]).replace('#', ''),
        title: { ja: text(body.match(/<h3>([\s\S]*?)<\/h3>/)?.[1]) }, question: { ja: text(body.match(/<p class="ep-q">([\s\S]*?)<\/p>/)?.[1]).replace(/^問い[：:]\s*/, '') },
        source: { from: rel + '#' + anchor, id: anchor } });
      g.edge(eid, id, 'partOf');
      episodes += 1;
    });
    [...section('questions').matchAll(/<li>([\s\S]*?)<\/li>/g)].forEach(([, q], i) => {
      const qid = `q:${slug}.${i + 1}`;
      g.node({ id: qid, type: 'question', level: 'work', text: { ja: text(q) }, parent: null, source: { from: rel + '#questions', id: String(i + 1) } });
      g.edge(id, qid, 'asks');
    });
    // Hand-written links to other pages are the only cross-series connections these pages have today.
    [...new Set([...html.matchAll(/<a[^>]*href="(?:\.\/)?([a-z0-9_]+)\.html(?:#[^"]*)?"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => m[1]))]
      .filter((other) => other !== slug).forEach((other) => g.edge(id, 'work:' + (other === 'part8_2' ? 'part8-2' : other), 'relatesTo', { origin: 'derived:html-link' }));
    if (/href="\.\.\/philosophy-history\.html/.test(html)) g.edge(id, 'page:philosophy-history', 'relatesTo', { origin: 'derived:html-link' });
  });
  return { works: files.length, episodes, lifeEvents, people: people.length };
}
