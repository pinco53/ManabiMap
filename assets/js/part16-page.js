(function () {
  'use strict';

  const root = document.getElementById('part-series-root');
  if (!root) return;

  const detail = window.PartDepthData && window.PartDepthData[16];
  const mapData = window.ManabiMapData || {};
  const chapters = [
    {
      title: '身体を超える最初の火',
      question: 'エネルギーを得ることは、人類の何を変えたのか。',
      intro: '第一章では、火と自然力を、人間の身体時間を拡張した最初の外部エネルギーとして読む。',
      episodes: [
        ['夜を、手に入れた', '調理・暖房・夜の活動', '火を使うことは、なぜ共同作業でもあったのか。'],
        ['自分以外を、働かせる', '家畜・風車・水車・帆', 'エネルギーへのアクセスは、なぜ制度の問題でもあるのか。']
      ]
    },
    {
      title: '量と場所を変える力',
      question: '化石燃料と電気は、自由と引き換えに何を持ち込んだのか。',
      intro: '第二章では、化石燃料と電気がエネルギーの量・場所・変換可能性を変えた一方、労働と環境へ新しい制約を作った過程を追う。',
      episodes: [
        ['過去の太陽を、燃やす', '石炭・蒸気機関・産業革命', '効率が上がれば、消費は本当に減るのか。'],
        ['どこへでも、届けられる', '電気・送電網・エネルギー担体', '電化の価値は、発電所だけにあるのか。']
      ]
    },
    {
      title: '次の解放を設計する',
      question: '次に人類が自由になるのは、何からか。',
      intro: '第三章では、原子核、太陽光、文明スケール、核融合を、技術だけでなく網・材料・制度まで含むシステムとして考える。',
      episodes: [
        ['太陽を、借りない力', '核分裂・エネルギー密度', '原子力を、事故か破滅かの二択で語ってよいのか。'],
        ['太陽に、還る', '太陽光発電・変動性・系統', '太陽光を主力にするには、発電以外に何が要るのか。'],
        ['次に自由になるのは、何か', 'カルダシェフ・スケール・文明の尺度', '文明の成熟は、消費量だけで測れるのか。'],
        ['太陽を、地球に作る', '核融合・ローソン条件', '「太陽を作れた」と「電気を安定して届けられる」は、同じことなのか。']
      ]
    }
  ];

  const timeline = [
    ['約40万年前', '人類による火の恒常的な利用', '調理により消化効率が上がり、暖房・捕食者対策・夜の活動が可能になった。第1話「夜を、手に入れた」が扱う、最初の外部エネルギー獲得である。', ['火の利用']],
    ['紀元前数千年', '家畜・帆・水車の利用', '人間の筋力以外の力を、農耕・輸送・製粉へ変換する技術が広がった。第2話「自分以外を、働かせる」が扱う、最初のエネルギー変換装置である。', ['自然エネルギー']],
    ['1712年', 'ニューコメンの蒸気機関', '炭鉱の排水のために実用化された初期の蒸気機関で、燃料効率は低かったが、化石燃料を動力に変える道を開いた。', ['蒸気機関']],
    ['1769年', 'ワットの蒸気機関特許', '別置きの復水器により燃費を大幅に改善し、蒸気機関を工場・鉱山・鉄道へ広げる転換点になった。第3話「過去の太陽を、燃やす」が扱う産業革命の出来事である。', ['蒸気機関', ['転換点', 'red']]],
    ['1879年〜', 'エジソンらによる電力網の実用化', '発電・送電・照明を組み合わせた電力システムが実用化され、電気は多様な用途へ変換できるエネルギー担体として広がった。第4話「どこへでも、届けられる」が扱う変化である。', ['電力網']],
    ['1938年', '核分裂の発見', 'ハーン、シュトラスマン、マイトナー、フリッシュがウランの核分裂を発見し、桁違いに高いエネルギー密度を持つ反応が明らかになった。第5話「太陽を、借りない力」の出発点である。', ['核分裂']],
    ['1942年', 'シカゴ・パイル1号', 'フェルミらが、人類初の制御された核分裂連鎖反応を実現した。原子力発電へつながる技術的な出発点になった。', ['原子炉']],
    ['1954年', 'ベル研究所の実用的シリコン太陽電池', '太陽光を直接電気に変換する実用的な太陽電池が開発され、後の再生可能エネルギーの基盤になった。第6話「太陽に、還る」が扱う技術の出発点である。', ['太陽光発電']],
    ['1964年', 'カルダシェフ・スケールの提唱', '文明が利用できるエネルギー量で発展段階を分類する思考実験を提示した。第7話「次に自由になるのは、何か」が扱う文明論的な視点である。', ['カルダシェフ・スケール']],
    ['2022年', 'NIFの核融合点火', '標的へ入力したレーザーエネルギーを上回る核融合出力を得た科学的な節目を達成した。第8話「太陽を、地球に作る」が扱うが、商用発電までの距離も同時に示す出来事である。', [['核融合', 'green']]]
  ];

  const coreArguments = [
    ['I. エネルギー技術は「ある」だけでは役に立たない。変換・輸送・制度がそろって初めて自由になる', [
      '火も、家畜も、電気も、それ自体はエネルギー源やその担体にすぎない。調理する知恵、飼育し輸送する技術、送電網や規則がそろって、初めて暖房・移動・照明というサービスになった。',
      'だからエネルギー技術の評価は、供給量だけでは終わらない。誰がアクセスでき、誰が変換装置を持ち、外部費用を誰が負うかという制度の問題を同じ表に置く必要がある。'
    ]],
    ['II. 効率化は、必ずしも総消費を減らさない', [
      'ワットの蒸気機関は燃費を大きく改善したが、その効率化は用途と規模の拡大を招き、石炭消費は増え続けた。効率と自由の拡大は、環境や労働への新しい負荷とセットで進んできた。',
      '同じ構造は電力網にも、AIの計算資源にも当てはまる。効率化そのものを自動的な解決策として扱わない視点が要る。'
    ]],
    ['III. 次の自由は、供給量だけでなく「誰が使えるか」「何を手放すか」で測られる', [
      'カルダシェフ・スケールは文明をエネルギー消費量で分類する思考実験だが、消費量だけを追うと、効率・分配・持続可能性という自由の別の側面を見落とす。',
      '核融合のような新しい技術も、「安価で安定した電力を届ける」という目標までには、材料・制度・分配という距離が残る。次に自由になるのが何かを問うことは、供給の量だけでなく、自由の定義そのものを問い直すことでもある。'
    ]]
  ];

  const glossary = [
    ['エネルギー担体', 'エネルギーたんたい', 'energy carrier', '一次エネルギー源そのものではなく、それを運び、多様な用途へ変換できる中間的な形態。電気が代表例。', '発電構成だけでなく、送電・変換の仕組みまで含めて評価する視点を与える。'],
    ['蒸気機関', 'じょうききかん', 'steam engine', '燃料を燃やして得た熱を、機械的な仕事に変換する装置。産業革命の動力源になった。', 'エネルギー変換の効率化が、消費規模の拡大とセットで進んだ最初期の例である。'],
    ['ジェヴォンズの逆説', 'ジェヴォンズのぎゃくせつ', 'Jevons paradox', '効率が向上し価格が下がると、利用が増えて総消費量がかえって増える現象。', '「効率化すれば消費が減る」という単純な期待を疑う視点になる。'],
    ['核分裂', 'かくぶんれつ', 'nuclear fission', '重い原子核が分裂し、化学反応より桁違いに高いエネルギーを放出する反応。', '発見の歴史には功績配分の不公正も含まれ、技術と倫理を同じ表で見る必要がある。'],
    ['核融合', 'かくゆうごう', 'nuclear fusion', '軽い原子核が融合し、太陽のようにエネルギーを生み出す反応。', '「点火」という科学的節目と、商用発電までの距離を区別して評価する必要がある。'],
    ['カルダシェフ・スケール', 'カルダシェフ・スケール', 'Kardashev scale', '文明が利用できるエネルギー量で発展段階を分類する思考実験。', '消費量だけで文明の成熟を測ることの限界も同時に考えさせる。'],
    ['送電網', 'そうでんもう', 'power grid', '発電した電力を需要地へ届け、周波数や需給を調整する仕組み全体。', '電化の価値が発電所単体ではなく網全体の設計にあることを示す。'],
    ['ローソン条件', 'ローソンじょうけん', 'Lawson criterion', '核融合が持続するために必要な温度・密度・閉じ込め時間の積の条件。', '「点火」の成果と、連続発電までの技術的な距離を測る基準になる。']
  ];

  const questions = [
    ['今の生活で当たり前に使っているエネルギーのうち、変換・輸送・制度のどれが欠けても成り立たないものは何か。', '電気・ガス・ガソリンのうち一つを選び、供給までの経路を書き出してみる。'],
    ['効率化が進んでも消費が減らなかった例を、エネルギー以外の場面でも思いつくか。', '通信、移動、計算資源など、便利になったことで使用量が増えた経験を探す。'],
    ['「次に自由になるのは何か」を考えるとき、供給量以外にどんな尺度を加えるべきか。', 'アクセスの公平さ、環境負荷、分配の仕組みなど供給量以外の視点を挙げる。'],
    ['「点火に成功した」というニュースと、「電気が安く安定して届く」という現実の間には、何が必要か。', '核融合の例で、材料・制度・コストのどれが橋渡しに必要か考える。']
  ];

  const references = [
    ['米国DOE：NIFの核融合点火', 'https://www.energy.gov/articles/doe-national-laboratory-makes-history-achieving-fusion-ignition'],
    ['ITER：ローソン条件', 'https://www.iter.org/fr/node/20687/lawsons-magic-formula?untranslated=1'],
    ['核分裂の発見（1938年）', 'https://www.aps.org/apsnews/2007/12/december-1938-discovery-nuclear-fission'],
    ['ベル研究所の太陽電池（1954年）', 'https://www.aps.org/apsnews/2009/04/bell-labs-silicon-solar-cell'],
    ['カルダシェフ・スケール', 'https://en.wikipedia.org/wiki/Kardashev_scale']
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
    return '<div class="doc-footer">ハルとおじいさん｜第16部 エネルギーと人類史　― ' + label + ' ―</div>';
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
      (chapterIndex < chapters.length - 1 ? '<div class="bridge-box"><div class="bridge-label">Bridge</div><div class="bridge-text">次の章へ問いを渡す。</div><div class="bridge-sub">' + esc(chapters[chapterIndex + 1].question) + '</div></div>' : '<div class="pull-quote">「エネルギーは、人類が何度も更新してきた自由の定義である。」</div>') +
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
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf('第16部') >= 0;
  }) : [];
  const notesHtml = noteItems.length ? '<div class="argument-heading">関連するnote</div><div class="note-list">' + noteItems.slice(0, 10).map(function (note) {
    return '<a class="note-link" href="' + esc(note.url) + '" target="_blank" rel="noopener"><span>NOTE #' + String(note.number).padStart(2, '0') + '</span>' + esc(note.title) + '</a>';
  }).join('') + '<a class="note-link" href="../note.html"><span>NOTE MAP</span>すべてのnote記事を見る</a></div>' : '';

  const referencesHtml = references.map(function (reference) {
    return '<a class="reference-link" href="' + esc(reference[1]) + '" target="_blank" rel="noopener"><span>REFERENCE</span>' + esc(reference[0]) + '</a>';
  }).join('');

  root.innerHTML =
    '<div class="cover"><div class="cover-series">ハルとおじいさんの物語 ── 学びの地図</div><div class="cover-colorname">瑠璃<small>るり</small></div>' +
      '<h1 class="cover-title">第16部<br>エネルギーと人類史</h1><div class="cover-subtitle">人類は何を解放してきたのか</div>' +
      '<div class="cover-chapter">第1話〜第8話｜全3章</div><div class="cover-tagline"><em>「エネルギーは、人類が何度も更新してきた自由の定義である。」</em></div>' +
      '<div class="cover-divider"></div><div class="cover-note">第16部の本文型補足資料</div><div class="cover-actions"><a class="cover-action" href="../podcast.html">Podcast一覧へ</a><a class="cover-action" href="../note.html">note記事へ</a></div></div>' +
    '<nav class="chapter-nav" aria-label="前後の部"><a href="part15.html">← 第15部</a><span>第16部 ｜ エネルギーと人類史</span><a href="part17.html">第17部 →</a></nav>' +
    '<div class="page"><div class="section-label">Introduction</div><div class="section-title">なぜエネルギーの歴史を深掘りするのか</div>' +
      '<div class="section-intro"><a href="part14.html">第14部</a>で見方の更新には道具・証拠・共同体が必要なことを見た。<a href="part15.html">第15部</a>でその更新を妨げる「わかったつもり」を問い直した。第16部では、見方の更新と同じように、人類がエネルギーという物理的な制約をどう更新してきたかを追う。</div>' +
      '<div class="essay-box"><h3>解放の歴史を読み直す</h3>' + detail.overview.map(function (paragraph) { return '<p>' + esc(paragraph) + '</p>'; }).join('') +
      '<p>目的は、エネルギー史を発明の年表として暗記することでも、特定の技術を無条件に称えることでもない。何がそろえば自由が広がり、何が新しい制約として持ち込まれるかを、道具・制度・分配の側から具体的に見ることである。</p></div>' +
      '<div class="argument-heading"><a href="part14.html">第14部</a>・<a href="part15.html">第15部</a>・第16部をつなぐ一本線</div><p class="argument-body"><a href="part14.html">第14部</a>で見方の更新には道具・証拠・共同体が必要なことを見た。<a href="part15.html">第15部</a>でその更新を妨げる「わかったつもり」を問い直した。第16部では、見方の更新と同じように、人類がエネルギーという物理的な制約をどう更新してきたかを追う。</p>' +
      '<div class="central-question"><div class="cq-label">第16部の中心的問い</div><div class="cq-text">エネルギーを得るたび、人類は何から自由になったのか。<br>次に自由になるのは何か。</div><div class="cq-sub">供給量だけでなく、誰が使えるかを同じ表に置く。</div></div>' + footer('導入') + '</div>' +
    '<div class="page"><div class="section-label">Historical Map</div><div class="section-title">火から核融合までのエネルギー史</div>' +
      '<div class="section-intro">エネルギーの解放は、火の利用、自然力の転用、化石燃料、電力網、そして原子核・太陽光・核融合へと、異なる技術が積み重なって進んできた。主要な転換点を一本の流れとして整理する。</div>' +
      '<div class="chapter-card"><div class="chapter-card__head"><div class="chapter-kicker">FROM FIRE TO FUSION</div><div class="chapter-name">エネルギーの解放を、どう説明してきたか</div><div class="chapter-lead">火、自然力、化石燃料、電気、原子核。説明の焦点は広がり続けている。</div></div><div class="timeline">' + timelineRows + '</div></div>' + footer('エネルギー史の系譜') + '</div>' +
    chapterPages +
    '<div class="page"><div class="section-label">Core Argument</div><div class="section-title">核心論考 ── エネルギーという「自由の定義」</div><div class="section-intro">8つのテーマを束ねると、第16部はエネルギーを「便利な発明の一覧」から「人類が自由の定義を更新し続けてきた歴史」へ読み替える章になる。</div>' + argumentsHtml +
      '<div class="perspective"><div class="perspective-label">第16部の位置づけ</div><p>第16部は、エネルギー技術の進歩を単線の成功物語としては描かない。効率化は消費を減らすとは限らず、新しい技術は新しい制約や不平等も持ち込んできた。次に自由になるのが何かを問うことは、供給量だけでなく、誰が使え、何を手放すかという自由の定義そのものを問い直すことである。</p></div>' + footer('核心論考') + '</div>' +
    '<div class="page"><div class="section-label">Glossary</div><div class="section-title">用語解説</div><div class="section-intro">第16部の主要概念を、定義だけでなく「なぜ重要か」とともに整理する。</div>' + glossaryHtml +
      '<div class="argument-heading" style="margin-top:44px">問いの地図</div><div class="discussion-q">' + questionsHtml + '</div>' +
      '<div class="bridge-box"><div class="bridge-label">Bridge to Part 17</div><div class="bridge-text">身体の限界を越える力の次に、人類は一人の限界を越える仕組みを広げた。</div><div class="bridge-sub"><a href="part17.html">第17部「交換と協働」</a>では、贈与から貨幣、分業、AIまで、協働できる相手を広げた歴史を追う。</div></div>' + footer('用語と問い') + '</div>' +
    '<div class="page"><div class="section-label">Resources</div><div class="section-title">知ったことを、対話へつなぐ</div><div class="section-intro">第16部のテーマについて考え、Podcastとnoteで背景を広げるための入口。</div>' +
      '<div class="resource-grid"><a class="resource-card" href="#theme-01"><div class="resource-label">AI DIALOGUE</div><div class="resource-title">AIと対話する</div><div class="resource-text">8つのテーマからひとつ選び、自分の問いへ深める。</div></a><a class="resource-card" href="../podcast.html"><div class="resource-label">PODCAST</div><div class="resource-title">Podcastで聞く</div><div class="resource-text">第16部の8話を音声でたどる。</div></a><a class="resource-card" href="../note.html"><div class="resource-label">NOTE MAP</div><div class="resource-title">note記事へ</div><div class="resource-text">各テーマから伸びる個別の枝道を読む。</div></a></div>' + notesHtml +
      '<div class="argument-heading">参考資料</div><div class="reference-list">' + referencesHtml + '</div>' + footer('関連資料') + '</div>';
}());
