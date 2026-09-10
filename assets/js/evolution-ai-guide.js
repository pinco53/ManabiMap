(function () {
  'use strict';

  var page = document.querySelector('.evolution-page');
  var hero = document.querySelector('.evolution-page .hero');
  var timeline = document.querySelector('.evolution-page .timeline-container');
  if (!page || !hero || !timeline) return;

  function text(root, selector) {
    var node = root && root.querySelector(selector);
    return node ? node.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function clip(value, max) {
    if (!value || value.length <= max) return value;
    return value.slice(0, max).replace(/[、。]?[^、。]*$/, '') + '。';
  }

  function eraData(era) {
    return {
      title: text(era, '.era-title'),
      range: text(era, '.era-range'),
      summary: text(era, '.era-summary'),
      events: Array.prototype.slice.call(era.querySelectorAll('.event')).map(function (event) {
        return {
          date: text(event, '.event-date'),
          title: text(event, '.event-title').replace(/^[^\p{L}\p{N}]+/u, ''),
          description: text(event, '.event-desc'),
          element: event
        };
      })
    };
  }

  var eras = Array.prototype.slice.call(timeline.querySelectorAll('.era')).map(function (era) {
    var data = eraData(era);
    data.element = era;
    return data;
  });

  function eraMap() {
    return eras.map(function (era) {
      return '・' + era.title + '（' + era.range + '）— ' + clip(era.summary, 90);
    }).join('\n');
  }

  function eventLines(events) {
    return events.map(function (event) {
      return '・' + event.date + '｜' + event.title + '：' + event.description;
    }).join('\n');
  }

  function scopeContext(scope, eraIndex, eventIndex) {
    if (scope === 'overview') {
      return {
        label: '138億年を俯瞰する',
        heading: '年表全体から、人類史の見取り図をつくる',
        material: [
          '【選んだ範囲】',
          '宇宙誕生から未来までの「進化の年表」全体',
          '',
          '【年表にある時代区分】',
          eraMap()
        ].join('\n'),
        opening: '最初の応答では、138億年を細かな出来事の羅列にせず、6〜10個ほどの大きな変化に分けて見取り図を示してください。そのうえで「複雑化」「エネルギー」「情報」「協力」など、人類史を一本につなぐ見方を一つだけ紹介してください。'
      };
    }

    var era = eras[eraIndex];
    if (scope === 'era') {
      return {
        label: era.title,
        heading: '「' + era.title + '」の流れと背景を知る',
        material: [
          '【選んだ時代】',
          era.title + '（' + era.range + '）',
          era.summary,
          '',
          '【この時代に掲載されている転換点】',
          eventLines(era.events)
        ].join('\n'),
        opening: '最初の応答では、この時代に入る直前の世界、この時代を動かした中心的な変化、その後の時代へ残したものを順に説明してください。掲載された出来事をすべて列挙せず、理解の軸になるつながりを一つ選んでください。'
      };
    }

    var event = era.events[eventIndex];
    var nearby = era.events.slice(Math.max(0, eventIndex - 2), Math.min(era.events.length, eventIndex + 3));
    return {
      label: event.date + '｜' + event.title,
      heading: '「' + event.title + '」を人類史の中に置く',
      material: [
        '【選んだ転換点】',
        event.date + '｜' + event.title,
        event.description,
        '',
        '【この転換点が置かれている時代】',
        era.title + '（' + era.range + '）',
        era.summary,
        '',
        '【年表上の前後にある出来事】',
        eventLines(nearby)
      ].join('\n'),
      opening: '最初の応答では、この出来事が起きる前の状況、何がどう変わったのか、後の時代へ何を残したのかを順に説明してください。年表上の前後の出来事とのつながりを少なくとも一つ示してください。'
    };
  }

  function buildPrompt(context, userQuestion) {
    var question = (userQuestion || '').trim();
    var firstResponse = question ? [
      '私が最初に聞きたいこと：',
      question,
      '',
      'この質問にいきなり結論だけを返さず、答えを理解するために必要な前提を短く示してから説明してください。質問に複数の見方がある場合は、主な見方を分けてください。'
    ].join('\n') : context.opening;

    return [
      'あなたは、Manabi Map「進化の年表」を案内する人類史の知的探究チューターです。',
      '',
      '【対話の目的】',
      'この対話は、すぐに結論や意見を求めるためのものではありません。まず世界の見取り図と考えるための前提知識を得て、出来事どうしのつながりを発見し、そこから私自身の問いを少しずつ膨らませることが目的です。',
      '',
      context.material,
      '',
      '【最初の応答】',
      firstResponse,
      '専門知識を前提にせず、日常語を使って5〜8段落程度で伝えてください。最初から私の意見や体験を尋ねないでください。',
      '最後に、次にたどれる方向を2〜3個だけ短く示してください。ただし選択を迫らず、それ以外の質問、感想、疑問、「続けて」「まだわからない」のような短い返事でも自由に対話を続けられることを一言添えてください。',
      '',
      '【知識の渡し方】',
      '・出来事を単独で暗記させず、その前提、変化の仕組み、短期的な影響、長期的な影響をつなげる。',
      '・一度の応答で扱う中心概念は原則一つにし、人物、史実、具体例、比較、反例のうち理解に役立つものを一つ添える。',
      '・技術だけで説明せず、環境、制度、経済、思想、身体、情報、権力など必要な要因を組み合わせる。',
      '・歴史を現在へ向かう必然的な進歩として語らない。地域差、失われた可能性、恩恵を受けなかった人々にも必要に応じて触れる。',
      '・年表本文を出発点にしつつ、単純化や誤りの可能性も考慮する。確認された事実、一般的な解釈、議論が分かれる点、未来についての推測を区別する。',
      '・年代や固有名詞を追加するときは確度を優先し、不確かな内容を断定しない。',
      '',
      '【問いの育て方】',
      '質問だけを返す尋問のような対話にしないでください。まず知識や具体例を渡し、私の返事を受けて一段だけ深い背景や別の見方を加えてください。',
      '前提知識が揃うまでは、広い「どう思いますか」を尋ねないでください。数回のやり取りで材料が揃ったときだけ、その材料を使って考えられる具体的な問いを一つ置いてください。質問で終わる応答を原則として二回連続させないでください。',
      '私が「なぜ？」「もっと前から」「別の地域では？」「今とどうつながる？」「反対の見方は？」「まだわからない」と短く返した場合も、その方向に合わせて対話を続けてください。',
      '提示する選択肢は会話の例にすぎません。私が選択肢にない質問や話題を出したら、現在のテーマとのつながりを見つけ、自由な対話として受け止めてください。',
      '',
      question ? '以上を踏まえ、私の質問に必要な前提知識から対話を始めてください。' : '以上を踏まえ、まずは理解の足場になる知識から対話を始めてください。'
    ].join('\n');
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = value;
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

  var dialog = document.createElement('dialog');
  dialog.className = 'timeline-ai-dialog';
  dialog.innerHTML = [
    '<div class="timeline-ai-dialog__shell">',
    '  <button class="timeline-ai-dialog__close" type="button" aria-label="閉じる">×</button>',
    '  <span class="timeline-ai-dialog__eyebrow">LEARN WITH AI</span>',
    '  <p class="timeline-ai-dialog__scope" data-ai-dialog-scope></p>',
    '  <h2 data-ai-dialog-title></h2>',
    '  <p class="timeline-ai-dialog__lead">質問がなくても大丈夫。説明を聞くところからでも、今ある疑問からでも始められます。</p>',
    '  <div class="timeline-ai-dialog__steps" aria-label="対話の流れ">',
    '    <span><b>1</b> 背景を知る</span><i aria-hidden="true">→</i>',
    '    <span><b>2</b> 流れをつなぐ</span><i aria-hidden="true">→</i>',
    '    <span><b>3</b> 問いを育てる</span>',
    '  </div>',
    '  <section class="timeline-ai-dialog__start" aria-labelledby="timeline-ai-start-title">',
    '    <h3 id="timeline-ai-start-title">どう始めますか？</h3>',
    '    <div class="timeline-ai-dialog__modes" role="group" aria-label="対話の始め方">',
    '      <button type="button" data-ai-mode="explain" aria-pressed="true"><strong>まず説明を聞く</strong><span>何を聞けばよいかわからなくても、全体像から案内します。</span></button>',
    '      <button type="button" data-ai-mode="question" aria-pressed="false"><strong>聞きたいことから始める</strong><span>自由な質問を加えて、自分の関心から入ります。</span></button>',
    '    </div>',
    '    <div class="timeline-ai-dialog__question" data-ai-question-panel hidden>',
    '      <label for="timeline-ai-question">AIに聞いてみたいこと</label>',
    '      <textarea id="timeline-ai-question" maxlength="500" data-ai-question placeholder="例：なぜ、この出来事が転換点になったの？"></textarea>',
    '      <p>問いの種から選んで、自由に書き換えることもできます。</p>',
    '      <div class="timeline-ai-dialog__seeds" aria-label="問いの例">',
    '        <button type="button" data-ai-seed="なぜ、これが大きな転換点になったの？">なぜ転換点に？</button>',
    '        <button type="button" data-ai-seed="この出来事は、前後の時代とどうつながっているの？">前後とのつながり</button>',
    '        <button type="button" data-ai-seed="この変化は、現代の暮らしに何を残しているの？">現代に残るもの</button>',
    '        <button type="button" data-ai-seed="この出来事には、一般的な説明とは異なる見方もあるの？">別の見方</button>',
    '      </div>',
    '    </div>',
    '  </section>',
    '  <div class="timeline-ai-dialog__actions">',
    '    <button class="timeline-ai-dialog__copy" type="button" data-ai-dialog-copy>説明用の対話文をコピー</button>',
    '    <p data-ai-dialog-status aria-live="polite">コピーして、普段使っているAIへ貼り付けてください。</p>',
    '  </div>',
    '</div>'
  ].join('');
  document.body.appendChild(dialog);

  var scopeNode = dialog.querySelector('[data-ai-dialog-scope]');
  var titleNode = dialog.querySelector('[data-ai-dialog-title]');
  var copyButton = dialog.querySelector('[data-ai-dialog-copy]');
  var statusNode = dialog.querySelector('[data-ai-dialog-status]');
  var closeButton = dialog.querySelector('.timeline-ai-dialog__close');
  var modeButtons = Array.prototype.slice.call(dialog.querySelectorAll('[data-ai-mode]'));
  var questionPanel = dialog.querySelector('[data-ai-question-panel]');
  var questionInput = dialog.querySelector('[data-ai-question]');
  var seedButtons = Array.prototype.slice.call(dialog.querySelectorAll('[data-ai-seed]'));
  var currentPrompt = '';
  var currentContext = null;
  var currentMode = 'explain';
  var previousFocus = null;

  function renderMode(mode) {
    currentMode = mode;
    var asking = mode === 'question';
    questionPanel.hidden = !asking;
    modeButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.aiMode === mode));
    });
    copyButton.textContent = asking ? '質問入りの対話文をコピー' : '説明用の対話文をコピー';
    copyButton.disabled = asking && !questionInput.value.trim();
    statusNode.textContent = asking
      ? '自由に質問を書くか、下の「問いの種」を選んでください。'
      : '質問がなくても大丈夫。AIが背景の説明から始めます。';
    if (asking) questionInput.focus();
  }

  function openGuide(scope, eraIndex, eventIndex) {
    currentContext = scopeContext(scope, eraIndex, eventIndex);
    currentPrompt = buildPrompt(currentContext, '');
    scopeNode.textContent = currentContext.label;
    titleNode.textContent = currentContext.heading;
    questionInput.value = '';
    renderMode('explain');
    previousFocus = document.activeElement;
    dialog.showModal();
    closeButton.focus();
  }

  function closeGuide() {
    dialog.close();
    if (previousFocus) previousFocus.focus();
  }

  closeButton.addEventListener('click', closeGuide);
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) closeGuide();
  });

  modeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      renderMode(button.dataset.aiMode);
    });
  });

  questionInput.addEventListener('input', function () {
    if (currentMode === 'question') {
      copyButton.disabled = !questionInput.value.trim();
    }
  });

  seedButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      questionInput.value = button.dataset.aiSeed;
      copyButton.disabled = false;
      questionInput.focus();
      questionInput.setSelectionRange(questionInput.value.length, questionInput.value.length);
    });
  });

  copyButton.addEventListener('click', function () {
    currentPrompt = buildPrompt(currentContext, currentMode === 'question' ? questionInput.value : '');
    copyButton.disabled = true;
    copyText(currentPrompt).then(function () {
      copyButton.textContent = 'コピーしました';
      statusNode.textContent = 'コピーしました。普段使っているAIへ貼り付けると対話が始まります。';
      window.setTimeout(function () {
        renderMode(currentMode);
      }, 1800);
    }).catch(function () {
      copyButton.disabled = currentMode === 'question' && !questionInput.value.trim();
      statusNode.textContent = 'コピーできませんでした。ブラウザのコピー許可を確認して、もう一度お試しください。';
    });
  });

  var heroGuide = document.createElement('div');
  heroGuide.className = 'timeline-ai-hero';
  heroGuide.innerHTML = [
    '<button type="button" class="timeline-ai-primary">',
    '  <span>LEARN WITH AI</span>',
    '  <strong>138億年をAIと俯瞰する</strong>',
    '</button>',
    '<p>専用の対話文をコピーして、普段使っているAIへ。</p>'
  ].join('');
  var heroDivider = hero.querySelector('.hero-divider');
  hero.insertBefore(heroGuide, heroDivider || hero.querySelector('.hero-scroll'));
  heroGuide.querySelector('button').addEventListener('click', function () {
    openGuide('overview');
  });

  var imageCards = [];
  var imageIndex = 0;

  eras.forEach(function (era, eraIndex) {
    var header = era.element.querySelector('.era-header');
    if (header) {
      var eraButton = document.createElement('button');
      eraButton.type = 'button';
      eraButton.className = 'timeline-ai-era-button';
      eraButton.innerHTML = '<span aria-hidden="true">✦</span> この時代の背景をAIとたどる';
      eraButton.addEventListener('click', function () {
        openGuide('era', eraIndex);
      });
      header.appendChild(eraButton);
    }

    era.events.forEach(function (event, eventIndex) {
      var card = event.element.querySelector('.event-card');
      if (!card) return;
      imageIndex += 1;
      card.classList.add('event-card--image');
      card.dataset.eventImage = 'assets/images/evolution/event-' + String(imageIndex).padStart(3, '0') + '.webp';
      imageCards.push(card);
      var eventButton = document.createElement('button');
      eventButton.type = 'button';
      eventButton.className = 'timeline-ai-event-button';
      eventButton.innerHTML = '<span aria-hidden="true">✦</span> AIで背景を知る';
      eventButton.setAttribute('aria-label', event.title + 'の背景をAIとたどる');
      eventButton.addEventListener('click', function () {
        openGuide('event', eraIndex, eventIndex);
      });
      card.appendChild(eventButton);
    });
  });

  function loadCardImage(card) {
    if (!card.dataset.eventImage) return;
    var imageUrl = new URL(card.dataset.eventImage, document.baseURI).href;
    card.style.setProperty('--event-image', 'url("' + imageUrl + '")');
    delete card.dataset.eventImage;
  }

  imageCards.forEach(loadCardImage);
}());
