(function () {
  'use strict';
  var root = document.getElementById('edu-history-root');
  var title = document.getElementById('edu-history-title');
  var lead = document.getElementById('edu-history-lead');
  var history = window.ManabiEduHistory;
  if (!root || !history) return;

  function value(item) { return item == null || item === '' ? '準備中' : String(item); }
  function esc(item) {
    return value(item).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }
  function partLink(id) {
    return /^part[1-9]\d*$/.test(id) ? 'parts/' + id + '.html' : '';
  }
  function cardLink(id) {
    if (/^R-[A-G]\d+$/.test(id)) return 'edu-research.html#' + id;
    if (/^M-\d+$/.test(id)) return 'edu-evidence.html#' + id;
    if (/^P-[JWB]\d+$/.test(id)) return 'edu-people.html#' + id;
    return '';
  }
  function linkList(ids, hrefFor) {
    if (!Array.isArray(ids) || !ids.length) return '<span class="edu-history-pending">準備中</span>';
    return ids.map(function (id) {
      var href = hrefFor(id);
      return href ? '<a href="' + esc(href) + '">' + esc(id) + ' ↗</a>' : '<span class="edu-history-pending">' + esc(id) + ' · 準備中</span>';
    }).join('');
  }
  function episodeLink(id) {
    return /^\d+-\d+$/.test(id) ? 'parts/part' + id.split('-')[0] + '.html#episode-' + id : '';
  }
  function certaintyBadge(certainty) {
    if (!certainty) return '';
    var labels = { robust: ['◎', 'くり返し確かめられた'], qualified: ['◐', '条件つき・後日談あり'], contested: ['△', '論争中・確かめられていない'] };
    var mark = labels[certainty] || ['—', '準備中'];
    return '<span class="edu-catalog-badge edu-catalog-badge--' + esc(certainty) + '"><b aria-hidden="true">' + mark[0] + '</b>' + mark[1] + '</span>';
  }
  function eventCard(item, index) {
    var extras = '';
    if (Array.isArray(item.relatedHumanParts) && item.relatedHumanParts.length) {
      extras += '<div class="edu-history-event__links"><span>人類史の部</span>' + linkList(item.relatedHumanParts, partLink) + '</div>';
    }
    if (Array.isArray(item.relatedEpisodes) && item.relatedEpisodes.length) {
      extras += '<div class="edu-history-event__links"><span>学びシリーズの話</span>' + linkList(item.relatedEpisodes, episodeLink) + '</div>';
    }
    return '<article class="edu-history-event" id="history-' + esc(item.lane) + '-' + esc(item.year) + '-' + index + '"><div class="edu-history-event__top"><time datetime="' + esc(item.year) + '">' + esc(item.year) + '</time>' + certaintyBadge(item.certainty) + '</div><h4>' + esc(item.title) + '</h4><p>' + esc(item.description) + '</p><div class="edu-history-event__links"><span>関連カード</span>' + linkList(item.relatedCards, cardLink) + '</div>' + extras + '</article>';
  }
  title.textContent = value(history.title);
  lead.textContent = value(history.lead);

  var bridges = Array.isArray(history.bridges) ? history.bridges : [];
  var bridgeHtml = '<section class="edu-history-bridges" aria-labelledby="edu-history-bridges-title"><div class="edu-catalog-section__head"><span>ANOTHER LENS</span><h2 id="edu-history-bridges-title">人類史とのつながり</h2></div><div class="edu-history-bridges__grid">' + (bridges.length ? bridges.map(function (bridge) {
    var href = partLink(bridge.humanPart);
    return '<div class="edu-history-bridge"><div>' + (href ? '<a href="' + esc(href) + '">' + esc(bridge.label) + ' ↗</a>' : '<span>' + esc(bridge.label) + '</span>') + '</div><p>' + esc(bridge.edu) + '</p></div>';
  }).join('') : '<p>準備中</p>') + '</div></section>';

  var items = Array.isArray(history.items) ? history.items : [];
  var indexed = items.map(function (item, index) { return { item: item, index: index + 1 }; });
  var years = Array.from(new Set(indexed.map(function (entry) { return Number(entry.item.year); }).filter(Number.isFinite))).sort(function (a, b) { return a - b; });
  var decades = Array.from(new Set(years.map(function (year) { return Math.floor(year / 10) * 10; })));
  function laneCards(year, lane) {
    var matches = indexed.filter(function (entry) { return entry.item.lane === lane && Number(entry.item.year) === year; });
    return '<div class="edu-history-lane edu-history-lane--' + lane + (matches.length ? '' : ' is-empty') + '" aria-label="' + (lane === 'world' ? '世界' : '日本') + '">' + (matches.length ? matches.map(function (entry) { return eventCard(entry.item, entry.index); }).join('') : '<span class="edu-history-lane__empty" aria-hidden="true"></span>') + '</div>';
  }
  var timelineHtml = '<section class="edu-history-timeline" aria-labelledby="edu-history-timeline-title"><div class="edu-catalog-section__head"><span>TWO TIMELINES</span><h2 id="edu-history-timeline-title">世界と日本を、同じ年代で。</h2></div><div class="edu-history-labels" aria-hidden="true"><span>年</span><span>WORLD · 世界</span><span>JAPAN · 日本</span></div>' + (decades.length ? decades.map(function (decade) {
    return '<section class="edu-history-decade" id="decade-' + decade + '" aria-labelledby="decade-' + decade + '-title"><h3 id="decade-' + decade + '-title">' + decade + '–' + (decade + 9) + '</h3>' + years.filter(function (year) { return Math.floor(year / 10) * 10 === decade; }).map(function (year) {
      return '<div class="edu-history-row" id="year-' + year + '"><span class="edu-history-row__year">' + year + '</span>' + laneCards(year, 'world') + laneCards(year, 'japan') + '</div>';
    }).join('') + '</section>';
  }).join('') : '<p>準備中</p>') + '</section>';
  root.innerHTML = bridgeHtml + timelineHtml;
}());
