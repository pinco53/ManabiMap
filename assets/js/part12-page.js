(function () {
  'use strict';

  const root = document.getElementById('part-series-root');
  if (!root) return;

  const detail = window.PartDepthData && window.PartDepthData[12];
  const mapData = window.ManabiMapData || {};
  const chapters = [
    {
      title: '理解を外に出す',
      question: '誰かに伝えようとすると、なぜ理解は変わるのか。',
      intro: 'わかったつもり、教える予定、対話、自己説明、問い返し。第一章では、頭の中の理解を外に出す行為が、なぜ知識を作り直すのかを追う。',
      episodes: [
        ['なぜ人はわかったつもりになるのか', '説明深度の錯覚・自己評価', '「わかった」という感覚は、何を測っているのか。'],
        ['教えることが最高の学習法は本当か', 'プロテジェ効果・生成負荷', '教える予定があるだけで、学び方はどう変わるのか。'],
        ['対話は学びをなぜ深めるのか', '相互依存・精緻化', '独り言と対話では、何が違うのか。'],
        ['誰かに説明しようとすると理解はなぜ変わるのか', '自己説明・転移', '説明することは、なぜ理解を作り直すのか。'],
        ['問い返してくれる人がいると学びはどう変わるのか', '最近接発達領域・足場かけ', '良い問い返しは、何を診断しているのか。']
      ]
    },
    {
      title: '評価という力',
      question: 'テストや比較は、学びを支えるのか、傷つけるのか。',
      intro: '第二章では、テスト・誤り・フィードバック・比較・不安を、学習を支える条件と傷つける条件に分けて読む。',
      episodes: [
        ['テストは評価ではなく学習である', '検索練習・間隔効果', 'テストは、記憶をどう鍛えるのか。'],
        ['間違えることはなぜ学びを深めるのか', '望ましい困難・修正可能性', '良い失敗と、悪い失敗は何が違うのか。'],
        ['フィードバックはいつどう与えると学びになるのか', 'タイミング・具体性', 'フィードバックは、何を伝えると機能するのか。'],
        ['比較されると学習意欲はどう変わるのか', '社会的比較・熟達志向', '比較の軸をどこに置くと、学びは支えられるのか。'],
        ['不安は学びを助けるか邪魔するか', '作業記憶・覚醒水準', '不安は、いつ学びを助け、いつ妨げるのか。']
      ]
    },
    {
      title: 'AI時代の対話',
      question: 'AIとの対話は、学びをどこまで深められるのか。',
      intro: '第三章では、AIを答えの代行者ではなく、自己説明とメタ認知を促す対話相手として使う条件を考える。',
      episodes: [
        ['AIとの対話と、人間との対話は何が違うのか', '責任・関係・生成', 'AIとの対話に、何が欠けているのか。'],
        ['答えを聞くと考えを引き出すは何が違うのか', '認知的オフロード・予想', '先に予想することは、なぜ学びを変えるのか。'],
        ['学習における「沈黙・待つ」の意味', '検索時間・足場', '沈黙は、空白ではなく何をしている時間なのか。'],
        ['メタ認知とは何か', '監視と制御・自信の校正', '「わかっている」という自信は、どう確かめられるのか。'],
        ['学び方を学ぶ時代へ', '自己調整学習・学習の設計', 'AI時代に中心となる学ぶ力とは何か。']
      ]
    }
  ];

  const timeline = [
    ['1885年', 'エビングハウスの忘却曲線', 'みずからを被験者に無意味綴りを記憶する実験を行い、記憶が時間とともにどう減衰するかを定量的に示した。間隔を空けた検索練習という、第6話「テストは評価ではなく学習である」につながる発想の土台になった。', ['忘却曲線', '記憶研究']],
    ['1954年', 'フェスティンガーの社会的比較理論', '人は自分の意見や能力を、他者との比較を通じて評価すると論じた。比較の対象や方向が自己評価や意欲に影響することを示し、第9話「比較されると学習意欲はどう変わるのか」の理論的土台になった。', ['社会的比較']],
    ['1978年', 'ヴィゴツキー『Mind in Society』英訳版', '最近接発達領域(ZPD)の概念が広まり、足場かけを通じて他者との協働の中で学びが進むという視点が広がった。第5話「問い返してくれる人がいると学びはどう変わるのか」の理論的な柱である。', ['最近接発達領域', '足場かけ']],
    ['1980年', 'バーグとシュルの「教える予定」研究', '教える予定があるという情報だけで学習成果が変わることを報告し、後の「プロテジェ効果」研究の出発点になった。第2話「教えることが最高の学習法は本当か」につながる初期の知見である。', ['プロテジェ効果']],
    ['1989年', 'チーらの自己説明研究', '物理の例題を学ぶ際、自分の言葉で手順の理由を説明する学習者ほど成績が良いことを報告した。第4話「誰かに説明しようとすると理解はなぜ変わるのか」の中心的な研究である。', ['自己説明']],
    ['1994年', 'ビョークの「望ましい困難」', '学習中の成績を一時的に下げる難しさが、長期的な保持や転移をむしろ高めることがあると提唱した。第7話「間違えることはなぜ学びを深めるのか」の理論的な核である。', ['望ましい困難']],
    ['2002年', 'ロズンブリットとケイルの「説明深度の錯覚」', '仕組みを説明できると思っていても、実際に書き出そうとすると理解の穴に気づくことを実験的に示した。第1話「なぜ人はわかったつもりになるのか」の中心的な研究である。', ['説明深度の錯覚']],
    ['2006年', 'レディガーとカーピキの検索練習研究', '繰り返し読み直すより、思い出す練習をした方が長期的な記憶保持が高まることを実証し、「テスト効果」を教育心理学の中心テーマに押し上げた。第6話が扱う知見の代表例である。', ['検索練習', 'テスト効果']],
    ['2013年', 'フィオレラとメイヤーの学習効果研究', '教える意図を持つだけで、実際に教えなくても学習成果が上がることを報告し、プロテジェ効果の理解を広げた。第2話につながる研究である。', ['プロテジェ効果']],
    ['2020年代', '生成AIとの対話型学習', 'チャット型AIが個別に質問へ答え、説明を返す機能が教育場面に広がっている。第11話「AIとの対話と、人間との対話は何が違うのか」以降の三話が正面から扱う変化である。', [['生成AIと学習', 'green']]]
  ];

  const coreArguments = [
    ['I. 学びは「情報の受け取り」ではなく、「外に出して確かめる」ことで深まる', [
      '読んで理解したつもりになっても、説明しよう、思い出そうとした瞬間に理解の穴が見える。テスト、自己説明、教える予定は、この「外に出す」機会を作る装置である。',
      'だから学びを深めるのは、情報を増やすことではなく、外に出して確かめ、間違いを修正する回数である。'
    ]],
    ['II. 評価と比較は、学びを支える条件にも、傷つける条件にもなる', [
      'テストや比較そのものが害なのではない。何を測り、結果をどう扱い、次の一歩をどう示すかで、同じ評価が学びを支えもすれば、意欲を奪いもする。',
      '熟達志向の比較軸、具体的なフィードバック、修正可能な失敗を設計できれば、評価は学びの敵ではなく、学びを動かす装置になる。'
    ]],
    ['III. AI時代、対話の役割は「答えを渡す」から「思考を引き出す」へ移る', [
      'AIは反復・言い換え・仮想反論に強く、疲れず何度でも付き合える。しかし、関係を失うリスクや、当事者としての責任は同じ形では負わない。',
      '先に予想し、説明し、AIの回答と比較し、差分を修正するという順序で使えば、AIは答えの代行者ではなく、思考を引き出す対話相手になりうる。'
    ]]
  ];

  const glossary = [
    ['説明深度の錯覚', 'せつめいしんどのさくかく', 'illusion of explanatory depth', '仕組みを説明できると思っていても、実際に書き出すと理解の穴に気づく現象。', '「わかったつもり」を、感覚ではなく検査可能な形で確かめる出発点になる。'],
    ['プロテジェ効果', 'プロテジェこうか', 'protégé effect', '教える予定を持つだけで、学習内容の整理・生成・責任感が高まり、学習成果が向上する現象。', '教えることが最良の学習法だと言われる根拠になっている。'],
    ['自己説明', 'じこせつめい', 'self-explanation', '手順や例題の各ステップがなぜ成り立つかを、自分の知識と結びつけて説明する学習活動。', '読み直すより生成負荷が高く、転移しやすい理解を作る。'],
    ['最近接発達領域', 'さいきんせつはったつりょういき', 'zone of proximal development', '一人ではできないが、適切な支援があれば到達できる課題の範囲。', '良い問い返しや足場かけが、この範囲へ働きかける。'],
    ['検索練習', 'けんさくれんしゅう', 'retrieval practice', '記憶を読み返すのではなく、思い出そうとする行為そのものが記憶を強化する学習法。', 'テストを評価だけでなく学習の手段として設計し直す鍵になる。'],
    ['望ましい困難', 'のぞましいこんなん', 'desirable difficulties', '学習中の成績を一時的に下げても、長期的な保持や転移を高める適度な難しさ。', '良い失敗と、支援が欠けた悪い失敗を区別する視点になる。'],
    ['社会的比較', 'しゃかいてきひかく', 'social comparison', '自分の能力や意見を、他者との比較を通じて評価しようとする心理的傾向。', '比較の軸をどこに置くかで、学習意欲への影響が変わる。'],
    ['メタ認知', 'メタにんち', 'metacognition', '自分の理解や思考そのものを監視し、方略を調整する働き。', '自信度の校正や、学習方略の変更を可能にする中心的な力。'],
    ['認知的オフロード', 'にんちてきオフロード', 'cognitive offloading', '記憶や計算を外部ツールに委ねることで、自分の処理資源を空ける行為。', 'AIへの依存と、内部表象を作る機会の両立を考える鍵になる。']
  ];

  const questions = [
    ['「わかった」という感覚と、実際に説明できることは、どちらが理解の指標として信頼できるのか。', '最近「わかった」と思ったことを一つ選び、実際に声に出して説明してみる。'],
    ['テストや比較は、あなたにとって学びを支えているか、それとも意欲を削っているか。', '比較の対象を、他者ではなく過去の自分に置き換えて考えてみる。'],
    ['AIに先に答えを聞くことと、自分で予想してから答え合わせをすることは、学びにどんな違いを生むか。', '直近でAIに質問した場面を思い出し、先に予想を書いていたらどう変わったか考える。'],
    ['沈黙や待つ時間を、気まずさではなく学びの一部として扱うには、何が必要か。', '誰かに質問した直後、答えを急がせていないか振り返る。']
  ];

  const references = [
    ['説明深度の錯覚（原著）', 'https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog2605_1'],
    ['検索練習と長期保持（Roediger & Karpicke, 2006）', 'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x'],
    ['プロテジェ効果のレビュー', 'https://www.sciencedirect.com/science/article/abs/pii/S0361476X13000209'],
    ['望ましい困難（Bjork）', 'https://en.wikipedia.org/wiki/Desirable_difficulty'],
    ['社会的比較理論（Festinger, 1954）', 'https://journals.sagepub.com/doi/10.1177/001872675400700202']
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function linkEpisodes(escapedText) {
    return escapedText.replace(/第(\d+)話「[^」]*」/g, function (match, num) {
      return '<a class="tl-episode-link" href="#theme-' + String(num).padStart(2, '0') + '">' + match + '</a>';
    });
  }

  function footer(label) {
    return '<div class="doc-footer">ハルとおじいさん｜第12部 人はなぜ、一人では学べないのか　― ' + label + ' ―</div>';
  }

  let episodeNumber = 0;
  const chapterPages = chapters.map(function (chapter, chapterIndex) {
    const start = episodeNumber + 1;
    const rows = chapter.episodes.map(function (episode) {
      episodeNumber += 1;
      const episodeDetail = detail && detail.episodes && detail.episodes[episodeNumber];
      const tags = episode[1].split('・').map(function (tag) { return '<span class="tag">' + esc(tag) + '</span>'; }).join('');
      return '<div class="episode-row" id="theme-' + String(episodeNumber).padStart(2, '0') + '"><div class="episode-no">Theme ' + String(episodeNumber).padStart(2, '0') + '</div><div>' +
        '<div class="episode-title">' + esc(episode[0]) + '</div>' +
        '<p class="episode-summary">' + esc(episodeDetail ? episodeDetail.background : '') + '</p>' +
        '<p class="episode-summary">' + esc(episodeDetail ? episodeDetail.lens : '') + '</p>' +
        '<div class="episode-question">核心の問い：' + esc(episode[2]) + '</div>' +
        '<div class="tags">' + tags + '</div></div></div>';
    }).join('');
    const end = episodeNumber;
    const modifier = chapterIndex === 1 ? ' chapter-card--middle' : (chapterIndex === 2 ? ' chapter-card--final' : '');
    return '<div class="page"><div class="section-label">Chapter ' + String(chapterIndex + 1).padStart(2, '0') + '</div>' +
      '<div class="section-title">' + esc(chapter.title) + '</div><div class="section-intro">' + esc(chapter.intro) + '</div>' +
      '<div class="chapter-card' + modifier + '"><div class="chapter-card__head"><div class="chapter-kicker">THEMES ' + String(start).padStart(2, '0') + ' - ' + String(end).padStart(2, '0') + '</div>' +
      '<div class="chapter-name">' + esc(chapter.title) + '</div><div class="chapter-lead">' + esc(chapter.question) + '</div></div><div class="episode-list">' + rows + '</div></div>' +
      '<div class="argument-heading">第' + (chapterIndex + 1) + '章の結論</div><p class="argument-body">' + esc(detail.chapters[chapterIndex]) + '</p>' +
      (chapterIndex < chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(chapters[chapterIndex + 1].question) + '</div></div>' : '<div class="pull-quote">「学びは、外に出して確かめた分だけ深くなる。」</div>') +
      footer('第' + (chapterIndex + 1) + '章') + '</div>';
  }).join('');

  const timelineRows = timeline.map(function (item) {
    const tagsHtml = (item[3] || []).map(function (tag) {
      const isColored = Array.isArray(tag);
      const label = isColored ? tag[0] : tag;
      const cls = isColored ? ' ' + tag[1] : '';
      return '<span class="tl-tag' + cls + '">' + esc(label) + '</span>';
    }).join('');
    return '<div class="tl-item"><div class="tl-year">' + esc(item[0]) + '</div><div class="tl-content"><div class="tl-event">' + esc(item[1]) + '</div><div class="tl-desc">' + linkEpisodes(esc(item[2])) + '</div>' + (tagsHtml ? '<div class="tl-tags">' + tagsHtml + '</div>' : '') + '</div></div>';
  }).join('');

  const argumentsHtml = coreArguments.map(function (argument) {
    return '<div class="argument-heading">' + esc(argument[0]) + '</div>' + argument[1].map(function (paragraph) { return '<p class="argument-body">' + esc(paragraph) + '</p>'; }).join('');
  }).join('');

  const glossaryHtml = glossary.map(function (item) {
    return '<div class="glossary-item"><div class="glossary-term">' + esc(item[0]) + ' <span class="glossary-kana">' + esc(item[1]) + '</span><span class="glossary-en">' + esc(item[2]) + '</span></div>' +
      '<div class="glossary-def">' + esc(item[3]) + '</div><div class="glossary-note">なぜ重要か：' + esc(item[4]) + '</div></div>';
  }).join('');

  const questionsHtml = questions.map(function (item, index) {
    return '<div class="d-item"><div class="d-num">' + (index + 1) + '</div><div><div class="d-text">' + esc(item[0]) + '</div><div class="d-hint">ヒント：' + esc(item[1]) + '</div></div></div>';
  }).join('');

  const noteItems = Array.isArray(mapData.notes) ? mapData.notes.filter(function (note) {
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf('第12部') >= 0;
  }) : [];
  const notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../note.html"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  const referencesHtml = references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>';
  }).join('');

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">琥珀<small>こはく</small></div>' +
      '<h1 class="cover-title">第12部<br>人はなぜ、一人では学べないのか</h1><div class="cover-subtitle">対話・評価・関係の学習心理学</div>' +
      '<div class="cover-chapter">第1話〜第15話｜全3章</div><div class="cover-tagline"><em>「学びは、外に出して確かめた分だけ深くなる。」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">第12部の本文型補足資料</div><div class="cover-actions"><a class="cover-action" href="../podcast.html">Podcast一覧へ</a><a class="cover-action" href="../note.html">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part11.html">← 第11部</a><span>第12部 ｜ 人はなぜ、一人では学べないのか</span><a href="part13.html">第13部 →</a></nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">なぜ対話と評価を深掘りするのか</div>' +
      '<div class="section-intro">第10部は感性が関係の中で立ち上がることを、第11部は学びの原型が応答という関係から始まることを見た。第12部は、その関係が対話としてどう学びを深めるかへ進む。</div>' +
      '<div class="essay-box"><h3>一人では届かない場所</h3>' + detail.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') +
      '<p>目的は、対話やテストを万能の学習法として推奨することでも、AIとの対話を否定することでもない。説明・問い・評価・沈黙が学びをどう動かすかを、条件つきで見極めることである。</p></div>' +
      '<div class="argument-heading">第10部・第11部・第12部をつなぐ一本線</div><p class="argument-body">第10部で、感性は関係の中で立ち上がることを見た。第11部で、学びの原型は応答という関係から始まることを見た。第12部では、その関係が対話としてどう学びを深めるかを問う。感じる、学び始める、対話するという三部作は、いずれも「一人では完結しない」という一本の線でつながっている。</p>' +
      '<div class="central-question"><div class="cq-label">第12部の中心的問い</div><div class="cq-text">一人で考えることと、対話しながら考えることは、<br>何が違うのか。</div><div class="cq-sub">答えを渡す関係と、思考を引き出す関係を分けて考える。</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">対話・評価・学習をめぐる研究の歩み</div>' +
      '<div class="section-intro">学びを深める対話や評価は、記憶研究、社会心理学、教育心理学、そして生成AIへと、異なる領域から問い直されてきた。主要な転換点を一本の流れとして整理する。</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">FROM MEMORY RESEARCH TO AI DIALOGUE</div><div class="chapter-name">対話と評価を、どう説明してきたか</div><div class="chapter-lead">記憶、社会心理学、教育実践、そしてAI。説明の焦点は広がり続けている。</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer('対話と評価の系譜') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">核心論考 ── 学びという「対話」</div><div class="section-intro">15のテーマを一つに束ねると、第12部は学びを「一人で完結する作業」から「対話を通じて外に出し、確かめ続ける過程」へ読み替える章になる。</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第12部の位置づけ</div><p>第12部は、対話やテストを「正しくやれば必ず効く技法」としては描かない。AIが答えを即座に返せる時代でも、学びを深めるのは、外に出し、間違い、問い返され、また外に出すという往復である。人間の役割は、その往復に責任と関係を持ち込むことに残り続ける。</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第12部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Bridge to Part 13</div><div class="bridge-text">一人では学べないという気づきの先に、学びを支える環境がある。</div><div class="bridge-sub">第13部「学びとは何か」では、学校・家庭という環境が学びをどう支え、どう閉ざすかへ進む。</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">さらに読む・聴く</div><div class="section-intro">第12部のPodcast、関連note、本文の背景となる研究資料への入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="../podcast.html"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第12部の15話を音声でたどる。</div></a><a class="resource-card" href="../note.html"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a><a class="resource-card" href="part13.html"><div class="resource-label">NEXT JOURNEY</div><div class="resource-title">第13部へ</div><div class="resource-text">対話から、学びを支える環境へ進む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
