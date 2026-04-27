(function() {
  'use strict';

  const data = window.ManabiMapData;
  if (!data || !Array.isArray(data.parts)) return;

  const STORAGE_KEY = 'manabimap_user_map_v1';
  const PART_PAGE_RE = /\/parts\/part[0-9_]*\.html$/;

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
      '      <div class="my-map-panel__small">読んだ場所は金の到達印、あとで読む場所は青い航路印として残ります。</div>',
      '      <div class="my-map-board-wrap">',
      '        <div class="my-map-board-head">',
      '          <span>TRAVEL LOG</span>',
      '          <span data-my-map-board-count>0 / 9</span>',
      '        </div>',
      '        <div class="my-map-board" data-my-map-board></div>',
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

  function renderJourneyBoard(state) {
    document.querySelectorAll('[data-my-map-board]').forEach(function(container) {
      container.innerHTML = '';
      data.parts.forEach(function(part, index) {
        const status = statusForPart(state, part);
        const card = document.createElement('a');
        card.className = 'my-map-place ' + status.className;
        card.href = hrefFor(part.id);
        card.style.setProperty('--step', index + 1);
        card.innerHTML = [
          '<span class="my-map-place__status">' + status.label + '</span>',
          '<span class="my-map-place__num">PART ' + part.number + '</span>',
          '<span class="my-map-place__title">' + part.title + '</span>',
          '<span class="my-map-place__group">' + part.group + '</span>',
          '<span class="my-map-place__action">' + status.action + '</span>'
        ].join('');
        container.appendChild(card);
      });
    });

    document.querySelectorAll('[data-my-map-board-count]').forEach(function(el) {
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
