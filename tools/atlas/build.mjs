#!/usr/bin/env node
// Builds the Atlas graph from the existing site data (read only) plus data/atlas/*.json.
//   node tools/atlas/build.mjs               build, validate, write outputs
//   node tools/atlas/build.mjs --check       validate only; fail if outputs are stale
//   node tools/atlas/build.mjs --assign-ids  allow new fixed IDs to be added to the registry
import crypto from 'node:crypto';
import { Graph, IdRegistry, readJson, writeIfChanged, exists, read } from './util.mjs';
import { validate } from './validate.mjs';
import { report } from './report.mjs';
import { enrich } from './enrich.mjs';
import { layout } from './layout.mjs';
import human from './adapters/human.mjs';
import edu from './adapters/edu.mjs';
import philosophyHistory from './adapters/philosophy-history.mjs';
import timeline from './adapters/timeline.mjs';
import staticParts from './adapters/static-parts.mjs';

const flags = new Set(process.argv.slice(2));
const OUT = 'assets/atlas/data/';
const FILES = {
  core: ['family', 'series', 'lens', 'page', 'stream', 'work', 'concept', 'question', 'person', 'route'],
  events: ['event'],
  detail: ['episode', 'media', 'study']
};

const g = new Graph();
const ids = new IdRegistry('data/atlas/id-registry.json', flags.has('--assign-ids'));
const series = readJson('data/atlas/series.json', []);
readJson('data/atlas/families.json', []).forEach((f) => g.node({ type: 'family', ...f }));
series.forEach((s) => g.node({ type: 'series', ...structuredClone(s) }));
readJson('data/atlas/lenses.json', []).forEach((l) => g.node({ type: 'lens', ...l }));

const ctx = { ids, series, people: readJson('data/atlas/people.json', []) };
const sources = { '本編 manabimap-data.js': human(g, ctx), 'EDU edu-data/*.js': edu(g, ctx), '哲学史 philosophy-history-data.js': philosophyHistory(g, ctx),
  '年表 evolution.html ほか': timeline(g, ctx), '静的ページ parts/(philosophy|eastern|math)*.html': staticParts(g, ctx) };
sources['追記 data/atlas/*.json'] = Object.fromEntries(Object.entries(enrich(g)).map(([k, v]) => [k, typeof v === 'object' ? Object.entries(v).map(([a, b]) => `${a} ${b}`).join('/') : v]));

const previous = exists(OUT + 'atlas-index.json') ? JSON.parse(read(OUT + 'atlas-index.json')) : null;
const result = validate(g, { previous, retired: readJson('data/atlas/retired-ids.json', []), registry: ids, allowShrink: flags.has('--allow-shrink') });

const placed = layout(g);
const nodes = [...g.nodes.values()];
nodes.forEach((n) => { if (placed.positions[n.id]) n.pos = placed.positions[n.id]; });
const fileOf = (id) => Object.keys(FILES).find((name) => FILES[name].includes(g.nodes.get(id).type));
const rank = { core: 0, events: 1, detail: 2 };
const outputs = {};
Object.keys(FILES).forEach((name) => {
  const body = {
    nodes: nodes.filter((n) => FILES[name].includes(n.type)),
    // An edge lives in the heaviest file either end needs, so core never points at data it has not loaded.
    edges: g.edges.filter((e) => Object.keys(rank).find((k) => rank[k] === Math.max(rank[fileOf(e.from)], rank[fileOf(e.to)])) === name)
  };
  const json = JSON.stringify(body);
  outputs[`atlas-${name}.json`] = JSON.stringify({ version: crypto.createHash('sha1').update(json).digest('hex').slice(0, 12), ...body }) + '\n';
});
const counts = {};
nodes.forEach((n) => { counts[n.type] = (counts[n.type] || 0) + 1; });
outputs['atlas-index.json'] = JSON.stringify({ counts, edges: g.edges.length, ids: nodes.map((n) => n.id).sort() }) + '\n';
const reportText = report(g, result, { sources, counts, outputs, suggested: readJson('data/atlas/edges.suggested.json', { edges: [] }).edges.length });

console.log(Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(' · ') + ` · edges ${g.edges.length}`);
console.log(`errors ${result.errors.length} · todo ${result.todo.reduce((n, t) => n + t.items.length, 0)} · warnings ${result.warnings.length} · dropped dangling refs ${result.dangling.length}`);
if (result.errors.length) { result.errors.forEach((e) => console.error('ERROR  ' + e)); process.exit(1); }

const targets = { ...Object.fromEntries(Object.entries(outputs).map(([name, body]) => [OUT + name, body])), 'docs/manabimap-next/reports/atlas-report.md': reportText };
if (flags.has('--check')) {
  const stale = Object.entries(targets).filter(([rel, body]) => !exists(rel) || read(rel) !== body).map(([rel]) => rel);
  if (stale.length || ids.added.length || placed.changed) { console.error('STALE  生成物が最新ではありません。node tools/atlas/build.mjs を実行してください:\n  ' + stale.join('\n  ')); process.exit(1); }
  console.log('OK  生成物は最新です');
} else {
  if (ids.save()) console.log(`id-registry.json: +${ids.added.length}`);
  if (placed.save()) console.log('layout.lock.json updated');
  Object.entries(targets).forEach(([rel, body]) => { if (writeIfChanged(rel, body)) console.log('wrote ' + rel); });
}
