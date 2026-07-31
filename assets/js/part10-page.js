(function () {
  'use strict';

  const root = document.getElementById('part-series-root');
  if (!root) return;

  const detail = window.PartDepthData && window.PartDepthData[10];
  const mapData = window.ManabiMapData || {};
  const chapters = [
    {
      title: '感性という現象',
      question: '感動や美は、脳のどこか一点で起きているのか。',
      intro: '感動、美、共感、直感、物語。第一章では、これらを「感覚的で説明できないもの」として片づけず、知覚・身体・記憶・予測がどう結びついて立ち上がるかをたどる。',
      episodes: [
        ['感動はどこで生まれるのか', '報酬予測・身体反応・記憶', '感動は、脳の一点ではなく、どこに広がっているのか。'],
        ['美しいとは何か', '処理流暢性・対称性・文化学習', '美しさは対象の性質なのか、受け手の経験なのか。'],
        ['共感の回路', '情動的共感・心の理論・社会脳', '感じることと理解することは、同じ働きなのか。'],
        ['直感とは何か', '熟達・パターン認識・二段階判断', '直感を信じてよいのは、どんな経験が支えるときか。'],
        ['物語に引き込まれる理由', '没入・因果・心的シミュレーション', '物語は、なぜ事実の一覧より記憶に残るのか。']
      ]
    },
    {
      title: '感性の進化と文化',
      question: '感じる力は、何のために育ってきたのか。',
      intro: '第二章では、感性を「生存に役立つ機能」だけで説明しない。性選択、協力、儀礼、文化の継承、別の能力からの転用を重ね、人間が意味と美を作り続けてきた理由を読む。',
      episodes: [
        ['なぜ美を感じるのか', '性選択・感覚バイアス・文化学習', '普遍的な美と、文化が育てる美は、どう重なっているのか。'],
        ['芸術は役に立つのか', '儀礼・集団結束・記憶の継承', '直接役に立たない表現を、人はなぜ作り続けてきたのか。'],
        ['共感はなぜ必要だったか', '協力・評判・制度', '共感だけで、大きな社会の協力は支えられるのか。'],
        ['意味を求める動物', 'パターン認識・神話・共同体', '人はなぜ、偶然の出来事にも意味を与えるのか。'],
        ['感性は副産物か適応か', '外適応・文化進化・能力の転用', '感性は最初から、そのために生まれた能力なのか。']
      ]
    },
    {
      title: '生成する時代の感性',
      question: '感じることと、意味が生まれることは同じなのか。',
      intro: '第三章では、AIが美しい画像や共感的な言葉を生成する時代に、作品・作者・受け手・教育の関係を組み直す。生成物の品質だけでなく、選択と責任がどこに残るかを考える。',
      episodes: [
        ['生成芸術は美しいか', '生成・編集・作者性', '作品を作ることは、形を出力することだけなのか。'],
        ['AIは共感できるか', '認知的共感・応答・責任', '共感的な応答と、相手の痛みを引き受けることは同じか。'],
        ['意味はどこに宿るか', '作品・文脈・関係', '同じ作品の意味が、場所と時代で変わるのはなぜか。'],
        ['教育と感性', '注意・批評・制作と修正', '点数にしにくい力を、教育はどう育てられるのか。'],
        ['感性は再現できるのか', '推薦・予測・経験の一回性', '反応を予測できることは、感性を再現したことになるのか。']
      ]
    }
  ];

  const timeline = [
    ['紀元前4世紀', 'アリストテレス『詩学』', '悲劇を模倣として捉え、筋・人物・言葉・感情の働きを分析した。物語がなぜ人を引き込むかを問う、第5話「物語に引き込まれる理由」につながる最初期の体系的な試みだった。', ['模倣論', '物語論']],
    ['1735年', 'バウムガルテンが「美学」を提唱', '感覚的な認識を扱う学問として「美学（aesthetica）」という言葉を初めて用いた。理性とは別に、感じ取る力そのものを研究対象にする道を開いた、第10部全体の出発点にある出来事である。', ['美学の誕生']],
    ['1757年', 'ヒューム「趣味の標準について」', '好みは個人によって違うのに、私たちは優れた判断と未熟な判断を区別する。この矛盾を、経験・比較・偏見からの距離という批評の条件から考えた。第2話「美しいとは何か」が引き継ぐ問いである。', ['趣味の基準', '批評']],
    ['1790年', 'カント『判断力批判』', '美の判断は主観的な快に基づきながら、他者にも同意を求めると論じた。「主観なのに普遍性を求める」という、第2話の核心にある緊張を明確にした。', ['美的判断', '主観と普遍']],
    ['1871〜72年', 'ダーウィンと性選択・表情の研究', '『人間の由来』と『人及び動物の表情について』で、装飾・選好・表情を進化の歴史の中に置いた。第6話「なぜ美を感じるのか」が受け継ぐ、美と進化を結ぶ視点である。', ['性選択', '進化心理学']],
    ['1990年', 'チクセントミハイ『フロー体験』', '没入し、時間感覚を忘れるほど活動に集中する心理状態を「フロー」と名づけた。物語や創作への没入を扱う第5話にも重なる概念である。', ['没入', '最適経験']],
    ['1992年', 'リゾラッティらのミラーニューロン発見', 'パルマ大学の実験で、サルが行為を実行するときと他者の行為を見るときの両方で反応する神経細胞が報告された。第3話「共感の回路」が扱う、共感の神経基盤の手がかりになった。', ['ミラーニューロン', '社会脳']],
    ['1999年', 'ゼキが「神経美学」を提唱', '著書『Inner Vision』で美的経験の神経基盤を探る神経美学を提唱し、脳科学と美学が交差する研究領域が形になった。第1話「感動はどこで生まれるのか」の土台にある研究分野である。', ['神経美学']],
    ['2011年', '音楽とドーパミンの研究', '音楽で強い感情が生じるとき、期待が高まる段階と快が頂点に達する段階で、異なる脳部位のドーパミン放出が報告された。第1話が扱う「感動の仕組み」を裏づける代表的な研究である。', ['報酬系', '音楽と感情']],
    ['2018年', 'AI生成作品がオークションへ', 'GANで作られた《エドモン・ド・ベラミー》がクリスティーズで推定額の40倍を超える価格で落札され、作者・データ・選択・制度が問い直された。第11話「生成芸術は美しいか」が正面から扱う出来事である。', ['生成AI', '作者性', ['転換点', 'red']]],
    ['2020年代', '生成AIと文化の再編', '画像・音楽・文章の大量生成が一般化し、創作の入口は広がった。作者の権利・文化的多様性・推薦による均質化という、第11話〜第15話が扱う論点が中心になっている。', [['生成AIと文化', 'green']]]
  ];

  const coreArguments = [
    ['I. 感性は「脳の一部位」ではなく、経験の統合である', [
      '感動の場面で報酬系が働くこと、共感の場面で社会脳が働くことは重要な知見である。しかし活動部位の一覧は、なぜその音楽が「あの日の自分」にだけ特別なのかを説明しない。感性は、知覚した形、身体反応、記憶、次に何が起きるかという予測が、その瞬間に統合される過程である。',
      'だから同じ作品でも、経験する時期と場所が変われば感じ方が変わる。感性は固定された能力値ではなく、世界との接触によって更新され続ける履歴である。'
    ]],
    ['II. 美と意味は、対象と受け手の「あいだ」に生まれる', [
      '対称性や処理のしやすさは美的な快を支えることがあるが、それだけで美を決める公式にはならない。作品の歴史、制作の意図、置かれた場所、受け手の知識が変われば、美的判断も変わるからである。',
      '意味も、作品の内部に保存されたデータではない。作品が持つ形と、受け手が持つ経験、社会が共有する文脈が出会うことで立ち上がる。感性とは、対象に反応する力であると同時に、関係の中で価値を作る力である。'
    ]],
    ['III. AI時代、人間の役割は「生成」から「選択と責任」へ移る', [
      '生成AIは、過去の作品に含まれる規則を学び、新しい組合せを高速に出力できる。美しいと感じやすい形、共感的に聞こえる言葉、物語らしい展開を再現する能力は高まり続けている。',
      'それでも、何を作るか、どの出力を選ぶか、どの文脈に置くか、誰への影響を引き受けるかは自動的には決まらない。AI時代の感性は、形を生む才能だけでなく、価値を選び、その選択を説明する力として再定義される。'
    ]]
  ];

  const glossary = [
    ['感性', 'かんせい', 'sensibility', '知覚したものに意味や価値を感じ取り、選択へつなげる働き。感情だけでなく、身体反応、記憶、予測、文化的な学習を含む。', '理性の反対ではなく、何を重要とみなすかを決める統合過程として扱う。'],
    ['報酬予測', 'ほうしゅうよそく', 'reward prediction', '次に得られる結果を予測し、実際との差から学習を更新する仕組み。音楽の期待・驚き・解決が快につながる説明にも使われる。', 'ドーパミンを単純な快楽物質とせず、予測と学習の働きとして理解する手がかりになる。'],
    ['処理流暢性', 'しょりりゅうちょうせい', 'processing fluency', '情報を認識・理解する際の処理のしやすさ。対称性や反復、慣れは流暢性を高め、好意や正しさの感覚に影響することがある。', '「わかりやすい」と「美しい」「正しい」が混ざる仕組みを考える入口になる。'],
    ['共感', 'きょうかん', 'empathy', '相手の状態を推測する認知的な働きと、相手の感情を共有する情動的な働きの総称。援助行動とは重なるが同一ではない。', 'AIが共感的な応答を生成するとき、何が再現され、何が残るかを分けて考える手がかりになる。'],
    ['神経美学', 'しんけいびがく', 'neuroaesthetics', '美的経験・芸術制作・知覚と評価の神経基盤を研究する学際領域。神経科学だけで美を決めるのではなく、美学や心理学と接続する。', '感性を研究可能な対象にしながら、作品の歴史や文脈も残すための接点になる。'],
    ['外適応', 'がいてきおう', 'exaptation', 'ある目的で生まれた特徴や副産物として生じた特徴が、後に別の用途へ使われること。', '感性を「最初から芸術のために進化した能力」と決めつけず、複数能力の転用として考える視点になる。'],
    ['ミラーニューロン', 'ミラーニューロン', 'mirror neuron', '行為を実行するときと、他者が同じ行為をするのを見るときの両方で反応する神経細胞。', '模倣や行為理解の一部を説明するが、「共感を生む唯一の回路」ではない点に注意が必要。'],
    ['作者性', 'さくしゃせい', 'authorship', '作品の成立において、誰が意図し、素材を選び、判断し、責任を持ったかという関係。単に手を動かした主体だけを指さない。', '生成AIでは、モデル・データ・指示・選択・編集が分散するため、作者性を工程として捉え直す必要がある。'],
    ['直感', 'ちょっかん', 'intuition', '理由を逐一言語化する前に生じる判断。熟達領域では、大量の経験から学んだパターンが高速に照合されることで精度を持つ。', '直感を神秘化せず、どの経験とフィードバックが支えているかを問えるようになる。']
  ];

  const questions = [
    ['美しいと感じたとき、その感覚は作品の形、過去の記憶、周囲の評価のどこから来ているのか。', '最近心を動かされた作品を一つ選び、対象・自分・文脈の三層に分けてみる。'],
    ['共感できる相手と、公平に扱うべき相手は同じか。', '感情が届きにくい遠い他者を、制度やルールがどう補っているか考える。'],
    ['AIが作った作品に感動したとき、その感動は「偽物」になるのか。', '作品の由来と、受け手に実際に起きた経験を分けて考える。'],
    ['感性を育てる教育とは、正しい好みを教えることか、違いに気づく注意を育てることか。', '作品の点数ではなく、観察・根拠・解釈の更新をどう評価できるか考える。']
  ];

  const references = [
    ['カントの美学（スタンフォード哲学百科事典）', 'https://plato.stanford.edu/entries/kant-aesthetics/'],
    ['神経美学（Neuroesthetics）', 'https://en.wikipedia.org/wiki/Neuroesthetics'],
    ['音楽とドーパミンの研究（Salimpoor et al., 2011）', 'https://pubmed.ncbi.nlm.nih.gov/21217764/'],
    ['ミラーニューロン研究の概要', 'https://en.wikipedia.org/wiki/Mirror_neuron'],
    ['《エドモン・ド・ベラミー》とAI生成美術', 'https://en.wikipedia.org/wiki/Edmond_de_Belamy']
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
    return '<div class="doc-footer">ハルとおじいさん｜第10部 感性という深層　― ' + label + ' ―</div>';
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
      (chapterIndex < chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(chapters[chapterIndex + 1].question) + '</div></div>' : '<div class="pull-quote">「感性は、世界との関係を結び直すたびに更新される。」</div>') +
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
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf('第10部') >= 0;
  }) : [];
  const notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../library.html?format=read"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  const referencesHtml = references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>';
  }).join('');

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">撫子<small>なでしこ</small></div>' +
      '<h1 class="cover-title">第10部<br>感性という深層</h1><div class="cover-subtitle">意味はどこから生まれるのか</div>' +
      '<div class="cover-chapter">第1話〜第15話｜全3章</div><div class="cover-tagline"><em>「感性は、世界との関係を結び直すたびに更新される。」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">第10部の本文型補足資料</div><div class="cover-actions"><a class="cover-action" href="../library.html?format=listen">Podcast一覧へ</a><a class="cover-action" href="../library.html?format=read">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part9.html">← 第9部</a><span>第10部 ｜ 感性という深層</span><a href="part11.html">第11部 →</a></nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">なぜ感性を深掘りするのか</div>' +
      '<div class="section-intro"><a href="part8.html">第8部</a>は生成AIの「思考」を、<a href="part9.html">第9部</a>は人間の「身体」を扱った。第10部は、その身体が世界に意味と価値を与える働き――感性へ進む。</div>' +
      '<div class="essay-box"><h3>感じることの内側</h3>' + detail.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') +
      '<p>目的は、感性を脳科学だけで説明し切ることでも、「人間だけの神秘」として守ることでもない。脳、身体、進化、文化、作品、関係を同じ地図に置き、どこで意味が生まれるかを丁寧に追うことである。</p></div>' +
      '<div class="argument-heading"><a href="part8.html">第8部</a>・<a href="part9.html">第9部</a>・第10部をつなぐ一本線</div><p class="argument-body"><a href="part8.html">第8部</a>で、AIは統計から言葉や画像を生成できることを見た。<a href="part9.html">第9部</a>で、人間の思考は進化した身体から切り離せないことを見た。第10部では、その身体が何を大切だと感じ、何に心を動かされるかを問う。生成できること、感じること、意味を持つことは同じなのか。この区別が、AI時代の人間を考える基盤になる。</p>' +
      '<div class="central-question"><div class="cq-label">第10部の中心的問い</div><div class="cq-text">感性は、脳に還元できるのか。<br>それとも、関係の中でしか立ち上がらないのか。</div><div class="cq-sub">形の生成と、意味の経験を分けて考える。</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">感性をめぐる思想と研究の歩み</div>' +
      '<div class="section-intro">感性は、哲学、進化論、脳科学、そして生成AIへと、異なる領域から問い直されてきた。主要な転換点を一本の流れとして整理する。</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">FROM POETICS TO GENERATIVE AI</div><div class="chapter-name">美と感情を、どう説明してきたか</div><div class="chapter-lead">主観、進化、脳、文化、AI。説明の焦点は広がり続けている。</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer('感性の系譜') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">核心論考 ── 感性という「関係」</div><div class="section-intro">15のテーマを一つに束ねると、第10部は感性を「個人の内側にある能力」から「世界との関係を作る働き」へ読み替える章になる。</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第10部の位置づけ</div><p>第10部は、人間の特別さを「AIにできない作業」の一覧で守ろうとしない。AIが生成できる範囲が広がるほど、人間には、何を受け取り、何を選び、どんな関係を作るかが残る。感性は最後に残る能力ではなく、技術をどこへ向けるかを決める出発点である。</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第10部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Bridge to Part 11</div><div class="bridge-text">感じる力は、教わる前から育ち始める。</div><div class="bridge-sub"><a href="part11.html">第11部「人はどう学び始めるのか」</a>では、泣く、まねる、指差す、遊ぶという学びの原型へ進む。</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">さらに読む・聴く</div><div class="section-intro">第10部のPodcast、関連note、本文の背景となる研究・哲学資料への入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="../library.html?format=listen"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第10部の15話を音声でたどる。</div></a><a class="resource-card" href="../library.html?format=read"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a><a class="resource-card" href="part11.html"><div class="resource-label">NEXT JOURNEY</div><div class="resource-title">第11部へ</div><div class="resource-text">感性から、学びの始まりへ進む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
