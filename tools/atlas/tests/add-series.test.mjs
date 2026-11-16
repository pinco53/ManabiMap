#!/usr/bin/env node
// 新しいシリーズを足すリハーサル。
// 本番の data/atlas/ を一時フォルダに写し、架空のシリーズ（fixtures/new-series）を手順書どおりに足してビルドする。
// 本番のファイルには一切書き込まない。「置き場所を指定しなくても、地図のすべての場所に現れる」ことを確かめる。
//   node tools/atlas/tests/add-series.test.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const real = path.join(root, 'data/atlas');
const add = JSON.parse(fs.readFileSync(path.join(here, 'fixtures/new-series/additions.json'), 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-rehearsal-'));
const dataDir = path.join(tmp, 'data'), outDir = path.join(tmp, 'out');
fs.mkdirSync(dataDir); fs.mkdirSync(outDir);
fs.readdirSync(real).filter((f) => f.endsWith('.json')).forEach((f) => fs.copyFileSync(path.join(real, f), path.join(dataDir, f)));

// --- 手順書（docs/manabimap-next/11-adding-a-series.md）の 1〜5 を、そのままなぞる
const edit = (file, change) => { const p = path.join(dataDir, file); const v = JSON.parse(fs.readFileSync(p, 'utf8')); fs.writeFileSync(p, JSON.stringify(change(v) || v, null, 1)); };
edit('series.json', (list) => { list.push(...add.series); });                               // 1. シリーズを足す
edit('works.manual.json', (list) => { list.push(...add.works); });                          // 2. 作品を足す
edit('concepts.json', (list) => { list.forEach((c) => { if (add.concepts[c.id]) c.works.push(...add.concepts[c.id]); }); });   // 3. 概念に結びつける
edit('questions.json', (q) => { Object.assign(q.parents, add.parents); });                  // 4. 問いの親を決める
edit('edges.json', (list) => { list.push(...add.edges); });                                 // 5. 既存作品への橋を書く

const out = [];
const ok = (name, cond, extra = '') => out.push((cond ? 'PASS ' : 'FAIL ') + name + (extra ? ' — ' + extra : ''));
let log = '', failed = false;
try {
  log = execFileSync(process.execPath, [path.join(root, 'tools/atlas/build.mjs'), '--assign-ids', '--allow-shrink'], { env: { ...process.env, ATLAS_DATA_DIR: dataDir, ATLAS_OUT_DIR: outDir }, encoding: 'utf8' });   // 6. ビルド
} catch (error) { failed = true; log = String(error.stdout || '') + String(error.stderr || ''); }
ok('build succeeds with the new series', !failed && /errors 0 /.test(log), (log.match(/errors \d+ · todo \d+/) || [''])[0]);

if (!failed) {
  const core = JSON.parse(fs.readFileSync(path.join(outDir, 'atlas-core.json'), 'utf8'));
  const node = (id) => core.nodes.find((n) => n.id === id);
  const series = node('series:rehearsal-music'), works = add.works.map((w) => node(w.id));
  const sandbox = { window: {} };
  ['atlas-works.js', 'atlas-bridges.js'].forEach((f) => vm.runInNewContext(fs.readFileSync(path.join(outDir, f), 'utf8'), sandbox));
  const site = sandbox.window.ManabiAtlasWorks, bridges = sandbox.window.ManabiAtlasBridges;

  // 銀河：置き場所を書いていないのに、位置が決まっている
  ok('the series and its works get a place in the galaxy without one being given', Boolean(series && series.pos) && works.every((w) => w && w.pos));
  const others = core.nodes.filter((n) => n.type === 'series' && n.status === 'published' && n.id !== series.id);
  const nearest = Math.min(...others.map((o) => Math.hypot((o.pos[0] - series.pos[0]) / 1.4, o.pos[1] - series.pos[1])));
  ok('it does not land on top of an existing series', nearest > 0.2, 'nearest centre ' + nearest.toFixed(2));
  const lockBefore = JSON.parse(fs.readFileSync(path.join(real, 'layout.lock.json'), 'utf8')), lockAfter = JSON.parse(fs.readFileSync(path.join(dataDir, 'layout.lock.json'), 'utf8'));
  ok('no existing star moves', Object.keys(lockBefore).every((id) => JSON.stringify(lockBefore[id]) === JSON.stringify(lockAfter[id])), Object.keys(lockBefore).length + ' positions unchanged');

  // 時の河・問いの星座・世界：時間、問い、概念が結びついている
  ok('works carry a time range (river)', works.every((w) => w.time && w.time.length));
  const asks = (id) => core.edges.filter((e) => e.type === 'asks' && e.from === id).map((e) => node(e.to)).filter((q) => q && q.level === 'big');
  ok('works reach a big question (constellation)', works.every((w) => asks(w.id).length >= 1));
  ok('works reach at least two concepts', works.every((w) => core.edges.filter((e) => e.type === 'about' && e.from === w.id).length >= 2));

  // 既存ページ：銀河と地図ページの一覧、作品ページの橋（相手側にも現れる）
  ok('works appear in the list the home galaxy and map index read', add.works.every((w) => site.some((x) => x.atlasId === w.id && x.group === add.series[0].title.ja)));
  ok('the new works have bridge panels', Boolean(bridges['rehearsal-music1'] && bridges['rehearsal-music1'].bridges.length === 2 && bridges['rehearsal-music2'].bridges.length === 1));
  ok('the existing part page on the other side shows the bridge too', bridges.part10.bridges.some((b) => b.title === add.works[0].title.ja));

  // 検証：新しい作品が「編集待ち」に残っていない
  const report = fs.readFileSync(path.join(outDir, 'atlas-report.md'), 'utf8');
  const waiting = report.split('## 5. 編集待ち')[1].split('## 6.')[0];
  ok('nothing about the new works is left waiting, except the English titles', !waiting.split('### 英語の題がない作品')[0].includes('rehearsal-music'));
  ok('the real data was not touched', !fs.readFileSync(path.join(real, 'series.json'), 'utf8').includes('rehearsal'));
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(out.join('\n'));
if (failed) console.log(log.split('\n').filter((l) => /ERROR|Error/.test(l)).slice(0, 8).join('\n'));
if (out.some((l) => l.startsWith('FAIL'))) process.exit(1);
