/*
 * Manabi Map structured content data.
 * Phase 1 keeps this as a browser global so existing static HTML pages can use it
 * without a build step.
 */
(function() {
  'use strict';

  const parts = [
    {
      id: 'part1',
      type: 'part',
      number: '01',
      title: '蒸気の時代',
      subtitle: '産業革命 -- 機械が人間のリズムを変えた日',
      group: '三大革命',
      era: '18世紀後半から',
      color: 'part1',
      colorName: '檜皮',
      colorReading: 'ひわだ',
      pageUrl: 'parts/part1.html',
      youtubeUrl: 'https://youtu.be/HrQnEL6hi4w',
      tags: ['産業革命', '蒸気機関', '労働', '時間', '教育', '手仕事'],
      concepts: ['industrial-revolution', 'steam-engine', 'labor-time', 'school-clock'],
      questions: [
        '機械は人間を何から解放し、何に縛ったのか。',
        '時計のリズムで生きることは、人間の学びをどう変えたのか。'
      ],
      relatedNotes: ['note-02', 'note-10'],
      next: ['part2', 'part3', 'evolution']
    },
    {
      id: 'part2',
      type: 'part',
      number: '02',
      title: 'つながる世界',
      subtitle: 'デジタル革命 -- 人と人のあいだはどう変わったか',
      group: '三大革命',
      era: '1940年代から2020年代',
      color: 'part2',
      colorName: '琥珀',
      colorReading: 'こはく',
      pageUrl: 'parts/part2.html',
      youtubeUrl: 'https://youtu.be/MZSwaQr27NI',
      tags: ['コンピュータ', 'インターネット', 'SNS', '注意経済', '孤独'],
      concepts: ['digital-revolution', 'internet', 'sns', 'attention-economy'],
      questions: [
        'つながることは、近づくことと同じなのか。',
        '情報が増えた時代に、私たちは何に注意を向けるべきか。'
      ],
      relatedNotes: ['note-04', 'note-11', 'note-17', 'note-19'],
      next: ['part3', 'part4', 'part8']
    },
    {
      id: 'part3',
      type: 'part',
      number: '03',
      title: 'AIと生きる未来',
      subtitle: 'AI革命 -- 人間に残るものは何か',
      group: '三大革命',
      era: '2022年から未来',
      color: 'part3',
      colorName: '柳',
      colorReading: 'やなぎ',
      pageUrl: 'parts/part3.html',
      youtubeUrl: 'https://youtu.be/70vHG6evr6E',
      tags: ['AI', '生成AI', 'ChatGPT', '教育', '身体性', '選択'],
      concepts: ['ai-revolution', 'generative-ai', 'chatgpt', 'human-agency'],
      questions: [
        'AIが考えているように見えるとき、人間が考えるとは何か。',
        '効率や正確さでは測れない人間の価値はどこにあるのか。'
      ],
      relatedNotes: ['note-01', 'note-03', 'note-05', 'note-07', 'note-08', 'note-09', 'note-12'],
      next: ['part8', 'part8-2', 'part5']
    },
    {
      id: 'part4',
      type: 'part',
      number: '04',
      title: '文字と知識の冒険',
      subtitle: '5000年の旅 -- 人類はどうやって知識を残してきたか',
      group: '文明の道具',
      era: '文字の発明からAIへ',
      color: 'part4',
      colorName: '常磐',
      colorReading: 'ときわ',
      pageUrl: 'parts/part4.html',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WxoHkQX1M6VJCrFKtdxXx8Z',
      thumbnailVideoId: '8dySbSKpZNU',
      tags: ['文字', '記録', '印刷', '百科全書', '検索', '知識'],
      concepts: ['writing', 'external-memory', 'printing', 'search-engine'],
      questions: [
        '知識を外に残せるようになったとき、人間の記憶はどう変わったのか。',
        '検索できることと、理解していることは同じなのか。'
      ],
      relatedNotes: ['note-13', 'note-14', 'note-15', 'note-16', 'note-18', 'note-19'],
      next: ['part5', 'part2', 'part8']
    },
    {
      id: 'part5',
      type: 'part',
      number: '05',
      title: '言葉と思考の旅',
      subtitle: '言葉は思考を作るのか、思考が言葉を作るのか',
      group: '文明の道具',
      era: '言語の起源からAI言語処理へ',
      color: 'part5',
      colorName: '青磁',
      colorReading: 'せいじ',
      pageUrl: 'parts/part5.html',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2Wz9a-nLF0FAkTgRr8km-ql8',
      thumbnailVideoId: 'gIOypSyJwMs',
      tags: ['言語', '思考', '内なる声', '抽象化', '因果', 'AI理解'],
      concepts: ['language', 'inner-voice', 'abstraction', 'causality', 'ai-language'],
      questions: [
        '言葉がない世界では、思考はどのように存在するのか。',
        'AIが言葉を扱えることは、理解していることを意味するのか。'
      ],
      relatedNotes: ['note-20', 'note-21', 'note-22', 'note-23', 'note-24', 'note-25', 'note-26', 'note-27', 'note-28', 'note-31'],
      next: ['part6', 'part4', 'part8']
    },
    {
      id: 'part6',
      type: 'part',
      number: '06',
      title: '数字と世界',
      subtitle: '数は道具か支配者か -- 人類と数の5000年',
      group: '文明の道具',
      era: '骨の刻み目から数字支配まで',
      color: 'part6',
      colorName: '浅葱',
      colorReading: 'あさぎ',
      pageUrl: 'parts/part6.html',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2Wwmx7EE_-oXyN4FOeIsbXos',
      thumbnailVideoId: 'TxDMU6SVg3o',
      tags: ['数', 'ゼロ', '統計', '予測', '平均', '評価'],
      concepts: ['number', 'zero', 'statistics', 'prediction', 'measurement'],
      questions: [
        '数は世界を見やすくしたのか、それとも世界を狭くしたのか。',
        '数字で測れるものだけが、価値あるものなのか。'
      ],
      relatedNotes: ['note-24', 'note-25', 'note-26', 'note-32', 'note-33', 'note-34', 'note-35', 'note-39', 'note-42'],
      next: ['part8-2', 'part5', 'evolution']
    },
    {
      id: 'part7',
      type: 'part',
      number: '07',
      title: '人間の前提を外す',
      subtitle: '4人の天才が外した「人間の当たり前」',
      group: '前提を超える',
      era: '20世紀の科学と計算',
      color: 'part7',
      colorName: '縹',
      colorReading: 'はなだ',
      pageUrl: 'parts/part7.html',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WxfmzrTlbDejA9E6F5NvHHf',
      thumbnailVideoId: '-j4wBrRSWWM',
      tags: ['アインシュタイン', 'ファインマン', 'チューリング', 'フォン・ノイマン', '前提'],
      concepts: ['relativity', 'quantum-thinking', 'turing-machine', 'von-neumann'],
      questions: [
        '人間の当たり前を外すと、世界はどう見え直すのか。',
        '科学者の発見は、知識の追加なのか、見方の転換なのか。'
      ],
      relatedNotes: [],
      next: ['part8', 'part3', 'evolution']
    },
    {
      id: 'part8',
      type: 'part',
      number: '08-1',
      title: 'AIと人間のあいだ',
      subtitle: '歴史 -- 生成という断層はどう生まれたか',
      group: 'いま、ここ',
      era: 'AIの歴史編',
      color: 'part8',
      colorName: '菫',
      colorReading: 'すみれ',
      pageUrl: 'parts/part8.html',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2Wx32GuS8t4vuk8_kjK_NIa5',
      thumbnailVideoId: '979DSjYsE-o',
      tags: ['生成AI', 'LLM', 'ChatGPT', 'ルールから確率へ', '生成という断層'],
      concepts: ['generative-ai', 'large-language-model', 'probability', 'ai-history'],
      questions: [
        '生成AIは、何を生成しているのか。',
        '考えているように見えることと、考えていることの違いは何か。'
      ],
      relatedNotes: ['note-01', 'note-03', 'note-05', 'note-07', 'note-08', 'note-09', 'note-40'],
      next: ['part8-2', 'part3', 'part5']
    },
    {
      id: 'part8-2',
      type: 'part',
      number: '08-2',
      title: 'AIが日常に入る日',
      subtitle: '社会 -- 生成された思考が変えるもの',
      group: 'いま、ここ',
      era: 'AIの社会編',
      color: 'part8-2',
      colorName: '紫苑',
      colorReading: 'しおん',
      pageUrl: 'parts/part8_2.html',
      playlistUrl: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyXz8T1Ig-GMnYGAK-cb2RG',
      thumbnailVideoId: '_-PsS5sdlmY',
      tags: ['AIと宿題', '学力', '教育', '共通テスト', '思考の所有'],
      concepts: ['ai-homework', 'academic-ability', 'education', 'ownership-of-thinking'],
      questions: [
        'AIが宿題を解ける時代に、学力とは何か。',
        '生成された思考を使うとき、その考えは誰のものなのか。'
      ],
      relatedNotes: ['note-08', 'note-40', 'note-41'],
      next: ['part8', 'part6', 'note']
    },
    {
      id: 'part9',
      type: 'part',
      number: '09',
      title: '身体という時間',
      subtitle: '進化の身体 -- 旧石器時代の設計で生成AI時代を生きる',
      group: '身体と進化',
      era: '700万年前から生成AI時代へ',
      color: 'part9',
      colorName: '藤紫',
      colorReading: 'ふじむらさき',
      pageUrl: 'parts/part9.html',
      tags: ['身体', '進化', '脳', '報酬系', '不安', '集中', 'AI'],
      concepts: ['body', 'evolution', 'attention-economy', 'generative-ai'],
      questions: [
        '旧石器時代の身体で、生成AI時代をどう生きるのか。',
        '情報の時間が速くなるほど、身体の時間は何を教えてくれるのか。'
      ],
      relatedNotes: ['note-68', 'note-69', 'note-70', 'note-71', 'note-72', 'note-73', 'note-74', 'note-75', 'note-76', 'note-77', 'note-78', 'note-79', 'note-80', 'note-81', 'note-82'],
      next: ['part10', 'part8-2', 'part3']
    },
    {
      id: 'part10', type: 'part', number: '10', title: '感性という深層',
      subtitle: '意味はどこから生まれるのか', group: '人間と学び', era: '進化からAI時代へ',
      color: 'part10', colorName: '撫子', colorReading: 'なでしこ', pageUrl: 'parts/part10.html',
      tags: ['感性', '意味', '共感', '芸術', 'AI'], concepts: ['emotion', 'meaning', 'empathy'],
      questions: ['感性は再現可能なのか。', '意味は作品にあるのか、体験と関係の中にあるのか。'],
      relatedNotes: [], next: ['part11', 'part9', 'part3']
    },
    {
      id: 'part11', type: 'part', number: '11', title: '人はどう学び始めるのか',
      subtitle: '学びの原型をめぐる旅', group: '人間と学び', era: '誕生から幼児期へ',
      color: 'part11', colorName: '珊瑚', colorReading: 'さんご', pageUrl: 'parts/part11.html',
      tags: ['発達', '愛着', '模倣', '遊び', '自己効力感'], concepts: ['development', 'attachment', 'play'],
      questions: ['人は、教わる前にどう学んでいるのか。', '学びの原型は、どこにあるのか。'],
      relatedNotes: [], next: ['part12', 'part10', 'part13']
    },
    {
      id: 'part12', type: 'part', number: '12', title: '人はなぜ、一人では学べないのか',
      subtitle: '対話・評価・関係の学習心理学', group: '人間と学び', era: '対話からAI学習へ',
      color: 'part12', colorName: '琥珀', colorReading: 'こはく', pageUrl: 'parts/part12.html',
      tags: ['対話', '学習心理学', 'フィードバック', 'メタ認知', 'AI'], concepts: ['dialogue', 'feedback', 'metacognition'],
      questions: ['人はなぜ、一人では届かない場所へ対話によって届くのか。', 'AIとの対話は、人間との対話と何が違うのか。'],
      relatedNotes: [], next: ['part13', 'part11', 'part8-2']
    },
    {
      id: 'part13', type: 'part', number: '13', title: '学びとは何か',
      subtitle: '人間・学校・家庭をつなぐ学びの地図', group: '人間と学び', era: '累積文化から現代教育へ',
      color: 'part13', colorName: '苔', colorReading: 'こけ', pageUrl: 'parts/part13.html',
      tags: ['学び', '累積文化', '学校', '家庭', '安全基地'], concepts: ['learning', 'culture', 'education'],
      questions: ['人はなぜ学び、なぜ学びを閉じるのか。', 'どうすれば、もう一度世界へ向かう力を取り戻せるのか。'],
      relatedNotes: [], next: ['part14', 'part12', 'part4']
    },
    {
      id: 'part14', type: 'part', number: '14', title: '地球は動いている',
      subtitle: '見方を更新する力', group: '見方を更新する', era: '古代天文学からAI時代へ',
      color: 'part14', colorName: '若竹', colorReading: 'わかたけ', pageUrl: 'parts/part14.html',
      tags: ['地動説', '観察', '証拠', '科学革命', '学び直し'], concepts: ['science', 'observation', 'paradigm'],
      questions: ['科学とは、正解を知ることなのか。', '自分の中の「天動説」は何か。'],
      relatedNotes: [], next: ['part15', 'part13', 'part7']
    },
    {
      id: 'part15', type: 'part', number: '15', title: 'それ、わかったつもりかも',
      subtitle: '答えを急ぐ時代に、考え続ける物語', group: '見方を更新する', era: 'ソクラテスからAI時代へ',
      color: 'part15', colorName: '青磁', colorReading: 'せいじ', pageUrl: 'parts/part15.html',
      tags: ['無知の知', '曖昧さ', '思考停止', 'パラダイム', 'AI'], concepts: ['critical-thinking', 'uncertainty', 'metacognition'],
      questions: ['「わかった」と「考えた」は同じなのか。', 'わからなさを抱えたまま、考え続けられるか。'],
      relatedNotes: [], next: ['part16', 'part14', 'part8']
    },
    {
      id: 'part16', type: 'part', number: '16', title: 'エネルギーと人類史',
      subtitle: '人類は何を解放してきたのか', group: '文明と未来', era: '火の獲得から核融合へ',
      color: 'part16', colorName: '瑠璃', colorReading: 'るり', pageUrl: 'parts/part16.html',
      tags: ['火', '産業革命', '電気', '太陽光', '核融合'], concepts: ['energy', 'electricity', 'future'],
      questions: ['エネルギーを得るたび、人類は何から自由になったのか。', '次に自由になるのは何か。'],
      relatedNotes: [], next: ['part15', 'part1', 'evolution']
    }
  ];

  const concepts = [
    { id: 'industrial-revolution', title: '産業革命', group: '三大革命', related: ['part1', 'part3', 'evolution'] },
    { id: 'digital-revolution', title: 'デジタル革命', group: '三大革命', related: ['part2', 'part3', 'part4'] },
    { id: 'ai-revolution', title: 'AI革命', group: '三大革命', related: ['part3', 'part8', 'part8-2'] },
    { id: 'writing', title: '文字', group: '文明の道具', related: ['part4', 'part5'] },
    { id: 'language', title: '言葉', group: '文明の道具', related: ['part5', 'part8'] },
    { id: 'number', title: '数', group: '文明の道具', related: ['part6', 'part8-2'] },
    { id: 'attention-economy', title: '注意経済', group: '現代の問い', related: ['part2', 'part8-2'] },
    { id: 'generative-ai', title: '生成AI', group: 'いま、ここ', related: ['part3', 'part8', 'part8-2'] },
    { id: 'education', title: '教育', group: 'いま、ここ', related: ['part1', 'part3', 'part8-2'] },
    { id: 'measurement', title: '測ること', group: '文明の道具', related: ['part6', 'part8-2'] }
  ];

  const notes = [
    { id: 'note-01', number: 1, title: "ChatGPTが登場するまで、人類に何があったのか。", url: "https://note.com/manabimapcreator/n/n00c3101a661e", status: "published", tags: ["生成AI","ChatGPT","教育","人類史","学び","AI"], relatedParts: ["part3","part8-2","part8","evolution"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-1.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "「なぜ学ぶのか」という問いに、うまく答えられますか？" },
    { id: 'note-02', number: 2, title: "「機械に仕事を奪われる」という恐怖は、200年前にもあった。", status: "local-draft", tags: ["産業革命","歴史","AI","教育","仕事","人類史","学び"], relatedParts: ["part1","part8-2","part8","evolution"], question: "機械は人間を何から解放し、何に縛ったのか。", relation: "機械と時間の枝道", primaryPart: "part1", excerpt: "「AIに仕事を奪われる」という言葉を、最近よく耳にします。" },
    { id: 'note-03', number: 3, title: "ChatGPTに同じことを聞くと、なぜ毎回答えが違うのか。", status: "local-draft", tags: ["生成AI","ChatGPT","検索","AI","教育","学び"], relatedParts: ["part3","part4","part8-2","part8"], question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "ChatGPTに同じ質問を2回したことはありますか？" },
    { id: 'note-04', number: 4, title: "スマホの中に、80年分の革命が詰まっている。", status: "local-draft", tags: ["デジタル革命","インターネット","歴史","テクノロジー","教育","学び","人類史"], relatedParts: ["part2","part8-2","part8","evolution"], question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "スマホを毎日使っていますか？" },
    { id: 'note-05', number: 5, title: "生成AIは、いったい何を「生成」しているのか。", url: "https://note.com/manabimapcreator/n/n05c7f8f23fc4", status: "published", date: "2026-03-23", target: "第8部第1話（前編・後編）", tags: ["第8部第1話（前編","後編）"], relatedParts: ["part8"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-5.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "タグ: #生成AI #AI #人工知能 #学び #哲学 #人類史 #教育" },
    { id: 'note-06', number: 6, title: "追い出された場所から、次の時代が生まれる。", url: "https://note.com/manabimapcreator/n/nf03fbdb50e71", status: "published", date: "2026-03-24", target: "第8部第2話「ルールから確率へ」前編・後編", tags: ["第8部第2話「ルールから確率へ」前編","後編"], relatedParts: ["part8"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-6.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "タグ: #AI #機械学習 #ディープラーニング #進化 #学び #歴史 #人類史" },
    { id: 'note-07', number: 7, title: "「わかってもらえた」は、ただの確率かもしれない", url: "https://note.com/manabimapcreator/n/n92652d8bad4c", status: "published", date: "2026-03-24", target: "第8部第3話（前編・後編）", tags: ["第8部第3話（前編","後編）"], relatedParts: ["part8"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-7.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "テスト前夜、教科書をひたすら眺めた記憶がある。" },
    { id: 'note-08', number: 8, title: "あのアイデア、本当に自分が思いついたのか", url: "https://note.com/manabimapcreator/n/n669e2df9e9e9", status: "published", date: "2026-03-24", target: "第8部第4話（前編・後編）", tags: ["第8部第4話（前編","後編）"], relatedParts: ["part8"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-8.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "会議で何かを言った。" },
    { id: 'note-09', number: 9, title: "AIに、何を問えばいいのか", url: "https://note.com/manabimapcreator/n/nb299d49cfdd2", status: "published", date: "2026-03-25", target: "第8部第5話（前編・後編）", tags: ["第8部第5話（前編","後編）"], relatedParts: ["part8"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-9.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "何かを調べようとして、検索窓の前で止まったことがある。" },
    { id: 'note-10', number: 10, title: "体の時間は、今も35億年前のままだ", url: "https://note.com/manabimapcreator/n/n1195ea4b52e4", status: "published", date: "2026-03-25", target: "第1部「蒸気の時代」", tags: ["第1部「蒸気の時代」"], relatedParts: ["part1"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-10.png", question: "機械は人間を何から解放し、何に縛ったのか。", relation: "機械と時間の枝道", primaryPart: "part1", excerpt: "休日の朝、目覚ましをかけ忘れた。" },
    { id: 'note-11', number: 11, title: "世界はつながったのに、なぜ孤独なのか", url: "https://note.com/manabimapcreator/n/nbf644c80243f", status: "published", date: "2026-03-26", target: "第2部「つながる世界」", tags: ["第2部「つながる世界」"], relatedParts: ["part2"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-11.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "スマホを開けば、誰かの近況が流れてくる。" },
    { id: 'note-12', number: 12, title: "記憶の中の人は、いつ「消える」のか", url: "https://note.com/manabimapcreator/n/nc670691839e8", status: "published", date: "2026-03-28", target: "第3部「AIと生きる未来」", tags: ["第3部「AIと生きる未来」"], relatedParts: ["part3","part8"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-12.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "ふとした瞬間に、思い出す。" },
    { id: 'note-13', number: 13, title: "「AIを使うと考えなくなる」——ソクラテスも、2400年前に言っていた", url: "https://note.com/manabimapcreator/n/n3446a5ccce61", status: "published", date: "2026-03-30", target: "第4部第1話（前編・後編）", tags: ["第4部第1話（前編","後編）"], relatedParts: ["part4"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-13.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「AIを使うと、考えなくなる」" },
    { id: 'note-14', number: 14, title: "なぜ人は、石に印をつけずにいられなかったのか", url: "https://note.com/manabimapcreator/n/n1e582531d82f", status: "published", date: "2026-03-31", target: "第4部第2話（前編・後編）", tags: ["第4部第2話（前編","後編）"], relatedParts: ["part4"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-14.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "スマホを開くと、文字より先に絵文字を選んでいる自分がいます。" },
    { id: 'note-15', number: 15, title: "「読む楽しみ」は、いつ誰のものになったのか", url: "https://note.com/manabimapcreator/n/n9c00c715d369", status: "published", date: "2026-04-02", target: "第4部第3話（前編・後編）", tags: ["第4部第3話（前編","後編）"], relatedParts: ["part4"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-15.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "今日、本を読みたいと思えば、すぐ読めます。" },
    { id: 'note-16', number: 16, title: "「知りたい」と思った瞬間、それは誰かが作った道かもしれない", url: "https://note.com/manabimapcreator/n/naecb9a6237db", status: "published", date: "2026-04-02", target: "第4部第4話（前編・後編）", tags: ["第4部第4話（前編","後編）"], relatedParts: ["part4"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-16.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "何かを調べていると、気づくと別のことが知りたくなっている。" },
    { id: 'note-17', number: 17, title: "6,350トンのケーブルが運んだのは、何グラムの情報だったか", url: "https://note.com/manabimapcreator/n/n8a3b5689ab7f", status: "published", date: "2026-04-03", target: "第4部第5話（前編・後編）", tags: ["第4部第5話（前編","後編）"], relatedParts: ["part4"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-17.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "LINEで写真を送っても、手元の写真は消えない。" },
    { id: 'note-18', number: 18, title: "本を途中から読むと、なぜか罪悪感がある", url: "https://note.com/manabimapcreator/n/nb1531205470c", status: "published", date: "2026-04-04", target: "第4部第6話（前編・後編）", tags: ["第4部第6話（前編","後編）"], relatedParts: ["part4"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-18.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "本を手に取るとき、自然と1ページ目を開く。" },
    { id: 'note-19', number: 19, title: "人は世界を同じように捉えている？", url: "https://note.com/manabimapcreator/n/n3f2187946e15", status: "published", date: "2026-04-05", target: "第4部第7話（前編・後編）", tags: ["第4部第7話（前編","後編）"], relatedParts: ["part4"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-19.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "今朝、道を歩きながら、気がつけば花を探していました。" },
    { id: 'note-20', number: 20, title: "音はずっとあった。では、いつ「意味」になったのか。", url: "https://note.com/manabimapcreator/n/n5556f35e43b5", status: "published", date: "2026-04-06", target: "第5部第1話（前編・後編）", tags: ["第5部第1話（前編","後編）"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-20.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "赤ちゃんは泣く。鳥は鳴く。犬は吠える。" },
    { id: 'note-21', number: 21, title: "名前をつける前、世界はひとつながりだった。", url: "https://note.com/manabimapcreator/n/n1cc11159159c", status: "published", date: "2026-04-06", target: "第5部第1話（前編・後編）続編テーマ", tags: ["第5部第1話（前編","後編）続編テーマ"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-21.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "赤ちゃんが生まれた瞬間、親が最初にすることがある。" },
    { id: 'note-22', number: 22, title: "人類最古の名前は、英雄のものではなかった。", url: "https://note.com/manabimapcreator/n/nd91398b2e60b", status: "published", date: "2026-04-06", target: "第5部第1話（前編・後編）続々編テーマ", tags: ["第5部第1話（前編","後編）続々編テーマ"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-22.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "5000年後に、あなたの名前だけが残るとしたら。" },
    { id: 'note-23', number: 23, title: "頭の中で、あなたは誰と話しているのか", url: "https://note.com/manabimapcreator/n/n180a0b52e8f6", status: "published", date: "2026-04-10", target: "第5部第2話（前編・後編）", tags: ["第5部第2話（前編","後編）"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-23.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "考えるとき、全部声に出す人がいます。" },
    { id: 'note-24', number: 24, title: "数の言葉を持たない民族が、いた", url: "https://note.com/manabimapcreator/n/n11ad03fc63ef", status: "published", date: "2026-04-11", target: "第5部第3話（前編・後編）", tags: ["第5部第3話（前編","後編）"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-24.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "スーパーのレジで、小銭を数えました。" },
    { id: 'note-25', number: 25, title: "棒の刻み目で、帝国は動いていた", url: "https://note.com/manabimapcreator/n/nac7c30f224ac", status: "published", date: "2026-04-11", target: "第5部第3話（前編・後編）", tags: ["第5部第3話（前編","後編）"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-25.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "毎月、給与明細が届きます。" },
    { id: 'note-26', number: 26, title: "神社に数学を奉納した民族がいた", url: "https://note.com/manabimapcreator/n/n3103a25ac2c4", status: "published", date: "2026-04-11", target: "第5部第3話テーマ（数・抽象化）フリースタンディング", tags: ["第5部第3話テーマ（数","抽象化）フリースタンディング"], relatedParts: ["part5","part6"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-26.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "数学の授業で、問題が解けた瞬間が好きでした。" },
    { id: 'note-27', number: 27, title: "「なぜ？」は、もともと逃げるためにあった", url: "https://note.com/manabimapcreator/n/n89c60fb760af", status: "published", date: "2026-04-12", target: "第5部第4話（前編・後編）", tags: ["第5部第4話（前編","後編）"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-27.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "子どもが「なぜ？」を繰り返す時期がある。" },
    { id: 'note-28', number: 28, title: "言語は、思考の牢獄か。それとも窓か", url: "https://note.com/manabimapcreator/n/n253a052aba94", status: "published", date: "2026-04-14", target: "第5部第5話（前編・後編）", tags: ["第5部第5話（前編","後編）"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-28.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "虹は、何色でしょう。" },
    { id: 'note-29', number: 29, title: "完璧に答えられる人が、何もわかっていないとしたら", url: "https://note.com/manabimapcreator/n/nd2075692b089", status: "published", date: "2026-04-15", target: "第5部第6話（前編・後編）", tags: ["第5部第6話（前編","後編）"], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-29.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "音読の宿題を、声に出して読んだことがあります。" },
    { id: 'note-30', number: 30, title: "すべての答えが手に入る時代に、「問い」だけを届けるコンテンツを始めた", url: "https://note.com/manabimapcreator/n/nb43ff699126c", status: "published", date: "2026-04-16", target: "コンクール作品「#AIと始めてみた」（Google Gemini × note）", tags: ["Gemini","note）"], relatedParts: ["part8","note"], image: "note_articles/generated_note_images/note-30.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "何か知りたいことがあれば、YouTubeを開けばいい。" },
    { id: 'note-31', number: 31, title: "学べば学ぶほど、知らないことが増えていく", url: "https://note.com/manabimapcreator/n/n5796b158faa3", status: "published", date: "2026-04-17", target: "第5部第7話「言葉は思考の翼」（エピローグ）", tags: [], relatedParts: ["part5"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc", image: "note_articles/generated_note_images/note-31.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "AIを使ってみようと思った。" },
    { id: 'note-32', number: 32, title: "数える力は、生まれ持ったものだろうか", url: "https://note.com/manabimapcreator/n/na8308189337b", status: "published", date: "2026-04-18", target: "第6部第1話（前編・後編）", tags: ["第6部第1話（前編","後編）"], relatedParts: ["part6"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp", image: "note_articles/generated_note_images/note-32.png", question: "数字で測れるものだけが、価値あるものなのか。", relation: "数と社会の枝道", primaryPart: "part6", excerpt: "日本語で何かを数えるとき、言葉が変わります。" },
    { id: 'note-33', number: 33, title: "数は、指を離れてどこへ行ったのか", url: "https://note.com/manabimapcreator/n/n387ce13418ba", status: "published", date: "2026-04-19", target: "第6部第2話（前編・後編）", tags: ["第6部第2話（前編","後編）"], relatedParts: ["part6"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp", image: "note_articles/generated_note_images/note-33.png", question: "数字で測れるものだけが、価値あるものなのか。", relation: "数と社会の枝道", primaryPart: "part6", excerpt: "数えるとき、あなたは指を使いますか。" },
    { id: 'note-34', number: 34, title: "数が指を離れた夜、無限が生まれた", url: "https://note.com/manabimapcreator/n/n4da46f1a9bde", status: "published", date: "2026-04-19", target: "第6部第3話（前編・後編）", tags: ["第6部第3話（前編","後編）"], relatedParts: ["part6"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp", image: "note_articles/generated_note_images/note-34.png", question: "数字で測れるものだけが、価値あるものなのか。", relation: "数と社会の枝道", primaryPart: "part6", excerpt: "ある数学者が、新しい数を発見した。" },
    { id: 'note-35', number: 35, title: "計算が生まれた日、人類は「試す」のをやめた", url: "https://note.com/manabimapcreator/n/n9a89ce1888e3", status: "published", date: "2026-04-20", target: "第6部第4話（前編・後編）", tags: ["第6部第4話（前編","後編）"], relatedParts: ["part6"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp", image: "note_articles/generated_note_images/note-35.png", question: "数字で測れるものだけが、価値あるものなのか。", relation: "数と社会の枝道", primaryPart: "part6", excerpt: "コロンブスは、計算を間違えてインドへ向かった。" },
    { id: 'note-37', number: 37, title: "プロンプトを書くことが、デザインになった──GeminiでYouTube・noteのサムネをつくる", url: "https://note.com/manabimapcreator/n/n90cb4cd059df", status: "published", date: "2026-04-21", target: "Geminiサムネ制作プロセス紹介 → ManabiMapサイト紹介", tags: ["Geminiサムネ制作プロセス紹介","ManabiMapサイト紹介"], relatedParts: ["note"], image: "note_articles/generated_note_images/note-37.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "YouTubeのサムネイルは、誰が作るのでしょう。" },
    { id: 'note-38', number: 38, title: "「学びの種」をまく仕事——教育20年目に、生成AIが変えたもの", url: "https://note.com/manabimapcreator/n/nf61a2cb5617d", status: "published", date: "2026-04-21", target: "制作者の個人視点 × 教育20年 × 生成AI × ManabiMap", tags: ["制作者の個人視点","教育20年","生成AI","ManabiMap"], relatedParts: ["part3","part8-2","part8","note"], image: "note_articles/generated_note_images/note-38.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "C# note38｜「学びの種」をまく仕事——教育20年目に、生成AIが変えたもの" },
    { id: 'note-39', number: 39, title: "誰も「平均人」ではなかった。", url: "https://note.com/manabimapcreator/n/n75ad2b140de4", status: "published", date: "2026-04-22", target: "第6部第5話（前編・後編）", tags: ["第6部第5話（前編","後編）"], relatedParts: ["part6"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp", image: "note_articles/generated_note_images/note-39.png", question: "数字で測れるものだけが、価値あるものなのか。", relation: "数と社会の枝道", primaryPart: "part6", excerpt: "テストを返されたとき、最初に何を探しますか。" },
    { id: 'note-40', number: 40, title: "「内から生まれた言葉」とは、何だろう", url: "https://note.com/manabimapcreator/n/n10281e399b72", status: "published", date: "2026-04-25", target: "第8部第6話（前編・後編）", tags: ["第8部第6話（前編","後編）"], relatedParts: ["part8"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-40.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "ある記事が目に入った。" },
    { id: 'note-41', number: 41, title: "テストで高得点を取ると、幸せになれるのか", url: "https://note.com/manabimapcreator/n/ndc68c0112605", status: "published", date: "2026-04-25", target: "第8部第8話「共通テストの衝撃」前編・後編", tags: ["学力テスト","幸福度","点数主義","日本の教育","教育の問い","エビデンス","共通テストの衝撃","AI時代の教育","ウェルビーイング","自己決定","教育改革","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part6","part8-2","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-41.png", question: "数字で測れるものだけが、価値あるものなのか。", relation: "数と社会の枝道", primaryPart: "part6", excerpt: "「いい点を取れ。」" },
    { id: 'note-42', number: 42, title: "あなたを測る物差しは、誰が作ったのか", url: "https://note.com/manabimapcreator/n/n6c7f5847c20c", status: "published", date: "2026-04-26", target: "第6部第6話（前編・後編）", tags: ["第6部第6話（前編","後編）"], relatedParts: ["part6"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp", image: "note_articles/generated_note_images/note-42.png", question: "数字で測れるものだけが、価値あるものなのか。", relation: "数と社会の枝道", primaryPart: "part6", excerpt: "今日、何かで測られましたか。" },
    { id: 'note-43', number: 43, title: "AIが東大首席を超えた日に、何が終わったのか", url: "https://note.com/manabimapcreator/n/n79167fdcd136", status: "published", date: "2026-04-28", target: "第8部第8話「共通テストの衝撃」前編・後編", tags: ["東大入試","AI受験","共通テスト","知識の限界","AI時代の教育","受験勉強","教育の問い","学力とは何か","問いを立てる力","これからの学び","教育改革","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part4","part8-2","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-43.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「ここ、出るよ。ちゃんと覚えてきなさい。」" },
    { id: 'note-44', number: 44, title: "知れば知るほど、「わからない」が増えるのはなぜか", url: "https://note.com/manabimapcreator/n/nfd9d525140fc", status: "published", date: "2026-04-29", target: "第6部第7話（エピローグ）世界の輪郭", tags: ["知識の地平線","無知の知","ソクラテス","ニュートン","学べば学ぶほど","わからないが増える","学ぶとはなにか","問いを立てる力","好奇心","哲学","数字の歴史","AI時代の学び","これからの教育","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part4","part6","part8-2","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp", image: "note_articles/generated_note_images/note-44.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "勉強すると、わかることが増えるはずです。" },
    { id: 'note-45', number: 45, title: "「覚えなくていい」時代に、なぜ覚えることに意味があるのか", url: "https://note.com/manabimapcreator/n/n4e98d260513a", status: "published", date: "2026-04-30", target: "第8部第6話「宿題の違和感」前編・後編", tags: ["暗記の意味","チェス名人実験","認知科学","パターン認識","暗黙知","タシットナレッジ","覚えることの意味","AI時代の学び","学力とは何か","基礎知識","脳と学習","ロンドンタクシー","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part4","part8-2","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-45.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「わからなかったら調べればいい。」" },
    { id: 'note-46', number: 46, title: "東大入試がAIに超えられた日に、見えなかった問い", url: "https://note.com/manabimapcreator/n/n39e9e74b774f", status: "published", date: "2026-04-30", target: "第8部第8話「共通テストの衝撃」前編・後編", tags: ["東大入試","AI受験","学力とは何か","チェス名人","パターン認識","暗黙知","AI時代の教育","測られない知識","これからの学び","教育の問い","共通テスト","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part4","part8-2","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-46.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「AIが東大首席を超えた」という知らせは、あっという間に広まりました。" },
    { id: 'note-47', number: 47, title: "あなたの見ている世界は、知識で作られている", url: "https://note.com/manabimapcreator/n/n0a0c56f8f5b9", status: "published", date: "2026-05-03", target: "第8部第7話「学力とは何か」前編・後編", tags: ["知識","思考","言語と思考","世界の見え方","認知科学","ピダハン族","バートレット","スキーマ理論","知覚と認識","学力とは何か","知ることの意味","AI時代の学び","哲学","教育","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part4","part5","part8-2","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-47.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "今、あなたがこの文章を「文字」として読めているのは、なぜでしょうか。" },
    { id: 'note-48', number: 48, title: "「腑に落ちる」は、なぜ身体の言葉なのか", url: "https://note.com/manabimapcreator/n/n0c64a3eeb6f8", status: "published", tags: ["学び","教育","AI","認知科学","身体化認知","思考","宿題"], relatedParts: ["part5","part8-2","part8"], image: "note_articles/generated_note_images/note-48.png", question: "言葉がない世界では、思考はどのように存在するのか。", relation: "言葉と思考の枝道", primaryPart: "part5", excerpt: "「腑に落ちる」という言葉があります。" },
    { id: 'note-49', number: 49, title: "「時間を売る」という生き方は、いつ始まったのか", url: "https://note.com/manabimapcreator/n/nc6fbb07c59f0", status: "published", date: "2026-05-05", target: "第1部ポッドキャスト「産業革命の深層」(#1P)", tags: [], relatedParts: ["part1"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-49.png", question: "機械は人間を何から解放し、何に縛ったのか。", relation: "機械と時間の枝道", primaryPart: "part1", excerpt: "今日も、何時間か働きました。" },
    { id: 'note-50', number: 50, title: "アイデアは、時代が来なければ存在しないのか", url: "https://note.com/manabimapcreator/n/n2ddcdbff48a1", status: "published", date: "2026-05-07", target: "第2部ポッドキャスト「つながる世界の深層」", tags: [], relatedParts: ["part2"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-50.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "今日も、スマホを開きました。" },
    { id: 'note-51', number: 51, title: "知識を手放すと、何が生まれるのか", url: "https://note.com/manabimapcreator/n/n36485a76557b", status: "published", date: "2026-05-08", target: "第2部ポッドキャスト「つながる世界の深層」", tags: [], relatedParts: ["part2"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-51.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "今日も、ウェブを使いました。" },
    { id: 'note-52', number: 52, title: "核攻撃に耐えるために作られたネットワークが、世界をつないだ", url: "https://note.com/manabimapcreator/n/nfa68c46c8c7b", status: "published", date: "2026-05-09", target: "第2部ポッドキャスト「つながる世界の深層」", tags: [], relatedParts: ["part2"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-52.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "今日も、LINEでメッセージを送りました。" },
    { id: 'note-53', number: 53, title: "思い出すことと、覚えていたと気づくことは、同じではない", url: "https://note.com/manabimapcreator/n/n913eb6b8fce3", status: "published", date: "2026-05-10", target: "第8部第6話「宿題の違和感」（note_45へのコメントから広がった視点）", tags: ["記憶","メタ認知","思い出す","学びとは何か","AI時代の学び","哲学","プラトン","アリストテレス","プルースト","ベルクソン","想起","無意志的記憶","アナムネーシス","知識とは何か","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part4","part8-2","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC", image: "note_articles/generated_note_images/note-53.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「それ知ってる。」とつぶやく瞬間がある。" },
    { id: 'note-54', number: 54, title: "自信満々な答えが、一番危ない", url: "https://note.com/manabimapcreator/n/n241de742032b", status: "published", kind: "wonder-note", date: "2026-05-11", target: "第3部ポッドキャスト「AIの深層」", tags: ["ハルシネーション","AI","生成AI","ChatGPT","ダニングクルーガー効果","認知バイアス","確信","批判的思考","AI時代の学び","瀉血","歴史","人類史","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part3","part5","part8","note","evolution"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-54.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "AIは嘘をつく。" },
    { id: 'note-55', number: 55, title: "人間はなぜ、機械に心を見てしまうのか", url: "https://note.com/manabimapcreator/n/n9c5639b060d9", status: "published", kind: "wonder-note", date: "2026-05-12", target: "第3部ポッドキャスト「AIの深層」", tags: ["擬人化","ELIZA","アニミズム","AI","生成AI","エージェント検知","心","人間の本質","パレイドリア","火星の顔","人類史","認知科学","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part3","part8","note","evolution"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-55.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "掃除ロボット「ルンバ」を使っている人の多くが、" },
    { id: 'note-56', number: 56, title: "公平に見える技術が、不平等を増幅するとき", url: "https://note.com/manabimapcreator/n/nb4a769d41cde", status: "published", kind: "wonder-note", date: "2026-05-13", target: "第3部ポッドキャスト「AIの深層」", tags: ["AIバイアス","差別","公平性","コダック","シャーリーカード","IQテスト","メルカトル図法","AI倫理","技術と社会","データバイアス","人類史","歴史","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part3","part8","note","evolution"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-56.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "コンピュータは、感情も偏見も持っていない。" },
    { id: 'note-57', number: 57, title: "技術への熱狂と失望は、なぜ繰り返されるのか", url: "https://note.com/manabimapcreator/n/nbc4d04b2a362", status: "published", kind: "wonder-note", date: "2026-05-14", target: "第3部ポッドキャスト「AIの深層」", tags: ["AI歴史","AIの冬","ペルセプトロン","チューリップバブル","ドットコムバブル","技術革新","熱狂と失望","生成AI","ChatGPT","テクノロジー","人類史","バブル","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part3","part8","note","evolution"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-57.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "AIの歴史は70年近くあります。" },
    { id: 'note-58', number: 58, title: "AIは失敗しても傷つかない。それが何を意味するのか", url: "https://note.com/manabimapcreator/n/nd5048b4aae02", status: "published", kind: "wonder-note", date: "2026-05-15", target: "第3部ポッドキャスト「AIの深層」", tags: ["ミラーニューロン","共感","AI","痛み","信頼","共感的苦痛","人間の本質","AI研究","神経科学","リスク","決断","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part3","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-58.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "AIはどれだけ間違えても、傷つきません。" },
    { id: 'note-59', number: 59, title: "記号を正しく処理することと、意味を理解することは同じか", url: "https://note.com/manabimapcreator/n/n4e81df22c5ca", status: "published", kind: "wonder-note", date: "2026-05-16", target: "第3部ポッドキャスト「AIの深層」", tags: ["中国語の部屋","ジョンサール","AI","理解","意識","哲学","バベルの塔","翻訳","言語","生成AI","人工知能","認知科学","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part3","part5","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-59.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "「正しい答えを出す」ことと、「わかっている」ことは同じでしょうか。" },
    { id: 'note-60', number: 60, title: "AIには「なぜやるか」がない。それは何を意味するのか", url: "https://note.com/manabimapcreator/n/na8ce3499e02c", status: "published", kind: "wonder-note", date: "2026-05-18", target: "第3部ポッドキャスト「AIの深層」", tags: ["意味への意志","フランクル","ラスコー洞窟","AI","創造性","動機","ウィリアムモリス","アーツアンドクラフツ","人間の本質","生きる意味","生成AI","哲学","ハルとおじいさん","学びの地図","ManabiMap"], relatedParts: ["part3","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur", image: "note_articles/generated_note_images/note-60.png", question: "AIが考えているように見えるとき、人間が考えるとは何か。", relation: "AIと人間の枝道", primaryPart: "part3", excerpt: "AIは絵を描けます。音楽を作れます。文章を書けます。" },
    { id: 'note-61', number: 61, title: "「ニュース」という概念は、電信が発明した", url: "https://note.com/manabimapcreator/n/n2c3c08ed828d", status: "published", kind: "wonder-note", date: "2026-05-19", target: "第4部ポッドキャスト #4P-4「情報が光速になった日」", tags: ["電信","ニュース","情報","ロイター通信","モールス","メディア史","通信革命","知識の拡散","ハルとおじいさん","学びの地図","ManabiMap","ポッドキャスト","歴史","AI","情報化社会"], relatedParts: ["part2","part4","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-61.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "今朝、スマホを開いてニュースを確認しましたか。" },
    { id: 'note-62', number: 62, title: "歴史的な最初のひとことは、なぜ詩のようになるのか", url: "https://note.com/manabimapcreator/n/ne7eb5d01b414", status: "published", kind: "wonder-note", date: "2026-05-20", target: "第4部ポッドキャスト #4P-4「情報が光速になった日」", tags: ["モールス","電信","電話","ベル","最初の言葉","歴史","アームストロング","通信革命","始まり","言葉","ハルとおじいさん","学びの地図","ManabiMap","ポッドキャスト","知識の拡散"], relatedParts: ["part2","part4","part5","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-62.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "1844年。モールスが電信で送った最初の言葉は、こうでした。" },
    { id: 'note-63', number: 63, title: "情報が早く届くと、何かが消える", url: "https://note.com/manabimapcreator/n/n288b8bb7c3d1", status: "published", kind: "wonder-note", date: "2026-05-21", target: "第4部ポッドキャスト #4P-4「情報が光速になった日」", tags: ["電信","情報格差","ロスチャイルド","情報革命","通信","情報非対称性","歴史","テクノロジー","知識の拡散","ハルとおじいさん","学びの地図","ManabiMap","ポッドキャスト","経済史","インターネット"], relatedParts: ["part2","part4","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-63.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "ある情報を、誰より先に持っていたことがありますか。" },
    { id: 'note-64', number: 64, title: "新しいメディアが来るたびに、自由と支配が同時に生まれる", url: "https://note.com/manabimapcreator/n/n3b3fee4a92da", status: "published", kind: "wonder-note", date: "2026-05-22", target: "第4部ポッドキャスト #4P-4「情報が光速になった日」", tags: ["ラジオ","プロパガンダ","印刷革命","グーテンベルク","ルーズベルト","ナチス","インターネット","SNS","フェイクニュース","メディア史","ハルとおじいさん","学びの地図","ManabiMap","ポッドキャスト","知識の拡散"], relatedParts: ["part2","part4","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-64.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "SNSで「真実が広まった」と感じたことがありますか。" },
    { id: 'note-65', number: 65, title: "「メディアはメッセージだ」って、どういう意味だろう", url: "https://note.com/manabimapcreator/n/n8f039dbed2a9", status: "published", kind: "wonder-note", date: "2026-05-23", target: "第4部ポッドキャスト #4P-4「情報が光速になった日」", tags: ["マクルーハン","メディア論","メディアはメッセージ","ケネディ","ニクソン","テレビ討論","スマホ","AI","コミュニケーション","メディア史","ハルとおじいさん","学びの地図","ManabiMap","ポッドキャスト","知識の拡散"], relatedParts: ["part4","part8","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-65.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「明日、会えますか」" },
    { id: 'note-66', number: 66, title: "海の底のケーブルが、戦争の最初の標的になった", url: "https://note.com/manabimapcreator/n/na05fe2ac4e9a", status: "published", kind: "wonder-note", date: "2026-05-24", target: "第4部ポッドキャスト #4P-4「情報が光速になった日」", tags: ["海底ケーブル","電信","大西洋横断","第一次世界大戦","タイタニック","イギリス帝国","インターネット","地政学","通信インフラ","情報支配","ハルとおじいさん","学びの地図","ManabiMap","ポッドキャスト","知識の拡散"], relatedParts: ["part2","part4","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-66.png", question: "つながることは、近づくことと同じなのか。", relation: "つながりと思考の枝道", primaryPart: "part2", excerpt: "今日も、あなたのメッセージは海の底を通っています。" },
    { id: 'note-67', number: 67, title: "7億人が同じ瞬間を見た", url: "https://note.com/manabimapcreator/n/n62858ab06d94", status: "published", kind: "wonder-note", date: "2026-05-25", target: "第4部ポッドキャスト #4P-4「情報が光速になった日」", tags: ["アポロ11号","月面着陸","テレビ","共有体験","ラジオ","ルーズベルト","ケネディ","国民","放送","メディア史","ハルとおじいさん","学びの地図","ManabiMap","ポッドキャスト","知識の拡散"], relatedParts: ["part4","note"], relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", image: "note_articles/generated_note_images/note-67.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "1969年7月20日。" },
    { id: 'note-68', number: 68, title: "366万年前、誰かが誰かの足跡を踏んで歩いた", url: "https://note.com/manabimapcreator/n/n44fbd14a1133", status: "published", kind: "wonder-note", date: "2026-07-04", target: "第9部第1話「二足歩行という革命」", tags: ["第9部第1話「二足歩行という革命」"], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=ntz9H4H2P_8", relatedYouTubeUrl: "https://www.youtube.com/watch?v=ntz9H4H2P_8", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-68.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "歩いているとき、足元を意識することはほとんどありません。" },
    { id: 'note-69', number: 69, title: "石を割り始める前に、頭の中に完成形があった", url: "https://note.com/manabimapcreator/n/n340a71ee6a7c", status: "published", kind: "wonder-note", date: "2026-07-05", target: "第9部第2話「手と道具」", tags: ["第9部第2話「手と道具」"], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=rd2EIzy0YpE", relatedYouTubeUrl: "https://www.youtube.com/watch?v=rd2EIzy0YpE", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-69.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "ペンを持つとき、包丁を使うとき、スマートフォンを開くとき。" },
    { id: 'note-70', number: 70, title: "150人を超えると、何かが壊れる", url: "https://note.com/manabimapcreator/n/n06136710b43d", status: "published", kind: "wonder-note", date: "2026-07-06", target: "第9部第3話「脳はなぜ大きくなったか」", tags: [], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=VlhvEkIYyik", relatedYouTubeUrl: "https://www.youtube.com/watch?v=VlhvEkIYyik", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-70.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "フォロワーが増えるほど、なぜか孤独になる。" },
    { id: 'note-71', number: 71, title: "欲望が止まらないのは、設計通りだった", url: "https://note.com/manabimapcreator/n/n4150d951806c", status: "published", kind: "wonder-note", date: "2026-07-07", target: "第9部第5話「報酬系の設計」", tags: ["第9部第5話「報酬系の設計」"], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=MXHFv-C1UYA", relatedYouTubeUrl: "https://www.youtube.com/watch?v=MXHFv-C1UYA", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-71.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "お腹いっぱいなのに、まだ食べたくなる。" },
    { id: 'note-72', number: 72, title: "悪いニュースが良いニュースより速く伝わるのは、なぜだろう", url: "https://note.com/manabimapcreator/n/n26becf1636e9", status: "published", kind: "wonder-note", date: "2026-07-08", target: "第9部第6話「恐怖と不安」", tags: ["第9部第6話「恐怖と不安」"], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=kr9edRMXVbA", relatedYouTubeUrl: "https://www.youtube.com/watch?v=kr9edRMXVbA", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-72.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "友達の悪い噂は、良い噂よりずっと速く広まる。" },
    { id: 'note-73', number: 73, title: "「仲間」と「よそ者」を決めているのは、何だろう", url: "https://note.com/manabimapcreator/n/n53ac42f4334d", status: "published", kind: "wonder-note", date: "2026-07-09", target: "第9部第7話「集団本能」", tags: ["第9部第7話「集団本能」"], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=IhYS6kPtXa8", relatedYouTubeUrl: "https://www.youtube.com/watch?v=IhYS6kPtXa8", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-73.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "同じチームのユニフォームを見ると、なぜか親しみがわく。" },
    { id: 'note-74', number: 74, title: "なぜ「あとで読もう」は、いつも実行されないのか", url: "https://note.com/manabimapcreator/n/nfe2d23c6c103", status: "published", kind: "wonder-note", date: "2026-07-10", target: "第9部第8話「即時報酬の罠」", tags: ["第9部第8話「即時報酬の罠」"], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=DvWh6OPdswA", relatedYouTubeUrl: "https://www.youtube.com/watch?v=DvWh6OPdswA", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-74.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "「あとで読む」ボタンを押した記事が、いつまでも読まれないまま積み上がっている。" },
    { id: 'note-75', number: 75, title: "江戸時代の人の一生分を、一日で処理している", url: "https://note.com/manabimapcreator/n/ncaa5ee5118b9", status: "published", kind: "wonder-note", date: "2026-07-11", target: "第9部第9話「情報過多という異常環境」", tags: [], relatedParts: ["part9"], relatedPodcastUrl: "https://www.youtube.com/watch?v=0PlxsWr88Sg", relatedYouTubeUrl: "https://www.youtube.com/watch?v=0PlxsWr88Sg", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-75.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "何もしていないのに疲れた、という感覚はないでしょうか。" },
    { id: 'note-76', number: 76, title: "言葉より先に、目があった", url: "https://note.com/manabimapcreator/n/n79930d0372a6", status: "published", kind: "wonder-note", date: "2026-07-12", target: "第9部第4話「言語以前の身体」", tags: ["第9部第4話「言語以前の身体」"], relatedParts: ["part9","part5"], image: "note_articles/generated_note_images/note-76.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "目が合うと、何かが伝わる気がする。" },
    { id: 'note-77', number: 77, title: "マルチタスクが得意な人ほど、実は苦手だった", url: "https://note.com/manabimapcreator/n/nb7f1080a785c", status: "published", kind: "wonder-note", date: "2026-07-13", target: "第9部第10話「集中という希少資源」", tags: ["第9部第10話「集中という希少資源」"], relatedParts: ["part9"], image: "note_articles/generated_note_images/note-77.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "複数のことを同時にこなす「マルチタスク」。" },
    { id: 'note-78', number: 78, title: "写真を撮るほど、あのときが遠くなる", url: "https://note.com/manabimapcreator/n/n36dc4f42914f", status: "published", kind: "wonder-note", date: "2026-07-14", target: "第9部第11話「身体と時間」", tags: ["第9部第11話「身体と時間」"], relatedParts: ["part9"], image: "note_articles/generated_note_images/note-78.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "旅行や思い出の場所に行くとき、とにかく写真を撮る。" },
    { id: 'note-79', number: 79, title: "痛みがなければよかった、は本当のことだろうか", url: "https://note.com/manabimapcreator/n/n08419cb73fd8", status: "published", kind: "wonder-note", date: "2026-07-15", target: "第9部第12話「痛みと意味」", tags: ["第9部第12話「痛みと意味」"], relatedParts: ["part9"], image: "note_articles/generated_note_images/note-79.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "転んだとき、歯が痛いとき、誰かに傷つけられたとき。" },
    { id: 'note-80', number: 80, title: "昔聴いた音楽が今も特別なのは、脳が記憶しているからではない", url: "https://note.com/manabimapcreator/n/n94df5d69bd5b", status: "published", kind: "wonder-note", date: "2026-07-16", target: "第9部第13話「感性とは何か」", tags: ["第9部第13話「感性とは何か」"], relatedParts: ["part9"], image: "note_articles/generated_note_images/note-80.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "昔よく聴いていた曲がシャッフルで流れてきた瞬間、" },
    { id: 'note-81', number: 81, title: "「平均的な人間」は、一人も存在しなかった", url: "https://note.com/manabimapcreator/n/n4f44c06731f4", status: "published", kind: "wonder-note", date: "2026-07-17", target: "第9部第14話「身体を持つという条件」", tags: [], relatedParts: ["part9"], image: "note_articles/generated_note_images/note-81.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "平均身長。平均体重。平均体温。" },
    { id: 'note-82', number: 82, title: "生物進化は止まった。でも人類の変化は止まらない", url: "https://note.com/manabimapcreator/n/na14600b1a6bc", status: "published", kind: "wonder-note", date: "2026-07-18", target: "第9部第15話「進化は止まらない」", tags: ["第9部第15話「進化は止まらない」"], relatedParts: ["part9","evolution"], image: "note_articles/generated_note_images/note-82.png", question: "旧石器時代の身体で、生成AI時代をどう生きるのか。", relation: "身体と進化の枝道", primaryPart: "part9", excerpt: "スマートフォンが世界に普及するまで、10年かかりませんでした。" },
    { id: 'note-83', number: 83, title: "光より速く伝えようとした人たちがいた", url: "https://note.com/manabimapcreator/n/n5671d4d69799", status: "published", kind: "wonder-note", date: "2026-05-26", target: "第4部第5話・第6話関連（1週間企画 Day 1）", tags: ["第4部第5話","第6話関連（1週間企画","Day","1）"], relatedParts: ["part4"], relatedPodcastId: "podcast-part4-05", relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", relatedYouTubeId: "youtube-part4", relatedYouTubeUrl: "https://www.youtube.com/watch?v=8dySbSKpZNU", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-83.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "電気が来る前の話です。" },
    { id: 'note-84', number: 84, title: "点と線に変えたとき、消えたものがある", url: "https://note.com/manabimapcreator/n/n96313f2cf73c", status: "published", kind: "wonder-note", date: "2026-05-27", target: "第4部第5話・第6話関連（1週間企画 Day 2）", tags: ["第4部第5話","第6話関連（1週間企画","Day","2）"], relatedParts: ["part4"], relatedPodcastId: "podcast-part4-05", relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", relatedYouTubeId: "youtube-part4", relatedYouTubeUrl: "https://www.youtube.com/watch?v=8dySbSKpZNU", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-84.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「今、大丈夫？」" },
    { id: 'note-85', number: 85, title: "大西洋ケーブルが世界の「値段」を揃えた日", url: "https://note.com/manabimapcreator/n/nff7151e8f261", status: "published", kind: "wonder-note", date: "2026-05-28", target: "第4部第5話・第6話関連（1週間企画 Day 3）", tags: ["第4部第5話","第6話関連（1週間企画","Day","3）"], relatedParts: ["part4"], relatedPodcastId: "podcast-part4-05", relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", relatedYouTubeId: "youtube-part4", relatedYouTubeUrl: "https://www.youtube.com/watch?v=8dySbSKpZNU", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-85.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "ニューヨークの綿花の値段と、" },
    { id: 'note-86', number: 86, title: "ページの中に、時代を超えた会話があった", url: "https://note.com/manabimapcreator/n/nf13aa28aed3a", status: "published", kind: "wonder-note", date: "2026-05-29", target: "第4部第5話・第6話関連（1週間企画 Day 4）", tags: ["第4部第5話","第6話関連（1週間企画","Day","4）"], relatedParts: ["part4"], relatedPodcastId: "podcast-part4-06", relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", relatedYouTubeId: "youtube-part4", relatedYouTubeUrl: "https://www.youtube.com/watch?v=8dySbSKpZNU", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-86.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "本のページを開く。" },
    { id: 'note-87', number: 87, title: "誰もが書けるようになるたびに、世界が揺れた", url: "https://note.com/manabimapcreator/n/n1cad84195c77", status: "published", kind: "wonder-note", date: "2026-05-30", target: "第4部第5話・第6話関連（1週間企画 Day 5）", tags: ["第4部第5話","第6話関連（1週間企画","Day","5）"], relatedParts: ["part4"], relatedPodcastId: "podcast-part4-06", relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", relatedYouTubeId: "youtube-part4", relatedYouTubeUrl: "https://www.youtube.com/watch?v=8dySbSKpZNU", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-87.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "「誰でも書ける」という状態は、" },
    { id: 'note-88', number: 88, title: "「普通」を決めるのは、誰だろう", url: "https://note.com/manabimapcreator/n/nfeb3bcd968f8", status: "published", kind: "wonder-note", date: "2026-05-31", target: "第4部第5話・第6話関連（1週間企画 Day 6）", tags: ["第4部第5話","第6話関連（1週間企画","Day","6）"], relatedParts: ["part4"], relatedPodcastId: "podcast-part4-06", relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", relatedYouTubeId: "youtube-part4", relatedYouTubeUrl: "https://www.youtube.com/watch?v=8dySbSKpZNU", ctaCopy: "関連動画を見る", image: "note_articles/generated_note_images/note-88.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "キーボードの「A」は65番。" },
    { id: 'note-89', number: 89, title: "データを消すとき、なぜ熱が生まれるのか", url: "https://note.com/manabimapcreator/n/naa957d4db3d4", status: "published", kind: "wonder-note", date: "2026-06-01", target: "第4部第5話・第6話関連", tags: ["第4部第5話","第6話関連"], relatedParts: ["part4"], relatedPodcastId: "podcast-part4-5", relatedPodcastUrl: "https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka", relatedYouTubeId: "youtube-part4", relatedYouTubeUrl: "https://www.youtube.com/watch?v=8dySbSKpZNU", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-89.png", question: "検索できることと、理解していることは同じなのか。", relation: "知識と記録の枝道", primaryPart: "part4", excerpt: "スマートフォンに写真を1万枚入れても、重さは変わりません。" },
    { id: 'note-90', number: 90, title: "悲しくないのに、なぜ音楽で涙が出るのか", url: "https://note.com/manabimapcreator/n/n2dcdae1602bd", status: "published", kind: "wonder-note", date: "2026-06-02", target: "第10部第1話「感動はどこで生まれるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part10-1", relatedPodcastUrl: "https://www.youtube.com/watch?v=SHKD17oD69M", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=SHKD17oD69M", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-90.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "聴いている途中で、気づいたら目が熱くなっていた。" },
    { id: 'note-91', number: 91, title: "美しさを数値で決められるのか——2500年間の問いと、答えが出ない理由", url: "https://note.com/manabimapcreator/n/na5d745a5992b", status: "published", kind: "wonder-note", date: "2026-06-03", target: "第10部第2話「美しいとは何か」", tags: ["第10部第2話「美しいとは何か」"], relatedParts: [], relatedPodcastId: "podcast-part10-2", relatedPodcastUrl: "https://www.youtube.com/watch?v=aC0XAF6MQt4", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=aC0XAF6MQt4", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-91.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "数学で「黄金比は美しい」と習う。" },
    { id: 'note-92', number: 92, title: "アイスクリームを見たサルが科学を変えた——共感の回路とは何か", url: "https://note.com/manabimapcreator/n/n9273f1227867", status: "published", kind: "wonder-note", date: "2026-07-23", target: "第10部第3話「共感の回路」", tags: ["第10部第3話「共感の回路」"], relatedParts: [], relatedPodcastId: "podcast-part10-3", relatedPodcastUrl: "https://www.youtube.com/watch?v=GjEa2rHbPSk", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=GjEa2rHbPSk", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-92.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "友達が泣いていると、胸が痛くなる。" },
    { id: 'note-93', number: 93, title: "5秒だけ見た棋士が答えを知っていた——直感とは何か", url: "https://note.com/manabimapcreator/n/nbdb09d7a9b2d", status: "published", kind: "wonder-note", date: "2026-06-04", target: "第10部第4話「直感とは何か」", tags: ["第10部第4話「直感とは何か」"], relatedParts: [], relatedPodcastId: "podcast-part10-4", relatedPodcastUrl: "https://www.youtube.com/watch?v=YlL2P_PxXBI", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=YlL2P_PxXBI", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-93.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「なんとなく、こっちが正しい気がする」" },
    { id: 'note-94', number: 94, title: "小説を読んで人が死んだ——物語に引き込まれる脳の謎とは何か", url: "https://note.com/manabimapcreator/n/n28986bcb8d93", status: "published", kind: "wonder-note", date: "2026-06-05", target: "第10部第5話「物語に引き込まれる理由」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part10-5", relatedPodcastUrl: "https://www.youtube.com/watch?v=bSNDcG2mTC8", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=bSNDcG2mTC8", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-94.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "気がついたら泣いていた。" },
    { id: 'note-95', number: 95, title: "クジャクの羽はなぜ美しいのか——ダーウィンが眠れなかった問いとは", url: "https://note.com/manabimapcreator/n/n6346fb4997d2", status: "published", kind: "wonder-note", date: "2026-06-06", target: "第10部第6話「なぜ美を感じるのか」", tags: ["第10部第6話「なぜ美を感じるのか」"], relatedParts: [], relatedPodcastId: "podcast-part10-6", relatedPodcastUrl: "https://www.youtube.com/watch?v=Mb0aa7Bw_40", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=Mb0aa7Bw_40", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-95.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「きれい」と感じる。" },
    { id: 'note-96', number: 96, title: "3万2千年前の壁画を見て涙が出た——芸術は役に立つのか", url: "https://note.com/manabimapcreator/n/n520d91af4da0", status: "published", kind: "wonder-note", date: "2026-06-07", target: "第10部第7話「芸術は役に立つのか」", tags: ["第10部第7話「芸術は役に立つのか」"], relatedParts: [], relatedPodcastId: "podcast-part10-7", relatedYouTubeId: "youtube-part10", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-96.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "役に立たない絵を、人間は作り続けてきた。" },
    { id: 'note-97', number: 97, title: "犬はチンパンジーより人の気持ちがわかる——共感はなぜ必要だったのか", url: "https://note.com/manabimapcreator/n/n2e27f32f175a", status: "published", kind: "wonder-note", date: "2026-06-08", target: "第10部第8話「共感はなぜ必要だったか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part10-8", relatedPodcastUrl: "https://www.youtube.com/watch?v=VCVKKrrrvYo", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=VCVKKrrrvYo", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-97.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "人間が指を差すと、犬はその方向を見る。" },
    { id: 'note-98', number: 98, title: "なぜ人は極限状況でも「意味」を手放さないのか", url: "https://note.com/manabimapcreator/n/nf56c1e0f4d50", status: "published", kind: "wonder-note", date: "2026-06-09", target: "第10部第9話「意味を求める動物」", tags: ["第10部第9話「意味を求める動物」"], relatedParts: [], relatedPodcastId: "podcast-part10-9", relatedPodcastUrl: "https://www.youtube.com/watch?v=k2YOKw2ID7U", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=k2YOKw2ID7U", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-98.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "どんなに過酷な状況でも、" },
    { id: 'note-99', number: 99, title: "感性はなぜ「余り物」から生まれたのか", url: "https://note.com/manabimapcreator/n/n474269d7c02f", status: "published", kind: "wonder-note", date: "2026-06-10", target: "第10部第10話「感性は副産物か適応か」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part10-10", relatedPodcastUrl: "https://www.youtube.com/watch?v=N2ZNGwRGaxk", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=N2ZNGwRGaxk", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-99.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "美しいと感じる力は、" },
    { id: 'note-100', number: 100, title: "AIが描いた絵で感動した自分は、正しいのか", url: "https://note.com/manabimapcreator/n/n0284d3195646", status: "published", kind: "wonder-note", date: "2026-06-11", target: "第10部第11話「生成芸術は美しいか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part10-11", relatedPodcastUrl: "https://www.youtube.com/watch?v=fWhDfqGEgtY", relatedYouTubeId: "youtube-part10", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-100.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "きれいだと思った。" },
    { id: 'note-101', number: 101, title: "AIに悩みを話すとき、「わかってもらえた」は本物なのか", url: "https://note.com/manabimapcreator/n/n085c80ebeff6", status: "published", kind: "wonder-note", date: "2026-06-12", target: "第10部第12話「AIは共感できるか」", tags: [], relatedParts: ["part8"], relatedPodcastId: "podcast-part10-12", relatedPodcastUrl: "https://www.youtube.com/watch?v=hFbsweevWxc", relatedYouTubeId: "youtube-part10", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-101.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "誰かに話して、気持ちが楽になったことがある。" },
    { id: 'note-102', number: 102, title: "意味はどこに宿るのか—便器が芸術になった日", url: "https://note.com/manabimapcreator/n/n03edcb64848a", status: "published", kind: "wonder-note", date: "2026-06-13", target: "第10部第13話「意味はどこに宿るか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part10-13", relatedPodcastUrl: "https://www.youtube.com/watch?v=H_lsN4008fw", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=H_lsN4008fw", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-102.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "同じ曲なのに、昨日と今日では感じ方が違う。" },
    { id: 'note-103', number: 103, title: "感性は教えられるのか——フィンランドが問い続けたこと", url: "https://note.com/manabimapcreator/n/n57b9de7f89ae", status: "published", kind: "wonder-note", date: "2026-06-14", target: "第10部第14話「教育と感性」", tags: ["第10部第14話「教育と感性」"], relatedParts: ["part8-2","part8"], relatedPodcastId: "podcast-part10-14", relatedPodcastUrl: "https://www.youtube.com/watch?v=vSg-inDnF8E", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=vSg-inDnF8E", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-103.png", question: "AIが宿題を解ける時代に、学力とは何か。", relation: "教育と日常の枝道", primaryPart: "part8-2", excerpt: "「この絵は何点ですか？」" },
    { id: 'note-104', number: 104, title: "スポティファイは好きになる曲を知っている", url: "https://note.com/manabimapcreator/n/n929d9f2520ee", status: "published", kind: "wonder-note", date: "2026-06-15", target: "第10部第15話「感性は再現できるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part10-15", relatedPodcastUrl: "https://www.youtube.com/watch?v=g8E_omo0CqE", relatedYouTubeId: "youtube-part10", relatedYouTubeUrl: "https://www.youtube.com/watch?v=g8E_omo0CqE", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-104.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "スポティファイのおすすめ曲が、よく当たる。" },
    { id: 'note-105', number: 105, title: "レモン汁をぬった銀行強盗と、わかったつもり", url: "https://note.com/manabimapcreator/n/n3a44eff60195", status: "published", kind: "wonder-note", date: "2026-06-16", target: "第12部第1話「なぜ人は\"わかったつもり\"になるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-1", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-105.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "1995年のある朝、ピッツバーグの男は" },
    { id: 'note-106', number: 106, title: "AIに教えたら、自分がわかった", url: "https://note.com/manabimapcreator/n/n16f12dce70c6", status: "published", kind: "wonder-note", date: "2026-06-17", target: "第12部第2話「\"教えることが最高の学習法\"は本当か」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-2", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-106.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "友達に数学を教えていたら、なぜか自分がわかった。" },
    { id: 'note-107', number: 107, title: "ヴィゴツキーは35歳で死んだ。でもその問いは生き続けている", url: "https://note.com/manabimapcreator/n/nab81f0347024", status: "published", kind: "wonder-note", date: "2026-06-18", target: "第12部第3話「対話は学びをなぜ深めるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-3", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-107.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "1934年、ソビエト連邦。" },
    { id: 'note-108', number: 108, title: "「わかっていない」に気づくのは、説明しようとしたときだ", url: "https://note.com/manabimapcreator/n/n938e013c9b5d", status: "published", kind: "wonder-note", date: "2026-06-20", target: "第12部第4話「誰かに説明しようとすると理解はなぜ変わるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-4", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-108.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "発表の準備をしていた。" },
    { id: 'note-109', number: 109, title: "ソクラテスが処刑されたのは、問い返しすぎたからだ", url: "https://note.com/manabimapcreator/n/n0d4817a14c52", status: "published", kind: "wonder-note", date: "2026-06-21", target: "第12部第5話「問い返してくれる人がいると、学びはどう変わるのか」", tags: ["学びはどう変わるのか」"], relatedParts: [], relatedPodcastId: "podcast-part12-5", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-109.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "紀元前399年、アテネ。" },
    { id: 'note-110', number: 110, title: "テストを受けるたびに、記憶が作られている", url: "https://note.com/manabimapcreator/n/n127bc8ef7b5b", status: "published", kind: "wonder-note", date: "2026-06-22", target: "第12部第6話「テストは評価ではなく学習である」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-6", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-110.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "テスト前日に、教科書を何度も読み返した。" },
    { id: 'note-111', number: 111, title: "間違えた問題こそ、最も深く記憶に残る", url: "https://note.com/manabimapcreator/n/nd3a7bc5f8f10", status: "published", kind: "wonder-note", date: "2026-06-24", target: "第12部第7話「間違えることはなぜ学びを深めるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-7", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-111.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "授業で手を挙げて、間違えた。" },
    { id: 'note-112', number: 112, title: "「すぐ答えてもらう」が、学びを浅くしていた", url: "https://note.com/manabimapcreator/n/n034bfebaf483", status: "published", kind: "wonder-note", date: "2026-06-23", target: "第12部第8話「フィードバックはいつどう与えると学びになるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-8", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-112.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "問題を解いていて、行き詰まった。" },
    { id: 'note-113', number: 113, title: "「あの人と比べて」が、学びを止めることがある", url: "https://note.com/manabimapcreator/n/nb0803f69f08a", status: "published", kind: "wonder-note", date: "2026-06-25", target: "第12部第9話「比較されると学習意欲はどう変わるのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part12-9", relatedYouTubeId: "youtube-part12", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-113.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「○○ちゃんはできているのに」と言われた瞬間、" },
    { id: 'note-114', number: 114, title: "自分の見ている世界は、世界の標準だろうか", status: "draft", kind: "wonder-note", date: "2026-06-20", target: "第14部第1話「人はなぜ自分のいる場所を世界の中心だと思うのか」", tags: [], relatedParts: [], relatedPodcastId: "podcast-part14-1", relatedYouTubeId: "youtube-part14", ctaCopy: "Podcastで深く聴く", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "自分が見ている景色を、" },
    { id: 'note-115', number: 115, title: "見えないものが見えたとき、世界はどう変わるのか", status: "draft", kind: "wonder-note", date: "2026-06-20", target: "第14部第2話「道具が認識を変える」", tags: ["第14部第2話「道具が認識を変える」"], relatedParts: [], relatedPodcastId: "podcast-part14-2", relatedYouTubeId: "youtube-part14", ctaCopy: "Podcastで深く聴く", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "カバンの中身は、外から見えない。" },
    { id: 'note-116', number: 116, title: "美しい答えを、自分から手放せるだろうか", status: "draft", kind: "wonder-note", date: "2026-06-20", target: "第14部第3話「美しさより、事実に合わせる勇気」", tags: ["第14部第3話「美しさより","事実に合わせる勇気」"], relatedParts: [], relatedPodcastId: "podcast-part14-3", relatedYouTubeId: "youtube-part14", ctaCopy: "Podcastで深く聴く", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "一度、正しいと信じた考えを、" },
    { id: 'note-117', number: 117, title: "正しいことが、なぜ受け入れられないことがあるのか", status: "draft", kind: "wonder-note", date: "2026-06-20", target: "第14部第4話「新しい知は、なぜ最初に危険だと言われるのか」", tags: ["第14部第4話「新しい知は","なぜ最初に危険だと言われるのか」"], relatedParts: [], relatedPodcastId: "podcast-part14-4", relatedYouTubeId: "youtube-part14", ctaCopy: "Podcastで深く聴く", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「手を洗ってください」" },
    { id: 'note-118', number: 118, title: "「中心ではなかった」は、何度も繰り返されてきた", status: "draft", kind: "wonder-note", date: "2026-06-20", target: "第14部第5話「自分の中の天動説を探す」（シリーズ最終回）", tags: [], relatedParts: [], relatedPodcastId: "podcast-part14-5", relatedYouTubeId: "youtube-part14", ctaCopy: "Podcastで深く聴く", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "地球は、宇宙の中心ではなかった。" },
    { id: 'note-119', number: 119, title: "なぜ「正しい」と認められるまでに、何十年もかかるのか", url: "https://note.com/manabimapcreator/n/nc0344dc13794", status: "published", kind: "wonder-note", date: "2026-06-26", target: "AI源流第1話", tags: ["AI源流第1話"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-1", relatedYouTubeId: "youtube-AI源流", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-119.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "今、スマホに話しかけると、ちゃんと答えが返ってくる。" },
    { id: 'note-120', number: 120, title: "なぜ「意味」を外すと、測れるものが見えてくるのか", url: "https://note.com/manabimapcreator/n/nd5694b70262c", status: "published", kind: "wonder-note", date: "2026-06-27", target: "AI源流第2話", tags: ["AI源流第2話"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-2", relatedPodcastUrl: "https://www.youtube.com/watch?v=lDV58Z8XxH0", relatedYouTubeId: "youtube-AI源流", relatedYouTubeUrl: "https://www.youtube.com/watch?v=lDV58Z8XxH0", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-120.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "「了解」の二文字だけで、十分に伝わるときがあります。" },
    { id: 'note-121', number: 121, title: "なぜ、答え合わせは「本人が居なくなった後」に来るのか", url: "https://note.com/manabimapcreator/n/ne5acc0eab8a3", status: "published", kind: "wonder-note", date: "2026-06-28", target: "AI源流第3話", tags: ["AI源流第3話"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-3", relatedPodcastUrl: "https://www.youtube.com/watch?v=gGcrFlY2Y0E", relatedYouTubeId: "youtube-AI源流", relatedYouTubeUrl: "https://www.youtube.com/watch?v=gGcrFlY2Y0E", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-121.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "提出した宿題の答え合わせを、誰よりも先に知りたいと思ったことはありませんか。" },
    { id: 'note-122', number: 122, title: "なぜ「分かっている人には分かっている」だけでは、広がらないのか", url: "https://note.com/manabimapcreator/n/n837f3edf05b6", status: "published", kind: "wonder-note", date: "2026-06-29", target: "AI源流第4話", tags: ["AI源流第4話"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-4", relatedPodcastUrl: "https://www.youtube.com/watch?v=JR2rViO8-Yw", relatedYouTubeId: "youtube-AI源流", relatedYouTubeUrl: "https://www.youtube.com/watch?v=JR2rViO8-Yw", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-122.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "近所では知られているのに、遠くの誰も知らない。" },
    { id: 'note-123', number: 123, title: "なぜ、同じ発見をした二人の名前が、同じだけ知られないのか", url: "https://note.com/manabimapcreator/n/naf163a776c0f", status: "published", kind: "wonder-note", date: "2026-06-30", target: "AI源流第5話", tags: ["AI源流第5話"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-5", relatedPodcastUrl: "https://www.youtube.com/watch?v=kgdPnOuaVr0", relatedYouTubeId: "youtube-AI源流", relatedYouTubeUrl: "https://www.youtube.com/watch?v=kgdPnOuaVr0", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-123.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "誰かと同じことを、同時に思いついたことはありませんか。" },
    { id: 'note-124', number: 124, title: "なぜ、動く証拠があっても、信じてもらえない時間があるのか", url: "https://note.com/manabimapcreator/n/nba960ad6d411", status: "published", kind: "wonder-note", date: "2026-07-01", target: "AI源流第6話", tags: ["AI源流第6話"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-6", relatedPodcastUrl: "https://www.youtube.com/watch?v=268kdjIa7g4", relatedYouTubeId: "youtube-AI源流", relatedYouTubeUrl: "https://www.youtube.com/watch?v=268kdjIa7g4", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-124.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "実際に動いているところを見せても、それでも信じてもらえないことがあります。" },
    { id: 'note-125', number: 125, title: "なぜ、作った人ほど、その怖さを早く見抜くのか", url: "https://note.com/manabimapcreator/n/n41e4b5dc149d", status: "published", kind: "wonder-note", date: "2026-07-02", target: "AI源流第7話", tags: ["AI源流第7話"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-7", relatedPodcastUrl: "https://www.youtube.com/watch?v=e9LQL86alWM", relatedYouTubeId: "youtube-AI源流", relatedYouTubeUrl: "https://www.youtube.com/watch?v=e9LQL86alWM", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-125.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "自分が作ったものが、思っていたより大きな力を持ってしまったら。" },
    { id: 'note-126', number: 126, title: "なぜ、正しさは静かに積み重なって、ある日突然動くのか", url: "https://note.com/manabimapcreator/n/ne1901dc8ed05", status: "published", kind: "wonder-note", date: "2026-07-03", target: "AI源流第8話（終章）", tags: ["AI源流第8話（終章）"], relatedParts: ["part8"], relatedPodcastId: "podcast-AI源流-8", relatedPodcastUrl: "https://www.youtube.com/watch?v=pfacYJ75t64", relatedYouTubeId: "youtube-AI源流", relatedYouTubeUrl: "https://www.youtube.com/watch?v=pfacYJ75t64", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-126.png", question: "生成AIは、何を生成しているのか。", relation: "生成AIの枝道", primaryPart: "part8", excerpt: "長い旅を振り返ると、いつも同じ形が見えてくることがあります。" },
    { id: 'note-127', number: 127, title: "「わかった」と思ったとき、考えるのをやめていないか", url: "https://note.com/manabimapcreator/n/n6e3146ea667c", status: "published", kind: "wonder-note", date: "2026-07-24", target: "第15部第1話「知っているつもりが、一番危ない」", tags: ["第15部第1話「知っているつもりが","一番危ない」"], relatedParts: [], relatedPodcastId: "podcast-part15-1", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-127.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "スマホで何かを調べます。" },
    { id: 'note-128', number: 128, title: "「まだわからない」でいることが、なぜこんなに苦しいのか", url: "https://note.com/manabimapcreator/n/n329718ab3f46", status: "published", kind: "wonder-note", date: "2026-07-25", target: "第15部第2話「白黒にすると、ちょっと楽になる」", tags: ["第15部第2話「白黒にすると","ちょっと楽になる」"], relatedParts: [], relatedPodcastId: "podcast-part15-2", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-128.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "LINEの返信が来ません。" },
    { id: 'note-129', number: 129, title: "「見た」が「わかった」にならないのはなぜか", url: "https://note.com/manabimapcreator/n/nd22b9b1f03d1", status: "published", kind: "wonder-note", date: "2026-07-26", target: "第15部第3話「目で見ても、わからないことがある」", tags: ["第15部第3話「目で見ても","わからないことがある」"], relatedParts: [], relatedPodcastId: "podcast-part15-3", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-129.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「これは本当だ」と思います。" },
    { id: 'note-130', number: 130, title: "「まだわからない」を22年間続けると、何が起きるのか", url: "https://note.com/manabimapcreator/n/nc1c703a0137e", status: "published", kind: "wonder-note", date: "2026-07-27", target: "第15部第4話", tags: ["第15部第4話"], relatedParts: [], relatedPodcastId: "podcast-part15-4", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-130.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「早く決めて」と言われることがあります。" },
    { id: 'note-131', number: 131, title: "普通の人が、なぜ恐ろしいことをするのか", url: "https://note.com/manabimapcreator/n/n33a41fbf20a4", status: "published", kind: "wonder-note", date: "2026-07-28", target: "第15部第5話", tags: ["第15部第5話"], relatedParts: [], relatedPodcastId: "podcast-part15-5", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-131.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「みんながそうしてたから」" },
    { id: 'note-132', number: 132, title: "同じ空を見ていても、見えているものが違うのはなぜか", url: "https://note.com/manabimapcreator/n/nf45a602a2fb2", status: "published", kind: "wonder-note", date: "2026-07-29", target: "第15部第6話", tags: ["第15部第6話"], relatedParts: [], relatedPodcastId: "podcast-part15-6", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-132.png", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "同じニュースを見て、全然違う感想になる人がいます。" },
    { id: 'note-133', number: 133, title: "AIに答えてもらった後、「なぜ？」と聞いたことはあるか", status: "local-draft", kind: "wonder-note", date: "2026-06-27", target: "第15部第7話", tags: ["第15部第7話"], relatedParts: [], relatedPodcastId: "podcast-part15-7", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "わからないことがあると、AIに聞きます。" },
    { id: 'note-134', number: 134, title: "「知っている」と思ったとき、その何かに閉じ込められている", status: "local-draft", kind: "wonder-note", date: "2026-06-27", target: "第15部第8話", tags: ["第15部第8話"], relatedParts: [], relatedPodcastId: "podcast-part15-8", relatedYouTubeId: "youtube-part15", ctaCopy: "Podcastで深く聴く", question: "学ぶとは、答えを増やすことか、問いを増やすことか。", relation: "制作と学びの枝道", primaryPart: "note", excerpt: "「もう知ってる」と思ったとき、聞く耳が半分閉じます。" },
    { id: 'note-143', number: 143, title: "なぜ人は、自分の感覚をそのまま信じてしまうのか", url: "https://note.com/manabimapcreator/n/nc81fc28f3e5c", status: "published", kind: "wonder-note", date: "2026-07-19", target: "第7部第1話", tags: ["第7部第1話"], relatedParts: ["part7"], relatedPodcastId: "podcast-part7-1", relatedPodcastUrl: "https://www.youtube.com/watch?v=QcvW5eARMao", relatedYouTubeId: "youtube-part7", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-143.png", question: "人間の当たり前を外すと、世界はどう見え直すのか。", relation: "前提を外す枝道", primaryPart: "part7", excerpt: "エレベーターの扉が閉まるのを、じっと待っていたことはありませんか。" },
    { id: 'note-144', number: 144, title: "なぜ「ルールを守ること」と「安全であること」は違うのか", url: "https://note.com/manabimapcreator/n/nd75461351692", status: "published", kind: "wonder-note", date: "2026-07-20", target: "第7部第2話", tags: ["第7部第2話"], relatedParts: ["part7"], relatedPodcastId: "podcast-part7-2", relatedYouTubeId: "youtube-part7", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-144.png", question: "人間の当たり前を外すと、世界はどう見え直すのか。", relation: "前提を外す枝道", primaryPart: "part7", excerpt: "改札にICカードをタッチすると、一瞬でゲートが開きます。" },
    { id: 'note-145', number: 145, title: "なぜ人は、いなくなった人の心を機械に探すのか", url: "https://note.com/manabimapcreator/n/n5413a75de261", status: "published", kind: "wonder-note", date: "2026-07-21", target: "第7部第3話", tags: ["第7部第3話"], relatedParts: ["part7"], relatedPodcastId: "podcast-part7-3", relatedYouTubeId: "youtube-part7", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-145.png", question: "人間の当たり前を外すと、世界はどう見え直すのか。", relation: "前提を外す枝道", primaryPart: "part7", excerpt: "長い返信が来たとき、ふと思うことがあります。" },
    { id: 'note-146', number: 146, title: "なぜ「一番正しい判断」が、一番冷たく感じられるのか", url: "https://note.com/manabimapcreator/n/n29fae671c3d4", status: "published", kind: "wonder-note", date: "2026-07-22", target: "第7部第4話", tags: ["第7部第4話"], relatedParts: ["part7"], relatedPodcastId: "podcast-part7-4", relatedPodcastUrl: "https://www.youtube.com/watch?v=x7FsQFtMujI", relatedYouTubeId: "youtube-part7", ctaCopy: "Podcastで深く聴く", image: "note_articles/generated_note_images/note-146.png", question: "人間の当たり前を外すと、世界はどう見え直すのか。", relation: "前提を外す枝道", primaryPart: "part7", excerpt: "会議で、一番筋の通った意見を言った人が、なぜか浮いてしまう。" }
  ];

  const routes = [
    {
      id: 'route-first',
      title: 'はじめての人向け',
      description: '進化の大きな流れから三大革命と生成AIへ進む基本ルート。',
      nodes: ['evolution', 'part1', 'part2', 'part3', 'part8']
    },
    {
      id: 'route-ai',
      title: 'AIを知りたい人向け',
      description: 'AI革命の物語から生成AIの歴史、日常と教育への影響へ進む。',
      nodes: ['part3', 'part8', 'part8-2', 'note-41']
    },
    {
      id: 'route-education',
      title: '教育を考えたい人向け',
      description: 'AI時代の宿題・学力・幸福度から、教育の意味を問い直す。',
      nodes: ['part8-2', 'part3', 'note-41', 'note-29']
    },
    {
      id: 'route-language',
      title: '言葉と思考を知りたい人向け',
      description: '言葉、文字、AI言語処理をつなぎ、理解とは何かを考える。',
      nodes: ['part5', 'part4', 'part8', 'note-23', 'note-28']
    },
    {
      id: 'route-number',
      title: '数と社会を知りたい人向け',
      description: '数えることから統計、評価、学力までをたどる。',
      nodes: ['part6', 'note-32', 'note-39', 'part8-2', 'note-41']
    },
    {
      id: 'route-history',
      title: '人類史から入りたい人向け',
      description: '宇宙・生命・文明の流れから、技術とAIの現在地へ進む。',
      nodes: ['evolution', 'part1', 'part4', 'part6', 'part8']
    }
  ];

  const questions = [
    { id: 'q-tool', text: '道具を使うことと、道具に使われることの境界はどこにあるのか。', related: ['part1', 'part2', 'part3'] },
    { id: 'q-thinking', text: 'AIが答えを出せる時代に、人間が考えるとは何か。', related: ['part3', 'part8', 'part8-2'] },
    { id: 'q-language', text: '言葉は思考を作るのか、思考が言葉を作るのか。', related: ['part5', 'part8'] },
    { id: 'q-number', text: '数字で測れないものに、どう価値を与えるのか。', related: ['part6', 'part8-2'] },
    { id: 'q-learning', text: '学ぶとは、答えを増やすことか、問いを増やすことか。', related: ['note-30', 'note-31', 'part8-2'] }
  ];

  const mediaTypeMeta = {
    youtube: { label: 'YouTube', lead: '物語で入る', empty: '物語で入る動画は、今後ここに接続していきます。' },
    note: { label: 'note', lead: '文章で深める', empty: '文章で深める枝道は、今後ここに接続していきます。' },
    podcast: { label: 'Podcast', lead: '耳でたどる', empty: 'Podcastは準備中です。' }
  };

  const extraMediaItems = [
    // Podcastなどを追加するときは、この配列に同じ形で足す。
    {
      id: 'podcast-part1-01',
      type: 'podcast',
      title: '第1部 Podcast 蒸気の時代',
      url: 'https://youtu.be/-Rfi5O5MMmI',
      relatedParts: ['part1'],
      question: '機械は人間を何から解放し、何に縛ったのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第1部 Podcast図解',
          src: 'infographics/info1-1.png',
          caption: 'Podcastを聴きながら、機械・時間・労働の関係を見る'
        }
      ]
    },
    {
      id: 'podcast-part2-01',
      type: 'podcast',
      title: '第2部 Podcast つながる世界',
      url: 'https://youtu.be/LHIefpwHCXA',
      relatedParts: ['part2'],
      question: 'つながることは、近づくことと同じなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第2部 Podcast図解',
          src: 'infographics/info2-1.png',
          caption: 'Podcastを聴きながら、つながりと孤独の構造を見る'
        }
      ]
    },
    {
      id: 'podcast-part3-01',
      type: 'podcast',
      title: '第3部 Podcast AIと生きる未来',
      url: 'https://youtu.be/Uoy4OZhINHA',
      relatedParts: ['part3'],
      question: 'AIが考えているように見えるとき、人間が考えるとは何か。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第3部 Podcast図解',
          src: 'infographics/info3-1.png',
          caption: 'Podcastを聴きながら、AI時代に人間へ残る問いを見る'
        }
      ]
    },
    {
      id: 'podcast-part4-01',
      type: 'podcast',
      title: '第4部 Podcast 文字と記憶の深層',
      url: 'https://youtu.be/aK4cAxWVoKY',
      relatedParts: ['part4'],
      question: '検索できることと、理解していることは同じなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第4部 Podcast図解',
          src: 'infographics/info4-1.png',
          caption: '文字と記録の起点を俯瞰する'
        }
      ]
    },
    {
      id: 'podcast-part4-02',
      type: 'podcast',
      title: '第4部 Podcast 印刷革命の深層',
      url: 'https://youtu.be/Jz5lbS3p6Bg',
      relatedParts: ['part4'],
      question: '検索できることと、理解していることは同じなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第4部 Podcast図解 2',
          src: 'infographics/info4-2.png',
          caption: '印刷革命が知識の届き方をどう変えたかを見る'
        }
      ]
    },
    {
      id: 'podcast-part4-03',
      type: 'podcast',
      title: '第4部 Podcast 百科事典の深層',
      url: 'https://youtu.be/knRCSSa9kDU',
      relatedParts: ['part4'],
      question: '検索できることと、理解していることは同じなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第4部 Podcast図解 3',
          src: 'infographics/info4-3.png',
          caption: '知識を一冊にまとめる夢と限界を整理する'
        }
      ]
    },
    {
      id: 'podcast-part4-04',
      type: 'podcast',
      title: '第4部 Podcast 電信と電話の深層',
      url: 'https://youtu.be/mMqJJFmgnoI',
      relatedParts: ['part4'],
      question: '検索できることと、理解していることは同じなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第4部 Podcast図解 4',
          src: 'infographics/info4-4.png',
          caption: '情報が光速になった時代の構造を見る'
        }
      ]
    },
    {
      id: 'podcast-part4-05',
      type: 'podcast',
      title: '知識はなぜ「誰でも無料」になったのか｜まるごと聴く 図書館と公教育の深層【ハルとおじいさん #4P-5】',
      url: 'https://youtu.be/Z0ilADkBAtY',
      relatedParts: ['part4'],
      question: '検索できることと、理解していることは同じなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第4部 Podcast図解 5',
          src: 'infographics/info4-5.png',
          caption: '図書館と公教育が知識アクセスをどう変えたかを見る'
        }
      ]
    },
    {
      id: 'podcast-part4-06',
      type: 'podcast',
      title: '7000の言語が分断する知識の世界｜まるごと聴く 言語と翻訳の深層【ハルとおじいさん #4P-6】',
      url: 'https://youtu.be/SWvmh6asOzo',
      relatedParts: ['part4'],
      question: '検索できることと、理解していることは同じなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第4部 Podcast図解 6',
          src: 'infographics/info4-6.png',
          caption: '言語と翻訳が知識伝達に与える制約と可能性を見る'
        }
      ]
    },
    {
      id: 'podcast-part5-01',
      type: 'podcast',
      title: '言葉なしで考えられるか｜まるごと聴く 言葉と思考の深層【ハルとおじいさん #5P-1】',
      url: 'https://youtu.be/Ej3O4HEuF-Y',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 1',
          src: 'infographics/info5-1.png',
          caption: '言葉がない状態でも、思考がどのように生まれるかを見る'
        }
      ]
    },
    {
      id: 'podcast-part5-02',
      type: 'podcast',
      title: '頭の中の声はなぜ話すのか｜まるごと聴く 内なる声の深層【ハルとおじいさん #5P-2】',
      url: 'https://youtu.be/ot98Lqru5K8',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 2',
          src: 'infographics/info5-2.png',
          caption: '内なる声と自己が、頭の中でどう結びつくかを見る'
        }
      ]
    },
    {
      id: 'podcast-part5-03',
      type: 'podcast',
      title: '「リンゴ」はどこに存在するのか｜まるごと聴く 抽象化の深層【ハルとおじいさん #5P-3】',
      url: 'https://youtu.be/OdLhuXi96oQ',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 3',
          src: 'infographics/info5-3.png',
          caption: '抽象化と概念が、世界の見え方をどう整理するかを見る'
        }
      ]
    },
    {
      id: 'podcast-part5-04',
      type: 'podcast',
      title: 'アイスが売れると溺死者が増える謎｜まるごと聴く 因果と論理の深層【ハルとおじいさん #5P-4】',
      url: 'https://youtu.be/ctB1AVK-8Bc',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 4',
          src: 'infographics/info5-4.png',
          caption: '相関と因果の違いから、論理の限界と使い方を見る'
        }
      ]
    },
    {
      id: 'podcast-part5-05',
      type: 'podcast',
      title: '虹は何色かで世界の見え方が変わる｜まるごと聴く 言語と世界観の深層【ハルとおじいさん #5P-5】',
      url: 'https://youtu.be/OBxDSmxcJsM',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 5',
          src: 'infographics/info5-5.png',
          caption: '言語と世界観が、見えている世界をどう変えるかを見る'
        }
      ]
    },
    {
      id: 'podcast-part5-06',
      type: 'podcast',
      title: 'なぜ存在しないキャラクターに涙を流せるのか｜まるごと聴く 感情と共感の深層【ハルとおじいさん #5P-6】',
      url: 'https://youtu.be/ARa_xlgTPhQ',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 6',
          src: 'infographics/info5-6.png',
          caption: '物語・感情・共感が人間の理解に与える力を見る'
        }
      ]
    },
    {
      id: 'podcast-part5-07',
      type: 'podcast',
      title: '中国語の部屋が問いかける意識とは｜まるごと聴く AIと理解の深層【ハルとおじいさん #5P-7】',
      url: 'https://youtu.be/UE2gRTm8XOI',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 7',
          src: 'infographics/info5-7.png',
          caption: 'AIが言葉を扱うことと、理解することの差を見る'
        }
      ]
    },
    {
      id: 'podcast-part5-08',
      type: 'podcast',
      title: '言語はなぜ人間を人間にしたのか｜まるごと聴く 言葉と人間の深層【ハルとおじいさん #5P-8】',
      url: 'https://youtu.be/5slHiZTJp2g',
      relatedParts: ['part5'],
      question: '言葉がない世界では、思考はどのように存在するのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第5部 Podcast図解 8',
          src: 'infographics/info5-8.png',
          caption: '言葉が人間らしさと文明をどう形作ったかを見る'
        }
      ]
    },
    {
      id: 'podcast-part6-01a',
      type: 'podcast',
      title: '数がないと「3個」が数えられない？｜まるごと聴く 数がない世界の深層【ハルとおじいさん #6P-1a】',
      url: 'https://youtu.be/y3feUUFvWwM',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第6部 Podcast図解 1a',
          src: 'infographics/info6-1.png',
          caption: '数の言葉が世界の見え方をどう変えるかを見る'
        }
      ]
    },
    {
      id: 'podcast-part6-01b',
      type: 'podcast',
      title: '2万年前の骨に刻まれた168本の線——人類は何を数えていたのか｜まるごと聴く 数える感覚の誕生の深層【ハルとおじいさん #6P-1b】',
      url: 'https://youtu.be/QYpwmqPMZTo',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第6部 Podcast図解 1b',
          src: 'infographics/info6-2.png',
          caption: '人類が何を数え、なぜ記録したのかを見る'
        }
      ]
    },
    {
      id: 'podcast-part6-02a',
      type: 'podcast',
      title: '九九はなぜ「く・く・はちじゅういち」から始まるのか——紀元前305年の竹簡に書かれた秘密｜まるごと聴く 数える歌の深層【ハルとおじいさん #6P-2a】',
      url: 'https://youtu.be/rLABRAhlSgo',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第6部 Podcast図解 2a',
          src: 'infographics/info6-3.png',
          caption: '数える技術が記憶と教育にどう根づいたかを見る'
        }
      ]
    },
    {
      id: 'podcast-part6-02b',
      type: 'podcast',
      title: 'フィレンツェは1299年にアラビア数字を禁止した——「悪魔の数字」と呼ばれた記号の革命｜まるごと聴く 記号の革命の深層【ハルとおじいさん #6P-2b】',
      url: 'https://youtu.be/xiFaY7iojhA',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第6部 Podcast図解 2b',
          src: 'infographics/info6-4.png',
          caption: '数字という記号が社会と信頼を揺らした歴史を見る'
        }
      ]
    },
    {
      id: 'podcast-part6-03a',
      type: 'podcast',
      title: '9歳の子どもが宇宙の原子より大きな数に名前をつけた——それがGoogleの語源になった｜まるごと聴く 大きな数への挑戦の深層【ハルとおじいさん #6P-3a】',
      url: 'https://youtu.be/KeNrUNSg390',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第6部 Podcast図解 3a',
          src: 'infographics/info6-5.png',
          caption: '大きな数に名前を与えることで、想像できる世界が広がる構造を見る'
        }
      ]
    },
    {
      id: 'podcast-part6-03b',
      type: 'podcast',
      title: '無理数を発見した弟子は海に投げ込まれたのか——ピタゴラス学派の衝撃と数の抽象化｜まるごと聴く 抽象化の力の深層【ハルとおじいさん #6P-3b】',
      url: 'https://youtu.be/K4kGYDX6kNw',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第6部 Podcast図解 3b',
          src: 'infographics/info6-6.png',
          caption: '数の抽象化が世界観をどう変えたかを見る'
        }
      ]
    },
    {
      id: 'podcast-part6-04a',
      type: 'podcast',
      title: '影の角度だけで地球の大きさを計算した男——3700年前のエジプトの問題集から｜まるごと聴く 数字の魔法の深層【ハルとおじいさん #6P-4a】',
      url: 'https://youtu.be/2ie13Zw-aGQ',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める',
      infographics: [
        {
          title: '第6部 Podcast図解 4a',
          src: 'infographics/info6-7.png',
          caption: '数字が見えない世界を測れる道具になる瞬間を見る'
        }
      ]
    },
    {
      id: 'podcast-part6-05a',
      type: 'podcast',
      title: '助けるために作ったIQテストが優生学に使われた——コブラ効果と測ることの罠｜まるごと聴く 数字の呪いの深層【ハルとおじいさん #6P-5a】',
      url: 'https://youtu.be/lHiVWnlWqMQ',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part6-05b',
      type: 'podcast',
      title: '4063人を測定したら「平均的な人間」が0人だった——米空軍が発見した平均の嘘｜まるごと聴く ランキングと平均の深層【ハルとおじいさん #6P-5b】',
      url: 'https://youtu.be/wXoOdF3sg0Q',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part6-06',
      type: 'podcast',
      title: '賭け金の揉め事をパスカルに相談したら天気予報・保険・ChatGPTの基盤が生まれた——1654年の数学革命｜まるごと聴く 確率論の誕生の深層【ハルとおじいさん #6P-6】',
      url: 'https://youtu.be/BU8s561zFaI',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part6-06a',
      type: 'podcast',
      title: '幸福は数字で測れるか——ブータンのGNHとフロー体験と黄金比の嘘｜まるごと聴く 数字と心の深層【ハルとおじいさん #6P-6a】',
      url: 'https://youtu.be/k_Ky0wA2lJE',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part6-06b',
      type: 'podcast',
      title: 'GDPを発明した経済学者が「これで幸福は測れない」と警告した——自分の物差しを持つためのフランクルとストア哲学｜まるごと聴く 数字の使い方の深層【ハルとおじいさん #6P-6b】',
      url: 'https://youtu.be/1bfS7bnFquQ',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part6-07',
      type: 'podcast',
      title: '「白衣の天使」は嘘だった——ナイチンゲールはデータで死亡率を42%から2%に下げた革命家だ｜まるごと聴く ナイチンゲールの統計革命の深層【ハルとおじいさん #6P-7】',
      url: 'https://youtu.be/HelSc-JnDg4',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part6-08',
      type: 'podcast',
      title: '300年間嘲笑された「存在しない数」が今のコンセントを支えている——エジソンが象を感電死させても交流が勝った理由｜まるごと聴く 虚数の逆転劇の深層【ハルとおじいさん #6P-8】',
      url: 'https://youtu.be/ZH7dxpWUP6w',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part6-epilogue',
      type: 'podcast',
      title: '「意味だけは奪えない」数字の旅を終えて、自分の物差しを問う｜まるごと聴く 第6部エピローグ【ハルとおじいさん #6P-エピ】',
      url: 'https://youtu.be/RwrEBly_vRY',
      relatedParts: ['part6'],
      question: '数字で測れるものだけが、価値あるものなのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part7-01',
      type: 'podcast',
      title: '光の速さを追いかけたら時間が遅くなる——アインシュタイン16歳の問いが世界を変えた｜まるごと聴く 感覚を超えての深層【ハルとおじいさん #7P-1】',
      url: 'https://youtu.be/QcvW5eARMao',
      relatedParts: ['part7'],
      question: '人間の当たり前を外すと、世界はどう見え直すのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part7-02',
      type: 'podcast',
      title: '「わからなくても前に進める」——ノーベル賞物理学者が「電子は全ての経路を同時に通る」と言った理由｜まるごと聴く 理解を超えての深層【ハルとおじいさん #7P-2】',
      url: 'https://youtu.be/ogPheZebCSY',
      relatedParts: ['part7'],
      question: '人間の当たり前を外すと、世界はどう見え直すのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part7-03',
      type: 'podcast',
      title: 'エニグマ解読で1400万人を救った天才が迫害された——チューリングが問い続けた「機械は考えるか？」｜まるごと聴く 人間の特権を超えての深層【ハルとおじいさん #7P-3】',
      url: 'https://youtu.be/O9HPXy8rZSM',
      relatedParts: ['part7'],
      question: '人間の当たり前を外すと、世界はどう見え直すのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part7-04',
      type: 'podcast',
      title: 'すべてのコンピュータに宿る設計——「20世紀最強の頭脳」フォン・ノイマンはゲーム理論・原爆・AIの何を見たか｜まるごと聴く 思考を作るの深層【ハルとおじいさん #7P-4】',
      url: 'https://youtu.be/x7FsQFtMujI',
      relatedParts: ['part7'],
      question: '人間の当たり前を外すと、世界はどう見え直すのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-01a',
      type: 'podcast',
      title: 'AIという名前が付いた日｜まるごと聴く 作るAIの誕生【ハルとおじいさん #8P-1a】',
      url: 'https://youtu.be/Rc1dVXpE7cQ',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-01b',
      type: 'podcast',
      title: '「答えるAI」と「作るAI」は何が違う？｜まるごと聴く 作るAIの誕生【ハルとおじいさん #8P-1b】',
      url: 'https://youtu.be/bVXfUmfgJww',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-02a',
      type: 'podcast',
      title: '正しかったと証明される前に逝った研究者｜まるごと聴く ルールから確率へ【ハルとおじいさん #8P-2a】',
      url: 'https://youtu.be/FrJ8pwu0qSg',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-02b',
      type: 'podcast',
      title: '40年信じ続けたヒントンが「怖い」と言った理由｜まるごと聴く ルールから確率へ【ハルとおじいさん #8P-2b】',
      url: 'https://youtu.be/M0ee9v9Mkzk',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-03a',
      type: 'podcast',
      title: 'AIは「次の言葉」を予測しているだけ？｜まるごと聴く 言語モデルの正体【ハルとおじいさん #8P-3a】',
      url: 'https://youtu.be/VkStrOF2VXQ',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-03b',
      type: 'podcast',
      title: '「王 - 男 + 女 = 女王」は数学か？思考か？｜まるごと聴く 言語モデルの正体【ハルとおじいさん #8P-3b】',
      url: 'https://youtu.be/j0H1dWNtKrg',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-04a',
      type: 'podcast',
      title: 'AIが打った「人間なら選ばない一手」は創造性か？｜まるごと聴く 考えているように見える【ハルとおじいさん #8P-4a】',
      url: 'https://youtu.be/AojhrBQ7e30',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-04b',
      type: 'podcast',
      title: 'プログラムに悩みを打ち明けた人が教えてくれること｜まるごと聴く 考えているように見える【ハルとおじいさん #8P-4b】',
      url: 'https://youtu.be/tmyOp2VpEzQ',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-05a',
      type: 'podcast',
      title: 'ディドロからWikipediaへ——「知識をみんなに」の250年｜まるごと聴く 生成という断層【ハルとおじいさん #8P-5a】',
      url: 'https://youtu.be/nJsst2jFqek',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part8-05b',
      type: 'podcast',
      title: '「問いを立てる力」が新しい格差になる時代｜まるごと聴く 生成という断層【ハルとおじいさん #8P-5b】',
      url: 'https://youtu.be/PClYBQsXRqs',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-1',
      type: 'podcast',
      title: '【ポッドキャスト】これを作ったのは誰？｜まるごと聴く AIの源流をたどる旅・導入【ハルとおじいさん #AI源流-1】',
      url: 'https://youtu.be/RKTzrKqc3BY',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-2',
      type: 'podcast',
      title: '【ポッドキャスト】意味を外すと、何が見える？｜まるごと聴く クロード・シャノンと情報理論の誕生【ハルとおじいさん #AI源流-2】',
      url: 'https://youtu.be/lDV58Z8XxH0',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-3',
      type: 'podcast',
      title: '【ポッドキャスト】半世紀後にしか証明されなかった予言｜まるごと聴く フランク・ローゼンブラットとパーセプトロン【ハルとおじいさん #AI源流-3】',
      url: 'https://youtu.be/gGcrFlY2Y0E',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-4',
      type: 'podcast',
      title: '【ポッドキャスト】世界より20年早く、その数式に気づいた人｜まるごと聴く 甘利俊一と情報幾何学【ハルとおじいさん #AI源流-4】',
      url: 'https://youtu.be/JR2rViO8-Yw',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-5',
      type: 'podcast',
      title: '【ポッドキャスト】画像を見分ける機械を、最初に作ったのは日本人だった｜まるごと聴く 福島邦彦とネオコグニトロン【ハルとおじいさん #AI源流-5】',
      url: 'https://youtu.be/kgdPnOuaVr0',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-6',
      type: 'podcast',
      title: '【ポッドキャスト】銀行の手書き文字を読んでいた機械が、世界を変えるまで｜まるごと聴く ヤン・ルカンとCNNの冬の時代【ハルとおじいさん #AI源流-6】',
      url: 'https://youtu.be/268kdjIa7g4',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-7',
      type: 'podcast',
      title: '【ポッドキャスト】40年信じ続けた人が、なぜ今、自分の発明を恐れているのか｜まるごと聴く ジェフリー・ヒントンと誤差逆伝播法【ハルとおじいさん #AI源流-7】',
      url: 'https://youtu.be/e9LQL86alWM',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-AI源流-8',
      type: 'podcast',
      title: '【ポッドキャスト】6人は迫害されたわけではなかった｜まるごと聴く AI源流・終章【ハルとおじいさん #AI源流-8】',
      url: 'https://youtu.be/pfacYJ75t64',
      relatedParts: ['part8'],
      question: '生成AIは、何を生成しているのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-01',
      type: 'podcast',
      title: 'なぜ人間だけが腰痛になるのか——ルーシーから始まる立つことの代価と革命｜まるごと聴く 二足歩行という革命【ハルとおじいさん #9P-1】',
      url: 'https://youtu.be/ntz9H4H2P_8',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-02',
      type: 'podcast',
      title: '道具を作るには、まず頭の中に完成形が必要だった——260万年の道具史と「存在しないものを作る」能力｜まるごと聴く 手と道具【ハルとおじいさん #9P-2】',
      url: 'https://youtu.be/rd2EIzy0YpE',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-03',
      type: 'podcast',
      title: '人間の脳は「150人のために」作られていた｜まるごと聴く ダンバー数の深層【ハルとおじいさん #9P-3】',
      url: 'https://youtu.be/VlhvEkIYyik',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-04',
      type: 'podcast',
      title: '目が合うと伝わるのはなぜか——言語以前の身体が語っていたこと｜まるごと聴く 言語以前の身体【ハルとおじいさん #9P-4】',
      url: 'https://youtu.be/7Y9C8qRlfZk',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-05',
      type: 'podcast',
      title: '「もっと食べたい」に終わりがないのは、設計通りだった｜まるごと聴く 報酬系の深層【ハルとおじいさん #9P-5】',
      url: 'https://youtu.be/MXHFv-C1UYA',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-06',
      type: 'podcast',
      title: '今感じている不安は、石器時代の警報ではないか——ネガティビティバイアスと恐怖の正体｜まるごと聴く 恐怖と不安【ハルとおじいさん #9P-6】',
      url: 'https://youtu.be/kr9edRMXVbA',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-07',
      type: 'podcast',
      title: '「いいね」が欲しくなるのは本能だった——集団に認められることが命がかかっていた時代の話｜まるごと聴く 集団本能【ハルとおじいさん #9P-7】',
      url: 'https://youtu.be/IhYS6kPtXa8',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-08',
      type: 'podcast',
      title: 'スマホはスロットマシンと同じ原理で設計されていた——不確実な報酬がドーパミンを最大化する｜まるごと聴く 即時報酬の罠【ハルとおじいさん #9P-8】',
      url: 'https://youtu.be/DvWh6OPdswA',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-09',
      type: 'podcast',
      title: '何もしていないのになぜ疲れるのか——現代の情報量が脳にとって「異常環境」である理由｜まるごと聴く 情報過多【ハルとおじいさん #9P-9】',
      url: 'https://youtu.be/0PlxsWr88Sg',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-10',
      type: 'podcast',
      title: '勉強しながら音楽を聴くのは効率が悪いのか——マルチタスクの神話と、集中が希少資源になった時代｜まるごと聴く 集中という希少資源【ハルとおじいさん #9P-10】',
      url: 'https://youtu.be/COaaST1OOAI',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-11',
      type: 'podcast',
      title: '写真や動画は残るのに、なぜあのときの感覚は戻ってこないのか——身体の時間と情報の時間の話｜まるごと聴く 身体と時間【ハルとおじいさん #9P-11】',
      url: 'https://youtu.be/cwB6szqgF2U',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-12',
      type: 'podcast',
      title: '痛みを感じない人が短命になる理由——苦しみから意味が生まれるとしたら？｜まるごと聴く 痛みの哲学【ハルとおじいさん #9P-12】',
      url: 'https://youtu.be/gXNxha63w-w',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-13',
      type: 'podcast',
      title: '十代に聴いた音楽がずっと特別な理由——感性はデータではなく生きた時間でできている｜まるごと聴く 感性の正体【ハルとおじいさん #9P-13】',
      url: 'https://youtu.be/ZbTv8jaoBMU',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-14',
      type: 'podcast',
      title: '統計の「平均」に当てはまる人間は存在しない——この身体はどこにも替えがきかない｜まるごと聴く 身体の個別性【ハルとおじいさん #9P-14】',
      url: 'https://youtu.be/LTNnVSHcuVA',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part9-15',
      type: 'podcast',
      title: '生物進化は止まった——でも文化は猛スピードで変わり続ける｜まるごと聴く 旧石器時代の身体で生成AI時代を生きる【ハルとおじいさん #9P-15 最終回】',
      url: 'https://youtu.be/PI-wAiGQZFU',
      relatedParts: ['part9'],
      question: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-1',
      type: 'podcast',
      title: '感動はどこで生まれるのか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-1】',
      url: 'https://youtu.be/SHKD17oD69M',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-2',
      type: 'podcast',
      title: '美しいとは何か｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-2】',
      url: 'https://youtu.be/aC0XAF6MQt4',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-3',
      type: 'podcast',
      title: '共感の回路｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-3】',
      url: 'https://youtu.be/GjEa2rHbPSk',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-4',
      type: 'podcast',
      title: '直感とは何か｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-4】',
      url: 'https://youtu.be/YlL2P_PxXBI',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-5',
      type: 'podcast',
      title: '物語に引き込まれる理由｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-5】',
      url: 'https://youtu.be/bSNDcG2mTC8',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-6',
      type: 'podcast',
      title: 'なぜ美を感じるのか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-6】',
      url: 'https://youtu.be/Mb0aa7Bw_40',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-7',
      type: 'podcast',
      title: '芸術は役に立つのか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-7】',
      url: 'https://youtu.be/u4RWKHrkvTo',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-8',
      type: 'podcast',
      title: '共感はなぜ必要だったか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-8】',
      url: 'https://youtu.be/VCVKKrrrvYo',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-9',
      type: 'podcast',
      title: '意味を求める動物｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-9】',
      url: 'https://youtu.be/k2YOKw2ID7U',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-10',
      type: 'podcast',
      title: '感性は副産物か適応か｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-10】',
      url: 'https://youtu.be/N2ZNGwRGaxk',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-11',
      type: 'podcast',
      title: '生成芸術は美しいか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-11】',
      url: 'https://youtu.be/fWhDfqGEgtY',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-12',
      type: 'podcast',
      title: 'AIは共感できるか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-12】',
      url: 'https://youtu.be/hFbsweevWxc',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-13',
      type: 'podcast',
      title: '意味はどこに宿るか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-13】',
      url: 'https://youtu.be/H_lsN4008fw',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-14',
      type: 'podcast',
      title: '教育と感性｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-14】',
      url: 'https://youtu.be/vSg-inDnF8E',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    },
    {
      id: 'podcast-part10-15',
      type: 'podcast',
      title: '感性は再現できるのか｜まるごと聴く ポッドキャスト版【ハルとおじいさん #10P-15】',
      url: 'https://youtu.be/g8E_omo0CqE',
      relatedParts: ['part10'],
      question: '感性は再現可能なのか。',
      relation: 'Podcastで深める'
    }
  ];

  function firstQuestionFor(partId) {
    const part = parts.find((item) => item.id === partId);
    return part && Array.isArray(part.questions) && part.questions.length ? part.questions[0] : '';
  }

  function primaryPartFor(note) {
    const related = Array.isArray(note.relatedParts) ? note.relatedParts : [];
    return related.find((id) => id !== 'note' && parts.some((part) => part.id === id)) ||
      related.find((id) => id === 'evolution' || id === 'note') ||
      'note';
  }

  function relationForNote(note) {
    if (note.relation) return note.relation;
    const partId = primaryPartFor(note);
    if (partId === 'evolution') return '人類史から伸びる枝道';
    if (partId === 'note') return '制作と学びの枝道';
    const part = parts.find((item) => item.id === partId);
    return part ? part.title + 'から伸びる枝道' : '問いから伸びる枝道';
  }

  function youtubeMediaForPart(part) {
    const url = part.youtubeUrl || part.playlistUrl;
    if (!url) return null;
    return {
      id: 'youtube-' + part.id,
      type: 'youtube',
      title: part.title,
      url,
      relatedParts: [part.id],
      question: firstQuestionFor(part.id),
      relation: '物語の入口'
    };
  }

  function noteToMediaItem(note) {
    const partId = primaryPartFor(note);
    return {
      id: note.id,
      type: 'note',
      title: note.title,
      url: note.url || '',
      status: note.status,
      number: note.number,
      tags: note.tags || [],
      relatedParts: note.relatedParts || [],
      relatedPodcastId: note.relatedPodcastId || '',
      relatedPodcastUrl: note.relatedPodcastUrl || '',
      relatedYouTubeId: note.relatedYouTubeId || '',
      relatedYouTubeUrl: note.relatedYouTubeUrl || '',
      ctaCopy: note.ctaCopy || '',
      question: note.question || firstQuestionFor(partId) || note.title,
      relation: relationForNote(note),
      excerpt: note.excerpt || ''
    };
  }

  const mediaItems = parts
    .map(youtubeMediaForPart)
    .filter(Boolean)
    .concat(notes.map(noteToMediaItem), extraMediaItems);

  window.ManabiMapData = {
    version: '2026-05-04-media-branches',
    parts,
    concepts,
    notes,
    mediaItems,
    mediaTypeMeta,
    routes,
    questions,
    findById(id) {
      return parts.find((item) => item.id === id) ||
        concepts.find((item) => item.id === id) ||
        notes.find((item) => item.id === id) ||
        mediaItems.find((item) => item.id === id) ||
        routes.find((item) => item.id === id) ||
        questions.find((item) => item.id === id) ||
        null;
    },
    notesForPart(partId) {
      return notes.filter((note) => Array.isArray(note.relatedParts) && note.relatedParts.includes(partId));
    },
    mediaForPart(partId, type) {
      return mediaItems.filter((item) => {
        const matchesPart = Array.isArray(item.relatedParts) && item.relatedParts.includes(partId);
        const matchesType = !type || item.type === type;
        return matchesPart && matchesType;
      });
    },
    partsForTag(tag) {
      return parts.filter((part) => Array.isArray(part.tags) && part.tags.includes(tag));
    }
  };
})();
