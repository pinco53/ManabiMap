(function () {
  'use strict';

  var data = window.ManabiMapData;
  var root = document.querySelector('[data-part-index]');
  if (!data || !root || !Array.isArray(data.parts)) return;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  var mode = root.getAttribute('data-index-mode') || 'dialogue';
  var action = mode === 'map' ? 'この部を見る' : '対話テーマを選ぶ';
  var groups = [];

  data.parts.forEach(function (part) {
    var group = part.group || 'そのほか';
    var existing = groups.find(function (item) { return item.name === group; });
    if (!existing) {
      existing = { name: group, parts: [] };
      groups.push(existing);
    }
    existing.parts.push(part);
  });

  root.innerHTML = groups.map(function (group, groupIndex) {
    var headingId = 'part-group-' + (groupIndex + 1);
    return '<section class="simple-part-group" aria-labelledby="' + headingId + '">' +
      '<header><h2 id="' + headingId + '">' + escapeHtml(group.name) + '</h2><span>' + group.parts.length + '部</span></header>' +
      '<div class="simple-part-grid">' + group.parts.map(function (part) {
        var tags = (part.tags || []).slice(0, 3).map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join('');
        return '<a class="simple-part-card" href="' + escapeHtml(part.pageUrl) + '">' +
          '<span class="simple-part-card__number">第' + escapeHtml(part.number) + '部</span>' +
          '<h3>' + escapeHtml(part.title) + '</h3>' +
          '<p>' + escapeHtml(part.subtitle) + '</p>' +
          '<span class="simple-part-card__tags">' + tags + '</span>' +
          '<strong>' + action + ' <span aria-hidden="true">→</span></strong>' +
        '</a>';
      }).join('') + '</div>' +
    '</section>';
  }).join('');
})();
