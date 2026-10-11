/*
 * Manabi Map EDU：近代教育史（世界の帯・日本の帯）
 * 中身は Claude が書く。描画側で書き足し・書き換えをしない。
 * lane: 'world' | 'japan'。同じ year どうしを横にそろえて表示する（計画書 §2-3）。
 * certainty は、広く語られるが確かめにくい説明にだけ付ける（ふつうの史実には付けない）。
 * relatedHumanParts は人類史の部（第1〜3部など）とのつながり。
 */
(function () {
  'use strict';

  window.ManabiEduHistory = {
    title: '近代教育史 ── 産業革命から生成AIまで',
    lead: '学校は、いつ、なぜ、今の形になったのか。世界と日本の教育の流れを並べて、人類史の大きな変化と重ねて見ます。',
    bridges: [
      { humanPart: 'part1', label: '第1部 産業革命', edu: '大勢の子どもを一度に教える近代学校と、義務教育の誕生' },
      { humanPart: 'part2', label: '第2部 デジタル革命', edu: 'コンピューターと教育、ICTと1人1台端末' },
      { humanPart: 'part3', label: '第3部 AI革命', edu: '生成AIと学校、学ぶことの意味の問い直し' }
    ],
    items: [
      /* ───────── 世界 ───────── */
      { lane: 'world', year: 1763, title: 'プロイセンの一般地方学事通則', description: 'プロイセンで、5歳ごろから13〜14歳までの子どもの就学を義務とする規則が出された。実際に全員が通うようになるのは、ずっと後のこと。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 1780, title: '日曜学校', description: 'イギリスのロバート・レイクスが、工場で働く子どもたちのために、日曜日に読み書きを教える学校を広めた。', relatedCards: [], relatedHumanParts: ['part1'] },
      { lane: 'world', year: 1800, title: 'ベル＝ランカスターの助教法', description: '年長の生徒（助教）が年少の生徒に教えるしくみで、ひとりの教師が何百人もの子どもを教えられるようにした。安く大勢を教える方法として広まった。', relatedCards: [], relatedHumanParts: ['part1'] },
      { lane: 'world', year: 1805, title: 'ペスタロッチのイヴェルドン学園', description: 'スイスのペスタロッチが、子どもの直観と生活から出発する教育を実践し、各国から見学者が集まった。', relatedCards: ['R-A01'], relatedHumanParts: [] },
      { lane: 'world', year: 1837, title: 'フレーベルの幼児教育施設', description: 'ドイツのフレーベルが幼児のための施設を開き、1840年に「幼稚園（キンダーガルテン）」と名づけた。遊びと恩物（教育的な遊具）を重んじた。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 1837, title: 'ホレース・マンの公立学校運動', description: 'アメリカ・マサチューセッツ州の教育委員会の初代長官となり、税で運営する、すべての子どものための公立学校（コモン・スクール）を広めた。1852年には同州で義務就学の法律ができた。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 1870, title: 'イギリスの初等教育法', description: '公立の初等学校を各地に設けるしくみが作られ、その後、義務化と無償化が進んだ。', relatedCards: [], relatedHumanParts: ['part1'] },
      { lane: 'world', year: 1896, title: 'デューイの実験学校', description: 'シカゴ大学に、経験と協働を中心にした実験学校が開かれた。のちの進歩主義教育の源流になる。', relatedCards: ['R-A01'], relatedHumanParts: [] },
      { lane: 'world', year: 1905, title: 'ビネーの知能検査', description: 'フランスのビネーとシモンが、特別な支援が必要な子どもを見つけるための検査を作った。のちにアメリカで知能指数（IQ）として広まり、子どもの選別にも使われた。', relatedCards: ['R-B09'], relatedHumanParts: [] },
      { lane: 'world', year: 1907, title: 'モンテッソーリの子どもの家', description: 'ローマの貧しい地区で、子どもが自分で選んだ活動に集中できる環境を用意した教室が始まった。', relatedCards: [], relatedHumanParts: [], relatedEpisodes: ['32-6'] },
      { lane: 'world', year: 1919, title: 'シュタイナー学校', description: 'ドイツのシュトゥットガルトに、芸術と発達段階を重んじる自由ヴァルドルフ学校が開かれた。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 1956, title: 'ブルームの教育目標の分類', description: '学習目標を認知の深さで分類する枠組みが出され、評価とカリキュラム設計に広く使われるようになった。', relatedCards: ['R-A06'], relatedHumanParts: [] },
      { lane: 'world', year: 1957, title: 'スプートニク・ショックと教育改革', description: 'ソ連の人工衛星打ち上げをきっかけに、アメリカで理数教育の強化（1958年の国防教育法）と、教科の構造を重んじるカリキュラム改革が進んだ。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 1966, title: 'コールマン報告', description: '学力のちがいは学校の条件より家庭の背景で多く説明される、と示し、教育の機会均等の議論を大きく変えた。', relatedCards: ['R-G02'], relatedHumanParts: [] },
      { lane: 'world', year: 1968, title: 'フレイレ『被抑圧者の教育学』', description: '知識を一方的に預け入れる「銀行型教育」を批判し、対話による教育を唱えた。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 1980, title: 'パパート『マインドストーム』', description: '子どもがコンピューターで作りながら学ぶ構築主義と、プログラミング言語LOGOが広まった。', relatedCards: [], relatedHumanParts: ['part2'] },
      { lane: 'world', year: 1983, title: '『危機に立つ国家』', description: 'アメリカの学力低下に警鐘を鳴らした報告書で、学力の基準とテストによる説明責任を重んじる改革の流れが始まった。', relatedCards: ['R-G04'], relatedHumanParts: [] },
      { lane: 'world', year: 1989, title: '子どもの権利条約', description: '国連で採択され、子どもを権利の主体とし、意見を表明する権利などを定めた（日本は1994年に批准）。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 1995, title: 'TIMSS（国際数学・理科教育動向調査）', description: '算数・数学と理科の国際比較調査が始まった。授業のビデオ研究から、日本の授業研究が世界に紹介された。', relatedCards: ['R-E07'], relatedHumanParts: [] },
      { lane: 'world', year: 2000, title: 'PISA（生徒の学習到達度調査）', description: 'OECDが15歳を対象に、知識を実生活で使う力を測る国際調査を始めた。', relatedCards: ['R-G01'], relatedHumanParts: [] },
      { lane: 'world', year: 2002, title: 'どの子も置き去りにしない法（NCLB）', description: 'アメリカで、州の学力テストの結果にもとづいて学校の説明責任を問う法律が施行された。テスト対策への偏りや不正も問題になった。', relatedCards: ['R-G04'], relatedHumanParts: [] },
      { lane: 'world', year: 2009, title: 'ハッティ『Visible Learning』', description: '800以上のメタ分析をまとめ、教育の効果を効果量で見渡す試みが、各国の教育政策に影響した。', relatedCards: ['M-01'], relatedHumanParts: [] },
      { lane: 'world', year: 2011, title: 'EEF（教育基金財団）の設立', description: 'イギリスで、学校の取り組みの効果をランダム化比較試験で確かめ、結果を学校に届ける機関ができた。', relatedCards: ['M-02', 'R-G06'], relatedHumanParts: [] },
      { lane: 'world', year: 2015, title: '持続可能な開発目標（SDG4）', description: 'すべての人に包摂的で公正な質の高い教育を、という目標が国連で採択された。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'world', year: 2020, title: '新型コロナウイルスと休校', description: '世界の多くの国で学校が閉じられ、オンライン学習の広がりと、学びの格差が大きな課題になった。', relatedCards: ['R-G02'], relatedHumanParts: ['part2'] },
      { lane: 'world', year: 2023, title: '生成AIと教育のガイダンス', description: '対話型の生成AIの急速な普及を受けて、ユネスコが教育と研究での生成AIの利用についてのガイダンスを出した。', relatedCards: [], relatedHumanParts: ['part3'] },
      { lane: 'world', year: 1900, title: '【確かさ】「学校は工場をまねて作られた」という説明', description: '近代学校は工場の働き手を作るために、工場をまねて作られたという説明は広く語られるが、学校の成り立ちには宗教、国づくり、慈善など多くの動機があり、単純な説明は歴史家から批判されている。', certainty: 'contested', relatedCards: [], relatedHumanParts: ['part1'] },
      { lane: 'world', year: 1810, title: '【確かさ】「プロイセンの学校は従順な兵士を作るためだった」という説明', description: 'プロイセンの義務教育は従順な兵士と労働者を作るために作られた、という説明もよく語られるが、当時の改革には市民の教養を高めるねらいもあり、一面的な説明とされる。', certainty: 'contested', relatedCards: [], relatedHumanParts: [] },

      /* ───────── 日本 ───────── */
      { lane: 'japan', year: 1800, title: '寺子屋と藩校', description: '江戸時代には、庶民の子どもが読み書きそろばんを学ぶ寺子屋と、武士の子のための藩校が各地にあった。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1872, title: '学制', description: '全国に小学校を設け、すべての子どもを学ばせることをめざす、日本で最初の近代的な学校制度が始まった。授業料は家庭の負担で、就学率ははじめ低かった。', relatedCards: [], relatedHumanParts: ['part1'] },
      { lane: 'japan', year: 1879, title: '教育令', description: '学制にかわって地方の実情に合わせた制度にしたが、就学率が下がり、翌年に改正された。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1886, title: '学校令', description: '文部大臣・森有礼のもとで、小学校令・中学校令・師範学校令などが定められ、学校体系が整えられた。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1890, title: '教育勅語', description: '天皇の名で教育の理念が示され、戦前の学校教育の柱になった。1948年に国会で排除・失効が決議された。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1900, title: '義務教育の授業料無償', description: '小学校令の改正で、義務教育の授業料が原則として無償になり、就学率が大きく上がった。1907年には義務教育が6年に延長された。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1917, title: '大正新教育', description: '沢柳政太郎の成城小学校などで、子どもの個性と自発性を重んじる新しい教育が試みられた。', relatedCards: ['R-A01'], relatedHumanParts: [] },
      { lane: 'japan', year: 1941, title: '国民学校', description: '小学校が国民学校に改められ、戦時体制のもとで教育が国家の目的に強く結びつけられた。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1947, title: '教育基本法・学校教育法と六三制', description: '戦後の教育改革で、個人の尊厳を重んじる教育の理念が定められ、小学校6年・中学校3年の義務教育が始まった。学習指導要領も「試案」として出された。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1958, title: '学習指導要領の告示化', description: '学習指導要領が官報に告示され、法的な基準として扱われるようになった。系統的な学習が重視された。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1961, title: '全国学力調査（悉皆）', description: '1961年から中学校で全員を対象にした学力調査（悉皆）が行われたが、学校の序列化や不正、教職員組合の反対運動（旭川学テ事件など）が起き、悉皆の方式は4年で終わった。', relatedCards: ['R-G04'], relatedHumanParts: [] },
      { lane: 'japan', year: 1977, title: '「ゆとりと充実」の学習指導要領', description: '詰め込み教育への批判を受けて、授業時数と内容を減らす方向への転換が始まった。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 1998, title: '「生きる力」と総合的な学習の時間', description: '学習内容を大きく減らし、総合的な学習の時間を設けた学習指導要領が告示された（2002年から実施、完全学校週5日制も同年）。', relatedCards: ['R-A01'], relatedHumanParts: [] },
      { lane: 'japan', year: 2004, title: 'PISAショック', description: 'PISA2003の結果で、日本の読解力の順位が下がったことが大きく報道され、「確かな学力」の向上へと政策の重心が移った。', relatedCards: ['R-G01'], relatedHumanParts: [] },
      { lane: 'japan', year: 2006, title: '教育基本法の改正', description: '制定から約60年ぶりに改正され、公共の精神や伝統と文化の尊重などが加えられた。', relatedCards: [], relatedHumanParts: [] },
      { lane: 'japan', year: 2007, title: '全国学力・学習状況調査', description: '小学6年生と中学3年生を対象にした全国的な学力調査が始まった。教科の調査と質問紙調査を組み合わせている。', relatedCards: ['R-G01', 'R-G04'], relatedHumanParts: [] },
      { lane: 'japan', year: 2013, title: 'いじめ防止対策推進法', description: 'いじめの定義、学校の組織的な対応、重大事態の調査などを定めた法律ができた。', relatedCards: ['R-F05'], relatedHumanParts: [] },
      { lane: 'japan', year: 2016, title: '教育機会確保法', description: '不登校の子どもが学校以外の場で学ぶことの重要性を認め、休養の必要性にもふれた法律ができた。', relatedCards: ['R-F02'], relatedHumanParts: [] },
      { lane: 'japan', year: 2017, title: '「主体的・対話的で深い学び」の学習指導要領', description: '資質・能力の三つの柱と、主体的・対話的で深い学び、カリキュラム・マネジメントを打ち出した学習指導要領が告示された（小学校は2020年から実施）。', relatedCards: ['R-E06'], relatedHumanParts: [] },
      { lane: 'japan', year: 2019, title: 'GIGAスクール構想', description: '児童生徒1人1台の端末と高速通信の整備が打ち出され、新型コロナウイルスの影響で整備が前倒しされた。', relatedCards: [], relatedHumanParts: ['part2'] },
      { lane: 'japan', year: 2021, title: '「令和の日本型学校教育」答申', description: '中央教育審議会が、個別最適な学びと協働的な学びの一体的な充実を打ち出した。', relatedCards: ['R-B08', 'R-E09'], relatedHumanParts: [] },
      { lane: 'japan', year: 2023, title: '生成AIの利用に関する暫定的なガイドライン', description: '文部科学省が、初等中等教育段階での生成AIの利用について、暫定的なガイドラインを示した（2024年に改訂版）。', relatedCards: [], relatedHumanParts: ['part3'] },
      { lane: 'japan', year: 2024, title: '不登校が過去最多に', description: '2023年度の調査（2024年10月公表）で、小中学校の不登校の子どもが34万6,482人と過去最多になった。2024年度は35万3,970人で、12年連続で増えている。', relatedCards: ['R-F02'], relatedHumanParts: [] }
    ]
  };
}());
