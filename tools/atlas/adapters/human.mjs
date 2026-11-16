// 本編（ハルとおじいさん）: assets/js/manabimap-data.js + manabimap-en.js  — read only.
import { loadGlobals } from '../util.mjs';

const SOURCE = 'assets/js/manabimap-data.js';
// Same rules knowledge-galaxy.js applies at runtime; evaluated once here so membership becomes data.
const GALAXY_LENS_RULES = [
  ['lens:mind', /AI|人間|思考|判断|感性|前提|勘違い|身体|意識/],
  ['lens:learning', /学び|教育|知識|対話|理解|学校|協働|問い/],
  ['lens:information', /言葉|文字|思考|知識|記録|物語|コミュニケーション/],
  ['lens:tools', /道具|機械|技術|AI|蒸気|コンピュータ|エネルギー|デジタル|交換|移動/],
  ['lens:value', /数字|価値|測|計算|エネルギー|交換|余っ|足り|経済/]
];
export function galaxyLenses(parts) {
  const haystack = parts.join(' ');
  const hit = GALAXY_LENS_RULES.filter(([, rule]) => rule.test(haystack)).map(([id]) => id);
  return hit.length ? hit : ['lens:learning'];
}
const PSEUDO = { evolution: 'page:evolution', note: 'page:note' };
export const refId = (id) => PSEUDO[id] || (/^note-/.test(id) ? 'media:' + id : /^part/.test(id) ? 'work:' + id : id);

export default function human(g) {
  const win = loadGlobals([SOURCE, 'assets/js/manabimap-en.js']);
  const data = win.ManabiMapData, en = (win.ManabiMapEnglish || {}).partsById || {};

  g.node({ id: 'page:evolution', type: 'page', title: { ja: '138億年の年表', en: 'Deep Time Timeline' }, url: { ja: 'evolution.html', en: 'en/evolution.html' } });
  g.node({ id: 'page:note', type: 'page', title: { ja: 'note記事' }, url: { ja: 'note.html' } });

  const defined = new Map(data.concepts.map((c) => [c.id, c]));
  const concept = (slug) => g.ensure({
    id: 'concept:' + slug, type: 'concept',
    title: defined.has(slug) ? { ja: defined.get(slug).title } : null,
    status: defined.has(slug) ? 'published' : 'undefined',
    source: { from: SOURCE + (defined.has(slug) ? '#concepts' : '#parts.concepts'), id: slug }
  }).id;
  data.concepts.forEach((c) => concept(c.id));

  data.parts.forEach((p) => {
    const e = en[p.id] || {};
    const id = 'work:' + p.id;
    g.node({
      id, type: 'work', series: null, program: 'family:haru', cluster: p.group, number: p.number,
      title: { ja: p.title, ...(e.title && { en: e.title }) },
      summary: { ja: p.subtitle, ...(e.subtitle && { en: e.subtitle }) },
      url: { ja: p.pageUrl, ...(e.englishUrl && { en: 'en/' + e.englishUrl.replace(/^(\.\.\/)?(en\/)?/, '') }) },
      timeLabel: { ja: p.era, ...(e.era && { en: e.era }) },
      lenses: galaxyLenses([p.title, p.subtitle, (p.tags || []).join(' '), (p.questions || []).join(' ')]),
      lensOrigin: 'derived:knowledge-galaxy.js',
      keywords: p.tags, color: p.color, status: 'published',
      source: { from: SOURCE + '#parts', id: p.id }
    });
    p.concepts.forEach((slug) => g.edge(id, concept(slug), 'about'));
    p.questions.forEach((q, i) => {
      const qid = `q:${p.id}.${i + 1}`;
      g.node({ id: qid, type: 'question', level: 'work', text: { ja: q, ...(e.questions && e.questions[i] && { en: e.questions[i] }) }, parent: null, source: { from: SOURCE + '#parts.questions', id: p.id } });
      g.edge(id, qid, 'asks');
    });
    p.next.forEach((n, i) => g.edge(id, refId(n), 'next', { order: i + 1 }));
  });
  data.concepts.forEach((c) => c.related.forEach((r) => g.edge(refId(r), 'concept:' + c.id, 'about')));

  data.questions.forEach((q) => {
    const id = 'q:' + q.id.replace(/^q-/, '');
    g.node({ id, type: 'question', level: 'big', text: { ja: q.text }, parent: null, source: { from: SOURCE + '#questions', id: q.id } });
    q.related.forEach((r) => g.edge(refId(r), id, 'asks'));
  });
  data.routes.forEach((r) => g.node({ id: 'route:' + r.id.replace(/^route-/, ''), type: 'route', title: { ja: r.title }, summary: { ja: r.description }, steps: r.nodes.map(refId), source: { from: SOURCE + '#routes', id: r.id } }));

  const notes = new Map(data.notes.map((n) => [n.id, n]));
  data.mediaItems.forEach((m) => {
    const note = notes.get(m.id);
    const id = 'media:' + m.id;
    g.node({
      id, type: 'media', kind: m.type, title: { ja: m.title }, href: m.url,
      ...(note && { number: note.number, image: note.image, keywords: note.tags, primaryWork: note.primaryPart ? refId(note.primaryPart) : undefined }),
      status: (note && note.status) || 'published', source: { from: SOURCE + '#mediaItems', id: m.id }
    });
    (m.relatedParts || []).forEach((r) => g.edge(id, refId(r), 'deepens'));
  });
  return { works: data.parts.length, concepts: data.concepts.length, media: data.mediaItems.length, routes: data.routes.length };
}
