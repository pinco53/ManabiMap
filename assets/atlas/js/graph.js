// Atlas graph: loads the generated data, indexes it, and answers questions about it.
// No rendering here. The views and the UI only talk to this module and to the store.

export const PRESENT = 2026;
export const MAX_AGE = 13_800_000_000;

export const TYPE_LABEL = { series: 'シリーズ', work: '作品', episode: '話', event: '出来事', concept: '概念', question: '問い', person: '人物', media: 'メディア', study: '研究', route: '道', lens: 'レンズ', page: 'ページ', family: '系統' };
export const SERIES_COLOR = {
  'series:civilization': '#e0b65a', 'series:ai': '#f0875f', 'series:words-numbers': '#5fd0c0', 'series:science-thinking': '#6f9df2', 'series:mind-body': '#d98be0', 'series:learning': '#a6d86a',
  'series:edu': '#63c992', 'series:philosophy-west': '#9d8cf0', 'series:philosophy-east': '#f29bb5', 'series:math': '#58c6e8',
  'series:science': '#9fb4c9', 'series:cosmos': '#9fb4c9', 'series:physics': '#9fb4c9', 'series:life': '#9fb4c9', 'series:ai-origins': '#c9b39f', 'series:ohanashi': '#c9a9c0'
};
const STREAM = { 'deep-time': { label: '138億年の年表', color: '#dce9ff' }, 'philosophy-history': { label: '哲学の歴史', color: '#c9b6ff' }, 'edu-history': { label: '教育の歴史', color: '#8fd9b6' } };
// How costly each kind of connection is when looking for a path. Reasoned bridges are the cheapest.
const STEP_COST = { bridges: 1, next: 1.6, relatesTo: 1.6, about: 1.3, asks: 1.3, happenedAt: 1.5, features: 1.5, sameAs: 0.4, partOf: 1.8 };
const STEP_LABEL = { bridges: '橋', next: '次の部', relatesTo: '関連', about: '同じ概念', asks: '同じ問い', happenedAt: '同じ出来事', features: '同じ人物', sameAs: '同じ題材', partOf: '所属' };

/**
 * Rulers for the river. "all" squeezes everything onto the timeline's log scale so nothing is hidden;
 * every other ruler is linear, so lengths on screen are honest and can be compared.
 */
export const RIVER_SCALES = [
  { key: 'all', label: '一望', note: '全部を1画面に' },
  { key: 'cosmos', label: '宇宙史', note: '138億年', from: -13.8e9 },
  { key: 'life', label: '生命史', note: '40億年', from: -4e9 },
  { key: 'human', label: '人類史', note: '700万年', from: -7e6 },
  { key: 'sapiens', label: 'ホモ・サピエンス', note: '30万年', from: -3e5 },
  { key: 'civil', label: '文明史', note: '1万年', from: -8000 },
  { key: 'history', label: '歴史時代', note: '5000年', from: -3000 },
  { key: 'modern', label: '近現代', note: '500年', from: 1500 },
  { key: 'now', label: '現代', note: '130年', from: 1900 }
].map((s) => (s.from === undefined ? s : { ...s, to: PRESENT + Math.max(4, (PRESENT - s.from) * 0.03) }));
export const riverScale = (key) => RIVER_SCALES.find((s) => s.key === key) || RIVER_SCALES[0];

/** Same log scale as the existing 138億年 timeline: 0 = Big Bang, 0.88 = now, beyond = future. */
export function timePosition(year) {
  if (year > PRESENT) return Math.min(0.99, 0.88 + ((year - PRESENT) / 150) * 0.11);
  return 0.88 * (1 - Math.log10(1 + (PRESENT - year)) / Math.log10(1 + MAX_AGE));
}
export function yearAt(position) {
  if (position > 0.88) return PRESENT + ((position - 0.88) / 0.11) * 150;
  return PRESENT - (Math.pow(1 + MAX_AGE, 1 - Math.max(0, position) / 0.88) - 1);
}
export function yearLabel(year) {
  const age = PRESENT - year;
  if (year > PRESENT + 0.5) return Math.round(year) + '年ごろ（未来）';
  if (age >= 1e8) return (age / 1e8).toFixed(age >= 1e9 ? 0 : 1).replace(/\.0$/, '') + '億年前';
  if (age >= 12000) return Math.round(age / 1e4 * (age >= 1e5 ? 1 : 10)) / (age >= 1e5 ? 1 : 10) + '万年前';
  if (year <= 0) return '紀元前' + Math.round(1 - year) + '年';
  return Math.round(year) + '年';
}

export class Atlas {
  constructor() { this.nodes = new Map(); this.out = new Map(); this.in = new Map(); this.edges = []; this.loaded = new Set(); }

