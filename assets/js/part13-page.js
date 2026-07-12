(function () {
  'use strict';

  const root = document.getElementById('part-series-root');
  if (!root) return;

  const detail = window.PartDepthData && window.PartDepthData[13];
  const mapData = window.ManabiMapData || {};
  const chapters = [
    {
      title: '文化を受け渡す、閉ざす',
      question: '人はなぜ学びを受け継ぎ、なぜ学びを閉じるのか。',
      intro: '第一章では、累積文化と学習の閉鎖をつなぎ、人が知を受け渡す条件と、受け取りをやめる条件を対照させる。',
      episodes: [
        ['人間を人間にしたもの', '累積文化・ラチェット効果', '人間の文化は、なぜ失われずに積み重なるのか。'],
        ['なぜ人は学びを閉じてしまうのか', '学習性無力感・所属感の脅威', '学びを閉じることは、どんな環境で合理的になるのか。']
      ]
    },
    {
      title: '学びを支える環境',
      question: '学校と家庭は、学びの何を支えているのか。',
      intro: '第二章では、学校の隠れたカリキュラムと家庭の安全基地を、学ぶ主体を支える環境設計として読む。',
      episodes: [
        ['学校は何を学ばせているのか', '隠れたカリキュラム・評価', '学校は、教科以外に何を教えているのか。'],
        ['家庭は何を学ばせているのか', '安全基地・自律支援', '家庭は、世界への向き合い方をどう形作るのか。']
      ]
    }
  ];

  const timeline = [
    ['1967年', 'セリグマンとマイヤーの学習性無力感', '逃れられない不快な刺激を経験すると、後に逃げられる状況でも行動をやめてしまうことを実験的に示した。第2話「なぜ人は学びを閉じてしまうのか」の理論的な出発点である。', ['学習性無力感']],
    ['1968年', 'ジャクソン『教室の生活』', '時間割・評価・座席配置など、教科内容以外に学校が教える暗黙の規範を「隠れたカリキュラム」と名づけた。第3話「学校は何を学ばせているのか」が正面から扱う概念である。', ['隠れたカリキュラム']],
    ['1979年', 'ブロンフェンブレンナーの生態学的システム理論', '子どもの発達を、家庭・学校・地域・社会制度という入れ子状の環境の相互作用として捉える枠組みを提唱した。学校と家庭を同じ地図に置く、第13部全体の視点の土台である。', ['生態学的システム理論']],
    ['1999年', 'トマセロ『人間思考の文化的起源』', '模倣・教示・言語を通じて改良が失われずに積み重なる「累積文化のラチェット効果」を提唱した。第1話「人間を人間にしたもの」の中心的な理論である。', ['累積文化', 'ラチェット効果']],
    ['2004年', 'ハーバード大学「関係の環境で育つ子ども」報告書', '安定した応答的な関係が、脳の発達と学習の土台になることを研究成果として整理した。第4話「家庭は何を学ばせているのか」の理論的な裏づけになっている。', ['安全基地', '応答的関係']],
    ['2006年', 'ドゥエックの成長マインドセット', '能力を固定的な資質と見るか、努力で伸ばせる資質と見るかで、失敗への向き合い方が変わることを提唱した。第2話が扱う「学びを閉じる/開く」を考える鍵になる。', ['成長マインドセット']],
    ['2020年代', 'AI時代の学び直しと教育格差', 'AIによる個別最適化学習が広がる一方、家庭環境や学校資源の違いが学びへのアクセスに与える影響が改めて注目されている。', [['教育格差とAI', 'green']]]
  ];

  const coreArguments = [
    ['I. 学びは「個人の頭の中」だけでなく、「世代を超えた受け渡し」の中にある', [
      '人間の文化は一人の発明で完結しない。模倣、教示、言語を通じて改良が失われずに積み重なる累積文化が、他の動物には見られない規模で人間を人間にしてきた。',
      'だから学びを「知識の所有」として個人に閉じ込めると、この受け渡しの構造を見落とす。学ぶとは、長い共同作業へ参加し、次へ渡すことでもある。'
    ]],
    ['II. 学びを閉じることは、個人の弱さではなく、環境が生む合理的な反応である', [
      '失敗が能力の証拠として扱われ、所属感が脅かされる環境では、挑戦を避け、学びを閉じることが合理的になる。学校の隠れたカリキュラムも、家庭の安全基地も、この環境の一部である。',
      '学びを開き直す鍵は、個人の意志力を鍛えることだけではない。誤りの後に再挑戦できる環境、頼れる関係、透明な評価基準を、学校と家庭の両方で設計し直すことにある。'
    ]]
  ];

  const glossary = [
    ['累積文化', 'るいせきぶんか', 'cumulative culture', '模倣・教示・言語を通じて、一人の発明が失われずに世代を超えて積み重なる文化のあり方。', '人間の文化を、他の動物の社会学習と分ける規模・忠実度・制度化の鍵になる。'],
    ['ラチェット効果', 'ラチェットこうか', 'ratchet effect', '一度達成された知識や技術が逆戻りせず、次の世代の出発点として保持される仕組み。', '累積文化がなぜ「積み上がる」のかを説明する比喩である。'],
    ['学習性無力感', 'がくしゅうせいむりょくかん', 'learned helplessness', '逃れられない経験を重ねることで、状況が変わっても行動をやめてしまう心理状態。', '学びを閉じる背景にある、環境が作る反応として理解する。'],
    ['隠れたカリキュラム', 'かくれたカリキュラム', 'hidden curriculum', '教科内容以外に、学校生活を通じて暗黙に教えられる規範や振る舞い。', '学校が何を評価し、誰の声を聞くかという前提を可視化する。'],
    ['成長マインドセット', 'せいちょうマインドセット', 'growth mindset', '能力を固定的な資質ではなく、努力や方略で伸ばせるものと捉える考え方。', '失敗への向き合い方や、再挑戦のしやすさに影響する。'],
    ['生態学的システム理論', 'せいたいがくてきシステムりろん', 'ecological systems theory', '子どもの発達を、家庭・学校・地域・社会制度という入れ子状の環境の相互作用として捉える枠組み。', '学校と家庭を対立させず、同じ地図に置いて考える視点を与える。'],
    ['安全基地', 'あんぜんきち', 'secure base', '戻れば安心できる、頼れる相手や場所。探索や挑戦を可能にする心理的な土台。', '家庭が学びに与える最も基本的な支援の形である。']
  ];

  const questions = [
    ['自分がこれまで受け取ってきた知識や技術の中で、誰かから受け継ぎ、次へ渡そうとしているものは何か。', '学校や家庭の外で身につけた技術や習慣を一つ思い出してみる。'],
    ['学びを閉じたくなった経験があるとすれば、それはどんな環境や関係の中で起きたか。', '失敗した後、挑戦をやめたくなった場面を具体的に振り返る。'],
    ['自分が通った学校は、教科以外に何を「良いこと」として教えていたか。', '評価された行動と、評価されなかった行動を比べてみる。'],
    ['家庭が「安全基地」として機能するために、家庭以外にどんな支えが必要か。', '学校、地域、支援者など、家庭を補う関係を具体的に挙げる。']
  ];

  const references = [
    ['学習性無力感（Seligman & Maier, 1967）', 'https://en.wikipedia.org/wiki/Learned_helplessness'],
    ['隠れたカリキュラム（Jackson, 1968）', 'https://en.wikipedia.org/wiki/The_Hidden_Curriculum'],
    ['累積文化とラチェット効果（Tomasello, 1999）', 'https://www.cognitionandculture.net/wp-content/uploads/Tomasello1999.pdf'],
    ['関係の環境で育つ子ども', 'https://developingchild.harvard.edu/wp-content/uploads/2004/04/Young-Children-Develop-in-an-Environment-of-Relationships.pdf'],
    ['サーブとリターン', 'https://developingchild.harvard.edu/key-concept/serve-and-return/']
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
    return '<div class="doc-footer">ハルとおじいさん｜第13部 学びとは何か　― ' + label + ' ―</div>';
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
    const modifier = chapterIndex === 1 ? ' chapter-card--final' : '';
    return '<div class="page"><div class="section-label">Chapter ' + String(chapterIndex + 1).padStart(2, '0') + '</div>' +
      '<div class="section-title">' + esc(chapter.title) + '</div><div class="section-intro">' + esc(chapter.intro) + '</div>' +
      '<div class="chapter-card' + modifier + '"><div class="chapter-card__head"><div class="chapter-kicker">THEMES ' + String(start).padStart(2, '0') + ' - ' + String(end).padStart(2, '0') + '</div>' +
      '<div class="chapter-name">' + esc(chapter.title) + '</div><div class="chapter-lead">' + esc(chapter.question) + '</div></div><div class="episode-list">' + rows + '</div></div>' +
      '<div class="argument-heading">第' + (chapterIndex + 1) + '章の結論</div><p class="argument-body">' + esc(detail.chapters[chapterIndex]) + '</p>' +
      (chapterIndex < chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(chapters[chapterIndex + 1].question) + '</div></div>' : '<div class="pull-quote">「学びは、受け取り、確かめ、次へ渡す共同作業である。」</div>') +
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
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf('第13部') >= 0;
  }) : [];
  const notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../note.html"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  const referencesHtml = references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>';
  }).join('');

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">苔<small>こけ</small></div>' +
      '<h1 class="cover-title">第13部<br>学びとは何か</h1><div class="cover-subtitle">人間・学校・家庭をつなぐ学びの地図</div>' +
      '<div class="cover-chapter">第1話〜第4話｜全2章</div><div class="cover-tagline"><em>「学びは、受け取り、確かめ、次へ渡す共同作業である。」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">第13部の本文型補足資料</div><div class="cover-actions"><a class="cover-action" href="../podcast.html">Podcast一覧へ</a><a class="cover-action" href="../note.html">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part12.html">← 第12部</a><span>第13部 ｜ 学びとは何か</span><a href="part14.html">第14部 →</a></nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">なぜ学びの受け渡しと環境を深掘りするのか</div>' +
      '<div class="section-intro"><a href="part11.html">第11部</a>で学びの原型が応答という関係から始まることを、<a href="part12.html">第12部</a>でその関係が対話としてどう学びを深めるかを見た。第13部では、その学びが個人を超えて、世代・学校・家庭という環境の中でどう受け継がれ、どう閉ざされるかを問う。</div>' +
      '<div class="essay-box"><h3>受け渡される学び</h3>' + detail.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') +
      '<p>目的は、学校や家庭のどちらが正しいかを裁くことでも、閉じた学びを個人の弱さとして責めることでもない。学びが受け継がれる条件と、閉じる条件を、環境の側から見極めることである。</p></div>' +
      '<div class="argument-heading"><a href="part11.html">第11部</a>・<a href="part12.html">第12部</a>・第13部をつなぐ一本線</div><p class="argument-body"><a href="part11.html">第11部</a>で、学びの原型は応答という関係から始まることを見た。<a href="part12.html">第12部</a>で、その関係が対話としてどう学びを深めるかを見た。第13部では、その学びが個人を超えて、世代・学校・家庭という環境の中でどう受け継がれ、どう閉ざされるかを問う。</p>' +
      '<div class="central-question"><div class="cq-label">第13部の中心的問い</div><div class="cq-text">人はなぜ学び、なぜ学びを閉じるのか。<br>それを、もう一度開く力はどこにあるのか。</div><div class="cq-sub">個人の意志力だけでなく、学びを支える環境を見る。</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">累積文化と教育環境をめぐる研究の歩み</div>' +
      '<div class="section-intro">学びの受け渡しと環境は、動物行動学、社会心理学、発達生態学、そして教育政策へと、異なる領域から問い直されてきた。主要な転換点を一本の流れとして整理する。</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">FROM CUMULATIVE CULTURE TO EDUCATION POLICY</div><div class="chapter-name">受け渡しと環境を、どう説明してきたか</div><div class="chapter-lead">動物行動学、心理学、教育実践。説明の焦点は広がり続けている。</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer('学びの受け渡しの系譜') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">核心論考 ── 学びという「受け渡し」</div><div class="section-intro">4つのテーマを束ねると、第13部は学びを「個人の達成」から「世代と環境を通じた受け渡し」へ読み替える章になる。</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第13部の位置づけ</div><p>第13部は、学びを閉じることを個人の甘えとして裁かない。累積文化を運ぶのも、学びを閉じさせるのも、同じ環境の力である。学校と家庭を対立させず、どちらも学びを支える環境として設計し直せるかを問う。</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第13部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Bridge to Part 14</div><div class="bridge-text">学びを支える環境を見た後は、学び自体を支える「見方」を問い直す番である。</div><div class="bridge-sub"><a href="part14.html">第14部「地球は動いている」</a>では、天動説から地動説への転換を手がかりに、見方を更新する力を追う。</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">さらに読む・聴く</div><div class="section-intro">第13部のPodcast、関連note、本文の背景となる研究資料への入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="../podcast.html"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第13部の4話を音声でたどる。</div></a><a class="resource-card" href="../note.html"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a><a class="resource-card" href="part14.html"><div class="resource-label">NEXT JOURNEY</div><div class="resource-title">第14部へ</div><div class="resource-text">学びの環境から、見方を更新する力へ進む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
