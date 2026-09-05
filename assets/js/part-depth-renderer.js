(function () {
  'use strict';

  var root = document.getElementById('part-series-root');
  var config = window.PartPageConfig;
  if (!root || !config) return;

  var mapData = window.ManabiMapData || {};

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function footer(label) {
    return '<div class="doc-footer">ハルとおじいさん｜第' + esc(config.number) + '部 ' + esc(config.title) + '　― ' + esc(label) + ' ―</div>';
  }

  function tagHtml(tag) {
    var colored = Array.isArray(tag);
    var label = colored ? tag[0] : tag;
    var className = colored && tag[1] ? ' ' + esc(tag[1]) : '';
    return '<span class="tl-tag' + className + '">' + esc(label) + '</span>';
  }

  var episodeNumber = 0;
  var chapterPages = config.chapters.map(function (chapter, chapterIndex) {
    var start = episodeNumber + 1;
    var rows = chapter.episodes.map(function (episode) {
      episodeNumber += 1;
      var tags = (episode.tags || []).map(function (tag) { return '<span class="tag">' + esc(tag) + '</span>'; }).join('');
      return '<div class="episode-row" id="theme-' + String(episodeNumber).padStart(2, '0') + '"><div class="episode-no">Theme ' + String(episodeNumber).padStart(2, '0') + '</div><div>' +
        '<div class="episode-title">' + esc(episode.title) + '</div>' +
        '<p class="episode-summary">' + esc(episode.background) + '</p>' +
        '<p class="episode-summary">' + esc(episode.lens) + '</p>' +
        '<div class="episode-question">核心の問い：' + esc(episode.question) + '</div>' +
        '<div class="tags">' + tags + '</div></div></div>';
    }).join('');
    var end = episodeNumber;
    var modifier = chapterIndex === 1 ? ' chapter-card--middle' : (chapterIndex === 2 ? ' chapter-card--final' : '');
    var bridge = chapterIndex < config.chapters.length - 1
      ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(config.chapters[chapterIndex + 1].question) + '</div></div>'
      : '<div class="pull-quote">「' + esc(config.tagline) + '」</div>';
    return '<div class="page"><div class="section-label">Chapter ' + String(chapterIndex + 1).padStart(2, '0') + '</div>' +
      '<div class="section-title">' + esc(chapter.title) + '</div><div class="section-intro">' + esc(chapter.intro) + '</div>' +
      '<div class="chapter-card' + modifier + '"><div class="chapter-card__head"><div class="chapter-kicker">THEMES ' + String(start).padStart(2, '0') + ' - ' + String(end).padStart(2, '0') + '</div>' +
      '<div class="chapter-name">' + esc(chapter.title) + '</div><div class="chapter-lead">' + esc(chapter.question) + '</div></div><div class="episode-list">' + rows + '</div></div>' +
      '<div class="argument-heading">第' + (chapterIndex + 1) + '章の結論</div><p class="argument-body">' + esc(chapter.conclusion) + '</p>' + bridge + footer('第' + (chapterIndex + 1) + '章') + '</div>';
  }).join('');

  var timelineRows = config.timeline.map(function (item) {
    var tags = (item.tags || []).map(tagHtml).join('');
    return '<div class="tl-item"><div class="tl-year">' + esc(item.year) + '</div><div class="tl-content"><div class="tl-event">' + esc(item.event) + '</div><div class="tl-desc">' + esc(item.description) + '</div>' + (tags ? '<div class="tl-tags">' + tags + '</div>' : '') + '</div></div>';
  }).join('');

  var argumentsHtml = config.arguments.map(function (argument) {
    return '<div class="argument-heading">' + esc(argument.title) + '</div>' + argument.paragraphs.map(function (paragraph) {
      return '<p class="argument-body">' + esc(paragraph) + '</p>';
    }).join('');
  }).join('');

  var glossaryHtml = config.glossary.map(function (item) {
    return '<div class="glossary-item"><div class="glossary-term">' + esc(item.term) + ' <span class="glossary-kana">' + esc(item.reading) + '</span><span class="glossary-en">' + esc(item.english) + '</span></div>' +
      '<div class="glossary-def">' + esc(item.definition) + '</div><div class="glossary-note">なぜ重要か：' + esc(item.importance) + '</div></div>';
  }).join('');

  var questionsHtml = config.questions.map(function (item, index) {
    return '<div class="d-item"><div class="d-num">' + (index + 1) + '</div><div><div class="d-text">' + esc(item.question) + '</div><div class="d-hint">ヒント：' + esc(item.hint) + '</div></div></div>';
  }).join('');

  var partId = 'part' + config.number;
  var noteItems = Array.isArray(mapData.notes) ? mapData.notes.filter(function (note) {
    return note.url && note.status === 'published' && ((typeof note.target === 'string' && note.target.indexOf('第' + config.number + '部') >= 0) || note.primaryPart === partId);
  }) : [];
  var notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../library.html?format=read"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  var referencesHtml = config.references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference.url) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference.label) + '</a>';
  }).join('');

  var prevLink = config.prev ? '<a href="' + esc(config.prev.href) + '">← 第' + esc(config.prev.number) + '部</a>' : '';
  var nextLink = config.next ? '<a href="' + esc(config.next.href) + '">第' + esc(config.next.number) + '部 →</a>' : '';
  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">' + esc(config.colorName) + '<small>' + esc(config.colorReading) + '</small></div>' +
      '<h1 class="cover-title">第' + esc(config.number) + '部<br>' + esc(config.title) + '</h1><div class="cover-subtitle">' + esc(config.subtitle) + '</div>' +
      '<div class="cover-chapter">第1話〜第' + esc(config.episodeCount) + '話｜全' + esc(config.chapters.length) + '章</div><div class="cover-tagline"><em>「' + esc(config.tagline) + '」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">背景を知り、各テーマからAIとの対話へ進むための学びの地図</div><div class="cover-actions"><a class="cover-action" href="#theme-01">AI対話のテーマへ</a><a class="cover-action" href="../library.html?format=listen">Podcastで聴く</a><a class="cover-action" href="../library.html?format=read">noteで読む</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部">' + prevLink + '<span>第' + esc(config.number) + '部 ｜ ' + esc(config.title) + '</span>' + nextLink + '</nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">' + esc(config.introduction.title) + '</div>' +
      '<div class="section-intro">' + config.introduction.leadHtml + '</div>' +
      '<div class="essay-box"><h3>' + esc(config.introduction.essayTitle) + '</h3>' + config.introduction.paragraphs.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') + '</div>' +
      '<div class="argument-heading">' + esc(config.introduction.arcTitle) + '</div><p class="argument-body">' + config.introduction.arcHtml + '</p>' +
      '<div class="central-question"><div class="cq-label">第' + esc(config.number) + '部の中心的問い</div><div class="cq-text">' + config.centerQuestionHtml + '</div><div class="cq-sub">' + esc(config.centerQuestionSub) + '</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">' + esc(config.timelineTitle) + '</div><div class="section-intro">' + esc(config.timelineIntro) + '</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">' + esc(config.timelineKicker) + '</div><div class="chapter-name">' + esc(config.timelineHeading) + '</div><div class="chapter-lead">' + esc(config.timelineLead) + '</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer(config.timelineFooter) + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">' + esc(config.coreTitle) + '</div><div class="section-intro">' + esc(config.coreIntro) + '</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第' + esc(config.number) + '部の位置づけ</div><p>' + esc(config.perspective) + '</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第' + esc(config.number) + '部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">' + esc(config.beyond.label) + '</div><div class="bridge-text">' + esc(config.beyond.text) + '</div><div class="bridge-sub">' + config.beyond.subHtml + '</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">知ったことを、対話へつなぐ</div><div class="section-intro">Podcastとnoteで背景を補い、各テーマのAI対話へ戻るための入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="#theme-01"><div class="resource-label">AI DIALOGUE</div><div class="resource-title">AIとの対話へ戻る</div><div class="resource-text">テーマを選び、専用の対話文から考えを深める。</div></a><a class="resource-card" href="../library.html?format=listen"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第' + esc(config.number) + '部の' + esc(config.episodeCount) + '話を音声でたどる。</div></a><a class="resource-card" href="../library.html?format=read"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
