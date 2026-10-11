(function () {
  'use strict';

  // Approximate dates mark an intellectual turning point, not the birth of an entire tradition.
  // Each entry sits beside an existing event so the Japanese and English timelines stay aligned.
  const points = [
    {
      id: 'upanishads', beforeJa: '枢軸時代のはじまり', beforeEn: 'The Axial Age as a Historical Lens',
      dateJa: '紀元前7世紀頃から', dateEn: 'From c. 7th century BCE',
      titleJa: 'ウパニシャッドと自己への問い', titleEn: 'The Upanishads and the Question of Self',
      bodyJa: '古代インドのウパニシャッドは、祭式だけでなく、自己と世界の根源を問う思索を深めた。単一の著者や成立年をもつ本ではなく、長く重なった対話の集積である。',
      bodyEn: 'In ancient India, the Upanishads deepened inquiry into the self and the ground of reality beyond ritual alone. They are layered texts, not a single book by one author at one date.',
      questionJa: '自分を知ることは、世界を知ることにつながる？', questionEn: 'Can understanding the self change how we understand the world?',
      themes: 'philosophy worldview information', source: 'https://plato.stanford.edu/entries/analysis/s2.html'
    },
    {
      id: 'confucius', beforeJa: '仏教の成立と伝播', beforeEn: 'The Formation and Spread of Buddhism',
      dateJa: '紀元前5世紀頃', dateEn: 'c. 5th century BCE',
      titleJa: '孔子と、関係の中で生きる倫理', titleEn: 'Confucius and Relational Ethics',
      bodyJa: '孔子に結びつく教えは、徳や礼を、家族・政治・学びの関係の中で考えた。後世の『論語』は多様な解釈を生み、東アジアの教育や統治を長く形づくった。',
      bodyEn: 'Teachings associated with Confucius asked how virtue and ritual shape family, learning, and government. Later interpretations of the Analects profoundly influenced East Asian education and political life.',
      questionJa: 'よい社会は、制度から始まる？ それとも人間関係から？', questionEn: 'Does a good society begin with institutions or with relationships?',
      themes: 'philosophy worldview cooperation power', source: 'https://plato.stanford.edu/entries/confucius/'
    },
    {
      id: 'mozi', beforeJa: 'ゼロという数と演算へ', beforeEn: 'Zero as a Number and an Operation',
      dateJa: '紀元前5世紀頃', dateEn: 'c. 5th century BCE',
      titleJa: '墨子と「兼愛」', titleEn: 'Mozi and Impartial Care',
      bodyJa: '墨家は、身近な関係だけに閉じない配慮と、侵略戦争への反対を論じた。儀礼や慣習が正しいかも問い、何が人々の利益になるかを公共の判断基準にしようとした。',
      bodyEn: 'The Mohists argued for concern beyond one’s immediate circle and opposed aggressive warfare. They questioned whether custom alone makes an action right and sought public standards based on human welfare.',
      questionJa: '身近な人への愛情と、見知らぬ人への公平さは両立する？', questionEn: 'Can loyalty to those close to us coexist with impartial concern for strangers?',
      themes: 'philosophy cooperation power worldview', source: 'https://plato.stanford.edu/entries/mohism/'
    },
    {
      id: 'socrates', beforeJa: 'ゼロという数と演算へ', beforeEn: 'Zero as a Number and an Operation',
      dateJa: '紀元前399年〜4世紀', dateEn: '399–4th century BCE',
      titleJa: 'ソクラテスの問いとプラトンの対話', titleEn: 'Socrates’ Questions and Plato’s Dialogues',
      bodyJa: 'ソクラテスは著作を残さず、裁判と問答の姿はプラトンらの記述で伝わる。プラトンの対話篇は、知識や正義を問い直す方法を後世へ開いた。作品中のソクラテスを史実の本人と単純に同一視はできない。',
      bodyEn: 'Socrates left no writings; accounts of his questioning and trial come through Plato and others. Plato’s dialogues carried inquiries into knowledge and justice forward, though their Socrates cannot simply be equated with the historical man.',
      questionJa: '正義や知識は、対話によってどこまで確かめられる？', questionEn: 'How far can dialogue take us in testing claims about justice and knowledge?',
      themes: 'philosophy information power', source: 'https://plato.stanford.edu/entries/ancient-political/'
    },
    {
      id: 'aristotle', beforeJa: '秦の中国統一', beforeEn: 'Qin Unifies China',
      dateJa: '紀元前4世紀頃', dateEn: 'c. 4th century BCE',
      titleJa: 'アリストテレスと体系的な探究', titleEn: 'Aristotle and Systematic Inquiry',
      bodyJa: 'アリストテレスは論理・自然・倫理・政治を分けて調べ、論証の方法を体系化した。その枠組みは、後の地中海世界からイスラム圏、ヨーロッパの学問まで長く影響した。',
      bodyEn: 'Aristotle organized inquiry into logic, nature, ethics, and politics, and developed systematic ways to assess arguments. His frameworks shaped later learning across the Mediterranean, Islamic, and European worlds.',
      questionJa: 'よく考えるためには、何をどう分けて調べるべき？', questionEn: 'How does organizing knowledge change what we can discover?',
      themes: 'philosophy information worldview cooperation', source: 'https://plato.stanford.edu/entries/aristotle/'
    },
    {
      id: 'daoism', beforeJa: '秦の中国統一', beforeEn: 'Qin Unifies China',
      dateJa: '紀元前4〜3世紀頃', dateEn: 'c. 4th–3rd centuries BCE',
      titleJa: '老荘思想と「道」', titleEn: 'Daoist Thought and the Way',
      bodyJa: '『老子』『荘子』として伝わる重層的なテキストは、決まりきった価値判断や過剰な統治を問い、自然の流れと人の生き方を考えた。一人の創始者が一度に完成させた思想ではない。',
      bodyEn: 'The layered texts transmitted as the Daodejing and Zhuangzi questioned fixed judgments and excessive rule while exploring how to live with the patterns of the world. No single founder completed this tradition at one moment.',
      questionJa: '人をよく導くには、どこまで介入すべき？', questionEn: 'When does guiding people become too much interference?',
      themes: 'philosophy worldview power environment', source: 'https://plato.stanford.edu/entries/zhuangzi/'
    },
    {
      id: 'nagarjuna', beforeJa: 'キリスト教公認', beforeEn: 'Christianity Gains Legal Recognition',
      dateJa: '2〜3世紀頃', dateEn: 'c. 2nd–3rd centuries CE',
      titleJa: 'ナーガールジュナと「空」', titleEn: 'Nāgārjuna and Emptiness',
      bodyJa: 'インドの仏教思想家ナーガールジュナは、ものごとは独立した固定的な本質だけで成り立つのではない、と論じた。縁起と「空」をめぐる議論はアジア各地へ広がった。',
      bodyEn: 'The Buddhist philosopher Nāgārjuna argued against treating things as having fixed, independent essences. His account of dependent arising and emptiness shaped philosophical debate across Asia.',
      questionJa: '何かの意味は、それ自体にある？ 関係の中にある？', questionEn: 'Is meaning inherent in a thing, or does it arise through relationships?',
      themes: 'philosophy worldview information', source: 'https://plato.stanford.edu/entries/nagarjuna/'
    },
    {
      id: 'arabic-philosophy', beforeJa: '火薬の発明', beforeEn: 'The Invention of Gunpowder',
      dateJa: '9世紀頃', dateEn: 'c. 9th century CE',
      titleJa: 'アラビア語哲学の展開', titleEn: 'Philosophy in Arabic Takes Shape',
      bodyJa: 'ギリシャ語などからの翻訳と、アル＝キンディーらの独自の議論を通じて、論理・形而上学・信仰と理性の関係が再検討された。思想は受け継がれるだけでなく、翻訳の中で作り直される。',
      bodyEn: 'Translation from Greek and other languages, alongside original work by thinkers such as al-Kindī, opened new debates in logic, metaphysics, and the relation between reason and faith.',
      questionJa: '知識は別の言語に移ると、何が変わる？', questionEn: 'What changes when an idea moves into another language?',
      themes: 'philosophy information worldview mobility', source: 'https://plato.stanford.edu/entries/arabic-islamic-greek/'
    },
    {
      id: 'al-ghazali', beforeJa: 'マグナ・カルタ', beforeEn: 'Magna Carta',
      dateJa: '11世紀末頃', dateEn: 'Late 11th century CE',
      titleJa: 'アル＝ガザーリーと理性・信仰', titleEn: 'Al-Ghazālī on Reason and Faith',
      bodyJa: 'アル＝ガザーリーは哲学者の主張を厳しく検討しながら、論理や論証の力も取り入れた。信仰と理性を単純な対立にせず、何をどの方法で確かめられるかを問い直した。',
      bodyEn: 'Al-Ghazālī critically examined philosophers’ claims while also using logic and demonstration. Rather than simply setting faith against reason, he asked what different methods of knowing could establish.',
      questionJa: '理性と信仰は、対立するしかない？', questionEn: 'Must reason and faith always be opposed?',
      themes: 'philosophy worldview information', source: 'https://plato.stanford.edu/entries/al-ghazali/'
    },
    {
      id: 'zhu-xi', beforeJa: 'マグナ・カルタ', beforeEn: 'Magna Carta',
      dateJa: '12世紀後半', dateEn: 'Late 12th century CE',
      titleJa: '朱熹と朱子学', titleEn: 'Zhu Xi and Neo-Confucian Inquiry',
      bodyJa: '朱熹は古典を再解釈し、学ぶこと・自己を修めること・世界の理を探ることを結びつけた。四書を軸とする教育は、後の中国・朝鮮・日本に広く影響した。',
      bodyEn: 'Zhu Xi reinterpreted classical texts and linked study, self-cultivation, and inquiry into the patterns of the world. His Four Books curriculum later spread widely in East Asia.',
      questionJa: '学ぶことは知識を増やすこと？ 生き方を変えること？', questionEn: 'Is learning an accumulation of knowledge or a transformation of how we live?',
      themes: 'philosophy information cooperation worldview', source: 'https://plato.stanford.edu/entries/zhu-xi/'
    },
    {
      id: 'aquinas', beforeJa: '黒死病パンデミック', beforeEn: 'The Black Death Pandemic',
      dateJa: '13世紀後半', dateEn: 'Late 13th century CE',
      titleJa: 'トマス・アクィナスと自然法', titleEn: 'Thomas Aquinas and Natural Law',
      bodyJa: 'アクィナスは、信仰と哲学を結び直し、人間の理性で善や法について考える自然法を体系化した。その議論は後の倫理・法・政治思想の重要な参照点になった。',
      bodyEn: 'Aquinas brought theology and philosophy into systematic conversation and developed an account of natural law through human reason. His arguments became an important reference point for later ethics, law, and political thought.',
      questionJa: '人がつくった法律は、どんなとき「正しい」と言える？', questionEn: 'When does a human law deserve to be called just?',
      themes: 'philosophy power worldview cooperation', source: 'https://plato.stanford.edu/entries/aquinas/'
    },
    {
      id: 'locke', beforeJa: 'リンネの分類学', beforeEn: 'Linnaeus and Biological Classification',
      dateJa: '1689年', dateEn: '1689 CE',
      titleJa: 'ロックと統治への同意', titleEn: 'Locke and Government by Consent',
      bodyJa: 'ロックの『統治二論』は、人は生まれながらに自由であり、政府の正当性は人々の同意と権利の保護にあると論じた。近代の立憲政治と権利論を動かす一方、誰がその「人々」に含まれるかは問い続けられた。',
      bodyEn: 'Locke’s Two Treatises argued that political authority rests on consent and the protection of rights, not an inherited divine right to rule. The argument shaped constitutional politics while leaving contested who counted among “the people.”',
      questionJa: '政府が正当だと言えるのは、どんなとき？', questionEn: 'When is a government’s authority legitimate?',
      themes: 'philosophy power cooperation worldview', source: 'https://plato.stanford.edu/entries/locke-political/'
    },
    {
      id: 'rousseau', beforeJa: 'アメリカ独立宣言', beforeEn: 'The American Declaration of Independence',
      dateJa: '1762年', dateEn: '1762 CE',
      titleJa: 'ルソー『社会契約論』と人民主権', titleEn: 'Rousseau, the Social Contract, and Popular Sovereignty',
      bodyJa: 'ルソーは、政治の正当性を支配者の家柄ではなく、人々が自ら定める共通の法に求めた。「一般意志」の解釈には異論もあるが、自由と共同の意思決定を結ぶ問いを残した。',
      bodyEn: 'Rousseau located political legitimacy not in inherited rank but in laws a people author together. His “general will” remains contested, yet it sharpened questions about freedom and collective self-rule.',
      questionJa: '多数で決めることと、一人ひとりの自由はどう両立する？', questionEn: 'How can collective decisions coexist with individual freedom?',
      themes: 'philosophy power cooperation worldview', source: 'https://plato.stanford.edu/entries/rousseau/'
    },
    {
      id: 'kant', beforeJa: 'フランス革命', beforeEn: 'The French Revolution',
      dateJa: '1781年', dateEn: '1781 CE',
      titleJa: 'カント『純粋理性批判』', titleEn: 'Kant’s Critique of Pure Reason',
      bodyJa: 'カントは「私たちは何を知りうるか」を問い、経験を受け取る人間の認識の条件を検討した。知識の限界を調べること自体が、近代哲学の大きな仕事になった。',
      bodyEn: 'Kant asked what we can know and examined the conditions under which human experience becomes knowledge. Investigating the limits of reason became a central task of modern philosophy.',
      questionJa: '私たちは世界を「そのまま」見ている？', questionEn: 'Do we ever see the world simply “as it is”?',
      themes: 'philosophy worldview information', source: 'https://plato.stanford.edu/entries/kant-transcendental-idealism/'
    },
    {
      id: 'utilitarianism', beforeJa: '種痘とワクチン', beforeEn: 'Vaccination against Smallpox',
      dateJa: '1789年以後', dateEn: 'From 1789 CE',
      titleJa: '功利主義と公共の幸福', titleEn: 'Utilitarianism and Public Welfare',
      bodyJa: 'ベンサムからミルらへ続く功利主義は、行為や法律を人々の幸福への結果から評価しようとした。刑罰・福祉・自由の議論を動かした一方、少数者の権利をどう守るかも問い続けられた。',
      bodyEn: 'From Bentham to Mill and others, utilitarianism evaluated actions and laws by their consequences for human welfare. It informed debates on punishment, reform, and liberty while raising questions about protecting minorities.',
      questionJa: '全体の幸福を増やすためなら、何をしてもよい？', questionEn: 'Are all means justified if they increase overall welfare?',
      themes: 'philosophy power cooperation body', source: 'https://plato.stanford.edu/entries/utilitarianism-history/'
    },
    {
      id: 'wollstonecraft', beforeJa: '種痘とワクチン', beforeEn: 'Vaccination against Smallpox',
      dateJa: '1792年', dateEn: '1792 CE',
      titleJa: 'ウルストンクラフトと女性の権利', titleEn: 'Wollstonecraft and Women’s Rights',
      bodyJa: '『女性の権利の擁護』は、女性の能力を過小評価する社会と教育を批判した。「人間の権利」が誰に開かれているのかを、啓蒙思想そのものへ問い返した。',
      bodyEn: 'A Vindication of the Rights of Woman challenged the education and social arrangements that constrained women. It asked whom Enlightenment claims about human rights actually included.',
      questionJa: '「万人」の権利から、誰が取り残されている？', questionEn: 'Who is left out when a society speaks of “universal” rights?',
      themes: 'philosophy power cooperation information', source: 'https://plato.stanford.edu/entries/wollstonecraft/'
    },
    {
      id: 'marx', beforeJa: '上下水道と公衆衛生', beforeEn: 'Water, Sewers, and Public Health',
      dateJa: '1848年', dateEn: '1848 CE',
      titleJa: 'マルクスとエンゲルスの社会批判', titleEn: 'Marx, Engels, and the Critique of Capitalism',
      bodyJa: '『共産党宣言』は、産業化を階級・労働・所有の関係から捉え直した。思想は社会を説明するだけでなく、変える実践に結びつきうることを示した。',
      bodyEn: 'The Communist Manifesto examined industrial society through class, labour, and ownership. It insisted that ideas about society could become part of collective action to change it.',
      questionJa: '経済の仕組みは、誰の自由を広げ、誰の自由を狭める？', questionEn: 'Whose freedom does an economic system expand, and whose does it limit?',
      themes: 'philosophy power cooperation energy', source: 'https://plato.stanford.edu/entries/marx/'
    },
    {
      id: 'du-bois', beforeJa: 'アインシュタインの特殊相対性理論', beforeEn: "Einstein's Special Theory of Relativity",
      dateJa: '1903年', dateEn: '1903 CE',
      titleJa: 'デュボイスと「二重意識」', titleEn: 'Du Bois and Double Consciousness',
      bodyJa: 'デュボイスは、黒人が自分自身を、差別する社会のまなざしを通しても見る「二重意識」を描いた。平等を法律上の地位だけでなく、生きられる経験から問う視点を開いた。',
      bodyEn: 'Du Bois described “double consciousness”: seeing oneself partly through the eyes of a society shaped by racism. His account asked us to examine equality through lived experience, not legal standing alone.',
      questionJa: '他者の偏見は、自分の見方をどう変えてしまう？', questionEn: 'How can others’ prejudice change the way we see ourselves?',
      themes: 'philosophy power body worldview', source: 'https://plato.stanford.edu/entries/double-consciousness/'
    },
    {
      id: 'satyagraha', beforeJa: 'ハーバー・ボッシュ法', beforeEn: 'The Haber–Bosch Process',
      dateJa: '1906年頃から', dateEn: 'From c. 1906 CE',
      titleJa: 'ガンディーと非暴力抵抗', titleEn: 'Gandhi and Nonviolent Resistance',
      bodyJa: 'ガンディーは南アフリカで始めた抵抗の実践を、後にインドの独立運動へ広げた。真理に基づく非協力を、差別や植民地支配に対抗する集団的な力として育てた。',
      bodyEn: 'Gandhi developed forms of resistance in South Africa and later expanded them in India’s independence struggle. Satyagraha made principled non-cooperation a collective response to discrimination and colonial rule.',
      questionJa: '暴力を使わずに、権力を変えることはできる？', questionEn: 'How can collective action challenge power without violence?',
      themes: 'philosophy power cooperation worldview', source: 'https://plato.stanford.edu/entries/colonialism/'
    },
    {
      id: 'dewey', beforeJa: 'ロシア革命', beforeEn: 'The Russian Revolution',
      dateJa: '1916年', dateEn: '1916 CE',
      titleJa: 'デューイ『民主主義と教育』', titleEn: 'Dewey’s Democracy and Education',
      bodyJa: 'デューイは学びを知識の受け渡しにとどめず、経験を通じて社会に参加する営みと捉えた。教育と民主主義を、日常の対話や問題解決で結びつけた。',
      bodyEn: 'Dewey treated learning as participation in shared experience, not just the transfer of facts. He linked education and democracy through everyday inquiry and problem-solving.',
      questionJa: '学ぶ力は、民主主義をどう支える？', questionEn: 'How does the ability to learn together sustain democracy?',
      themes: 'philosophy information cooperation power', source: 'https://plato.stanford.edu/entries/dewey/'
    },
    {
      id: 'beauvoir', beforeJa: 'チューリング・テスト', beforeEn: 'The Turing Test',
      dateJa: '1949年', dateEn: '1949 CE',
      titleJa: 'ボーヴォワール『第二の性』', titleEn: 'Beauvoir’s The Second Sex',
      bodyJa: 'ボーヴォワールは、女性として生きる経験を歴史・身体・社会の中から分析した。「自然なもの」と見なされてきた性別役割を、哲学の問いとして開いた。',
      bodyEn: 'Beauvoir examined the lived experience of women through history, embodiment, and social structures. She made supposedly “natural” gender roles a subject of philosophical scrutiny.',
      questionJa: '当たり前に見える役割は、どう作られている？', questionEn: 'How are roles that seem natural actually made?',
      themes: 'philosophy body power worldview', source: 'https://plato.stanford.edu/entries/beauvoir/'
    },
    {
      id: 'land-ethic', beforeJa: 'チューリング・テスト', beforeEn: 'The Turing Test',
      dateJa: '1949年以後', dateEn: 'From 1949 CE',
      titleJa: '土地倫理と環境思想', titleEn: 'The Land Ethic and Environmental Thought',
      bodyJa: 'レオポルドの「土地倫理」は、土壌・水・動植物を単なる資源でなく、倫理的な共同体の一部として考えた。のちの環境倫理は、人間以外の存在にどこまで配慮すべきかを問い続けた。',
      bodyEn: 'Leopold’s land ethic treated soil, water, plants, and animals as more than resources: as part of a moral community. Later environmental ethics asked how far moral concern should extend beyond humans.',
      questionJa: '人間以外の自然にも、守るべき価値はある？', questionEn: 'Do nonhuman parts of nature have value we ought to protect?',
      themes: 'philosophy environment cooperation worldview', source: 'https://plato.stanford.edu/entries/ethics-environmental/'
    },
    {
      id: 'fanon', beforeJa: '地球の出', beforeEn: 'Earthrise',
      dateJa: '1961年', dateEn: '1961 CE',
      titleJa: 'ファノンと脱植民地化の思想', titleEn: 'Fanon and Decolonial Thought',
      bodyJa: '『地に呪われたる者』は、植民地支配が政治だけでなく、心理・文化・人間の尊厳にも及ぼす影響を論じた。独立後の社会をどう築くかも問うた。',
      bodyEn: 'The Wretched of the Earth explored colonialism’s effects on politics, culture, psychology, and dignity. It also asked what kind of society could follow independence.',
      questionJa: '支配が終わった後、自由はどう育つ？', questionEn: 'What does freedom require after formal domination ends?',
      themes: 'philosophy power cooperation worldview', source: 'https://plato.stanford.edu/entries/frantz-fanon/'
    },
    {
      id: 'intersectionality', beforeJa: 'ベルリンの壁崩壊', beforeEn: 'The Fall of the Berlin Wall',
      dateJa: '1989年', dateEn: '1989 CE',
      titleJa: '交差性と差別の見え方', titleEn: 'Intersectionality and Overlapping Inequality',
      bodyJa: 'クレンショーは、黒人女性が受ける差別が「人種」か「性別」の一方だけでは捉えられないと示した。別々の分類で見落としてきた経験を、法と社会運動に問い返した。',
      bodyEn: 'Crenshaw showed how discrimination against Black women could be missed when law considered race and gender only one at a time. Intersectionality challenged both legal analysis and social movements to notice overlapping harms.',
      questionJa: '一つの分類だけで、人の不利や苦しさを理解できる？', questionEn: 'What becomes invisible when we examine only one form of inequality at a time?',
      themes: 'philosophy power cooperation body', source: 'https://chicagounbound.uchicago.edu/uclf/vol1989/iss1/8/',
      sourceLabelJa: '原論文で確かめる ↗', sourceLabelEn: 'Read the original article ↗'
    }
  ];

  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const timeline = document.querySelector('.timeline-container');
  if (!timeline) return;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }

  points.forEach(function (point) {
    const anchor = Array.from(timeline.querySelectorAll(english ? '.en-event' : '.event')).find(function (node) {
      return english ? node.dataset.title === point.beforeEn : (node.querySelector('.event-title') || {}).textContent?.includes(point.beforeJa);
    });
    if (!anchor) return;
    const title = escapeHtml(english ? point.titleEn : point.titleJa);
    const date = escapeHtml(english ? point.dateEn : point.dateJa);
    const body = escapeHtml(english ? point.bodyEn : point.bodyJa);
    const question = escapeHtml(english ? point.questionEn : point.questionJa);
    const source = escapeHtml(point.source);
    const sourceLabelJa = escapeHtml(point.sourceLabelJa || '哲学事典で確かめる ↗');
    const sourceLabelEn = escapeHtml(point.sourceLabelEn || 'Stanford Encyclopedia of Philosophy ↗');
    const id = 'event-philosophy-' + point.id;
    const image = (english ? '../' : '') + 'assets/images/evolution/philosophy/philosophy-' + point.id + '.webp';
    const common = ' id="' + id + '" data-event-independent-image="true" data-event-illustration="' + image + '" data-event-core="true" data-event-themes="' + point.themes + '"';
    if (english) {
      const tags = point.themes.split(' ').map(function (theme) {
        return '<span>' + ({ philosophy: 'Philosophy', worldview: 'Worldview', information: 'Information', cooperation: 'Cooperation', power: 'Power', mobility: 'Mobility', energy: 'Energy', environment: 'Environment', body: 'Body', tools: 'Tools' }[theme] || theme) + '</span>';
      }).join('');
      anchor.insertAdjacentHTML('beforebegin', '<article class="en-event philosophy-event"' + common + ' data-date="' + date + '" data-title="' + title + '"><img src="' + image + '" alt="" loading="lazy"><div class="en-event__body"><time>' + date + '</time><h3>' + title + '</h3><p>' + body + ' <strong>Question:</strong> ' + question + '</p><div class="en-lenses">' + tags + '</div><a class="en-source" href="' + source + '" target="_blank" rel="noopener noreferrer">' + sourceLabelEn + '</a><button type="button" class="en-ai-button">Explore with AI</button></div></article>');
    } else {
      anchor.insertAdjacentHTML('beforebegin', '<div class="event event-left philosophy-event"' + common + '><div class="event-card" data-event-image="' + image + '"><div class="event-date">' + date + '</div><h3 class="event-title"><span class="icon">◇</span>' + title + '</h3><p class="event-desc">' + body + ' <strong>問い：</strong>' + question + '</p><div class="event-link-row"><a class="event-link" href="' + source + '" target="_blank" rel="noopener noreferrer">' + sourceLabelJa + '</a></div></div><div class="event-node"><div class="event-connector"></div><div class="event-dot major"></div></div></div>');
    }
  });

  // Give already-present philosophical turning points the same filter without duplicating their cards.
  const existing = new Set(english
    ? ['The Axial Age as a Historical Lens', 'The Formation and Spread of Buddhism', 'Athenian Democracy', 'Descartes and Methodic Doubt', 'The Universal Declaration of Human Rights', 'The Turing Test']
    : ['枢軸時代のはじまり', '仏教の成立と伝播', 'アテネの民主政', 'デカルト『方法序説』', '世界人権宣言', 'チューリング・テスト']);
  timeline.querySelectorAll(english ? '.en-event' : '.event').forEach(function (node) {
    const title = english ? node.dataset.title : (node.querySelector('.event-title') || {}).textContent?.trim().replace(/^[^\p{L}\p{N}]+/u, '');
    if (!existing.has(title)) return;
    node.dataset.eventPhilosophy = 'true';
    if (english) {
      const tags = node.querySelector('.en-lenses');
      if (tags && !Array.from(tags.children).some(function (tag) { return tag.textContent === 'Philosophy'; })) tags.insertAdjacentHTML('beforeend', '<span>Philosophy</span>');
    }
  });
})();
