/*
 * 138億年の年表に「つながり」を足す。
 * 年表は「順に読む」場所のまま。出来事の詳細に、扱う作品・きっかけ・その先・同じ頃を比べる入口を加える。
 * データは assets/atlas/data/atlas-timeline.js（Atlas のビルドが生成）。年表の既存スクリプトには手を入れない。
 * 出来事との対応は日本語の題で取る（年表側に固定の ID が無いため）。
 */
(function () {
  'use strict';
  var data = window.ManabiAtlasTimeline;
  var dialog = document.getElementById('deepTimeDialog');
  var titleNode = document.getElementById('deepTimeDialogTitle');
  var linksNode = document.getElementById('deepTimeDialogLinks');
  if (!data || !dialog || !titleNode || !linksNode) return;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function riverUrl(entry) {
    return 'atlas.html?view=river' + (entry.scale ? '&scale=' + entry.scale : '') + '&focus=' + encodeURIComponent(entry.id).replace(/%3A/g, ':');
  }

  // 読み物としての年表のカードを、題から引けるようにする
  var cards = {};
  Array.prototype.forEach.call(document.querySelectorAll('.timeline-container .event'), function (node) {
    var heading = node.querySelector('.event-title');
    if (!heading) return;
    var icon = heading.querySelector('.icon');
    var title = heading.textContent.replace(icon ? icon.textContent : '', '').trim();
    if (data[title]) cards[title] = node;
  });
  function goToCard(title) {
    var node = cards[title];
    if (!node) return false;
    if (dialog.open) dialog.close();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    node.classList.add('atlas-tl-arrived');
    window.setTimeout(function () { node.classList.remove('atlas-tl-arrived'); }, 2400);
    return true;
  }

  var style = document.createElement('style');
  style.textContent = [
    '.atlas-tl{margin:18px 0 6px;padding-top:16px;border-top:1px solid #7c8e9c44;text-align:left}',
    '.atlas-tl h3{margin:14px 0 8px;font-size:11px;font-weight:600;letter-spacing:.12em;color:#9aa6b4}',
    '.atlas-tl h3:first-child{margin-top:0}',
    '.atlas-tl ul{margin:0;padding:0;list-style:none;display:grid;gap:8px}',
    '.atlas-tl__item{display:grid;gap:2px;width:100%;padding:10px 12px;border:1px solid #7c8e9c44;border-radius:8px;background:#ffffff08;color:inherit;font:inherit;text-align:left;text-decoration:none;cursor:pointer}',
    '.atlas-tl__item:hover,.atlas-tl__item:focus-visible{border-color:#d6c49f}',
    '.atlas-tl__item small{font-size:11px;color:#cbbb9c}',
    '.atlas-tl__item strong{font-size:14px;font-weight:600;color:#f1ede2}',
    '.atlas-tl__item span{font-size:12.5px;line-height:1.7;color:#c3c9d2}',
    '.atlas-tl__compare{display:inline-block;margin-top:14px;color:#cbbb9c;font-size:13px}',
    '.atlas-tl__place{margin:0 0 4px;font-size:12px;color:#c4b894}',
    '.atlas-tl-row{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:12px;font-size:12px;line-height:1.7}',
    '.atlas-tl-row span{opacity:.72}',
    '.atlas-tl-row a,.atlas-tl-row button{padding:0;border:0;background:none;color:inherit;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer;opacity:.9}',
    '.atlas-tl-row a:hover,.atlas-tl-row button:hover{opacity:1}',
    '.atlas-tl-arrived .event-card{outline:2px solid #d6c49f;outline-offset:4px}'
  ].join('');
  document.head.appendChild(style);

  function item(x, kind) {
    var label = [x.where, x.when].filter(Boolean).join('　');
    var inner = (label ? '<small>' + esc(label) + '</small>' : '') + '<strong>' + esc(x.title) + '</strong>' + (x.why ? '<span>' + esc(x.why) + '</span>' : '');
    if (x.url) return '<li><a class="atlas-tl__item" href="' + esc(x.url) + '" data-track-event="atlas_timeline_follow" data-track-content-id="' + kind + '">' + inner + '</a></li>';
    if (cards[x.title]) return '<li><button type="button" class="atlas-tl__item" data-atlas-go="' + esc(x.title) + '" data-track-event="atlas_timeline_follow" data-track-content-id="' + kind + '">' + inner + '</button></li>';
    return '<li><div class="atlas-tl__item" style="cursor:default">' + inner + '</div></li>';
  }
  function block(heading, list, kind) {
    return list.length ? '<h3>' + heading + '</h3><ul>' + list.map(function (x) { return item(x, kind); }).join('') + '</ul>' : '';
  }

  // ---- 詳細ダイアログ：題が入れ替わるたびに、つながりを描き直す
  var extra = document.createElement('div');
  extra.className = 'atlas-tl';
  extra.id = 'atlasTimelineExtra';
  linksNode.insertAdjacentElement('afterend', extra);
  function render() {
    var entry = data[titleNode.textContent.trim()];
    if (!entry) { extra.hidden = true; extra.innerHTML = ''; return; }
    var already = Array.prototype.map.call(linksNode.querySelectorAll('a'), function (a) { return (a.getAttribute('href') || '').split('#')[0]; });
    var works = entry.works.filter(function (w) { return already.indexOf(w.url) < 0; }).map(function (w) { return { title: w.title, where: w.label, url: w.url }; });
    var html = (entry.place ? '<p class="atlas-tl__place">場所：' + esc(entry.place) + '</p>' : '') +
      block('きっかけ・背景', entry.before, 'before') + block('その先に起きたこと', entry.after, 'after') +
      block('この出来事を扱う部', works, 'work') + block('別の年表でも読む', entry.same, 'same') +
      '<a class="atlas-tl__compare" href="' + esc(riverUrl(entry)) + '" data-track-event="atlas_timeline_compare">同じ頃を、ほかの流れと比べる（知の地図帳）→</a>';
    extra.innerHTML = html;
    extra.hidden = false;
  }
  new MutationObserver(render).observe(titleNode, { childList: true, characterData: true, subtree: true });
  if (titleNode.textContent.trim()) render();
  extra.addEventListener('click', function (event) {
    var target = event.target.closest('[data-atlas-go]');
    if (target) goToCard(target.getAttribute('data-atlas-go'));
  });

  // ---- 読み物のカード：その先へ進む一行と、比べる入口
  Object.keys(cards).forEach(function (title) {
    var entry = data[title], card = cards[title].querySelector('.event-card');
    if (!card || (!entry.after.length && !entry.before.length)) return;
    var row = document.createElement('p');
    row.className = 'atlas-tl-row';
    var next = entry.after.filter(function (x) { return cards[x.title]; });
    var html = next.length ? '<span>その先：</span>' + next.map(function (x) { return '<button type="button" data-atlas-go="' + esc(x.title) + '" title="' + esc(x.why) + '">' + esc(x.title) + ' →</button>'; }).join('') : '';
    html += '<a href="' + esc(riverUrl(entry)) + '">同じ頃を比べる →</a>';
    row.innerHTML = html;
    row.addEventListener('click', function (event) {
      var target = event.target.closest('[data-atlas-go]');
      if (target) goToCard(target.getAttribute('data-atlas-go'));
    });
    card.appendChild(row);
  });
})();
