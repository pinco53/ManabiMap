(function () {
  'use strict';
  var data = window.ManabiMapEnglish;
  var root = document.querySelector('[data-english-part-page]');
  if (!data || !root) return;

  var params = new URLSearchParams(window.location.search);
  var requestedId = params.get('id') || 'part1';
  var part = data.partsById[requestedId] || data.parts[0];
  var index = data.parts.indexOf(part);
  var previous = data.parts[(index - 1 + data.parts.length) % data.parts.length];
  var next = data.parts[(index + 1) % data.parts.length];

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  setText('englishPartNumber', 'PART ' + part.number + ' / ' + part.group.toUpperCase());
  setText('englishPartTitle', part.title);
  setText('englishPartSubtitle', part.subtitle);
  setText('englishPartEra', part.era);
  setText('englishPartCurrent', part.title);
  setText('englishPartQuestion1', part.questions[0]);
  setText('englishPartQuestion2', part.questions[1]);
  document.title = part.title + ' | Learning Map | Manabi Map';

  var description = document.querySelector('meta[name="description"]');
  if (description) description.content = part.subtitle + '. Explore the central questions and continue thinking with AI.';
  var canonicalUrl = window.location.origin + window.location.pathname + '?id=' + encodeURIComponent(part.id);
  var canonical = document.createElement('link');
  canonical.rel = 'canonical'; canonical.href = canonicalUrl; document.head.appendChild(canonical);
  var englishAlternate = document.createElement('link');
  englishAlternate.rel = 'alternate'; englishAlternate.hreflang = 'en'; englishAlternate.href = canonicalUrl; document.head.appendChild(englishAlternate);
  var japaneseAlternate = document.createElement('link');
  japaneseAlternate.rel = 'alternate'; japaneseAlternate.hreflang = 'ja'; japaneseAlternate.href = new URL(part.japaneseUrl, window.location.href).href; document.head.appendChild(japaneseAlternate);
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = document.title;

  var tags = document.getElementById('englishPartTags');
  tags.innerHTML = part.tags.map(function (tag) { var span = document.createElement('span'); span.textContent = tag; return span.outerHTML; }).join('');

  var overview = document.getElementById('englishPartOverview');
  overview.textContent = 'This map connects ' + part.tags.slice(0, 3).join(', ') + ', and the longer history behind them. Begin with the two questions below. They are not quizzes with one correct answer, but lenses for examining how this theme has shaped human life—and how it may shape what comes next.';

  var prompt = document.getElementById('englishPartPrompt');
  prompt.value = 'I am exploring the Manabi Map theme “' + part.title + '.” The question I want to think about is: “' + part.questions[0] + '” First, give me the historical and conceptual background I need. Separate established facts from interpretations, show me at least two ways to view the issue, and then ask me one question that helps me develop my own position. Do not rush to a final answer.';

  var japaneseLink = document.getElementById('englishPartJapanese');
  japaneseLink.href = part.japaneseUrl;
  var previousLink = document.getElementById('englishPartPrevious');
  previousLink.href = 'part.html?id=' + encodeURIComponent(previous.id);
  previousLink.textContent = '← PART ' + previous.number + ' · ' + previous.title;
  var nextLink = document.getElementById('englishPartNext');
  nextLink.href = 'part.html?id=' + encodeURIComponent(next.id);
  nextLink.textContent = 'PART ' + next.number + ' · ' + next.title + ' →';

  var copyButton = document.getElementById('englishPartCopy');
  copyButton.addEventListener('click', function () {
    var finish = function () {
      copyButton.textContent = 'Copied';
      window.setTimeout(function () { copyButton.textContent = 'Copy AI prompt'; }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(prompt.value).then(finish);
    else { prompt.select(); document.execCommand('copy'); finish(); }
  });
})();
