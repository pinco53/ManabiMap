// Checks the Atlas graph. errors = build stops. todo = editorial work still open. warnings = worth a look.
import { exists, PRESENT, MAX_AGE } from './util.mjs';

// New IDs are ASCII; a few IDs inherited from existing data contain Japanese and are kept as they are.
const ID = /^[a-z]+:[\p{L}\p{N}][\p{L}\p{N}._-]*$/u;
const CROSS = new Set(['bridges', 'influences', 'contrasts', 'answers']);
const WORK_LINKS = new Set(['next', 'bridges', 'relatesTo', 'contrasts', 'influences']);

export function validate(g, { previous = null, retired = [], registry = null, allowShrink = false } = {}) {
  const errors = [], todo = [], warnings = [], dangling = [];
  const nodes = g.nodes, list = [...nodes.values()];
  const ofType = (type) => list.filter((n) => n.type === type);
  const works = ofType('work').filter((n) => n.status === 'published');

  // --- structure -----------------------------------------------------------------------------
  list.forEach((n) => { if (!ID.test(n.id)) errors.push(`ID の形式が不正: ${n.id}`); });
  g.edges = g.edges.filter((e) => {
    const missing = [e.from, e.to].filter((id) => !nodes.has(id));
    if (!missing.length) return true;
    if (e.origin === 'curated') errors.push(`edges.json: 存在しない ID を参照 ${missing.join(', ')}`);
    else dangling.push({ ...e, missing });
    return false;
  });
  ofType('route').forEach((r) => r.steps.filter((s) => !nodes.has(s)).forEach((s) => dangling.push({ from: r.id, to: s, type: 'step', missing: [s] })));
  list.forEach((n) => {
    if (n.series && !nodes.has(n.series)) errors.push(`${n.id}: シリーズ ${n.series} が未定義`);
    if (n.place && !nodes.has(n.place.region)) errors.push(`${n.id}: 地域 ${n.place.region} が未定義`);
    if (n.place && n.place.at && !(Math.abs(n.place.at[0]) <= 90 && Math.abs(n.place.at[1]) <= 180)) errors.push(`${n.id}: 緯度経度が範囲外`);
    if (n.family && !nodes.has(n.family)) errors.push(`${n.id}: 系統 ${n.family} が未定義`);
    (n.lenses || []).filter((l) => !nodes.has(l)).forEach((l) => errors.push(`${n.id}: レンズ ${l} が未定義`));
    Object.entries(n.url || {}).forEach(([lang, url]) => { if (!exists(url.split('#')[0])) errors.push(`${n.id}: ${lang} の URL ${url} にファイルがありません`); });
    (n.time || []).forEach((t) => {
      if (!(Number.isFinite(t.start) && Number.isFinite(t.end)) || t.start > t.end) errors.push(`${n.id}: 時間の範囲が不正 ${t.start}..${t.end}`);
      else if (t.start < PRESENT - MAX_AGE - 1 || t.end > PRESENT + 200) errors.push(`${n.id}: 時間が範囲外 ${t.start}..${t.end}`);
      if (!t.precision) errors.push(`${n.id}: 時間の精度がありません`);
    });
  });
  works.forEach((w) => { if (!w.series) errors.push(`${w.id}: シリーズがありません`); if (!w.url || !w.url.ja) errors.push(`${w.id}: URL がありません`); });
  g.edges.filter((e) => e.origin === 'curated' && CROSS.has(e.type)).forEach((e) => {
    if (!e.why || !e.why.ja || e.why.ja.length < 20) errors.push(`edges.json: ${e.from} → ${e.to} に理由（why、20字以上）がありません`);
    (e.via || []).filter((id) => !nodes.has(id)).forEach((id) => errors.push(`edges.json: ${e.from} → ${e.to} の via ${id} が存在しません`));
  });

  // --- compared with the last published build ------------------------------------------------
  if (previous) {
    const gone = previous.ids.filter((id) => !nodes.has(id) && !retired.includes(id));
    if (gone.length) errors.push(`公開済みの ID が消えています（改名・削除は data/atlas/retired-ids.json に記録）: ${gone.slice(0, 8).join(', ')}${gone.length > 8 ? ` ほか${gone.length - 8}件` : ''}`);
    if (!allowShrink) Object.entries(previous.counts).forEach(([type, before]) => {
      const now = ofType(type).length;
      if (now < before * 0.95) errors.push(`${type} が ${before} → ${now} に減りました。既存ファイルの形が変わった可能性があります（意図した変更なら --allow-shrink）`);
    });
  }
  if (registry) registry.unused().forEach((key) => warnings.push(`固定 ID の対応先が見つかりません（題や日付が変わった可能性）: ${key}`));

  // --- completeness (editorial) --------------------------------------------------------------
  const out = (id, type) => g.edges.filter((e) => e.from === id && e.type === type);
  const neighbours = new Map(works.map((w) => [w.id, new Set()]));
  g.edges.filter((e) => WORK_LINKS.has(e.type) && neighbours.has(e.from) && neighbours.has(e.to)).forEach((e) => { neighbours.get(e.from).add(e.to); neighbours.get(e.to).add(e.from); });
  const crossesSeries = (w, hops) => {
    let frontier = [w.id]; const seen = new Set(frontier);
    for (let i = 0; i < hops; i += 1) {
      frontier = frontier.flatMap((id) => [...neighbours.get(id)]).filter((id) => !seen.has(id) && seen.add(id));
      if (frontier.some((id) => nodes.get(id).series !== w.series)) return true;
    }
    return false;
  };
  const group = (title, items) => { if (items.length) todo.push({ title, items }); };
  group('時間の範囲が未入力の作品', works.filter((w) => !(w.time || []).length).map((w) => w.id));
  group('概念が2つ未満の作品', works.filter((w) => out(w.id, 'about').length < 2).map((w) => w.id));
  group('理由つきの橋（bridges）を持たない作品', works.filter((w) => !g.edges.some((e) => e.type === 'bridges' && e.origin === 'curated' && (e.from === w.id || e.to === w.id))).map((w) => w.id));
  group('2歩以内に別シリーズへ行けない作品', works.filter((w) => !crossesSeries(w, 2)).map((w) => w.id));
  group('説明のない概念（名前だけ使われている）', ofType('concept').filter((c) => c.status === 'undefined').map((c) => c.id));
  group('大きな問いに結びついていない作品の問い', ofType('question').filter((q) => q.level === 'work' && !q.parent).map((q) => q.id));
  group('内容の確認待ちの橋（review: pending）', g.edges.filter((e) => e.review === 'pending').map((e) => `${e.from} → ${e.to}`));
  group('時間の範囲が下書きの作品（curated-draft）', works.filter((w) => (w.time || []).some((t) => t.origin === 'curated-draft')).map((w) => w.id));
  group('場所のわからない出来事（年表・哲学史・教育史）', ofType('event').filter((e) => e.stream !== 'work-timeline' && !e.future && !e.place).map((e) => e.id));
  group('地域の手がかりがない作品', works.filter((w) => !w.regions).map((w) => w.id));
  group('英語の題がない作品', works.filter((w) => !w.title.en).map((w) => w.id));
  group('年が読み取れない出来事', ofType('event').filter((e) => !(e.time || []).length).map((e) => `${e.id}（${e.timeLabel?.ja || '—'}）`));

  // --- warnings ------------------------------------------------------------------------------
  const touched = new Set(g.edges.flatMap((e) => [e.from, e.to]));
  ['concept', 'person'].forEach((type) => { const lonely = ofType(type).filter((n) => !touched.has(n.id)); if (lonely.length) warnings.push(`どこにもつながっていない ${type}: ${lonely.length}件（例 ${lonely.slice(0, 5).map((n) => n.id).join(', ')}）`); });
  ofType('series').filter((s) => s.status === 'planned').forEach((s) => warnings.push(`構想中のシリーズ「${s.title.ja}」: 作品ページ 0${s.mediaCount ? `、先行するメディア ${s.mediaCount}本` : ''}${s.note ? ' — ' + s.note : ''}`));
  const lone = ofType('concept').filter((c) => new Set(g.edges.filter((e) => e.to === c.id && e.type === 'about').map((e) => e.from)).size < 2).length;
  warnings.push(`1作品にしか現れない概念: ${lone} / ${ofType('concept').length}件（横断に使えるのは残り ${ofType('concept').length - lone}件）`);
  const token = (title) => title.split(/[と・、の（]/)[0];
  const merge = [];
  ofType('event').filter((e) => e.layer === 'philosophy').forEach((p) => ofType('event').filter((e) => e.stream === 'philosophy-history').forEach((h) => {
    const a = token(p.title.ja), b = token(h.title.ja);
    if (a.length >= 2 && (h.title.ja.includes(a) || p.title.ja.includes(b)) && !g.edges.some((e) => e.type === 'sameAs' && e.from === p.id && e.to === h.id)) merge.push(`${p.id} ⇔ ${h.id}`);
  }));
  if (merge.length) warnings.push(`同じ題材らしい出来事（未対応の統合候補）: ${merge.length}組 — ${merge.join(' / ')}`);
  g.notes.forEach((n) => warnings.push(n));

  return { errors, todo, warnings, dangling };
}
