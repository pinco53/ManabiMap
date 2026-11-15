// Galaxy coordinates, computed once at build time and then locked.
// A position already in data/atlas/layout.lock.json never moves; only new series and works get placed.
// Unit space: the main series spirals around (0,0); x is stretched so the galaxy reads as a tilted disc.
import { readJson, writeIfChanged } from './util.mjs';

const LOCK = 'data/atlas/layout.lock.json';
const STRETCH = 1.4, RING = 0.86, OUTER = 1.12, GAP = 0.62;
const round = (n) => Math.round(n * 1000) / 1000;
const norm = (a) => ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
const gap = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const polar = (angle, radius) => [round(Math.cos(angle) * radius * STRETCH), round(Math.sin(angle) * radius)];

export function layout(g) {
  const lock = readJson(LOCK, {});
  const before = JSON.stringify(lock);
  const series = [...g.nodes.values()].filter((n) => n.type === 'series');
  const worksOf = (s) => [...g.nodes.values()].filter((n) => n.type === 'work' && n.series === s.id);
  const angleOf = (id) => (lock[id] ? Math.atan2(lock[id][1], lock[id][0] / STRETCH) : null);

  // 1. The first series keeps the centre, its works along a spiral in reading order.
  const home = series[0];
  if (!lock[home.id]) lock[home.id] = [0, 0];
  worksOf(home).forEach((w, i, all) => { if (!lock[w.id]) lock[w.id] = polar(i * 0.9 - 1.2, 0.13 + 0.36 * (i / Math.max(1, all.length - 1))); });

  // 2. Every other series sits in the direction of the placed works it is connected to.
  // Published series share the inner ring and planned ones the outer ring, so each ring is spaced on its own.
  let ring = 'published';
  const taken = () => series.filter((s) => s !== home && lock[s.id] && (s.status === 'planned') === (ring === 'planned')).map((s) => angleOf(s.id));
  const free = (wanted) => {
    for (let step = 0; step < 60; step += 1) {
      const candidate = norm(wanted + (step % 2 ? -1 : 1) * Math.ceil(step / 2) * 0.11);
      if (taken().every((a) => gap(a, candidate) >= GAP)) return candidate;
    }
    return norm(wanted);
  };
  const pull = (s) => {
    const mine = new Set([s.id, ...[...g.nodes.values()].filter((n) => n.series === s.id).map((n) => n.id)]);   // works, and media that precede a planned series
    const ends = g.edges.filter((e) => mine.has(e.from) !== mine.has(e.to)).map((e) => (mine.has(e.from) ? e.to : e.from)).filter((id) => lock[id] && id !== home.id);
    if (!ends.length) return null;
    return Math.atan2(ends.reduce((sum, id) => sum + lock[id][1], 0), ends.reduce((sum, id) => sum + lock[id][0] / STRETCH, 0));
  };
  const place = (s, radius) => {
    if (lock[s.id]) return;
    const sibling = series.find((o) => o !== s && o.family && o.family === s.family && lock[o.id]);
    const wanted = sibling ? angleOf(sibling.id) + GAP : pull(s);
    const fallback = taken().length ? taken().sort((a, b) => a - b).reduce((best, a, i, all) => { const next = i + 1 < all.length ? all[i + 1] : all[0] + Math.PI * 2; return next - a > best.size ? { size: next - a, at: a + (next - a) / 2 } : best; }, { size: 0, at: 0 }).at : -0.6;
    lock[s.id] = polar(free(wanted === null ? fallback : wanted), radius);
  };
  series.filter((s) => s !== home && s.status !== 'planned').forEach((s) => place(s, RING));
  ring = 'planned';
  // Series that already lean towards something are placed first; the rest fill the gaps.
  series.filter((s) => s !== home && s.status === 'planned').sort((a, b) => (pull(a) === null) - (pull(b) === null)).forEach((s) => place(s, OUTER));

  // 3. Works gather around their series.
  series.filter((s) => s !== home).forEach((s) => {
    const all = worksOf(s), [cx, cy] = lock[s.id], base = angleOf(s.id), radius = all.length > 1 ? 0.05 + 0.014 * all.length : 0;
    all.forEach((w, i) => { if (!lock[w.id]) lock[w.id] = [round(cx + Math.cos(base + (i / all.length) * Math.PI * 2) * radius * STRETCH), round(cy + Math.sin(base + (i / all.length) * Math.PI * 2) * radius)]; });
  });

  // A planned series has no works yet, so its place stays provisional: shown, but not locked.
  const fixed = Object.fromEntries(Object.entries(lock).filter(([id]) => g.nodes.get(id)?.status !== 'planned'));
  const changed = JSON.stringify(fixed) !== before;
  return { positions: lock, changed, save: () => writeIfChanged(LOCK, JSON.stringify(fixed, null, 1).replace(/\[\s+(-?[\d.]+),\s+(-?[\d.]+)\s+\]/g, '[$1, $2]') + '\n') };
}
