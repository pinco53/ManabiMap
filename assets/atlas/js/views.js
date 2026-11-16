// The three canvas views of the Atlas. Each draws the same graph from a different angle
// and reports what is under the pointer; all changes go through the store.
import { timePosition, yearAt, yearLabel, riverScale, PRESENT } from './graph.js';

const FONT = '"Noto Sans JP", "Inter", sans-serif', SERIF = '"Zen Old Mincho", serif';
const hash = (text, salt = 1) => { let h = 2166136261 ^ salt; for (let i = 0; i < text.length; i += 1) h = Math.imul(h ^ text.charCodeAt(i), 16777619); return ((h >>> 0) % 10000) / 10000; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rgba = (hex, alpha) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${alpha})`; };
const clip = (text, max) => (text.length > max ? text.slice(0, max - 1) + '…' : text);

export function createViews(canvas, atlas, store, env) {
  const ctx = canvas.getContext('2d');
  let w = 1, h = 1, backdrop = null, hits = [], hover = null, labels = [], dirty = true, pulse = 0;
  const ease = env.reducedMotion ? 1 : 0.14;
  const glide = new Map();                       // id -> current on-screen position, so shared nodes travel between layouts
  const toward = (id, x, y) => { const p = glide.get(id) || { x, y }; p.x += (x - p.x) * ease; p.y += (y - p.y) * ease; if (Math.abs(p.x - x) + Math.abs(p.y - y) > 0.4) dirty = true; glide.set(id, p); return p; };
  const state = () => store.state;
  // Space taken by the lens panel (left) and the detail card (right); views centre themselves in what is left.
  const pad = { l: 0, r: 0, b: 0 };
  const room = () => ({ x0: pad.l, x1: w - pad.r, cx: (pad.l + w - pad.r) / 2, cw: Math.max(200, w - pad.l - pad.r), cy: (h - pad.b) / 2, ch: Math.max(200, h - pad.b) });
  const inLens = (n) => !state().lens || (n.lenses || []).includes(state().lens);

  function hit(id, x, y, r, rect) { hits.push({ id, x, y, r, rect }); }
  function label(text, x, y, { size = 11, color = '#e8f0ff', weight = 500, align = 'left', font = FONT, force = false, max = 22 } = {}) {
    const shown = clip(text, max);
    ctx.font = `${weight} ${size}px ${font}`;
    const width = ctx.measureText(shown).width, left = align === 'center' ? x - width / 2 : align === 'right' ? x - width : x;
    const box = [left - 3, y - size, left + width + 3, y + 4];
    if (!force && (box[0] < 4 || box[2] > w - 4 || labels.some((b) => box[0] < b[2] && box[2] > b[0] && box[1] < b[3] && box[3] > b[1]))) return false;
    labels.push(box);
    ctx.textAlign = align; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(8,8,13,.82)'; ctx.strokeText(shown, x, y); ctx.fillStyle = color; ctx.fillText(shown, x, y);
    return true;
  }
  function star(x, y, r, color, alpha = 1) {
    ctx.beginPath(); ctx.arc(x, y, r * 3.4, 0, 7); ctx.fillStyle = rgba(color, 0.1 * alpha); ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = rgba(color, alpha); ctx.fill();
  }
  function ring(x, y, r, color, alpha, dash) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.setLineDash(dash || []); ctx.strokeStyle = rgba(color, alpha); ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]); }
  function arc(a, b, color, alpha, width = 1, dash) {
    const mx = (a.x + b.x) / 2 - (b.y - a.y) * 0.16, my = (a.y + b.y) / 2 + (b.x - a.x) * 0.16;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx, my, b.x, b.y); ctx.setLineDash(dash || []); ctx.strokeStyle = rgba(color, alpha); ctx.lineWidth = width; ctx.stroke(); ctx.setLineDash([]);
  }

  // ------------------------------------------------------------------ galaxy: where things are
  const galaxy = (() => {
    const cam = { x: 0, y: 0, z: 1 }, target = { x: 0, y: 0, z: 1 };
    const zoomOf = (d) => (d < 34 ? 0.86 + (d / 33) * 0.3 : d < 70 ? 1.15 + ((d - 34) / 36) * 1.25 : 2.5 + ((d - 70) / 30) * 2.4);
    const unit = () => Math.min(w / 4.3, h / 3.3);
    const screen = (p) => ({ x: room().cx + (p[0] - cam.x) * unit() * cam.z, y: room().cy + (p[1] - cam.y) * unit() * cam.z });
    const media = new Map();
    let counted = false;
    function aim() {
      const s = state(), n = atlas.get(s.focus);
      target.z = zoomOf(s.depth);
      const anchor = n && (n.pos || (n.work && atlas.get(n.work).pos) || null);
      if (s.depth < 34 || !anchor) { target.x = 0; target.y = 0; } else { target.x = anchor[0]; target.y = anchor[1]; }
    }
    function draw() {
      const s = state(), stage = s.depth < 34 ? 'far' : s.depth < 70 ? 'mid' : 'near';
      ['x', 'y', 'z'].forEach((k) => { cam[k] += (target[k] - cam[k]) * ease; if (Math.abs(target[k] - cam[k]) > 0.001) dirty = true; });
      if (!counted && atlas.loaded.has('detail')) { counted = true; atlas.all('media').forEach((m) => atlas.links(m.id, ['deepens']).forEach((l) => media.set(l.other, (media.get(l.other) || 0) + 1))); }
      const works = atlas.all('work'), scale = unit() * cam.z, focus = atlas.get(s.focus);
      const near = new Map(focus ? atlas.links(focus.id, ['bridges', 'next', 'relatesTo']).filter((l) => atlas.get(l.other).pos).map((l) => [l.other, l.edge]) : []);
      // what a non-work focus gathers: the steps of a route, or the works of a question, concept, series…
      const member = focus && focus.type !== 'work' ? new Set(focus.type === 'route' ? focus.steps : atlas.members(focus.id)) : null;

      atlas.all('family').forEach((family) => {       // a programme or a tradition: a soft outline around its series
        const own = atlas.all('series').filter((x) => x.family === family.id && x.pos && x.status !== 'planned');
        if (own.length < 2) return;
        const pts = own.map((x) => screen(x.pos)), cx = pts.reduce((a, p) => a + p.x, 0) / pts.length, cy = pts.reduce((a, p) => a + p.y, 0) / pts.length;
        const rx = Math.max(...pts.map((p) => Math.abs(p.x - cx))) + 0.2 * scale, ry = Math.max(...pts.map((p) => Math.abs(p.y - cy))) + 0.15 * scale;
        ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.fillStyle = 'rgba(220,233,255,.022)'; ctx.fill(); ctx.setLineDash([1, 6]); ctx.strokeStyle = 'rgba(220,233,255,.2)'; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
        if (stage !== 'near') label('── ' + family.title.ja + ' ──', cx, cy + ry + 17, { size: stage === 'far' ? 12 : 10, color: 'rgba(220,233,255,.7)', align: 'center', font: SERIF, force: stage === 'far' });
      });
      atlas.all('series').forEach((sr) => {
        if (!sr.pos) return;
        const own = works.filter((x) => x.series === sr.id), p = screen(sr.pos), planned = sr.status === 'planned';
        const r = (planned ? 0.1 : 0.08 + 0.02 * own.length) * scale, color = atlas.color(sr.id);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 1.5);
        glow.addColorStop(0, rgba(color, planned ? 0.03 : 0.11)); glow.addColorStop(1, rgba(color, 0));
        ctx.fillStyle = glow; ctx.beginPath(); ctx.ellipse(p.x, p.y, r * 1.9, r * 1.5, 0, 0, 7); ctx.fill();
        if (planned) ring(p.x, p.y, r, color, 0.45, [3, 5]);
        if (sr.id === s.focus) ring(p.x, p.y, r * 1.15 + 6, color, 0.8);
        const big = stage === 'far';
        label(sr.title.ja, p.x, p.y - r - (planned ? 8 : 12), { size: big ? 14 : 11, weight: 600, color: rgba(color, big ? 1 : 0.6), align: 'center', force: big, font: SERIF });
        if (big) label(planned ? '構想中' + (sr.mediaCount ? `・先行${sr.mediaCount}本` : '') : own.length + '作品', p.x, p.y - r + (planned ? 6 : 2), { size: 10, color: rgba(color, 0.7), align: 'center', force: true });
        if (big || planned) hit(sr.id, p.x, p.y, Math.max(26, planned ? r : r * 0.9));
      });

      if (stage !== 'far') works.forEach((n) => {       // the reading and listening that orbits each work
        const count = Math.min(media.get(n.id) || 0, 34), p = screen(n.pos), color = atlas.color(n.id);
        for (let i = 0; i < count; i += 1) {
          const a = hash(n.id, i) * 6.283 + pulse * 0.02 * (0.4 + hash(n.id, i + 99)), r = (0.02 + hash(n.id, i + 7) * 0.05) * scale;
          ctx.fillStyle = rgba(color, inLens(n) ? 0.34 : 0.08); ctx.fillRect(p.x + Math.cos(a) * r * 1.4, p.y + Math.sin(a) * r, 1.3, 1.3);
        }
        if (count) dirty = dirty || !env.reducedMotion;
      });

      const at = (id) => { const n = atlas.get(id); return n && n.pos ? screen(n.pos) : null; };
      if (s.path) for (let i = 1; i < s.path.length; i += 1) { const a = at(s.path[i - 1]), b = at(s.path[i]); if (a && b) arc(a, b, '#ffe7a8', 0.8, 2); }
      if (focus && focus.pos) [...near].sort((a, b) => (a[1].type === 'bridges' ? 0 : 1) - (b[1].type === 'bridges' ? 0 : 1)).slice(0, 12).forEach(([id, edge]) => {
        arc(screen(focus.pos), at(id), atlas.color(id), edge.type === 'bridges' ? 0.75 : 0.3, edge.type === 'bridges' ? 1.4 : 1, edge.type === 'bridges' ? null : [2, 5]);
      });

      works.forEach((n) => {
        const p = screen(n.pos), color = atlas.color(n.id), isFocus = n.id === s.focus, linked = near.has(n.id) || (member && member.has(n.id));
        const lit = inLens(n) && (!member || member.has(n.id)), alpha = lit ? 1 : 0.2;
        star(p.x, p.y, stage === 'far' ? 2.1 : isFocus ? 6 : linked ? 4.6 : 3.6, color, alpha);
        if (env.visited.has(n.id)) ring(p.x, p.y, stage === 'far' ? 4.5 : 8, '#ffffff', 0.5 * alpha);
        if (isFocus) ring(p.x, p.y, 13 + Math.sin(pulse * 0.06) * 2, '#ffffff', 0.85);
        if (s.start === n.id) ring(p.x, p.y, 18, '#ffe7a8', 0.9, [2, 4]);
        hit(n.id, p.x, p.y, stage === 'far' ? 9 : 15);
        n._screen = p; n._lit = lit; n._rank = isFocus ? 0 : n.id === hover ? 1 : linked ? 2 : lit ? 3 : 9;
      });
      [...works].sort((a, b) => a._rank - b._rank).forEach((n) => {
        if (stage === 'far' && n._rank > 1) return;
        if (n._rank === 9) return;
        const text = (n.number ? n.number + '  ' : '') + n.title.ja;
        label(text, n._screen.x + 11, n._screen.y + 4, { size: n._rank === 0 ? 13 : 11, weight: n._rank === 0 ? 700 : 500, color: n._rank < 3 ? '#ffffff' : 'rgba(225,232,246,.78)', force: n._rank === 0, max: n._rank < 2 ? 30 : 16 });
      });

      if (stage === 'near' && focus && focus.type === 'work') satellites(focus);
      dirty = dirty || !env.reducedMotion && Boolean(focus);
    }
    function satellites(focus) {              // what one work is made of: concepts, questions, people, events, episodes
      const c = screen(focus.pos);
      const groups = [
        { ids: [...atlas.concepts(focus.id).slice(0, 6), ...atlas.bigQuestions(focus.id).slice(0, 4)], r: 92 },
        { ids: [...atlas.links(focus.id, ['features']).map((l) => l.other).filter((id) => atlas.get(id).type === 'person').slice(0, 3),
          ...atlas.sameEra(focus.id, 4), ...atlas.all('episode').filter((e) => e.work === focus.id).slice(0, 10).map((e) => e.id)], r: 168 }
      ];
      groups.forEach((group, gi) => group.ids.forEach((id, i) => {
        const a = (i / group.ids.length) * 6.283 + gi * 0.5 - 1.2, p = toward('sat:' + id, c.x + Math.cos(a) * group.r * 1.35, c.y + Math.sin(a) * group.r), n = atlas.get(id), color = atlas.color(id);
        ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(p.x, p.y); ctx.strokeStyle = rgba(color, 0.14); ctx.lineWidth = 1; ctx.stroke();
        star(p.x, p.y, n.type === 'episode' ? 2 : 3, color, id === state().focus ? 1 : 0.85);
        label(atlas.title(id), p.x + (Math.cos(a) < 0 ? -8 : 8), p.y + 4, { size: 10, color: rgba(color, 0.95), align: Math.cos(a) < 0 ? 'right' : 'left', max: 15 });
        hit(id, p.x, p.y, 12);
      }));
    }
    return {
      aim, draw,
      wheel: (e) => store.set({ depth: clamp(state().depth + e.deltaY * -0.04, 0, 100) }, { push: false }),
      drag: (dx, dy) => { target.x -= dx / (unit() * cam.z); target.y -= dy / (unit() * cam.z); },
      zoom: (step) => store.set({ depth: clamp(state().depth + step * 12, 0, 100) }, { push: false })
    };
  })();

  // ------------------------------------------------------------------ river: when things happened
  const river = (() => {
    const cam = { c: 0.5, z: 1 }, target = { c: 0.5, z: 1 };
    let open = null, hoverX = null, rows = [], ruler = null;
    // Position of a year on the current ruler: 0 = left edge, 1 = right edge.
    const linear = () => riverScale(state().scale).from !== undefined;
    const pos = (year) => { const s = riverScale(state().scale); return s.from === undefined ? timePosition(year) / 0.99 : (year - s.from) / (s.to - s.from); };
    const inv = (p) => { const s = riverScale(state().scale); return s.from === undefined ? yearAt(p * 0.99) : s.from + p * (s.to - s.from); };
    const nice = (raw) => { const power = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / power; return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * power; };
    const gutter = () => (w < 700 ? 0 : 150);
    const span = () => Math.max(160, w - gutter() - pad.r);
    const sx = (p) => gutter() + span() * (0.5 + (p - cam.c) * cam.z);
    const px = (x) => cam.c + ((x - gutter()) / span() - 0.5) / cam.z;
    const bound = () => { target.z = clamp(target.z, 1, linear() ? 60 : 900); const half = 0.5 / target.z; target.c = clamp(target.c, half - 0.015, 1.015 - half); };
    const LOG_TICKS = [-13.8e9, -1e10, -1e9, -1e8, -1e7, -1e6, -1e5, -2e4, -1e4, -5000, -3000, -2000, -1000, -500, 1, 500, 1000, 1300, 1500, 1600, 1700, 1800, 1850, 1900, 1920, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2026, 2060, 2120];
    function regionLanes() {            // the same river cut by place instead of by series
      const events = atlas.all('event').filter((e) => e.place);
      return atlas.all('region').map((region) => ({ key: region.id, label: region.title.ja, region: region.id, weight: 1, events: events.filter((e) => e.place.region === region.id), byRegion: true }))
        .filter((lane) => lane.events.length).map((lane) => ({ ...lane, weight: 1.1 + Math.min(2.4, Math.sqrt(lane.events.length) * 0.22) }));
    }
    function lanes() {
      if (state().lanes === 'region') return regionLanes();
      const events = atlas.all('event'), series = atlas.all('series').filter((s) => s.status !== 'planned');
      const list = [{ key: 'deep-time', label: '138億年の年表', weight: 3, events: events.filter((e) => e.stream === 'deep-time') }];
      series.forEach((s) => {
        const works = atlas.all('work').filter((x) => x.series === s.id && x.time && x.time.length), isOpen = open === s.id;
        list.push({ key: s.id, label: s.title.ja, series: s.id, works, isOpen, weight: isOpen ? 1.4 + works.length * 0.52 : 1.5,
          events: isOpen ? events.filter((e) => e.stream === 'work-timeline' && atlas.seriesOf(e.id) === s.id) : [] });
      });
      list.push({ key: 'philosophy-history', label: '哲学の歴史', weight: 1.7, events: events.filter((e) => e.stream === 'philosophy-history') });
      list.push({ key: 'edu-history', label: '教育の歴史', weight: 1.7, events: events.filter((e) => e.stream === 'edu-history') });
      return list;
    }
    function aim(patch = {}) {
      const s = state(), series = atlas.seriesOf(s.focus);
      if (ruler !== s.scale) { ruler = s.scale; target.c = 0.5; target.z = 1; cam.c = 0.5; cam.z = 1; }
      if (!('focus' in patch || 'view' in patch || 'scale' in patch)) return;
      if (series && atlas.get(series).status !== 'planned' && atlas.get(s.focus).type !== 'series') open = series;
      const t = atlas.time(s.focus);
      if (!t) return;
      if (linear() && t.end < riverScale(s.scale).from) return;     // outside this ruler: leave the view where it is
      const a = pos(t.start), b = pos(Math.min(t.end, PRESENT + 150)), wide = Math.max(b - a, 0.0004);
      if (!linear() && wide * target.z * span() < 90) target.z = Math.min(900, 220 / (wide * span()));      // on the log ruler, zoom until it reads; a linear ruler keeps its honest size
      const half = 0.5 / target.z;
      if (a < target.c - half * 0.9 || b > target.c + half * 0.9) target.c = (a + b) / 2;
      bound();
    }
    function draw() {
      ['c', 'z'].forEach((k) => { cam[k] += (target[k] - cam[k]) * ease; if (Math.abs(target[k] - cam[k]) > 0.0002) dirty = true; });
      const s = state(), top = w < 700 ? 150 : 146, bottom = h - 32, all = lanes(), total = all.reduce((sum, l) => sum + l.weight, 0), gut = gutter();
      const nowX = sx(pos(PRESENT));
      ctx.fillStyle = 'rgba(120,150,210,.05)'; ctx.fillRect(nowX, top, w - nowX, bottom - top);
      const hoverYear = hoverX === null ? null : inv(px(hoverX)), tolerance = hoverX === null ? 0 : Math.abs(inv(px(hoverX + 7)) - inv(px(hoverX - 7))) / 2;
      const during = (t) => hoverYear !== null && t.start - tolerance <= hoverYear && t.end + tolerance >= hoverYear;
      let y = top, together = 0;
      rows = [];
      const spot = new Map(), focusNode = atlas.get(s.focus);
      // A concept in focus lights up its thread through time; everything else steps back.
      const thread = focusNode && focusNode.type === 'concept' ? atlas.thread(focusNode.id) : null, inThread = thread && new Set(thread);
      const ties = focusNode && ['event', 'person'].includes(focusNode.type) ? atlas.lineage(focusNode.id) : [];
      const tied = new Set(ties.map((x) => x.id));
      const fade = (id) => (inThread && !inThread.has(id) ? 0.22 : 1);
      all.forEach((lane) => {
        const height = ((bottom - top) * lane.weight) / total, color = lane.region ? atlas.color(lane.region) : lane.series ? atlas.color(lane.series) : atlas.color((lane.events[0] || {}).id);
        ctx.fillStyle = 'rgba(255,255,255,.035)'; ctx.fillRect(0, y, w, 1);
        rows.push({ key: lane.key, y, height, series: lane.series });
        const rowH = lane.works ? (lane.isOpen ? (height - 14) / Math.max(1, lane.works.length) : lane.byRegion ? 5 : (height - 12) / 3) : 0;
        (lane.works || []).forEach((n, i) => {
          const t = n.time[0], a = Math.max(-40, sx(pos(t.start))), b = Math.min(w + 40, sx(pos(t.end))), by = y + 8 + (lane.isOpen ? i : i % 3) * rowH + rowH / 2;
          const isFocus = n.id === s.focus, lit = inLens(n), same = during(t), alpha = (lit ? 1 : 0.22) * (hoverYear === null || same ? 1 : 0.45) * fade(n.id), barColor = lane.byRegion ? atlas.color(n.id) : color;
          spot.set(n.id, { x: clamp(a, gut + 6, w - pad.r - 6), y: by });
          if (same) together += 1;
          ctx.fillStyle = rgba(barColor, (isFocus ? 0.95 : 0.5) * alpha); ctx.beginPath(); ctx.roundRect(a, by - (isFocus ? 3.5 : 2.5), Math.max(4, b - a), isFocus ? 7 : 5, 3); ctx.fill();
          if (env.visited.has(n.id)) { ctx.fillStyle = '#fff'; ctx.fillRect(Math.max(a, 0), by - 1, 3, 2); }
          hit(n.id, 0, 0, 0, [a, by - 7, Math.max(a + 8, b), by + 7]);
          if (lane.isOpen || isFocus || n.id === hover) label((n.number ? n.number + ' ' : '') + n.title.ja, Math.max(a + 4, gut + 8), by - 5, { size: 10, color: rgba('#ffffff', (isFocus ? 1 : 0.72) * alpha), weight: isFocus ? 700 : 500, force: isFocus, max: 26 });
        });
        ctx.save(); ctx.beginPath(); ctx.rect(gut, y, w - gut, height); ctx.clip();
        const band = lane.byRegion ? [y + 22, y + height - 8] : lane.works ? (lane.isOpen ? [y + height - 12, y + height - 4] : [y + height, y + height]) : [y + 12, y + height - 10];
        lane.events.filter((e) => e.time.length).map((e) => ({ e, x: sx(pos((e.time[0].start + Math.min(e.time[0].end, PRESENT + 150)) / 2)) })).filter((d) => d.x > -20 && d.x < w + 20)
          .sort((a, b) => Number(b.e.id === s.focus) - Number(a.e.id === s.focus) || Number(Boolean(b.e.core)) - Number(Boolean(a.e.core)) || a.x - b.x).forEach(({ e, x }) => {
            const minor = !linear() && (lane.key === 'deep-time' || lane.byRegion) && !e.core && cam.z < 2.4 && e.id !== s.focus && !tied.has(e.id) && !(inThread && inThread.has(e.id));
            if (minor) return;
            const ey = band[0] + (band[1] - band[0]) * hash(e.id), isFocus = e.id === s.focus, same = during(e.time[0]), lit = inLens(e) || lane.key !== 'deep-time';
            const alpha = (lit ? 1 : 0.2) * (hoverYear === null || same ? 1 : 0.4) * fade(e.id), dot = lane.byRegion ? atlas.color(e.id) : color, marked = tied.has(e.id) || (inThread && inThread.has(e.id));
            spot.set(e.id, { x, y: ey });
            if (same) together += 1;
            star(x, ey, isFocus ? 5 : marked ? 4 : e.core ? 3.2 : 2.2, dot, alpha);
            if (isFocus) ring(x, ey, 10, '#ffffff', 0.9);
            hit(e.id, x, ey, 9);
            if (!lane.works || lane.byRegion || isFocus || marked || e.id === hover) label(e.title.ja, x + 8, ey + 4, { size: 10, color: rgba('#e8f0ff', (isFocus || same || marked ? 1 : 0.7) * alpha), force: isFocus || marked || e.id === hover, max: isFocus ? 30 : 14 });
          });
        ctx.restore();
        if (gut) { ctx.fillStyle = 'rgba(9,10,17,.9)'; ctx.fillRect(0, y + 1, gut, height - 1); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(gut, y, 1, height); }
        label((lane.works && !lane.byRegion ? (lane.isOpen ? '▾ ' : '▸ ') : '') + lane.label, 14, y + 17, { size: 12, weight: 600, color: rgba(color, 0.95), force: true, font: SERIF });
        y += height;
      });
      // causes and consequences of the event in focus, and the thread of a concept
      const here = spot.get(s.focus);
      if (here) ties.forEach((tie) => { const there = spot.get(tie.id); if (there) arc(tie.before ? there : here, tie.before ? here : there, tie.contrast ? '#f29bb5' : '#ffe7a8', 0.85, 1.5, tie.contrast ? [3, 4] : null); });
      if (thread) { const pts = thread.filter((id) => atlas.get(id).type === 'event').map((id) => spot.get(id)).filter(Boolean); ctx.beginPath(); pts.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.strokeStyle = rgba(atlas.color(focusNode.id), 0.55); ctx.lineWidth = 1.3; ctx.stroke(); }
      ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(0, bottom, w, 1);
      let last = -999;
      let ticks = LOG_TICKS;
      if (linear()) { const a = inv(px(gut)), b = inv(px(w - pad.r)), step = nice((b - a) / Math.max(3, Math.floor((w - gut - pad.r) / 120))); ticks = []; for (let y = Math.ceil(a / step) * step; y <= b; y += step) ticks.push(Math.abs(y) < step / 2 ? 1 : y); }
      ticks.forEach((year) => { const x = sx(pos(year)); if (x < gut + 20 || x > w - pad.r - 20 || x - last < 78) return; last = x; ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(x, bottom - 4, 1, 8); ctx.font = `500 10px ${FONT}`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(200,212,235,.75)'; ctx.fillText(year === 2026 ? '現在' : year === 1 ? '紀元' : yearLabel(year), x, bottom + 19); });
      if (nowX > gut + 30 && nowX < w - pad.r - 10) { ctx.fillStyle = 'rgba(255,231,168,.55)'; ctx.fillRect(nowX, top, 1, bottom - top + 4); label('現在', nowX - 4, top + 12, { size: 10, color: '#ffe7a8', align: 'right', force: true }); }
      if (hoverX !== null) {
        ctx.fillStyle = 'rgba(255,231,168,.5)'; ctx.fillRect(hoverX, top, 1, bottom - top);
        label(yearLabel(hoverYear) + (together ? `　同じ頃 ${together}件` : ''), clamp(hoverX, gut + 90, w - pad.r - 90), top - 8, { size: 11, weight: 600, color: '#ffe7a8', align: 'center', force: true });
      }
    }
    return {
      aim, draw,
      wheel: (e, x) => { const before = px(x); target.z *= Math.exp(e.deltaY * -0.0016); bound(); target.c = before - ((x - gutter()) / span() - 0.5) / target.z; bound(); },
      drag: (dx) => { target.c -= dx / (span() * cam.z); bound(); },
      zoom: (step) => { target.z *= step > 0 ? 1.5 : 1 / 1.5; bound(); },
      move: (x) => { hoverX = x !== null && x > gutter() && x < w - pad.r ? x : null; },
      click: (x, y) => { const row = rows.find((r) => r.series && x < gutter() && y >= r.y && y < r.y + r.height); if (!row) return false; open = open === row.series ? null : row.series; return true; }
    };
  })();

  // ------------------------------------------------------------------ constellation: why it matters
  const stars = (() => {
    function centre() {
      const s = state(), focus = atlas.get(s.focus);
      if (s.anchor && atlas.get(s.anchor)) return s.anchor;
      if (focus && ((focus.type === 'question' && focus.level === 'big') || focus.type === 'concept')) return focus.id;
      if (focus && focus.type === 'work') return atlas.bigQuestions(focus.id)[0] || 'q:thinking';
      return 'q:thinking';
    }
    function draw() {
      const s = state(), id = centre(), c = atlas.get(id), area = room(), cx = area.cx, cy = area.cy + 10, wideArea = area.cw > area.ch * 1.15, base = Math.min(area.cw * (wideArea ? 0.2 : 0.3), area.ch * 0.27);
      const members = atlas.members(id).map((m) => atlas.get(m));
      const order = (n) => (s.byTime ? (atlas.time(n.id) || { start: 9e9 }).start : atlas.all('series').findIndex((x) => x.id === n.series) * 1000 + members.indexOf(n));
      members.sort((a, b) => order(a) - order(b));
      const same = c.type === 'question' ? atlas.all('question').filter((q) => q.level === 'big') : atlas.all('concept');
      const around = same.filter((o) => o.id !== id).map((o) => ({ o, shared: atlas.members(o.id).filter((m) => members.some((x) => x.id === m)) })).filter((x) => x.shared.length)
        .sort((a, b) => b.shared.length - a.shared.length).slice(0, 9);
      const focusLinks = new Set(s.focus ? around.filter((x) => x.shared.includes(s.focus)).map((x) => x.o.id) : []);

      around.forEach((x, i) => {
        const a = (i / around.length) * 6.283 - 0.5, p = toward(x.o.id, cx + Math.cos(a) * base * 1.6 * (wideArea ? 1.3 : 0.8), cy + Math.sin(a) * base * 1.5), color = atlas.color(x.o.id), on = focusLinks.has(x.o.id);
        if (on) { const m = glide.get(s.focus); if (m) arc(m, p, color, 0.55, 1.2); }
        star(p.x, p.y, 2.5 + Math.min(4, x.shared.length * 0.5), color, on ? 1 : 0.55);
        label(atlas.title(x.o.id), p.x, p.y + 20, { size: 11, color: rgba(color, on ? 1 : 0.75), align: 'center', max: 17, font: SERIF });
        label(`共通 ${x.shared.length}`, p.x, p.y + 34, { size: 9, color: rgba(color, 0.55), align: 'center' });
        hit(x.o.id, p.x, p.y, 22);
      });
      members.forEach((n, i) => {
        const a = (i / members.length) * 6.283 - 1.5708, r = base * (members.length > 12 && i % 2 ? 1.12 : 0.86), p = toward(n.id, cx + Math.cos(a) * r * (wideArea ? 1.25 : 0.82), cy + Math.sin(a) * r);
        const color = atlas.color(n.id), isFocus = n.id === s.focus, lit = inLens(n);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.strokeStyle = rgba(color, isFocus ? 0.5 : 0.1); ctx.lineWidth = 1; ctx.stroke();
        star(p.x, p.y, isFocus ? 6 : 4, color, lit ? 1 : 0.25);
        if (env.visited.has(n.id)) ring(p.x, p.y, 8.5, '#ffffff', 0.5);
        if (isFocus) ring(p.x, p.y, 13 + Math.sin(pulse * 0.06) * 2, '#ffffff', 0.85);
        const left = Math.cos(a) < -0.2;
        label(n.title.ja, p.x + (left ? -11 : 11), p.y + 4, { size: isFocus ? 12 : 11, weight: isFocus ? 700 : 500, color: rgba('#ffffff', lit ? (isFocus ? 1 : 0.85) : 0.3), align: left ? 'right' : 'left', force: isFocus, max: 18 });
        if (s.byTime) label(atlas.timeText(n.id).slice(0, 14), p.x + (left ? -11 : 11), p.y + 17, { size: 9, color: rgba(color, 0.7), align: left ? 'right' : 'left' });
        hit(n.id, p.x, p.y, 15);
      });
      const text = atlas.title(id), lines = text.length > 17 ? [text.slice(0, Math.ceil(text.length / 2)), text.slice(Math.ceil(text.length / 2))] : [text];
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.62); glow.addColorStop(0, rgba(atlas.color(id), 0.2)); glow.addColorStop(1, rgba(atlas.color(id), 0));
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, base * 0.62, 0, 7); ctx.fill();
      lines.forEach((line, i) => label(line, cx, cy + (i - (lines.length - 1) / 2) * 22 + 5, { size: w < 700 ? 13 : 16, weight: 600, color: '#fff7dc', align: 'center', force: true, max: 40, font: SERIF }));
      label(`${c.type === 'question' ? '問い' : '概念'}　${members.length}作品・${new Set(members.map((m) => m.series)).size}シリーズ`, cx, cy + lines.length * 13 + 22, { size: 10, color: 'rgba(255,247,220,.65)', align: 'center', force: true });
      hit(id, cx, cy, 34);
      dirty = dirty || (!env.reducedMotion && Boolean(s.focus));
    }
    return { aim() {}, draw, centre, wheel() {}, drag() {}, zoom() {} };
  })();

  // ------------------------------------------------------------------ world: where it happened
  const world = (() => {
    // Very coarse coastlines ([lng, lat]); enough to recognise the continents, not a map to measure on.
    const LAND = [
      [[-168,66],[-156,71],[-128,70],[-110,68],[-95,72],[-82,73],[-78,62],[-65,60],[-56,52],[-66,45],[-70,42],[-76,35],[-81,31],[-80,25],[-84,30],[-90,29],[-97,26],[-97,20],[-91,18],[-88,21],[-87,16],[-83,10],[-79,8],[-83,8],[-86,12],[-92,15],[-97,16],[-105,20],[-110,23],[-113,30],[-117,33],[-121,35],[-124,41],[-124,48],[-130,54],[-140,60],[-152,59],[-165,55],[-160,60],[-166,62]],
      [[-55,60],[-44,60],[-25,70],[-20,76],[-30,82],[-55,82],[-70,77],[-55,70]],
      [[-79,8],[-72,12],[-62,10],[-52,5],[-50,0],[-37,-5],[-35,-9],[-39,-15],[-41,-22],[-48,-27],[-54,-34],[-58,-38],[-65,-41],[-68,-50],[-69,-54],[-74,-52],[-74,-44],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,0],[-78,3]],
      [[-17,15],[-16,21],[-10,29],[-6,35],[10,37],[11,33],[20,31],[32,31],[35,24],[38,18],[43,12],[51,12],[48,5],[40,-3],[39,-10],[35,-20],[33,-26],[27,-34],[19,-35],[15,-27],[12,-17],[13,-8],[9,-1],[9,4],[4,6],[-4,5],[-10,5],[-15,10]],
      [[-9,37],[-9,43],[-1,44],[-4,48],[3,51],[8,54],[9,57],[6,58],[5,62],[14,68],[25,71],[40,67],[44,66],[60,69],[70,73],[90,76],[105,78],[113,74],[130,72],[160,70],[180,68],[178,64],[163,60],[156,51],[142,54],[135,44],[129,41],[126,35],[122,39],[118,38],[122,31],[120,26],[113,22],[108,20],[107,11],[103,9],[100,13],[99,8],[103,1],[98,8],[94,16],[91,22],[86,21],[80,15],[78,8],[73,16],[72,21],[67,24],[57,25],[56,27],[50,30],[48,29],[51,24],[56,24],[59,22],[55,17],[45,13],[43,13],[39,21],[35,28],[34,31],[36,36],[30,36],[27,37],[26,40],[23,40],[24,37],[21,37],[19,42],[13,45],[18,40],[16,38],[12,42],[9,44],[3,43],[0,39],[-5,36]],
      [[-5,50],[1,51],[0,53],[-2,56],[-3,58],[-6,57],[-3,54],[-5,52]],
      [[130,31],[132,34],[136,35],[140,35],[141,38],[141,41],[145,44],[141,45],[140,41],[137,37],[133,35.5],[130,33]],
      [[114,-22],[114,-34],[118,-35],[124,-33],[131,-31],[136,-35],[140,-38],[147,-38],[150,-36],[153,-28],[146,-19],[142,-11],[141,-17],[136,-12],[130,-12],[125,-14],[121,-19]],
      [[173,-35],[178,-38],[175,-41],[171,-46],[167,-46],[170,-43],[174,-40]], [[44,-13],[50,-15],[47,-25],[44,-22]],
      [[95,5],[104,-4],[106,-6],[114,-8],[106,-7],[100,-1]], [[109,1],[117,7],[119,1],[116,-4],[110,-2]]
    ];
    const cam = { x: 0.5, y: 0.5, z: 1 }, target = { x: 0.5, y: 0.5, z: 1 };
    const TOP = 80, BOTTOM = -58;
    const frame = () => { const a = room(), top = 64, bottom = h - 96, height = Math.min(bottom - top, (a.cw * (TOP - BOTTOM)) / 360), width = (height * 360) / (TOP - BOTTOM); return { x: a.cx - width / 2, y: top + (bottom - top - height) / 2, width, height }; };
    const project = (lat, lng) => { const f = frame(), u = (lng + 180) / 360, v = (TOP - lat) / (TOP - BOTTOM); return { x: f.x + f.width / 2 + (u - cam.x) * f.width * cam.z, y: f.y + f.height / 2 + (v - cam.y) * f.height * cam.z }; };
    const bound = () => { target.z = clamp(target.z, 1, 9); const half = 0.5 / target.z; target.x = clamp(target.x, half, 1 - half); target.y = clamp(target.y, half, 1 - half); };
    /** The year the "until" slider stands for, on the ruler chosen for the river. */
    const untilYear = () => { const s = riverScale(state().scale), p = state().until === undefined ? 1 : state().until; return s.from === undefined ? yearAt(p * 0.88) : s.from + p * (PRESENT - s.from); };
    function aim(patch = {}) {
      const n = atlas.get(state().focus);
      if ('focus' in patch && n && n.place && n.place.at && cam.z > 1.2) { target.x = (n.place.at[1] + 180) / 360; target.y = (TOP - n.place.at[0]) / (TOP - BOTTOM); bound(); }
    }
    function draw() {
      ['x', 'y', 'z'].forEach((k) => { cam[k] += (target[k] - cam[k]) * ease; if (Math.abs(target[k] - cam[k]) > 0.0005) dirty = true; });
      const s = state(), f = frame(), limit = untilYear(), floor = riverScale(s.scale).from === undefined ? -Infinity : riverScale(s.scale).from;
      ctx.save(); ctx.beginPath(); ctx.rect(pad.l, 56, w - pad.l - pad.r, h - 56); ctx.clip();
      LAND.forEach((shape) => { ctx.beginPath(); shape.forEach(([lng, lat], i) => { const p = project(lat, lng); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }); ctx.closePath(); ctx.fillStyle = 'rgba(220,233,255,.065)'; ctx.fill(); ctx.strokeStyle = 'rgba(220,233,255,.2)'; ctx.lineWidth = 1; ctx.stroke(); });
      const focus = atlas.get(s.focus), ties = focus ? new Map(atlas.lineage(focus.id).map((x) => [x.id, x])) : new Map();
      const inTime = (n) => { const t = atlas.time(n.id); return !t || (t.start <= limit && t.end >= floor); };
      const everything = [...atlas.all('event').filter((e) => e.stream !== 'work-timeline'), ...atlas.all('person'), ...atlas.all('study')].filter((n) => n.place && inTime(n));
      const pinned = everything.filter((n) => n.place.at);
      // a work in focus lights up the places where its research was done
      const workStudies = new Set(focus && focus.type === 'work' ? atlas.edges.filter((e) => e.type === 'supports' && (e.to === focus.id || (atlas.get(e.to) && atlas.get(e.to).work === focus.id))).map((e) => e.from) : []);
      const spot = new Map(), seen = new Map();
      pinned.forEach((n) => {            // things at the same spot fan out a little so each can be picked
        const key = n.place.at.join(','), k = seen.get(key) || 0; seen.set(key, k + 1);
        const p = project(n.place.at[0], n.place.at[1]), r = k ? 7 + Math.floor((k - 1) / 6) * 6 : 0, a = k * 1.05;
        spot.set(n.id, { x: p.x + Math.cos(a) * r, y: p.y + Math.sin(a) * r });
      });
      atlas.all('region').filter((r) => r.at).forEach((r) => {      // what is known only by region gathers at its centre
        const loose = everything.filter((n) => !n.place.at && n.place.region === r.id).length;
        const p = project(r.at[0], r.at[1]), isFocus = s.focus === r.id;
        label(r.title.ja, p.x, p.y - 16, { size: 11, color: rgba(atlas.color(r.id), 0.75), align: 'center', font: SERIF, weight: 600 });
        if (loose) { ring(p.x, p.y, 9 + Math.sqrt(loose) * 2, atlas.color(r.id), isFocus ? 0.95 : 0.4, [2, 3]); label('ほか' + loose, p.x, p.y + 4, { size: 9, color: rgba(atlas.color(r.id), 0.85), align: 'center' }); }
        hit(r.id, p.x, p.y, 16);
      });
      // how one thing led to another, drawn from place to place
      atlas.edges.filter((e) => e.type === 'influences' && spot.has(e.from) && spot.has(e.to)).forEach((e) => {
        const on = e.from === s.focus || e.to === s.focus;
        arc(spot.get(e.from), spot.get(e.to), '#ffe7a8', on ? 0.9 : focus && focus.type === 'event' ? 0.1 : 0.28, on ? 1.6 : 1);
      });
      pinned.sort((a, b) => Number(a.id === s.focus) - Number(b.id === s.focus)).forEach((n) => {
        const p = spot.get(n.id), isFocus = n.id === s.focus, color = atlas.color(n.place.region), lit = inLens(n) || n.type !== 'event', linked = ties.has(n.id) || workStudies.has(n.id);
        if (n.type === 'person') { ctx.beginPath(); ctx.rect(p.x - 3, p.y - 3, 6, 6); ctx.fillStyle = rgba(color, lit ? 0.95 : 0.2); ctx.fill(); }
        else if (n.type === 'study') { ctx.beginPath(); ctx.moveTo(p.x, p.y - 4); ctx.lineTo(p.x + 4, p.y); ctx.lineTo(p.x, p.y + 4); ctx.lineTo(p.x - 4, p.y); ctx.closePath(); ctx.strokeStyle = rgba(color, 0.95); ctx.lineWidth = 1.2; ctx.stroke(); if (isFocus || linked) { ctx.fillStyle = rgba(color, 0.9); ctx.fill(); } }
        else star(p.x, p.y, isFocus ? 5 : linked ? 4 : n.core ? 3 : 2.2, color, lit ? 1 : 0.18);
        if (isFocus) ring(p.x, p.y, 11 + Math.sin(pulse * 0.06) * 1.5, '#ffffff', 0.9);
        hit(n.id, p.x, p.y, 9);
        n._p = p; n._rank = isFocus ? 0 : n.id === hover ? 1 : linked ? 2 : n.core && lit ? 3 : 4;
      });
      [...pinned].sort((a, b) => a._rank - b._rank).forEach((n) => { if (n._rank < 4 || cam.z > 2.2) label(atlas.title(n.id), n._p.x + 8, n._p.y + 4, { size: n._rank === 0 ? 12 : 10, weight: n._rank === 0 ? 700 : 500, color: n._rank < 3 ? '#ffffff' : 'rgba(225,232,246,.8)', force: n._rank < 2, max: n._rank < 2 ? 28 : 13 }); });
      ctx.restore();
      // not everything has a place on the globe
      ['region:global', 'region:cosmos'].forEach((id, i) => {
        const count = everything.filter((n) => n.place.region === id).length, x = pad.l + 18 + i * 132, y = h - 112;
        ctx.beginPath(); ctx.roundRect(x, y - 14, 122, 24, 12); ctx.fillStyle = s.focus === id ? 'rgba(255,231,168,.18)' : 'rgba(13,15,24,.86)'; ctx.fill(); ctx.strokeStyle = 'rgba(211,230,255,.2)'; ctx.stroke();
        label(`${atlas.title(id)} ${count}`, x + 61, y + 3, { size: 10, color: '#d6dcee', align: 'center', force: true });
        hit(id, 0, 0, 0, [x, y - 14, x + 122, y + 10]);
      });
      label(`地図上に${pinned.length}件（●出来事 ■人物 ◇研究）　〜${yearLabel(limit)}まで`, f.x + f.width / 2, 74, { size: 11, color: '#ffe7a8', align: 'center', force: true, weight: 600, max: 60 });
      dirty = dirty || (!env.reducedMotion && Boolean(focus));
    }
    return { aim, draw,
      wheel: (e, x, y) => { const f = frame(), u = cam.x + (x - f.x - f.width / 2) / (f.width * cam.z), v = cam.y + (y - f.y - f.height / 2) / (f.height * cam.z); target.z *= Math.exp(e.deltaY * -0.0016); bound(); target.x = u - (x - f.x - f.width / 2) / (f.width * target.z); target.y = v - (y - f.y - f.height / 2) / (f.height * target.z); bound(); },
      drag: (dx, dy) => { const f = frame(); target.x -= dx / (f.width * cam.z); target.y -= dy / (f.height * cam.z); bound(); },
      zoom: (step) => { target.z *= step > 0 ? 1.5 : 1 / 1.5; bound(); }, untilYear };
  })();

  const views = { galaxy, river, stars, world };
  const current = () => views[state().view] || galaxy;

  function resize() {
    const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, rect.width); h = Math.max(1, rect.height);
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    backdrop = document.createElement('canvas'); backdrop.width = canvas.width; backdrop.height = canvas.height;
    const b = backdrop.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0);
    const sky = b.createRadialGradient(w * 0.54, h * 0.5, 0, w * 0.54, h * 0.5, Math.max(w, h) * 0.75); sky.addColorStop(0, '#141a2a'); sky.addColorStop(0.55, '#0b0d16'); sky.addColorStop(1, '#08080d');
    b.fillStyle = sky; b.fillRect(0, 0, w, h);
    for (let i = 0; i < Math.round((w * h) / 2600); i += 1) { b.fillStyle = `rgba(214,228,255,${0.08 + hash('s' + i, 3) * 0.4})`; b.fillRect(hash('s' + i, 1) * w, hash('s' + i, 2) * h, hash('s' + i, 4) > 0.9 ? 1.6 : 1, hash('s' + i, 4) > 0.9 ? 1.6 : 1); }
    dirty = true;
  }
  function frame() {
    requestAnimationFrame(frame);
    if (state().view === 'list' || document.hidden) return;
    if (!dirty) { const want = env.inset(); if (want.l === pad.l && want.r === pad.r && want.b === pad.b) return; }
    const want = env.inset();
    ['l', 'r', 'b'].forEach((k) => { pad[k] += (want[k] - pad[k]) * (ease === 1 ? 1 : 0.2); if (Math.abs(want[k] - pad[k]) < 0.5) pad[k] = want[k]; });
    const settling = pad.l !== want.l || pad.r !== want.r || pad.b !== want.b;
    dirty = settling; pulse += 1; hits = []; labels = env.obstacles();
    ctx.drawImage(backdrop, 0, 0, w, h);
    current().draw();
    canvas.style.cursor = hover ? 'pointer' : 'grab';
  }
  function pick(x, y) {
    let best = null;
    hits.forEach((item) => {
      const d = item.rect ? (x >= item.rect[0] && x <= item.rect[2] && y >= item.rect[1] && y <= item.rect[3] ? 0.5 : Infinity) : Math.hypot(item.x - x, item.y - y) - item.r;
      const wide = (id) => ['series', 'region'].includes(atlas.get(id).type);     // a star on top of a cluster wins over the cluster
      if (d <= 0.5 && (!best || (d < best.d && wide(item.id) === wide(best.id)) || (!wide(item.id) && wide(best.id)))) best = { id: item.id, d };
    });
    return best ? best.id : null;
  }
  const local = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  let down = null, pinch = null;
  const pointers = new Map();
  canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); pointers.set(e.pointerId, local(e)); down = { ...local(e), moved: false }; });
  canvas.addEventListener('pointermove', (e) => {
    const p = local(e);
    if (pointers.has(e.pointerId)) {
      const before = pointers.get(e.pointerId); pointers.set(e.pointerId, p);
      if (pointers.size === 2) { const [a, b] = [...pointers.values()], gap = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) current().wheel({ deltaY: (pinch - gap) * 3 }, (a.x + b.x) / 2, (a.y + b.y) / 2); pinch = gap; down.moved = true; }
      else if (down) { if (Math.hypot(p.x - down.x, p.y - down.y) > 5) down.moved = true; if (down.moved) current().drag(p.x - before.x, p.y - before.y); }
    } else { const id = pick(p.x, p.y); if (id !== hover) hover = id; if (current().move) current().move(p.x); }
    dirty = true;
  });
  const up = (e) => {
    const p = local(e); pointers.delete(e.pointerId); pinch = null;
    if (down && !down.moved) {
      if (!(current().click && current().click(p.x, p.y))) {
        const id = pick(p.x, p.y), n = id && atlas.get(id), s = state();
        if (n && s.view === 'stars' && (n.type === 'concept' || (n.type === 'question' && n.level === 'big'))) store.set({ anchor: id, focus: id });
        else if (n && n.type === 'series' && s.view === 'galaxy' && n.status !== 'planned') store.set({ focus: id, depth: Math.max(s.depth, 44) });
        else if (id) store.set({ focus: id });
      }
    }
    down = null; dirty = true;
  };
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', (e) => { pointers.delete(e.pointerId); down = null; });
  canvas.addEventListener('pointerleave', () => { hover = null; if (river.move) river.move(null); dirty = true; });
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); current().wheel(e, local(e).x, local(e).y); dirty = true; }, { passive: false });
  canvas.addEventListener('keydown', (e) => {
    const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (dir) {                                  // step to the nearest thing in that direction
      e.preventDefault();
      const from = hits.find((x) => x.id === state().focus), origin = from ? (from.rect ? { x: (from.rect[0] + from.rect[2]) / 2, y: from.rect[1] + 7 } : from) : { x: w / 2, y: h / 2 };
      let best = null;
      hits.forEach((item) => {
        if (item.id === state().focus) return;
        const x = item.rect ? clamp(origin.x, item.rect[0], item.rect[2]) : item.x, y = item.rect ? item.rect[1] + 7 : item.y, dx = x - origin.x, dy = y - origin.y;
        const along = dx * dir[0] + dy * dir[1], across = Math.abs(dx * dir[1]) + Math.abs(dy * dir[0]);
        if (along > 4 && (!best || along + across * 2.2 < best.score)) best = { id: item.id, score: along + across * 2.2 };
      });
      if (best) store.set({ focus: best.id });
    } else if (e.key === '+' || e.key === '=' || e.key === ';') { current().zoom(1); dirty = true; }
    else if (e.key === '-') { current().zoom(-1); dirty = true; }
  });
  store.on((s, patch) => { current().aim(patch); dirty = true; });
  new ResizeObserver(resize).observe(canvas);
  resize(); current().aim({ focus: true, view: true }); requestAnimationFrame(frame);
  return { refresh: () => { dirty = true; }, centre: () => stars.centre(), untilYear: () => world.untilYear() };
}
