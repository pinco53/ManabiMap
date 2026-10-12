(() => {
  'use strict';
  const timelines = window.MANABI_PHILOSOPHY_HISTORY;
  const root = document.getElementById('ph-timelines');
  if (!root || !Array.isArray(timelines)) {
    if (root) root.textContent = '年表を読み込めませんでした。ページを再読み込みしてください。';
    return;
  }

  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const thoughtMoves = {
    'socrates-plato': '相手の言葉の定義を確かめ、具体例と反例を往復し、思い込みの穴を一緒に探す。プラトンの対話篇に描かれたソクラテス像と、プラトン自身の議論は混同しない。',
    aristotle: '目的・働き・習慣・状況を区別し、抽象的な善を具体的な実践判断につなぐ。',
    stoicism: '自分の判断と行為で変えられること、変えられないことを分け、後者への反応を吟味する。',
    aquinas: '問いに対する反論を先に最も強い形で出し、理性による区別と再応答を順に行う。',
    descartes: '疑える根拠を一つずつ保留し、何を疑っても残る確かさから考え直す。',
    locke: '知識の由来を経験に問い、政治的権威を同意・権利・信託という観点で検討する。',
    kant: '認識の条件を問う。行為については格率を普遍化できるか、人を単なる手段にしていないかを試す。',
    wollstonecraft: '「生まれつきの能力」とされる差を、教育機会・社会制度が作った差ではないかと問い直す。',
    marx: '個人の意見だけでなく、生産・労働・所有の関係と、そこにある対立や歴史的変化をたどる。',
    beauvoir: '自由な選択と、それを狭める身体的・社会的状況を同時に考え、固定的な性役割を疑う。',
    upanishads: '変わる経験を手がかりに、自己と世界の根底を問い、単一の教義にまとめすぎない。',
    buddha: '苦の具体的な経験から出発し、その条件・執着・変化の可能性を因果関係として見る。',
    confucius: '仁・礼・学びを、親子や政治などの具体的な関係に置き、よい行為を実践から考える。',
    mohism: '身内びいきの帰結を問う。広く人を利するか、害を減らすかで主張を検討する。',
    daoism: '固定した名や対立の枠をずらし、無理に制御しないことで見えてくる可能性を探る。『老子』と『荘子』の違いを残す。',
    nagarjuna: '物事に独立した不変の本質があるという前提を検査し、縁起と空を虚無論にせず考える。',
    shankara: '変わる経験と、それを知る自己を区別し、無知による取り違えを吟味する。',
    'zhu-xi': '物事の理を丁寧に調べる学びと、自己を整える実践を結びつける。',
    dogen: '悟りを遠い成果としてだけ捉えず、今ここでの修行と日々の行為から問い直す。',
    'wang-yangming': '知っているという主張を具体的な行為に照らし、知と行の切り離しを疑う。',
    'ibn-sina': 'あるものが「何であるか」と「存在すること」を分け、必然性・可能性の筋道をたどる。',
    'al-ghazali': '論証の力を認めつつ、その確実性が及ばない範囲を問い、経験と信仰の位置を区別する。',
    maimonides: '聖典の字義と比喩を見分け、神について何を言えないかも吟味する。',
    'ibn-khaldun': '伝聞をそのまま受け取らず、生活条件・集団の結束・権力の変化から歴史記述のもっともらしさを試す。',
    nahua: '生の不安定さを見据え、関係と実践によって「根を持つ」生をどう築くか問う。複数の資料を単一の声にしない。',
    'du-bois': '自分の目と他者から押し付けられた視線を区別し、個人の経験を制度的な人種差別につなぐ。',
    gandhi: '目標だけでなく達成手段も吟味し、真理の探究と非暴力の抵抗を結びつける。',
    'land-ethic': '誰が倫理の共同体に含まれているか問い、土地・水・生物への影響から行為を考える。',
    fanon: '身体感覚と他者の視線を手がかりに、植民地主義の心理的・制度的な力を分析する。',
    liberation: '抑圧される人の現実を出発点に、既存の哲学が見落としてきた権力関係を問い直す。多様な論者の差を残す。',
    intersectionality: '人種・性別などを一つずつ切り離さず、制度が重なる地点で誰の経験が見えなくなるか調べる。',
    ubuntu: '「私」を関係の中で捉え、対立への応答を責任・尊厳・修復という面から考える。地域ごとの差を残す。'
  };
  const entriesById = new Map(timelines.flatMap(timeline => timeline.entries.map(entry => [entry.id, entry])));
  const dialog = document.getElementById('ph-dialog');
  const dialogTitle = document.getElementById('ph-dialog-title');
  const dialogMethod = document.getElementById('ph-dialog-method');
  const dialogQuestion = document.getElementById('ph-dialog-question');
  const dialogAI = document.getElementById('ph-dialog-ai');
  let activeEntry = null;

  const buildPrompt = () => {
    if (!activeEntry) return '';
    const mode = dialog.querySelector('input[name="ph-dialog-mode"]:checked').value;
    const question = dialogQuestion.value.trim();
    return [
      'あなたは哲学史を学ぶ人のための対話相手です。下記の思想家・思想伝統の史料から再構成できる「思考の運び」を、対話を通じて学べるようにしてください。本人の意識・人格がAIに移植されたとは主張せず、実在の本人としての体験談や創作した引用を語らないでください。集団・伝統の場合は、単一の人物の声を装わず、内部の違いも示してください。',
      `対象：${activeEntry.title}（${activeEntry.date}／${activeEntry.region}）`,
      `思想の概要：${activeEntry.essence}`,
      `この思想に固有の思考手順：${thoughtMoves[activeEntry.id]}`,
      `核となる問い：${activeEntry.question}`,
      `参考資料：${activeEntry.source}`,
      '対話の進め方：最初に「これは史料に基づく学習用の再構成で、本人との対話ではありません」と短く断る。その後は第三者として解説し続けず、その考え方の内部に入った対話相手として、対象固有の問い返しや推論を継続して実演する。本人の意識・記憶・発言を装わない。相手の答えを待ちながら一度に一つの問いを投げ、答えを受けて定義・根拠・反例・帰結を掘る。講義や三択だけで終えず、自由な質問や反論を歓迎する。相手が説明を求めればまず平易に説明し、例を一つ示したうえで再び一つの問いに戻る。数往復したら、その思考法で見えたこと、現代への応用、重要な異論・限界を区別してまとめる。短めの日本語で応答する。',
      '史実と解釈・現代への応用を区別する。未確認の発言・著作の引用は作らず、根拠が曖昧ならそう言う。相手の意見を思想家の「正解」へ強制しない。',
      mode === 'question' || question ? `最初に扱う学習者の問い：${question || activeEntry.question}` : '最初は日常的な場面を一つ提示し、この思考手順で考える最初の一問から始める。'
    ].join('\n\n');
  };
  if (dialog && dialogAI && window.ManabiAI) {
    window.ManabiAI.mount(dialogAI, buildPrompt);
    dialog.querySelector('.ph-dialog__close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialogQuestion.addEventListener('input', () => dialogAI.dispatchEvent(new Event('manabimap:prompt-changed')));
    dialog.querySelectorAll('input[name="ph-dialog-mode"]').forEach(input => input.addEventListener('change', () => dialogAI.dispatchEvent(new Event('manabimap:prompt-changed'))));
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-ph-dialog]');
      if (!button) return;
      activeEntry = entriesById.get(button.dataset.phDialog);
      if (!activeEntry) return;
      dialogTitle.textContent = `「${activeEntry.title}」の思考法と対話する`;
      dialogMethod.textContent = `この対話でたどる思考：${thoughtMoves[activeEntry.id]}`;
      dialogQuestion.value = '';
      dialog.querySelector('input[value="experience"]').checked = true;
      dialogAI.dispatchEvent(new Event('manabimap:prompt-changed'));
      dialog.showModal();
    });
  }

  const appendEntry = (list, item, number) => {
    const article = make('article', 'ph-entry');
    article.id = `ph-${item.id}`;

    const time = make('div', 'ph-entry__time', item.date);
    time.setAttribute('aria-label', `年代：${item.date}`);
    const heading = make('div', 'ph-entry__heading');
    heading.append(
      make('span', 'ph-entry__number', String(number).padStart(2, '0')),
      make('span', 'ph-entry__place', item.region),
      make('h3', '', item.title),
      make('p', 'ph-entry__question', item.question)
    );

    const content = make('div', 'ph-entry__content');
    content.append(make('span', 'ph-entry__rubric', 'ESSENCE · 思想の核'), make('p', 'ph-entry__essay', item.essence));
    const source = make('a', 'ph-entry__source', '参考資料を読む ↗');
    source.href = item.source;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    content.append(source);
    const dialogueButton = make('button', 'ph-entry__dialogue', 'この思考法と対話する ↗');
    dialogueButton.type = 'button';
    dialogueButton.dataset.phDialog = item.id;
    content.append(dialogueButton);
    article.append(time, heading, content);
    list.append(article);
  };

  const fragment = document.createDocumentFragment();
  timelines.forEach((timeline, index) => {
    const section = make('section', `ph-timeline ph-timeline--${timeline.id}`);
    section.id = timeline.id;
    section.setAttribute('aria-labelledby', `ph-${timeline.id}-title`);

    const header = make('header', 'ph-timeline__header');
    const marker = make('div', 'ph-timeline__marker');
    marker.append(make('span', '', String(index + 1).padStart(2, '0')), make('span', '', timeline.label));
    const copy = make('div', 'ph-timeline__copy');
    const title = make('h2', '', timeline.title);
    title.id = `ph-${timeline.id}-title`;
    copy.append(title, make('p', 'ph-timeline__lead', timeline.lead), make('p', 'ph-timeline__note', timeline.note));
    header.append(marker, copy);

    const list = make('div', 'ph-timeline__entries');
    timeline.entries.forEach((entry, entryIndex) => appendEntry(list, entry, entryIndex + 1));
    const ending = make('div', 'ph-timeline__ending');
    ending.append(make('span', '', `${timeline.entries.length}の転換点`));
    const top = make('a', '', '3つの年表に戻る ↑');
    top.href = '#ph-index-links';
    ending.append(top);
    section.append(header, list, ending);
    fragment.append(section);
  });

  root.replaceChildren(fragment);
})();
