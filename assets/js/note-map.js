(function() {
  'use strict';

  const data = window.ManabiMapData;
  if (!data || !Array.isArray(data.notes)) return;

  const themeRules = {
    all: function() { return true; },
    ai: function(note) {
      return hasAny(note, ['AI', '生成AI', 'ChatGPT', '確率', '創造性']) || relatedAny(note, ['part3', 'part8', 'part8-2']);
    },
    education: function(note) {
      return hasAny(note, ['教育', '学力', '幸福度', '問い']) || relatedAny(note, ['part8-2']);
    },
    language: function(note) {
      return hasAny(note, ['言語', '言葉', '思考', '内なる声', '名前']) || relatedAny(note, ['part5']);
    },
    number: function(note) {
      return hasAny(note, ['数', '数字', '統計', '平均', 'ゼロ', '測ること']) || relatedAny(note, ['part6']);
    },
    knowledge: function(note) {
      return hasAny(note, ['文字', '知識', '検索', '読書', '記録']) || relatedAny(note, ['part4', 'part2']);
    },
    learning: function(note) {
      return hasAny(note, ['学び', '問い', '制作', 'サイト紹介', 'ManabiMap']) || relatedAny(note, ['note']);
    }
  };

  function hasAny(note, words) {
    return (note.tags || []).some(function(tag) {
      return words.some(function(word) { return tag.indexOf(word) !== -1; });
    });
  }

  function relatedAny(note, ids) {
    return (note.relatedParts || []).some(function(id) { return ids.includes(id); });
  }

  function numberFromCard(card) {
    const num = card.querySelector('.card-num');
    if (!num) return null;
    const match = num.textContent.match(/#(\d+)/);
    return match ? Number(match[1]) : null;
  }

  function noteFromCard(card) {
    const number = numberFromCard(card);
    const fromData = data.notes.find(function(item) { return item.number === number; });
    if (fromData) return fromData;

    const title = card.querySelector('.card-title');
    const tags = Array.from(card.querySelectorAll('.tag')).map(function(tag) {
      return tag.textContent.replace(/^#/, '').trim();
    }).filter(Boolean);

    return {
      id: 'card-note-' + number,
      number: number,
      title: title ? title.textContent.trim() : 'note article',
      url: card.getAttribute('href') || '',
      tags: tags,
      relatedParts: []
    };
  }

  function partLabel(id) {
    if (id === 'note') return '制作・学び';
    if (id === 'evolution') return '進化の年表';
    const item = data.findById(id);
    return item ? '第' + item.number.replace('-1', '').replace('-2', '') + '部 ' + item.title : id;
  }

  function partHref(id) {
    if (id === 'note') return 'note.html';
    if (id === 'evolution') return 'evolution.html';
    const item = data.findById(id);
    return item && item.pageUrl ? item.pageUrl : 'index.html#map-base';
  }

  function attachPartChips(card, note) {
    if (!note || card.querySelector('.note-map-links')) return;
    const related = (note.relatedParts || []).filter(function(id) {
      return id !== 'note';
    }).slice(0, 3);
    if (!related.length) return;

    const box = document.createElement('div');
    box.className = 'note-map-links';
    related.forEach(function(id) {
      const link = document.createElement('a');
      link.className = 'note-map-chip';
      link.href = partHref(id);
      link.textContent = partLabel(id);
      if (id === 'evolution') {
        link.href = 'evolution.html';
      }
      box.appendChild(link);
    });

    const footer = card.querySelector('.card-footer');
    if (footer) {
      card.insertBefore(box, footer);
    } else {
      card.appendChild(box);
    }
  }

  function updateCount(theme) {
    const count = document.getElementById('note-filter-count');
    const label = document.getElementById('note-filter-label');
    const visible = document.querySelectorAll('.note-card:not([hidden])').length;
    if (count) count.textContent = visible + ' articles';
    if (label) {
      const active = document.querySelector('.note-theme-button.active');
      label.textContent = active ? active.textContent : 'すべて';
    }
    const heroCount = document.querySelector('.hero-count');
    if (heroCount && theme) heroCount.textContent = visible + ' articles';
  }

  function renderFilterResults(cards) {
    const results = document.getElementById('note-filter-results');
    if (!results) return;
    results.innerHTML = '';

    if (!cards.length) {
      const empty = document.createElement('div');
      empty.className = 'note-filter-empty';
      empty.textContent = 'このテーマの記事はまだありません。';
      results.appendChild(empty);
      return;
    }

    cards.forEach(function(card) {
      const note = noteFromCard(card);
      if (!note) return;
      const link = document.createElement('a');
      link.className = 'note-filter-link';
      link.dataset.targetCard = card.id;
      link.href = '#' + card.id;
      const number = document.createElement('span');
      number.className = 'note-filter-link__num';
      number.textContent = '#' + note.number;
      const title = document.createElement('span');
      title.className = 'note-filter-link__title';
      title.textContent = note.title;
      link.appendChild(number);
      link.appendChild(title);
      results.appendChild(link);
    });
  }

  function focusCard(card) {
    if (!card) return;
    card.hidden = false;
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.note-card--focus').forEach(function(item) {
      item.classList.remove('note-card--focus');
    });
    card.classList.add('note-card--focus');
    window.setTimeout(function() {
      card.classList.remove('note-card--focus');
    }, 1800);
  }

  function applyFilter(theme) {
    const rule = themeRules[theme] || themeRules.all;
    const visibleCards = [];
    document.querySelectorAll('.note-card').forEach(function(card) {
      const note = noteFromCard(card);
      const shouldShow = note ? rule(note) : theme === 'all';
      card.hidden = !shouldShow;
      if (shouldShow) visibleCards.push(card);
    });
    document.querySelectorAll('.note-theme-button').forEach(function(button) {
      button.classList.toggle('active', button.dataset.theme === theme);
    });
    renderFilterResults(visibleCards);
    updateCount(theme);
  }

  function init() {
    document.querySelectorAll('.note-card').forEach(function(card) {
      const note = noteFromCard(card);
      if (!note) return;
      card.id = 'note-card-' + note.number;
      card.dataset.noteId = note.id;
      card.dataset.relatedParts = (note.relatedParts || []).join(',');
      card.dataset.tags = (note.tags || []).join(',');
      attachPartChips(card, note);
    });

    document.querySelectorAll('.note-theme-button').forEach(function(button) {
      button.addEventListener('click', function() {
        applyFilter(button.dataset.theme || 'all');
      });
    });

    const results = document.getElementById('note-filter-results');
    if (results) {
      results.addEventListener('click', function(event) {
        const link = event.target.closest('.note-filter-link');
        if (!link) return;
        const card = document.getElementById(link.dataset.targetCard);
        if (!card) return;
        event.preventDefault();
        history.replaceState(null, '', '#' + card.id);
        focusCard(card);
      });
    }

    applyFilter('all');

    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target && target.classList.contains('note-card')) {
        window.setTimeout(function() { focusCard(target); }, 120);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
