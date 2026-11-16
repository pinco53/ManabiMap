// Galaxy coordinates, computed once at build time and then locked.
// A position already in data/atlas/layout.lock.json never moves; only new series and works get placed.
// Unit space: the centre family sits around (0,0); x is stretched so the galaxy reads as a tilted disc.
import { readJson, writeIfChanged } from './util.mjs';

const LOCK = 'data/atlas/layout.lock.json';
const STRETCH = 1.4, INNER = 0.36, RING = 0.92, OUTER = 1.34, GAP = 0.62;
const round = (n) => Math.round(n * 1000) / 1000;
const norm = (a) => ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
const gap = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const polar = (angle, radius) => [round(Math.cos(angle) * radius * STRETCH), round(Math.sin(angle) * radius)];

export function layout(g) {
  const lock = readJson(LOCK, {});
  const before = JSON.stringify(lock);
  const all = [...g.nodes.values()];
  const series = all.filter((n) => n.type === 'series');
  const centre = (all.find((n) => n.type === 'family' && n.centre) || {}).id;
  const ringOf = (s) => (s.family === centre ? 'inner' : s.status === 'planned' ? 'planned' : 'published');
  const worksOf = (s) => all.filter((n) => n.type === 'work' && n.series === s.id);
  const angleOf = (id) => Math.atan2(lock[id][1], lock[id][0] / STRETCH);

  // 0. A place written by hand in series.json ("pos": [x, y]) wins over everything computed below.
  series.forEach((s) => { if (!lock[s.id] && Array.isArray(s.pos) && s.pos.length === 2) lock[s.id] = [round(s.pos[0]), round(s.pos[1])]; });

  // 1. The centre family: its series share the inner ring, in the order they are listed.
  const inner = series.filter((s) => ringOf(s) === 'inner');
  inner.forEach((s, i) => { if (!lock[s.id]) lock[s.id] = polar(-Math.PI / 2 + (i / inner.length) * Math.PI * 2, INNER); });

  // 2. Every other series sits in the direction of the placed works it is connected to.
  //    Published series share one ring and planned ones the next, so each ring is spaced on its own.
  const taken = (ring) => series.filter((s) => ringOf(s) === ring && lock[s.id]).map((s) => angleOf(s.id));
  const free = (wanted, ring, spacing = ring === 'published' ? 1.25 : GAP) => {
    for (let step = 0; step < 60; step += 1) {
      const candidate = norm(wanted + (step % 2 ? -1 : 1) * Math.ceil(step / 2) * 0.11);
      if (taken(ring).every((a) => gap(a, candidate) >= spacing)) return candidate;
    }
    return spacing > 0.3 ? free(wanted, ring, spacing * 0.7) : norm(wanted);   // ring is filling up: accept closer neighbours
  };
  const placeWorks = (s) => {
    const own = worksOf(s), [cx, cy] = lock[s.id], base = Math.atan2(cy, cx / STRETCH), radius = own.length > 1 ? 0.045 + 0.014 * own.length : 0;
    own.forEach((w, i) => { if (!lock[w.id]) lock[w.id] = [round(cx + Math.cos(base + (i / own.length) * Math.PI * 2) * radius * STRETCH), round(cy + Math.sin(base + (i / own.length) * Math.PI * 2) * radius)]; });
  };
  inner.forEach(placeWorks);
  const pull = (s) => {
    const mine = new Set([s.id, ...all.filter((n) => n.series === s.id).map((n) => n.id)]);   // works, and media that precede a planned series
    const ends = g.edges.filter((e) => mine.has(e.from) !== mine.has(e.to)).map((e) => (mine.has(e.from) ? e.to : e.from)).filter((id) => lock[id] && g.nodes.get(id).type === 'work');
    if (!ends.length) return null;
    return Math.atan2(ends.reduce((sum, id) => sum + lock[id][1], 0), ends.reduce((sum, id) => sum + lock[id][0] / STRETCH, 0));
  };
  const place = (s, radius) => {
    if (lock[s.id]) return;
    const ring = ringOf(s), sibling = series.find((o) => o !== s && o.family && o.family === s.family && lock[o.id]);
    const used = taken(ring).sort((a, b) => a - b);
    const widest = used.length ? used.reduce((best, a, i) => { const next = i + 1 < used.length ? used[i + 1] : used[0] + Math.PI * 2; return next - a > best.size ? { size: next - a, at: a + (next - a) / 2 } : best; }, { size: 0, at: 0 }).at : -0.6;
    const wanted = sibling ? angleOf(sibling.id) + GAP : pull(s);
    // A sibling stays beside its family even when the ring is otherwise spaced widely.
    const beside = () => [0.8, -0.8].map((d) => angleOf(sibling.id) + d).sort((a, b) => Math.min(...used.map((u) => gap(u, b))) - Math.min(...used.map((u) => gap(u, a))))[0];   // the emptier side
    lock[s.id] = polar(sibling && ring === 'published' ? beside() : free(wanted === null ? widest : wanted, ring), radius);
  };
  // Series that already lean towards something are placed first; the rest fill the gaps.
  const leaning = (list) => [...list].sort((a, b) => (pull(a) === null) - (pull(b) === null));
  leaning(series.filter((s) => ringOf(s) === 'published')).forEach((s) => { place(s, RING); placeWorks(s); });
  leaning(series.filter((s) => ringOf(s) === 'planned')).forEach((s) => place(s, OUTER));

  // A planned series has no works yet, so its place stays provisional: shown, but not locked.
  const fixed = Object.fromEntries(Object.entries(lock).filter(([id]) => g.nodes.get(id) && g.nodes.get(id).status !== 'planned'));
  const changed = JSON.stringify(fixed) !== before;
  return { positions: lock, changed, save: () => writeIfChanged(LOCK, JSON.stringify(fixed, null, 1).replace(/\[\s+(-?[\d.]+),\s+(-?[\d.]+)\s+\]/g, '[$1, $2]') + '\n') };
}
