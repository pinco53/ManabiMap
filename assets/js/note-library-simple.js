(function () {
  'use strict';

  var data = window.ManabiMapData;
  var latestRoot = document.querySelector('[data-note-latest]');
  var groupsRoot = document.querySelector('[data-note-groups]');
  if (!data || !latestRoot || !groupsRoot || !Array.isArray(data.notes)) return;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function partIdFor(note) {
    if (note.primaryPart && /^part/.test(note.primaryPart)) return note.primaryPart;
    return (note.relatedParts || []).find(function (id) { return /^part/.test(id); }) || 'other';
  }

  function partFor(id) {
    return (data.parts || []).find(function (part) { return part.id === id; });
  }

  function labelFor(id) {
    var part = partFor(id);
    return part ? '第' + part.number + '部 ' + part.title : 'そのほか';
  }

  function groupLabelFor(id) {
    var part = partFor(id);
    if (!part) return '<span class="note-part-group__title">そのほか</span>';
    return '<span class="note-part-group__number">' + escapeHtml(part.number) + '</span>' +
      '<span class="note-part-group__title">' + escapeHtml(part.title) + '</span>';
  }

  function formatDate(value) {
    if (!value) return '';
    return value.replace(/-/g, '.');
  }

  var notes = data.notes.filter(function (note) {
    return note.status === 'published' && note.url;
  }).sort(function (a, b) {
    var dateOrder = String(b.date || '').localeCompare(String(a.date || ''));
    return dateOrder || Number(b.number || 0) - Number(a.number || 0);
  });

  var count = document.querySelector('[data-note-count]');
  if (count) count.textContent = notes.length + '本';

  latestRoot.innerHTML = notes.slice(0, 6).map(function (note) {
    var image = note.image ? '<span class="note-latest-card__image"><img src="' + escapeHtml(note.image) + '" alt="" width="960" height="540" loading="lazy" decoding="async"></span>' : '';
    return '<article class="note-latest-card">' + image + '<div>' +
      '<span class="note-latest-card__meta">' + escapeHtml(labelFor(partIdFor(note))) + (note.date ? ' · ' + escapeHtml(formatDate(note.date)) : '') + '</span>' +
      '<h3><a href="' + escapeHtml(note.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(note.title) + '</a></h3>' +
      '<p>' + escapeHtml(note.excerpt || '') + '</p>' +
      '<a class="text-link" href="' + escapeHtml(note.url) + '" target="_blank" rel="noopener noreferrer">読む <span aria-hidden="true">↗</span></a>' +
    '</div></article>';
  }).join('');

  var grouped = {};
  notes.forEach(function (note) {
    var id = partIdFor(note);
    if (!grouped[id]) grouped[id] = [];
    grouped[id].push(note);
  });

  var orderedIds = (data.parts || []).map(function (part) { return part.id; }).filter(function (id) { return grouped[id] && grouped[id].length; });
  Object.keys(grouped).forEach(function (id) { if (orderedIds.indexOf(id) === -1) orderedIds.push(id); });

  function articleRows(items) {
    return items.map(function (note) {
      return '<a class="note-part-row" href="' + escapeHtml(note.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span>#' + escapeHtml(note.number) + '</span><strong>' + escapeHtml(note.title) + '</strong><small>' + escapeHtml(formatDate(note.date)) + '</small><em>読む ↗</em>' +
      '</a>';
    }).join('');
  }

  groupsRoot.innerHTML = orderedIds.map(function (id) {
    var items = grouped[id];
    return '<details class="note-part-group" data-note-part="' + escapeHtml(id) + '">' +
      '<summary><span class="note-part-group__label">' + groupLabelFor(id) + '</span><small>' + items.length + '本</small><em>開く</em></summary>' +
      '<div class="note-part-group__list" data-note-part-list></div>' +
    '</details>';
  }).join('');

  groupsRoot.querySelectorAll('[data-note-part]').forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (!details.open || details.dataset.rendered === 'true') return;
      var list = details.querySelector('[data-note-part-list]');
      list.innerHTML = articleRows(grouped[details.dataset.notePart] || []);
      details.dataset.rendered = 'true';
    });
  });
})();
