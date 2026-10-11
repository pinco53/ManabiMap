/*
 * Manabi Map EDU：メタ分析と効果量の棚（15枚）
 * 中身は Claude が書く。描画側で数値を書きかえたり、棒グラフ等で大小を誇張したりしない（計画書 §2-5）。
 * effect は研究が報告した値をそのまま書く。metric は値の種類（効果量 d・g、相関 r、EEFの「か月」など）。
 */
(function () {
  'use strict';

  window.ManabiEduEvidence = [
    {
      id: 'M-00', theme: '効果量の読み方', study: 'Kraft (2020) Interpreting effect sizes of education interventions', year: 2020,
      effect: '目安：0.05未満は小さい、0.05〜0.20未満は中くらい、0.20以上は大きい（学力を標準化テストで測る、因果を確かめた研究の場合）。教育のランダム化比較試験の効果量の中央値は0.1ほどだった',
      metric: '標準化された効果量（標準偏差の単位）',
      population: '学校教育の介入研究（ランダム化比較試験など）',
      quality: '約750の教育のランダム化比較試験の効果の分布にもとづく目安の提案。この目安の算出方法には、シンプソンによる技術的な批判もある。',
      caution: '心理学でよく使われる「0.2は小さい、0.8は大きい」という目安は、教育の介入には厳しすぎる。一方、研究者が作った小さなテストや、小規模の研究では、効果量は大きく出やすい。効果量は、費用や対象の人数とあわせて読む。',
      certainty: 'robust', relatedCards: ['M-01', 'M-03', 'R-G06'], relatedParts: ['part28', 'part31'],
      sources: [{ label: 'M. A. Kraft (2020) Interpreting effect sizes of education interventions', url: 'https://doi.org/10.3102/0013189X20912798' }]
    },
    {
      id: 'M-01', theme: '800以上のメタ分析の集大成と「0.4の基準」', study: 'Hattie (2009) Visible Learning', year: 2009,
      effect: '138の要因の平均効果量を並べ、0.40を「平均的な1年の伸び」の目安（ヒンジポイント）とした',
      metric: '効果量 d（メタ分析の平均）',
      population: '800以上のメタ分析、5万以上の研究をまとめたもの（のちの版でさらに拡大）',
      quality: '教育の研究をひとつの物差しで見渡せる、影響の大きい集大成。',
      caution: '測り方も対象もちがう研究の効果量を平均して比べてよいのか、という強い批判がある（スヌークほか 2009、シンプソン 2017 など）。研究者が作ったテストや短い介入ほど効果量が大きく出やすく、「0.4より上なら効く」と単純に読むことはすすめられない。順位表としてではなく、問いを立てる手がかりとして使う。',
      certainty: 'contested', relatedCards: ['M-00', 'M-03', 'R-E02'], relatedParts: [],
      sources: [{ label: 'J. Hattie, Visible Learning (2009)', url: '' }]
    },
    {
      id: 'M-02', theme: 'EEF Teaching and Learning Toolkit', study: 'Education Endowment Foundation（イギリス）', year: 2011,
      effect: '取り組みごとに、平均で「何か月分の追加の伸び」に当たるか、費用、根拠の強さ（南京錠の数）を並べて示す',
      metric: '追加の伸び（か月）／費用／根拠の強さ',
      population: '主にイギリスと英語圏の学校の研究（30以上の取り組み）',
      quality: '研究の質を評価したうえでまとめ、学校が使いやすい形にした公的な資料。定期的に更新される。',
      caution: '「か月」は効果量を換算した目安で、どの学校でも同じだけ伸びるという意味ではない。取り組みの名前が同じでも、実施の質で効果は大きく変わる。日本の学校への当てはめには、教育制度のちがいへの注意が必要。',
      certainty: 'robust', relatedCards: ['R-G06', 'M-12'], relatedParts: [],
      sources: [{ label: 'EEF Teaching and Learning Toolkit', url: 'https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit' }]
    },
    {
      id: 'M-03', theme: '研究のやり方が、効果量を大きく見せる', study: 'Cheung & Slavin (2016)／Best Evidence Encyclopedia', year: 2016,
      effect: '小規模の研究、研究者が作ったテスト、準実験の研究では、効果量が大きく出やすいことを示した',
      metric: '効果量の比較',
      population: '就学前・読み・算数・理科のプログラムを評価した12のレビューに含まれる645件の研究',
      quality: '研究の方法の特徴と効果量の関係を調べたメタ研究。スレイヴィンたちは、質の基準を満たす研究だけを集めた「Best Evidence Encyclopedia」を公開している。',
      caution: '効果量を比べるときは、まず研究の規模、テストの種類、くらべ方（ランダムか）を確かめる。',
      certainty: 'robust', relatedCards: ['M-00', 'M-01'], relatedParts: [],
      sources: [{ label: 'Cheung & Slavin (2016) How methodological features affect effect sizes in education', url: 'https://doi.org/10.3102/0013189X16656615' }, { label: 'Best Evidence Encyclopedia', url: 'https://bestevidence.org/' }]
    },
    {
      id: 'M-04', theme: 'フィードバック（逆効果になる場合も）', study: 'Kluger & DeNisi (1996)', year: 1996,
      effect: '平均の効果量は d = 0.41。ただし3分の1以上のケースで、フィードバックは成績を下げていた',
      metric: '効果量 d',
      population: '607の効果量（学校以外の職場の研究も含む）',
      quality: 'フィードバック研究の代表的なメタ分析。',
      caution: '自己（人柄・能力）に注意を向けさせるフィードバックは逆効果になりやすく、課題や次の手順に注意を向けるものが効きやすい（R-E02）。「フィードバックは効く」とひとまとめにしない。',
      certainty: 'robust', relatedCards: ['R-E02', 'R-E01'], relatedParts: ['part24'],
      sources: [{ label: 'Kluger & DeNisi (1996) The effects of feedback interventions on performance', url: 'https://doi.org/10.1037/0033-2909.119.2.254' }]
    },
    {
      id: 'M-05', theme: '形成的評価の効果の大きさの再検討', study: 'Kingston & Nash (2011)', year: 2011,
      effect: '平均の効果量はおよそ0.2（ブラックとウィリアムの0.4〜0.7よりかなり小さい）',
      metric: '効果量 d',
      population: '幼稚園から高校までの形成的評価の研究（条件を満たした研究は少数）',
      quality: '研究の数が少なく、質にもばらつきがあると著者自身が述べている。',
      caution: '効果がないという意味ではない。形成的評価の定義のあいまいさと、研究の不足を示している。実施の形（教師研修、コンピューターの利用など）で効果がちがった。',
      certainty: 'qualified', relatedCards: ['R-E01'], relatedParts: [],
      sources: [{ label: 'Kingston & Nash (2011) Formative assessment: A meta-analysis and a call for research', url: 'https://doi.org/10.1111/j.1745-3992.2011.00220.x' }]
    },
    {
      id: 'M-06', theme: '社会性と情動の学習（SEL）', study: 'Durlak et al. (2011)', year: 2011,
      effect: '社会的スキルや行動が改善し、学力（標準化テストや成績）では11パーセンタイルほどの向上',
      metric: 'パーセンタイル',
      population: '幼稚園から高校までの213のプログラム、約27万人',
      quality: '学校でのSELの効果を示した代表的なメタ分析。',
      caution: '手順どおりに実施されたプログラムで効果が大きかった。学力の結果を報告した研究は全体の一部にとどまる。',
      certainty: 'robust', relatedCards: ['R-F07'], relatedParts: ['part29'],
      sources: [{ label: 'Durlak et al. (2011) The impact of enhancing students\' social and emotional learning', url: 'https://doi.org/10.1111/j.1467-8624.2010.01564.x' }]
    },
    {
      id: 'M-07', theme: '個別指導（チュータリング）', study: 'Nickow, Oreopoulos & Quan (2020)／VanLehn (2011)', year: 2020,
      effect: 'ランダム化比較試験の統合で、2020年の報告では平均0.37標準偏差、2024年に公表された改訂版では0.29標準偏差ほどの向上。教師や専門の補助者による指導、低学年、授業時間内の指導で効果が大きかった',
      metric: '効果量（標準偏差）',
      population: '幼稚園から高校までの個別・少人数の指導',
      quality: 'ランダム化比較試験にしぼった統合。2020年版は査読前のワーキングペーパーで、改訂版で推定値が小さくなった。ヴァンレーン（2011年）は人による個別指導の効果を0.79とまとめた。',
      caution: 'ブルームの「2シグマ」（2.0）よりはずっと小さい（R-E05）。週に何回、だれが、どのくらいの人数で行うかで効果が変わる。',
      certainty: 'robust', relatedCards: ['R-E05'], relatedParts: ['part26'],
      sources: [{ label: 'Nickow, Oreopoulos & Quan (2020) The impressive effects of tutoring on PreK-12 learning', url: 'https://www.nber.org/papers/w27476' }]
    },
    {
      id: 'M-08', theme: '教師へのコーチング', study: 'Kraft, Blazar & Hogan (2018)', year: 2018,
      effect: '授業のやり方の改善に0.49、子どもの学力に0.18の効果',
      metric: '効果量（標準偏差）',
      population: '教師へのコーチングの因果的な研究60件（授業のやり方の結果は43件、多くは幼児・小学校の読みの指導のコーチング）',
      quality: '教師研修の中で、コーチングの効果を示した代表的なメタ分析。',
      caution: '規模の大きなプログラムでは効果が小さくなる傾向があった。コーチの質と、研修の時間の確保が条件になる。',
      certainty: 'robust', relatedCards: ['R-A07', 'R-E07'], relatedParts: [],
      sources: [{ label: 'Kraft, Blazar & Hogan (2018) The effect of teacher coaching on instruction and achievement', url: 'https://doi.org/10.3102/0034654318759268' }]
    },
    {
      id: 'M-09', theme: 'マインドセット介入', study: 'Sisk et al. (2018) ほか', year: 2018,
      effect: 'マインドセットと成績の関連は r = 0.10ほど、介入の効果は d = 0.08ほどと、どちらも弱かった（論文の要旨では「全体として弱い」と表現）',
      metric: '相関 r／効果量 d',
      population: '関連の分析は129の研究の273の効果量（約36万6千人）、介入の分析は43の効果量（約5万7千人）（シスクたち）',
      quality: 'その後、もっとも厳しい基準で選んだ63の研究では d = 0.05 とさらに小さいとする再分析（マクナマラとバーゴイン）と、条件によって効果があるとする分析（バーネットたち）が出て、評価が分かれている。',
      caution: '平均は小さいが、成績が低めの生徒や、挑戦を支える学校文化があるところでは効果が見られる（イェーガーたち、2019年）。',
      certainty: 'contested', relatedCards: ['R-D08'], relatedParts: ['part24'],
      sources: [{ label: 'Sisk et al. (2018) To what extent and under which circumstances are growth mind-sets important to academic achievement?', url: 'https://doi.org/10.1177/0956797617739704' }]
    },
    {
      id: 'M-10', theme: '宿題と学力', study: 'Cooper, Robinson & Patall (2006)', year: 2006,
      effect: '宿題と学力には正の関連があり、中学・高校で強く、小学校では弱かった',
      metric: '相関・効果量',
      population: '1987〜2003年の宿題の研究',
      quality: 'ランダムに分けた研究は少なく、多くは相関研究。',
      caution: '宿題の量を増やせばよいわけではなく、学年に応じた量と目的（練習・準備・ふり返り）が問われる。小学校低学年では、学力よりも学習習慣の面が中心になる。',
      certainty: 'qualified', relatedCards: ['R-C01', 'R-C02'], relatedParts: ['part26'],
      sources: [{ label: 'Cooper, Robinson & Patall (2006) Does homework improve academic achievement?', url: 'https://doi.org/10.3102/00346543076001001' }]
    },
    {
      id: 'M-11', theme: '少人数学級', study: 'テネシー州 STAR 実験（Finn & Achilles 1990 ほか）', year: 1985,
      effect: '13〜17人の学級に入った子どもは、22〜25人の学級より、学力が0.2標準偏差ほど高かった',
      metric: '効果量（標準偏差）',
      population: 'テネシー州の79校、幼稚園から小学3年生までの約1万1,600人（1985〜1989年）。子どもと教師をランダムに割り当てた',
      quality: '少人数学級の効果を確かめた、大規模なランダム化実験。',
      caution: '効果は低学年と、家庭の収入の低い子どもで大きかった。数人減らす程度では効果ははっきりしない。カリフォルニア州が急に学級を小さくしたときは、経験の浅い教師が増え、期待どおりの効果が出なかった。',
      certainty: 'robust', relatedCards: ['R-G02'], relatedParts: [],
      sources: [{ label: 'Finn & Achilles (1990) Answers and questions about class size: A statewide experiment', url: '' }]
    },
    {
      id: 'M-12', theme: 'メタ認知と自己調整の指導', study: 'EEF Toolkit／Dignath, Buettner & Langfeldt (2008)', year: 2008,
      effect: 'EEFでは、費用がとても低く、平均+7か月の伸び（効果量0.58ほど）に当たるとされる。小学校の研究では+8か月',
      metric: '追加の伸び（か月）／効果量',
      population: '小学生の自己調整学習の介入研究ほか',
      quality: 'EEFでは根拠の強さが高い取り組みのひとつに位置づけられている。',
      caution: '「ふり返りを書かせる」だけではなく、教科の内容と結びつけて、計画・点検・評価の方略を明示的に教えることが条件になる。',
      certainty: 'robust', relatedCards: ['R-C06', 'R-C07'], relatedParts: ['part26'],
      sources: [{ label: 'EEF: Metacognition and self-regulation', url: 'https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation' }]
    },
    {
      id: 'M-13', theme: '読みの指導（フォニックス）', study: 'National Reading Panel (2000)', year: 2000,
      effect: '体系的なフォニックスの指導の効果量は d = 0.41（38の実験・66の比較）。早く始めた場合は0.55、小学1年生より後に始めた場合は0.27',
      metric: '効果量 d',
      population: '英語圏の読みの指導の研究',
      quality: 'アメリカ議会の求めで行われた大規模な研究のまとめ（エーリたち、2001年にも論文として発表）。同じ研究を重みづけを変えて再分析すると0.2〜0.3ほどになるという指摘もある。',
      caution: '英語のつづりと音の対応を教える指導で、仮名のように音と文字の対応が規則的な日本語にそのまま当てはまるわけではない。読解の力には、語彙や知識も大きく関わる。',
      certainty: 'robust', relatedCards: ['R-C08'], relatedParts: [],
      sources: [{ label: 'National Reading Panel, Teaching Children to Read (2000)', url: '' }]
    },
    {
      id: 'M-14', theme: '分散学習・想起練習のメタ分析', study: 'Cepeda et al. (2006)／Adesope, Trevisan & Sundararajan (2017)', year: 2017,
      effect: '思い出す練習は、読み直しなどほかの学習条件より効果が大きかった（固定効果モデルで g = 0.61、ランダム効果モデルでは0.70と紹介されている）。間をあけて学ぶ効果も、多数の研究でくり返し確かめられている',
      metric: '効果量 g',
      population: '実験室と教室の研究（大学生が多い）',
      quality: '学習法の中で、もっとも確かな根拠を持つものの一つ。',
      caution: '教室の実践での効果は、テストのやり方（成績をつけない、すぐに答えを確かめる）に左右される。',
      certainty: 'robust', relatedCards: ['R-C01', 'R-C02', 'R-C03'], relatedParts: ['part26'],
      sources: [{ label: 'Adesope, Trevisan & Sundararajan (2017) Rethinking the use of tests: A meta-analysis of practice testing', url: 'https://doi.org/10.3102/0034654316689306' }, { label: 'Cepeda et al. (2006) Distributed practice in verbal recall tasks', url: 'https://doi.org/10.1037/0033-2909.132.3.354' }]
    }
  ];
}());
