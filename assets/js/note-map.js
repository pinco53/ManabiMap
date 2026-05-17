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
    },
    podcast: function(note) {
      return textAny(note, ['ポッドキャスト', 'Podcast', 'podcast']);
    }
  };

  function textAny(note, words) {
    const source = [
      note.title,
      note.target,
      note.question,
      note.relation,
      note.excerpt
    ].concat(note.tags || []).join(' ');
    return words.some(function(word) {
      return source.indexOf(word) !== -1;
    });
  }

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
    const noteId = card.dataset.noteId;
    if (noteId) {
      const byId = data.notes.find(function(item) { return item.id === noteId; });
      if (byId) return byId;
    }
    const fromData = data.notes.find(function(item) { return item.number === number; });
    if (fromData) return fromData;

    const title = card.querySelector('.card-title');
    const readLink = card.querySelector('[data-note-read-link]');
    const tags = Array.from(card.querySelectorAll('.tag')).map(function(tag) {
      return tag.textContent.replace(/^#/, '').trim();
    }).filter(Boolean);

    return {
      id: 'card-note-' + number,
      number: number,
      title: title ? title.textContent.trim() : 'note article',
      url: readLink ? readLink.getAttribute('href') : '',
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
    if (card.querySelector('.card-branch')) return;
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

  function firstMediaFor(note, type) {
    if (type === 'podcast') {
      if (note.relatedPodcastId) {
        const explicitPodcast = data.findById(note.relatedPodcastId);
        if (explicitPodcast && explicitPodcast.url) return explicitPodcast;
      }
      if (note.relatedPodcastUrl) {
        const matchedPodcast = data.mediaItems.find(function(item) {
          return item.type === 'podcast' && item.url === note.relatedPodcastUrl;
        });
        if (matchedPodcast) return matchedPodcast;
        return {
          id: note.relatedPodcastId || 'podcast-' + note.id,
          url: note.relatedPodcastUrl
        };
      }
    }
    if (type === 'youtube') {
      if (note.relatedYouTubeId) {
        const explicitVideo = data.findById(note.relatedYouTubeId);
        if (explicitVideo && explicitVideo.url) return explicitVideo;
      }
      if (note.relatedYouTubeUrl) {
        const matchedVideo = data.mediaItems.find(function(item) {
          return item.type === 'youtube' && item.url === note.relatedYouTubeUrl;
        });
        if (matchedVideo) return matchedVideo;
        return {
          id: note.relatedYouTubeId || 'youtube-' + note.id,
          url: note.relatedYouTubeUrl
        };
      }
    }
    const partIds = (note.relatedParts || []).filter(function(id) {
      return /^part/.test(id);
    });
    for (let i = 0; i < partIds.length; i++) {
      const media = data.mediaForPart(partIds[i], type).find(function(item) {
        return item && item.url;
      });
      if (media) return media;
    }
    return null;
  }

  function attachBridgeLinks(card, note) {
    if (!note || card.querySelector('.note-bridge')) return;
    const youtube = firstMediaFor(note, 'youtube');
    const podcast = firstMediaFor(note, 'podcast');
    if (!youtube && !podcast) return;

    const bridge = document.createElement('div');
    bridge.className = 'note-bridge';

    if (youtube) {
      const video = document.createElement('a');
      video.className = 'note-bridge__link note-bridge__link--video';
      video.href = youtube.url;
      video.target = '_blank';
      video.rel = 'noopener noreferrer';
      video.textContent = note.ctaCopy || '関連動画を見る';
      video.dataset.trackEvent = 'note_to_youtube_click';
      video.dataset.trackSource = 'note';
      video.dataset.trackContentId = note.id;
      video.dataset.trackDestinationType = 'youtube_video';
      video.dataset.trackDestinationId = youtube.id;
      bridge.appendChild(video);
    }

    if (podcast) {
      const audio = document.createElement('a');
      audio.className = 'note-bridge__link note-bridge__link--podcast';
      audio.href = podcast.url;
      audio.target = '_blank';
      audio.rel = 'noopener noreferrer';
      audio.textContent = '対応Podcastを聴く';
      audio.dataset.trackEvent = 'note_to_podcast_click';
      audio.dataset.trackSource = 'note';
      audio.dataset.trackContentId = note.id;
      audio.dataset.trackDestinationType = 'podcast';
      audio.dataset.trackDestinationId = podcast.id;
      bridge.appendChild(audio);
    }

    const footer = card.querySelector('.card-footer');
    if (footer) {
      card.insertBefore(bridge, footer);
    } else {
      card.appendChild(bridge);
    }
  }

  function updateCount(theme) {
    const count = document.getElementById('note-filter-count');
    const label = document.getElementById('note-filter-label');
    const visible = document.querySelectorAll('.grid-section .note-card:not([hidden])').length;
    if (count) count.textContent = visible + ' articles';
    if (label) {
      const active = document.querySelector('.note-theme-button.active') || document.querySelector('.note-recommend-card.active');
      label.textContent = active ? (active.dataset.label || active.textContent.trim()) : 'すべて';
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
    document.querySelectorAll('.grid-section .note-card').forEach(function(card) {
      const note = noteFromCard(card);
      const shouldShow = note ? rule(note) : theme === 'all';
      card.hidden = !shouldShow;
      if (shouldShow) visibleCards.push(card);
    });
    document.querySelectorAll('.note-theme-button').forEach(function(button) {
      button.classList.toggle('active', button.dataset.theme === theme);
    });
    document.querySelectorAll('.note-recommend-card').forEach(function(button) {
      button.classList.toggle('active', button.dataset.theme === theme);
    });
    renderFilterResults(visibleCards);
    updateCount(theme);
  }

  function updateRecommendationCounts(cards) {
    document.querySelectorAll('[data-theme-count]').forEach(function(item) {
      const theme = item.dataset.themeCount || 'all';
      const rule = themeRules[theme] || themeRules.all;
      const count = cards.filter(function(card) {
        const note = noteFromCard(card);
        return note && rule(note);
      }).length;
      item.textContent = count + ' articles';
    });
  }

  function init() {
    const allCards = Array.from(document.querySelectorAll('.note-card'));
    const cards = Array.from(document.querySelectorAll('.grid-section .note-card'));
    allCards.forEach(function(card) {
      const note = noteFromCard(card);
      if (!note) return;
      card.id = 'note-card-' + note.number;
      card.dataset.noteId = note.id;
      card.dataset.relatedParts = (note.relatedParts || []).join(',');
      card.dataset.tags = (note.tags || []).join(',');
      if (note.status === 'local-draft') card.classList.add('is-upcoming');
      attachPartChips(card, note);
      attachBridgeLinks(card, note);
    });

    document.querySelectorAll('.note-theme-button').forEach(function(button) {
      button.addEventListener('click', function() {
        applyFilter(button.dataset.theme || 'all');
      });
    });
    document.querySelectorAll('.note-recommend-card').forEach(function(button) {
      button.addEventListener('click', function() {
        applyFilter(button.dataset.theme || 'all');
        const consolePanel = document.querySelector('.note-map-console');
        if (consolePanel) {
          consolePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    updateRecommendationCounts(cards);

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
