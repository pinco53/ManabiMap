(function () {
  'use strict';

  const MAX_AGE = 13_800_000_000;
  const PRESENT = 2026;
  const PICTURE_ZOOM = 2.7;
  const DETAIL_ZOOM = 2.35;
  const MAX_ZOOM = 48;
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const section = document.getElementById('top');
  const surface = document.getElementById('deepTimeSurface');
  const pointLayer = document.getElementById('deepTimePoints');
  const axis = document.getElementById('deepTimeAxis');
  const canvas = document.getElementById('deepTimeCanvas');
  if (!section || !surface || !pointLayer || !axis || !canvas) return;

  function ageFromDate(date) {
    if (date.indexOf('約3分後') >= 0 || /3 minutes? after/i.test(date)) return MAX_AGE - 0.000006;
    const englishAgo = date.match(/([\d.]+)\s*(billion|million|thousand)?\s*years? ago/i);
    if (englishAgo) return Number(englishAgo[1]) * (englishAgo[2] && englishAgo[2].toLowerCase() === 'billion' ? 1e9 : englishAgo[2] && englishAgo[2].toLowerCase() === 'million' ? 1e6 : englishAgo[2] && englishAgo[2].toLowerCase() === 'thousand' ? 1e3 : 1);
    const englishCenturyBce = date.match(/(\d+)(?:st|nd|rd|th)\s+century\s+(?:BCE|BC)/i);
    if (englishCenturyBce) return PRESENT + Number(englishCenturyBce[1]) * 100 - 50;
    const englishBce = date.match(/([\d,]+)\s*(?:BCE|BC)/i);
    if (englishBce) return PRESENT + Number(englishBce[1].replace(/,/g, '')) - 1;
    const ago = date.match(/([\d.]+)(億|万)?年前/);
    if (ago) return Number(ago[1]) * (ago[2] === '億' ? 1e8 : ago[2] === '万' ? 1e4 : 1);
    const centuryRange = date.match(/(\d+)〜\d+世紀/);
    const century = centuryRange || date.match(/(\d+)世紀/);
    const bce = date.indexOf('紀元前') >= 0;
    const raw = date.match(/\d+/);
    if (!raw) return 0;
    // Astronomical year numbering: 1 BCE is year 0, not -1.
    const year = century ? (bce ? 1 - Number(century[1]) * 100 : (Number(century[1]) - 1) * 100 + 1) : bce ? 1 - Number(raw[0]) : Number(raw[0]);
    return Math.max(0, PRESENT - year);
  }

  function logPosition(age) {
    return .88 * (1 - Math.log10(1 + age) / Math.log10(1 + MAX_AGE));
  }

  // Each turning point has been read and tagged explicitly. A point can belong
  // to several lenses: overlap is part of the learning experience, not an error.
  const EVENT_LENSES = {
    'ビッグバン': 'energy worldview',
    '軽元素の原子核': 'energy environment worldview',
    '最初の星と銀河': 'energy environment worldview',
    '地球の誕生': 'environment energy',
    '月の誕生': 'environment energy',
    '初期生命の痕跡': 'body environment',
    '酸素を生む光合成と大酸化': 'energy environment body',
    '真核生物の登場': 'body environment',
    '複雑な多細胞生物の広がり': 'body environment',
    'カンブリア爆発': 'body environment',
    '陸上に生命が上陸': 'body environment mobility',
    '恐竜の時代': 'body environment',
    '大量絶滅と非鳥類型恐竜の消失': 'environment body',
    '霊長類の登場': 'body environment',
    '初期人類の候補': 'body environment',
    'アウストラロピテクス': 'body mobility',
    '現在知られる初期の石器': 'tools body',
    'アフリカを出る': 'mobility environment body cooperation',
    '火の制御': 'tools energy body cooperation',
    'ホモ・サピエンス誕生': 'body cooperation',
    '埋葬と死者へのまなざし': 'worldview cooperation',
    '象徴行動の広がり': 'worldview information cooperation',
    '世界への大拡散': 'mobility environment cooperation',
    '洞窟壁画・装飾品': 'tools information worldview',
    'ネアンデルタール人の消失': 'body environment',
    '土器の発明': 'tools environment cooperation',
    '犬の家畜化': 'body environment cooperation',
    '農業革命': 'tools energy environment cooperation',
    'ギョベクリ・テペ': 'worldview cooperation tools',
    '定住と家畜化': 'cooperation environment body',
    '灌漑と水の共同管理': 'tools energy environment cooperation power',
    '初期都市ウルク': 'cooperation power information tools',
    '馬の家畜化と移動圏の拡大': 'tools mobility energy cooperation',
    '車輪の発明': 'tools mobility energy',
    '青銅器と長距離交易': 'tools energy mobility power',
    '文字の発明': 'information tools power cooperation',
    'エジプト文明・ヒエログリフ': 'information cooperation power worldview',
    'インダスの計画都市': 'tools cooperation environment power',
    'ハンムラビ法典': 'information power cooperation',
    '鉄器時代': 'tools energy power',
    'アルファベット': 'information tools',
    '枢軸時代のはじまり': 'worldview information cooperation',
    '鋳造貨幣の普及': 'information cooperation power mobility',
    '仏教の成立と伝播': 'worldview cooperation mobility information',
    'アテネの民主政': 'power cooperation information',
    'ゼロという数と演算へ': 'information tools worldview',
    '秦の中国統一': 'power cooperation information',
    'ローマ帝国成立': 'power cooperation mobility',
    'シルクロードの形成': 'mobility cooperation information',
    '紙の製法改良と記録': 'information tools cooperation',
    'キリスト教公認': 'worldview cooperation power',
    'マヤ文明の都市と知': 'information cooperation worldview tools',
    '科挙と官僚制': 'information power cooperation',
    'イスラム黄金期': 'information worldview cooperation tools',
    'インド洋交易圏': 'mobility cooperation power environment',
    '東アジアの印刷文化': 'information tools cooperation',
    '火薬の発明': 'tools energy power',
    '磁気羅針盤と外洋航海': 'tools mobility information',
    'ボローニャ大学の伝統上の創立年': 'information cooperation worldview',
    'マグナ・カルタ': 'power information cooperation',
    'モンゴル帝国とユーラシア交流': 'power mobility cooperation information',
    'グレート・ジンバブエと交易圏': 'mobility cooperation power tools',
    '黒死病パンデミック': 'body mobility environment power cooperation',
    '複式簿記の普及': 'information tools cooperation power',
    'グーテンベルク活版印刷': 'tools information cooperation power',
    'コロンブスの航海': 'mobility tools power environment',
    '宗教改革': 'worldview information power cooperation',
    'コロンブス交換': 'mobility environment body power',
    '大西洋奴隷貿易': 'power mobility cooperation body',
    'コペルニクスの地動説': 'worldview information tools',
    '株式会社と証券市場': 'cooperation power information mobility',
    'ガリレオの望遠鏡': 'tools information worldview',
    'デカルト『方法序説』': 'worldview information',
    'ニュートン『プリンキピア』': 'information worldview energy',
    'リンネの分類学': 'information worldview environment',
    '『百科全書』刊行開始': 'information cooperation power',
    'アメリカ独立宣言': 'power information cooperation',
    'フランス革命': 'power cooperation information',
    'ワットの蒸気機関': 'tools energy environment power',
    '工場制生産': 'tools energy power cooperation body',
    '種痘とワクチン': 'body information cooperation tools',
    '蒸気機関車': 'tools energy mobility environment',
    'ハイチ独立と奴隷制への挑戦': 'power cooperation worldview',
    '奴隷制廃止の世界的展開': 'power cooperation information',
    '電信機': 'tools information energy mobility cooperation',
    '外科麻酔の公開実演': 'tools body information',
    '上下水道と公衆衛生': 'tools body environment cooperation power',
    'ダーウィン『種の起源』': 'information worldview body environment',
    '細菌説の確立': 'information body tools',
    '義務教育と識字の拡大': 'information cooperation power',
    'メンデルの法則': 'information body worldview',
    '周期表': 'information tools worldview',
    '電話の発明': 'tools information energy cooperation',
    '実用的な白熱電灯と電力網': 'tools energy cooperation environment',
    '労働運動と8時間労働': 'power cooperation body',
    '1895年前後の見る・記録する・送る技術': 'tools information worldview',
    'ライト兄弟の初飛行': 'tools energy mobility',
    'アインシュタインの特殊相対性理論': 'information worldview energy',
    'ハーバー・ボッシュ法': 'tools energy environment body power',
    '女性参政権の拡大': 'power cooperation information',
    '第一次世界大戦': 'power tools energy mobility body',
    '一般相対性理論': 'information worldview energy',
    'ロシア革命': 'power cooperation',
    'ラジオ・映画と大衆社会': 'tools information cooperation worldview power',
    '不確定性原理': 'information worldview',
    'ペニシリンの発見': 'body tools information',
    '世界恐慌と福祉国家': 'power cooperation information',
    'チューリング・マシン': 'tools information worldview',
    '第二次世界大戦': 'power tools energy mobility body',
    '広島・長崎': 'power energy tools body environment',
    'ENIAC': 'tools information energy',
    'トランジスタの発明': 'tools information energy',
    'シャノンの情報理論': 'information tools',
    '世界人権宣言': 'power cooperation information',
    'チューリング・テスト': 'information worldview tools',
    'DNA二重らせん': 'information body tools',
    'スプートニク': 'tools energy mobility power',
    '脱植民地化の世界的展開': 'power cooperation mobility',
    '公民権運動': 'power cooperation information',
    '地球の出': 'information worldview environment tools',
    'アポロ11号 月面着陸': 'tools energy mobility power',
    'ARPANETの誕生': 'tools information cooperation',
    'マイクロプロセッサ': 'tools information energy',
    'パーソナルコンピューター産業の拡大': 'tools information cooperation',
    '女性差別撤廃条約': 'power cooperation information',
    '天然痘根絶': 'body information cooperation tools',
    'IBM PC発売': 'tools information cooperation',
    '気候変動を地球規模で捉える': 'environment information power cooperation energy',
    'ベルリンの壁崩壊': 'power cooperation mobility',
    'World Wide Web': 'tools information cooperation',
    'Linux公開': 'tools information cooperation power',
    '消費者向けWebの拡大': 'tools information cooperation power',
    'Google創業': 'tools information cooperation power',
    '2001年の異なる二つの転換': 'information cooperation power worldview',
    'ヒトゲノム計画の完了': 'body information tools cooperation',
    'Facebook': 'information cooperation power tools',
    'YouTube': 'information tools cooperation worldview',
    'Twitter': 'information cooperation power tools',
    'iPhone発売': 'tools information energy cooperation',
    'リーマンショック': 'power cooperation information',
    'ビットコイン論文': 'information tools power cooperation',
    '東日本大震災': 'environment energy body information cooperation',
    'IBM Watson がクイズ王に勝利': 'tools information worldview',
    'AlexNet ── ディープラーニング覚醒': 'tools information',
    'GAN登場': 'tools information worldview',
    'AlphaGo vs イ・セドル': 'tools information worldview',
    'Transformer論文': 'tools information',
    'BERT / GPT-1': 'tools information',
    'COVID-19パンデミック': 'body mobility cooperation power information environment',
    'GPT-3': 'tools information',
    'ChatGPT公開': 'tools information cooperation worldview',
    '生成AIとマルチモーダル化': 'tools information worldview',
    '動画生成と推論モデル': 'tools information worldview',
    'AIエージェント型サービスの拡大': 'tools information cooperation power',
    'あなたがこの年表を読んでいる': 'information worldview cooperation',
    'AGI（汎用人工知能）？': 'tools information power worldview',
    '生命編集の拡大': 'tools body power environment',
    '技術的特異点？': 'tools energy information worldview',
    '地球の外へ？': 'tools energy mobility environment power',
    '空白のまま': 'worldview'
  };

  function themesFor(title, node) {
    const labels = Array.from(node.querySelectorAll('.en-lenses span')).map(function (item) {
      return ({ body: 'body', environment: 'environment', mobility: 'mobility', energy: 'energy', information: 'information', tools: 'tools', cooperation: 'cooperation', power: 'power', worldview: 'worldview' })[item.textContent.trim().toLowerCase()] || '';
    }).filter(Boolean);
    return (node.dataset.eventThemes || EVENT_LENSES[title] || labels.join(' ')).split(/\s+/).filter(Boolean);
  }

  // 「有名な出来事」ではなく、不可逆性・波及・地域/分野の偏り・根拠の
  // 4基準で選んだ主要点。元のカード番号を保つことで既存画像との対応も崩さない。
  const CORE_SOURCE_INDICES = new Set([
    1, 3, 5, 6, 8, 11, 13, 15, 16, 18, 20, 24, 27, 29, 35, 36,
    41, 45, 46, 47, 52, 55, 56, 57, 59, 60, 64, 67, 68, 70, 71, 72,
    73, 74, 76, 77, 79, 82, 83, 87, 88, 93, 97, 98, 100, 107, 109, 113
  ]);

  const CURATED_ADDITIONS = [
    {
      id: 'first-stars-galaxies', date: '約136億年前', title: '最初の星と銀河',
      description: 'ビッグバン後の暗黒の時代に最初の星が灯り、重力で集まった星々が初期の銀河を形づくった。元素と構造が育ち、後の惑星や生命へ続く舞台が生まれた。',
      eraId: 'era-cosmos', eraTitle: '宇宙・生命', icon: '✦', themes: ['energy', 'cooperation'],
      links: [{ href: 'https://science.nasa.gov/asset/webb/first-stars-timeline-of-the-universe/', label: 'NASA：最初の星の時間軸' }]
    },
    {
      id: 'ediacaran-life', date: '約5.8億年前', title: '複雑な多細胞生物の広がり',
      description: 'エディアカラ紀の海に、葉・帯・キルトのような姿をした多様な大型生物が広がった。カンブリア爆発だけでは見えない、複雑な生態系への長い助走である。',
      eraId: 'era-cosmos', eraTitle: '宇宙・生命', icon: '◌', themes: ['energy', 'cooperation'],
      links: [{ href: 'https://naturalhistory.si.edu/education/teaching-resources/life-science/early-life-earth-animal-origins', label: 'Smithsonian：動物の起源' }]
    },
    {
      id: 'indus-cities', date: '紀元前2600年頃', title: 'インダスの計画都市',
      description: 'モヘンジョダロなどでは、計画的な街路、排水、公共建築を備えた大都市が発達した。文明の物語を西アジアと地中海だけに閉じない、南アジアの都市化の転換点。',
      eraId: 'era-civilization', eraTitle: '文明・古代', icon: '▦', themes: ['cooperation', 'information'],
      links: [{ href: 'https://whc.unesco.org/en/list/138', label: 'UNESCO：モヘンジョダロ' }]
    },
    {
      id: 'classic-maya', date: '300〜900年頃', title: 'マヤ文明の都市と知',
      description: '中米のマヤ諸都市は、交易と競合のネットワークの中で、文字・暦・数学・天文学を発達させた。単一帝国ではない都市文明の知のかたちを示す。',
      eraId: 'era-ancient', eraTitle: '文明・古代', icon: '◈', themes: ['information', 'cooperation'],
      links: [{ href: 'https://whc.unesco.org/en/list/129', label: 'UNESCO：コパンのマヤ遺跡' }]
    },
    {
      id: 'east-asian-printing', date: '868年', title: '東アジアの印刷文化',
      description: '木版印刷は東アジアで発達し、868年の金剛般若経は年記のある印刷物として残る。グーテンベルク以前から、複製された知が広く移動していた。',
      eraId: 'era-ancient', eraTitle: '文明・古代', icon: '▤', themes: ['information', 'cooperation'],
      links: [{ href: 'https://courier.unesco.org/en/articles/200-years-gutenberg-master-printers-koryo', label: 'UNESCO：東アジアの印刷史' }]
    },
    {
      id: 'great-zimbabwe', date: '11〜15世紀', title: 'グレート・ジンバブエと交易圏',
      description: 'ショナの人々が築いた石造都市は、金・陶磁器・ガラス玉などが行き交う広域交易の中心となった。中世世界を欧州だけで捉えないための主要点。',
      eraId: 'era-ancient', eraTitle: '文明・古代', icon: '◇', themes: ['cooperation', 'energy'],
      links: [{ href: 'https://whc.unesco.org/en/list/364', label: 'UNESCO：グレート・ジンバブエ' }]
    },
    {
      id: 'haitian-revolution', date: '1804年', title: 'ハイチ独立と奴隷制への挑戦',
      description: '奴隷化された人々の蜂起から生まれたハイチ独立は、自由と人種的平等を現実の国家形成へ結びつけ、奴隷制廃止と植民地支配への挑戦に大きな波紋を広げた。',
      eraId: 'era-industrial', eraTitle: '革命・産業化', icon: '✊', themes: ['cooperation'],
      links: [{ href: 'https://whc.unesco.org/en/list/180', label: 'UNESCO：ハイチ独立の歴史' }]
    },
    {
      id: 'udhr', date: '1948年', title: '世界人権宣言',
      description: '第二次世界大戦の惨禍を受け、すべての人が生まれながらに自由で尊厳と権利において平等だという共通基準を国連が採択した。実現途上であることも含め、世界規模の規範の転換点。',
      eraId: 'era-20c', eraTitle: '20世紀', icon: '◎', themes: ['cooperation', 'information'],
      links: [{ href: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights', label: '国連：世界人権宣言' }]
    },
    {
      id: 'decolonization', date: '1960年', title: '脱植民地化の世界的展開',
      description: '多くの地域の独立運動を背景に、国連総会は植民地独立付与宣言を採択した。帝国中心の世界秩序から、民族自決を掲げる国際秩序への大きな転換。',
      eraId: 'era-20c', eraTitle: '20世紀', icon: '◉', themes: ['cooperation'],
      links: [{ href: 'https://www.un.org/en/global-issues/decolonization', label: '国連：脱植民地化' }]
    },
    {
      id: 'smallpox-eradication', date: '1980年', title: '天然痘根絶',
      description: 'ワクチン、監視、各地域の保健活動を積み重ね、WHOは1980年に天然痘の世界根絶を宣言した。科学と国境を越えた協力が、人類共通の脅威を消した稀有な転換点。',
      eraId: 'era-20c', eraTitle: '20世紀', icon: '✚', themes: ['cooperation', 'information'],
      links: [{ href: 'https://www.who.int/emergencies/situations/smallpox', label: 'WHO：天然痘根絶' }]
    },
    {
      id: 'cedaw', date: '1979年', title: '女性差別撤廃条約',
      description: '国連総会が女性に対するあらゆる形態の差別撤廃を国際条約として採択した。権利の宣言を、各国が負う法的な約束へ進めた転換点である。',
      eraId: 'era-20c', eraTitle: '20世紀', icon: '◐', themes: ['cooperation'],
      links: [{ href: 'https://treaties.un.org/pages/ViewDetails.aspx?chapter=4&clang=_en&mtdsg_no=IV-8&src=TREATY', label: '国連条約集：CEDAW' }]
    },
    {
      id: 'climate-response', date: '1988〜2015年', title: '気候変動を地球規模で捉える',
      description: '気候科学の国際評価と各国交渉が積み重なり、人間活動による温暖化を共通の課題として捉える枠組みが育った。原因と影響には地域・世代間の大きな不均衡が残る。',
      eraId: 'era-digital', eraTitle: 'デジタル・地球規模', icon: '◍', themes: ['energy', 'cooperation', 'information'],
      links: [{ href: 'https://www.ipcc.ch/report/ar6/syr/summary-for-policymakers/', label: 'IPCC：第6次評価報告書' }]
    }
  ];

  const futureEvents = [];
  const curatedMetadata = new Map(CURATED_ADDITIONS.map(function (event) { return [event.id, event]; }));
  let genericImageIndex = 0;
  const events = Array.from(document.querySelectorAll('.timeline-container .event, .timeline-container .en-event')).map(function (node, index) {
    const date = (node.querySelector('.event-date') || {}).textContent || node.dataset.date || '';
    const titleNode = node.querySelector('.event-title, h3');
    const iconNode = titleNode && titleNode.querySelector('.icon');
    const title = titleNode ? titleNode.textContent.replace(iconNode ? iconNode.textContent : '', '').trim() : '';
    const description = ((node.querySelector('.event-desc, .en-event__body > p') || {}).textContent || '').trim();
    const era = node.closest('.era');
    const future = era && era.id === 'era-future';
    const futureIndex = future ? futureEvents.length : -1;
    const curatedId = node.dataset.curatedEvent || '';
    const curated = Boolean(curatedId);
    const metadata = curatedMetadata.get(curatedId);
    const sourceIndex = curated ? 0 : ++genericImageIndex;
    const card = node.querySelector('.event-card, .en-event__body');
    const inlineImage = node.querySelector('img');
    const explicitImage = (card && card.dataset.eventImage) || (inlineImage && inlineImage.getAttribute('src'));
    const curatedImage = curatedId ? 'assets/images/evolution/curated/curated-' + curatedId + '.webp' : '';
    const cardLinks = Array.from(node.querySelectorAll('.event-link, .en-source')).map(function (link) { return { href: link.getAttribute('href'), label: link.textContent.trim() }; });
    const combinedLinks = metadata && metadata.links ? cardLinks.concat(metadata.links) : cardLinks;
    const links = combinedLinks.filter(function (link, linkIndex) {
      return combinedLinks.findIndex(function (candidate) { return candidate.href === link.href; }) === linkIndex;
    });
    const event = {
      node: node,
      index: index,
      detailId: node.id || ('event-' + (index + 1)),
      id: curatedId ? 'deep-curated-' + curatedId : 'deep-event-' + (index + 1),
      date: date.trim(),
      title: title,
      description: description,
      eraId: era ? era.id : '',
      eraTitle: era && era.querySelector('.era-title, h2') ? era.querySelector('.era-title, h2').textContent.trim() : '',
      future: future,
      position: future ? .91 + futureIndex * .018 : logPosition(ageFromDate(date)),
      image: explicitImage || curatedImage || (isEnglish ? '../' : '') + 'assets/images/evolution/event-' + String(sourceIndex).padStart(3, '0') + '.webp',
      themes: themesFor(title, node),
      links: links,
      y: .40 + seeded(index + 1) * .28,
      core: node.dataset.eventCore === 'true' || Boolean(metadata) || (!curated && CORE_SOURCE_INDICES.has(sourceIndex)),
      curated: curated,
      icon: iconNode ? iconNode.textContent.trim() : ''
    };
    if (!node.id) node.id = event.detailId;
    if (future) futureEvents.push(event);
    return event;
  });

  const lensQuestions = isEnglish ? {
    all: 'See how several lenses overlap across the same history.',
    tools: 'What did humans build outside the body to extend their abilities?',
    information: 'How was knowledge recorded, copied, and shared?',
    energy: 'How did new sources of usable power reshape life?',
    cooperation: 'What systems allowed people to live and act together?',
    body: 'How did survival, disease, lifespan, and population change?',
    environment: 'How did people change nature, and how did nature change them?',
    mobility: 'How did people, goods, pathogens, and cultures move?',
    power: 'Who decided, and who carried the benefits and burdens?',
    worldview: 'How did people explain the world and themselves?'
  } : {
    all: '複数の視点を重ねながら、人類史の全体を眺めます。',
    tools: '人は何を身体の外に作り、能力を拡張した？',
    information: '知識は、どう記録され、複製され、広がった？',
    energy: '使える力が変わると、暮らしはどう変わった？',
    cooperation: '人は、どんな仕組みで共に生きてきた？',
    body: '生存、病気、寿命、人口はどう変わった？',
    environment: '人は自然をどう変え、自然にどう変えられた？',
    mobility: '人・物・病原体・文化は、どう移動した？',
    power: '誰が決め、誰が利益や負担を引き受けた？',
    worldview: '人は世界と自分自身を、どう説明してきた？'
  };
  const lensLabels = isEnglish ? {
    tools: 'Tools', information: 'Information', energy: 'Energy', cooperation: 'Cooperation',
    body: 'Body & Health', environment: 'Environment & Food', mobility: 'Mobility & Exchange',
    power: 'Power & Rights', worldview: 'Meaning & Worldview'
  } : {
    tools: '道具', information: '情報', energy: 'エネルギー', cooperation: '協力',
    body: '身体・健康', environment: '環境・食料', mobility: '移動・交換',
    power: '権力・権利', worldview: '意味・世界観'
  };
  const lensPromptInstructions = isEnglish ? {
    all: 'Connect the most relevant lenses among tools, information, energy, cooperation, bodies, environments, mobility, power, and worldviews.',
    tools: 'Focus on materials, skills, and which human abilities the tools extended.',
    information: 'Focus on how knowledge was recorded, copied, transmitted, and accessed.',
    energy: 'Focus on energy sources, output, efficiency, and environmental costs.',
    cooperation: 'Focus on the scale of cooperation and changes in trust, rules, and organization.',
    body: 'Focus on effects on survival, disease, lifespan, population, and bodily experience.',
    environment: 'Focus on interactions with food, resources, ecosystems, and climate.',
    mobility: 'Focus on what moved between regions and how those connections changed societies.',
    power: 'Focus on who held decision-making power and how benefits, burdens, and rights were distributed.',
    worldview: 'Focus on how people understood the world, nature, death, and themselves.'
  } : {
    all: '道具・情報・エネルギー・協力・身体・環境・移動・権力・世界観のうち、特に関係の深い視点を結びつけてください。',
    tools: '何を材料に、どんな技能で作られ、人間の手・足・感覚・記憶の何を拡張したかを中心に説明してください。',
    information: '知識がどう記録・複製・伝達され、誰がアクセスできたかを中心に説明してください。',
    energy: 'どのエネルギー源を利用し、出力・効率・環境負荷がどう変わったかを中心に説明してください。',
    cooperation: '何人ほどの協力を可能にし、信頼・規則・組織をどう変えたかを中心に説明してください。',
    body: '生存、病気、寿命、人口、身体感覚への影響を中心に説明してください。',
    environment: '食料・資源・生態系・気候との相互作用を中心に説明してください。',
    mobility: '人・物・病原体・文化がどこからどこへ動き、地域間の関係をどう変えたかを中心に説明してください。',
    power: '誰が決定権を持ち、利益・負担・権利が誰に配分されたかを中心に説明してください。',
    worldview: '人間が世界・自然・死・自分自身をどう理解するようになったかを中心に説明してください。'
  };
  let scope = (document.querySelector('[data-time-scope][aria-pressed="true"]') || {}).dataset?.timeScope || 'core';
  let lens = (document.querySelector('[data-time-lens][aria-pressed="true"]') || {}).dataset?.timeLens || 'all';
  let target = { center: .5, zoom: 1 };
  let view = { center: .5, zoom: 1 };
  let flowing = true;
  let elapsed = 0;
  let lastFrame = performance.now();
  let inSpace = true;
  let selected = null;

  function seeded(value) {
    const number = Math.sin(value * 127.1 + 18) * 43758.5453;
    return number - Math.floor(number);
  }

  function bound(center, zoom) {
    const z = Math.max(1, Math.min(MAX_ZOOM, zoom));
    // The timeline's first and last events need enough visual breathing room for
    // their circular artwork. A small amount of overscroll keeps those images
    // from being pinned to the viewport edge when focused.
    return { zoom: z, center: Math.max(.42 / z, Math.min(1 - .42 / z, center)) };
  }

  function screenX(position, camera) { return .5 + (position - camera.center) * camera.zoom * .92; }
  function worldX(screen, camera) { return camera.center + (screen - .5) / (camera.zoom * .92); }
  function zoomAt(camera, factor, anchor) {
    const z = Math.max(1, Math.min(MAX_ZOOM, camera.zoom * factor));
    return bound(worldX(anchor, camera) - (anchor - .5) / (z * .92), z);
  }

  function ageLabel(position) {
    if (position > .891) return isEnglish ? 'future' : '未来';
    const p = Math.min(.88, Math.max(0, position));
    const age = Math.max(0, Math.pow(1 + MAX_AGE, 1 - p / .88) - 1);
    if (age < 1) return isEnglish ? 'now' : 'いま';
    if (isEnglish) {
      const unit = age >= 1e9 ? 1e9 : age >= 1e6 ? 1e6 : age >= 1e3 ? 1e3 : 1;
      const label = unit === 1e9 ? 'billion' : unit === 1e6 ? 'million' : unit === 1e3 ? 'thousand' : '';
      const value = age / unit;
      return Number(value.toPrecision(value >= 10 ? 3 : 2)).toLocaleString('en-US') + (label ? ' ' + label : '') + ' years ago';
    }
    const unit = age >= 1e8 ? 1e8 : age >= 1e4 ? 1e4 : 1;
    const value = age / unit;
    return Number(value.toPrecision(value >= 100 ? 3 : 2)).toLocaleString('ja-JP') + (unit === 1e8 ? '億' : unit === 1e4 ? '万' : '') + '年前';
  }

  const nodes = events.map(function (event) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'deep-time-point';
    button.dataset.eventId = event.id;
    button.classList.toggle('is-curated', event.curated);
    button.setAttribute('aria-label', event.date + ' ' + event.title + (isEnglish ? ', zoom in' : 'へ近づく'));
    button.innerHTML = '<span class="deep-time-point__core"></span>';
    button.addEventListener('dblclick', function (event_) { event_.stopPropagation(); });
    button.addEventListener('click', function () {
      stopMotion();
      selected = event;
      if (view.zoom < PICTURE_ZOOM) target = bound(event.position, 4);
      else openEvent(event);
    });
    pointLayer.appendChild(button);
    return button;
  });

  const markerData = isEnglish ? [
    { age: MAX_AGE, label: '13.8B years ago' }, { age: 1e9, label: '1B years ago' },
    { age: 1e6, label: '1M years ago' }, { age: 1e3, label: '1,000 years ago' },
    { age: 100, label: '100 years ago' }, { age: 10, label: '10 years ago' }, { age: 0, label: 'now' }
  ] : [
    { age: MAX_AGE, label: '138億年前' }, { age: 1e8, label: '1億年前' },
    { age: 1e6, label: '100万年前' }, { age: 1e4, label: '1万年前' },
    { age: 1e3, label: '1000年前' }, { age: 100, label: '100年前' },
    { age: 10, label: '10年前' }, { age: 0, label: 'いま' }
  ];
  for (let exponent = 1; exponent <= 10; exponent++) {
    [1, 2, 5].forEach(function (factor) {
      const age = factor * Math.pow(10, exponent);
      if (age < MAX_AGE && !markerData.some(function (m) { return m.age === age; })) markerData.push({ age: age, label: ageLabel(logPosition(age)) });
    });
  }
  const markers = markerData.map(function (marker) {
    const span = document.createElement('span');
    span.textContent = marker.label;
    axis.appendChild(span);
    return { position: logPosition(marker.age), node: span };
  });

  const futureLine = document.getElementById('deepTimeFuture');
  const ageText = document.getElementById('deepTimeAge');
  const unitText = document.getElementById('deepTimeUnit');
  const rangeText = document.getElementById('deepTimeRange');
  const zoomLabel = document.getElementById('deepTimeZoomLabel');
  const zoomOut = document.getElementById('deepTimeZoomOut');
  const zoomIn = document.getElementById('deepTimeZoomIn');
  const instruction = document.getElementById('deepTimeInstruction');
  const scrubber = document.getElementById('deepTimeScrubber');
  const output = document.getElementById('deepTimeOutput');
  const overviewWindow = document.getElementById('deepTimeWindow');
  const scaleText = document.getElementById('deepTimeScale');
  const portionText = document.getElementById('deepTimePortion');
  const questionText = document.getElementById('deepTimeQuestion');
  const touchDevice = window.matchMedia('(pointer: coarse)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let needsRender = true;

  function ageAt(position) {
    return Math.max(0, Math.pow(1 + MAX_AGE, 1 - Math.min(.88, Math.max(0, position)) / .88) - 1);
  }
  function durationLabel(years) {
    if (isEnglish) {
      if (years < 1) return Math.max(1, Math.round(years * 365)) + ' days';
      const unit = years >= 1e9 ? 1e9 : years >= 1e6 ? 1e6 : years >= 1e3 ? 1e3 : 1;
      const label = unit === 1e9 ? ' billion years' : unit === 1e6 ? ' million years' : unit === 1e3 ? ' thousand years' : ' years';
      return Number((years / unit).toPrecision(2)).toLocaleString('en-US') + label;
    }
    const unit = years >= 1e8 ? 1e8 : years >= 1e4 ? 1e4 : 1;
    if (years < 1) return Math.max(1, Math.round(years * 365)) + '日';
    return Number((years / unit).toPrecision(2)).toLocaleString('ja-JP') + (unit === 1e8 ? '億年' : unit === 1e4 ? '万年' : '年');
  }
  function isRelated(event) {
    if (lens === 'all') return true;
    return event.themes.indexOf(lens) >= 0;
  }

  function isUnlocked(event) {
    if (scope === 'all') return true;
    if (event.future || event.core) return true;
    return view.zoom >= DETAIL_ZOOM;
  }

  function renderPoints() {
    const visible = [];
    const compact = surface.clientHeight <= 650 && surface.clientWidth > surface.clientHeight;
    const shortPhone = !compact && surface.clientHeight <= 700 && surface.clientWidth <= 760;
    events.forEach(function (event, index) {
      const x = screenX(event.position, view);
      const button = nodes[index];
      const shown = x > .025 && x < .975 && isUnlocked(event) && isRelated(event);
      button.hidden = !shown;
      if (!shown) return;
      button.style.left = (x * 100).toFixed(3) + '%';
      const y = compact ? (.42 + (event.y - .4) * .38) * surface.clientHeight : shortPhone ? 240 + (event.y - .4) / .28 * Math.max(30, axis.offsetTop - 260) : event.y * surface.clientHeight;
      button.style.top = y.toFixed(2) + 'px';
      button.classList.toggle('is-muted', scope === 'core' && !event.core && !event.future);
      button.classList.toggle('is-detail', !event.core && !event.future);
      button.classList.toggle('is-future', event.future);
      button.setAttribute('aria-label', event.date + ' ' + event.title + (isEnglish ? (view.zoom < PICTURE_ZOOM ? ', zoom in' : ', read the background') : (view.zoom < PICTURE_ZOOM ? 'へ近づく' : 'の背景を読む')));
      visible.push({ event: event, button: button, x: x, y: y });
    });

    const pictures = [];
    if (view.zoom >= PICTURE_ZOOM) {
      const pictureEdge = surface.clientWidth <= 760 ? 30 : 42;
      visible.filter(function (item) { return isRelated(item.event); }).sort(function (a, b) {
        if (a.event === selected) return -1;
        if (b.event === selected) return 1;
        return Math.abs(a.x - .5) - Math.abs(b.x - .5);
      }).some(function (item) {
        const px = item.x * surface.clientWidth;
        if (px < pictureEdge || px > surface.clientWidth - pictureEdge) return false;
        const clear = pictures.every(function (placed) { return Math.hypot((item.x - placed.x) * surface.clientWidth, item.y - placed.y) > 145; });
        if (clear) pictures.push(item);
        return pictures.length >= 7;
      });
    }
    const pictureIds = new Set(pictures.map(function (item) { return item.event.id; }));
    visible.forEach(function (item) {
      const shouldShow = pictureIds.has(item.event.id);
      const hasVisual = item.button.classList.contains('has-image') || item.button.classList.contains('has-label');
      if (shouldShow && !hasVisual) {
        if (item.event.image) {
          const img = document.createElement('img');
          img.src = item.event.image;
          img.alt = '';
          img.loading = 'lazy';
          item.button.appendChild(img);
          item.button.classList.add('has-image');
        } else {
          const glyph = document.createElement('span');
          glyph.className = 'deep-time-point__glyph';
          glyph.textContent = item.event.icon || '✦';
          item.button.appendChild(glyph);
          item.button.classList.add('has-label');
        }
        const caption = document.createElement('span');
        caption.className = 'deep-time-point__caption';
        caption.innerHTML = '<small></small>';
        caption.querySelector('small').textContent = item.event.date;
        caption.appendChild(document.createTextNode(item.event.title));
        item.button.appendChild(caption);
      } else if (!shouldShow && hasVisual) {
        const img = item.button.querySelector('img');
        const glyph = item.button.querySelector('.deep-time-point__glyph');
        const caption = item.button.querySelector('.deep-time-point__caption');
        if (img) img.remove();
        if (glyph) glyph.remove();
        if (caption) caption.remove();
        item.button.classList.remove('has-image');
        item.button.classList.remove('has-label');
      }
    });
  }

  function renderInterface() {
    const leftEdge = Math.max(0, worldX(0, view));
    const rightEdge = Math.min(1, worldX(1, view));
    if (view.zoom < 1.15) {
      ageText.textContent = isEnglish ? '13.8' : '138';
      ageText.classList.remove('is-age');
      unitText.textContent = isEnglish ? 'billion years' : '億年';
      rangeText.textContent = isEnglish ? 'From the beginning of the universe to the questions ahead.' : '宇宙のはじまりから、人類の問いへ。';
    } else {
      ageText.textContent = ageLabel(view.center);
      ageText.classList.add('is-age');
      unitText.textContent = '';
      rangeText.textContent = ageLabel(leftEdge) + ' — ' + ageLabel(rightEdge);
    }
    zoomLabel.textContent = view.zoom.toFixed(1) + '×';
    zoomOut.disabled = target.zoom <= 1.001;
    zoomIn.disabled = target.zoom >= MAX_ZOOM - .001;
    instruction.textContent = isEnglish ? (touchDevice.matches ? 'Move up or down to zoom / left or right to travel / pinch with two fingers' : 'Scroll to zoom / drag to travel through time / choose a point') : (touchDevice.matches ? '上下で近づく・離れる ／ 左右で時代を移動 ／ 2本指で拡大' : 'スクロールで近づく ／ ドラッグで時代を移動 ／ 粒を選ぶ');
    scrubber.value = String(Math.round(view.center * 1000));
    output.value = ageLabel(leftEdge) + ' — ' + ageLabel(rightEdge);
    scrubber.setAttribute('aria-valuetext', isEnglish ? 'Near ' + ageLabel(view.center) + ', ' + output.value : ageLabel(view.center) + '付近、' + output.value);
    overviewWindow.style.left = (100 * leftEdge) + '%';
    overviewWindow.style.width = (100 * (rightEdge - leftEdge)) + '%';
    const span = ageAt(leftEdge) - ageAt(rightEdge);
    const portion = span / MAX_AGE * 100;
    portionText.textContent = leftEdge >= .88 ? (isEnglish ? 'Future scenarios are shown outside the proportional time scale.' : '未来は年代に比例しない別枠です') : (isEnglish ? 'Visible span: about ' + Number(portion.toPrecision(2)).toLocaleString('en-US', { maximumFractionDigits: 8 }) + '% of cosmic history' : '見えている歴史の幅：宇宙史の約' + Number(portion.toPrecision(2)).toLocaleString('ja-JP', { maximumFractionDigits: 8 }) + '%');
    const halfScale = 40 / surface.clientWidth;
    scaleText.textContent = view.center >= .88 ? (isEnglish ? 'Questions for the future' : '未来への問い') : (isEnglish ? 'Near the center, this width represents about ' : '中央付近では、この幅で約') + durationLabel(ageAt(worldX(.5 - halfScale, view)) - ageAt(worldX(.5 + halfScale, view)));
    const placed = [];
    markers.forEach(function (marker, index) {
      const x = screenX(marker.position, view);
      const px = x * surface.clientWidth;
      const visible = x >= .025 && x <= .975 && placed.every(function (p) { return Math.abs(p - px) > (touchDevice.matches ? 48 : 82); });
      marker.node.hidden = !visible || (view.zoom < 1.3 && index >= 8);
      if (!marker.node.hidden) placed.push(px);
      marker.node.style.left = (x * 100).toFixed(3) + '%';
    });
    const futureX = screenX(.895, view);
    futureLine.hidden = !(futureX > 0 && futureX < 1);
    futureLine.style.left = (futureX * 100).toFixed(3) + '%';
  }

  document.querySelectorAll('[data-time-lens]').forEach(function (button) {
    button.addEventListener('click', function () {
      lens = button.dataset.timeLens;
      document.querySelectorAll('[data-time-lens]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      if (questionText) questionText.textContent = lensQuestions[lens];
      needsRender = true;
    });
  });

  document.querySelectorAll('[data-time-scope]').forEach(function (button) {
    button.addEventListener('click', function () {
      scope = button.dataset.timeScope;
      document.querySelectorAll('[data-time-scope]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      needsRender = true;
    });
  });

  document.querySelectorAll('[data-time-stop]').forEach(function (button) {
    button.addEventListener('click', function () {
      stopMotion();
      const values = button.dataset.timeStop.split(',').map(Number);
      target = bound(values[0], values[1]);
      selected = null;
    });
  });

  zoomIn.addEventListener('click', function () { stopMotion(); target = zoomAt(target, 1.6, .5); });
  zoomOut.addEventListener('click', function () { stopMotion(); target = zoomAt(target, 1 / 1.6, .5); });
  document.getElementById('deepTimeReset').addEventListener('click', function () { stopMotion(); target = { center: .5, zoom: 1 }; selected = null; });
  document.getElementById('deepTimeFlow').addEventListener('click', function (event) {
    flowing = !flowing;
    event.currentTarget.textContent = flowing ? 'Ⅱ' : '▶';
    event.currentTarget.setAttribute('aria-label', isEnglish ? (flowing ? 'Pause the drifting particles' : 'Resume the drifting particles') : (flowing ? '粒の漂いを止める' : '粒の漂いを再開する'));
  });
  scrubber.addEventListener('input', function () { stopMotion(); target = bound(Number(scrubber.value) / 1000, target.zoom); });

  surface.addEventListener('wheel', function (event) {
    event.preventDefault();
    stopMotion();
    const box = surface.getBoundingClientRect();
    target = zoomAt(target, Math.exp(-event.deltaY * .0025), (event.clientX - box.left) / box.width);
  }, { passive: false });
  surface.addEventListener('dblclick', function (event) {
    if (performance.now() - lastTouchTime < 650) return;
    stopMotion();
    const box = surface.getBoundingClientRect();
    target = zoomAt(target, 2, (event.clientX - box.left) / box.width);
  });

  const pointers = new Map();
  let gesture = null;
  let inertia = { pan: 0, depth: 0, anchor: .5 };
  let suppressClickUntil = 0;
  let lastTap = null;
  let lastTouchTime = -Infinity;
  function stopMotion() { inertia.pan = 0; inertia.depth = 0; }
  function capturePointers() {
    pointers.forEach(function (_, id) { if (!surface.hasPointerCapture(id)) surface.setPointerCapture(id); });
    surface.classList.add('is-dragging');
    section.classList.add('is-navigating');
  }
  function beginGesture() {
    const values = Array.from(pointers.values());
    const rect = surface.getBoundingClientRect();
    gesture = { camera: { ...target }, x: values[0].x, y: values[0].y, width: rect.width, height: rect.height, left: rect.left, mode: 'pending', moved: false, lastTime: performance.now(), lastCamera: { ...target } };
    if (values.length === 2) {
      gesture.mode = 'pinch'; gesture.moved = true;
      gesture.distance = Math.max(12, Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y));
      gesture.anchor = ((values[0].x + values[1].x) / 2 - rect.left) / rect.width;
      capturePointers();
    }
  }
  surface.addEventListener('pointerdown', function (event) {
    if (event.button !== 0 || pointers.size >= 2) return;
    stopMotion();
    if (!pointers.size) { target = { ...view }; suppressClickUntil = 0; }
    if (event.pointerType === 'touch') lastTouchTime = performance.now();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY, type: event.pointerType });
    beginGesture();
  });
  surface.addEventListener('pointermove', function (event) {
    if (!pointers.has(event.pointerId) || !gesture) return;
    const pointer = pointers.get(event.pointerId);
    pointer.x = event.clientX; pointer.y = event.clientY;
    const now = performance.now();
    if (pointers.size === 2) {
      const values = Array.from(pointers.values());
      const distance = Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y);
      const anchorNow = ((values[0].x + values[1].x) / 2 - gesture.left) / gesture.width;
      const zoom = Math.max(1, Math.min(MAX_ZOOM, gesture.camera.zoom * distance / gesture.distance));
      target = bound(worldX(gesture.anchor, gesture.camera) - (anchorNow - .5) / (zoom * .92), zoom);
      stopMotion();
    } else {
      const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
      if (gesture.mode === 'pending') {
        if (Math.hypot(dx, dy) < (pointer.type === 'mouse' ? 4 : 8)) return;
        gesture.mode = pointer.type !== 'mouse' && Math.abs(dy) > Math.abs(dx) * 1.2 ? 'depth' : 'pan';
        gesture.moved = true;
        capturePointers();
      }
      const anchor = (gesture.x - gesture.left) / gesture.width;
      if (gesture.mode === 'depth') target = zoomAt(gesture.camera, Math.exp(-dy / gesture.height * 5), anchor);
      else {
        // An overview swipe gently enters the map, so the first swipe also moves time.
        const zoom = gesture.camera.zoom < 1.1 ? Math.min(2.4, 1 + Math.abs(dx) / gesture.width * 4) : gesture.camera.zoom;
        const camera = zoomAt(gesture.camera, zoom / gesture.camera.zoom, anchor);
        target = bound(camera.center - dx / (gesture.width * .92 * zoom), zoom);
      }
      const dt = Math.max(.008, (now - gesture.lastTime) / 1000);
      inertia.pan = gesture.mode === 'pan' ? Math.max(-1 / target.zoom, Math.min(1 / target.zoom, (target.center - gesture.lastCamera.center) / dt)) : 0;
      inertia.depth = gesture.mode === 'depth' ? Math.max(-3, Math.min(3, Math.log(target.zoom / gesture.lastCamera.zoom) / dt)) : 0;
      inertia.anchor = anchor;
    }
    view = { ...target };
    gesture.lastTime = now; gesture.lastCamera = { ...target };
    needsRender = true;
  });
  function finishPointer(event) {
    // Touch starts with implicit capture on a star. Transferring that capture
    // to the surface must not end the still-active gesture.
    if (event.type === 'lostpointercapture' && event.target !== surface) return;
    if (!pointers.has(event.pointerId)) return;
    const now = performance.now(), old = gesture;
    pointers.delete(event.pointerId);
    if (old && old.moved) suppressClickUntil = now + 450;
    if (event.type !== 'pointerup' || reducedMotion.matches || !old || now - old.lastTime > 100) stopMotion();
    if (pointers.size) {
      stopMotion(); beginGesture(); gesture.moved = true;
      return;
    }
    if (old && !old.moved && event.pointerType === 'touch' && !event.target.closest('.deep-time-point')) {
      if (lastTap && now - lastTap.time < 320 && Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 28) {
        target = zoomAt(target, 2.2, (event.clientX - old.left) / old.width); lastTap = null;
      } else lastTap = { time: now, x: event.clientX, y: event.clientY };
    } else lastTap = null;
    gesture = null;
    surface.classList.remove('is-dragging');
    section.classList.remove('is-navigating');
  }
  surface.addEventListener('pointerup', finishPointer);
  surface.addEventListener('pointercancel', finishPointer);
  surface.addEventListener('lostpointercapture', finishPointer);
  surface.addEventListener('click', function (event) {
    if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
  }, true);
  surface.addEventListener('keydown', function (event) {
    if (event.target !== surface) return;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', 'Home'].includes(event.key)) return;
    event.preventDefault(); stopMotion();
    if (event.key === 'Home') target = bound(.5, 1);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const zoom = Math.max(2, target.zoom);
      target = bound(target.center + (event.key === 'ArrowLeft' ? -.15 : .15) / zoom, zoom);
    } else target = zoomAt(target, ['ArrowUp', '+', '='].includes(event.key) ? 1.6 : 1 / 1.6, .5);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { pointers.clear(); gesture = null; stopMotion(); surface.classList.remove('is-dragging'); section.classList.remove('is-navigating'); }
  });

  const dialog = document.getElementById('deepTimeDialog');
  const dialogImage = document.getElementById('deepTimeDialogImage');
  const dialogDate = document.getElementById('deepTimeDialogDate');
  const dialogTitle = document.getElementById('deepTimeDialogTitle');
  const dialogDescription = document.getElementById('deepTimeDialogDescription');
  const dialogEra = document.getElementById('deepTimeDialogEra');
  const dialogThemes = document.getElementById('deepTimeDialogThemes');
  const dialogLinks = document.getElementById('deepTimeDialogLinks');
  const detailLink = document.getElementById('deepTimeDetailLink');
  const copyStatus = document.getElementById('deepTimeCopyStatus');
  const promptBox = document.getElementById('deepTimePrompt');

  function openEvent(event) {
    stopMotion();
    selected = event;
    dialogImage.hidden = !event.image;
    if (event.image) dialogImage.src = event.image;
    dialogDate.textContent = (event.future ? (isEnglish ? 'Question for the future · ' : '未来への問い · ') : '') + event.date;
    dialogTitle.textContent = event.title;
    dialogDescription.textContent = event.description;
    dialogEra.textContent = event.eraTitle;
    dialogThemes.textContent = (isEnglish ? 'Overlapping lenses: ' : '重なる視点：') + event.themes.map(function (theme) { return lensLabels[theme] || theme; }).join(isEnglish ? ' · ' : ' ・ ');
    dialogLinks.replaceChildren();
    event.links.forEach(function (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label + ' →';
      dialogLinks.appendChild(anchor);
    });
    detailLink.href = event.detailId ? '#' + event.detailId : event.eraId ? '#' + event.eraId : '#detailed-timeline';
    copyStatus.textContent = '';
    promptBox.hidden = true;
    dialog.showModal();
  }

  document.getElementById('deepTimeDialogClose').addEventListener('click', function () { dialog.close(); });
  detailLink.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  function selectedPrompt() {
    if (!selected) return '';
    const lensButton = document.querySelector('[data-time-lens="' + lens + '"]');
    const scopeButton = document.querySelector('[data-time-scope="' + scope + '"]');
    const related = selected.themes.map(function (theme) { return lensLabels[theme] || theme; }).join(isEnglish ? ' · ' : '・');
    const prompt = isEnglish
      ? 'Help me deepen my understanding of history through Manabi Map.\nTurning point: ' + selected.title + '\nDate: ' + selected.date + '\nSummary: ' + selected.description + '\nEra: ' + selected.eraTitle + '\nDisplay: ' + (scopeButton ? scopeButton.textContent : scope) + '\nSelected lens: ' + (lensButton ? lensButton.textContent : lens) + '\nOverlapping lenses: ' + related + '\n\nFirst explain in clear everyday English what came before, what changed, and what became possible afterward. ' + lensPromptInstructions[lens] + ' Build the background before asking for my opinion. Separate established evidence from interpretation, disputed dates, and future speculation. Do not treat chronological proximity as proof of causation. Include another region or an alternative perspective. End with two or three directions I could explore next.'
      : 'ManabiMapの年表から学びを深める対話をしてください。\n転換点：' + selected.date + '／' + selected.title + '\n説明：' + selected.description + '\n時代：' + selected.eraTitle + '\n表示：' + (scopeButton ? scopeButton.textContent : scope) + '\n選んだ視点：' + (lensButton ? lensButton.textContent : lens) + '\nこの出来事に重なる視点：' + related + '\n\nまず、この出来事の前の状況・何が変わったか・後への影響を日常語で説明してください。' + lensPromptInstructions[lens] + ' いきなり私の意見を求めず、理解の足場を作ってください。事実と解釈、不確かな年代、未来の推測は区別してください。時系列の近さを因果と見なさず、別の地域や反対の見方にも触れてください。続いてたどれる方向を2〜3個示してください。';
    return prompt + (isEnglish ? '\n\nSources:\n' : '\n\n出典：\n') + selected.links.map(function (link) { return link.label + (isEnglish ? ': ' : '：') + new URL(link.href, isEnglish ? 'https://pinco53.github.io/ManabiMap/en/evolution.html' : 'https://pinco53.github.io/ManabiMap/evolution.html').href; }).join('\n');
  }
  window.ManabiAI.mount(dialog.querySelector('.deep-time-dialog__dialogue'), selectedPrompt);

  document.getElementById('deepTimeCopy').addEventListener('click', async function () {
    const prompt = selectedPrompt();
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      copyStatus.textContent = isEnglish ? 'Inquiry copied. Paste it into the AI you use.' : 'コピーしました。普段使うAIに貼り付けてください。';
    } catch (error) {
      promptBox.value = prompt;
      promptBox.hidden = false;
      copyStatus.textContent = isEnglish ? 'Select and copy the inquiry below.' : '下の対話文を選択してコピーしてください。';
    }
  });

  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' });
  let cameraUniform = null;
  let clockUniform = null;
  let dprUniform = null;
  let particleCount = 0;
  if (gl) {
    try {
      const vertex = makeShader(gl.VERTEX_SHADER, 'precision highp float;attribute vec4 star;uniform vec2 camera;uniform float clock;uniform float dpr;varying vec3 color;void main(){float x=.5+(star.x-camera.x)*camera.y*.92;float drift=sin(clock*.15+star.x*20.+star.y*8.)*.003;float y=.53+sin(star.x*5.2)*.07+star.y+drift;gl_Position=vec4(x*2.-1.,1.-y*2.,0.,1.);gl_PointSize=max(1.,star.w*dpr*pow(camera.y,.16));float warm=exp(-pow((star.x-.46)*3.,2.));color=mix(vec3(.54,.68,.84),vec3(1.,.82,.46),warm)*star.z*2.2/pow(camera.y,.12);}');
      const fragment = makeShader(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec3 color;void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;gl_FragColor=vec4(color*exp(-r*r*3.),1.);}');
      const program = gl.createProgram();
      gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('WebGL program link failed');
      gl.useProgram(program);
      const data = particles(90000);
      particleCount = data.length / 4;
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const star = gl.getAttribLocation(program, 'star');
      gl.enableVertexAttribArray(star); gl.vertexAttribPointer(star, 4, gl.FLOAT, false, 16, 0);
      cameraUniform = gl.getUniformLocation(program, 'camera');
      clockUniform = gl.getUniformLocation(program, 'clock');
      dprUniform = gl.getUniformLocation(program, 'dpr');
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.clearColor(.005, .012, .025, 1);
    } catch (error) {
      console.warn('Deep time particle field is unavailable.', error);
      particleCount = 0;
    }
  }

  function makeShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }

  function particles(count) {
    let seed = 286713;
    function random() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return (seed + 1) / 4294967297; }
    function normal() { return Math.sqrt(-2 * Math.log(random())) * Math.cos(6.28318 * random()); }
    const data = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      const x = random();
      const spread = .075 + .12 * Math.pow(Math.sin(x * Math.PI), 2);
      const y = normal() * spread;
      const dust = .4 + .6 * Math.abs(Math.sin(x * 23 + y * 13) * Math.cos(x * 8 - y * 21));
      data.set([x, y, (.10 + random() * .30) * dust, random() > .995 ? 2.8 : .65 + random() * .8], i * 4);
    }
    return data;
  }

  function resizeCanvas() {
    needsRender = true;
    pointers.clear(); gesture = null; stopMotion();
    surface.classList.remove('is-dragging'); section.classList.remove('is-navigating');
    if (!gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (dprUniform) gl.uniform1f(dprUniform, dpr);
  }
  new ResizeObserver(resizeCanvas).observe(canvas);
  resizeCanvas();

  let lastRendered = null;
  function animate(now) {
    const dt = Math.min((now - lastFrame) / 1000, .05);
    lastFrame = now;
    if (!pointers.size && inSpace && !document.hidden && !dialog.open && !reducedMotion.matches) {
      if (Math.abs(inertia.pan) > .000005 || Math.abs(inertia.depth) > .005) {
        const before = target;
        target = zoomAt(target, Math.exp(inertia.depth * dt), inertia.anchor);
        target = bound(target.center + inertia.pan * dt, target.zoom);
        if (target.center === before.center) inertia.pan = 0;
        if (target.zoom === before.zoom) inertia.depth = 0;
        const decay = Math.exp(-6 * dt); inertia.pan *= decay; inertia.depth *= decay;
      }
    }
    const blend = reducedMotion.matches ? 1 : 1 - Math.exp(-dt * 9);
    view.center += (target.center - view.center) * blend;
    view.zoom += (target.zoom - view.zoom) * blend;
    if (flowing && !reducedMotion.matches) elapsed += dt;
    if (needsRender || !lastRendered || Math.abs(view.center - lastRendered.center) > .000001 || Math.abs(view.zoom - lastRendered.zoom) > .0001) {
      renderPoints(); renderInterface();
      lastRendered = { ...view }; needsRender = false;
    }
    if (gl && particleCount && inSpace && !document.hidden) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(cameraUniform, view.center, view.zoom);
      gl.uniform1f(clockUniform, elapsed);
      gl.drawArrays(gl.POINTS, 0, particleCount);
    }
    requestAnimationFrame(animate);
  }
  const returnKey = 'manabimap-time-ai-return-' + (isEnglish ? 'en' : 'ja');
  window.addEventListener('manabimap:ai-handoff', function () {
    stopMotion();
    try {
      sessionStorage.setItem(returnKey, JSON.stringify({
        center: target.center, zoom: target.zoom, scope: scope, lens: lens, flowing: flowing,
        selectedId: selected && selected.id, dialogOpen: dialog.open,
        scrollY: window.scrollY, savedAt: Date.now()
      }));
    } catch (_) {}
  });
  try {
    const saved = JSON.parse(sessionStorage.getItem(returnKey));
    sessionStorage.removeItem(returnKey);
    if (saved && Date.now() - saved.savedAt < 86400000 && Number.isFinite(saved.center) && Number.isFinite(saved.zoom) && Object.hasOwn(lensQuestions, saved.lens)) {
      target = bound(saved.center, saved.zoom); view = { ...target }; lens = saved.lens;
      scope = saved.scope === 'all' ? 'all' : 'core';
      flowing = saved.flowing !== false;
      document.querySelectorAll('[data-time-lens]').forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.timeLens === lens)); });
      document.querySelectorAll('[data-time-scope]').forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.timeScope === scope)); });
      if (questionText) questionText.textContent = lensQuestions[lens];
      document.getElementById('deepTimeFlow').textContent = flowing ? 'Ⅱ' : '▶';
      document.getElementById('deepTimeFlow').setAttribute('aria-label', isEnglish ? (flowing ? 'Pause the drifting particles' : 'Resume the drifting particles') : (flowing ? '粒の漂いを止める' : '粒の漂いを再開する'));
      selected = events.find(function (event) { return event.id === saved.selectedId; }) || null;
      if (saved.dialogOpen && selected) openEvent(selected);
      if (Number.isFinite(saved.scrollY)) requestAnimationFrame(function () { window.scrollTo(0, saved.scrollY); });
    }
  } catch (_) {}
  requestAnimationFrame(animate);

  new IntersectionObserver(function (entries) {
    inSpace = entries[0].isIntersecting;
    document.body.classList.toggle('deep-in-space', inSpace);
  }, { threshold: .1 }).observe(section);
})();
