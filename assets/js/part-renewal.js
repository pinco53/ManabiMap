(function () {
  'use strict';

  var configs = {
    '1': {
      partLabel: '第1部',
      guideTitle: '機械が変えた、<br>人間のリズムをたどる旅。',
      guideDescription: '産業革命を発明と成長の歴史としてだけ見ず、身体の解放、労働の分断、時間の統一、教育の標準化から見直します。便利さと引き換えに変わった、人間の暮らしのリズムをたどる旅です。',
      centerQuestion: '機械は人間を何から解放し、何に縛ったのか。',
      coverQuestion: '便利さは、何を解放し、何を奪ったのか。',
      centerCopy: '蒸気機関、工場、鉄道、時計と教育、便利さの代償。技術革命に繰り返される解放と喪失の型を、5つのテーマからたどります。',
      outcomes: [
        '蒸気機関は身体の制約を越え、生産と移動の可能性を大きく広げた',
        '工場と標準時は、人間を同じ時間で動かし、労働と教育のリズムを均一化した',
        '技術の価値は便利さだけでなく、何を得て何を失ったかを同時に見ることで捉え直せる'
      ],
      themeCount: '5',
      themeLabel: '5つのテーマから読む',
      themeSummary: '蒸気、工場、鉄道、時計、便利さへ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#industrial-revolution',
      noteTarget: '第1部',
      readFallback: ['../library.html', '機械と時間をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part2.html', '次の旅', '機械が身体を広げたあと、情報技術は人と人の距離をどう変えたのか。', '第2部へ進む →'],
        ['../questions.html', '次の問い', '機械は人間を何から解放し、何に縛ったのか。', '問いの一覧へ →'],
        ['../map.html#industrial-revolution', '地図へ戻る', '産業革命と技術の変化を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '2': {
      partLabel: '第2部',
      guideTitle: '距離が消えたあとに、<br>人と人の「あいだ」を見直す旅。',
      guideDescription: 'デジタル技術を便利さの歴史としてだけ見ず、情報への距離、画面越しの存在、注意の奪い合い、孤独から見直します。常時接続の世界で、誰とどうつながるかを選び直す旅です。',
      centerQuestion: 'つながることは、近づくことと同じなのか。',
      coverQuestion: 'つながることは、近づくことと同じなのか。',
      centerCopy: 'コンピュータ、インターネット、スマートフォン、注意経済。デジタル革命が人と人の「あいだ」を変えた過程を4つの章からたどります。',
      outcomes: [
        'デジタル技術は情報と発信の距離を縮め、知ることと参加することの範囲を広げた',
        '常時接続は、関係を保つ一方で、注意の断片化と「つながっている孤独」を生んだ',
        '道具との距離を自分で選ぶことが、注意と人間関係の主導権を取り戻す入口になる'
      ],
      themeCount: '4',
      themeLabel: '4つの章から読む',
      themeSummary: '計算機、ネット、常時接続、注意へ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#connection',
      noteTarget: '第2部',
      readFallback: ['../library.html', 'デジタルとつながりをめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part3.html', '次の旅', '情報を運ぶ機械が答えを作り始めたとき、人間は何を選ぶのか。', '第3部へ進む →'],
        ['../question.html?id=connection', '次の問い', 'つながることは、近づくことと同じなのか。', 'AI対話の入口へ →'],
        ['../map.html#connection', '地図へ戻る', 'つながりと注意を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '3': {
      partLabel: '第3部',
      guideTitle: 'AIの能力ではなく、<br>人間の選択をたどる旅。',
      guideDescription: 'AIを人間との能力競争としてだけ見ず、理解と模倣、存在と再現、身体と不完全さ、教育、人生の選択から見直します。答えを任せられる時代に、自分で生きる意味を確かめる旅です。',
      centerQuestion: 'AIが答えを出せる時代に、自分の人生を生きるとは何か。',
      coverQuestion: 'AIに任せられることが増えたとき、何を自分で選ぶのか。',
      centerCopy: 'ChatGPTの衝撃、こだまとしてのおじいさん、身体性、教育、人間に残る4つの力。AIと生きる選択を5つのテーマからたどります。',
      outcomes: [
        '自然な応答や精巧な再現ができることと、意味を理解し存在することは同じではない',
        '身体、不完全さ、偶然、他者との関係には、効率や正確さだけでは測れない価値がある',
        'AI時代の人間の役割は、能力で競うことではなく、問い、選び、結果を引き受けることにある'
      ],
      themeCount: '5',
      themeLabel: '5つのテーマから読む',
      themeSummary: '理解、存在、身体、教育、選択へ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#thinking',
      noteTarget: '第3部',
      readFallback: ['../library.html', 'AIと人間をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part4.html', '次の旅', '人間が外へ残してきた知識は、AIまでどう受け継がれたのか。', '第4部へ進む →'],
        ['../question.html?id=thinking', '次の問い', 'AIが答えを出せる時代に、人間が考えるとは何か。', 'AI対話の入口へ →'],
        ['../map.html#thinking', '地図へ戻る', 'AIと人間の思考を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '4': {
      partLabel: '第4部',
      guideTitle: '記憶を身体の外へ出し、<br>知識の広がりをたどる旅。',
      guideDescription: '文字を単なる記号としてではなく、記憶を時間の外へ運び、知識を持つ人と届く範囲を変えてきた器として見直します。粘土板から印刷、電信、ウェブ、生成AIへ進む5000年の旅です。',
      centerQuestion: '知識は、誰のものか。',
      coverQuestion: '書き残された知識は、誰のものになるのか。',
      centerCopy: '口承、文字、印刷、百科全書、電信、ウェブ、検索と生成AI。知識の器と、それを持つ人が変わる過程を7つの物語からたどります。',
      outcomes: [
        '文字は、個人の記憶を身体の外へ出し、世代を越えて蓄積できるようにした',
        '印刷とネットワークは、知識を広げると同時に、何を届けるかを決める新しい権力を生んだ',
        '生成AIは、記録を探すだけでなく、問いに応じて知識を再構成する段階を開いた'
      ],
      themeCount: '7',
      themeLabel: '7つの物語から読む',
      themeSummary: '口承、文字、印刷、通信、生成AIへ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#writing',
      noteTarget: '第4部',
      readFallback: ['../library.html', '文字と知識をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part5.html', '次の旅', '知識を運ぶ言葉は、私たちの思考そのものをどう変えるのか。', '第5部へ進む →'],
        ['../question.html?id=understanding', '次の問い', '検索できることと、理解していることは同じなのか。', 'AI対話の入口へ →'],
        ['../map.html#writing', '地図へ戻る', '文字と知識を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '5': {
      partLabel: '第5部',
      guideTitle: '言葉の手前から、<br>思考の翼をたどる旅。',
      guideDescription: '思考を頭の中の声だけに閉じ込めず、言葉になる前の感覚、内なる声、抽象化、因果、異なる言語、AIから見直します。言葉が世界を切り分け、遠くへ運ぶ過程をたどる旅です。',
      centerQuestion: '言葉は思考を作るのか。それとも、思考が言葉を作るのか。',
      coverQuestion: '言葉がなければ、考えられないのか。',
      centerCopy: '言語の起源、内なる声、抽象化、因果、言語の多様性、AI。言葉と思考の境界を、7つの物語からたどります。',
      outcomes: [
        '言葉になる前にも、感覚や空間、因果を扱う思考は存在する',
        '新しい言葉や概念は、世界の切り分け方と見え方を変える',
        '言葉を自然に扱えることと、その意味を理解することは同じではない'
      ],
      themeCount: '7',
      themeLabel: '7つの物語から読む',
      themeSummary: '内なる声、抽象化、世界、AIへ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#language',
      noteTarget: '第5部',
      readFallback: ['../library.html', '言葉と思考をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part6.html', '次の旅', '言葉から生まれた抽象化は、数で世界をどう変えたのか。', '第6部へ進む →'],
        ['../question.html?id=language', '次の問い', '言葉は思考を作るのか、思考が言葉を作るのか。', 'AI対話の入口へ →'],
        ['../map.html#language', '地図へ戻る', '言葉と思考を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '6': {
      partLabel: '第6部',
      guideTitle: '数が見せた世界と、<br>測れない価値を知る旅。',
      guideDescription: '数字を客観的で中立な答えとしてだけ見ず、数えること、記録すること、予測すること、評価することから見直します。数字が文明を広げ、人を縛るまでをたどる旅です。',
      centerQuestion: '数字は世界を測る道具なのか。それとも、価値を決める支配者なのか。',
      coverQuestion: '何を測るかは、誰が決めるのか。',
      centerCopy: '一対一対応、記録、国家、ゼロ、確率、評価。数と人間の関係が反転するまでを、8つの物語からたどります。',
      outcomes: [
        '数は、比較と記録によって人間の記憶と文明を広げた',
        '確率は、読めない個人から集団の未来を予測する力を作った',
        '数字で測る行為には、何を価値とするかという選択が含まれる'
      ],
      themeCount: '8',
      themeLabel: '8つの物語から読む',
      themeSummary: '数える、記録する、予測する、測るへ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#number',
      noteTarget: '第6部',
      readFallback: ['../library.html', '数字と価値をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part7.html', '次の旅', '数と計算が進んだ先で、人間の前提はどう外れたのか。', '第7部へ進む →'],
        ['../question.html?id=number', '次の問い', '数字で測れないものに、どう価値を与えるのか。', 'AI対話の入口へ →'],
        ['../map.html#number', '地図へ戻る', '数と評価を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '7': {
      partLabel: '第7部',
      guideTitle: '人間の「当たり前」を、<br>ひとつずつ外す旅。',
      guideDescription: '人間を小さくするためではなく、人間に残る役割を見つけるために。感覚、理解、思考、人間だけの特権という前提を、4人の科学者の問いから見直します。',
      centerQuestion: '感覚も、理解も、思考も、人間だけの特権でないなら、何が残るのか。',
      coverQuestion: '4つの前提が外れた後に、何が残るのか。',
      centerCopy: 'アインシュタイン、ファインマン、チューリング、フォン・ノイマン。人間の再定義へ向かう4つの物語をたどります。',
      outcomes: [
        '感覚的な「当たり前」は、世界の真実を保証しない',
        '理解できることと、正しく計算して使えることは同じではない',
        '思考を作れる時代には、何を問い、何を大切にするかが残る'
      ],
      themeCount: '4',
      themeLabel: '4人の問いから読む',
      themeSummary: '感覚、理解、計算、思考へ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#thinking',
      noteTarget: '第7部',
      readFallback: ['../library.html', '科学と人間をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part8.html', '次の旅', '4人の問いの先で、生成AIはどのように生まれたのか。', '第8部へ進む →'],
        ['../question.html?id=understanding', '次の問い', '「知っている」と「わかっている」は、同じだろうか。', 'AI対話の入口へ →'],
        ['../map.html#thinking', '地図へ戻る', '科学と思考を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '8': {
      partLabel: '第8部・第一章',
      guideTitle: '生成という断層を、<br>歴史からたどる旅。',
      guideDescription: '生成AIを突然現れた便利な道具としてだけ見ず、ルール、機械学習、言語モデル、生成へ至る歴史から見直します。知識のあり方が変わった境界をたどる旅です。',
      centerQuestion: '統計は、思考なのか。',
      coverQuestion: '統計は、思考なのか。',
      centerCopy: '作るAI、確率、言語モデル、知識の生成。AIが「考えているように見える」までを、5つの物語からたどります。',
      outcomes: [
        'AIは、ルールを実行する機械からパターンを学ぶ仕組みへ変わった',
        '自然な出力と、意味を理解していることは同じではない',
        '知識が生成される時代には、問いの設計が新しい力になる'
      ],
      themeCount: '5',
      themeLabel: '5つの問いから読む',
      themeSummary: '生成、確率、言語モデル、知識へ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#thinking',
      noteTarget: '第8部',
      readFallback: ['../library.html', '生成AIと知識をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part8_2.html', '第二章へ', '生成された思考は、社会と学びをどう変えるのか。', '第二章をたどる →'],
        ['../question.html?id=understanding', '次の問い', '「知っている」と「わかっている」は、同じだろうか。', 'AI対話の入口へ →'],
        ['../map.html#thinking', '地図へ戻る', 'AIと思考を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '8-2': {
      partLabel: '第8部・第二章',
      guideTitle: '借りた答えから、<br>自分の思考を取り戻す旅。',
      guideDescription: 'AIが作った文章や答えを、便利か不正かの二択だけで裁かず、宿題、学力、評価、思考の所有から見直します。代替と拡張の境界をたどる旅です。',
      centerQuestion: 'AIが「考える」を担う時代に、人間が「考える」ことの意味はどこにあるか。',
      coverQuestion: 'これは、誰の考えなのか。',
      centerCopy: '宿題、試験、測れる学力、問いを立てる力。思考を外へ預けたときに残るものを、第6〜10話からたどります。',
      outcomes: [
        '答えを得ることと、考える過程が自分を変えることは同じではない',
        '試験で測れる能力は、学力や人間の価値のすべてではない',
        'AIは、思考を代替する道具にも拡張する相手にもなりうる'
      ],
      themeCount: '5',
      themeLabel: '第6〜10話から読む',
      themeSummary: '宿題、学力、思考の所有へ進む →',
      themeHref: '#theme-06',
      mapHref: '../map.html#thinking',
      noteTarget: '第8部',
      readFallback: ['../library.html', 'AIと学びをめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['part9.html', '次の旅', '情報が速くなるほど、身体の時間は何を教えるのか。', '第9部へ進む →'],
        ['../question.html?id=number', '別の視点', '数字で測れないものに、どう価値を与えるのか。', 'AI対話の入口へ →'],
        ['../map.html#thinking', '地図へ戻る', 'AIと学びを中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '9': {
      partLabel: '第9部',
      guideTitle: '速すぎる世界で、<br>身体の時間を取り戻す旅。',
      guideDescription: '疲れ、不安、集中の難しさを意志の弱さだけに求めず、進化の時間と情報環境の速度差から見直します。身体から届く反応を、未来を選ぶための情報として読み直す旅です。',
      centerQuestion: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      coverQuestion: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
      centerCopy: '二足歩行、報酬系、不安、集中、痛み、感性。身体と情報の速度差を、15の物語からたどります。',
      outcomes: [
        '身体は、技術や情報環境よりもはるかにゆっくり変わる',
        '現代の疲れは、古い身体と速い環境の衝突として読める',
        '疲れや違和感は、環境と未来を選び直すための情報になる'
      ],
      themeCount: '15',
      themeLabel: '15のテーマから読む',
      themeSummary: '進化、注意、痛み、感性へ進む →',
      mapHref: '../map.html#thinking',
      noteTarget: '第9部',
      readFallback: ['../library.html', '身体と進化をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['../question.html?id=thinking', '次の問い', 'AIが答えを出せる時代に、人間が考えるとは何か。', 'AI対話の入口へ →'],
        ['../question.html?id=number', '別の視点', '数字で測れないものに、どう価値を与えるのか。', 'AI対話の入口へ →'],
        ['../map.html#thinking', '地図へ戻る', '身体とAIを中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '10': {
      partLabel: '第10部',
      guideTitle: '意味が生まれる、<br>「あいだ」をたどる旅。',
      guideDescription: '感動や美しさを、説明できない神秘にも脳の反応だけにも閉じ込めず、身体、記憶、進化、文化、作品との関係から見直します。何を大切だと感じ、選ぶのかをたどる旅です。',
      centerQuestion: '感性は、脳に還元できるのか。それとも、関係の中でしか立ち上がらないのか。',
      coverQuestion: '意味はどこから生まれるのか。',
      centerCopy: '感動、美、共感、物語、生成AI。感じることと意味を持つことの違いを、15の物語からたどります。',
      outcomes: [
        '感性は、知覚、身体反応、記憶、予測が統合される過程である',
        '美と意味は、対象と受け手、その文脈のあいだに生まれる',
        'AI時代の人間には、何を選び、影響を引き受けるかが残る'
      ],
      themeCount: '15',
      themeLabel: '15のテーマから読む',
      themeSummary: '感動、美、文化、生成AIへ進む →',
      mapHref: '../map.html#connection',
      noteTarget: '第10部',
      readFallback: ['../library.html', '感性と意味をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['../question.html?id=number', '次の問い', '数字で測れないものに、どう価値を与えるのか。', 'AI対話の入口へ →'],
        ['../question.html?id=thinking', '別の視点', 'AIが答えを出せる時代に、人間が考えるとは何か。', 'AI対話の入口へ →'],
        ['../map.html#connection', '地図へ戻る', '意味と関係を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '11': {
      partLabel: '第11部',
      guideTitle: '応答される安心から、<br>未知へ踏み出す旅。',
      guideDescription: '学びの始まりを知識や早期教育だけに求めず、泣き声への応答、愛着、模倣、遊び、自己効力感から見直します。世界へ働きかける力が関係の中で育つ過程をたどる旅です。',
      centerQuestion: '学びは、教えられる前から始まっている。それは、何によって支えられているのか。',
      coverQuestion: '人はどう学び始めるのか。',
      centerCopy: '応答されること、安心して探索すること、遊びながら試すこと。そのつながりを15の物語からたどります。',
      outcomes: [
        '最初に学ぶのは知識ではなく、世界は応答するという予測である',
        '安心できる場所があるからこそ、未知へ探索に出られる',
        '自律性や自己効力感は、周囲とのやりとりの中で育つ'
      ],
      themeCount: '15',
      themeLabel: '15のテーマから読む',
      themeSummary: '愛着、探索、遊び、自律性へ進む →',
      mapHref: '../map.html#connection',
      noteTarget: '第11部',
      readFallback: ['../library.html', '発達と学びをめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['../question.html?id=connection', '次の問い', 'つながることは、近づくことと同じなのか。', 'AI対話の入口へ →'],
        ['../question.html?id=language', '別の視点', '言葉は思考を作るのか、思考が言葉を作るのか。', 'AI対話の入口へ →'],
        ['../map.html#connection', '地図へ戻る', '関係と学びを中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '12': {
      partLabel: '第12部',
      guideTitle: '理解を外に出し、<br>対話の中で確かめる旅。',
      guideDescription: '学びを一人の頭の中だけで完結させず、説明、問い返し、評価、AIとの対話から見直します。理解が外に出され、揺さぶられ、作り直される条件をたどる旅です。',
      centerQuestion: '一人で考えることと、対話しながら考えることは、何が違うのか。',
      coverQuestion: '人はなぜ、一人では学べないのか。',
      centerCopy: 'わかったつもりを確かめること、間違いから学ぶこと、答えではなく思考を引き出すこと。その往復を15の物語からたどります。',
      outcomes: [
        '理解は、説明しようとしたときに初めて穴が見える',
        '評価や比較は、設計しだいで学びを支えも傷つけもする',
        'AIは、答えではなく思考を引き出す対話相手にできる'
      ],
      themeCount: '15',
      themeLabel: '15のテーマから読む',
      themeSummary: '説明、評価、AIとの対話へ進む →',
      mapHref: '../map.html#thinking',
      noteTarget: '第12部',
      readFallback: ['../library.html', '対話と学びをめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['../question.html?id=understanding', '次の問い', '「知っている」と「わかっている」は、同じだろうか。', 'AI対話の入口へ →'],
        ['../question.html?id=thinking', '別の視点', 'AIが答えを出せる時代に、人間が考えるとは何か。', 'AI対話の入口へ →'],
        ['../map.html#thinking', '地図へ戻る', '対話とAIを中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '13': {
      partLabel: '第13部',
      guideTitle: '学びを閉じた場所から、<br>もう一度世界へ。',
      guideDescription: '学べない理由を個人の意欲だけに求めず、文化、学校、家庭、関係の中から見直します。学びが受け渡され、閉じられ、再び開く条件をたどる旅です。',
      centerQuestion: '人はなぜ学び、なぜ学びを閉じるのか。',
      coverQuestion: 'どうすれば、もう一度世界へ向かう力を取り戻せるのか。',
      centerCopy: '知を受け継ぐこと、挑戦をやめること、安全基地から探索すること。そのつながりを4つの物語からたどります。',
      outcomes: [
        '学びは、世代を越えて知を受け渡す共同作業である',
        '学びを閉じることは、環境の中で生まれる反応でもある',
        '学校と家庭は、挑戦へ戻れる安全な土台を支えられる'
      ],
      themeCount: '4',
      themeSummary: '累積文化、学校、家庭へ進む →',
      mapHref: '../map.html#number',
      noteTarget: '第13部',
      readFallback: ['../library.html', '学びと教育をめぐる読みものを探す', 'ライブラリから探す →'],
      next: [
        ['../question.html?id=understanding', '次の問い', '「知っている」と「わかっている」は、同じだろうか。', 'AI対話の入口へ →'],
        ['../question.html?id=thinking', '別の視点', 'AIが答えを出せる時代に、人間が考えるとは何か。', 'AI対話の入口へ →'],
        ['../map.html#number', '地図へ戻る', '学びと評価を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '14': {
      partLabel: '第14部',
      guideTitle: '自分の中の「天動説」を、<br>問い直す旅。',
      guideDescription: '過去の誤りを笑うためではなく、自分の見方が何に支えられているかを確かめるために。天文学、道具、証拠、共同体を重ねて見ていきます。',
      centerQuestion: '科学とは、正解を知ることなのか。',
      coverQuestion: '自分の中の「天動説」は何か。',
      centerCopy: '感覚に合う説明と証拠に合う説明。その違いを、地動説へ至る5つの物語からたどります。',
      outcomes: [
        '観察は、見方や道具から独立していない',
        '小さなずれが、世界の見方を変えることがある',
        '学び直しは、証拠に応じて前提を更新すること'
      ],
      themeCount: '5',
      themeSummary: '天動説、観測、科学革命へ進む →',
      mapHref: '../map.html#understanding',
      noteTarget: '第14部',
      readFallback: ['../library.html', '見方を更新する読みものを探す', 'ライブラリから探す →'],
      next: [
        ['../question.html?id=understanding', '次の問い', '「知っている」と「わかっている」は、同じだろうか。', 'AI対話の入口へ →'],
        ['../question.html?id=number', '別の視点', '数字で測れないものに、どう価値を与えるのか。', 'AI対話の入口へ →'],
        ['../map.html#understanding', '地図へ戻る', '理解を中心に、見方を更新する旅を見渡す。', '学びの地図へ →']
      ]
    },
    '15': {
      partLabel: '第15部',
      guideTitle: '「わかったつもり」を、<br>問い直す旅。',
      guideDescription: '答えを否定するためではなく、自分の確信がどこから来たのかを確かめるために。認知、科学史、哲学、AIを重ねて見ていきます。',
      centerQuestion: '「わかった」と「考えた」は、同じなのか。',
      coverQuestion: '「わかった」と「考えた」は、同じなのか。',
      centerCopy: '説明できること、反対の証拠を検討できること、考えを更新できること。その違いを8つの物語からたどります。',
      outcomes: [
        '確信の強さと、証拠の強さは同じではない',
        '迷いを保つことは、判断を放棄することではない',
        'AIの答えは、検証と問い直しの入口にできる'
      ],
      themeCount: '8',
      themeSummary: '確信、迷い、AIへ進む →',
      mapHref: '../map.html#understanding',
      noteTarget: '第15部',
      readFallback: ['https://note.com/manabimapcreator/n/n6e3146ea667c', '「わかった」と思ったとき、考えるのをやめていないか', 'noteで日常から考える ↗', true],
      next: [
        ['../question.html?id=thinking', '次の問い', 'AIが答えを出せる時代に、人間が考えるとは何か。', 'AI対話の入口へ →'],
        ['../question.html?id=language', '別の視点', '言葉は思考を作るのか、思考が言葉を作るのか。', 'AI対話の入口へ →'],
        ['../map.html#understanding', '地図へ戻る', '理解を中心に、関連する知識を見渡す。', '学びの地図へ →']
      ]
    },
    '16': {
      partLabel: '第16部',
      guideTitle: 'エネルギーが広げた自由と、<br>新しく生まれた制約をたどる旅。',
      guideDescription: 'エネルギー史を発明の一覧としてだけ見ず、火、自然力、化石燃料、電力網、原子核、太陽光、核融合から見直します。人類が何から自由になり、何を新たに引き受けたのかをたどる旅です。',
      centerQuestion: 'エネルギーを得るたび、人類は何から自由になったのか。次に自由になるのは何か。',
      coverQuestion: '次に人類が自由になるのは、何からか。',
      centerCopy: '火から核融合まで、エネルギーの量・場所・使い方が変わるたびに、暮らしと制度も組み替えられてきました。その連鎖を8つの物語からたどります。',
      outcomes: [
        'エネルギーは、変換・輸送・制度がそろって初めて暮らしの自由になる',
        '効率化は利用を広げ、総消費や新しい負担を増やすことがある',
        '次の自由は供給量だけでなく、アクセス、公平さ、持続可能性から考える必要がある'
      ],
      themeCount: '8',
      themeLabel: '8つの物語から読む',
      themeSummary: '火、化石燃料、電力、原子核、太陽へ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#all-journeys',
      noteTarget: '第16部',
      readFallback: ['../note.html', 'エネルギーと人類史をめぐる読みものを探す', 'note記事から探す →'],
      next: [
        ['part17.html', '次の旅', 'エネルギーで広げた力を、人類はどう組み合わせたのか。', '第17部へ進む →'],
        ['../questions.html', '次の問い', 'この旅の先で、いまの自分が考え続けたい問いを選ぶ。', '問いの一覧へ →'],
        ['../evolution.html', '大きな時間へ', 'エネルギーと生命と文明を、138億年の時間の中で見渡す。', '進化の年表へ →']
      ]
    },
    '17': {
      partLabel: '第17部',
      guideTitle: '協働できる相手が、<br>広がった歴史をたどる旅。',
      guideDescription: '交換史を物とお金の歴史としてだけ見ず、贈与、信用、貨幣、分業、世界供給網、AIから見直します。見知らぬ力を組み合わせる仕組みと、そこに生まれる依存をたどる旅です。',
      centerQuestion: 'なぜ人類は、見知らぬ他人とも協力できるようになったのか。',
      coverQuestion: '協働できる相手が広がると、何への依存が深まるのか。',
      centerCopy: '贈与からAIまで、関係、価値、知識を共有する足場が広がる過程を6つの物語からたどります。',
      outcomes: [
        '信頼は人柄だけでなく、評判、契約、標準などの仕組みから作られる',
        '貨幣と分業は個人の限界を超える一方、全体像と責任を見えにくくする',
        'AIとの協働では、速度と判断、出力と責任を分けずに設計する必要がある'
      ],
      themeCount: '6',
      themeLabel: '6つの物語から読む',
      themeSummary: '贈与、貨幣、分業、供給網、AIへ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#all-journeys',
      noteTarget: '第17部',
      readFallback: ['../note.html', '交換と協働をめぐる読みものを探す', 'note記事から探す →'],
      next: [
        ['part18.html', '次の旅', '広がった協働の中で、人の判断は現実をどう編集するのか。', '第18部へ進む →'],
        ['../question.html?id=connection', '次の問い', 'つながることは、近づくことと同じなのか。', 'AI対話の入口へ →'],
        ['../map.html#all-journeys', '地図へ戻る', '文明と協働を中心に、関連する旅を見渡す。', '学びの地図へ →']
      ]
    },
    '18': {
      partLabel: '第18部',
      guideTitle: '「現実」ができるまでを、<br>複数のレンズでたどる旅。',
      guideDescription: '勘違いを個人の不注意だけで説明せず、注意、記憶、確証バイアス、同調、第一印象、物語、メタ認知、AIから見直します。自分の見え方を更新する旅です。',
      centerQuestion: '私たちが見ている「現実」は、世界そのものなのか。',
      coverQuestion: '自分の見方を、どうやって更新できるのか。',
      centerCopy: '見る、思い出す、信じる、合わせる、判断する。脳が現実を編集する過程を9つの物語からたどります。',
      outcomes: [
        '知覚と記憶は録画ではなく、注意と予測による編集である',
        'バイアスは意志だけでは消えず、判断の手順と情報環境の設計が必要になる',
        '人間とAIの流暢さや自信を、事実性や正確さの証拠にしない'
      ],
      themeCount: '9',
      themeLabel: '9つの物語から読む',
      themeSummary: '注意、記憶、同調、判断、AI、現実へ進む →',
      themeHref: '#theme-01',
      mapHref: '../map.html#understanding',
      noteTarget: '第18部',
      readFallback: ['../note.html', '判断と現実をめぐる読みものを探す', 'note記事から探す →'],
      next: [
        ['../questions.html', '次の問い', 'これまでの旅から、いまの自分が考え続けたい問いを選ぶ。', '問いの一覧へ →'],
        ['part17.html', '前の旅へ', '判断の前提となる、交換と協働の仕組みを読み返す。', '第17部へ戻る →'],
        ['../map.html#understanding', '地図へ戻る', '理解と判断を中心に、関連する旅を見渡す。', '学びの地図へ →']
      ]
    }
  };

  var partNumber = document.body && document.body.dataset.part;
  var config = configs[partNumber];
  var data = window.ManabiMapData || {};
  var body = document.body;
  var root = document.getElementById('part-series-root');
  var cover = document.querySelector('.cover');
  if (!config || !body || !root || !cover) return;

  body.classList.add('part-renewed');

  function removeLegacyEntrances() {
    var oldNav = document.querySelector('.manabi-nav');
    if (oldNav) oldNav.remove();
    var oldBridge = document.querySelector('.part-map-bridge');
    if (oldBridge) oldBridge.remove();
  }

  removeLegacyEntrances();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeLegacyEntrances);
  }

  document.querySelectorAll('.episode-row, .episode-card, .scientist-card, .theme-card').forEach(function (row, index) {
    var classMatch = row.className && String(row.className).match(/\b(?:ep|sc|th)(\d+)\b/);
    var number = classMatch ? Number(classMatch[1]) : index + 1;
    if (!row.id) row.id = 'theme-' + String(number).padStart(2, '0');
  });
  document.querySelectorAll('.upcoming-card').forEach(function (card) {
    var numberMatch = card.textContent.match(/EPISODE\s*(\d+)/i);
    if (numberMatch && !card.id) card.id = 'theme-' + String(Number(numberMatch[1])).padStart(2, '0');
  });

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  function linkAttrs(external) {
    return external ? ' target="_blank" rel="noopener"' : '';
  }

  var header = document.createElement('header');
  header.className = 'part-v2-header';
  header.innerHTML =
    '<a class="part-v2-brand" href="../index.html" aria-label="Manabi Map トップ">' +
      '<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="8"></circle><ellipse cx="28" cy="28" rx="23" ry="13"></ellipse><ellipse cx="28" cy="28" rx="13" ry="23" transform="rotate(34 28 28)"></ellipse><circle class="part-v2-brand__star" cx="49" cy="24" r="2.4"></circle></svg>' +
      '<span><strong>Manabi Map</strong><small>知の重力レンズ</small></span>' +
    '</a>' +
    '<nav aria-label="メインナビゲーション"><a href="../questions.html">AIと対話する</a><a href="../map.html">学びの地図</a><a href="../library.html">読む・聴く</a><a href="../start.html">はじめての方へ</a></nav>' +
    '<details><summary aria-label="メニューを開く"><span></span><span></span><span></span></summary><nav aria-label="モバイルナビゲーション"><a href="../questions.html">AIと対話する</a><a href="../map.html">学びの地図</a><a href="../library.html">読む・聴く</a><a href="../start.html">はじめての方へ</a></nav></details>';
  var guideId = 'part' + partNumber + '-guide';
  var guideTitleId = guideId + '-title';
  var nextTitleId = 'part' + partNumber + '-next-title';
  var skip = document.createElement('a');
  skip.className = 'part-v2-skip';
  skip.href = '#' + guideId;
  skip.textContent = '本文へ移動';
  body.insertAdjacentElement('afterbegin', header);
  body.insertAdjacentElement('afterbegin', skip);

  var series = cover.querySelector('.cover-series');
  if (series) series.textContent = 'MANABI MAP · KNOWLEDGE LENS';

  var tagline = cover.querySelector('.cover-tagline');
  if (tagline) {
    tagline.innerHTML = '<span>この旅の中心にある問い</span><em>' + escapeHtml(config.coverQuestion) + '</em>';
  }

  var actions = cover.querySelector('.cover-actions');
  if (actions) {
    actions.innerHTML =
      '<a class="cover-action cover-action--primary" href="#' + guideId + '">AI対話のテーマを見る</a>' +
      '<a class="cover-action" href="' + escapeHtml(config.mapHref) + '">学びの地図で現在地を見る</a>';
  }

  var publishedNotes = Array.isArray(data.notes) ? data.notes.filter(function (note) {
    return note.url && note.status === 'published' && typeof note.target === 'string' && note.target.indexOf(config.noteTarget) >= 0;
  }) : [];
  var firstNote = publishedNotes[0];
  var readRoute = firstNote
    ? [firstNote.url, firstNote.title, 'noteで日常から考える ↗', true]
    : config.readFallback;

  var outcomesHtml = config.outcomes.map(function (outcome) {
    return '<li>' + escapeHtml(outcome) + '</li>';
  }).join('');

  var guide = document.createElement('section');
  guide.className = 'part-v2-guide';
  guide.id = guideId;
  guide.setAttribute('aria-labelledby', guideTitleId);
  guide.innerHTML =
    '<div class="part-v2-guide__head">' +
      '<div><p class="part-v2-kicker">YOU ARE HERE · ' + config.partLabel + '</p><h2 id="' + guideTitleId + '">' + config.guideTitle + '</h2></div>' +
      '<p>' + escapeHtml(config.guideDescription) + '</p>' +
    '</div>' +
    '<div class="part-v2-guide__body">' +
      '<div class="part-v2-center"><span>中心の問い</span><strong>' + escapeHtml(config.centerQuestion) + '</strong><p>' + escapeHtml(config.centerCopy) + '</p></div>' +
      '<div class="part-v2-outcomes"><p class="part-v2-label">この旅で見えてくること</p><ul>' + outcomesHtml + '</ul></div>' +
    '</div>' +
    '<div class="part-v2-routes" aria-label="' + config.partLabel + 'をたどる方法">' +
      '<a href="' + escapeHtml(config.themeHref || '#theme-01') + '"><span>AIと対話する</span><strong>' + escapeHtml(config.themeCount) + 'のテーマから選ぶ</strong><small>背景を知り、テーマ専用の対話文をコピーする →</small></a>' +
      '<a href="../library.html?format=listen"><span>Podcastで聴く</span><strong>背景を耳でたどる</strong><small>Podcastへ →</small></a>' +
      '<a href="' + escapeHtml(readRoute[0]) + '"' + linkAttrs(readRoute[3]) + '><span>noteで読む</span><strong>' + escapeHtml(readRoute[1]) + '</strong><small>' + escapeHtml(readRoute[2]) + '</small></a>' +
    '</div>';
  cover.insertAdjacentElement('afterend', guide);

  var nextHtml = config.next.map(function (item) {
    return '<a href="' + escapeHtml(item[0]) + '"><span>' + escapeHtml(item[1]) + '</span><strong>' + escapeHtml(item[2]) + '</strong><small>' + escapeHtml(item[3]) + '</small></a>';
  }).join('');
  var closing = document.createElement('section');
  closing.className = 'part-v2-next';
  closing.setAttribute('aria-labelledby', nextTitleId);
  closing.innerHTML =
    '<div class="part-v2-next__inner"><p class="part-v2-kicker">WHERE NEXT?</p><h2 id="' + nextTitleId + '">この旅のあとに、<br>どの問いを持っていくか。</h2><div class="part-v2-next__grid">' + nextHtml + '</div></div>';
  root.appendChild(closing);

  document.querySelectorAll('.part-v2-header details a').forEach(function (link) {
    link.addEventListener('click', function () {
      var menu = link.closest('details');
      if (menu) menu.removeAttribute('open');
    });
  });
})();