  add(name, file) {
    if (this.loaded.has(name)) return;
    this.loaded.add(name);
    file.nodes.forEach((n) => this.nodes.set(n.id, n));
    file.edges.forEach((e) => {
      this.edges.push(e);
      (this.out.get(e.from) || this.out.set(e.from, []).get(e.from)).push(e);
      (this.in.get(e.to) || this.in.set(e.to, []).get(e.to)).push(e);
    });
  }
  get(id) { return this.nodes.get(id); }
  all(type) { return [...this.nodes.values()].filter((n) => n.type === type); }
  title(id) { const n = typeof id === 'string' ? this.get(id) : id; return n ? (n.title && n.title.ja) || (n.text && n.text.ja) || (n.name && n.name.ja) || n.id : String(id); }

  /** Every connection of a node, as { edge, other, forward }. */
  links(id, types) {
    const pick = (e) => !types || types.includes(e.type);
    return [...(this.out.get(id) || []).filter(pick).map((edge) => ({ edge, other: edge.to, forward: true })),
      ...(this.in.get(id) || []).filter(pick).map((edge) => ({ edge, other: edge.from, forward: false }))].filter((l) => this.nodes.has(l.other));
  }
  seriesOf(id) {
    const n = this.get(id);
    if (!n) return null;
    if (n.type === 'series') return n.id;
    if (n.series) return n.series;
    if (n.work) return this.seriesOf(n.work);
    return null;
  }
  color(id) {
    const n = this.get(id);
    if (!n) return '#dce9ff';
    const series = this.seriesOf(id);
    if (series) return SERIES_COLOR[series] || '#dce9ff';
    if (n.type === 'event') return (STREAM[n.stream] || STREAM['deep-time']).color;
    return { question: '#ffe7a8', concept: '#a8e6ff', person: '#ffc9a8', lens: '#dce9ff' }[n.type] || '#dce9ff';
  }
  streamLabel(n) { return n.stream === 'work-timeline' ? this.title(n.work) + ' の年表' : (STREAM[n.stream] || {}).label || ''; }
  time(id) { const n = this.get(id); return n && n.time && n.time.length ? n.time[0] : null; }
  timeText(id) {
    const n = this.get(id), t = this.time(id);
    if (n && n.timeLabel && n.timeLabel.ja) return n.timeLabel.ja;
    if (!t) return '';
    if (t.label && t.label.ja) return t.label.ja;
    return t.start === t.end ? yearLabel(t.start) : yearLabel(t.start) + ' 〜 ' + (t.end >= PRESENT ? '現在' : yearLabel(t.end));
  }

  /** Works gathered by a question, concept, lens, person or series. */
  members(id) {
    const n = this.get(id);
    if (!n) return [];
    if (n.type === 'series') return this.all('work').filter((w) => w.series === id).map((w) => w.id);
    if (n.type === 'lens') return this.all('work').filter((w) => (w.lenses || []).includes(id)).map((w) => w.id);
    const ids = this.links(id, ['asks', 'about', 'features', 'happenedAt', 'supports']).map((l) => l.other).filter((o) => this.get(o).type === 'work');
    return [...new Set(ids)];
  }
  bigQuestions(workId) { return [...new Set(this.links(workId, ['asks']).map((l) => l.other).filter((q) => this.get(q).level === 'big'))]; }
  ownQuestions(workId) { return this.links(workId, ['asks']).map((l) => l.other).filter((q) => this.get(q).level === 'work'); }
  concepts(workId) { return this.links(workId, ['about']).filter((l) => l.forward && this.get(l.other).type === 'concept').map((l) => l.other); }

  /** Works in other series that answer the same big questions, most overlap first. */
  otherAnswers(workId, limit = 3) {
    const mine = this.bigQuestions(workId), series = this.seriesOf(workId), score = new Map();
    mine.forEach((q) => this.members(q).forEach((w) => {
      if (w === workId || this.seriesOf(w) === series) return;
      const entry = score.get(w) || { id: w, shared: [] };
      entry.shared.push(q); score.set(w, entry);
    }));
    const bridged = new Set(this.links(workId, ['bridges']).map((l) => l.other));
    return [...score.values()].filter((e) => !bridged.has(e.id)).sort((a, b) => b.shared.length - a.shared.length || a.id.localeCompare(b.id)).slice(0, limit);
  }
  /** Events from other streams around the same years. */
  sameEra(id, limit = 4) {
    const t = this.time(id), n = this.get(id);
    if (!t) return [];
    const linked = this.links(id, ['happenedAt']).map((l) => l.other).filter((o) => this.get(o).type === 'event' && this.get(o).stream !== 'work-timeline');
    if (n.type === 'work') return linked.slice(0, limit);
    const span = Math.max(15, (PRESENT - t.start) * 0.06), mid = (t.start + t.end) / 2;
    return this.all('event').filter((e) => e.id !== id && e.stream !== n.stream && e.stream !== 'work-timeline' && e.time.length && Math.abs((e.time[0].start + e.time[0].end) / 2 - mid) <= span)
      .sort((a, b) => Math.abs(a.time[0].start - mid) - Math.abs(b.time[0].start - mid)).slice(0, limit).map((e) => e.id);
  }

