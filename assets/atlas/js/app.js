// Atlas UI: tabs, lenses, the detail card, search, the trail, the list view and AI hand-off.
import { loadAtlas, Store, TYPE_LABEL, RIVER_SCALES, riverScale, PRESENT, MAX_AGE } from './graph.js';
import { createViews } from './views.js';

const $ = (id) => document.getElementById(id);
const esc = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const root = $('atlas'), card = $('atlasCard'), live = $('atlasLive');
const EDGE_HEAD = { bridges: 'シリーズをまたぐ橋', next: '次に読む', relatesTo: 'ページからのリンク' };
const VIEW_NAME = { galaxy: '銀河', river: '時の河', stars: '問いの星座', list: 'リスト' };
const DEPTH_TEXT = (d) => (d < 34 ? '全体を眺める' : d < 70 ? '作品のあいだを歩く' : '一つの作品へ潜る');

function visitedWorks() {        // read-only: the existing footprints stay on this device
  try { return new Set(Object.keys((JSON.parse(localStorage.getItem('manabimap_footprints_v1')) || {}).visited || {}).map((id) => 'work:' + id)); } catch (_) { return new Set(); }
}

loadAtlas('assets/atlas/data/').then((atlas) => {
  const store = new Store(atlas);
  const canvas = $('atlasCanvas'), wide = matchMedia('(min-width: 901px)');
  const rectIn = (el) => { const r = el.getBoundingClientRect(), c = canvas.getBoundingClientRect(); return [r.left - c.left, r.top - c.top, r.right - c.left, r.bottom - c.top]; };
  const env = {
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, visited: visitedWorks(),
    // How much of the canvas the side panels cover, so the views can centre themselves in the rest.
    inset: () => ({ l: wide.matches && root.dataset.view !== 'river' ? rectIn(document.querySelector('.atlas-lenses'))[2] + 8 : 0, r: wide.matches && !card.hidden ? canvas.getBoundingClientRect().width - rectIn(card)[0] + 8 : 0,
      b: wide.matches ? 0 : !card.hidden ? Math.max(0, canvas.getBoundingClientRect().height - rectIn(card)[1]) : root.dataset.view === 'river' ? 0 : 150 }),
    // Areas where canvas labels must not be drawn (the heading and the controls sit on top of the canvas).
    obstacles: () => [document.querySelector('.atlas-question'), $('atlasControls')].filter((el) => el.offsetParent).map(rectIn)
  };
  const views = createViews($('atlasCanvas'), atlas, store, env);
  const title = (id) => atlas.title(id);
  const say = (text) => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = text; }); };

  // ---------------------------------------------------------------- small builders
  const go = (id, { note = '', why = '', flag = '' } = {}) => {
    const n = atlas.get(id), series = atlas.seriesOf(id), kind = n.type === 'work' && series ? title(series) : n.type === 'event' ? atlas.streamLabel(n) : TYPE_LABEL[n.type];
    return `<li><button type="button" class="atlas-go" data-go="${esc(id)}" style="--chip:${atlas.color(id)}"><small>${esc(kind)}${note ? '　' + esc(note) : ''}${flag ? `<mark>${esc(flag)}</mark>` : ''}</small><strong>${esc(title(id))}</strong>${why ? `<span>${esc(why)}</span>` : ''}</button></li>`;
  };
  const block = (heading, items) => (items.length ? `<h3>${esc(heading)}</h3><ul>${items.join('')}</ul>` : '');
  const chips = (heading, ids, attr = 'data-go') => (ids.length ? `<h3>${esc(heading)}</h3><div class="atlas-chips">${ids.map((id) => `<button type="button" ${attr}="${esc(id)}">${esc(title(id))}</button>`).join('')}</div>` : '');
  const viewButtons = (id) => ['galaxy', 'river', 'stars'].filter((v) => v !== store.state.view && (v !== 'river' || atlas.time(id)) && (v !== 'galaxy' || atlas.get(id).pos))
    .map((v) => `<button type="button" data-view-to="${v}">${VIEW_NAME[v]}で見る</button>`).join('');
  const pathButton = (id) => {
    const s = store.state;
    if (s.start && s.start !== id) return `<button type="button" data-act="path">「${esc(title(s.start).slice(0, 10))}」からここへの道</button>`;
    return `<button type="button" data-act="start" aria-pressed="${s.start === id}">${s.start === id ? '出発点に設定中' : 'ここを出発点にする'}</button>`;
  };

  // ---------------------------------------------------------------- the detail card
  function cardBody(n) {
    const id = n.id, summary = (n.summary && n.summary.ja) || '', when = atlas.timeText(id);
    const head = (kindExtra = '') => `<button type="button" class="atlas-card__close" data-act="close" aria-label="詳細を閉じる">×</button><p class="atlas-card__kind">${esc(TYPE_LABEL[n.type])}${kindExtra}</p><h2 id="atlasCardTitle">${esc(title(id))}</h2>${when ? `<p class="atlas-card__when">${esc(when)}</p>` : ''}`;
    const actions = (primary, extra = '') => `<div class="atlas-actions">${primary}${viewButtons(id)}${extra}${pathButton(id)}</div>`;

    if (n.type === 'work') {
      const series = atlas.get(n.series), by = (type) => atlas.links(id, [type]).filter((l) => atlas.get(l.other).type === 'work');
      const bridges = by('bridges').map((l) => go(l.other, { why: l.edge.why.ja, flag: l.edge.review === 'pending' ? '確認待ち' : '' }));
      const next = atlas.links(id, ['next']).filter((l) => l.forward).map((l) => go(l.other));
      const related = by('relatesTo').map((l) => go(l.other));
      const others = atlas.otherAnswers(id).map((o) => go(o.id, { note: '共通の問い：' + title(o.shared[0]).slice(0, 18) + '…' }));
      const episodes = atlas.all('episode').filter((e) => e.work === id);
      const media = {}; atlas.links(id, ['deepens']).forEach((l) => { const m = atlas.get(l.other); if (m.type === 'media') media[m.kind] = (media[m.kind] || 0) + 1; });
      const mediaLine = [['note', '読む', 'note.html'], ['podcast', '聴く', 'podcast.html'], ['youtube', '観る', 'youtube.html']].filter(([k]) => media[k]).map(([k, label, href]) => `<a href="${href}">${label} ${media[k]}本</a>`).join('　');
      const programme = n.program && atlas.get(n.program), numbered = n.number ? `第${esc(n.number)}部` : '';
      return head(`<i style="color:${atlas.color(id)}">${esc(series.title.ja)}${programme ? '' : ' ' + numbered}</i>${programme ? `<span>${esc(programme.title.ja)} ${numbered}</span>` : ''}`) +
        (summary ? `<p class="atlas-card__lead">${esc(summary)}</p>` : '') +
        atlas.ownQuestions(id).slice(0, 3).map((q) => `<blockquote>${esc(title(q))}</blockquote>`).join('') +
        chips('この作品が向かう大きな問い', atlas.bigQuestions(id), 'data-anchor') +
        block(EDGE_HEAD.bridges, bridges) + block('同じ問いの、別の答え', others) + block(EDGE_HEAD.next, next) + block(EDGE_HEAD.relatesTo, related) +
        block('関わる出来事', atlas.sameEra(id, 4).map((e) => go(e, { note: atlas.timeText(e) }))) +
        chips('概念', atlas.concepts(id)) +
        (episodes.length ? `<h3>話</h3><details><summary>全${episodes.length}話を見る</summary><ul>${episodes.map((e) => `<li>${esc(e.title.ja)}</li>`).join('')}</ul></details>` : '') +
        (mediaLine ? `<p class="atlas-note">${mediaLine}</p>` : '') +
        actions(`<a class="is-primary" href="${esc(n.url.ja)}">作品ページをひらく →</a>`) + '<div data-ai></div>';
    }
    if (n.type === 'event') {
      const works = atlas.links(id, ['happenedAt']).filter((l) => ['work', 'series'].includes(atlas.get(l.other).type)).map((l) => go(l.other));
      const same = atlas.links(id, ['sameAs']).map((l) => go(l.other, { note: '同じ題材' }));
      const people = atlas.links(id, ['features']).map((l) => l.other).filter((p) => atlas.get(p).type === 'person');
      const page = { 'deep-time': ['evolution.html', '138億年の年表で、順に読む →'], 'philosophy-history': ['philosophy-history.html', '哲学の歴史をひらく →'], 'edu-history': ['edu-history.html', '教育の歴史をひらく →'] }[n.stream];
      const workPage = n.work && atlas.get(n.work);
      return head(`<i>${esc(atlas.streamLabel(n))}</i>`) + (summary ? `<p class="atlas-card__lead">${esc(summary)}</p>` : '') +
        (n.question ? `<blockquote>${esc(n.question.ja)}</blockquote>` : '') +
        block('この出来事を扱う作品', works.concat(workPage ? [go(workPage.id)] : [])) + block('別の場所での扱い', same) +
        block('同じ頃、ほかの流れでは', atlas.sameEra(id, 4).map((e) => go(e, { note: atlas.timeText(e) }))) + chips('人物', people) +
        ((n.sources || []).length ? `<p class="atlas-note">出典：${n.sources.slice(0, 3).map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer">${esc(s.label || '参考')} ↗</a>`).join('　')}</p>` : '') +
        actions(page ? `<a class="is-primary" href="${page[0]}">${page[1]}</a>` : workPage ? `<a class="is-primary" href="${esc(workPage.url.ja)}#timeline">作品ページの年表をひらく →</a>` : '') + '<div data-ai></div>';
    }
    if (n.type === 'question' || n.type === 'concept') {
      const members = atlas.members(id);
      const child = (w) => (n.type === 'question' ? atlas.ownQuestions(w).filter((q) => atlas.get(q).parent === id).map(title)[0] || '' : '');
      const seriesCount = new Set(members.map((w) => atlas.seriesOf(w))).size;
      return head() + (summary ? `<p class="atlas-card__lead">${esc(summary)}</p>` : '') +
        `<p class="atlas-note">${members.length}作品・${seriesCount}シリーズが、この${n.type === 'question' ? '問い' : '概念'}に集まっています。</p>` +
        block(n.type === 'question' ? 'この問いに向かう作品と、それぞれの問い方' : 'この概念を扱う作品', members.map((w) => go(w, { why: child(w) }))) +
        `<div class="atlas-actions"><button type="button" class="is-primary" data-anchor="${esc(id)}">問いの星座の中心に置く</button>${pathButton(id)}</div><div data-ai></div>`;
    }
    if (n.type === 'person') {
      const linked = atlas.links(id, ['features']).map((l) => l.other);
      const pick = (type) => linked.filter((o) => atlas.get(o).type === type).map((o) => go(o));
      return head(n.field ? `<i>${esc(n.field)}</i>` : '') + (n.role ? `<p class="atlas-card__lead">${esc(n.role)}</p>` : '') + (summary ? `<p class="atlas-card__lead">${esc(summary)}</p>` : '') +
        block('登場する作品', pick('work')) + block('関わるシリーズ', pick('series')) + block('年表の出来事', pick('event')) + block('研究カード', pick('study').slice(0, 5)) + `<div class="atlas-actions">${pathButton(id)}</div>`;
    }
    if (n.type === 'series') {
      const works = atlas.members(id), planned = n.status === 'planned';
      const people = atlas.links(id, ['features']).map((l) => l.other), events = atlas.links(id, ['happenedAt']).map((l) => go(l.other, { note: atlas.timeText(l.other) }));
      return head(planned ? '<i style="color:var(--atlas-gold)">構想中</i>' : '') + (summary ? `<p class="atlas-card__lead">${esc(summary)}</p>` : '') +
        (planned ? `<p class="atlas-note">まだ作品ページはありません。${n.mediaCount ? `先行して公開された回が${n.mediaCount}本あります。` : ''}作品ができると、つながりの深い作品の近くに星が灯ります。</p>` : '') +
        block('作品', works.map((w) => go(w))) + chips('つながる人物', people) + block('入口になる出来事', events) + chips('概念', atlas.links(id, ['about']).map((l) => l.other)) +
        `<div class="atlas-actions">${viewButtons(id)}</div>`;
    }
    if (n.type === 'episode') {
      const work = atlas.get(n.work);
      return head(`<i>${esc(title(work.id))}　第${n.order}話</i>`) + (n.question && n.question.ja ? `<blockquote>${esc(n.question.ja)}</blockquote>` : '') + block('この話がある作品', [go(work.id)]) +
        `<div class="atlas-actions"><a class="is-primary" href="${esc(work.url.ja)}${n.anchor ? '#' + esc(n.anchor) : ''}">この話をひらく →</a></div><div data-ai></div>`;
    }
    return head() + (summary ? `<p class="atlas-card__lead">${esc(summary)}</p>` : '');
  }
  function prompt() {
    const s = store.state, n = atlas.get(s.focus);
    if (!n) return '';
    const questions = n.type === 'work' ? atlas.ownQuestions(n.id).map(title) : n.type === 'question' ? [title(n.id)] : n.question ? [n.question.ja] : [];
    const trail = s.trail.slice(-5), reasons = [];
    for (let i = 1; i < trail.length; i += 1) { const link = atlas.links(trail[i - 1], ['bridges']).find((l) => l.other === trail[i]); if (link) reasons.push(`・「${title(trail[i - 1])}」と「${title(trail[i])}」のつながり：${link.edge.why.ja}`); }
    return [
      '私は Manabi Map の「知の地図帳」で、分野をまたいで学んでいます。',
      `いま見ているのは「${title(n.id)}」（${TYPE_LABEL[n.type]}${atlas.timeText(n.id) ? '、' + atlas.timeText(n.id) : ''}）です。${(n.summary && n.summary.ja) || ''}`,
      questions.length ? '考えたい問い：\n' + questions.map((q) => '・' + q).join('\n') : '',
      trail.length > 1 ? `ここまで「${trail.map(title).join(' → ')}」とたどってきました。` : '',
      reasons.join('\n'),
      s.lens ? `「${title(s.lens)}」という切り口で見ています。` : '',
      '答えをまとめて教えるのではなく、対話の相手になってください。まず、私がこのテーマをどう考えているかを一つだけ質問してください。私が答えたら、別の時代か別の分野からの見方を一つ示し、私の考えと比べる問いを返してください。'
    ].filter(Boolean).join('\n\n');
  }
  let shown = null;
  function renderCard(force) {
    const s = store.state, n = atlas.get(s.focus);
    if (!n) { card.hidden = true; shown = null; return; }
    const key = [n.id, s.view, s.start, atlas.loaded.size].join('|');
    if (key === shown && !force) return;
    shown = key; card.hidden = false; card.innerHTML = cardBody(n); card.scrollTop = 0; card.setAttribute('aria-labelledby', 'atlasCardTitle');
    const slot = card.querySelector('[data-ai]');
    if (slot && window.ManabiAI) { slot.innerHTML = '<h3>AIと考える</h3>'; window.ManabiAI.mount(slot, prompt); }
  }
  card.addEventListener('click', (e) => {
    const t = e.target.closest('[data-go],[data-anchor],[data-act],[data-view-to]');
    if (!t) return;
    const s = store.state;
    if (t.dataset.go) store.set({ focus: t.dataset.go });
    else if (t.dataset.anchor) store.set({ view: 'stars', anchor: t.dataset.anchor, focus: t.dataset.anchor });
    else if (t.dataset.viewTo) store.set({ view: t.dataset.viewTo, ...(t.dataset.viewTo === 'stars' ? { anchor: null } : {}), ...(t.dataset.viewTo === 'galaxy' ? { depth: Math.max(s.depth, 50) } : {}) });
    else if (t.dataset.act === 'close') { store.set({ focus: null }); $('atlasCanvas').focus(); }
    else if (t.dataset.act === 'start') { store.set({ start: s.start === s.focus ? null : s.focus }); say(store.state.start ? `「${title(s.focus)}」を出発点にしました。行き先を選んで、道を探してください。` : '出発点を外しました。'); }
    else if (t.dataset.act === 'path') {
      const found = atlas.path(s.start, s.focus);
      if (found && found.length > 1) { store.set({ path: found.map((x) => x.id), start: null }); say(`${found.length - 1}歩の道が見つかりました。`); }
      else say('この2つをつなぐ道は、まだありません。');
    }
  });

  // ---------------------------------------------------------------- top question, lenses, controls
  const lensButtons = atlas.all('lens').map((l) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.lens = l.id; b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<span>${esc(l.title.ja)}</span><b>${atlas.members(l.id).length || ''}</b>`;
    b.addEventListener('click', () => store.set({ lens: store.state.lens === l.id ? null : l.id }));
    $('atlasLenses').appendChild(b);
    return b;
  });
  const scaleButtons = RIVER_SCALES.map((sc) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.scale = sc.key; b.innerHTML = `<b>${esc(sc.label)}</b><small>${esc(sc.note)}</small>`;
    b.addEventListener('click', () => store.set({ scale: sc.key }));
    $('atlasScales').appendChild(b);
    return b;
  });
  function renderScale() {       // how long is this ruler, compared with everything?
    const sc = riverScale(store.state.scale), years = sc.from === undefined ? MAX_AGE : PRESENT - sc.from, share = years / MAX_AGE;
    scaleButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.scale === sc.key)));
    $('atlasScaleBar').style.width = sc.from === undefined ? '100%' : Math.max(0.15, share * 100) + '%';
    const inverse = 1 / share, rounded = inverse >= 1e4 ? Math.round(inverse / 1e4).toLocaleString('ja-JP') + '万' : (Math.round(inverse / 10) * 10).toLocaleString('ja-JP');
    const part = share >= 0.01 ? `約${Math.round(share * 100)}%` : `約${rounded}分の1`;
    $('atlasScaleText').innerHTML = sc.from === undefined
      ? '<strong>一望</strong>：138億年を1画面に収めるため、昔ほど縮めて描いています（長さは比べられません）。物差しを選ぶと、等間隔の目盛りになります。'
      : `<strong>${esc(sc.label)}</strong>：画面の幅が${esc(sc.note)}。等間隔の目盛りです。宇宙の歴史（138億年）の${part}にあたります（上の線の金色の部分）。`;
  }
  function renderHead() {
    renderScale();
    const s = store.state, lens = atlas.get(s.lens), works = atlas.all('work').length;
    root.dataset.view = s.view;
    document.querySelectorAll('.atlas-tabs [data-view]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.view === s.view)));
    lensButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lens === s.lens)));
    $('atlasDepth').value = String(Math.round(s.depth)); $('atlasDepthText').textContent = DEPTH_TEXT(s.depth);
    $('atlasByTime').setAttribute('aria-pressed', String(Boolean(s.byTime)));
    let eyebrow = 'ATLAS ／ ' + VIEW_NAME[s.view], question = '世界の知識は、どこでつながっている？';
    let count = `${works}の作品・${atlas.all('series').filter((x) => x.status !== 'planned').length}のシリーズ${atlas.loaded.has('events') ? '・' + atlas.all('event').filter((e) => e.stream !== 'work-timeline').length + 'の出来事' : ''}が、ひとつの地図にあります。`;
    if (s.view === 'stars') { const c = views.centre(); eyebrow = '問いの星座'; question = c ? '' : question; count = 'まわりの星を選ぶと、中心が入れ替わります。'; }
    else if (s.view === 'river') { question = '時の河 ── 物差しを替えて、同じ頃を比べる'; count = ''; }
    if (lens) { eyebrow = 'レンズ ／ ' + lens.title.ja; if (s.view === 'galaxy') question = lens.question.ja; count = `${atlas.members(lens.id).length}の作品が、この問いの重力に引き寄せられています。`; }
    $('atlasEyebrow').textContent = eyebrow; $('atlasQuestion').textContent = question; $('atlasCount').textContent = count;
  }
  document.querySelectorAll('.atlas-tabs [data-view]').forEach((b) => b.addEventListener('click', () => store.set({ view: b.dataset.view })));
  $('atlasDepth').addEventListener('input', (e) => store.set({ depth: Number(e.target.value) }, { push: false }));
  $('atlasByTime').addEventListener('click', () => store.set({ byTime: !store.state.byTime }, { push: false }));
  $('atlasRandom').addEventListener('click', () => {
    const pool = atlas.all('question').filter((q) => q.level === 'big' && q.id !== store.state.anchor), q = pool[Math.floor(Math.random() * pool.length)];
    store.set({ view: 'stars', anchor: q.id, focus: q.id });
  });

  // ---------------------------------------------------------------- trail
  $('atlasTrail').addEventListener('click', (e) => {
    const t = e.target.closest('[data-go],[data-act]');
    if (!t) return;
    if (t.dataset.go) store.set({ focus: t.dataset.go });
    else if (t.dataset.act === 'clear') store.set({ path: null });
    else if (t.dataset.act === 'share') { const done = () => say('この画面のリンクをコピーしました。'); (navigator.clipboard ? navigator.clipboard.writeText(location.href) : Promise.reject()).then(done, () => window.prompt('このリンクをコピーしてください', location.href)); }
  });
  function renderTrail() {
    const s = store.state, step = (id, cls = '') => `<button type="button" class="${cls}" data-go="${esc(id)}">${esc(title(id).slice(0, 16))}</button>`;
    let html = '';
    if (s.path) {
      html += '<span>見つけた道</span>' + s.path.map((id, i) => { const link = i ? atlas.links(s.path[i - 1]).find((l) => l.other === id) : null; return (i ? `<i>—${esc(link ? ({ bridges: '橋', about: '概念', asks: '問い', next: '次', happenedAt: '出来事', features: '人物', sameAs: '同題材', relatesTo: '関連' }[link.edge.type] || '') : '')}→</i>` : '') + step(id, 'is-path'); }).join('') + '<button type="button" data-act="clear" aria-label="見つけた道を消す">×</button>';
    } else if (s.trail.length) html += '<span>来た道</span>' + s.trail.map((id, i) => (i ? '<i>›</i>' : '') + step(id)).join('');
    else html += '<span>星を選ぶと、ここに歩いた道が残ります。</span>';
    $('atlasTrail').innerHTML = html + '<button type="button" class="atlas-trail__end" data-act="share">この画面を共有</button>';
  }

  // ---------------------------------------------------------------- list view (also the keyboard and no-canvas path)
  function renderList() {
    if (store.state.view !== 'list') return;
    const s = store.state, lens = s.lens, familyOf = (x) => (x.family && atlas.get(x.family) && atlas.get(x.family).centre ? atlas.get(x.family).title.ja + '　' : ''), item = (id) => go(id).replace('<li>', atlas.get(id).type === 'work' && lens && !(atlas.get(id).lenses || []).includes(lens) ? '<li class="is-dim">' : '<li>');
    const series = atlas.all('series');
    $('atlasList').innerHTML = '<div class="atlas-list__inner">' +
      series.filter((x) => x.status !== 'planned').map((x) => `<h2>${esc(x.title.ja)}<small>${esc(familyOf(x))}${atlas.members(x.id).length}作品</small></h2><ul>${atlas.members(x.id).map(item).join('')}</ul>`).join('') +
      `<h2>構想中のシリーズ<small>作品ができると星が灯ります</small></h2><ul>${series.filter((x) => x.status === 'planned').map((x) => go(x.id)).join('')}</ul>` +
      `<h2>大きな問い<small>問いの星座の中心</small></h2><ul>${atlas.all('question').filter((q) => q.level === 'big').map((q) => go(q.id, { note: atlas.members(q.id).length + '作品' })).join('')}</ul>` +
      `<h2>概念<small>作品をまたいで現れる考え方</small></h2><ul>${atlas.all('concept').map((c) => go(c.id, { note: atlas.members(c.id).length + '作品' })).join('')}</ul></div>`;
  }
  $('atlasList').addEventListener('click', (e) => { const t = e.target.closest('[data-go]'); if (t) store.set({ focus: t.dataset.go }); });
  $('atlasSkip').addEventListener('click', (e) => { e.preventDefault(); store.set({ view: 'list' }); $('atlasList').focus(); });

  // ---------------------------------------------------------------- search
  const input = $('atlasSearch'), results = $('atlasResults');
  const closeResults = () => { results.hidden = true; input.setAttribute('aria-expanded', 'false'); };
  const choose = (id) => { closeResults(); input.value = ''; const n = atlas.get(id); store.set({ focus: id, ...(store.state.view === 'galaxy' && n.pos ? { depth: Math.max(store.state.depth, 50) } : {}), ...(store.state.view === 'stars' && n.type !== 'work' ? { anchor: ['question', 'concept'].includes(n.type) ? id : store.state.anchor } : {}) }); };
  input.addEventListener('input', () => {
    const found = atlas.search(input.value);
    results.innerHTML = found.map((id) => `<li role="option"><button type="button" data-go="${esc(id)}"><small>${esc(TYPE_LABEL[atlas.get(id).type])}${atlas.seriesOf(id) && atlas.get(id).type === 'work' ? '　' + esc(title(atlas.seriesOf(id))) : ''}</small>${esc(title(id))}</button></li>`).join('') || (input.value.trim() ? '<li><button type="button" disabled>見つかりませんでした</button></li>' : '');
    results.hidden = !results.innerHTML; input.setAttribute('aria-expanded', String(!results.hidden));
  });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const first = results.querySelector('[data-go]'); if (first) choose(first.dataset.go); } else if (e.key === 'Escape') { closeResults(); input.blur(); } else if (e.key === 'ArrowDown') { const first = results.querySelector('[data-go]'); if (first) { e.preventDefault(); first.focus(); } } });
  results.addEventListener('click', (e) => { const t = e.target.closest('[data-go]'); if (t) choose(t.dataset.go); });
  document.addEventListener('click', (e) => { if (!e.target.closest('.atlas-search')) closeResults(); });

  // ---------------------------------------------------------------- keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, select, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    const view = { 1: 'galaxy', 2: 'river', 3: 'stars', 4: 'list' }[e.key];
    if (view) store.set({ view });
    else if (e.key === '/') { e.preventDefault(); input.focus(); }
    else if (e.key === 'r' || e.key === 'R') $('atlasRandom').click();
    else if (e.key === 'Escape' && store.state.focus) { store.set({ focus: null }); $('atlasCanvas').focus(); }
  });

  // ---------------------------------------------------------------- wiring
  let lastFocus = store.state.focus;
  store.on((s, patch) => {
    renderHead(); renderCard('start' in patch || 'view' in patch); renderTrail(); renderList();
    if (s.focus && s.focus !== lastFocus) {
      const n = atlas.get(s.focus), links = n.type === 'work' ? atlas.links(n.id, ['bridges']).length : 0;
      say(`${TYPE_LABEL[n.type]}「${title(n.id)}」${links ? `。${links}本の橋で別のシリーズとつながっています` : ''}`);
    }
    lastFocus = s.focus;
  });
  if (store.state.focus) store.state.trail = [store.state.focus];
  renderHead(); renderCard(); renderTrail(); renderList();
  atlas.ready.then(() => {
    if (store.pendingFocus && atlas.get(store.pendingFocus)) store.set({ focus: store.pendingFocus }, { push: false });
    renderHead(); renderCard(true); views.refresh();
  });
}).catch((error) => {
  console.error(error);
  $('atlasQuestion').textContent = '地図のデータを読み込めませんでした。';
  $('atlasCount').innerHTML = '<a href="map.html" style="pointer-events:auto">学びの地図（一覧）</a>から、各作品へ進めます。';
});
