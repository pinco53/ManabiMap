// Human-readable build report (Markdown). Generated; do not edit by hand.
export function report(g, result, { sources, counts, outputs, suggested }) {
  const nodes = [...g.nodes.values()];
  const works = nodes.filter((n) => n.type === 'work');
  const events = nodes.filter((n) => n.type === 'event');
  const title = (id) => { const n = g.nodes.get(id); return n ? (n.title?.ja || n.text?.ja || n.name?.ja || id) : id; };
  const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(0) + ' KB';
  const lines = [];
  const add = (...rows) => lines.push(...rows);
  const table = (head, rows) => add('', '| ' + head.join(' | ') + ' |', '|' + head.map(() => '---').join('|') + '|', ...rows.map((r) => '| ' + r.join(' | ') + ' |'), '');

  add('# Atlas ビルドレポート', '', '> 自動生成（`node tools/atlas/build.mjs`）。手で編集しないでください。', '',
    `**エラー ${result.errors.length}件 ／ 編集待ち ${result.todo.reduce((n, t) => n + t.items.length, 0)}件 ／ 注意 ${result.warnings.length}件 ／ 既存データの参照切れ ${result.dangling.length}件**`);

  add('', '## 1. 取り込んだもの');
  table(['取り込み元', '件数'], Object.entries(sources).map(([name, c]) => [name, Object.entries(c).map(([k, v]) => `${k} ${v}`).join('、')]));
  table(['種類', '件数'], Object.entries(counts).map(([k, v]) => [k, v]).concat([['（つながり）', g.edges.length]]));
  table(['生成物', 'サイズ（非圧縮）'], Object.entries(outputs).map(([name, body]) => [name, kb(body)]));

  add('## 2. シリーズ別の作品');
  table(['シリーズ', '状態', '作品数', '時間あり', '英語題あり', '話'], nodes.filter((n) => n.type === 'series').map((s) => {
    const own = works.filter((w) => w.series === s.id);
    return [`${s.title.ja}（\`${s.id}\`）`, s.status, own.length, own.filter((w) => (w.time || []).length).length, own.filter((w) => w.title.en).length,
      nodes.filter((n) => n.type === 'episode' && own.some((w) => w.id === n.work)).length];
  }));

  add('本編（ハルとおじいさん）の「話」は、ページの作りが3通りあるため未取り込みです（次の作業）。', '', '## 3. 出来事（時の河の材料）');
  const streams = { 'deep-time': '138億年年表', 'philosophy-history': '哲学史', 'edu-history': '教育史', 'work-timeline': '作品内の年表（哲学・数学）' };
  table(['流れ', '件数', '年が数値化できた件数'], Object.entries(streams).map(([key, label]) => { const own = events.filter((e) => e.stream === key); return [label, own.length, own.filter((e) => (e.time || []).length).length]; }));
  const lensUse = nodes.filter((n) => n.type === 'lens').map((l) => [l.title.ja, works.filter((w) => (w.lenses || []).includes(l.id)).length, events.filter((e) => (e.lenses || []).includes(l.id)).length]);
  add('レンズごとの所属数：');
  table(['レンズ', '作品', '出来事'], lensUse);

  add('## 4. シリーズ横断のつながり', '', '### 既存ページのリンクから読み取れたもの（理由文なし）');
  const cross = g.edges.filter((e) => e.origin !== 'curated' && g.nodes.get(e.from)?.type === 'work' && g.nodes.get(e.to)?.type === 'work' && g.nodes.get(e.from).series !== g.nodes.get(e.to).series);
  table(['から', 'へ', '種類', '出どころ'], cross.map((e) => [`${title(e.from)}（${e.from}）`, `${title(e.to)}（${e.to}）`, e.type, e.origin]));
  add('### 理由つきの橋', '');
  table(['から', 'へ', '理由'], g.edges.filter((e) => e.origin === 'curated' && e.type === 'bridges').map((e) => [title(e.from), title(e.to), e.why.ja]));
  add('### 大きな問いと、そこに集まる作品', '');
  table(['大きな問い', '作品数', 'シリーズ数'], nodes.filter((n) => n.type === 'question' && n.level === 'big').map((q) => { const ws = [...new Set(g.edges.filter((e) => e.type === 'asks' && e.to === q.id && g.nodes.get(e.from)?.type === 'work').map((e) => e.from))]; return [q.text.ja, ws.length, new Set(ws.map((w) => g.nodes.get(w).series)).size]; }));
  add('### 概念と、それを扱う作品', '');
  table(['概念', '作品数', 'シリーズ数'], nodes.filter((n) => n.type === 'concept').map((c) => { const ws = [...new Set(g.edges.filter((e) => e.type === 'about' && e.to === c.id && g.nodes.get(e.from)?.type === 'work').map((e) => e.from))]; return [c.title?.ja || c.id, ws.length, new Set(ws.map((w) => g.nodes.get(w).series)).size]; }));
  add(`理由つきの橋（\`edges.json\`）：**${g.edges.filter((e) => e.origin === 'curated' && e.type === 'bridges').length}本**　／　候補（\`edges.suggested.json\`、未公開）：${suggested}本`, '');
  const linkedWorks = new Set(g.edges.filter((e) => e.type === 'happenedAt' && g.nodes.get(e.to)?.stream === 'deep-time').map((e) => e.from));
  add(`年表の出来事と結びついた作品：${linkedWorks.size} / ${works.length}（年表 → 作品のリンク ${g.edges.filter((e) => e.type === 'happenedAt' && g.nodes.get(e.to)?.stream === 'deep-time').length}本を両方向で利用可能に）`, '');

  add('## 5. 編集待ち', '', 'ビルドは止めないが、公開前に埋める必要があるもの。');
  result.todo.forEach((t) => add(`### ${t.title}（${t.items.length}件）`, '', t.items.slice(0, 24).map((i) => '`' + i + '`').join('、') + (t.items.length > 24 ? ` ほか${t.items.length - 24}件` : ''), ''));

  add('## 6. 既存データの参照切れ', '', result.dangling.length ? '既存の台帳が、存在しない相手を指している箇所。Atlas には取り込まず、ここに記録します（既存ファイルは変更していません）。' : 'なし。');
  if (result.dangling.length) table(['から', '種類', '存在しない相手'], result.dangling.map((d) => [d.from, d.type, d.missing.join(', ')]));

  add('## 7. 注意', '', ...result.warnings.map((w) => '- ' + w), '');
  if (result.errors.length) add('## エラー', '', ...result.errors.map((e) => '- ' + e), '');
  return lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}
