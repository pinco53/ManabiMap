(function () {
  'use strict';
  var root = document.getElementById('edu-catalog-root');
  var kind = document.body.getAttribute('data-edu-catalog');
  if (!root || !kind) return;

  var certainty = {
    robust: ['◎', 'くり返し確かめられた'],
    qualified: ['◐', '条件つき・後日談あり'],
    contested: ['△', '論争中・確かめられていない']
  };
  function value(item) { return item == null || item === '' ? '準備中' : String(item); }
  function esc(item) {
    return value(item).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }
  function badge(item) {
    var mark = certainty[item] || ['—', '準備中'];
    return '<span class="edu-catalog-badge edu-catalog-badge--' + esc(item || 'pending') + '"><b aria-hidden="true">' + mark[0] + '</b>' + mark[1] + '</span>';
  }
  function safeUrl(url) {
    try { var parsed = new URL(url); return /^(https?:)$/.test(parsed.protocol) ? parsed.href : ''; }
    catch (error) { return ''; }
  }
  function sources(items) {
    if (!Array.isArray(items) || !items.length) return '<p class="edu-catalog-muted">準備中</p>';
    return '<ul class="edu-catalog-sources">' + items.map(function (source) {
      var href = source && source.url && safeUrl(source.url);
      var label = esc(source && source.label);
      return '<li>' + (href ? '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + label + ' ↗</a>' : '<span>' + label + '</span>') + '</li>';
    }).join('') + '</ul>';
  }
  function cardHref(id) {
    if (/^R-[A-G]\d+$/.test(id)) return 'edu-research.html#' + id;
    if (/^M-\d+$/.test(id)) return 'edu-evidence.html#' + id;
    if (/^P-[JWB]\d+$/.test(id)) return 'edu-people.html#' + id;
    return '';
  }
  function links(ids, mode) {
    if (!Array.isArray(ids) || !ids.length) return '<span class="edu-catalog-muted">準備中</span>';
    return ids.map(function (id) {
      var href = mode === 'part' && /^part\d+$/.test(id) ? 'parts/' + id + '.html'
        : mode === 'episode' && /^\d+-\d+$/.test(id) ? 'parts/part' + id.split('-')[0] + '.html#episode-' + id
        : cardHref(id);
      return href ? '<a href="' + esc(href) + '">' + esc(id) + ' ↗</a>' : '<span>' + esc(id) + ' · 準備中</span>';
    }).join('');
  }
  function row(label, content) { return '<div class="edu-catalog-field"><dt>' + label + '</dt><dd>' + content + '</dd></div>'; }
  function aiPanel(index) {
    return '<div class="edu-catalog-ai" data-ai-index="' + index + '"><p class="edu-page__label">THINK WITH AI</p><h4>このカードから、AIとの対話を始める</h4><p>コピーして普段のAIに貼り、必要なら自分の考えや聞きたいことを書き足してください。</p><div class="edu-catalog-ai__actions"><button type="button" class="edu-catalog-ai__copy">対話文をコピー</button><span role="status" class="edu-catalog-ai__status"></span></div><details><summary>対話文を見る</summary><pre class="edu-catalog-ai__preview"></pre></details></div>';
  }
  var prompts = [];
  function promptFor(item, type) {
    var title, researcherYear, summary;
    if (type === 'research') {
      title = item.name || item.title;
      researcherYear = (Array.isArray(item.researchers) && item.researchers.length ? item.researchers.join('、') : '準備中') + '・' + value(item.year);
      summary = item.summary;
    } else if (type === 'evidence') {
      title = item.theme;
      researcherYear = item.study || '準備中';
      if (item.year && researcherYear.indexOf(String(item.year)) < 0) researcherYear += '・' + item.year;
      summary = item.study;
    } else {
      title = item.name;
      researcherYear = item.role;
      summary = item.core;
    }
    return [
      'あなたは教育学・教育心理学に詳しい対話の相手です。私は元教員で、指導主事として学校を支援してきました。いまは教育の専門性をさらに深めるために学んでいます。',
      '',
      '今回の題材：',
      '- ' + value(title) + '（' + value(researcherYear) + '）',
      '- 要点：' + value(summary),
      '- 後日談：' + value(item.afterword),
      '- 確かさ：' + (certainty[item.certainty] || [null, '準備中'])[1],
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
  function withAi(item, type) {
    var index = prompts.length;
    prompts.push(promptFor(item, type));
    return aiPanel(index);
  }
  function researchCard(card) {
    var researchers = Array.isArray(card.researchers) && card.researchers.length ? card.researchers.join('、') : '準備中';
    return '<details class="edu-catalog-card" id="' + esc(card.id) + '" data-domain="' + esc(card.domain) + '" data-certainty="' + esc(card.certainty) + '" data-parts="|' + esc((card.relatedParts || []).join('|')) + '|">' +
      '<summary><span class="edu-catalog-card__id">' + esc(card.id) + '</span><span class="edu-catalog-card__summary"><strong>' + esc(card.title) + '</strong><small>' + esc(researchers) + ' · ' + esc(card.year) + '</small><span>' + esc(card.summary) + '</span></span>' + badge(card.certainty) + '<span class="edu-catalog-card__open" aria-hidden="true">＋</span></summary>' +
      '<div class="edu-catalog-card__body"><h4>' + esc(card.name) + '</h4><dl>' +
      row('主張', esc(card.claim)) + row('方法・対象', esc(card.method)) + row('効果の大きさ', esc(card.effect)) + row('後日談', esc(card.afterword)) + row('日本の学校で', esc(card.japan)) +
      row('関連する部', links(card.relatedParts, 'part')) + row('関連する話', links(card.relatedEpisodes, 'episode')) + row('関連するカード', links(card.relatedCards)) + row('関連する人物', links(card.relatedPeople)) + row('出典', sources(card.sources)) + '</dl>' + withAi(card, 'research') + '</div></details>';
  }
  function researchPage() {
    var cards = Array.isArray(window.ManabiEduCards) ? window.ManabiEduCards : [];
    var domains = Array.isArray(window.ManabiEduCardDomains) ? window.ManabiEduCardDomains : [];
    root.innerHTML = '<div class="edu-catalog-filters" aria-label="研究カードを絞り込む"><label>分野<select id="edu-domain-filter"><option value="">すべて</option>' + domains.map(function (domain) { return '<option value="' + esc(domain.id) + '">' + esc(domain.id) + ' · ' + esc(domain.title) + '</option>'; }).join('') + '</select></label><label>確かさ<select id="edu-certainty-filter"><option value="">すべて</option><option value="robust">くり返し確かめられた</option><option value="qualified">条件つき・後日談あり</option><option value="contested">論争中・確かめられていない</option></select></label><label>関連する部<select id="edu-part-filter"><option value="">すべて</option>' + Array.from({ length: 12 }, function (_, i) { return '<option value="part' + (i + 21) + '">第' + (i + 21) + '部</option>'; }).join('') + '</select></label><p id="edu-filter-count" role="status"></p></div>' +
      domains.map(function (domain) { return '<section class="edu-catalog-section" data-domain-group="' + esc(domain.id) + '"><div class="edu-catalog-section__head"><span>DOMAIN ' + esc(domain.id) + '</span><h2>' + esc(domain.title) + '</h2></div><div class="edu-catalog-list">' + cards.filter(function (card) { return card.domain === domain.id; }).map(researchCard).join('') + '</div></section>'; }).join('');
    var filters = ['edu-domain-filter', 'edu-certainty-filter', 'edu-part-filter'].map(function (id) { return document.getElementById(id); });
    function applyFilters() {
      var shown = 0;
      root.querySelectorAll('.edu-catalog-card[data-domain]').forEach(function (card) {
        var visible = (!filters[0].value || card.dataset.domain === filters[0].value) && (!filters[1].value || card.dataset.certainty === filters[1].value) && (!filters[2].value || card.dataset.parts.split('|').indexOf(filters[2].value) >= 0);
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      root.querySelectorAll('[data-domain-group]').forEach(function (section) { section.hidden = !section.querySelector('.edu-catalog-card:not([hidden])'); });
      document.getElementById('edu-filter-count').textContent = shown + '件を表示';
    }
    filters.forEach(function (filter) { filter.addEventListener('change', applyFilters); });
    applyFilters();
  }
  function evidenceCard(card) {
    return '<details class="edu-catalog-card edu-evidence-card" id="' + esc(card.id) + '"' + (card.id === 'M-00' ? ' open' : '') + '><summary><span class="edu-catalog-card__id">' + esc(card.id) + '</span><span class="edu-catalog-card__summary"><strong>' + esc(card.theme) + '</strong><small>' + esc(card.study) + ' · ' + esc(card.year) + '</small><span>' + esc(card.effect) + '</span></span>' + badge(card.certainty) + '<span class="edu-catalog-card__open" aria-hidden="true">＋</span></summary>' +
      '<div class="edu-catalog-card__body"><dl>' + row('効果量の種類', esc(card.metric)) + row('報告された内容', esc(card.effect)) + row('対象', esc(card.population)) + row('研究の質', esc(card.quality)) + row('日本で当てはまるかの注意', esc(card.caution)) + row('関連するカード', links(card.relatedCards)) + row('関連する部', links(card.relatedParts, 'part')) + row('出典', sources(card.sources)) + '</dl>' + withAi(card, 'evidence') + '</div></details>';
  }
  function evidencePage() {
    var cards = Array.isArray(window.ManabiEduEvidence) ? window.ManabiEduEvidence : [];
    var guide = cards.find(function (card) { return card.id === 'M-00'; });
    var rest = cards.filter(function (card) { return card.id !== 'M-00'; });
    root.innerHTML = '<section class="edu-catalog-section"><div class="edu-catalog-section__head"><span>READ THE MEASURE</span><h2>効果量の読み方</h2></div>' + (guide ? evidenceCard(guide) : '<p>準備中</p>') + '</section>' +
      '<section class="edu-catalog-section"><div class="edu-catalog-section__head"><span>META-ANALYSIS</span><h2>報告値と研究の条件</h2></div><p class="edu-catalog-note">効果量の種類が違う数値は、同じ目盛りで比較できません。各研究の報告を、対象や方法とともに読んでください。</p><div class="edu-evidence-table-wrap"><table class="edu-evidence-table"><thead><tr><th scope="col">テーマ・研究</th><th scope="col">効果量の種類</th><th scope="col">報告値</th><th scope="col">EEF「か月」</th><th scope="col">対象</th><th scope="col">研究の質</th><th scope="col">日本での注意</th></tr></thead><tbody>' + rest.map(function (card) {
        var months = /か月|ヵ月|ヶ月/.test(card.metric || '');
        return '<tr><th scope="row"><a href="#' + esc(card.id) + '"><small>' + esc(card.id) + '</small>' + esc(card.theme) + '</a><span>' + esc(card.study) + '</span></th><td data-label="効果量の種類">' + esc(card.metric) + '</td><td data-label="報告値">' + (months ? '—' : esc(card.effect)) + '</td><td data-label="EEF「か月」">' + (months ? esc(card.effect) : '—') + '</td><td data-label="対象">' + esc(card.population) + '</td><td data-label="研究の質">' + esc(card.quality) + '</td><td data-label="日本での注意">' + esc(card.caution) + '</td></tr>';
      }).join('') + '</tbody></table></div></section><section class="edu-catalog-section"><div class="edu-catalog-section__head"><span>CARDS</span><h2>研究ごとに詳しく読む</h2></div><div class="edu-catalog-list">' + rest.map(evidenceCard).join('') + '</div></section>';
  }
  function personCard(person) {
    return '<details class="edu-catalog-card" id="' + esc(person.id) + '"><summary><span class="edu-catalog-card__id">' + esc(person.id) + '</span><span class="edu-catalog-card__summary"><strong>' + esc(person.name) + '</strong><small>' + esc(person.reading) + ' · ' + esc(person.field) + '</small><span>' + esc(person.role) + '</span></span><span class="edu-catalog-card__open" aria-hidden="true">＋</span></summary>' +
      '<div class="edu-catalog-card__body"><dl>' + row('所属・肩書', esc(person.role)) + row('考えの中心', esc(person.core)) + row('代表的な本や研究', Array.isArray(person.works) && person.works.length ? '<ul>' + person.works.map(function (work) { return '<li>' + esc(work) + '</li>'; }).join('') + '</ul>' : '準備中') + row('学校で何に生かせるか', esc(person.useInSchool)) + row('関連するカード', links(person.relatedCards)) + row('出典', sources(person.sources)) + '</dl>' + withAi(person, 'people') + '</div></details>';
  }
  function peoplePage() {
    var people = Array.isArray(window.ManabiEduPeople) ? window.ManabiEduPeople : [];
    var groups = [
      { id: 'japan', label: 'JAPAN', title: '日本の研究者・実践者' },
      { id: 'world', label: 'WORLD', title: '世界の研究者' },
      { id: 'beyond', label: 'BEYOND EDUCATION', title: '教育の外から学べる人' }
    ];
    root.innerHTML = groups.map(function (group) {
      return '<section class="edu-catalog-section" id="group-' + group.id + '"><div class="edu-catalog-section__head"><span>' + group.label + '</span><h2>' + group.title + '</h2></div><div class="edu-catalog-list">' + people.filter(function (person) { return person.group === group.id; }).map(personCard).join('') + '</div></section>';
    }).join('');
  }
  if (kind === 'research') researchPage();
  else if (kind === 'evidence') evidencePage();
  else if (kind === 'people') peoplePage();

  root.querySelectorAll('[data-ai-index]').forEach(function (panel) {
    var prompt = prompts[Number(panel.getAttribute('data-ai-index'))];
    panel.querySelector('.edu-catalog-ai__preview').textContent = prompt;
    panel.querySelector('.edu-catalog-ai__copy').addEventListener('click', function () {
      var status = panel.querySelector('.edu-catalog-ai__status');
      function success() { status.textContent = 'コピーしました。普段のAIに貼り付けてください。'; }
      function failure() { status.textContent = 'コピーできませんでした。対話文を開いてコピーしてください。'; panel.querySelector('details').open = true; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(prompt).then(success, failure);
      else failure();
    });
  });
  function openHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    if (target.hidden && kind === 'research') {
      ['edu-domain-filter', 'edu-certainty-filter', 'edu-part-filter'].forEach(function (filterId) { document.getElementById(filterId).value = ''; });
      document.getElementById('edu-domain-filter').dispatchEvent(new Event('change'));
    }
    if (target.tagName === 'DETAILS') target.open = true;
    target.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', openHash);
  if (location.hash) requestAnimationFrame(openHash);
}());
