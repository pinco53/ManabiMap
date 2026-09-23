(function () {
  'use strict';
  var data = window.ManabiMapEnglish;
  var root = document.querySelector('[data-english-part-index]');
  if (!data || !root) return;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  var groups = [];
  data.parts.forEach(function (part) {
    var group = groups.find(function (item) { return item.name === part.group; });
    if (!group) { group = { name: part.group, parts: [] }; groups.push(group); }
    group.parts.push(part);
  });

  root.innerHTML = groups.map(function (group, groupIndex) {
    var headingId = 'english-map-group-' + (groupIndex + 1);
    return '<section class="simple-part-group" aria-labelledby="' + headingId + '">' +
      '<header><h2 id="' + headingId + '">' + escapeHtml(group.name) + '</h2><span>' + group.parts.length + (group.parts.length === 1 ? ' map' : ' maps') + '</span></header>' +
      '<div class="simple-part-grid">' + group.parts.map(function (part) {
        var tags = part.tags.slice(0, 3).map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join('');
        var href = part.englishUrl || ('part.html?id=' + encodeURIComponent(part.id));
        var action = part.englishUrl ? 'Read the full English edition' : 'Open this learning map';
        return '<a class="simple-part-card" href="' + escapeHtml(href) + '">' +
          '<span class="simple-part-card__number">PART ' + escapeHtml(part.number) + '</span>' +
          '<h3>' + escapeHtml(part.title) + '</h3>' +
          '<p>' + escapeHtml(part.subtitle) + '</p>' +
          '<span class="simple-part-card__tags">' + tags + '</span>' +
          '<strong>' + action + ' <span aria-hidden="true">→</span></strong>' +
        '</a>';
      }).join('') + '</div>' +
    '</section>';
  }).join('');
})();
