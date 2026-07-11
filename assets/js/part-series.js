(function () {
  'use strict';

  const parts = {
    10: {
      title: '感性という深層', subtitle: '意味はどこから生まれるのか', color: '#c97391', deep: '#713147', pale: '#f8e9ee',
      core: '人間は、意味を感じることをやめない存在である。',
      intro: '脳の働きとしての感性、進化が育てた感性、そしてAI時代の感性へ。美しさや共感、物語、直感を通して、人間が「意味」を感じる仕組みをたどります。',
      question: '感性は再現可能なのか。それとも、関係の中でしか生まれないのか。',
      chapters: [
        ['感性の科学', '感性は脳の働きなのか？', [
          ['感動はどこで生まれるのか', '報酬系・ドーパミン・脳活動'], ['美しいとは何か', '対称性・リズム・脳のパターン処理'], ['共感の回路', 'ミラーニューロンと社会脳'], ['直感とは何か', '無意識処理と高速判断'], ['物語に引き込まれる理由', '脳のシミュレーション機能']]],
        ['感性の進化', '感性は生き残るための機能だったのか？', [
          ['なぜ美を感じるのか', '進化心理学・性的選択・信号理論'], ['芸術は役に立つのか', '洞窟壁画・集団結束・物語'], ['共感はなぜ必要だったか', '協力と信頼の進化'], ['意味を求める動物', 'パターン検出・宗教と神話の起源'], ['感性は副産物か適応か', 'スパンドレル理論・進化の偶然性']]],
        ['感性と未来', '意味は、作品にあるのか、体験にあるのか？', [
          ['生成芸術は美しいか', 'AIアート・作者性と意味'], ['AIは共感できるか', '共感に見える応答・体験の不在'], ['意味はどこに宿るか', '作品・体験・関係性'], ['教育と感性', '点数化できない価値'], ['感性は再現できるのか', '統計で再現される感動と人間']]]
      ]
    },
    11: {
      title: '人はどう学び始めるのか', subtitle: '学びの原型をめぐる旅', color: '#d06f6f', deep: '#743737', pale: '#faeaea',
      core: '人は、教わる前から学んでいる。',
      intro: '泣くこと、安心すること、まねること、指差すこと、遊ぶこと。乳幼児期から幼児期までの発達をたどり、AIが模倣しきれない「学びの原型」を探します。',
      question: '学びの原型は、どこにあるのか。人は年齢ごとに、何を失い、何を獲得するのか。',
      chapters: [
        ['世界を知り始める', '学びは、教わる前から始まっているのか？', [
          ['人はなぜ泣くことから人生を始めるのか', '泣き・応答・最初の信頼'], ['安心は最初の学びである', '安全基地と探索'], ['愛着形成とは何か', '内的作業モデルと信頼'], ['まねる力が人間を人間にした', '模倣と文化伝達'], ['指差しはなぜすごいのか', '共同注意と言語の前夜']]],
        ['自分が生まれる', '「自分」は、いつ、どう立ち上がるのか？', [
          ['赤ちゃんはいつから自分と他人を分けるのか', '鏡像認知と自己の発見'], ['言葉を話す前に、子どもは何を考えているのか', '前言語的思考・身体で考える'], ['赤ちゃんの脳はなぜこんなに可塑的なのか', 'シナプス過形成・刈り込み・臨界期'], ['抱っこは甘やかしなのか、発達の栄養なのか', '身体接触とオキシトシン'], ['遊びは学びの原型である', '自発性と試行錯誤']]],
        ['想像力と自我の爆発', 'なぜ「なぜ？」と「イヤ！」は同時に来るのか？', [
          ['イヤイヤ期は反抗ではなく自立の始まり', '自己主張と自律性'], ['ごっこ遊びが育てる想像力と社会性', '象徴機能と役割交換'], ['幼児期の「なぜ？」は探究心の原点', '質問の爆発と因果への渇望'], ['我慢する力はどう育つのか', '実行機能と自己調整'], ['「できた！」が自己効力感をつくる', '過程と学び続ける動機']]]
      ]
    },
    12: {
      title: '人はなぜ、一人では学べないのか', subtitle: '対話・評価・関係の学習心理学', color: '#c88855', deep: '#73461f', pale: '#faefe4',
      core: '人は一人では届かない場所に、誰かと話すことで届く。',
      intro: '説明、問い返し、失敗、評価、沈黙。学習心理学の知見から、誰かと学ぶことの意味と、AIとの対話が学びにもたらす可能性を見つめます。',
      question: 'AIが答えを出す時代に、「対話で学ぶ」ことの意味はどう変わるのか。',
      chapters: [
        ['教えることが最高の学習だ', 'なぜ説明しようとすると、自分の理解が深まるのか？', [
          ['なぜ人は「わかったつもり」になるのか', '知識の呪い・流暢性の錯覚'], ['「教えることが最高の学習法」は本当か', 'プロテジェ効果'], ['対話は学びをなぜ深めるのか', 'ヴィゴツキー・最近接発達領域'], ['誰かに説明しようとすると理解はなぜ変わるのか', '精緻化・自己説明効果'], ['問い返してくれる人がいると、学びはどう変わるのか', 'ソクラテス式問答・足場かけ']]],
        ['間違い・フィードバック・評価', '評価は学びを助けるのか、傷つけるのか？', [
          ['テストは評価ではなく学習である', 'テスト効果・検索練習'], ['間違えることはなぜ学びを深めるのか', '望ましい困難'], ['フィードバックはいつ・どう与えると学びになるのか', '即時と遅延・プロセス評価'], ['比較されると学習意欲はどう変わるのか', '社会的比較理論'], ['不安は学びを助けるか、邪魔するか', '覚醒水準とテスト不安']]],
        ['AIと対話する時代の学習', 'AIとの対話は、人間との対話と何が違うのか？', [
          ['AIとの対話と、人間との対話は何が違うのか', '応答と理解・関係性'], ['答えを「聞く」と考えを「引き出す」は何が違うのか', '足場と内部化・認知オフロード'], ['学習における「沈黙・待つ」の意味', 'ウェイトタイム・思考の余白'], ['メタ認知とは何か', '自分との対話'], ['学び方を学ぶ時代へ', '自己調整学習']]]
      ]
    },
    13: {
      title: '学びとは何か', subtitle: '人間・学校・家庭をつなぐ学びの地図', color: '#9c9250', deep: '#56501f', pale: '#f3f0de',
      core: '学びは、世界にもう一度向かう力を取り戻すことである。',
      intro: '人類を育てた累積文化から、失敗と評価、学校の隠れたカリキュラム、家庭という安全基地まで。「知識の習得」を越えて、学びそのものを問い直します。',
      question: '人はなぜ学び、なぜ学びを閉じ、どうすればもう一度開くことができるのか。',
      chapters: [
        ['学びを受け渡す', '学びは、どこから始まり、どこへ渡されるのか？', [
          ['人間を人間にしたもの', '累積文化・進化・学びのリレー'], ['なぜ人は学びを閉じてしまうのか', '失敗・評価・固定マインドセット']]],
        ['学びを育てる場所', '私たちは、言葉にされない何を学んでいるのか？', [
          ['学校は何を学ばせているのか', '隠れたカリキュラム・所属感・主体性'], ['家庭は何を学ばせているのか', '安全基地・自律性・愛着']]]
      ]
    },
    14: {
      title: '地球は動いている', subtitle: '見方を更新する力', color: '#6f9b73', deep: '#315b39', pale: '#e6f0e7',
      core: '科学とは正解を知ることではなく、見方を更新する営みである。',
      intro: 'アリストテレスからコペルニクス、ガリレオ、ケプラー、ニュートンへ。地動説の歴史を、観察・証拠・前提を更新する学びの物語として読み直します。',
      question: '自分が当たり前だと思っている「天動説」は、どこにあるだろう。',
      chapters: [
        ['世界の中心をずらす', '見える通りの世界を、どう問い直すのか？', [
          ['人はなぜ自分のいる場所を世界の中心だと思うのか', '自己中心性・天動説の起源'], ['道具が認識を変える', '望遠鏡・観察・認識の拡張'], ['美しさより、事実に合わせる勇気', 'ケプラー・楕円軌道・科学の作法']]],
        ['見方を更新する', '新しい知は、なぜ最初に危険だと言われるのか？', [
          ['新しい知は、なぜ最初に危険だと言われるのか', 'ガリレオ・世界観が揺らぐ恐れ'], ['自分の中の天動説を探す', '前提・学び直し・AI時代の認識']]]
      ]
    },
    15: {
      title: 'それ、わかったつもりかも', subtitle: '答えを急ぐ時代に、考え続ける物語', color: '#5f9290', deep: '#285451', pale: '#e3efee',
      core: 'わからなさは、深く考えるための入口である。',
      intro: '「なるほど」と安心した瞬間、考えることは止まっていないか。ソクラテス、ダーウィン、アーレント、クーンらと、迷いの中に居続ける知性を考えます。',
      question: '「わかった」と「考えた」は、同じことだろうか。',
      chapters: [
        ['「わかった」の罠', '「なるほど」と感じた瞬間、本当に考えたのか？', [
          ['知っているつもりが、一番危ない', 'ソクラテス・無知の知・メタ認知'], ['白黒にすると、ちょっと楽になる', '曖昧さへの不耐性・認知的閉鎖'], ['目で見ても、わからないことがある', 'ガリレオ・観察と確証バイアス']]],
        ['迷いの中に、居続ける', '答えが出ないとき、どうすればいいのか？', [
          ['迷いながら、でも正しかった', 'ダーウィン・問いを抱え続ける力'], ['考えをやめたとき、何かが壊れた', 'アーレント・思考停止'], ['同じ出来事が、全然違う意味に見える', 'クーン・パラダイム']]],
        ['考え続けること、その先へ', 'わからなさを抱えて、それでも進めるか？', [
          ['AIの答えを、考えの始まりにする', 'AI時代の思考・問いを立てる力'], ['わかったつもりを、手放す練習', '総括・問いを持ち続ける']]]
      ]
    },
    16: {
      title: 'エネルギーと人類史', subtitle: '人類は何を解放してきたのか', color: '#547fa6', deep: '#264b70', pale: '#e1ebf4',
      core: 'エネルギーを獲得するたびに、人類は新しい自由を手に入れてきた。',
      intro: '火、風と水、石炭、電気、原子力、太陽光、そして核融合。発明の歴史ではなく、人類が何から自由になり、どんな限界に出会ったかをたどります。',
      question: '太陽を借り、太陽に還り、太陽を作ろうとする人類は、次に何から自由になるのか。',
      chapters: [
        ['地上の火', '人類は何から自由になり、何を手に入れたのか？', [
          ['夜を、手に入れた', '火・時間・寒さと捕食者からの解放'], ['自分以外を、働かせる', '風・水・潮・筋力からの解放']]],
        ['産業と電気', 'エネルギーの量と自由度が変わるとき、何が起きるのか？', [
          ['過去の太陽を、燃やす', '石炭・蒸気・自然条件からの解放'], ['どこへでも、届けられる', '電気・送電・変換と制御']]],
        ['太陽の未来', '一周した歴史の先に、何が残っているのか？', [
          ['太陽を、借りない力', '核エネルギーとエネルギー密度'], ['太陽に、還る', '太陽電池・再生可能エネルギー'], ['次に自由になるのは、何か', 'カルダシェフ・スケールと未来'], ['太陽を、地球に作る', '核融合・ITER・NIF・KSTAR']]]
      ]
    }
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; });
  }

  const identities = {
    10: ['撫子', 'なでしこ', '#dda2b6', 'rgba(110, 45, 70, .94)', 'rgba(72, 55, 92, .92)'],
    11: ['珊瑚', 'さんご', '#e2aa96', 'rgba(116, 55, 55, .94)', 'rgba(95, 62, 44, .92)'],
    12: ['琥珀', 'こはく', '#e1b16e', 'rgba(112, 67, 31, .94)', 'rgba(86, 65, 35, .92)'],
    13: ['苔', 'こけ', '#c4bc77', 'rgba(78, 75, 31, .94)', 'rgba(49, 76, 56, .92)'],
    14: ['若竹', 'わかたけ', '#9dc89f', 'rgba(42, 83, 51, .94)', 'rgba(37, 68, 82, .92)'],
    15: ['青磁', 'せいじ', '#96c7c2', 'rgba(36, 79, 77, .94)', 'rgba(49, 60, 86, .92)'],
    16: ['瑠璃', 'るり', '#91b6d8', 'rgba(34, 70, 106, .94)', 'rgba(51, 51, 91, .92)']
  };

  const root = document.getElementById('part-series-root');
  const number = Number(document.body.dataset.part);
  const part = parts[number];
  if (!root || !part) return;
  const depthPart = window.PartDepthData && window.PartDepthData[number];

  const identity = identities[number];
  const mapData = window.ManabiMapData || {};
  const publishedNotes = Array.isArray(mapData.notes) ? mapData.notes.filter(function (note) {
    const directRelation = Array.isArray(note.relatedParts) && note.relatedParts.indexOf('part' + number) >= 0;
    const targetRelation = typeof note.target === 'string' && note.target.indexOf('第' + number + '部') >= 0;
    return note.url && note.status === 'published' && (directRelation || targetRelation);
  }) : [];
  const totalEpisodes = part.chapters.reduce(function (sum, chapter) { return sum + chapter[2].length; }, 0);
  const chapterLabel = part.chapters.length === 3 ? '全3章' : '全' + part.chapters.length + '章';
  const prev = number - 1;
  const next = number + 1;

  document.documentElement.style.setProperty('--gold', part.color);
  document.documentElement.style.setProperty('--gold-dark', part.deep);
  document.documentElement.style.setProperty('--line', part.pale);
  document.documentElement.style.setProperty('--accent-soft', identity[2]);
  document.documentElement.style.setProperty('--accent-deep', part.deep);
  document.documentElement.style.setProperty('--accent-alt', identity[4]);
  document.documentElement.style.setProperty('--cover-mid', identity[3]);
  document.documentElement.style.setProperty('--cover-end', identity[4]);
  document.title = 'ハルとおじいさん｜第' + number + '部 ' + part.title + ' 学びの地図';

  function footer(label) {
    return '<div class="doc-footer">ハルとおじいさん｜第' + number + '部 ' + esc(part.title) + '　― ' + label + ' ―</div>';
  }

  function episodeQuestion(title) {
    if (/なぜ|何|いつ|どこ|どう|できる|か$/.test(title)) return '問：' + title.replace(/[。？?]$/, '') + '。';
    return '問：' + title + 'を手がかりに、いまの自分の見方をどう更新できるだろう。';
  }

  function episodeSummary(title, concept) {
    return '「' + title + '」を入口に、' + concept + 'をたどる。知識を答えとして受け取るのではなく、人間の経験や日常の感覚と結び直して考える。';
  }

  function tags(concept) {
    return concept.split(/[・、]/).filter(Boolean).slice(0, 3).map(function (tag) {
      return '<span class="tag">' + esc(tag) + '</span>';
    }).join('');
  }

  function depthBlock(episodeNumber) {
    const detail = depthPart && depthPart.episodes && depthPart.episodes[episodeNumber];
    if (!detail) return '';
    return '<div class="episode-depth" aria-label="Podcastを越える深掘り">' +
      '<div class="depth-heading">Podcastを越えて</div>' +
      '<div class="depth-item"><div class="depth-label">背景としくみ</div><p>' + esc(detail.background) + '</p></div>' +
      '<div class="depth-item"><div class="depth-label">もう一段深く</div><p>' + esc(detail.lens) + '</p></div>' +
      '<div class="depth-item depth-item--caution"><div class="depth-label">単純化しないために</div><p>' + esc(detail.caution) + '</p></div>' +
      '</div>';
  }

  let episodeNo = 0;
  const chapterPages = part.chapters.map(function (chapter, chapterIndex) {
    const start = episodeNo + 1;
    const rows = chapter[2].map(function (episode) {
      episodeNo += 1;
      return '<div class="episode-row"><div class="episode-no">Episode ' + String(episodeNo).padStart(2, '0') + '</div><div>' +
        '<div class="episode-title">' + esc(episode[0]) + '</div>' +
        '<div class="episode-summary">' + esc(episodeSummary(episode[0], episode[1])) + '</div>' +
        '<div class="episode-question">' + esc(episodeQuestion(episode[0])) + '</div>' +
        '<div class="tags">' + tags(episode[1]) + '</div>' + depthBlock(episodeNo) + '</div></div>';
    }).join('');
    const end = episodeNo;
    const modifier = chapterIndex === 1 ? ' chapter-card--middle' : (chapterIndex === 2 ? ' chapter-card--final' : '');
    return '<div class="page"><div class="section-label">Chapter ' + String(chapterIndex + 1).padStart(2, '0') + '</div>' +
      '<div class="section-title">' + esc(chapter[0]) + '</div>' +
      '<div class="section-intro">第' + start + '話から第' + end + '話までを通して、「' + esc(chapter[1]) + '」という問いをたどります。各話の知識を、ひとつの流れとして読み直します。</div>' +
      (depthPart && depthPart.chapters && depthPart.chapters[chapterIndex] ? '<div class="chapter-depth-note"><span>章の見取り図</span>' + esc(depthPart.chapters[chapterIndex]) + '</div>' : '') +
      '<div class="chapter-card' + modifier + '"><div class="chapter-card__head"><div class="chapter-kicker">EPISODES ' + String(start).padStart(2, '0') + ' - ' + String(end).padStart(2, '0') + '</div>' +
      '<div class="chapter-name">' + esc(chapter[0]) + '</div><div class="chapter-lead">' + esc(chapter[1]) + '</div></div><div class="episode-list">' + rows + '</div></div>' +
      '<div class="argument-heading">第' + (chapterIndex + 1) + '章のまとめ</div><p class="argument-body">' + esc(chapter[0]) + 'で扱ったのは、' + esc(chapter[1]) + 'という問いです。個々の知識を切り離さず、自分の経験と次の章へつながる見方として持ち帰ります。</p>' +
      (chapterIndex < part.chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">問いは、次の章へ続いていく。</div><div class="bridge-sub">' + esc(part.chapters[chapterIndex + 1][1]) + '</div></div>' : '<div class="pull-quote">「' + esc(part.core) + '」</div>') + footer('第' + (chapterIndex + 1) + '章') + '</div>';
  }).join('');

  const axisCards = part.chapters.map(function (chapter, index) {
    return '<div class="axis-card"><h3>' + (index + 1) + '. ' + esc(chapter[0]) + '</h3><p>' + esc(chapter[1]) + '。この問いを、全' + chapter[2].length + '話の異なる角度から捉える。</p></div>';
  }).join('');

  const summaryRows = part.chapters.map(function (chapter, index) {
    return '<tr><td>第' + (index + 1) + '章</td><td>' + esc(chapter[0]) + '</td><td>' + esc(chapter[1]) + '</td></tr>';
  }).join('');

  const concepts = [];
  part.chapters.forEach(function (chapter) {
    chapter[2].forEach(function (episode) {
      episode[1].split(/[・、]/).forEach(function (term) {
        if (term && concepts.indexOf(term) < 0) concepts.push(term);
      });
    });
  });
  const glossary = concepts.slice(0, 5).map(function (term) {
    return '<div class="glossary-item"><div class="glossary-term">' + esc(term) + '</div><div class="glossary-def">第' + number + '部の物語を読み解くための重要語。単独の定義で終わらせず、各話の経験・問い・関係の中で意味を捉える。</div></div>';
  }).join('');

  const discussionItems = [part.question].concat(part.chapters.map(function (chapter) { return chapter[1]; })).slice(0, 4).map(function (question, index) {
    return '<div class="d-item"><div class="d-num">' + (index + 1) + '</div><div><div class="d-text">' + esc(question) + '</div><div class="d-hint">自分の経験、身近な場面、AI時代とのつながりから考えてみる。</div></div></div>';
  }).join('');

  const nextLink = next <= 16
    ? '<a class="resource-card" href="part' + next + '.html"><div class="resource-label">NEXT JOURNEY</div><div class="resource-title">第' + next + '部へ</div><div class="resource-text">次の問いへ、学びの地図をつなぐ。</div></a>'
    : '<a class="resource-card" href="../index.html"><div class="resource-label">MANABI MAP</div><div class="resource-title">全体地図へ</div><div class="resource-text">第1部から第16部までを見渡す。</div></a>';

  const noteLinks = publishedNotes.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + publishedNotes.slice(0, 8).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../note.html"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div>' +
      '<div class="cover-colorname">' + identity[0] + '<small>' + identity[1] + '</small></div>' +
      '<h1 class="cover-title">第' + number + '部<br>' + esc(part.title) + '</h1>' +
      '<div class="cover-subtitle">' + esc(part.subtitle) + '</div>' +
      '<div class="cover-chapter">第1話〜第' + totalEpisodes + '話｜' + chapterLabel + '</div>' +
      '<div class="cover-tagline">' + esc(part.intro) + '<br><em>' + esc(part.core) + '</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">本ページは第' + number + '部の本文型まとめです。</div>' +
      '<div class="cover-actions"><a class="cover-action" href="../podcast.html">Podcast一覧へ</a><a class="cover-action" href="../note.html">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part' + prev + '.html">← 第' + prev + '部</a><span>第' + number + '部 ' + esc(part.title) + '</span>' +
      (next <= 16 ? '<a href="part' + next + '.html">第' + next + '部 →</a>' : '<a href="../index.html">全体地図 →</a>') + '</nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">この部で問われていること</div>' +
      '<div class="section-intro">' + esc(part.intro) + '</div><div class="essay-box"><h3>なぜ「' + esc(part.title) + '」を読む必要があるのか</h3>' +
      (depthPart && depthPart.overview ? depthPart.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') : '<p>' + esc(part.core) + '</p>') +
      '<p>第' + number + '部では、全' + totalEpisodes + '話を' + chapterLabel + 'に分け、知識の羅列ではなく、問いが深まっていく道筋として整理します。</p></div>' +
      '<div class="central-question"><div class="cq-label">Central Question</div><div class="cq-text">' + esc(part.question) + '</div><div class="cq-sub">答えを急がず、各章を通って自分の見方がどう変わるかを確かめる。</div></div>' + footer('導入') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">第' + number + '部の核心論考</div>' +
      '<div class="section-intro">全' + totalEpisodes + '話を一つの流れとして読むと、この部の構造は次の軸で整理できます。</div><div class="axis-grid">' + axisCards + '</div>' +
      '<div class="argument-heading">第' + number + '部を一文でまとめるなら</div><p class="argument-body">' + esc(part.core) + '</p>' +
      '<table class="summary-table"><thead><tr><th>章</th><th>主題</th><th>中心の問い</th></tr></thead><tbody>' + summaryRows + '</tbody></table>' +
      '<div class="argument-heading">用語解説</div>' + glossary + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Questions</div><div class="section-title">問いの地図</div>' +
      '<div class="section-intro">知識を覚えるためだけではなく、自分の経験といまの社会を見直す問いとして読み返します。</div><div class="discussion-q">' + discussionItems + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Conclusion</div><div class="bridge-text">' + esc(part.core) + '</div><div class="bridge-sub">第' + number + '部の地図を持って、次の問いへ進む。</div></div><div class="resource-grid">' + nextLink + '</div>' + footer('問いの地図') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">さらに読む・聴く</div>' +
      '<div class="section-intro">第' + number + '部から、Podcast、note、学びの地図全体へつながる入口です。</div><div class="resource-grid">' +
      '<a class="resource-card" href="../podcast.html"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">「ハルとおじいさん」の音声コンテンツを開く。</div></a>' +
      '<a class="resource-card" href="../note.html"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">物語から伸びる枝道の記事を一覧で読む。</div></a>' +
      '<a class="resource-card" href="../index.html"><div class="resource-label">MANABI MAP</div><div class="resource-title">全体地図へ</div><div class="resource-text">第1部から第16部までを見渡す。</div></a></div>' + noteLinks +
      (depthPart && depthPart.references ? '<div class="argument-heading">深掘りの参考資料</div><p class="argument-body">Podcastとnoteの内容に加え、次の研究・公的資料をもとに背景、限界、反論を補いました。</p><div class="reference-list">' + depthPart.references.map(function (reference) { return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>'; }).join('') + '</div>' : '') +
      footer('関連資料') + '</div>';
})();
