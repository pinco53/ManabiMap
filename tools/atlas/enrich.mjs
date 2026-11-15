// Applies the hand-edited files in data/atlas/ on top of what the adapters read from the existing site.
import { readJson } from './util.mjs';

export function enrich(g) {
  const stats = {};

  // --- concept dictionary: existing slugs fold into dictionary entries; slugs used by one work become keywords
  const dictionary = readJson('data/atlas/concepts.json', null);
  if (dictionary) {
    const target = new Map(dictionary.flatMap((c) => c.aliases.map((slug) => ['concept:' + slug, c.id])));
    const old = g.edges.filter((e) => e.type === 'about');
    g.edges = g.edges.filter((e) => e.type !== 'about');
    [...g.nodes.values()].filter((n) => n.type === 'concept').forEach((n) => g.nodes.delete(n.id));
    dictionary.forEach((c) => g.node({ id: c.id, type: 'concept', title: c.title, summary: c.summary, aliases: c.aliases, status: 'published', source: { from: 'data/atlas/concepts.json', id: c.id } }));
    let folded = 0, keywords = 0;
    old.forEach((e) => {
      if (target.has(e.to)) { g.edge(e.from, target.get(e.to), 'about'); folded += 1; return; }
      const work = g.nodes.get(e.from);
      if (work) { (work.keywordSlugs = work.keywordSlugs || []).push(e.to.replace('concept:', '')); keywords += 1; }
    });
    dictionary.forEach((c) => c.works.forEach((w) => g.edge(w, c.id, 'about', { origin: 'curated' })));
    stats.concepts = { dictionary: dictionary.length, folded, keywords };
  }

  // --- question ledger
  const questions = readJson('data/atlas/questions.json', null);
  if (questions) {
    questions.big.forEach((q) => g.node({ id: q.id, type: 'question', level: 'big', text: q.text, parent: null, source: { from: 'data/atlas/questions.json', id: q.id } }));
    Object.entries(questions.parents).forEach(([child, parent]) => {
      const node = g.nodes.get(child);
      if (!node) throw new Error(`questions.json: ${child} という問いはありません`);
      if (!g.nodes.has(parent) || g.nodes.get(parent).level !== 'big') throw new Error(`questions.json: ${parent} は大きな問いではありません`);
      node.parent = parent;
      // A work that asks a question also belongs to the big question above it.
      g.edges.filter((e) => e.type === 'asks' && e.to === child).forEach((e) => g.edge(e.from, parent, 'asks', { origin: 'derived:parent' }));
    });
    stats.questions = { big: [...g.nodes.values()].filter((n) => n.type === 'question' && n.level === 'big').length, parents: Object.keys(questions.parents).length };
  }

  // --- per-work additions (time ranges for now)
  Object.entries(readJson('data/atlas/works.overrides.json', {})).forEach(([id, extra]) => {
    const work = g.nodes.get(id);
    if (!work) throw new Error(`works.overrides.json: ${id} という作品はありません`);
    Object.assign(work, extra);
  });

  // --- series extras: people, concepts and media that already belong to a series before it has any work page
  [...g.nodes.values()].filter((n) => n.type === 'series').forEach((s) => {
    (s.people || []).forEach((p) => g.edge(s.id, p, 'features', { origin: 'curated' }));
    (s.concepts || []).forEach((c) => g.edge(s.id, c, 'about', { origin: 'curated' }));
    if (s.mediaMatch) {
      const rule = new RegExp(s.mediaMatch);
      const media = [...g.nodes.values()].filter((n) => n.type === 'media' && rule.test(n.source.id));
      media.forEach((m) => { m.series = s.id; g.edge(m.id, s.id, 'partOf', { origin: 'curated' }); });
      s.mediaCount = media.length;
    }
    delete s.mediaMatch; delete s.match;
  });

  const links = readJson('data/atlas/links.json', {});
  (links.sameAs || []).forEach(([a, b]) => g.edge(a, b, 'sameAs', { origin: 'curated' }));
  Object.entries(links.happenedAt || {}).forEach(([from, events]) => events.forEach((e) => g.edge(from, e, 'happenedAt', { origin: 'curated' })));
  Object.entries(links.features || {}).forEach(([person, events]) => events.forEach((e) => g.edge(e, person, 'features', { origin: 'curated' })));
  stats.sameAs = (links.sameAs || []).length;

  readJson('data/atlas/edges.json', []).forEach((e) => g.edge(e.from, e.to, e.type, { ...e, origin: 'curated' }));
  stats.bridges = g.edges.filter((e) => e.origin === 'curated' && e.type === 'bridges').length;
  return stats;
}
