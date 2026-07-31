(function () {
  'use strict';

  /*
   * Dialogue rhythm:
   * information gap (Loewenstein, 1994), curiosity and memory (Kang et al., 2009),
   * pretesting (Richland et al., 2009), self-explanation (Chi et al., 1989),
   * and retrieval practice (Roediger & Karpicke, 2006).
   */
  var registeredGuides = window.ManabiEpisodeAIGuides || {};
  var targetSelector = '.episode-row, .episode-card, .scientist-card, .theme-card';
  var targets = Array.from(document.querySelectorAll(targetSelector));

  if (!targets.length) return;

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
      '.sc-num'
    ]).match(/(\d+)/);
    return Number((idMatch || classMatch || labelMatch || [null, index + 1])[1]);
  }

  function pageSeries(part) {
    var coverTitle = firstText(document, ['.cover-title']);
    if (coverTitle) return '「学びの地図」　' + coverTitle;
    return '「学びの地図」第' + part + '部';
  }

  function pageSources() {
    return Array.from(document.querySelectorAll('.reference-link')).slice(0, 5).map(function (link) {
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
    var number = episodeNumber(target, index);
    var numberLabel = String(number).padStart(2, '0');
    var title = firstText(target, [
      '.episode-title',
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
      '.theme-lead',
      '.sc-premise',
      '.card-lead'
    ]);
    var summaries = allTexts(target,
      '.episode-summary, .theme-body p, .episode-body > p, .sc-body > p'
    );
    var tags = unique(allTexts(target, '.keyword-tag, .sc-tag, .tag')).slice(0, 4);
    var centralQuestion = question ||
      '「' + title + '」は、私たちの世界の見方をどのように変えるのか。';
    var background = summaries[0] || lead ||
      'このページに示された「' + title + '」の出来事と考え方を出発点にする。';
    var centralIdea = summaries[1] || lead || background;
    var perspective = summaries[2] ||
      '「' + title + '」を一つの答えとして覚えるのではなく、何が変わり、何がまだ説明できないのかを分けて捉える。';
    var connections = tags.length ? tags.map(function (tag) {
      return '「' + tag + '」が、現在の生活や判断にどう現れるか';
    }) : [
      'この話と似た仕組みが、現在の生活のどこに現れるか',
      '自分の経験や判断を、この話の見方で捉え直すと何が変わるか'
    ];

    return {
      id: 'part' + part + '-' + numberLabel,
      series: pageSeries(part),
      episode: '第' + number + '話「' + title + '」',
      centralQuestion: centralQuestion,
      centralIdea: centralIdea,
      background: background,
      perspective: perspective,
      cautions: [
        '本文の説明を単一の原因や絶対的な結論にせず、証拠が示す範囲と、異論・例外・まだ分からない点を分ける。',
        '印象的な逸話や分かりやすい比喩を、そのまま事実の証明として扱わない。'
      ],
      connections: connections,
      sources: pageSources(),
      opening: '最初の応答では結論を説明せず、「' + centralQuestion + '」につながる身近な場面を一つだけ示してください。その場面で何が起きると思うか、短い予想を一つ尋ねるところから始めてください。',
      explanationOpening: '最初の応答では私に質問せず、「' + title + '」を、専門知識がなくても情景と仕組みがつながるように解説してください。まず身近な場面から入り、なぜそれが「' + centralQuestion + '」につながるのかを順序立てて示してください。'
    };
  }

  function lines(items) {
    return (items || []).map(function (item) {
      return '・' + item;
    }).join('\n');
  }

  function sourceLines(items) {
    if (!items || !items.length) {
      return '・このページの本文を出発点とし、追加の事実は信頼できる資料で確かめてください。';
    }
    return items.map(function (item) {
      return '・' + item.label + '\n  ' + item.url;
    }).join('\n');
  }

  var modes = {
    dialogue: {
      label: '対話で問いを広げる',
      shortLabel: '対話モード',
      description: '身近な予想から始め、まだ知らない一点を少しずつ開きます。',
      success: 'お使いのAIに貼り付けると、問いを広げる対話から始まります。'
    },
    explanation: {
      label: 'じっくり解説を聞く',
      shortLabel: '解説モード',
      description: '背景、仕組み、研究、現代との接点を順序立てて聞きます。',
      success: 'お使いのAIに貼り付けると、背景から順にじっくりした解説が始まります。'
    }
  };

  function commonPrompt(guide) {
    return [
      'これから、' + guide.series + 'の',
      guide.episode + 'を一緒に深めてください。',
      '',
      '【この話の中心にある問い】',
      guide.centralQuestion,
      '',
      '【この話で捉えたいこと】',
      guide.centralIdea,
      '',
      '【背景】',
      guide.background,
      '',
      '【この話からの見方】',
      guide.perspective,
      '',
      '【誤解しやすい点】',
      lines(guide.cautions),
      '',
      '【身近な生活との接点】',
      lines(guide.connections),
      '',
      '【この部の参考資料（この話に関係するものだけ参照）】',
      sourceLines(guide.sources),
      '',
      '【説明の共通条件】',
      '・専門知識を前提にせず、難しい言葉はその場で日常的な表現に言い換えてください。',
      '・子ども扱いする表現や、私の理解度を決めつける言い方は避けてください。',
      '・史実や研究で確認されていること、解釈、この話から考えられることを区別してください。',
      '・参考資料を確認できない場合は、確認できたように装わないでください。'
    ];
  }

  function dialoguePrompt(guide) {
    return commonPrompt(guide).concat([
      '',
      '【選択した進め方】',
      '対話で問いを広げるモード',
      '',
      '【好奇心を保つ対話の進め方】',
      '・一度に情報を詰め込まず、一回の応答は一つの発見に絞ってください。',
      '1. 既に知っている身近な経験から始め、まだ説明できていない部分を一つだけ見えるようにしてください。最初から答えや用語を並べないでください。',
      '2. 新しい説明を渡す前に、短い予想を一つ尋ねてください。正誤を採点せず、予想の中にある筋のよい部分と、まだ空いている部分を言葉にしてください。',
      '3. 空いている部分を埋める情報は一度に全部渡さず、「少し意外な事実」「仕組み」「この話の概念」の順に開いてください。',
      '4. 説明した後、ときどき「いまの話を自分の言葉にするとどうなりますか」と尋ねてください。ただし毎回は行わず、試験のような雰囲気にしないでください。',
      '5. 理解が進んだら、同じ考え方が通用しそうな別の身近な例を一つ出し、結果を予想してもらってください。',
      '6. 各応答の終わりには、続きを選べる二つの具体的な入口を短く示してください。例：「仕組みをもう一段掘る」「AIの回答との関係を見る」。漠然と「何を知りたいですか」とは尋ねないでください。',
      '7. 一度の応答で尋ねることは原則一つにしてください。質問を重ねすぎず、私の返答を次の説明の材料にしてください。',
      '8. 私が答えに詰まったときは、正解を急いで渡さず、考えるための小さな手がかりを一つだけ示してください。',
      '9. 驚かせるために事実を誇張しないでください。好奇心は、未解決の一点を正確に見せることで生み出してください。',
      '',
      '【最初の応答】',
      guide.opening
    ]);
  }

  function explanationPrompt(guide) {
    return commonPrompt(guide).concat([
      '',
      '【選択した進め方】',
      'じっくり解説を聞くモード',
      '',
      '【解説の進め方】',
      '1. 最初の応答では私に質問せず、最初から最後まで流れのある解説を届けてください。',
      '2. 「身近な場面」「起きている仕組み」「研究や史実から分かること」「誤解しやすい点」「現在との接点」の順に進めてください。',
      '3. 最初に結論を箇条書きで並べず、一つの疑問が次の説明を呼ぶ読みものとして構成してください。',
      '4. 専門用語を使うときは、先に日常的な例を示し、そのあと名称を紹介してください。',
      '5. 一つの研究や逸話だけで一般化せず、分かっている範囲と、まだ議論がある部分を分けてください。',
      '6. 初回の解説は900〜1400字程度を目安にし、短い見出しを使って読みやすくしてください。',
      '7. 解説の最後に要点を三つだけまとめ、その後で「背景をもう一段掘る」「日常との接点を見る」「AI時代との関係を考える」の三つから次の進み方を選べるようにしてください。',
      '8. 私が次の進み方を選んだ後は、その一つだけを丁寧に深めてください。',
      '',
      '【最初の応答】',
      guide.explanationOpening
    ]);
  }

  function buildPrompt(guide, mode) {
    return (mode === 'explanation' ? explanationPrompt(guide) : dialoguePrompt(guide)).join('\n');
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
    var guide = registeredGuides[guideId] || inferred;
    var content = target.classList.contains('episode-row') ? target.children[1] : target;

    if (!content) return;
    target.dataset.aiGuide = guideId;
    target.classList.add('episode-ai-ready');

    var activeMode = 'dialogue';
    var prompt = buildPrompt(guide, activeMode);
    var panel = document.createElement('section');
    panel.className = 'episode-ai';
    panel.setAttribute('aria-label', guide.episode + 'をAIと深める');

    var heading = document.createElement('div');
    heading.className = 'episode-ai__heading';
    heading.innerHTML =
      '<div><span class="episode-ai__label">CONTINUE WITH AI</span>' +
      '<h4>この話を、AIと深める</h4>' +
      '<p>最初に、AIとの進め方を選んでください。</p></div>';

    var modePicker = document.createElement('div');
    modePicker.className = 'episode-ai__modes';
    modePicker.setAttribute('role', 'group');
    modePicker.setAttribute('aria-label', 'AIとの進め方');

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
    copy.textContent = 'AIへ渡す文章をコピー';

    var status = document.createElement('p');
    status.className = 'episode-ai__status';
    status.setAttribute('aria-live', 'polite');

    var preview = document.createElement('details');
    preview.className = 'episode-ai__preview';
    var summary = document.createElement('summary');
    summary.textContent = 'AIへ渡す内容を見る';
    var pre = document.createElement('pre');
    pre.textContent = prompt;
    preview.append(summary, pre);

    function renderMode(modeId) {
      activeMode = modeId;
      prompt = buildPrompt(guide, activeMode);
      pre.textContent = prompt;
      copy.textContent = modes[activeMode].shortLabel + 'の文章をコピー';
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
        status.textContent = modes[activeMode].success;
        window.setTimeout(function () {
          copy.disabled = false;
          copy.textContent = modes[activeMode].shortLabel + 'をもう一度コピー';
        }, 1800);
      }).catch(function () {
        copy.disabled = false;
        status.textContent = 'コピーできませんでした。「AIへ渡す内容を見る」から文章を選択してください。';
        preview.open = true;
      });
    });

    actions.append(copy, status);
    panel.append(heading, modePicker, actions, preview);
    renderMode(activeMode);
    content.appendChild(panel);
  });
}());
