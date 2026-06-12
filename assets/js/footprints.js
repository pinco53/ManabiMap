/*
 * 無言の足あと ── 訪れたページをこの端末のlocalStorageにだけ記録する。
 * 数値もバーもボタンも出さない。Manabi Mapで訪れた星が微かに灯り、
 * 一行の「続きから」リンクが出るだけ。サーバーには何も送らない。
 */
(function() {
  'use strict';

  const KEY = 'manabimap_footprints_v1';

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === 'object' && parsed.visited ? parsed : { visited: {} };
    } catch (error) {
      return { visited: {} };
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (error) {
      /* プライベートモード等で保存できない場合は黙って諦める */
    }
  }

  function pageId() {
    const file = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
    if (/^part/.test(file)) {
      if (file === 'part8_2') return 'part8-2';
      return file.replace(/_\d+$/, '');
    }
    return file || 'index';
  }

  const state = load();
  state.visited[pageId()] = new Date().toISOString();
  save(state);

  function lastVisitedPart() {
    const partIds = Object.keys(state.visited).filter(function(id) {
      return /^part/.test(id);
    });
    if (!partIds.length) return null;
    partIds.sort(function(a, b) {
      return state.visited[a] < state.visited[b] ? 1 : -1;
    });
    const data = window.ManabiMapData;
    return data && data.findById ? data.findById(partIds[0]) : null;
  }

  function injectStyles() {
    if (document.getElementById('manabi-footprints-style')) return;
    const style = document.createElement('style');
    style.id = 'manabi-footprints-style';
    style.textContent = [
      '.map-node.is-visited { box-shadow: 0 0 18px -4px currentColor; }',
      '.map-node.is-visited .map-node-num { text-shadow: 0 0 12px currentColor; }',
      '.manabi-footprint-line { display: inline-block; margin-top: 18px; color: #9b9bb4; font-size: 12px; letter-spacing: 0.06em; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.22); padding-bottom: 2px; transition: color 0.25s, border-color 0.25s; }',
      '.manabi-footprint-line:hover { color: #ffffff; border-color: rgba(255,255,255,0.5); }',
      '.manabi-footprint-line strong { color: #cfcfe2; font-weight: 700; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function init() {
    const grid = document.getElementById('map-node-grid');
    if (!grid) return;
    injectStyles();

    grid.querySelectorAll('.map-node').forEach(function(node) {
      if (state.visited[node.dataset.id]) {
        node.classList.add('is-visited');
      }
    });

    const part = lastVisitedPart();
    const header = document.querySelector('.map-base-header');
    if (!part || !part.pageUrl || !header || document.querySelector('.manabi-footprint-line')) return;
    const line = document.createElement('a');
    line.className = 'manabi-footprint-line';
    line.href = part.pageUrl;
    line.innerHTML = '前回は<strong>「' + part.title + '」</strong>のあたりを歩いていました ─ 続きから';
    header.appendChild(line);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
