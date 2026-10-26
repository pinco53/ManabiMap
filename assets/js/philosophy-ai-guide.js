(function () {
  'use strict';

  var episodes = document.querySelectorAll('#episodes article.ep');
  if (!episodes.length) return;

  var modes = {
    current: {
      label: '身近な場面から始める',
      description: '短い場面を手がかりに、この話の問いを考えます。',
      opening: '最初は、この話の問いにつながる身近な場面を一つ示し、何が不思議なのかを平易に説明してください。'
    },
    gift: {
      label: '意外な事実から始める',
      description: 'この話に出てくる知識を一つ受け取って始めます。',
      opening: '最初は、下の「学ぶこと」に書かれた内容から一つを選び、短い知識の贈り物として紹介してください。'
    }
  };

  function textOf(root, selector) {
    var node = root.querySelector(selector);
    return node ? node.textContent.trim() : '';
  }

  function promptFor(episode, mode) {
    var number = textOf(episode, '.ep-num').replace(/#Ph1-\d+/, '').trim();
    var question = textOf(episode, '.ep-q');
    var points = Array.from(episode.querySelectorAll('.learn li'), function (item) {
      return '・' + item.textContent.trim();
    });

    return [
      'あなたはManabiMapの知的探究チューターです。私と次の哲学の話題を対話してください。',
      '',
      '【ページに書かれている内容】',
      'シリーズ：哲学シリーズ第1部「言葉の網と、網の外の顔」',
      '章：' + (episode.classList.contains('ch1') ? 'ソシュール' : 'レヴィナス'),
      '話：' + number + '「' + textOf(episode, 'h3') + '」',
      question,
      '概要：' + textOf(episode, '.ep-body > p'),
      '学ぶこと：',
      points.join('\n'),
      '',
      '【対話の進め方】',
      '正解を急いで渡したり、質問を続けて私に答えさせたりしないでください。まず一つの概念や例を2〜5文で伝え、私の反応に合わせて同じ論点を少しずつ深めてください。専門用語は日常の言葉で説明してください。',
      '毎回質問で終わる必要はありません。質問する場合は一度に一つにし、「続けて」「まだわからない」のような短い返事も受け止めてください。',
      '史実、思想家自身の主張、後世の解釈、あなたの推測を区別してください。ページにない史実・著作の引用・出典を作らず、確認できないことは確認できないと伝えてください。ページ内のハルとおじいさんの台詞を思想家本人の発言として扱わないでください。',
      '私の理解が進んだら、具体例、反例、別の立場との比較に進んでください。ソシュールとレヴィナスのつながりも、今回の論点に関係するときにだけ示してください。',
      '',
      '【最初の応答】',
      modes[mode].opening,
      '最初から私に意見を求めず、理解の足場になる短い内容から始めてください。'
    ].join('\n');
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value).catch(copyFallback);
    }
    return copyFallback();

    function copyFallback() {
      var field = document.createElement('textarea');
      field.value = value;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        if (!document.execCommand('copy')) throw new Error('copy command failed');
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      } finally {
        field.remove();
      }
    }
  }

  episodes.forEach(function (episode) {
    var body = episode.querySelector('.ep-body');
    if (!body || body.querySelector('.episode-ai')) return;

    var panel = document.createElement('section');
    panel.className = 'episode-ai';
    panel.setAttribute('aria-label', textOf(episode, 'h3') + 'をAIと深める');

    var heading = document.createElement('div');
    heading.className = 'episode-ai__heading';
    heading.innerHTML = '<div><span class="episode-ai__label">CONTINUE WITH AI</span><h4>このテーマから、AIとの対話を始める</h4><p>始め方を選んで対話文をコピーし、普段使っているAIへ貼り付けてください。</p></div>';

    var picker = document.createElement('div');
    picker.className = 'episode-ai__modes';
    picker.setAttribute('role', 'group');
    picker.setAttribute('aria-label', '対話の始め方');

    var selected = 'current';
    var buttons = Object.keys(modes).map(function (id) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'episode-ai__mode';
      button.dataset.aiMode = id;
      button.setAttribute('aria-pressed', String(id === selected));
      button.innerHTML = '<strong>' + modes[id].label + '</strong><span>' + modes[id].description + '</span>';
      picker.appendChild(button);
      return button;
    });

    var actions = document.createElement('div');
    actions.className = 'episode-ai__actions';
    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'episode-ai__copy';
    copy.textContent = '対話文をコピー';
    var status = document.createElement('p');
    status.className = 'episode-ai__status';
    status.setAttribute('aria-live', 'polite');
    actions.append(copy, status);

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        selected = button.dataset.aiMode;
        buttons.forEach(function (item) {
          item.setAttribute('aria-pressed', String(item === button));
        });
        status.textContent = '';
      });
    });

    copy.addEventListener('click', function () {
      copy.disabled = true;
      copyText(promptFor(episode, selected)).then(function () {
        status.textContent = 'コピーしました。普段使っているAIを開いて貼り付けてください。';
      }).catch(function () {
        status.textContent = 'コピーできませんでした。ブラウザのコピー許可を確認して、もう一度お試しください。';
      }).finally(function () {
        copy.disabled = false;
      });
    });

    panel.append(heading, picker, actions);
    body.appendChild(panel);
  });
}());
