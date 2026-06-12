/*
 * 言葉から探す ── manabimap-data を横断するクライアントサイド検索。
 * 部（動画・地図）、note記事（公開済みのみ）、Podcastをひとつの検索窓から引く。
 * サーバー不要。データは manabimap-data.js のみに依存する。
 */
(function() {
  'use strict';

  const data = window.ManabiMapData;
  if (!data || !Array.isArray(data.parts)) return;

  const TYPE_META = {
    part: { label: '部', color: '#00d4ff' },
    note: { label: 'note', color: '#41c9b4' },
    podcast: { label: 'Podcast', color: '#ffb86b' },
    infographic: { label: '図解', color: '#8da2ff' }
  };
  const MAX_RESULTS = 12;

  function displayNumber(part) {
    return String(part.number).replace(/^0/, '');
  }

  function buildIndex() {
    const entries = [];

    data.parts.forEach(function(part) {
      entries.push({
        type: 'part',
        id: part.id,
        title: '第' + displayNumber(part) + '部 ' + part.title,
        sub: part.subtitle || '',
        url: part.pageUrl || 'index.html#map-base',
        external: false,
        haystack: [
          part.title, part.subtitle, part.group, part.era,
          (part.tags || []).join(' '),
          (part.questions || []).join(' ')
        ].join(' ').toLowerCase()
      });
    });

    (data.notes || []).forEach(function(note) {
      if (!note.url || note.status === 'local-draft') return;
      entries.push({
        type: 'note',
        id: note.id,
        title: '#' + String(note.number).padStart(2, '0') + ' ' + note.title,
        sub: note.excerpt || note.question || '',
        url: note.url,
        external: true,
        haystack: [
          note.title, note.excerpt, note.question,
          (note.tags || []).join(' ')
        ].join(' ').toLowerCase()
      });
    });

    (data.mediaItems || []).forEach(function(item) {
      if (item.type !== 'podcast' || !item.url) return;
      entries.push({
        type: 'podcast',
        id: item.id,
        title: item.title,
        sub: item.question || '',
        url: item.url,
        external: true,
        haystack: [item.title, item.question].join(' ').toLowerCase()
      });
      (Array.isArray(item.infographics) ? item.infographics : []).forEach(function(infographic) {
        if (!infographic || !infographic.src) return;
        const slug = String(infographic.src).split('/').pop().replace(/\.[a-z0-9]+$/i, '');
        entries.push({
          type: 'infographic',
          id: slug,
          title: infographic.title || '図解',
          sub: infographic.caption || '',
          url: 'infographics.html#' + slug,
          external: false,
          haystack: [infographic.title, infographic.caption, item.title].join(' ').toLowerCase()
        });
      });
    });

    return entries;
  }

  const index = buildIndex();

  function search(query) {
    const terms = query.toLowerCase().split(/[\s　]+/).filter(Boolean);
    if (!terms.length) return [];
    const scored = [];
    index.forEach(function(entry) {
      let score = 0;
      const titleLower = entry.title.toLowerCase();
      const ok = terms.every(function(term) {
        if (titleLower.indexOf(term) !== -1) { score += 3; return true; }
        if (entry.haystack.indexOf(term) !== -1) { score += 1; return true; }
        return false;
      });
      if (ok) scored.push({ entry: entry, score: score });
    });
    scored.sort(function(a, b) { return b.score - a.score; });
    return scored.slice(0, MAX_RESULTS).map(function(item) { return item.entry; });
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function(char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function injectStyles() {
    if (document.getElementById('manabi-search-style')) return;
    const style = document.createElement('style');
    style.id = 'manabi-search-style';
    style.textContent = [
      '.manabi-search { max-width: 560px; margin: 26px auto 0; text-align: left; }',
      '.manabi-search__label { margin-bottom: 8px; color: #9b9bb4; font-size: 11px; font-weight: 900; letter-spacing: 0.28em; }',
      '.manabi-search__input { width: 100%; min-height: 46px; padding: 10px 16px; border: 1px solid rgba(255,255,255,0.18); border-radius: 10px; background: rgba(10,10,18,0.78); color: #fff; font: inherit; font-size: 14px; transition: border-color 0.25s, box-shadow 0.25s; }',
      '.manabi-search__input::placeholder { color: #71718c; }',
      '.manabi-search__input:focus { outline: none; border-color: rgba(0,212,255,0.55); box-shadow: 0 0 0 3px rgba(0,212,255,0.12); }',
      '.manabi-search__results { display: grid; gap: 6px; margin-top: 10px; }',
      '.manabi-search__item { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: baseline; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: rgba(12,12,20,0.82); text-decoration: none; transition: border-color 0.2s, background 0.2s; }',
      '.manabi-search__item:hover { border-color: rgba(255,255,255,0.3); background: rgba(20,20,32,0.9); }',
      '.manabi-search__type { padding: 2px 8px; border-radius: 999px; border: 1px solid currentColor; font-size: 10px; font-weight: 900; letter-spacing: 0.1em; white-space: nowrap; }',
      '.manabi-search__text { min-width: 0; }',
      '.manabi-search__title { display: block; color: #f2f2fa; font-size: 13px; font-weight: 700; line-height: 1.55; }',
      '.manabi-search__sub { display: block; overflow: hidden; color: #9b9bb4; font-size: 12px; line-height: 1.6; text-overflow: ellipsis; white-space: nowrap; }',
      '.manabi-search__empty { padding: 12px 14px; border: 1px dashed rgba(255,255,255,0.18); border-radius: 8px; color: #9b9bb4; font-size: 12px; }',
      '@media (max-width: 720px) { .manabi-search { margin-top: 20px; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function render(container) {
    container.innerHTML = [
      '<div class="manabi-search__label">WORD SEARCH ── 言葉から探す</div>',
      '<input class="manabi-search__input" type="search" placeholder="例：記憶、言語、孤独、数、AI" aria-label="サイト内のコンテンツを言葉で探す">',
      '<div class="manabi-search__results" aria-live="polite"></div>'
    ].join('');

    const input = container.querySelector('.manabi-search__input');
    const results = container.querySelector('.manabi-search__results');
    let timer = null;

    function update() {
      const query = input.value.trim();
      if (!query) {
        results.innerHTML = '';
        return;
      }
      const found = search(query);
      if (!found.length) {
        results.innerHTML = '<div class="manabi-search__empty">「' + escapeHtml(query) + '」に重なる場所は、まだ地図にありません。</div>';
        return;
      }
      results.innerHTML = found.map(function(entry) {
        const meta = TYPE_META[entry.type];
        return [
          '<a class="manabi-search__item" href="' + escapeHtml(entry.url) + '"',
          entry.external ? ' target="_blank" rel="noopener noreferrer"' : '',
          ' data-track-event="search_result_click" data-track-source="index" data-track-content-id="word-search"',
          ' data-track-destination-type="' + escapeHtml(entry.type) + '" data-track-destination-id="' + escapeHtml(entry.id) + '">',
          '<span class="manabi-search__type" style="color:' + meta.color + '">' + meta.label + '</span>',
          '<span class="manabi-search__text">',
          '<span class="manabi-search__title">' + escapeHtml(entry.title) + '</span>',
          entry.sub ? '<span class="manabi-search__sub">' + escapeHtml(entry.sub) + '</span>' : '',
          '</span>',
          '</a>'
        ].join('');
      }).join('');
    }

    input.addEventListener('input', function() {
      clearTimeout(timer);
      timer = setTimeout(update, 160);
    });
  }

  function init() {
    const header = document.querySelector('.map-base-header');
    if (!header || document.querySelector('.manabi-search')) return;
    injectStyles();
    const container = document.createElement('div');
    container.className = 'manabi-search';
    header.appendChild(container);
    render(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
