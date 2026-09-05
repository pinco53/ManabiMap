(function () {
  'use strict';

  const root = document.getElementById('part-series-root');
  if (!root) return;

  const detail = window.PartDepthData && window.PartDepthData[14];
  const mapData = window.ManabiMapData || {};
  const chapters = [
    {
      title: '見える世界と道具',
      question: '見える世界は、道具が変わるとどう変わるのか。',
      intro: '第一章では、天動説、望遠鏡、楕円軌道を通して、見える世界・道具・理論の関係を追う。',
      episodes: [
        ['本当に動いているのは、どっち？', '天動説・プトレマイオス体系・観測', '感覚と理論が一致しないとき、何を信じればよいのか。'],
        ['望遠鏡は、人間に何を見せたのか', '望遠鏡・観測装置・信頼のネットワーク', '道具が示す像を、事実として受け入れるには何が必要か。'],
        ['美しい答えと、正しい答え', 'ケプラー・楕円軌道・残差', '小さなずれを、無視するか手がかりにするか。']
      ]
    },
    {
      title: '抵抗と革命',
      question: '新しい知は、なぜ最初に危険だと言われるのか。',
      intro: '第二章では、新しい知への抵抗と科学革命を、事実だけでなく権威・制度・心理の変化として整理する。',
      episodes: [
        ['それでも、地球は動いている', 'ガリレオ裁判・権威と証拠', '新しい知への反発は、何を守ろうとしているのか。'],
        ['見方を更新する力、それが学びである', 'ニュートン・万有引力・パラダイム', '世界観の更新は、古い知をすべて捨てることなのか。']
      ]
    }
  ];

  const timeline = [
    ['紀元2世紀', 'プトレマイオス『アルマゲスト』', '周転円を用いた精密な数学モデルで、惑星の逆行を含む位置を予測した。感覚に合う天動説が、なぜ千年以上支持されたかを示す、第1話「本当に動いているのは、どっち？」の出発点である。', ['天動説', '周転円']],
    ['1543年', 'コペルニクス『天体の回転について』', '太陽を中心に置く体系を提示したが、当初は大きな論争を呼ばなかった。地動説が徐々に広がる出発点になった。', ['地動説']],
    ['1609〜10年', 'ガリレオの望遠鏡観測', '月の凹凸、木星の衛星、金星の満ち欠けを観測し、「天は完全」という前提を崩した。第2話「望遠鏡は、人間に何を見せたのか」が扱う出来事である。', ['望遠鏡', '観測']],
    ['1609〜19年', 'ケプラーの惑星運動の法則', '火星の観測データのわずかなずれを捨てず、円軌道から楕円軌道へ理論を修正した。第3話「美しい答えと、正しい答え」の中心的な出来事である。', ['楕円軌道', 'ケプラーの法則']],
    ['1633年', 'ガリレオ裁判', '地動説を支持したガリレオが異端の疑いで裁かれ、自説の撤回を強いられた。新しい知への抵抗を考える、第4話「それでも、地球は動いている」の出来事である。', ['ガリレオ裁判', ['転換点', 'red']]],
    ['1687年', 'ニュートン『プリンキピア』', 'ケプラーの軌道法則と地上の落下運動を万有引力として統合し、天と地に同じ法則が働くことを示した。第5話「見方を更新する力、それが学びである」が扱う、世界観の更新である。', ['万有引力', '科学革命']],
    ['1962年', 'クーン『科学革命の構造』', '科学の進歩を、規範を共有する共同体の枠組み（パラダイム）が交代する過程として描いた。天動説から地動説への転換を理解する、後の枠組みになった。', ['パラダイム']],
    ['2020年代', 'AIによる観測データ解析', '望遠鏡やセンサーが集める膨大なデータを、AIが解析して新しい天体現象を発見する事例が広がっている。道具が見る力を変える歴史が、AI時代にも続いている。', [['AIと観測', 'green']]]
  ];

  const coreArguments = [
    ['I. 世界観の更新は、「新しい主張」だけでなく「道具・記録・共同体」がそろって起こる', [
      '地動説は、コペルニクスの主張だけで広まったのではない。望遠鏡という道具、観測記録の蓄積、ケプラーやニュートンの数学、そして仲間の科学者による再検証という条件がそろって、初めて世界観が更新された。',
      'だから「見方を変えよう」という個人の勇気だけでは、認識は広がらない。誰が再確認できるかという制度的な検証まで含めて、見方の更新は設計される。'
    ]],
    ['II. 新しい知への抵抗は、無知ではなく「何かを守ろうとする反応」である', [
      'ガリレオ裁判は科学対宗教という一語では説明できない。聖書解釈、教会政治、証拠の強さ、本人の論争姿勢が複雑に絡んでいた。新しい知は内容だけでなく、権威や秩序を揺らす。',
      '反発を無知と片づけず、何が失われると感じられているかを読むことで、新しい知が受け入れられる条件が見えてくる。それは科学史だけでなく、AI時代の新しい知にも当てはまる。'
    ]]
  ];

  const glossary = [
    ['天動説', 'てんどうせつ', 'geocentrism', '地球を宇宙の中心と見なし、太陽や星が地球の周りを回るとする体系。', '感覚に合い、精密な予測もできた体系として、単純に「誤り」で片づけない視点が要る。'],
    ['周転円', 'しゅうてんえん', 'epicycle', '惑星が描く円軌道の上に、さらに小さな円軌道を重ねて逆行を説明する天動説の数学的装置。', '誤った理論にも観測を整理する精密さがあったことを示す。'],
    ['地動説', 'ちどうせつ', 'heliocentrism', '太陽を中心に置き、地球を含む惑星がその周りを回るとする体系。', '提唱から広く受け入れられるまでに、道具と証拠の蓄積を要した。'],
    ['楕円軌道', 'だえんきどう', 'elliptical orbit', '惑星が完全な円ではなく、楕円を描いて公転するというケプラーの法則。', '小さな観測誤差を軽視しない態度から生まれた理論修正である。'],
    ['科学革命', 'かがくかくめい', 'scientific revolution', '観測・理論・共同体の評価基準が大きく組み替わり、世界の見方が更新される過程。', '気分で見方を変える比喩ではなく、証拠と共同検証に支えられた変化である。'],
    ['パラダイム', 'パラダイム', 'paradigm', '模範となる問題、測定装置、用語、良い説明の基準を共有する研究実践の枠組み。', '同じデータの意味が枠組みによって変わることを理解する鍵になる。'],
    ['望遠鏡', 'ぼうえんきょう', 'telescope', '遠くの天体を拡大して観測する光学装置。', '道具が示す像を事実として受け入れるには、原理・誤差・再観測の検証が必要である。']
  ];

  const questions = [
    ['「感覚に合う説明」と「証拠に合う説明」が食い違うとき、何を手がかりに判断すればよいか。', '天動説がなぜ千年以上支持されたかを、感覚・宗教・実用性の面から考える。'],
    ['新しい道具が示す像を、そのまま事実として受け入れてよい条件は何か。', 'AIが出す予測や画像を、望遠鏡の観測と同じように検証するとしたら何を確かめるか。'],
    ['小さなずれ（残差）を、無視してよいノイズと、理論を変える手がかりのどちらとして扱うべきか。', '自分の仕事や学びの中で、無視しがちな小さな違和感を思い出す。'],
    ['自分の中にある「天動説」、つまり検証せずに信じている前提は何か。', '疑ったことのない当たり前を一つ選び、それを支える証拠を書き出してみる。']
  ];

  const references = [
    ['科学革命の哲学', 'https://plato.stanford.edu/entries/scientific-revolutions/'],
    ['NASA：惑星運動と科学革命', 'https://science.nasa.gov/earth/earth-observatory/planetary-motion/'],
    ['NASA：軌道とケプラーの法則', 'https://science.nasa.gov/solar-system/orbits-and-keplers-laws/'],
    ['ガリレオ裁判の概要', 'https://en.wikipedia.org/wiki/Galileo_affair'],
    ['トーマス・クーンとパラダイム', 'https://plato.stanford.edu/entries/thomas-kuhn/']
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
    return '<div class="doc-footer">ハルとおじいさん｜第14部 地球は動いている　― ' + label + ' ―</div>';
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
      (chapterIndex < chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(chapters[chapterIndex + 1].question) + '</div></div>' : '<div class="pull-quote">「それでも、地球は動いている。」</div>') +
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
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf('第14部') >= 0;
  }) : [];
  const notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../note.html"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  const referencesHtml = references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>';
  }).join('');

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">若竹<small>わかたけ</small></div>' +
      '<h1 class="cover-title">第14部<br>地球は動いている</h1><div class="cover-subtitle">見方を更新する力</div>' +
      '<div class="cover-chapter">第1話〜第5話｜全2章</div><div class="cover-tagline"><em>「それでも、地球は動いている。」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">第14部の本文型補足資料</div><div class="cover-actions"><a class="cover-action" href="../podcast.html">Podcast一覧へ</a><a class="cover-action" href="../note.html">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part13.html">← 第13部</a><span>第14部 ｜ 地球は動いている</span><a href="part15.html">第15部 →</a></nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">なぜ地動説への転換を深掘りするのか</div>' +
      '<div class="section-intro"><a href="part12.html">第12部</a>で対話が学びを深めることを、<a href="part13.html">第13部</a>で学びが環境の中で受け継がれ、閉ざされることを見た。第14部では、学びの対象そのものへの見方が、どう更新されるかを問う。</div>' +
      '<div class="essay-box"><h3>見方が変わるということ</h3>' + detail.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') +
      '<p>目的は、天動説を笑い、地動説を称えることではない。何がそろえば見方が更新され、何が抵抗を生むかを、道具・証拠・共同体・権威の側から具体的に見ることである。</p></div>' +
      '<div class="argument-heading"><a href="part12.html">第12部</a>・<a href="part13.html">第13部</a>・第14部をつなぐ一本線</div><p class="argument-body"><a href="part12.html">第12部</a>で対話が学びを深めることを、<a href="part13.html">第13部</a>で学びが環境の中で受け継がれ、閉ざされることを見た。第14部では、学びの対象そのものへの見方が、どう更新されるかを問う。地動説への転換は、個人の学び直しにも重なる構造を持つ。</p>' +
      '<div class="central-question"><div class="cq-label">第14部の中心的問い</div><div class="cq-text">科学とは、正解を知ることなのか。<br>自分の中の「天動説」は何か。</div><div class="cq-sub">道具・証拠・共同体がそろって、見方は更新される。</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">天動説から地動説への転換をめぐる歩み</div>' +
      '<div class="section-intro">見方の更新は、古代天文学、観測装置、数学、そして共同体の評価基準へと、異なる領域が積み重なって起こってきた。主要な転換点を一本の流れとして整理する。</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">FROM PTOLEMY TO PARADIGM SHIFT</div><div class="chapter-name">見方の更新を、どう説明してきたか</div><div class="chapter-lead">観測、数学、権威、共同体。説明の焦点は広がり続けている。</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer('見方の更新の系譜') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">核心論考 ── 見方という「更新」</div><div class="section-intro">5つのテーマを束ねると、第14部は科学を「正解の集積」から「見方を更新し続ける実践」へ読み替える章になる。</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第14部の位置づけ</div><p>第14部は、科学史を「賢い現代人が愚かな過去を克服した物語」としては描かない。天動説にも精密さがあり、地動説の受容にも道具と時間が必要だった。見方を更新する力は、正解を暗記する力ではなく、証拠に応じて自分の前提を疑い続ける力である。</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第14部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Bridge to Part 15</div><div class="bridge-text">見方を更新した後も、「わかったつもり」という新しい罠が待っている。</div><div class="bridge-sub"><a href="part15.html">第15部「それ、わかったつもりかも」</a>では、知的謙虚さと考え続ける力を追う。</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">知ったことを、対話へつなぐ</div><div class="section-intro">第14部のテーマについて考え、Podcastとnoteで背景を広げるための入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="#theme-01"><div class="resource-label">AI DIALOGUE</div><div class="resource-title">AIと対話する</div><div class="resource-text">5つのテーマからひとつ選び、自分の問いへ深める。</div></a><a class="resource-card" href="../podcast.html"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第14部の5話を音声でたどる。</div></a><a class="resource-card" href="../note.html"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
