(function() {
  'use strict';

  const data = window.ManabiMapData;
  if (!data || !Array.isArray(data.parts)) return;

  const STORAGE_KEY = 'manabimap_user_map_v1';
  const PART_PAGE_RE = /\/parts\/part[0-9_]*\.html$/;
  const NETWORK_POINTS = {
    hub: { x: 50, y: 50 },
    part1: { x: 18, y: 70 },
    part2: { x: 30, y: 34 },
    part3: { x: 50, y: 20 },
    part4: { x: 39, y: 78 },
    part5: { x: 59, y: 64 },
    part6: { x: 77, y: 76 },
    part7: { x: 73, y: 34 },
    part8: { x: 88, y: 20 },
    'part8-2': { x: 88, y: 55 }
  };
  const NETWORK_LINKS = [
    ['hub', 'part1'], ['hub', 'part3'], ['hub', 'part5'], ['hub', 'part8-2'],
    ['part1', 'part2'], ['part2', 'part3'], ['part2', 'part4'],
    ['part3', 'part8'], ['part3', 'part8-2'],
    ['part4', 'part5'], ['part4', 'part8'],
    ['part5', 'part6'], ['part5', 'part7'],
    ['part6', 'part8-2'], ['part7', 'part8'], ['part8', 'part8-2']
  ];

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { done: [], later: [], updatedAt: null };
      const parsed = JSON.parse(raw);
      return {
        done: Array.isArray(parsed.done) ? parsed.done : [],
        later: Array.isArray(parsed.later) ? parsed.later : [],
        updatedAt: parsed.updatedAt || null
      };
    } catch (error) {
      return { done: [], later: [], updatedAt: null };
    }
  }

  function saveState(state) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function has(state, bucket, id) {
    return state[bucket].includes(id);
  }

  function toggle(bucket, id) {
    const state = loadState();
    state[bucket] = has(state, bucket, id)
      ? state[bucket].filter(function(item) { return item !== id; })
      : state[bucket].concat(id);
    saveState(state);
    refresh();
  }

  function markDone(id) {
    const state = loadState();
    if (!state.done.includes(id)) state.done.push(id);
    saveState(state);
    refresh();
  }

  function hrefFor(id) {
    if (id === 'note') return 'note.html';
    if (id === 'evolution') return 'evolution.html';
    const item = data.findById(id);
    if (!item) return 'index.html#map-base';
    if (item.type === 'part') return pathPrefix() + item.pageUrl;
    if (item.url) return item.url;
    return 'index.html#map-base';
  }

  function pathPrefix() {
    return window.location.pathname.indexOf('/parts/') !== -1 ? '../' : '';
  }

  function titleFor(id) {
    if (id === 'note') return 'note記事';
    if (id === 'evolution') return '進化の年表';
    const item = data.findById(id);
    return item ? item.title : id;
  }

  function currentPartId() {
    const file = (window.location.pathname.split('/').pop() || '').replace('.html', '');
    if (file === 'part8_2') return 'part8-2';
    return file;
  }

  function nextSuggestions(state) {
    const unfinished = data.parts.filter(function(part) {
      return !state.done.includes(part.id);
    });
    const laterParts = state.later
      .map(function(id) { return data.findById(id); })
      .filter(function(item) { return item && item.type === 'part' && !state.done.includes(item.id); });
    return laterParts.concat(unfinished).filter(function(item, index, arr) {
      return arr.findIndex(function(other) { return other.id === item.id; }) === index;
    }).slice(0, 5);
  }

  function renderGlobalPanel() {
    const anchor = document.querySelector('.map-base-section') || document.querySelector('.note-map-console');
    if (!anchor || document.querySelector('.my-map-panel')) return;
    anchor.insertAdjacentHTML('afterend', [
      '<section class="my-map-panel" aria-label="自分の学びの地図">',
      '  <div class="my-map-panel__head">',
      '    <div>',
      '      <div class="my-map-panel__label">MY MAP</div>',
      '      <div class="my-map-panel__title">自分の地図</div>',
      '    </div>',
      '    <div class="my-map-panel__status" data-my-map-status></div>',
      '  </div>',
      '  <div class="my-map-panel__body">',
      '    <div class="my-map-panel__progress">',
      '      <div class="my-map-panel__small">読んだ場所、あとで読む場所、まだ見ていない場所が、問いを中心に結び直されます。</div>',
      '      <div class="my-map-network-wrap">',
      '        <img class="my-map-network-image" src="' + pathPrefix() + 'assets/hero-proposals/hero-proposal-02-orbital-learning-atlas.png" alt="" loading="lazy">',
      '        <div class="my-map-network-shade"></div>',
      '        <div class="my-map-network-head">',
      '          <span>CONNECTION ATLAS</span>',
      '          <span data-my-map-network-count>0 / 9</span>',
      '        </div>',
      '        <svg class="my-map-network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" data-my-map-network-lines aria-hidden="true"></svg>',
      '        <a class="my-map-hub" href="' + pathPrefix() + 'index.html#map-base">',
      '          <span class="my-map-hub__label">問い</span>',
      '          <span class="my-map-hub__title">どこから<br>つながるか</span>',
      '        </a>',
      '        <div class="my-map-network" data-my-map-network></div>',
      '      </div>',
      '      <div class="my-map-progressbar"><div class="my-map-progressbar__fill" data-my-map-fill></div></div>',
      '      <div class="my-map-panel__small" data-my-map-detail></div>',
      '      <div class="my-map-summary">',
      '        <div class="my-map-stat"><div class="my-map-stat__value" data-my-map-done-parts>0</div><div class="my-map-stat__label">PARTS DONE</div></div>',
      '        <div class="my-map-stat"><div class="my-map-stat__value" data-my-map-done-notes>0</div><div class="my-map-stat__label">NOTES READ</div></div>',
      '        <div class="my-map-stat"><div class="my-map-stat__value" data-my-map-later>0</div><div class="my-map-stat__label">BOOKMARKED</div></div>',
      '      </div>',
      '    </div>',
      '    <div class="my-map-panel__next">',
      '      <div class="my-map-panel__small" style="margin-bottom:10px;">次に進むなら</div>',
      '      <div class="my-map-chip-list" data-my-map-next></div>',
      '      <a class="my-map-resume" href="#" data-my-map-resume>続きから再開する</a>',
      '    </div>',
      '  </div>',
      '</section>'
    ].join(''));
  }

  function renderPartControls() {
    if (!PART_PAGE_RE.test(window.location.pathname)) return;
    const bridge = document.querySelector('.part-map-bridge__main');
    if (!bridge || document.querySelector('.my-map-inline')) return;
    const part = data.findById(currentPartId());
    if (!part) return;
    const box = document.createElement('div');
    box.className = 'my-map-inline';
    box.innerHTML = [
      '<div class="my-map-inline__label">MY MAP</div>',
      '<div class="my-map-panel__small">この地点を航路に刻みます。読了で星が光り、あとで読むと青い航路として残ります。</div>',
      '<div class="my-map-actions">',
      '<button type="button" class="my-map-button" data-my-map-toggle="done" data-my-map-id="' + part.id + '">星に刻む</button>',
      '<button type="button" class="my-map-button my-map-button--later" data-my-map-toggle="later" data-my-map-id="' + part.id + '">青い航路に残す</button>',
      '</div>'
    ].join('');
    bridge.appendChild(box);
  }

  function statusForPart(state, part) {
    if (state.done.includes(part.id)) return { className: 'is-done', label: '到達済み', action: 'もう一度開く' };
    if (state.later.includes(part.id)) return { className: 'is-later', label: '航路に保存', action: '続きへ進む' };
    return { className: 'is-open', label: '未踏', action: '探索する' };
  }

  function lineClassFor(state, fromId, toId) {
    const ids = [fromId, toId].filter(function(id) { return id !== 'hub'; });
    if (ids.length && ids.every(function(id) { return state.done.includes(id); })) return ' is-done';
    if (ids.some(function(id) { return state.later.includes(id); })) return ' is-later';
    return '';
  }

  function drawNetworkLines(state) {
    document.querySelectorAll('[data-my-map-network-lines]').forEach(function(svg) {
      svg.innerHTML = [
        '<defs>',
        '<marker id="my-map-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="4" markerHeight="4" orient="auto-start-reverse">',
        '<path d="M 0 0 L 8 4 L 0 8 Z"></path>',
        '</marker>',
        '</defs>'
      ].join('');
      NETWORK_LINKS.forEach(function(pair, index) {
        const from = NETWORK_POINTS[pair[0]];
        const to = NETWORK_POINTS[pair[1]];
        if (!from || !to) return;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const curve = index % 2 === 0 ? 9 : -9;
        const c1x = from.x + dx * 0.34 - dy * curve / 100;
        const c1y = from.y + dy * 0.34 + dx * curve / 100;
        const c2x = from.x + dx * 0.66 - dy * curve / 100;
        const c2y = from.y + dy * 0.66 + dx * curve / 100;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M ' + from.x + ' ' + from.y + ' C ' + c1x + ' ' + c1y + ', ' + c2x + ' ' + c2y + ', ' + to.x + ' ' + to.y);
        path.setAttribute('class', 'my-map-network-link' + lineClassFor(state, pair[0], pair[1]));
        path.setAttribute('marker-start', 'url(#my-map-arrow)');
        path.setAttribute('marker-end', 'url(#my-map-arrow)');
        svg.appendChild(path);
      });
    });
  }

  function renderJourneyBoard(state) {
    drawNetworkLines(state);
    document.querySelectorAll('[data-my-map-network]').forEach(function(container) {
      container.innerHTML = '';
      data.parts.forEach(function(part, index) {
        const point = NETWORK_POINTS[part.id];
        if (!point) return;
        const status = statusForPart(state, part);
        const card = document.createElement('a');
        card.className = 'my-map-node ' + status.className;
        card.href = hrefFor(part.id);
        card.style.left = point.x + '%';
        card.style.top = point.y + '%';
        card.innerHTML = [
          '<span class="my-map-node__pin"></span>',
          '<span class="my-map-node__status">' + status.label + '</span>',
          '<span class="my-map-node__num">PART ' + part.number + '</span>',
          '<span class="my-map-node__title">' + part.title + '</span>',
          '<span class="my-map-node__action">' + status.action + '</span>'
        ].join('');
        container.appendChild(card);
      });
    });

    document.querySelectorAll('[data-my-map-network-count]').forEach(function(el) {
      const doneParts = state.done.filter(function(id) {
        const item = data.findById(id);
        return item && item.type === 'part';
      }).length;
      el.textContent = doneParts + ' / ' + data.parts.length;
    });
  }

  function bindActions() {
    document.addEventListener('click', function(event) {
      const button = event.target.closest('[data-my-map-toggle]');
      if (button) {
        event.preventDefault();
        toggle(button.dataset.myMapToggle, button.dataset.myMapId);
        return;
      }

      const noteCard = event.target.closest('.note-card[href]');
      if (noteCard && noteCard.dataset.noteId) {
        markDone(noteCard.dataset.noteId);
      }

      const resumeLink = event.target.closest('[data-my-map-resume]');
      if (resumeLink) {
        event.preventDefault();
        const state = loadState();
        const target = nextSuggestions(state)[0];
        if (target) {
          window.location.href = hrefFor(target.id);
        }
      }
    });
  }

  function refresh() {
    const state = loadState();
    const totalParts = data.parts.length;
    const doneParts = state.done.filter(function(id) {
      const item = data.findById(id);
      return item && item.type === 'part';
    }).length;
    const doneNotes = state.done.filter(function(id) {
      return /^note-/.test(id);
    }).length;
    const percent = totalParts ? Math.round((doneParts / totalParts) * 100) : 0;

    renderJourneyBoard(state);

    document.querySelectorAll('[data-my-map-status]').forEach(function(el) {
      el.textContent = doneParts + ' / ' + totalParts + ' parts';
    });
    document.querySelectorAll('[data-my-map-fill]').forEach(function(el) {
      el.style.width = percent + '%';
    });
    document.querySelectorAll('[data-my-map-detail]').forEach(function(el) {
      el.textContent = '航路完成度 ' + percent + '% / 光っている星 ' + doneParts + '個';
    });
    document.querySelectorAll('[data-my-map-next]').forEach(function(el) {
      el.innerHTML = '';
      nextSuggestions(state).forEach(function(part) {
        const a = document.createElement('a');
        a.className = 'my-map-chip';
        a.href = hrefFor(part.id);
        a.textContent = titleFor(part.id);
        el.appendChild(a);
      });
    });
    document.querySelectorAll('[data-my-map-done-parts]').forEach(function(el) {
      el.textContent = doneParts;
    });
    document.querySelectorAll('[data-my-map-done-notes]').forEach(function(el) {
      el.textContent = doneNotes;
    });
    document.querySelectorAll('[data-my-map-later]').forEach(function(el) {
      el.textContent = state.later.length;
    });
    document.querySelectorAll('[data-my-map-toggle]').forEach(function(button) {
      button.classList.toggle('is-active', has(state, button.dataset.myMapToggle, button.dataset.myMapId));
    });
    document.querySelectorAll('.note-card[data-note-id]').forEach(function(card) {
      card.classList.toggle('is-read', state.done.includes(card.dataset.noteId));
    });
  }

  function init() {
    renderGlobalPanel();
    renderPartControls();
    bindActions();
    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ManabiUserMap = {
    load: loadState,
    markDone,
    toggle,
    refresh
  };
})();
