(function () {
  'use strict';

  var questions = {
    understanding: {
      title: '「知っている」と「わかっている」は、同じだろうか。',
      description: '認知、科学史、AIから「知っている」と「わかっている」の違いをたどります。',
      introduction: '見たこと、覚えたこと、説明できること。その違いから「わかったつもり」を見直します。',
      tags: ['認知', '科学', 'AI'],
      why: '検索すれば、答えはすぐに見つかります。しかし、見たことや覚えたことを、理解したことと取り違えると、私たちは自分の前提に気づけなくなります。',
      takeaway: '理解は情報の所有ではなく、説明し直し、別の状況へ使い、分からない部分を認められる状態だと見えてきます。',
      closing: 'あなたが「わかった」と言うとき、何ができる状態を指していますか。',
      route: [
        ['知る・対話する', 'わかったつもり', '認知と科学史から背景を知り、テーマ専用の文章でAIとの対話へ進む。', 'parts/part15.html#theme-01'],
        ['読む', '「わかった」を見直すnote', '日常の具体的な違和感から、問いを一歩深める。', 'library.html?format=read'],
        ['聴く', '第15部 Podcast', '物語と対話で、分からなさを抱える意味を考える。', 'library.html?format=listen']
      ],
      related: [['thinking', '次の問い'], ['language', '別の視点']]
    },
    thinking: {
      title: 'AIが答えを出せる時代に、人間が考えるとは何か。',
      description: 'AI、哲学、教育をつなぎ、人間が考えることの意味をたどります。',
      introduction: '答えを速く得られることと、自分で考えたことは同じでしょうか。AIの歴史と教育から、人間の思考を見直します。',
      tags: ['AI', '哲学', '教育'],
      why: 'AIは、文章を作り、問いに答え、選択肢を提示できます。だからこそ、答えを出すこと以外に含まれる、迷うこと、選ぶこと、意味を引き受けることが見えやすくなります。',
      takeaway: '考えることは、正しい答えを生成するだけではなく、何を問うかを選び、理由を確かめ、結果を引き受ける営みだと見えてきます。',
      closing: 'AIの答えを受け取ったあと、あなた自身に残る判断は何ですか。',
      route: [
        ['知る・対話する', 'AIと生きる未来', 'AI革命から背景を知り、テーマ専用の文章でAIとの対話へ進む。', 'parts/part3.html#theme-01'],
        ['深掘り', 'AIと人間のあいだ', '生成AIの歴史と理解の境界をたどる。', 'parts/part8.html'],
        ['読む', 'AIをめぐるnote', '日常の場面から、AIと人間の関係を見直す。', 'library.html?format=read']
      ],
      related: [['understanding', '前提となる問い'], ['language', '言葉から見る']]
    },
    language: {
      title: '言葉は思考を作るのか、思考が言葉を作るのか。',
      description: '言語、認知、AIをつなぎ、言葉と思考の関係をたどります。',
      introduction: '頭の中の声は、思考そのものでしょうか。言葉の起源、内なる声、AIの言語から考えます。',
      tags: ['言葉', '認知', 'AI'],
      why: '私たちは言葉で説明し、記憶し、他者と考えを共有します。一方で、映像や身体感覚のように、言葉になる前の思考もあります。',
      takeaway: '言葉は思考を閉じ込める器でも、思考を遠くへ運ぶ道具でもあり、その往復の中で理解が形づくられると見えてきます。',
      closing: '言葉にできないとき、あなたの中では何が考えられていますか。',
      route: [
        ['知る・対話する', '言葉と思考の旅', '言葉、内なる声、抽象化を知り、テーマ専用の文章でAIとの対話へ進む。', 'parts/part5.html#theme-01'],
        ['歴史', '文字と知識の冒険', '言葉を外に残せるようになった変化を見る。', 'parts/part4.html'],
        ['読む', '言葉をめぐるnote', '身近な言葉の場面から問いを深める。', 'library.html?format=read']
      ],
      related: [['thinking', 'AIから見る'], ['understanding', '理解へ進む']]
    },
    number: {
      title: '数字で測れないものに、どう価値を与えるのか。',
      description: '数、社会、教育をつなぎ、測ることと価値の関係をたどります。',
      introduction: '点数、順位、価格、再生数。数字は比較を可能にしますが、同時に何かを見えなくすることもあります。',
      tags: ['数', '社会', '教育'],
      why: '数字は、離れたものを同じ尺度で比べる力を持ちます。しかし、測りやすいものだけを重視すると、関係、意味、成長の過程がこぼれ落ちます。',
      takeaway: '数字は価値そのものではなく、価値の一部を特定の方法で切り取った表現だと見えてきます。',
      closing: 'あなたが大切にしているもので、数字にしにくいものは何ですか。',
      route: [
        ['知る・対話する', '数字と世界', '数えることから評価と社会の関係を知り、テーマ専用の文章でAIとの対話へ進む。', 'parts/part6.html#theme-01'],
        ['教育', '学びとは何か', '評価できる学びと、評価しにくい学びを考える。', 'parts/part13.html'],
        ['読む', '数字をめぐるnote', '点数、価格、統計の日常から問いを深める。', 'library.html?format=read']
      ],
      related: [['understanding', '測れない理解'], ['connection', '社会へ広げる']]
    },
    connection: {
      title: 'つながることは、近づくことと同じなのか。',
      description: '通信、社会、心理をつなぎ、人と人の距離をたどります。',
      introduction: 'いつでも連絡できるのに、遠く感じることがあります。通信の歴史とSNSから「つながる」を見直します。',
      tags: ['通信', '社会', '心理'],
      why: '通信技術は、距離と時間の制約を小さくしました。一方で、接続の数が増えることと、理解や親密さが深まることは同じではありません。',
      takeaway: 'つながりは通信経路の有無だけではなく、注意を向け、相手との関係を育てる時間によって形づくられると見えてきます。',
      closing: 'あなたが「つながっている」と感じるのは、どんなときですか。',
      route: [
        ['知る・対話する', 'つながる世界', 'デジタル革命が人と人のあいだをどう変えたかを知り、AIとの対話へ進む。', 'parts/part2.html#theme-01'],
        ['歴史', '文字と知識の冒険', '情報が距離を越えて届くまでをたどる。', 'parts/part4.html'],
        ['聴く', '関連するPodcast', '物語と対話で、距離と関係を見直す。', 'library.html?format=listen']
      ],
      related: [['language', '言葉へ進む'], ['number', '社会の尺度へ']]
    },
    cooperation: {
      title: 'なぜ人類は、見知らぬ他人とも協力できるようになったのか。',
      description: '贈与、信用、貨幣、分業、供給網、AIから、人類の協働を支える仕組みをたどります。',
      introduction: '私たちの暮らしは、会ったことのない無数の人との協力で成り立っています。その協力を可能にし、同時に壊れやすくする仕組みを見直します。',
      tags: ['人類史', '社会', 'AI'],
      why: '貨幣や分業は、顔の見える集団を越えた協力を可能にしました。一方で、つながりが広がるほど、全体像や責任の所在が見えにくくなることもあります。',
      takeaway: '協働は善意だけでなく、信用、制度、交換、役割分担によって支えられ、その設計によって強さと弱さの両方が生まれると見えてきます。',
      closing: 'あなたの日常を支えている、顔の見えない協力には何がありますか。',
      route: [
        ['知る・対話する', '交換と協働', '贈与、貨幣、分業、供給網を知り、テーマ専用の文章でAIとの対話へ進む。', 'parts/part17.html#theme-01'],
        ['読む', '協働をめぐるnote', '身近な交換や仕事の場面から、問いを一歩深める。', 'library.html?format=read'],
        ['聴く', '第17部 Podcast', '人類史の流れから、見知らぬ人との協力をたどる。', 'library.html?format=listen']
      ],
      related: [['connection', 'つながりから見る'], ['reality', '判断へ進む']]
    },
    reality: {
      title: '私たちが見ている「現実」は、世界そのものなのか。',
      description: '注意、記憶、同調、判断、AIの誤生成から、脳が現実を編集する仕組みをたどります。',
      introduction: '見たはずのものを見落とし、覚えているはずの出来事を作り替えることがあります。認知と社会とAIから、確信と現実の関係を見直します。',
      tags: ['認知', '心理', 'AI'],
      why: '知覚と記憶は録画ではなく、注意、予測、過去の経験から組み立てられます。自信の強さだけでは、その内容が正しいとは限りません。',
      takeaway: '勘違いを意志の弱さとして片づけず、証拠、手順、他者の視点を使って見方を更新する必要があると見えてきます。',
      closing: '確信していることほど、どんな方法で確かめ直せるでしょうか。',
      route: [
        ['知る・対話する', '人はなぜ勘違いするのか', '注意、記憶、同調、判断を知り、テーマ専用の文章でAIとの対話へ進む。', 'parts/part18.html#theme-01'],
        ['読む', '認知と判断をめぐるnote', '日常の見落としや思い込みから、問いを一歩深める。', 'library.html?format=read'],
        ['聴く', '第18部 Podcast', '脳と社会が現実を編集する流れを耳でたどる。', 'library.html?format=listen']
      ],
      related: [['understanding', '理解へ戻る'], ['cooperation', '社会へ広げる']]
    }
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function initFilters() {
    var library = document.querySelector('[data-question-library]');
    if (!library) return;
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-question-filter]'));
    var entries = Array.prototype.slice.call(library.querySelectorAll('[data-themes]'));
    var count = document.querySelector('[data-visible-count]');
    var empty = document.querySelector('[data-question-empty]');

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-question-filter');
        var visible = 0;
        buttons.forEach(function (item) {
          var active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        entries.forEach(function (entry) {
          var themes = (entry.getAttribute('data-themes') || '').split(/\s+/);
          var show = filter === 'all' || themes.indexOf(filter) !== -1;
          entry.hidden = !show;
          if (show) visible += 1;
        });
        if (count) count.textContent = String(visible);
        if (empty) empty.hidden = visible !== 0;
      });
    });
  }

  function questionLink(id) {
    var question = questions[id];
    return question ? 'question.html?id=' + encodeURIComponent(id) : 'questions.html';
  }

  function initDetail() {
    var titleNode = document.querySelector('[data-question-title]');
    if (!titleNode) return;
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    if (!questions[id]) id = 'understanding';
    var question = questions[id];

    document.title = question.title + '｜Manabi Map';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', question.description);
    titleNode.textContent = question.title;
    document.querySelector('[data-question-introduction]').textContent = question.introduction;
    document.querySelector('[data-question-why]').textContent = question.why;
    document.querySelector('[data-question-takeaway]').textContent = question.takeaway;
    document.querySelector('[data-closing-question]').textContent = question.closing;

    document.querySelector('[data-question-tags]').innerHTML = question.tags.map(function (tag) {
      return '<span>' + escapeHtml(tag) + '</span>';
    }).join('');

    document.querySelector('[data-question-route]').innerHTML = question.route.map(function (item, index) {
      return '<li><a href="' + escapeHtml(item[3]) + '">' +
        '<span class="question-route__number">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<span class="question-route__type">' + escapeHtml(item[0]) + '</span>' +
        '<h3>' + escapeHtml(item[1]) + '</h3>' +
        '<p>' + escapeHtml(item[2]) + '</p>' +
        '<span class="question-route__go">' + (index === 0 ? '対話テーマへ →' : '開く →') + '</span></a></li>';
    }).join('');

    document.querySelector('[data-related-questions]').innerHTML = question.related.map(function (item) {
      var relatedQuestion = questions[item[0]];
      return '<a href="' + questionLink(item[0]) + '"><span>' + escapeHtml(item[1]) + '</span>' +
        '<h3>' + escapeHtml(relatedQuestion.title) + '</h3><b aria-hidden="true">→</b></a>';
    }).join('');
  }

  initFilters();
  initDetail();
})();
