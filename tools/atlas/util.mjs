// Shared helpers for the Atlas build. Node standard library only.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const PRESENT = 2026;            // matches assets/js/evolution-deep-time.js
export const MAX_AGE = 13_800_000_000;

export const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
export const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
export const readJson = (rel, fallback) => (exists(rel) ? JSON.parse(read(rel)) : fallback);
export function writeIfChanged(rel, text) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === text) return false;
  fs.writeFileSync(file, text);
  return true;
}

/** Run existing browser data files (IIFEs that assign to window.*) and return the window object. */
export function loadGlobals(files) {
  const win = {};
  win.window = win;
  const noop = () => null;
  const context = vm.createContext({
    window: win, console,
    document: { documentElement: { lang: 'ja' }, getElementById: noop, querySelector: noop, querySelectorAll: () => [], addEventListener: noop },
    location: { search: '', pathname: '/' }, URLSearchParams
  });
  for (const file of files) vm.runInContext(read(file), context, { filename: file });
  return win;
}

/** Pull a literal (`const NAME = [...]` / `{...}`) out of a script that cannot run without a DOM. */
export function extractLiteral(source, name, file) {
  const start = source.search(new RegExp('\\bconst ' + name + '\\s*=\\s*'));
  if (start < 0) throw new Error(`${file}: const ${name} not found`);
  const open = source.slice(start).search(/[\[{]/) + start;
  const close = source[open] === '[' ? ']' : '}';
  const end = source.indexOf('\n  ' + close + ';', open);
  if (end < 0) throw new Error(`${file}: end of ${name} not found`);
  return vm.runInNewContext('(' + source.slice(open, end + 4).replace(/;$/, '') + ')');
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
export const text = (html) => String(html || '')
  .replace(/<br\s*\/?>/gi, '').replace(/<[^>]*>/g, '')
  .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, key) => ENTITIES[key])
  .replace(/\s+/g, ' ').trim();

export const slugify = (value) => String(value).normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

/**
 * Japanese date label -> { start, end, precision } in astronomical years (1 BCE = 0).
 * Follows ageFromDate() in evolution-deep-time.js, but keeps ranges and precision.
 */
export function parseJaDate(label) {
  const s = String(label || '').replace(/[–—−]/g, '〜');
  const approx = /約|頃|ごろ|少なくとも|諸説|予測|シナリオ|伝/.test(s);
  const bce = /紀元前|(^|[^0-9])前\d/.test(s);
  const point = (year, precision) => ({ start: year, end: year, precision });
  if (s.includes('約3分後')) return point(PRESENT - MAX_AGE, 'geologic');
  const unit = (u) => (u === '億' ? 1e8 : u === '万' ? 1e4 : 1);
  const agoRange = s.match(/([\d.]+)(億|万)?〜([\d.]+)(億|万)?年前/);
  if (agoRange) {
    const u2 = unit(agoRange[4]), u1 = agoRange[2] ? unit(agoRange[2]) : u2;
    const years = [Math.round(PRESENT - agoRange[1] * u1), Math.round(PRESENT - agoRange[3] * u2)].sort((x, y) => x - y);
    return { start: years[0], end: years[1], precision: 'geologic' };
  }
  const agoMixed = s.match(/(\d+)万(\d+)年前/);
  if (agoMixed) return point(PRESENT - (agoMixed[1] * 1e4 + Number(agoMixed[2])), 'geologic');
  const ago = s.match(/([\d.]+)(億|万)?年前/);
  if (ago) return point(Math.round(PRESENT - ago[1] * unit(ago[2])), ago[2] ? 'geologic' : 'circa');
  const centuryStart = (c) => (bce ? 1 - c * 100 : (c - 1) * 100 + 1);
  const centuryEnd = (c) => (bce ? -(c - 1) * 100 : c * 100);
  const yearToCentury = s.match(/(\d{3,4})年?〜(\d{1,2})世紀/);   // 1893〜20世紀, 紀元前399年〜4世紀
  if (yearToCentury) return { start: bce ? 1 - yearToCentury[1] : +yearToCentury[1], end: centuryEnd(+yearToCentury[2]), precision: 'century' };
  const centuryToYear = s.match(/(\d{1,2})世紀[^〜]*〜(\d{3,4})年/);   // 紀元前5世紀頃〜628年 (the end year is CE)
  if (centuryToYear) return { start: centuryStart(+centuryToYear[1]), end: +centuryToYear[2], precision: 'century' };
  const decades = s.match(/(\d{3,4})〜(\d{3,4})年代/);
  if (decades) return { start: +decades[1], end: +decades[2] + 9, precision: 'decade' };
  const centuries = s.match(/(\d{1,2})〜(\d{1,2})世紀/);
  if (centuries) return { start: centuryStart(+centuries[1]), end: centuryEnd(+centuries[2]), precision: 'century' };
  const century = s.match(/(\d+)世紀/);
  if (century) return { start: centuryStart(+century[1]), end: centuryEnd(+century[1]), precision: 'century' };
  const decade = s.match(/(\d{3,4})年代/);
  if (decade) return { start: +decade[1], end: +decade[1] + 9, precision: 'decade' };
  const year = (n) => (bce ? 1 - n : n);
  const range = s.match(/(\d{1,4})\s*〜\s*(\d{1,4})/);
  if (range) {
    let b = range[2];
    if (!bce && b.length < range[1].length) b = range[1].slice(0, range[1].length - b.length) + b;   // 1881–91
    return { start: year(+range[1]), end: year(+b), precision: approx ? 'circa' : 'exact' };
  }
  const single = s.match(/\d{1,4}/);
  if (!single || /歳|代$|年後/.test(s)) return null;
  return point(year(+single[0]), approx ? 'circa' : 'exact');
}

/** Collects nodes and edges, refusing duplicate IDs. */
export class Graph {
  constructor() { this.nodes = new Map(); this.edges = []; this.notes = []; }
  node(n) {
    if (this.nodes.has(n.id)) throw new Error('Duplicate node id: ' + n.id);
    this.nodes.set(n.id, n);
    return n;
  }
  ensure(n) { return this.nodes.get(n.id) || this.node(n); }
  edge(from, to, type, extra = {}) {
    if (this.edges.some((e) => e.from === from && e.to === to && e.type === type)) return;
    this.edges.push({ from, to, type, origin: 'derived', ...extra });
  }
  note(message) { this.notes.push(message); }
}

/**
 * Stable IDs for things that have no ID in the source (timeline events etc.).
 * The registry file maps a natural key to an ID once, so later inserts or reordering never renumber.
 */
export class IdRegistry {
  constructor(rel, assign) { this.rel = rel; this.assign = assign; this.map = readJson(rel, {}); this.used = new Set(Object.values(this.map)); this.added = []; this.seen = new Set(); }
  get(key, propose) {
    this.seen.add(key);
    if (this.map[key]) return this.map[key];
    if (!this.assign) throw new Error(`No fixed ID for "${key}". Run: node tools/atlas/build.mjs --assign-ids`);
    const base = propose();
    let id = base, n = 1;
    while (this.used.has(id)) id = base + '-' + String.fromCharCode(97 + n++);
    this.map[key] = id; this.used.add(id); this.added.push(id);
    return id;
  }
  unused() { return Object.keys(this.map).filter((key) => !this.seen.has(key)); }
  save() { return writeIfChanged(this.rel, JSON.stringify(this.map, null, 2) + '\n'); }
}
