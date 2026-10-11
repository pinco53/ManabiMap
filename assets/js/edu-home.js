(function () {
  'use strict';
  var root = document.getElementById('edu-series');
  if (!root) return;
  var parts = Array.isArray(window.ManabiEduParts) ? window.ManabiEduParts : [];
  var byNumber = {};
  parts.forEach(function (part) { byNumber[part.number] = part; });
  var acts = [
    { name: '子どもの土台', numbers: [21, 23, 28, 30, 31] },
    { name: '大人の関わり', numbers: [22, 24, 25, 27] },
    { name: '学び方と学びの場', numbers: [26, 29, 32] }
  ];
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }
  root.innerHTML = acts.map(function (act, index) {
    return '<section class="edu-act" aria-labelledby="edu-act-' + (index + 1) + '">' +
      '<div class="edu-act__head"><span>ACT 0' + (index + 1) + '</span><h3 id="edu-act-' + (index + 1) + '">第' + (index + 1) + '幕　' + esc(act.name) + '</h3></div>' +
      '<div class="edu-act__grid">' + act.numbers.map(function (number) {
        var part = byNumber[number];
        if (!part) return '<div class="edu-part-card is-pending"><span>第' + number + '部 <small>EDU</small></span><strong>準備中</strong><em>準備中</em></div>';
        return '<a class="edu-part-card" href="parts/part' + number + '.html" style="--edu-part-color:' + esc(part.color || '#b5c95e') + '">' +
          '<span>第' + number + '部 <small>' + esc(part.colorName || '準備中') + '</small></span>' +
          '<strong>' + esc(part.title || '準備中') + '</strong><p>' + esc(part.subtitle || '準備中') + '</p><em>この部を読む ↗</em></a>';
      }).join('') + '</div></section>';
  }).join('');
}());
