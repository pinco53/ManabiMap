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

  // --- series that list their works explicitly (a programme split into genres)
  [...g.nodes.values()].filter((n) => n.type === 'series' && n.works).forEach((s) => {
    s.works.forEach((id) => { const work = g.nodes.get(id); if (!work) throw new Error(`series.json: ${s.id} の作品 ${id} がありません`); if (work.series) throw new Error(`series.json: ${id} が複数のシリーズに入っています`); work.series = s.id; });
    delete s.works;
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
  Object.entries(links.about || {}).forEach(([concept, events]) => events.forEach((e) => g.edge(e, concept, 'about', { origin: 'curated' })));
  stats.sameAs = (links.sameAs || []).length;

  // --- places: where things happened. Explicit entries first, then what can be inherited.
  const atlasPlaces = readJson('data/atlas/places.json', null);
  if (atlasPlaces) {
    atlasPlaces.regions.forEach((r) => g.node({ type: 'region', ...r }));
    // where research was done: the clue to place for works about learning, cognition and development
    const research = readJson('data/atlas/research-places.json', { studies: {}, references: [] });
    Object.entries(research.studies).forEach(([id, place]) => { const n = g.nodes.get('study:' + id); if (!n) throw new Error(`research-places.json: study:${id} がありません`); n.place = place; });
    research.references.forEach((r) => {
      if (!g.nodes.has(r.work)) throw new Error(`research-places.json: ${r.work} がありません`);
      g.node({ id: r.id, type: 'study', kind: 'reference', title: r.title, place: r.place, ...(r.year && { time: [{ start: r.year, end: r.year, precision: 'exact' }] }), source: { from: 'data/atlas/research-places.json', id: r.id } });
      g.edge(r.id, r.work, 'supports', { origin: 'curated' });
    });
    const all = [...g.nodes.values()];
    Object.entries(atlasPlaces.places).forEach(([id, place]) => { const n = g.nodes.get(id); if (!n) throw new Error(`places.json: ${id} がありません`); n.place = place; });
    all.forEach((n) => {
      if (n.place) return;
      if (n.type === 'event' && n.region && atlasPlaces.regionWords[n.region]) n.place = { ...atlasPlaces.regionWords[n.region], name: n.region };
      else if (n.type === 'event' && atlasPlaces.laneRegions[n.lane] && n.stream === 'edu-history') n.place = { region: atlasPlaces.laneRegions[n.lane] };
      else if (n.type === 'person' && atlasPlaces.personGroups[n.group]) n.place = { region: atlasPlaces.personGroups[n.group] };
    });
    // the same topic told in two places shares its location
    g.edges.filter((e) => e.type === 'sameAs').forEach((e) => { const a = g.nodes.get(e.from), b = g.nodes.get(e.to); if (a && b) { if (!a.place && b.place) a.place = b.place; if (!b.place && a.place) b.place = a.place; } });
    // a life-event belongs where its person or its work is set
    all.filter((n) => n.stream === 'work-timeline' && !n.place).forEach((n) => {
      const person = n.person && g.nodes.get(n.person);
      if (person && person.place) n.place = { region: person.place.region };
      else if (atlasPlaces.workDefaults[n.work]) n.place = { region: atlasPlaces.workDefaults[n.work] };
    });
    // a work covers the regions of what it is tied to, most frequent first
    all.filter((n) => n.type === 'work').forEach((w) => {
      const count = {};
      const episodes = new Set(all.filter((n) => n.type === 'episode' && n.work === w.id).map((n) => n.id));
      const studies = g.edges.filter((e) => e.type === 'supports' && (e.to === w.id || episodes.has(e.to))).map((e) => g.nodes.get(e.from));
      [...g.edges.filter((e) => e.from === w.id && ['happenedAt', 'features'].includes(e.type)).map((e) => g.nodes.get(e.to)), ...new Set(studies)].filter((n) => n && n.place)
        .forEach((n) => { count[n.place.region] = (count[n.place.region] || 0) + 1; });
      const regions = Object.keys(count).filter((r) => r !== 'region:global' && r !== 'region:cosmos').sort((a, b) => count[b] - count[a]);
      if (regions.length) w.regions = regions.slice(0, 4);
    });
    stats.places = { placed: [...g.nodes.values()].filter((n) => n.place).length, pinned: [...g.nodes.values()].filter((n) => n.place && n.place.at).length };
  }

  readJson('data/atlas/edges.json', []).forEach((e) => g.edge(e.from, e.to, e.type, { ...e, origin: 'curated' }));
  stats.bridges = g.edges.filter((e) => e.origin === 'curated' && e.type === 'bridges').length;
  stats.influences = g.edges.filter((e) => ['influences', 'contrasts'].includes(e.type)).length;
  return stats;
}
