/*
 * 作品ページの末尾に「別のシリーズへの橋」を出す。
 * データは assets/atlas/data/atlas-bridges.js（Atlas のビルドが生成）。本文の HTML 構造には依存しない。
 * 作り方の違う4種類の作品ページに、<script> を足すだけで同じパネルが出る。
 */
(function () {
  'use strict';
  var all = window.ManabiAtlasBridges;
  if (!all) return;

  function pageId() {
    var file = (window.location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    if (file === 'part8_2') return 'part8-2';
    return file.replace(/^(part\d+)_\d+$/, '$1');          // 分冊（part9_1 など）は元の部として扱う
  }
  var id = pageId(), entry = all[id];
  if (!entry || document.querySelector('.atlas-bridge')) return;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  // 作品ページは parts/ の中にあるので、parts/xxx.html へのリンクは同じ階層の xxx.html になる
  function href(url) { return url.replace(/^parts\//, ''); }
  function card(item, kind, text) {
    var target = href(item.url).replace(/\.html$/, '');
    return '<a class="atlas-bridge__card" href="' + esc(href(item.url)) + '" data-track-event="atlas_bridge_follow" data-track-source="' + esc(id) + '" data-track-content-id="' + esc(kind) + '" data-track-destination-type="part" data-track-destination-id="' + esc(target) + '">' +
      '<span class="atlas-bridge__label">' + esc(item.label) + '</span><strong>' + esc(item.title) + '</strong><span class="atlas-bridge__why">' + esc(text) + '</span><em>この部へ進む <span aria-hidden="true">→</span></em></a>';
  }

  var style = document.createElement('style');
  style.textContent = [
    '.atlas-bridge{position:relative;z-index:1;box-sizing:border-box;max-width:1280px;margin:0 auto;padding:72px clamp(20px,7vw,90px) 96px;color:#e8e6df;font-family:"Noto Sans JP","Hiragino Sans",sans-serif;line-height:1.8;text-align:left}',
    '.atlas-bridge *{box-sizing:border-box}',
    '.atlas-bridge__eyebrow{margin:0 0 14px;font:600 11px/1.4 "Inter",sans-serif;letter-spacing:.16em;color:#d9bf7d}',
    '.atlas-bridge h2{margin:0 0 10px;font:500 clamp(24px,3.4vw,38px)/1.5 "Zen Old Mincho",serif;color:#f4f1e8;letter-spacing:.02em}',
    '.atlas-bridge__lead{margin:0 0 28px;max-width:46em;font-size:14px;color:#b9bcc8}',
    '.atlas-bridge h3{margin:38px 0 14px;font:600 12px/1.4 "Noto Sans JP",sans-serif;letter-spacing:.12em;color:#9ea3b5}',
    '.atlas-bridge__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:14px}',
    '.atlas-bridge__card{display:grid;gap:8px;align-content:start;padding:24px 26px;border:1px solid rgba(211,230,255,.16);border-radius:18px;background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.012));color:inherit;text-decoration:none;transition:border-color .25s,transform .25s}',
    '.atlas-bridge__card:hover,.atlas-bridge__card:focus-visible{border-color:rgba(217,191,125,.7);transform:translateY(-2px)}',
    '.atlas-bridge__card:focus-visible{outline:2px solid #d9bf7d;outline-offset:3px}',
    '.atlas-bridge__label{font-size:11px;letter-spacing:.08em;color:#d9bf7d}',
    '.atlas-bridge__card strong{font:500 19px/1.6 "Zen Old Mincho",serif;color:#fff}',
    '.atlas-bridge__why{font-size:13.5px;color:#c6c9d6}',
    '.atlas-bridge__card em{margin-top:6px;font-style:normal;font-size:12px;color:#aeb3c6}',
    '.atlas-bridge__routes{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:10px}',
    '.atlas-bridge__routes a{display:inline-flex;align-items:baseline;gap:12px;padding:12px 18px;border:1px solid rgba(217,191,125,.35);border-radius:999px;color:#f4f1e8;font:500 15px/1.5 "Zen Old Mincho",serif;text-decoration:none}',
    '.atlas-bridge__routes a:hover,.atlas-bridge__routes a:focus-visible{border-color:#d9bf7d;background:rgba(217,191,125,.08)}',
    '.atlas-bridge__routes span{font:400 11px/1.4 "Noto Sans JP",sans-serif;color:#d9bf7d;white-space:nowrap}',
    '.atlas-bridge__more{margin:30px 0 0;font-size:13px}',
    '.atlas-bridge__more a{color:#d9bf7d;text-underline-offset:4px}',
    '@media (prefers-reduced-motion:reduce){.atlas-bridge__card{transition:none}.atlas-bridge__card:hover{transform:none}}'
  ].join('');

  var section = document.createElement('section');
  section.className = 'atlas-bridge';
  section.setAttribute('aria-labelledby', 'atlas-bridge-title');
  var where = entry.series + (entry.programme ? '（' + entry.programme + '）' : '');
  section.innerHTML = '<p class="atlas-bridge__eyebrow">ACROSS SERIES</p>' +
    '<h2 id="atlas-bridge-title">この部から、別のシリーズへ。</h2>' +
    '<p class="atlas-bridge__lead">この部は「' + esc(where) + '」の一つです。同じ問いは、別の時代や別の分野でも考えられてきました。</p>' +
    (entry.bridges.length ? '<h3>つながる部と、その理由</h3><div class="atlas-bridge__grid">' + entry.bridges.map(function (b) { return card(b, 'bridge', b.why); }).join('') + '</div>' : '') +
    (entry.same.length ? '<h3>同じ問いの、別の答え</h3><div class="atlas-bridge__grid">' + entry.same.map(function (b) { return card(b, 'same-question', '共通の問い：' + b.question); }).join('') + '</div>' : '') +
    ((entry.routes || []).length ? '<h3>この部を通る道</h3><ul class="atlas-bridge__routes">' + entry.routes.map(function (r) {
      return '<li><a href="../' + esc(r.url) + '" data-track-event="atlas_route_open" data-track-source="' + esc(id) + '">' + esc(r.title) + '<span>' + r.steps + '歩の道 →</span></a></li>';
    }).join('') + '</ul>' : '') +
    '<p class="atlas-bridge__more"><a href="../atlas.html?focus=work:' + esc(id) + '" data-track-event="atlas_open" data-track-source="' + esc(id) + '">知の地図帳で、この部のつながりを見る <span aria-hidden="true">→</span></a></p>';

  function mount() {
    if (document.querySelector('.atlas-bridge')) return;
    var footer = document.querySelector('body > footer'), root = document.getElementById('part-series-root');
    var navs = document.querySelectorAll('body > .chapter-nav'), nav = navs.length ? navs[navs.length - 1] : null;   // 分冊は章ナビが上下にある。末尾のほうを使う
    document.head.appendChild(style);
    if (footer) footer.parentNode.insertBefore(section, footer);           // 哲学・数学のページ：フッターの前
    else if (root) root.insertAdjacentElement('afterend', section);        // 本編・EDU：本文のあと
    else if (nav) nav.insertAdjacentElement('afterend', section);          // 分冊：章ナビのあと
    else document.body.appendChild(section);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
