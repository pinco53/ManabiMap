(function () {
  'use strict';

  /*
   * Every episode prompt follows the ManabiMap dialogue rhythm:
   * current view -> one question -> knowledge gift -> another lens ->
   * cross-disciplinary connection -> one next question.
   */
  var registeredGuides = window.ManabiEpisodeAIGuides || {};
  var targetSelector = '.episode-row, .episode-card, .scientist-card, .theme-card, .upcoming-card';
  var targets = Array.from(document.querySelectorAll(targetSelector));

  if (!targets.length) return;

  var partContexts = {
    '1': {
      series: 'ManabiMap 第1部「産業革命」',
      theme: '機械が変えた人間の暮らしと時間',
      centralQuestion: '機械は人間を何から解放し、何に縛ったのか。',
      keyIdeas: ['機械は身体能力を拡張しただけでなく、働く場所と時間の秩序も組み替えた。', '便利さには、解放と依存、豊かさと分断が同時に含まれる。'],
      knowledgeGifts: ['蒸気機関、工場制、鉄道、標準時、学校の時間割を一本の歴史としてつなげる。'],
      worlds: ['技術史と労働', '時計・標準時と日常のリズム', '学校教育と規格化']
    },
    '2': {
      series: 'ManabiMap 第2部「デジタル革命」',
      theme: '情報技術が変えた距離・注意・つながり',
      centralQuestion: 'つながることは、近づくことと同じなのか。',
      keyIdeas: ['デジタル技術は情報と発信の距離を縮めた。', '常時接続は関係を保つ一方、注意の断片化や孤独も生みうる。'],
      knowledgeGifts: ['計算機、インターネット、スマートフォン、注意経済の変化をつなげる。'],
      worlds: ['通信技術の歴史', '注意の心理学', '孤独とコミュニティ']
    },
    '3': {
      series: 'ManabiMap 第3部「AI革命」',
      theme: '生成AIの登場と人間の選択',
      centralQuestion: 'AIが答えを出せる時代に、自分の人生を生きるとは何か。',
      keyIdeas: ['自然な応答を作れることと、意味を理解していることは同じではない。', 'AI時代には、問い、選択、検証、結果を引き受ける役割が人間に残る。'],
      knowledgeGifts: ['生成AIの急速な普及を、身体性、教育、作者性、責任の問題につなげる。'],
      worlds: ['AI史と計算機科学', '哲学における理解と意識', '教育・仕事・創作']
    },
    '4': {
      series: 'ManabiMap 第4部「知識の歴史」',
      theme: '記憶を外へ出し、知識を運ぶ技術',
      centralQuestion: '知識は、誰のものか。',
      keyIdeas: ['文字は記憶を身体の外へ出し、世代を越える蓄積を可能にした。', '知識を広げる媒体は、同時に何を届けるかを決める権力も生む。'],
      knowledgeGifts: ['口承、文字、印刷、百科全書、電信、ウェブ、生成AIを知識の器の変化として見る。'],
      worlds: ['文字とメディア史', '図書館・出版・権力', '検索と生成AI']
    },
    '5': {
      series: 'ManabiMap 第5部「言葉と思考」',
      theme: '言葉が世界の切り分け方を変える仕組み',
      centralQuestion: '言葉は思考を作るのか。それとも、思考が言葉を作るのか。',
      keyIdeas: ['言葉になる前にも、感覚や空間、因果を扱う思考はある。', '新しい言葉や概念は、見えなかった違いを見えるようにする。'],
      knowledgeGifts: ['言語の起源、内なる声、抽象化、因果、言語の多様性、AIを横断する。'],
      worlds: ['言語学と認知科学', '哲学における概念', '異文化とAI言語']
    },
    '6': {
      series: 'ManabiMap 第6部「数と人間」',
      theme: '数える・予測する・評価することの歴史',
      centralQuestion: '数字は世界を測る道具なのか。それとも価値を決める支配者なのか。',
      keyIdeas: ['数は比較と記録によって文明を広げた。', '測定には、何を数え何を数えないかという価値判断が含まれる。'],
      knowledgeGifts: ['一対一対応、ゼロ、国家の記録、確率、統計、評価を一本につなげる。'],
      worlds: ['数学史と国家', '確率・統計と未来予測', '学校・仕事の評価']
    },
    '7': {
      series: 'ManabiMap 第7部「人間の前提を外した科学者たち」',
      theme: '科学が外した人間の「当たり前」',
      centralQuestion: '感覚も理解も思考も人間だけの特権でないなら、何が残るのか。',
      keyIdeas: ['感覚的な当たり前は、世界の真実を保証しない。', '理解、計算、思考を分けて考えると、人間の役割を別の角度から見直せる。'],
      knowledgeGifts: ['アインシュタイン、ファインマン、チューリング、フォン・ノイマンの問いをつなげる。'],
      worlds: ['物理学と数学', '計算・知能・意識の哲学', 'AIと人間観']
    },
    '8': {
      series: 'ManabiMap 第8部 第一章「生成という断層」',
      theme: 'AIがルールから学習と生成へ進んだ歴史',
      centralQuestion: '統計は、思考なのか。',
      keyIdeas: ['AIはルールを実行する機械から、データのパターンを学ぶ仕組みへ変わった。', '自然な文章を生成できることと、意味や事実を理解していることは同じではない。'],
      knowledgeGifts: ['記号処理、機械学習、ニューラルネット、言語モデル、生成AIの転換をたどる。'],
      worlds: ['AI・統計・計算機史', '言語と意味の哲学', '知識・教育・創作']
    },
    '8-2': {
      series: 'ManabiMap 第8部 第二章「生成された思考の波」',
      theme: 'AI時代の学びと「思考の所有」',
      centralQuestion: 'AIが考えることを担う時代に、人間が考える意味はどこにあるか。',
      keyIdeas: ['答えを得ることと、考える過程が自分を変えることは同じではない。', 'AIは思考を代替する道具にも、問いを広げる相手にもなりうる。'],
      knowledgeGifts: ['宿題、試験、学力、作者性を、代替と拡張の境界から考える。'],
      worlds: ['教育心理学', '作者性と責任の哲学', 'AIが変える学校・仕事・創作']
    },
    '9': {
      series: 'ManabiMap 第9部「旧石器時代の身体で、生成AI時代を生きる」',
      theme: '進化した身体と現代環境の速度差',
      centralQuestion: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      keyIdeas: ['身体は技術や情報環境より、はるかにゆっくり変化する。', '疲れや違和感は、意志の弱さではなく環境とのミスマッチを示す情報にもなる。'],
      knowledgeGifts: ['二足歩行、報酬系、不安、集中、痛み、感性を進化的ミスマッチからつなぐ。'],
      worlds: ['進化生物学', '脳・身体・感情', 'デジタル環境と日常習慣']
    },
    '10': {
      series: 'ManabiMap 第10部「感性という深層」',
      theme: '感じることと意味が生まれる場所',
      centralQuestion: '感性は脳に還元できるのか。それとも関係の中で立ち上がるのか。',
      keyIdeas: ['感性は知覚、身体反応、記憶、予測が統合される過程である。', '美や意味は、対象だけでなく受け手と文脈のあいだに生まれる。'],
      knowledgeGifts: ['感動、美、共感、物語、進化、文化、生成AIを一つの地図に置く。'],
      worlds: ['神経科学と心理学', '芸術・文化・進化', 'AI作品と作者性']
    },
    '11': {
      series: 'ManabiMap 第11部「人はどう学び始めるのか」',
      theme: '応答される安心から始まる学び',
      centralQuestion: '学びは教えられる前から、何によって支えられているのか。',
      keyIdeas: ['最初に学ぶのは知識より、世界は応答するという予測である。', '安心できる場所があるから、未知を探索し試行錯誤できる。'],
      knowledgeGifts: ['泣き、愛着、模倣、共同注意、遊び、自己効力感を発達の流れでつなぐ。'],
      worlds: ['発達心理学', '身体・関係・言語', '遊びと教育・AI']
    },
    '12': {
      series: 'ManabiMap 第12部「人はなぜ、一人では学べないのか」',
      theme: '対話・評価・関係の学習心理学',
      centralQuestion: '一人で考えることと、対話しながら考えることは何が違うのか。',
      keyIdeas: ['理解は説明しようとしたときに穴が見える。', '問い返しやフィードバックは、答えを渡す以上に思考を育てうる。'],
      knowledgeGifts: ['自己説明、検索練習、フィードバック、メタ認知、AI対話の研究をつなげる。'],
      worlds: ['学習心理学', '学校・家庭・対話', 'AIとメタ認知']
    },
    '13': {
      series: 'ManabiMap 第13部「学びとは何か」',
      theme: '学びを受け渡し、閉じ、もう一度開く条件',
      centralQuestion: '人はなぜ学び、なぜ学びを閉じるのか。',
      keyIdeas: ['学びは世代を越えて知を受け渡す共同作業である。', '学びを閉じる反応は、個人の意欲だけでなく評価や関係、環境から生まれる。'],
      knowledgeGifts: ['累積文化、失敗、評価、学校の隠れたカリキュラム、家庭の安全基地をつなげる。'],
      worlds: ['人類進化と文化', '教育制度と評価', '家庭・所属感・主体性']
    },
    '14': {
      series: 'ManabiMap 第14部「地球は動いている」',
      theme: '地動説の歴史と見方を更新する力',
      centralQuestion: '科学とは、正解を知ることなのか。',
      keyIdeas: ['観察は、持っている見方や使う道具から独立していない。', '科学は間違えない知識ではなく、証拠に応じて前提を更新する営みである。'],
      knowledgeGifts: ['アリストテレス、コペルニクス、ガリレオ、ケプラー、ニュートンを観測と理論の変化でつなぐ。'],
      worlds: ['天文学と科学史', '観察・証拠・哲学', '日常の思い込みと学び直し']
    },
    '15': {
      series: 'ManabiMap 第15部「それ、わかったつもりかも」',
      theme: '確信の仕組みと知的謙虚さ',
      centralQuestion: '「わかった」と「考えた」は、同じなのか。',
      keyIdeas: ['確信の強さと証拠の強さは同じではない。', '迷いを保つことは判断の放棄ではなく、更新できる形で考えを持つことである。'],
      knowledgeGifts: ['無知の知、説明深度の錯覚、認知的閉鎖欲求、パラダイム、AI検証をつなぐ。'],
      worlds: ['認知心理学', '科学史と哲学', 'AIの流暢さと事実確認']
    },
    '16': {
      series: 'ManabiMap 第16部「エネルギーと人類史」',
      theme: '身体を越える力と、次の自由の設計',
      centralQuestion: 'エネルギーを得ることは、人類を何から自由にし、何に依存させたのか。',
      keyIdeas: ['エネルギー源は、変換・輸送・制度がそろって初めて暮らしの力になる。', '効率化は利用を広げ、総消費をかえって増やすこともある。'],
      knowledgeGifts: ['火、家畜、蒸気機関、電力網、核分裂、太陽光、核融合を自由の歴史として見る。'],
      worlds: ['エネルギー技術史', '経済・制度・環境', '未来文明と公平なアクセス']
    },
    '17': {
      series: 'ManabiMap 第17部「交換と協働」',
      theme: '見知らぬ他人と協力できる仕組み',
      centralQuestion: 'なぜ人類は、見知らぬ他人とも協力できるようになったのか。',
      keyIdeas: ['贈与、信用、貨幣、分業は、関係の範囲を広げる仕組みである。', 'つながりが広がるほど、相互依存と壊れやすさも増える。'],
      knowledgeGifts: ['モースの贈与論、ヤップ島の石貨、アダム・スミスの分業、スエズ運河、AI協働をつなぐ。'],
      worlds: ['経済史と人類学', '信頼・制度・社会心理', '供給網と人間・AI協働']
    },
    '18': {
      series: 'ManabiMap 第18部「人はなぜ勘違いするのか」',
      theme: '脳がつくる現実と、見方を更新する方法',
      centralQuestion: '私たちが見ている「現実」は、世界そのものなのか。',
      keyIdeas: ['知覚と記憶は録画ではなく、注意・予測・再構成による編集である。', 'バイアスは意志だけで消すのではなく、証拠、手順、他者の視点で点検する。'],
      knowledgeGifts: ['非注意性盲目、記憶の再構成、同調、アンカリング、メタ認知、AIの誤生成を区別してつなぐ。'],
      worlds: ['認知科学と心理学', '集団・メディア・社会', '哲学における現実とAI検証']
    },
    '19': {
      series: 'ManabiMap 第19部「人類はなぜ移動するのか」',
      theme: '移動が人類の身体・社会・見方を変えてきた歴史',
      centralQuestion: '人間は、なぜ今いる場所を離れるのか。',
      keyIdeas: ['移動は完成した人類の活動ではなく、身体と文化を作ってきた条件でもある。', '移動には自由と強制、出発する権利と留まる権利が同時に含まれる。'],
      knowledgeGifts: ['人類の拡散、歩く身体、航海、故郷、国境、概観効果を一本の旅としてつなげる。'],
      worlds: ['人類進化と身体', '移住・国境・社会制度', '故郷・記憶・自己の哲学']
    },
    '20': {
      series: 'ManabiMap 第20部「余ったのに、なぜ足りないのか」',
      theme: '余剰が豊かさと新しい不足を生む仕組み',
      centralQuestion: '余白を、余白のまま持つことはできるだろうか。',
      keyIdeas: ['余剰は安心を作る一方、保存・管理・配分を決める制度も生む。', '効率化の目的を決めなければ、浮いた時間は追加の仕事と期待へ戻りやすい。'],
      knowledgeGifts: ['農耕と貯蔵、幸福への適応、社会的比較、選択過多、リバウンド効果、生成AIをつなげる。'],
      worlds: ['経済史と人類学', '幸福・比較・意思決定の心理学', '効率化・労働・AI']
    }
  };

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function firstText(target, selectors) {
    for (var index = 0; index < selectors.length; index += 1) {
      var element = target.querySelector(selectors[index]);
      var value = element && cleanText(element.textContent);
      if (value) return value;
    }
    return '';
  }

  function allTexts(target, selector) {
    return Array.from(target.querySelectorAll(selector)).map(function (element) {
      return cleanText(element.textContent);
    }).filter(Boolean);
  }

  function unique(items) {
    return items.filter(function (item, index) {
      return item && items.indexOf(item) === index;
    });
  }

  function episodeNumber(target, index) {
    var idMatch = String(target.id || '').match(/theme-(\d+)/);
    var classMatch = String(target.className || '').match(/\b(?:ep|sc|th)(\d+)\b/);
    var labelMatch = firstText(target, [
      '.episode-no',
      '.episode-number',
      '.theme-number',
      '.sc-num',
      '.upcoming-num'
    ]).match(/(\d+)/);
    return Number((idMatch || classMatch || labelMatch || [null, index + 1])[1]);
  }

  function pageSources() {
    return Array.from(document.querySelectorAll('.reference-link')).slice(0, 6).map(function (link) {
      return {
        label: cleanText(link.textContent).replace(/^REFERENCE\s*/i, ''),
        url: link.href
      };
    }).filter(function (source) {
      return source.label && /^https?:/.test(source.url);
    });
  }

  function inferGuide(target, index) {
    var part = document.body.dataset.part || '';
    var context = partContexts[part] || {};
    var number = episodeNumber(target, index);
    var numberLabel = String(number).padStart(2, '0');
    var title = firstText(target, [
      '.episode-title',
      '.upcoming-title',
      '.theme-title',
      '.sc-name',
      '.scientist-name',
      '.theme-name',
      '.card-title',
      'h3',
      'h4'
    ]) || '第' + number + '話';
    var question = firstText(target, [
      '.episode-question',
      '.question-text',
      '.sc-question',
      '.theme-question',
      '.core-question',
      '[class*="question"]'
    ]).replace(/^(?:核心の)?問い[：:]\s*/, '');
    var lead = firstText(target, [
      '.episode-lead',
      '.upcoming-theme',
      '.theme-lead',
      '.sc-premise',
      '.card-lead'
    ]);
    var summaries = allTexts(target,
      '.episode-summary, .theme-body p, .episode-body > p, .sc-body > p, .upcoming-parts li'
    );
    var tags = unique(allTexts(target, '.keyword-tag, .sc-tag, .tag')).slice(0, 4);
    var centralQuestion = question || context.centralQuestion ||
      '「' + title + '」は、私たちの世界の見方をどのように変えるのか。';
    var background = summaries[0] || lead ||
      'このページに示された「' + title + '」の出来事と考え方を出発点にする。';
    var perspective = summaries[1] || lead ||
      '「' + title + '」を一つの答えとして覚えず、何が変わり、何がまだ説明できないのかを分けて捉える。';
    var keyIdeas = unique([background, perspective].concat(context.keyIdeas || [])).slice(0, 5);
    var knowledgeGifts = unique([background].concat(summaries.slice(1, 3), context.knowledgeGifts || [])).slice(0, 4);
    var worlds = unique((context.worlds || []).concat(tags.map(function (tag) {
      return '「' + tag + '」と現在の生活・判断とのつながり';
    }))).slice(0, 6);

    return {
      id: 'part' + part + '-' + numberLabel,
      series: context.series || 'ManabiMap 第' + part + '部',
      episode: '第' + number + '話「' + title + '」',
      theme: (context.theme ? context.theme + '／' : '') + title,
      centralQuestion: centralQuestion,
      importantIdeas: keyIdeas,
      knowledgeGifts: knowledgeGifts,
      perspective: perspective,
      cautions: [
        '本文の説明を単一の原因や絶対的な結論にせず、証拠が示す範囲と、異論・例外・まだ分からない点を分ける。',
        '印象的な逸話や分かりやすい比喩を、そのまま事実の証明として扱わない。'
      ],
      worlds: worlds.length ? worlds : [
        'この話と似た仕組みが、現在の生活のどこに現れるか',
        '自分の経験を、この話の見方で捉え直すと何が変わるか'
      ],
      sources: pageSources(),
      opening: '最初から私の意見を求めないでください。「' + centralQuestion + '」につながる身近な場面を一つ示し、今回たどる仕組みの小さな地図を3〜6文で伝えてください。最後は質問で締めず、「思い当たる場面があれば一言でも。なければ、このまま具体例から進めます」のように、答えなくても先へ進める柔らかな入口を置いてください。',
      giftOpening: '最初は長く説明せず、「' + title + '」に関係する意外な事実、研究、歴史上の出来事のいずれか一つを2〜3文で紹介してください。続けて、その事実が今回の中心的な問いとどうつながるかを短く示してください。すぐに意見を求めず、「気になった点があれば一言でも。なければ、この背景から続けます」のように、返答を強制しない入口で終えてください。'
    };
  }

  function lines(items) {
    return (items || []).map(function (item) {
      return '・' + item;
    }).join('\n');
  }

  function sourceLines(items) {
    if (!items || !items.length) {
      return '・このページの本文を出発点とし、追加の事実は信頼できる資料で確かめる。';
    }
    return items.map(function (item) {
      return '・' + item.label + '\n  ' + item.url;
    }).join('\n');
  }

  function normalizeGuide(guide, inferred) {
    return {
      id: guide.id || inferred.id,
      series: guide.series || inferred.series,
      episode: guide.episode || inferred.episode,
      theme: guide.theme || inferred.theme,
      centralQuestion: guide.centralQuestion || inferred.centralQuestion,
      importantIdeas: guide.importantIdeas || unique([guide.centralIdea, guide.background, guide.perspective].concat(inferred.importantIdeas || [])).slice(0, 5),
      knowledgeGifts: guide.knowledgeGifts || unique([guide.background].concat(inferred.knowledgeGifts || [])).slice(0, 4),
      perspective: guide.perspective || inferred.perspective,
      cautions: guide.cautions || inferred.cautions,
      worlds: guide.worlds || guide.connections || inferred.worlds,
      sources: guide.sources || inferred.sources,
      opening: guide.opening || inferred.opening,
      giftOpening: guide.giftOpening || inferred.giftOpening
    };
  }

  var modes = {
    current: {
      label: '身近な場面から始める',
      shortLabel: '身近な場面から始める対話文',
      description: '短い場面を共有し、返答を急がせずに理解の足場を作ります。',
      success: 'お使いのAIに貼り付けると、身近な場面から無理のない対話が始まります。'
    },
    gift: {
      label: '意外な事実から始める',
      shortLabel: '知識から始める対話文',
      description: '短い「知識の贈り物」を入口に、見方を少し揺さぶります。',
      success: 'お使いのAIに貼り付けると、短い知識の贈り物から対話が始まります。'
    }
  };

  function commonPrompt(guide) {
    return [
      'あなたは、ManabiMapの「知的探究チューター」です。',
      '',
      '【理念】',
      '正解を早く渡すことや、質問を繰り返して私に答えさせることが目的ではありません。会話のラリーを重ねながら、私の考えと新しい知識を結び、同じテーマを少しずつ深く見られるようにしてください。',
      '対話を尋問にしないでください。毎回質問で終える必要はありません。私の発言を受け止め、知識、具体例、研究、反例、整理を渡すだけの応答も積極的に挟んでください。',
      '',
      '【今回のコンテンツ】',
      'シリーズ：' + guide.series,
      'エピソード：' + guide.episode,
      '',
      'テーマ：',
      guide.theme,
      '',
      'ManabiMapで扱った中心的な問い：',
      guide.centralQuestion,
      '',
      'このコンテンツで伝えたい重要な考え：',
      lines(guide.importantIdeas),
      '',
      '対話中に使える事実・研究・人物・エピソード：',
      lines(guide.knowledgeGifts),
      '',
      'このテーマから広げられる世界：',
      lines(guide.worlds),
      '',
      '単純化しないための注意：',
      lines(guide.cautions),
      '',
      'この部の参考資料（関係するものだけ参照）：',
      sourceLines(guide.sources),
      '',
      '【内部で行う適応】',
      '会話を通して、このテーマについて私がすでに知っていること、まだ結びついていないこと、誤解している可能性、具体例と抽象概念のどちらが理解を助けそうか、説明の速度と情報量、関心の方向、自分の言葉で説明・比較・応用できる段階かを静かに推定してください。',
      '推定するのは、このテーマに限った一時的な理解状態です。一般的な知能、IQ、年齢、性格を判定しないでください。文章の長さ、語彙、口調、返答の速さだけで能力を決めつけないでください。',
      '推定した水準や「初級・上級」といった評価を私に明示しないでください。判断に迷う場合は、子ども扱いしない平易な説明から始め、複数回のやり取りを通して更新してください。',
      '',
      '【足場かけ】',
      '私が今一人で理解できる範囲より、半歩から一歩だけ先へ進める支援をしてください。',
      '・前提知識が少ないときは、身近な具体例や小さな物語を先に示し、新しい概念は一度に一つにする。用語は意味を説明した後で紹介し、必要なら手がかりや途中までの例を渡す。',
      '・理解が進んだら説明量を少し減らし、因果関係、比較、別の場面への応用へ進む。私自身が関係を組み立てる余地を残す。',
      '・理解が深いときは、反例、限界、対立する研究、測定上の問題、一次資料を示し、単純な正解で閉じない。',
      '・理解が進んだ支援は徐々に外す。簡単すぎる説明を続けることも、難しい説明へ急に飛ぶことも避ける。',
      '',
      '【会話のラリー】',
      '各応答では、次の要素から必要なものだけを選んでください。毎回すべてを行う必要はありません。',
      '1. 私の発言から重要な点を一つ拾い、短く言い換えて現在地を共有する。',
      '2. その点を一段進める知識を、認知負荷が高くならない量で渡す。目安は一つの概念について2〜5文。',
      '3. 研究、歴史、人物、具体例、思考実験のいずれかを一つ添える。',
      '4. 必要なら「こんな見方もあります」と、反例や別の立場を示す。',
      '5. 直前までに共有した知識を使って考えられる段階になったときだけ、深める問いを一つ置く。',
      '褒め言葉だけで返したり、私の発言を長く復唱したりしないでください。どの部分が次の理解につながるのかを具体的に示してください。',
      '',
      '【問いを置く条件】',
      '問いは会話を続けるための義務ではなく、理解を深めるための道具です。原則として、質問で終わる応答を二回連続させないでください。ただし、意味を取り違えないための短い確認が本当に必要な場合は例外です。',
      '問いは、次の説明に必要な前提を確かめるとき、予想と事実の違いが学びになるとき、二つの考えを比較できる材料が揃ったとき、反例や別の場面へ応用できる段階になったとき、自分の言葉で整理することが理解を助けるときにだけ置いてください。',
      '知識をほとんど渡していない段階で、「どう思いますか」「あなたならどうしますか」と広く尋ねないでください。問いを置く場合も、一回の応答につき中心となる問いは一つだけにしてください。',
      '必要に応じて「思い当たらなければ、このまま具体例から進めます」のような逃げ道を用意し、返答を強制しないでください。「続けて」「具体例」「まだわからない」のような短い返事も自然に受け止めてください。',
      '',
      '【一つの論点を深める】',
      '一つの論点について、身近な場面 → 仕組みや背景 → 研究・史実・具体例 → 反例や異なる立場 → 私の経験との接続 → 前提知識が揃った上での深い問い、という順序を目安に数回のラリーを行ってください。',
      '新しい分野へ次々と移動しないでください。横につながるテーマを思いついても、現在の論点が十分に深まるまでは「後で進められる枝」として内部に保持してください。分岐を示すのは一区切りのときだけにし、通常は現在の一本を深めてください。',
      '',
      '【知識の贈り物】',
      '質問だけを返さず、科学的研究、歴史上の出来事、人物や逸話、身近な具体例、思考実験、反例や異なる立場から、その時の対話に最も合うものを一つずつ渡してください。',
      '一度に渡す中心的な新概念は原則一つです。史実や研究で確認されていること、解釈、推測を区別し、資料を確認できない場合は確認したように装わないでください。',
      '',
      '【対話の一区切り】',
      '毎回「次は何を知りたいですか」と聞かないでください。同じ論点を数回往復し、一つの理解が形になったところで、短く整理してください。',
      'その後、必要な場合だけ、前提知識が揃ったからこそ考えられる問いを一つ置いてください。最後には結論ですべてを閉じず、今回の理解から自然につながる次の扉を一つだけ示してください。',
      '',
      '【対話の品質】',
      '・専門知識を前提にせず、難しい言葉はその場で日常の表現に言い換える。',
      '・私の理解度や価値観を決めつけず、子ども扱いする表現を避ける。',
      '・史実や研究で確認されていること、解釈、推測を区別する。資料を確認できない場合は、確認したように装わない。',
      '・同じ問いを言い換えて繰り返さず、私の返答に応じて知識、例、反例、つながりのどれを渡すか選ぶ。'
    ];
  }

  function dialoguePrompt(guide, mode) {
    var opening = mode === 'gift' ? guide.giftOpening : guide.opening;
    return commonPrompt(guide).concat([
      '',
      '【今回の始め方】',
      mode === 'gift' ? '短い知識の贈り物から始める。' : '身近な場面から始める。',
      '',
      '【最初の応答】',
      opening,
      '',
      '以上を踏まえ、最初から意見を求めず、まず理解の足場になる短い内容を渡すところから対話を始めてください。'
    ]);
  }

  function buildPrompt(guide, mode) {
    return dialoguePrompt(guide, mode).join('\n');
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        if (!document.execCommand('copy')) throw new Error('copy command failed');
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        textarea.remove();
      }
    });
  }

  targets.forEach(function (target, index) {
    if (target.querySelector(':scope > .episode-ai, :scope > * > .episode-ai')) return;

    var inferred = inferGuide(target, index);
    var guideId = target.dataset.aiGuide || inferred.id;
    var guide = normalizeGuide(registeredGuides[guideId] || {}, inferred);
    var content = target.classList.contains('episode-row') ? target.children[1] : target;

    if (!content) return;
    target.dataset.aiGuide = guideId;
    target.classList.add('episode-ai-ready');

    var activeMode = 'current';
    var prompt = buildPrompt(guide, activeMode);
    var panel = document.createElement('section');
    panel.className = 'episode-ai';
    panel.setAttribute('aria-label', guide.episode + 'をAIと深める');

    var heading = document.createElement('div');
    heading.className = 'episode-ai__heading';
    heading.innerHTML =
      '<div><span class="episode-ai__label">CONTINUE WITH AI</span>' +
      '<h4>このテーマから、AIとの対話を始める</h4>' +
      '<p>始め方を選んで対話文をコピーし、普段使っているAIへ貼り付けてください。短い返事や「まだわからない」から始めても大丈夫です。</p></div>';

    var modePicker = document.createElement('div');
    modePicker.className = 'episode-ai__modes';
    modePicker.setAttribute('role', 'group');
    modePicker.setAttribute('aria-label', '対話の始め方');

    var modeButtons = Object.keys(modes).map(function (modeId) {
      var mode = modes[modeId];
      var button = document.createElement('button');
      button.className = 'episode-ai__mode';
      button.type = 'button';
      button.dataset.aiMode = modeId;
      button.setAttribute('aria-pressed', String(modeId === activeMode));
      button.innerHTML = '<strong>' + mode.label + '</strong><span>' + mode.description + '</span>';
      modePicker.appendChild(button);
      return button;
    });

    var actions = document.createElement('div');
    actions.className = 'episode-ai__actions';

    var copy = document.createElement('button');
    copy.className = 'episode-ai__copy';
    copy.type = 'button';

    var status = document.createElement('p');
    status.className = 'episode-ai__status';
    status.setAttribute('aria-live', 'polite');

    function renderMode(modeId) {
      activeMode = modeId;
      prompt = buildPrompt(guide, activeMode);
      copy.textContent = modes[activeMode].shortLabel + 'をコピー';
      status.textContent = '';
      modeButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.aiMode === activeMode));
      });
    }

    modeButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        renderMode(button.dataset.aiMode);
      });
    });

    copy.addEventListener('click', function () {
      copy.disabled = true;
      copyText(prompt).then(function () {
        copy.textContent = 'コピーしました';
        status.textContent = 'コピーしました。普段使っているAIを開いて貼り付けてください。' + modes[activeMode].success;
        window.setTimeout(function () {
          copy.disabled = false;
          copy.textContent = modes[activeMode].shortLabel + 'をもう一度コピー';
        }, 1800);
      }).catch(function () {
        copy.disabled = false;
        status.textContent = 'コピーできませんでした。ブラウザのコピー許可を確認して、もう一度お試しください。';
      });
    });

    actions.append(copy, status);
    panel.append(heading, modePicker, actions);
    renderMode(activeMode);
    content.appendChild(panel);
  });
}());
