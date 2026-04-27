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
      color: 'orange',
      pageUrl: 'parts/part1.html',
      youtubeUrl: 'https://youtu.be/WOGeJkSUkz0',
      remakeUrl: 'https://youtu.be/HrQnEL6hi4w',
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
      color: 'blue',
      pageUrl: 'parts/part2.html',
      youtubeUrl: 'https://youtu.be/kpMfSCAVHD8',
      remakeUrl: 'https://youtu.be/MZSwaQr27NI',
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
      color: 'cyan',
      pageUrl: 'parts/part3.html',
      youtubeUrl: 'https://youtu.be/VtfGezzADME',
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
      color: 'green',
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
      color: 'purple',
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
      color: 'gold',
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
      color: 'magenta',
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
      color: 'sky',
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
      color: 'sky',
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
    { id: 'note-01', number: 1, title: 'ChatGPTが登場するまで、人類に何があったのか。', url: 'https://note.com/manabimapcreator/n/n00c3101a661e', tags: ['生成AI', 'ChatGPT', '教育', '人類史'], relatedParts: ['part3', 'part8'] },
    { id: 'note-02', number: 2, title: '「機械に仕事を奪われる」という恐怖は、200年前にもあった。', status: 'draft', tags: ['産業革命', '歴史', 'AI', '仕事'], relatedParts: ['part1'] },
    { id: 'note-03', number: 3, title: 'ChatGPTに同じことを聞くと、なぜ毎回答えが違うのか。', status: 'draft', tags: ['生成AI', 'ChatGPT', '検索'], relatedParts: ['part3', 'part8'] },
    { id: 'note-04', number: 4, title: 'スマホの中に、80年分の革命が詰まっている。', status: 'draft', tags: ['デジタル革命', 'インターネット', '歴史'], relatedParts: ['part2'] },
    { id: 'note-05', number: 5, title: '生成AIは、いったい何を「生成」しているのか。', url: 'https://note.com/manabimapcreator/n/n05c7f8f23fc4', tags: ['生成AI', 'AI', '創造性'], relatedParts: ['part3', 'part8'] },
    { id: 'note-06', number: 6, title: '追い出された場所から、次の時代が生まれる。', url: 'https://note.com/manabimapcreator/n/nf03fbdb50e71', tags: ['進化', '歴史', '学び'], relatedParts: ['evolution'] },
    { id: 'note-07', number: 7, title: '「わかってもらえた」は、ただの確率かもしれない', url: 'https://note.com/manabimapcreator/n/n92652d8bad4c', tags: ['AI', '確率', '理解'], relatedParts: ['part3', 'part8'] },
    { id: 'note-08', number: 8, title: 'あのアイデア、本当に自分が思いついたのか', url: 'https://note.com/manabimapcreator/n/n669e2df9e9e9', tags: ['創造性', 'AI', '思考'], relatedParts: ['part3', 'part8', 'part8-2'] },
    { id: 'note-09', number: 9, title: 'AIに、何を問えばいいのか', url: 'https://note.com/manabimapcreator/n/nb299d49cfdd2', tags: ['AI', '問い', '教育'], relatedParts: ['part3', 'part8'] },
    { id: 'note-10', number: 10, title: '体の時間は、今も35億年前のままだ', url: 'https://note.com/manabimapcreator/n/n1195ea4b52e4', tags: ['身体', '時間', '進化'], relatedParts: ['part1', 'evolution'] },
    { id: 'note-11', number: 11, title: '世界はつながったのに、なぜ孤独なのか', url: 'https://note.com/manabimapcreator/n/nbf644c80243f', tags: ['つながり', '孤独', 'SNS'], relatedParts: ['part2'] },
    { id: 'note-12', number: 12, title: '記憶の中の人は、いつ「消える」のか', url: 'https://note.com/manabimapcreator/n/nc670691839e8', tags: ['記憶', 'AI', '存在'], relatedParts: ['part3'] },
    { id: 'note-13', number: 13, title: '「AIを使うと考えなくなる」--ソクラテスも、2400年前に言っていた', url: 'https://note.com/manabimapcreator/n/n3446a5ccce61', tags: ['ソクラテス', '文字', 'AI'], relatedParts: ['part4'] },
    { id: 'note-14', number: 14, title: 'なぜ人は、石に印をつけずにいられなかったのか', url: 'https://note.com/manabimapcreator/n/n1e582531d82f', tags: ['記号', '文字', '記録'], relatedParts: ['part4'] },
    { id: 'note-15', number: 15, title: '「読む楽しみ」は、いつ誰のものになったのか', url: 'https://note.com/manabimapcreator/n/n9c00c715d369', tags: ['読書', '印刷', '知識'], relatedParts: ['part4'] },
    { id: 'note-16', number: 16, title: '「知りたい」と思った瞬間、それは誰かが作った道かもしれない', url: 'https://note.com/manabimapcreator/n/naecb9a6237db', tags: ['知識', '検索', 'ネットワーク'], relatedParts: ['part4'] },
    { id: 'note-17', number: 17, title: '6,350トンのケーブルが運んだのは、何グラムの情報だったか', url: 'https://note.com/manabimapcreator/n/n8a3b5689ab7f', tags: ['情報', '通信', 'ケーブル'], relatedParts: ['part2', 'part4'] },
    { id: 'note-18', number: 18, title: '本を途中から読むと、なぜか罪悪感がある', url: 'https://note.com/manabimapcreator/n/nb1531205470c', tags: ['読書', '非線形', '知識'], relatedParts: ['part4'] },
    { id: 'note-19', number: 19, title: '人は世界を同じように捉えている？', url: 'https://note.com/manabimapcreator/n/n3f2187946e15', tags: ['検索', 'バイアス', '認知'], relatedParts: ['part2', 'part4'] },
    { id: 'note-20', number: 20, title: '音はずっとあった。では、いつ「意味」になったのか。', url: 'https://note.com/manabimapcreator/n/n5556f35e43b5', tags: ['音', '意味', '言語'], relatedParts: ['part5'] },
    { id: 'note-21', number: 21, title: '名前をつける前、世界はひとつながりだった。', url: 'https://note.com/manabimapcreator/n/n1cc11159159c', tags: ['名前', '言葉', '世界'], relatedParts: ['part5'] },
    { id: 'note-22', number: 22, title: '人類最古の名前は、英雄のものではなかった。', url: 'https://note.com/manabimapcreator/n/nd91398b2e60b', tags: ['名前', '文字', '文明'], relatedParts: ['part5'] },
    { id: 'note-23', number: 23, title: '頭の中で、あなたは誰と話しているのか', url: 'https://note.com/manabimapcreator/n/n180a0b52e8f6', tags: ['内なる声', '思考', '言語'], relatedParts: ['part5'] },
    { id: 'note-24', number: 24, title: '数の言葉を持たない民族が、いた', url: 'https://note.com/manabimapcreator/n/n11ad03fc63ef', tags: ['数', '言語', '抽象'], relatedParts: ['part5', 'part6'] },
    { id: 'note-25', number: 25, title: '棒の刻み目で、帝国は動いていた', url: 'https://note.com/manabimapcreator/n/nac7c30f224ac', tags: ['数', '記録', '文明'], relatedParts: ['part5', 'part6'] },
    { id: 'note-26', number: 26, title: '神社に数学を奉納した民族がいた', url: 'https://note.com/manabimapcreator/n/n3103a25ac2c4', tags: ['数学史', '和算', '数'], relatedParts: ['part5', 'part6'] },
    { id: 'note-27', number: 27, title: '「なぜ？」は、もともと逃げるためにあった', url: 'https://note.com/manabimapcreator/n/n89c60fb760af', tags: ['因果', '進化', '問い'], relatedParts: ['part5'] },
    { id: 'note-28', number: 28, title: '言語は、思考の牢獄か。それとも窓か', url: 'https://note.com/manabimapcreator/n/n253a052aba94', tags: ['言語', '思考', '認知'], relatedParts: ['part5'] },
    { id: 'note-29', number: 29, title: '完璧に答えられる人が、何もわかっていないとしたら', url: 'https://note.com/manabimapcreator/n/nd2075692b089', tags: ['理解', 'パフォーマンス', '教育'], relatedParts: ['part8-2'] },
    { id: 'note-30', number: 30, title: 'すべての答えが手に入る時代に、「問い」だけを届けるコンテンツを始めた', url: 'https://note.com/manabimapcreator/n/nb43ff699126c', tags: ['学び', '問い', 'サイト紹介'], relatedParts: ['note'] },
    { id: 'note-31', number: 31, title: '学べば学ぶほど、知らないことが増えていく', url: 'https://note.com/manabimapcreator/n/n5796b158faa3', tags: ['学び', '問い', '無知の知'], relatedParts: ['part5'] },
    { id: 'note-32', number: 32, title: '数える力は、生まれ持ったものだろうか', url: 'https://note.com/manabimapcreator/n/na8308189337b', tags: ['数感覚', '認知科学', '数'], relatedParts: ['part6'] },
    { id: 'note-33', number: 33, title: '数は、指を離れてどこへ行ったのか', url: 'https://note.com/manabimapcreator/n/n387ce13418ba', tags: ['数', '身体性', '記録'], relatedParts: ['part6'] },
    { id: 'note-34', number: 34, title: '数が指を離れた夜、無限が生まれた', url: 'https://note.com/manabimapcreator/n/n4da46f1a9bde', tags: ['ゼロ', '無限', '抽象化'], relatedParts: ['part6'] },
    { id: 'note-35', number: 35, title: '計算が生まれた日、人類は「試す」のをやめた', url: 'https://note.com/manabimapcreator/n/n9a89ce1888e3', tags: ['計算', '予測', '数'], relatedParts: ['part6'] },
    { id: 'note-36', number: 36, title: 'YouTubeと特設サイトで学ぶ--「ハルとおじいさん」が他にない理由', status: 'draft', tags: ['サイト紹介', 'YouTube', '学びの地図'], relatedParts: ['note'] },
    { id: 'note-37', number: 37, title: 'プロンプトを書くことが、デザインになった--GeminiでYouTube・noteのサムネをつくる', url: 'https://note.com/manabimapcreator/n/n90cb4cd059df', tags: ['Gemini', 'デザイン', 'サムネイル'], relatedParts: ['note'] },
    { id: 'note-38', number: 38, title: '「学びの種」をまく仕事--教育20年目に、生成AIが変えたもの', url: 'https://note.com/manabimapcreator/n/nf61a2cb5617d', tags: ['学び', '問い', '制作', '教育', '生成AI'], relatedParts: ['note', 'part8-2'] },
    { id: 'note-39', number: 39, title: '誰も「平均人」ではなかった。', url: 'https://note.com/manabimapcreator/n/n75ad2b140de4', tags: ['平均', '統計', '教育'], relatedParts: ['part6'] },
    { id: 'note-40', number: 40, title: '「内から生まれた言葉」とは、何だろう', url: 'https://note.com/manabimapcreator/n/n10281e399b72', tags: ['AI', '言葉', '創作'], relatedParts: ['part8', 'part8-2'] },
    { id: 'note-41', number: 41, title: 'テストで高得点を取ると、幸せになれるのか', url: 'https://note.com/manabimapcreator/n/ndc68c0112605', tags: ['学力', '幸福度', '教育'], relatedParts: ['part8-2'] },
    { id: 'note-42', number: 42, title: '定規を作ったのは誰か', status: 'local-draft', tags: ['測ること', '数字', '基準'], relatedParts: ['part6', 'part8-2'] }
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

  window.ManabiMapData = {
    version: '2026-04-27-phase1',
    parts,
    concepts,
    notes,
    routes,
    questions,
    findById(id) {
      return parts.find((item) => item.id === id) ||
        concepts.find((item) => item.id === id) ||
        notes.find((item) => item.id === id) ||
        routes.find((item) => item.id === id) ||
        questions.find((item) => item.id === id) ||
        null;
    },
    notesForPart(partId) {
      return notes.filter((note) => Array.isArray(note.relatedParts) && note.relatedParts.includes(partId));
    },
    partsForTag(tag) {
      return parts.filter((part) => Array.isArray(part.tags) && part.tags.includes(tag));
    }
  };
})();
