(function () {
  'use strict';
  var root = document.getElementById('part-series-root');
  var number = Number(document.body.getAttribute('data-part'));
  var part = (window.ManabiEduParts || []).find(function (item) { return item.number === number; });
  if (!root) return;
  if (!part) { root.innerHTML = '<main class="edu-missing"><h1>準備中</h1><a href="../edu.html">EDU 入口へ戻る</a></main>'; return; }
  document.documentElement.style.setProperty('--edu-part-color', part.color || '#b5c95e');
  function esc(value) {
    return String(value == null || value === '' ? '準備中' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }
  function list(items, className) {
    return '<ul class="' + className + '">' + ((Array.isArray(items) && items.length) ? items.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') : '<li>準備中</li>') + '</ul>';
  }
  var certainty = {
    robust: ['◎', 'くり返し確かめられた'],
    qualified: ['◐', '条件つき・後日談あり'],
    contested: ['△', '論争中・確かめられていない']
  };
  var intro = '<section class="edu-page" id="introduction"><p class="edu-page__label">Introduction</p><h2>第' + esc(part.number) + '部のはじまり</h2><p class="edu-page__lead">' + esc(part.intro) + '</p><div class="edu-question"><span>親への中心の問い</span><p>' + esc(part.parentQuestion) + '</p></div></section>';
  var timeline = '<section class="edu-page" id="timeline"><p class="edu-page__label">STUDY TIMELINE</p><h2>研究の年表</h2><div class="edu-timeline">' +
    ((part.studyTimeline || []).length ? part.studyTimeline.map(function (item) {
      var href = (part.episodes || []).some(function (episode) { return episode.id === item.episode; }) ? '#episode-' + esc(item.episode) : '#episodes';
      return '<a class="edu-timeline__item" href="' + href + '"><time>' + esc(item.year) + '</time><span>' + esc(item.label) + '</span><small>↗</small></a>';
    }).join('') : '<p>準備中</p>') + '</div></section>';
  function related(cards, people) {
    return '<div class="edu-episode__related"><span>関連する研究カード</span>' + ((Array.isArray(cards) && cards.length) ? cards.map(function (id) {
      return /^R-[A-G]\d+$/.test(id) ? '<a class="edu-related-id" href="../edu-research.html#' + esc(id) + '">' + esc(id) + ' ↗</a>' : '<span class="edu-related-id">' + esc(id) + ' · 準備中</span>';
    }).join('') : '<span class="edu-related-id">準備中</span>') + '<span>関連する人物カード</span>' + ((Array.isArray(people) && people.length) ? people.map(function (id) {
      return /^P-[JWB]\d+$/.test(id) ? '<a class="edu-related-id" href="../edu-people.html#' + esc(id) + '">' + esc(id) + ' ↗</a>' : '<span class="edu-related-id">' + esc(id) + ' · 準備中</span>';
    }).join('') : '<span class="edu-related-id">準備中</span>') + '</div>';
  }
  var episodes = '<section class="edu-page edu-episodes" id="episodes"><p class="edu-page__label">SIX STORIES</p><h2>6つの研究と、その後日談。</h2><p class="edu-page__lead">研究で何が見え、何がまだわからないのか。家庭と教室の場面から読みます。</p>' +
    ((part.episodes || []).length ? part.episodes.map(function (episode, index) {
      var mark = certainty[episode.certainty] || ['—', '準備中'];
      return '<article class="edu-episode" id="episode-' + esc(episode.id) + '"><div class="edu-episode__top"><p>STORY ' + String(index + 1).padStart(2, '0') + ' / ' + esc(episode.id) + '</p><span class="edu-certainty edu-certainty--' + esc(episode.certainty || 'pending') + '" title="研究の確かさ"><b aria-hidden="true">' + mark[0] + '</b>' + mark[1] + '</span></div>' +
        '<h3>' + esc(episode.title) + '</h3><div class="edu-episode__scene"><span>家庭・教室の場面</span><p>' + esc(episode.scene) + '</p></div>' +
        '<div class="edu-episode__detail"><div><span>人物と研究</span><strong>' + esc(episode.person) + '</strong><p>' + esc(episode.study) + '</p></div><div><span>後日談</span><p>' + esc(episode.afterword) + '</p></div></div>' +
        '<div class="edu-episode__try"><div><span>親への問い</span><p>' + esc(episode.parentQuestion) + '</p></div><div><span>小さな実践</span><p>' + esc(episode.practice) + '</p></div></div>' + related(episode.relatedCards, episode.relatedPeople) +
        '<div class="edu-ai" data-edu-ai="' + esc(episode.id) + '"><p class="edu-page__label">THINK WITH AI</p><h4>この研究から、AIとの対話を始める</h4><p>対話文をコピーして普段のAIに貼り、必要なら自分の考えや聞きたいことを書き足してください。</p><div class="edu-ai__actions"><button class="edu-ai__copy" type="button">対話文をコピー</button><span class="edu-ai__status" role="status"></span></div><details><summary>対話文を見る</summary><pre class="edu-ai__preview"></pre></details></div></article>';
    }).join('') : '<p>準備中</p>') + '</section>';
  var glossary = '<section class="edu-page" id="core"><p class="edu-page__label">CORE ARGUMENT</p><h2>核心論考</h2><p class="edu-page__lead">' + esc(part.core) + '</p><h3 class="edu-glossary-title">用語</h3><dl class="edu-glossary">' + ((part.glossary || []).length ? part.glossary.map(function (item) {
    return '<div><dt>' + esc(item.term) + '<small>' + esc(item.reading) + ' / ' + esc(item.english) + '</small></dt><dd>' + esc(item.definition) + '</dd></div>';
  }).join('') : '<div><dt>準備中</dt></div>') + '</dl></section>';
  var actOrder = { 1: [21, 23, 28, 30, 31], 2: [22, 24, 25, 27], 3: [26, 29, 32] };
  var actParts = actOrder[part.act] || [];
  var nextNumber = actParts[actParts.indexOf(part.number) + 1];
  var nextPart = (window.ManabiEduParts || []).find(function (item) { return item.number === nextNumber; });
  var nextPartHtml = nextPart
    ? '<a href="part' + esc(nextPart.number) + '.html"><span>同じ幕の次の部 · 第' + esc(nextPart.number) + '部</span><strong>' + esc(nextPart.title) + '</strong><small>次の部を読む →</small></a>'
    : '<div><span>同じ幕の次の部</span><strong>この幕の最後の部</strong></div>';
  var next = '<section class="part-v2-next edu-next" aria-labelledby="edu-next-title"><div class="part-v2-next__inner"><p class="part-v2-kicker">WHERE NEXT?</p><h2 id="edu-next-title">この旅のあとに、<br>どこへ進むか。</h2><div class="part-v2-next__grid">' + nextPartHtml + '<a href="../edu.html"><span>EDUCATION LENS</span><strong>EDU の入口へ</strong><small>3つの幕を見る →</small></a><a href="../edu-research.html"><span>研究カードの棚</span><strong>研究・理論</strong><small>60枚のカードを見る →</small></a></div></div></section>';
  root.innerHTML = '<a class="part-v2-skip" href="#edu-guide">本文へ移動</a><header class="part-v2-header"><a class="part-v2-brand" href="../index.html" aria-label="Manabi Map トップ"><svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="8"></circle><ellipse cx="28" cy="28" rx="23" ry="13"></ellipse><ellipse cx="28" cy="28" rx="13" ry="23" transform="rotate(34 28 28)"></ellipse><circle class="part-v2-brand__star" cx="49" cy="24" r="2.4"></circle></svg><span><strong>Manabi Map</strong><small>知の重力レンズ</small></span></a><nav aria-label="メインナビゲーション"><a href="../questions.html">AIと対話する</a><a href="../map.html">学びの地図</a><a href="../note.html">読む</a><a href="../podcast.html">聴く</a><a href="../start.html">はじめての方へ</a><a href="../edu.html" aria-current="page">EDU</a></nav><details><summary aria-label="メニューを開く"><span></span><span></span><span></span></summary><nav aria-label="モバイルナビゲーション"><a href="../questions.html">AIと対話する</a><a href="../map.html">学びの地図</a><a href="../note.html">読む</a><a href="../podcast.html">聴く</a><a href="../start.html">はじめての方へ</a><a href="../edu.html" aria-current="page">EDU</a></nav></details></header>' +
    '<main><div class="cover"><p class="cover-series">MANABI MAP · EDUCATION LENS <span class="edu-mark">EDU</span></p><div class="cover-colorname">' + esc(part.colorName) + '<small>' + esc(part.colorReading) + '</small></div><h1 class="cover-title">第' + esc(part.number) + '部<br>' + esc(part.title) + '</h1><div class="cover-subtitle">' + esc(part.subtitle) + '</div><div class="cover-chapter">第' + esc(part.act) + '幕　' + esc(part.actName) + '</div><div class="cover-tagline"><em>' + esc(part.tagline) + '</em></div><div class="cover-actions"><a class="cover-action cover-action--primary" href="#edu-guide">この部を読む</a><a class="cover-action" href="../edu.html">EDU の入口へ</a></div></div>' +
    '<section class="part-v2-guide" id="edu-guide" aria-labelledby="edu-guide-title"><div class="part-v2-guide__head"><div><p class="part-v2-kicker">YOU ARE HERE · 第' + esc(part.number) + '部 · EDU</p><h2 id="edu-guide-title">' + esc(part.title) + 'を、<br>研究から見る。</h2></div><p>' + esc(part.tagline) + '</p></div><div class="part-v2-guide__body"><div class="part-v2-center"><span>中心の問い</span><strong>' + esc(part.centerQuestion) + '</strong></div><div class="part-v2-outcomes"><p class="part-v2-label">この部で見えてくること</p>' + list(part.outcomes, '') + '</div></div><div class="edu-guide__links"><a href="#timeline">研究の年表 ↓</a><a href="#episodes">6つの話 ↓</a></div></section>' + intro + timeline + episodes + glossary + next + '</main>';

  function promptFor(episode) {
    var firstStudy = (part.studyTimeline || []).find(function (item) { return item.episode === episode.id; });
    var researcherAndYear = (episode.person || '準備中') + '・' + (firstStudy && firstStudy.year || '準備中');
    var certaintyLabel = (certainty[episode.certainty] || [null, '準備中'])[1];
    return [
      'あなたは教育学・教育心理学に詳しい対話の相手です。私は元教員で、指導主事として学校を支援してきました。いまは教育の専門性をさらに深めるために学んでいます。',
      '',
      '今回の題材：',
      '- ' + (episode.title || episode.person || '準備中') + '（' + researcherAndYear + '）',
      '- 要点：' + (episode.summary || episode.study || '準備中'),
      '- 後日談：' + (episode.afterword || '準備中'),
      '- 確かさ：' + certaintyLabel,
      '',
      'いま考えていること・聞きたいこと：',
      '【ここに書く（空欄のままでもかまいません）】',
      '',
      '進め方：',
      '1. 私が何を求めているかを、上の欄と、私のこれからの発言から読み取ってください。読み取れないときは、短い質問を一つだけしてください。',
      '2. 次の4つの視点から、いま必要なものを選んで深めてください。話の流れに合わせて切り替え、切り替えるときは一言で伝えてください。',
      '   ・つなぐ：ほかの理論や研究とのつながり、共通点とずれを示し、知識を面にする',
      '   ・死角を探す：学級経営・授業・研修で使うときの前提、限界、誤用されやすい形を示す',
      '   ・裏付けを探す：私の考えを支える理論と、反対の結果を出した研究の両方を示す',
      '   ・深掘り：原典の方法・対象・規模・効果量、追試、日本の学校に当てはまるかを検討する',
      '3. 研究の確かさ（再現されているか、効果の大きさ、対象の限界）を区別して話してください。',
      '4. 出典は著者・年・題名で示し、わからないことは「わからない」と言ってください。',
      '5. 一度に長く話しすぎず、質問は一度に一つずつにしてください。'
    ].join('\n');
  }
  (part.episodes || []).forEach(function (episode) {
    var panel = root.querySelector('[data-edu-ai="' + episode.id + '"]');
    if (!panel) return;
    var preview = panel.querySelector('.edu-ai__preview');
    var prompt = promptFor(episode);
    preview.textContent = prompt;
    panel.querySelector('.edu-ai__copy').addEventListener('click', function () {
      var status = panel.querySelector('.edu-ai__status');
      function done() { status.textContent = 'コピーしました。普段のAIに貼り付けてください。'; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(prompt).then(done, function () { status.textContent = 'コピーできませんでした。対話文を開いてコピーしてください。'; panel.querySelector('details').open = true; });
      else { status.textContent = '対話文を開いてコピーしてください。'; panel.querySelector('details').open = true; }
    });
  });
  root.querySelectorAll('.part-v2-header details a').forEach(function (link) { link.addEventListener('click', function () { link.closest('details').removeAttribute('open'); }); });
}());
