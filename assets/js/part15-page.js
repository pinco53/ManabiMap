(function () {
  'use strict';

  const root = document.getElementById('part-series-root');
  if (!root) return;

  const detail = window.PartDepthData && window.PartDepthData[15];
  const mapData = window.ManabiMapData || {};
  const chapters = [
    {
      title: '確信が生まれる仕組み',
      question: '「わかった」という確信は、どこから生まれるのか。',
      intro: '第一章では、理解の錯覚と二分法、観察の限界を通して、確信が生まれる仕組みをほどく。',
      episodes: [
        ['知っているつもりが、一番危ない', '説明深度の錯覚・自己評価', '「知っている」という感覚は、どこまで信頼できるのか。'],
        ['白黒にすると、ちょっと楽になる', '認知的閉鎖欲求・二分法', '曖昧さに耐えることと、判断を放棄することは何が違うのか。'],
        ['目で見ても、わからないことがある', '観察の理論負荷性・検証', '観察は、なぜ中立なカメラではないのか。']
      ]
    },
    {
      title: '迷いを保つ知性',
      question: '迷いながらも考え続けるには、何が支えになるのか。',
      intro: '第二章では、ダーウィン、アーレント、クーンを手がかりに、迷いを維持する知性と共同体の枠組みを考える。',
      episodes: [
        ['迷いながら、でも正しかった', 'ダーウィン・反証・長期の検証', '迷いを保つことは、優柔不断と何が違うのか。'],
        ['考えをやめたとき、何かが壊れた', 'アーレント・思考の欠如', '「考えることをやめる」とは、具体的に何をやめることなのか。'],
        ['同じ出来事が、全然違う意味に見える', 'クーン・パラダイム', '同じデータの意味は、なぜ枠組みで変わるのか。']
      ]
    },
    {
      title: 'AIと考え直す',
      question: 'AIの答えを、思考停止ではなく思考の入口にできるのか。',
      intro: '第三章では、AIの回答を思考停止ではなく、反証・比較・問い直しの入口に変える実践へ進む。',
      episodes: [
        ['AIの答えを、考えの始まりにする', '検証・反証例・一次資料', 'AIの回答を、権威ではなく仮説として使うには何が要るのか。'],
        ['わかったつもりを、手放す練習', '知的謙虚さ・確信度の記録', '考えを変えることを、失敗ではなく校正として扱うにはどうすればよいか。']
      ]
    }
  ];

  const timeline = [
    ['紀元前5世紀', 'ソクラテスの「無知の知」', '自分が知らないことを知っているという自己認識こそ、知恵の始まりだと説いた。第1話「知っているつもりが、一番危ない」に通じる、知的謙虚さの最も古い原点である。', ['無知の知']],
    ['1837〜59年', 'ダーウィンの研究ノートと『種の起源』', '反対証拠や未解決点を記録し続け、地質学・育種・分布のデータを長期間つないでから発表した。結論を急がず迷いを保つ実践として、第4話「迷いながら、でも正しかった」が扱う姿勢である。', ['反証の記録', '長期の検証']],
    ['1958年', 'ハンソン『科学的発見のパターン』', '同じ星空を見ても、天動説と地動説を信じる観測者には違うものが見えると論じ、観察が理論に影響される「理論負荷性」を提示した。第3話「目で見ても、わからないことがある」の理論的な出発点である。', ['理論負荷性', '観察']],
    ['1962年', 'クーン『科学革命の構造』', '科学の進歩を、模範問題・測定装置・用語を共有する共同体の枠組み（パラダイム）が交代する過程として描いた。第6話「同じ出来事が、全然違う意味に見える」の中心理論である。', ['パラダイム']],
    ['1963年', 'アーレント『エルサレムのアイヒマン』', 'アイヒマン裁判で注目したのは、怪物的な知能不足より、定型句に依存し他者の立場から判断する活動が止まる「思考の欠如」だった。第5話「考えをやめたとき、何かが壊れた」の中心的な出来事である。', ['思考の欠如', ['転換点', 'red']]],
    ['1989年', 'クルグランスキーの「認知的閉鎖欲求」', '曖昧さを早く終わらせ、最初の説明に飛びつきたくなる心理的傾向を理論化した。第2話「白黒にすると、ちょっと楽になる」の中心的な理論である。', ['認知的閉鎖欲求']],
    ['1999年', 'ダニングとクルーガーの自己評価研究', '能力が低い領域ほど、自分の実力を正確に見積もれず自己評価が甘くなりやすいことを実験的に示した。第1話が扱う「知っているつもり」を考える代表的な研究である。', ['自己評価の誤差']],
    ['2020年代', '生成AIとの検証実践', 'AIの回答を権威として受け取るのではなく、根拠・反証例・一次資料を確かめる仮説として扱う実践が広がっている。第7話「AIの答えを、考えの始まりにする」が扱う変化である。', [['AIと検証', 'green']]]
  ];

  const coreArguments = [
    ['I. 確信は「証拠の強さ」ではなく「説明のなめらかさ」から生まれることがある', [
      '流暢に読める、聞いたことがある、簡潔に説明できるという感覚は、理解の深さと簡単に混同される。曖昧さを早く終わらせたい心理は、この混同をさらに強める。',
      'だから「わかった」という感覚を、そのまま理解の証拠として扱わない。説明を書き出す、反対の立場を想像するといった検査を挟むことで、確信と証拠の強さを近づけられる。'
    ]],
    ['II. 迷いを保つ知性は、優柔不断ではなく、証拠を外部化し更新し続ける実践である', [
      'ダーウィンは反対証拠をノートに残し、時間をかけて仮説を鍛えた。アーレントは、定型句に頼らず他者の立場から考え続けることの重みを見た。クーンは、同じ現象の意味が共同体の枠組みで変わることを示した。',
      '迷いを保つとは、いつまでも決めないことではない。証拠の強さに応じて暫定的に判断し、反対証拠が来たとき更新できる形で保持することである。'
    ]],
    ['III. AIの回答は、思考の終着点ではなく、検証と問い直しの入口になりうる', [
      'AIは流暢で整った説明を高速に返し、理解の錯覚を強めやすい。同時に、反対意見・検証項目・複数の仮説を出させれば、思考の幅を広げる道具にもなる。',
      '回答を受け取ったら、前提・根拠・反証例・不確実性を問い直す。AIを答えの権威としてではなく、検証可能な仮説生成器として使うとき、わかったつもりを手放す練習が始まる。'
    ]]
  ];

  const glossary = [
    ['無知の知', 'むちのち', 'Socratic ignorance', '自分が知らないことを自覚すること自体が、知恵の出発点になるという考え方。', '知ったかぶりと謙虚な探究を分ける、最も古い知的謙虚さの原点。'],
    ['説明深度の錯覚', 'せつめいしんどのさくかく', 'illusion of explanatory depth', '仕組みを説明できると思っていても、実際に書き出すと理解の穴に気づく現象。', '「わかったつもり」を検査可能な形で確かめる手がかりになる。'],
    ['認知的閉鎖欲求', 'にんちてきへいさよっきゅう', 'need for cognitive closure', '曖昧さを早く終わらせ、明確な答えに飛びつきたくなる心理的傾向。', '疲労や時間圧、脅威によって強まり、二分法的な判断を招きやすい。'],
    ['理論負荷性', 'りろんふかせい', 'theory-ladenness', '観察が中立な記録ではなく、観察者が持つ理論や期待に影響されるという考え方。', '「見ればわかる」という前提を疑い、複数の視点で検証する必要性を示す。'],
    ['パラダイム', 'パラダイム', 'paradigm', '模範となる問題、測定装置、用語、良い説明の基準を共有する研究実践の枠組み。', '同じデータの意味が、枠組みによって変わることを理解する鍵になる。'],
    ['思考の欠如', 'しこうのけつじょ', 'absence of thinking', '定型句に頼り、他者の立場から判断する活動そのものが止まっている状態。', '極端な悪だけでなく、日常の判断停止にも当てはまる視点である。'],
    ['ダニング＝クルーガー効果', 'ダニング＝クルーガーこうか', 'Dunning-Kruger effect', '能力が低い領域ほど、自分の実力を正確に見積もれない傾向。', '自信の強さを、理解の正確さの証拠として扱わない理由になる。'],
    ['知的謙虚さ', 'ちてきけんきょさ', 'intellectual humility', '自分の認知的な限界を適切に把握し、証拠に応じて信念を修正できる力。', '自信の低さではなく、確信度を校正し続ける実践的な能力である。']
  ];

  const questions = [
    ['最近「わかった」と感じたことのうち、実際に説明しようとすると怪しくなるものはあるか。', '声に出して説明し、詰まる箇所を確認する。'],
    ['曖昧なままにしておくことと、判断を放棄することは、どこで線引きできるか。', '最近、早く結論を出したくなった場面を思い出す。'],
    ['同じ出来事について、自分と違う意味づけをしている人がいたら、その違いはどんな前提から来ているか。', '意見が対立した場面で、互いが依拠している「枠組み」を言葉にしてみる。'],
    ['AIの回答を受け取った後、どんな問いを重ねれば「考えの始まり」に変えられるか。', '直近でAIに聞いた答えを一つ選び、根拠・反証例・一次資料を確認してみる。']
  ];

  const references = [
    ['説明深度の錯覚', 'https://doi.org/10.1207/s15516709cog2605_1'],
    ['トーマス・クーンとパラダイム', 'https://plato.stanford.edu/entries/thomas-kuhn/'],
    ['知的謙虚さと認識的徳', 'https://plato.stanford.edu/entries/epistemology-virtue/'],
    ['ハンナ・アーレント', 'https://plato.stanford.edu/entries/arendt/'],
    ['認知的閉鎖欲求のレビュー', 'https://www.tandfonline.com/doi/abs/10.1080/14792779643000100']
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
    return '<div class="doc-footer">ハルとおじいさん｜第15部 それ、わかったつもりかも　― ' + label + ' ―</div>';
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
      (chapterIndex < chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(chapters[chapterIndex + 1].question) + '</div></div>' : '<div class="pull-quote">「わかったつもりを手放すことから、本当の思考が始まる。」</div>') +
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
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf('第15部') >= 0;
  }) : [];
  const notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../note.html"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  const referencesHtml = references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>';
  }).join('');

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">青磁<small>せいじ</small></div>' +
      '<h1 class="cover-title">第15部<br>それ、わかったつもりかも</h1><div class="cover-subtitle">答えを急ぐ時代に、考え続ける物語</div>' +
      '<div class="cover-chapter">第1話〜第8話｜全3章</div><div class="cover-tagline"><em>「わかったつもりを手放すことから、本当の思考が始まる。」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">第15部の本文型補足資料</div><div class="cover-actions"><a class="cover-action" href="../podcast.html">Podcast一覧へ</a><a class="cover-action" href="../note.html">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part14.html">← 第14部</a><span>第15部 ｜ それ、わかったつもりかも</span><a href="part16.html">第16部 →</a></nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">なぜ「わかったつもり」を深掘りするのか</div>' +
      '<div class="section-intro">第13部で学びが環境の中で受け継がれ、閉ざされることを見た。第14部で見方の更新には道具・証拠・共同体が必要なことを見た。第15部では、その更新を妨げる「わかったつもり」という感覚そのものを問い直す。</div>' +
      '<div class="essay-box"><h3>確信の手前で立ち止まる</h3>' + detail.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') +
      '<p>目的は、確信を持つことそのものを否定することでも、あらゆる判断を保留にすることでもない。確信がどこから生まれ、何が更新を妨げるかを見極め、証拠に応じて考えを校正し続ける力を養うことである。</p></div>' +
      '<div class="argument-heading">第13部・第14部・第15部をつなぐ一本線</div><p class="argument-body">第13部で学びが環境の中で受け継がれ、閉ざされることを見た。第14部で見方の更新には道具・証拠・共同体が必要なことを見た。第15部では、その更新を妨げる「わかったつもり」という感覚そのものを問い直す。</p>' +
      '<div class="central-question"><div class="cq-label">第15部の中心的問い</div><div class="cq-text">「わかった」と「考えた」は同じなのか。<br>わからなさを抱えたまま、考え続けられるか。</div><div class="cq-sub">確信と証拠の強さを、区別して考える。</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">確信と知的謙虚さをめぐる思想の歩み</div>' +
      '<div class="section-intro">確信と知的謙虚さは、古代哲学、進化論、政治哲学、認知心理学、そして生成AIへと、異なる領域から問い直されてきた。主要な転換点を一本の流れとして整理する。</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">FROM SOCRATES TO AI VERIFICATION</div><div class="chapter-name">確信と謙虚さを、どう説明してきたか</div><div class="chapter-lead">哲学、進化論、政治思想、認知科学。説明の焦点は広がり続けている。</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer('知的謙虚さの系譜') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">核心論考 ── 考え続けるという「校正」</div><div class="section-intro">8つのテーマを束ねると、第15部は思考を「正解にたどり着く作業」から「確信を証拠に合わせて校正し続ける実践」へ読み替える章になる。</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第15部の位置づけ</div><p>第15部は、迷いや曖昧さを弱さとして描かない。AIが流暢な答えを即座に返す時代ほど、確信と証拠の強さを取り違えやすい。考え続ける力とは、答えを持たないことではなく、証拠に応じて確信を更新し続けられることである。</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第15部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Bridge to Part 16</div><div class="bridge-text">わかったつもりを手放した先に、人類が更新し続けてきたもう一つの力がある。</div><div class="bridge-sub">第16部「エネルギーと人類史」では、火から核融合まで、人類が何を解放してきたかを追う。</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">さらに読む・聴く</div><div class="section-intro">第15部のPodcast、関連note、本文の背景となる研究資料への入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="../podcast.html"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第15部の8話を音声でたどる。</div></a><a class="resource-card" href="../note.html"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a><a class="resource-card" href="part16.html"><div class="resource-label">NEXT JOURNEY</div><div class="resource-title">第16部へ</div><div class="resource-text">考え続ける力から、人類が解放してきた力へ進む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
