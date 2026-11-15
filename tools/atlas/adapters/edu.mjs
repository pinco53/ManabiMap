// EDU: assets/js/edu-data/*.js — read only.
import { loadGlobals } from '../util.mjs';
import { galaxyLenses } from './human.mjs';

const DIR = 'assets/js/edu-data/';
export default function edu(g, { ids }) {
  const win = loadGlobals(['edu-parts', 'edu-cards', 'edu-people', 'edu-evidence', 'edu-history'].map((f) => DIR + f + '.js'));
  const partIds = new Set(win.ManabiEduParts.map((p) => p.id));
  const workRef = (id) => 'work:' + id;

  win.ManabiEduParts.forEach((p) => {
    const id = workRef(p.id);
    const years = (p.studyTimeline || []).map((t) => Number(t.year)).filter(Number.isFinite);
    g.node({
      id, type: 'work', series: 'series:edu', cluster: p.actName, number: String(p.number),
      title: { ja: p.title }, summary: { ja: p.subtitle }, url: { ja: `parts/${p.id}.html` },
      ...(years.length && { time: [{ start: Math.min(...years), end: Math.max(...years), precision: 'exact', origin: 'derived:studyTimeline' }] }),
      lenses: galaxyLenses([p.title, p.subtitle, p.centerQuestion, p.tagline]), lensOrigin: 'derived:knowledge-galaxy.js',
      keywords: (p.glossary || []).map((x) => x.term || x.title || x[0]).filter(Boolean),
      color: p.color, status: 'published', source: { from: DIR + 'edu-parts.js', id: p.id }
    });
    const qid = `q:${p.id}.1`;
    g.node({ id: qid, type: 'question', level: 'work', text: { ja: p.centerQuestion }, parent: null, source: { from: DIR + 'edu-parts.js#centerQuestion', id: p.id } });
    g.edge(id, qid, 'asks');
    p.episodes.forEach((e, i) => {
      const eid = 'ep:' + e.id;
      g.node({ id: eid, type: 'episode', work: id, order: i + 1, title: { ja: e.title }, question: e.parentQuestion ? { ja: e.parentQuestion } : undefined, certainty: e.certainty, source: { from: DIR + 'edu-parts.js#episodes', id: e.id } });
      g.edge(eid, id, 'partOf');
      (e.relatedCards || []).forEach((c) => g.edge('study:' + c, eid, 'supports'));
    });
  });

  win.ManabiEduPeople.forEach((p) => g.node({ id: 'person:' + p.id, type: 'person', name: { ja: p.name }, reading: p.reading, role: p.role, field: p.field, group: p.group, summary: { ja: p.core }, source: { from: DIR + 'edu-people.js', id: p.id } }));
  const domains = new Map(win.ManabiEduCardDomains.map((d) => [d.id, d.title]));
  win.ManabiEduCards.forEach((c) => {
    const id = 'study:' + c.id;
    g.node({ id, type: 'study', kind: 'card', title: { ja: c.title }, name: c.name, domain: domains.get(c.domain), summary: { ja: c.summary }, certainty: c.certainty,
      ...(Number.isFinite(c.year) && { time: [{ start: c.year, end: c.year, precision: 'exact' }] }), source: { from: DIR + 'edu-cards.js', id: c.id } });
    (c.relatedParts || []).forEach((p) => g.edge(id, workRef(p), 'supports'));
    (c.relatedPeople || []).forEach((p) => g.edge(id, 'person:' + p, 'features'));
  });
  win.ManabiEduEvidence.forEach((e) => {
    const id = 'study:' + e.id;
    g.node({ id, type: 'study', kind: 'evidence', title: { ja: e.theme }, name: e.study, summary: { ja: e.effect }, certainty: e.certainty,
      ...(Number.isFinite(e.year) && { time: [{ start: e.year, end: e.year, precision: 'exact' }] }), source: { from: DIR + 'edu-evidence.js', id: e.id } });
    (e.relatedParts || []).forEach((p) => g.edge(id, workRef(p), 'supports'));
    (e.relatedCards || []).forEach((c) => g.edge(id, 'study:' + c, 'relatesTo'));
  });

  const history = win.ManabiEduHistory;
  g.node({ id: 'page:edu-history', type: 'page', title: { ja: history.title }, url: { ja: 'edu-history.html' } });
  history.items.forEach((item) => {
    const id = ids.get(`edu-history|${item.year}|${item.title}`, () => `event:edu-${item.year}`);
    g.node({ id, type: 'event', stream: 'edu-history', lane: item.lane, title: { ja: item.title }, summary: { ja: item.description },
      time: [{ start: item.year, end: item.year, precision: 'exact', label: { ja: item.year + '年' } }], lenses: ['lens:learning'], source: { from: DIR + 'edu-history.js#items', id: item.title } });
    (item.relatedHumanParts || []).forEach((p) => g.edge(workRef(p), id, 'happenedAt'));
    (item.relatedCards || []).forEach((c) => g.edge('study:' + c, id, 'relatesTo'));
  });
  (history.bridges || []).forEach((b) => g.edge('page:edu-history', workRef(b.humanPart), 'relatesTo', { why: { ja: b.edu } }));
  return { works: partIds.size, people: win.ManabiEduPeople.length, cards: win.ManabiEduCards.length, evidence: win.ManabiEduEvidence.length, history: history.items.length };
}
