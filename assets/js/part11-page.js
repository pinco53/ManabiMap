(function () {
  'use strict';

  const root = document.getElementById('part-series-root');
  if (!root) return;

  const detail = window.PartDepthData && window.PartDepthData[11];
  const mapData = window.ManabiMapData || {};
  const chapters = [
    {
      title: 'はじまりの関係',
      question: '子どもは、誰かに応答されることから何を学んでいるのか。',
      intro: '泣き、まなざし、抱っこ、指差し。第一章では、これらを「未熟な行動」としてではなく、世界は応答するという予測を作る最初のやりとりとして読む。',
      episodes: [
        ['人はなぜ泣くことから人生を始めるのか', '泣き・相互調整・応答', '泣き声は、何を伝えようとしているのか。'],
        ['安心は最初の学びである', '安全基地・探索・愛着', '安心できることは、なぜ探索の前提になるのか。'],
        ['愛着形成とは何か', '内的作業モデル・愛着スタイル・関係', '愛着は、どんな期待のパターンとして育つのか。'],
        ['まねる力が人間を人間にした', '過剰模倣・文化伝達・学習', '非効率に見える模倣は、何を学んでいるのか。'],
        ['指差しはなぜすごいのか', '共同注意・三項関係・言語以前', '指差しは、何を「一緒に見る」経験なのか。']
      ]
    },
    {
      title: '探索を支えるもの',
      question: '子どもは、何に守られて未知へ踏み出すのか。',
      intro: '自己、言葉になる前の思考、脳の可塑性、身体接触、遊び。第二章では、これらを探索を可能にする土台として整理する。',
      episodes: [
        ['赤ちゃんはいつから自分と他人を分けるのか', '自己認識・鏡像・行為主体感', '「自分」は、いつ、どうやって立ち上がるのか。'],
        ['言葉を話す前に、子どもは何を考えているのか', '前言語的思考・数量・因果', '言葉のない思考は、何を予測しているのか。'],
        ['赤ちゃんの脳はなぜこんなに可塑的なのか', '可塑性・臨界期・シナプス刈り込み', '早期の経験は、脳をどこまで決めてしまうのか。'],
        ['抱っこは甘やかしなのか、発達の栄養なのか', '身体接触・生理的同調・自立', '十分に頼れる経験は、自立とどうつながるのか。'],
        ['遊びは学びの原型である', '自由遊び・ガイド付き遊び・仮説検証', '遊びの中で、子どもは何を試しているのか。']
      ]
    },
    {
      title: '自分で動き出す力',
      question: '子どもは、どうやって「自分でできる」へ育っていくのか。',
      intro: '自律性、想像、質問、我慢、自己効力感。第三章では、これらが周囲とのやりとりの中でどう育つかを追う。',
      episodes: [
        ['イヤイヤ期は反抗ではなく自立の始まり', '自律性・実行機能・非対称な発達', '「イヤ」は、何が育ちきっていないサインなのか。'],
        ['ごっこ遊びが育てる想像力と社会性', '象徴機能・役割交換・他者理解', '別の誰かになることは、何を学ぶ機会になるのか。'],
        ['幼児期の「なぜ？」は探究心の原点', '因果探究・対話・説明', '「なぜ」を繰り返す問いは、何を確かめようとしているのか。'],
        ['我慢する力はどう育つのか', '実行機能・自己調整・環境設計', '待つ力は、意志力だけで説明できるのか。'],
        ['「できた！」が自己効力感をつくる', '自己効力感・達成経験・方略の振り返り', '「できた」という経験は、次の挑戦へどうつながるのか。']
      ]
    }
  ];

  const timeline = [
    ['1958年', 'ハーロウのアカゲザル実験', '布と針金の代理母を使った実験から、接触の快さが愛着行動の基盤にあることを示した。食べ物だけでは愛着を説明できないことが明らかになった。'],
    ['1969年', 'ボウルビィ『Attachment and Loss』第1巻', '愛着を、生存に関わる生物学的なシステムとして体系化した。子どもが特定の養育者を求める行動を、進化的な視点から説明した。'],
    ['1970年', 'エインスワースの愛着の3類型', '「ストレンジ・シチュエーション」の観察から、安定・回避・アンビバレントという愛着の個人差を報告した。'],
    ['1970年', 'ギャロップの鏡像自己認知実験', 'チンパンジーが鏡に映った自分の像を自己として認識できることを報告し、自己認識研究の出発点になった。'],
    ['1975年', 'トロニックの「スティルフェイス」実験', '養育者が無表情で応答を止めると、乳児が強い混乱と回復への働きかけを示すことを観察し、相互調整の重要性を示した。'],
    ['1977年', 'メルツォフとムーアの新生児模倣', '生後間もない乳児が大人の表情や手の動きをまねることを報告し、模倣が生得的な土台を持つ可能性を示した。'],
    ['1977年', 'バンデューラの自己効力感理論', '努力や工夫によって課題に働きかけられるという見通しが、行動変容を支える中心的な要因であると提唱した。'],
    ['1978年', 'ヴィゴツキー『Mind in Society』英訳版', '最近接発達領域(ZPD)の概念が広く知られ、学びを個人の内側だけでなく、他者との協働の中で捉える視点が広がった。'],
    ['2000年代', 'ハーバード大学「サーブ・アンド・リターン」', '乳幼児期の応答的なやりとりの重要性を、脳の発達研究に基づいて広く伝える枠組みとして提唱された。'],
    ['2020年代', '音声AIと子どもの学び', '対話エージェントが子どもの遊びや質問の相手として家庭に入り始め、模倣と応答の対象が人間以外にも広がっている。']
  ];

  const coreArguments = [
    ['I. 学びは「知識の獲得」ではなく、「関係の中の予測」から始まる', [
      '泣き声に誰かが応答し、抱っこや視線が返ってくる。その反復の中で乳児が学ぶのは特定の事実ではなく、「働きかければ世界は応答する」という予測である。安心、愛着、共同注意は、この予測を土台にして育つ。',
      'だから学びの原型は、情報を一方向に注ぎ込むことではない。誰かが応答し、外れれば調整し直すという往復そのものが、最初の学習内容になる。'
    ]],
    ['II. 発達は「階段」ではなく、複数の経路が同じ力へ向かう網である', [
      '安全基地があるから探索できる、模倣が文化を運ぶ、遊びが仮説検証の場になる。これらは別々の獲得段階ではなく、同じ「試して確かめる」力を異なる角度から支える経路である。',
      '何歳で何ができるかという年齢表は目安にすぎない。生得的な準備、養育者との関係、文化、偶然の経験が組み合わさり、複数の道筋から同じ力に到達する。'
    ]],
    ['III. AI時代、子どもが応答を受け取る相手は「人間だけ」ではなくなる', [
      '音声AIや対話エージェントは、子どもの問いかけに即座に、疲れず応答できる。共同注意に似た反応や、模倣の対象となる言葉遣いさえ提供し始めている。',
      'しかしAIの応答には、身体を同調させる負担やリスクの分かち合い、応答が外れたときに関係ごと調整し直す重みがない。子どもの学びを支える基盤は、応答の速さではなく、応答に伴う関係の厚みに残り続ける。'
    ]]
  ];

  const glossary = [
    ['愛着', 'あいちゃく', 'attachment', '特定の養育者との間に築かれる、頼り、安心を求める心理的な結びつき。関係経験の中で形成される期待のパターンである。', '第11部では、愛着を性格の分類ではなく、関係が変われば更新されうる期待として扱う。'],
    ['安全基地', 'あんぜんきち', 'secure base', '戻れば安心できる、頼れる相手や場所。子どもが未知の環境へ探索に出るための心理的な土台になる。', '安心と探索は対立しない。安全基地があるからこそ、子どもは外へ向かえる。'],
    ['内的作業モデル', 'ないてきさぎょうモデル', 'internal working model', '養育者との関係経験から作られる、他者への期待や自己像の枠組み。後の対人関係や、助けの求め方にも影響する。', '固定した性格ではなく、関係が変われば更新されうる枠組みとして理解する。'],
    ['共同注意', 'きょうどうちゅうい', 'joint attention', '自分と他者が同じ対象に注意を向けていると認識し合う、言葉以前の三者関係。指差しや視線の追従で観察される。', '語彙獲得や社会的理解の足場になる、学びの原型の一つ。'],
    ['過剰模倣', 'かじょうもほう', 'overimitation', '目的達成に不要な動作までまねる、子どもに特有の模倣傾向。非効率に見えるが、隠れた因果や集団の規範を丸ごと学ぶ仕組みになりうる。', '高忠実度の模倣が、世代を越えた文化の蓄積を可能にしてきた。'],
    ['神経可塑性', 'しんけいかそせい', 'neuroplasticity', '経験に応じて脳の神経回路が変化する性質。幼少期に接続が急増し、その後よく使う回路が選択的に安定する。', '「三歳までで決まる」という締切論を避け、生涯の変化可能性も残して考える。'],
    ['実行機能', 'じっこうきのう', 'executive function', '注意をそらす、状況を予測する、ルールを保持する、感情を調整するなど、目標に向けて行動を制御する複数の能力の総称。', 'イヤイヤ期や我慢する力の背景を、単一の意志力ではなく複数機能の発達として見る。'],
    ['自己効力感', 'じここうりょくかん', 'self-efficacy', '自分は努力や工夫、助けを使って課題に働きかけられるという見通し。結果の成功よりも、そこに至る経験の積み重ねが根拠になる。', '「できた」という経験を、次の挑戦へ再利用可能な知識に変える鍵になる。'],
    ['ガイド付き遊び', 'ガイドつきあそび', 'guided play', '子どもの主体性を残しながら、大人が問いかけや環境設定で学びの機会に気づかせる遊びの形態。自由遊びとは役割が異なる。', '遊びを成果達成の手段にしすぎず、探索性を保つバランスを考える視点になる。']
  ];

  const questions = [
    ['子どもが「イヤ」と言うとき、それは自律性の育ちと、実行機能の追いつかなさの、どちらの側面が強く出ているのか。', '身近な子どもの拒否の場面を一つ思い出し、選択肢を絞る・感情を言葉にする・見通しを示すことがどう助けになるか考える。'],
    ['安心と自由は対立するものか、それとも同じ土台の両面か。', '自分が新しいことに挑戦できた場面で、「戻れる場所」が実際にどう機能したかを振り返る。'],
    ['AIが子どもの遊びや質問の相手になるとき、模倣や共同注意の対象として何が引き継がれ、何が引き継がれないのか。', '人間の応答に特有な身体的同調や、応答が外れたときに関係ごと調整し直す重みを具体的に挙げる。'],
    ['「できた」という経験を、次の挑戦につながる自己効力感に変えるために、大人はどんな言葉をかけられるのか。', '結果だけでなく、使った方略や助けの求め方を一緒に言葉にする場面を考える。']
  ];

  const references = [
    ['発達を支える「サーブ・アンド・リターン」', 'https://developingchild.harvard.edu/key-concept/serve-and-return/'],
    ['実行機能と自己調整を育てる活動', 'https://developingchild.harvard.edu/wp-content/uploads/2024/10/Enhancing-and-Practicing-Executive-Function-Skills-with-Children-from-Infancy-to-Adolescence-1.pdf'],
    ['新生児模倣の報告（Meltzoff & Moore, 1977）', 'https://www.science.org/doi/10.1126/science.198.4312.75'],
    ['鏡像自己認知の報告（Gallup, 1970）', 'https://www.science.org/doi/10.1126/science.167.3914.86'],
    ['自己効力感の理論（Bandura, 1977）', 'https://pubmed.ncbi.nlm.nih.gov/847061/'],
    ['模倣の社会的機能に関するレビュー', 'https://www.annualreviews.org/doi/10.1146/annurev-devpsych-033020-024051'],
    ['共同注意と社会的認知に関するレビュー', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2963105/']
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function footer(label) {
    return '<div class="doc-footer">ハルとおじいさん｜第11部 人はどう学び始めるのか　― ' + label + ' ―</div>';
  }

  let episodeNumber = 0;
  const chapterPages = chapters.map(function (chapter, chapterIndex) {
    const start = episodeNumber + 1;
    const rows = chapter.episodes.map(function (episode) {
      episodeNumber += 1;
      const episodeDetail = detail && detail.episodes && detail.episodes[episodeNumber];
      const tags = episode[1].split('・').map(function (tag) { return '<span class="tag">' + esc(tag) + '</span>'; }).join('');
      return '<div class="episode-row"><div class="episode-no">Theme ' + String(episodeNumber).padStart(2, '0') + '</div><div>' +
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
      (chapterIndex < chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(chapters[chapterIndex + 1].question) + '</div></div>' : '<div class="pull-quote">「学びは、誰かが応答してくれることから始まる。」</div>') +
      footer('第' + (chapterIndex + 1) + '章') + '</div>';
  }).join('');

  const timelineRows = timeline.map(function (item) {
    return '<div class="tl-item"><div class="tl-year">' + esc(item[0]) + '</div><div class="tl-content"><div class="tl-event">' + esc(item[1]) + '</div><div class="tl-desc">' + esc(item[2]) + '</div></div></div>';
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
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf('第11部') >= 0;
  }) : [];
  const notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../note.html"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  const referencesHtml = references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>';
  }).join('');

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">珊瑚<small>さんご</small></div>' +
      '<h1 class="cover-title">第11部<br>人はどう学び始めるのか</h1><div class="cover-subtitle">学びの原型をめぐる旅</div>' +
      '<div class="cover-chapter">第1話〜第15話｜全3章</div><div class="cover-tagline"><em>「学びは、誰かが応答してくれることから始まる。」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">第11部の本文型補足資料</div><div class="cover-actions"><a class="cover-action" href="../podcast.html">Podcast一覧へ</a><a class="cover-action" href="../note.html">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part10.html">← 第10部</a><span>第11部 ｜ 人はどう学び始めるのか</span><a href="part12.html">第12部 →</a></nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">なぜ学びの始まりを深掘りするのか</div>' +
      '<div class="section-intro">第9部は生成AI時代を生きる人間の身体を、第10部はその身体が意味と価値を感じる働き――感性を扱った。第11部は、その感性を持つ人間が、生まれた直後から何を学び始めているのかという原点へ進む。</div>' +
      '<div class="essay-box"><h3>教わる前の学び</h3>' + detail.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') +
      '<p>目的は、発達を年齢別のチェックリストへ還元することでも、生まれつきか環境かの二択に単純化することでもない。身体、関係、文化、偶然を同じ地図に置き、学びがどこで立ち上がるかを丁寧に追うことである。</p></div>' +
      '<div class="argument-heading">第9部・第10部・第11部をつなぐ一本線</div><p class="argument-body">第9部で、人間の思考は進化した身体から切り離せないことを見た。第10部で、その身体が何を大切だと感じ、何に心を動かされるかを見た。第11部では、その身体と感性を持つ人間が、生まれた直後から何を学び始めているかを問う。感じる力と学ぶ力は、同じ関係の中で育っていく。</p>' +
      '<div class="central-question"><div class="cq-label">第11部の中心的問い</div><div class="cq-text">学びは、教えられる前から始まっている。<br>それは、何によって支えられているのか。</div><div class="cq-sub">能力の年齢表ではなく、学びを支える関係を追う。</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">発達心理学をめぐる研究と実践の歩み</div>' +
      '<div class="section-intro">乳幼児の学びは、動物実験、臨床観察、認知発達理論、脳科学、そして子育て支援の実践へと、異なる領域から問い直されてきた。主要な転換点を一本の流れとして整理する。</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">FROM ATTACHMENT THEORY TO AI COMPANIONS</div><div class="chapter-name">愛着と模倣を、どう説明してきたか</div><div class="chapter-lead">観察、実験、脳科学、そして子育て政策。説明の焦点は広がり続けている。</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer('学びの原型の系譜') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">核心論考 ── 学びという「関係」</div><div class="section-intro">15のテーマを一つに束ねると、第11部は学びを「個人が持つ能力」から「関係の中で立ち上がる力」へ読み替える章になる。</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第11部の位置づけ</div><p>第11部は、学びの始まりを「早期教育で最大化すべき能力」としては描かない。AIが情報や答えを即座に返せる時代でも、乳幼児が最初に学ぶのは知識ではなく、応答してくれる関係があるという安心である。学びを支える基盤は、情報量ではなく、応答の質と関係の厚みに残り続ける。</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第11部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Bridge to Part 12</div><div class="bridge-text">学びの原型は、一人だけでは完結しない。</div><div class="bridge-sub">第12部「人はなぜ、一人では学べないのか」では、対話・評価・フィードバックが学びをどう深めるかへ進む。</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">さらに読む・聴く</div><div class="section-intro">第11部のPodcast、関連note、本文の背景となる研究資料への入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="../podcast.html"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第11部の15話を音声でたどる。</div></a><a class="resource-card" href="../note.html"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a><a class="resource-card" href="part12.html"><div class="resource-label">NEXT JOURNEY</div><div class="resource-title">第12部へ</div><div class="resource-text">学びの始まりから、対話の中の学びへ進む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