  /** Cheapest chain of connections between two nodes, as [{ id, via: edge|null, label }]. */
  path(from, to) {
    if (!this.nodes.has(from) || !this.nodes.has(to)) return null;
    const usable = (id) => ['work', 'concept', 'question', 'event', 'person', 'series'].includes(this.get(id).type) && this.get(id).stream !== 'work-timeline';
    const cost = new Map([[from, 0]]), back = new Map(), queue = [from], done = new Set();
    while (queue.length) {
      queue.sort((a, b) => cost.get(a) - cost.get(b));
      const here = queue.shift();
      if (here === to) break;
      if (done.has(here)) continue;
      done.add(here);
      this.links(here).forEach(({ edge, other }) => {
        if (!(edge.type in STEP_COST) || !usable(other)) return;
        if (this.get(other).type === 'question' && this.get(other).level !== 'big') return;
        const next = cost.get(here) + STEP_COST[edge.type];
        if (next < (cost.has(other) ? cost.get(other) : Infinity)) { cost.set(other, next); back.set(other, { from: here, edge }); queue.push(other); }
      });
    }
    if (!back.has(to)) return from === to ? [{ id: from, via: null }] : null;
    const steps = [];
    for (let at = to; at !== from; at = back.get(at).from) steps.unshift({ id: at, via: back.get(at).edge, label: STEP_LABEL[back.get(at).edge.type] });
    return [{ id: from, via: null }, ...steps];
  }

  search(text, limit = 8) {
    const q = text.trim().toLowerCase();
    if (!q) return [];
    const order = { work: 0, series: 1, question: 2, concept: 3, person: 4, event: 5 };
    return [...this.nodes.values()].filter((n) => n.type in order && !(n.type === 'question' && n.level !== 'big') && n.stream !== 'work-timeline')
      .map((n) => { const hay = (this.title(n) + ' ' + ((n.summary && n.summary.ja) || '') + ' ' + (n.keywords || []).join(' ')).toLowerCase(); const at = hay.indexOf(q); return at < 0 ? null : { n, score: (this.title(n).toLowerCase().includes(q) ? 0 : 50) + order[n.type] * 5 + Math.min(at, 40) / 40 }; })
      .filter(Boolean).sort((a, b) => a.score - b.score).slice(0, limit).map((r) => r.n.id);
  }
}

export async function loadAtlas(base) {
  const atlas = new Atlas();
  const get = async (name) => { const response = await fetch(`${base}atlas-${name}.json`); if (!response.ok) throw new Error(`atlas-${name}.json: ${response.status}`); return response.json(); };
  atlas.add('core', await get('core'));
  // Events and detail are not needed for the first paint; they arrive in the background.
  atlas.ready = Promise.all(['events', 'detail'].map((name) => get(name).then((file) => atlas.add(name, file)))).then(() => atlas);
  return atlas;
}

/** One state object for every view: which view, what is in focus, how it is filtered, and the trail so far. */
export class Store {
  constructor(atlas) {
    this.atlas = atlas; this.listeners = new Set();
    this.state = { view: 'galaxy', focus: null, anchor: null, lens: null, scale: 'all', depth: 26, start: null, path: null, trail: [] };
    this.read();
    window.addEventListener('popstate', () => { this.read(); this.emit(); });
  }
  read() {
    const p = new URLSearchParams(location.search), ok = (id) => (id && this.atlas.get(id) ? id : null);
    const view = p.get('view');
    Object.assign(this.state, {
      view: ['galaxy', 'river', 'stars', 'list'].includes(view) ? view : 'galaxy', focus: ok(p.get('focus')), anchor: ok(p.get('q')), lens: ok(p.get('lens')), scale: riverScale(p.get('scale')).key,
      path: (p.get('path') || '').split(',').filter((id) => this.atlas.get(id))
    });
    if (this.state.path.length < 2) this.state.path = null;
    if (p.get('focus') && !this.state.focus) this.pendingFocus = p.get('focus');   // may be an event that has not loaded yet
  }
  url() {
    const s = this.state, p = new URLSearchParams();
    if (s.view !== 'galaxy') p.set('view', s.view);
    if (s.focus) p.set('focus', s.focus);
    if (s.anchor && s.view === 'stars') p.set('q', s.anchor);
    if (s.lens) p.set('lens', s.lens);
    if (s.scale !== 'all' && s.view === 'river') p.set('scale', s.scale);
    if (s.path) p.set('path', s.path.join(','));
    const query = p.toString().replace(/%3A/g, ':').replace(/%2C/g, ',');
    return location.pathname + (query ? '?' + query : '');
  }
  set(patch, { push = true } = {}) {
    const before = this.url();
    if ('focus' in patch && patch.focus && patch.focus !== this.state.focus) this.state.trail = [...this.state.trail.filter((id) => id !== patch.focus), patch.focus].slice(-6);
    Object.assign(this.state, patch);
    const after = this.url();
    if (after !== before) history[push ? 'pushState' : 'replaceState'](null, '', after);
    this.emit(patch);
  }
  emit(patch = {}) { this.listeners.forEach((fn) => fn(this.state, patch)); }
  on(fn) { this.listeners.add(fn); }
}
