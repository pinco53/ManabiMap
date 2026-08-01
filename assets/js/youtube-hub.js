(function () {
  'use strict';

  var grid = document.querySelector('[data-youtube-grid]');
  var data = window.ManabiMapData || {};
  var parts = Array.isArray(data.parts) ? data.parts : [];
  if (!grid) return;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  var available = parts.filter(function (part) {
    return part.youtubeUrl || part.playlistUrl;
  });

  grid.innerHTML = available.map(function (part) {
    var destination = part.playlistUrl || part.youtubeUrl;
    var action = part.playlistUrl ? 'シリーズを見る ↗' : '動画を見る ↗';
    var question = Array.isArray(part.questions) && part.questions[0] ? part.questions[0] : part.subtitle;
    return '<a class="youtube-card" href="' + escapeHtml(destination) + '" target="_blank" rel="noopener">' +
      '<span class="youtube-card__part">PART ' + escapeHtml(part.number) + '</span>' +
      '<h3>' + escapeHtml(part.title) + '</h3>' +
      '<p>' + escapeHtml(question) + '</p>' +
      '<span class="youtube-card__go">' + action + '</span>' +
    '</a>';
  }).join('');
}());
