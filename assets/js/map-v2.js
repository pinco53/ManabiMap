(function () {
  'use strict';

  var mapData = window.ManabiMapData;
  if (!mapData) return;

  var questionMaps = {
    understanding: {
      title: '「知っている」と「わかっている」は、同じだろうか。',
      copy: '理解の境界を、認知、科学史、AIから見直します。',
      routes: [
        ['part15', '中心に近い旅'],
        ['part14', '見方を更新する'],
        ['part7', '前提を外す'],
        ['part3', 'AIから見直す']
      ]
    },
    thinking: {
      title: 'AIが答えを出せる時代に、人間が考えるとは何か。',
      copy: 'AIの歴史、教育、判断から、人間が考えることの輪郭をたどります。',
      routes: [
        ['part3', '中心に近い旅'],
        ['part8', '歴史をたどる'],
        ['part8-2', '社会へ広げる'],
        ['part15', '思考を見直す']
      ]
    },
    language: {
      title: '言葉は思考を作るのか、思考が言葉を作るのか。',
      copy: '言葉の起源、文字、内なる声、AI言語を同じ地図に置きます。',
      routes: [
        ['part5', '中心に近い旅'],
        ['part4', '歴史をたどる'],
        ['part8', 'AIへつなぐ'],
        ['part11', '学び始めへ']
      ]
    },
    number: {
      title: '数字で測れないものに、どう価値を与えるのか。',
      copy: '数えること、評価すること、比較することの歴史と現在をたどります。',
      routes: [
        ['part6', '中心に近い旅'],
        ['part13', '学びへ広げる'],
        ['part8-2', 'AI時代を見る'],
        ['part1', '近代の起点へ']
      ]
    },
    connection: {
      title: 'つながることは、近づくことと同じなのか。',
      copy: '通信技術、対話、身体、孤独から、人と人の距離を見直します。',
      routes: [
        ['part2', '中心に近い旅'],
        ['part4', '通信の歴史へ'],
        ['part12', '対話へ広げる'],
        ['part9', '身体から見る']
      ]
    }
  };

  var routePositions = ['one', 'two', 'three', 'four'];
  var questionButtons = Array.from(document.querySelectorAll('[data-map-question]'));
  var routesNode = document.querySelector('[data-map-routes]');
  var mobileRoutesNode = document.querySelector('[data-map-mobile-routes]');
  var centerTitle = document.querySelector('[data-map-center-title]');
  var detailTitle = document.querySelector('[data-map-detail-title]');
  var detailCopy = document.querySelector('[data-map-detail-copy]');
  var questionLink = document.querySelector('[data-map-question-link]');
  var shareButton = document.querySelector('[data-map-share]');
  var shareStatus = document.querySelector('[data-map-share-status]');

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function partFor(id) {
    return mapData.parts.find(function (part) { return part.id === id; });
  }

  function routeHtml(route, index, mobile) {
    var part = partFor(route[0]);
    if (!part) return '';
    var className = mobile ? 'map-mobile-route' : 'knowledge-node knowledge-node--' + routePositions[index];
    return '<a class="' + className + '" href="' + escapeHtml(part.pageUrl) + '">' +
      '<span class="knowledge-node__relation">' + escapeHtml(route[1]) + '</span>' +
      '<span class="knowledge-node__number">第' + escapeHtml(part.number) + '部</span>' +
      '<strong>' + escapeHtml(part.title) + '</strong>' +
      '<span class="knowledge-node__go">' + (mobile ? 'この旅へ →' : 'ひらく →') + '</span>' +
      '</a>';
  }

  function renderMap(id, updateUrl) {
    var selected = questionMaps[id] || questionMaps.understanding;
    var selectedId = questionMaps[id] ? id : 'understanding';

    questionButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.mapQuestion === selectedId));
    });
    centerTitle.textContent = selected.title;
    detailTitle.textContent = selected.title;
    detailCopy.textContent = selected.copy;
    questionLink.href = 'question.html?id=' + encodeURIComponent(selectedId);
    routesNode.innerHTML = selected.routes.map(function (route, index) {
      return routeHtml(route, index, false);
    }).join('');
    mobileRoutesNode.innerHTML = selected.routes.map(function (route, index) {
      return routeHtml(route, index, true);
    }).join('');

    if (updateUrl && window.location.hash !== '#' + selectedId) {
      window.history.pushState(null, '', '#' + selectedId);
    }
    shareStatus.textContent = '';
  }

  questionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      renderMap(button.dataset.mapQuestion, true);
    });
  });

  window.addEventListener('hashchange', function () {
    renderMap(window.location.hash.slice(1), false);
  });

  if (shareButton) {
    shareButton.addEventListener('click', function () {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          shareStatus.textContent = '選択中の地図URLをコピーしました。';
        }).catch(function () {
          shareStatus.textContent = 'ブラウザのアドレスからURLをコピーできます。';
        });
      } else {
        shareStatus.textContent = 'ブラウザのアドレスからURLをコピーできます。';
      }
    });
  }

  var search = document.querySelector('[data-map-search]');
  var groupSelect = document.querySelector('[data-map-group]');
  var grid = document.querySelector('[data-journey-grid]');
  var count = document.querySelector('[data-map-count]');
  var empty = document.querySelector('[data-map-empty]');
  var reset = document.querySelector('[data-map-reset]');
  var groups = [];

  mapData.parts.forEach(function (part) {
    if (groups.indexOf(part.group) === -1) groups.push(part.group);
  });

  groups.forEach(function (group) {
    var option = document.createElement('option');
    option.value = group;
    option.textContent = group;
    groupSelect.appendChild(option);
  });

  grid.innerHTML = mapData.parts.map(function (part) {
    var searchText = [part.title, part.subtitle, part.group, part.era].concat(part.tags || []).concat(part.questions || []).join(' ');
    return '<article class="journey-card" data-journey-card data-group="' + escapeHtml(part.group) + '" data-search="' + escapeHtml(searchText) + '">' +
      '<div class="journey-card__meta"><span>第' + escapeHtml(part.number) + '部</span><span>' + escapeHtml(part.group) + '</span></div>' +
      '<h3><a href="' + escapeHtml(part.pageUrl) + '">' + escapeHtml(part.title) + '</a></h3>' +
      '<p>' + escapeHtml(part.subtitle) + '</p>' +
      '<div class="journey-card__question">' + escapeHtml((part.questions || [])[0]) + '</div>' +
      '<a class="text-link" href="' + escapeHtml(part.pageUrl) + '">この旅へ <span aria-hidden="true">→</span></a>' +
      '</article>';
  }).join('');

  var journeyCards = Array.from(document.querySelectorAll('[data-journey-card]'));

  function normalize(value) {
    return String(value || '').toLowerCase().replace(/\s+/g, '');
  }

  function updateList() {
    var query = normalize(search.value);
    var group = groupSelect.value;
    var visible = 0;

    journeyCards.forEach(function (card) {
      var groupMatches = group === 'all' || card.dataset.group === group;
      var searchMatches = !query || normalize(card.dataset.search + ' ' + card.textContent).includes(query);
      var show = groupMatches && searchMatches;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = String(visible);
    empty.hidden = visible !== 0;
  }

  search.addEventListener('input', updateList);
  groupSelect.addEventListener('change', updateList);
  reset.addEventListener('click', function () {
    search.value = '';
    groupSelect.value = 'all';
    updateList();
    search.focus();
  });

  renderMap(window.location.hash.slice(1), false);
  updateList();
})();
