(function() {
  'use strict';

  const data = window.ManabiMapData;
  if (!data || !data.findById) return;

  function currentPartId() {
    const file = (window.location.pathname.split('/').pop() || '').replace('.html', '');
    if (file === 'part8_2') return 'part8-2';
    return file;
  }

  function hrefForNode(id) {
    if (id === 'evolution') return '../evolution.html';
    if (id === 'note') return '../note.html';
    const item = data.findById(id);
    if (!item) return '../index.html#map-base';
    if (item.type === 'part' && item.pageUrl) return item.pageUrl.replace(/^parts\//, '');
    if (item.url) return item.url;
    return '../index.html#map-base';
  }

  function titleForNode(id) {
    if (id === 'evolution') return '進化の年表';
    if (id === 'note') return 'note記事';
    const item = data.findById(id);
    return item ? item.title : id;
  }

  function createLink(className, href, label, external) {
    const a = document.createElement('a');
    a.className = className;
    a.href = href;
    a.textContent = label;
    if (external) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    return a;
  }

  function buildPanel(part) {
    const panel = document.createElement('section');
    panel.className = 'part-map-bridge';
    panel.setAttribute('aria-label', '学びの地図の現在地');

    const head = document.createElement('div');
    head.className = 'part-map-bridge__head';

    const headText = document.createElement('div');
    headText.innerHTML = [
      '<div class="part-map-bridge__label">YOU ARE HERE / ' + part.group + '</div>',
      '<div class="part-map-bridge__title">' + part.title + '</div>',
      '<div class="part-map-bridge__subtitle">' + part.subtitle + '</div>'
    ].join('');

    const topLink = createLink('part-map-bridge__top-link', '../index.html#map-base', '地図基地へ戻る', false);
    head.appendChild(headText);
    head.appendChild(topLink);

    const body = document.createElement('div');
    body.className = 'part-map-bridge__body';

    const main = document.createElement('div');
    main.className = 'part-map-bridge__main';

    const questionBlock = document.createElement('div');
    questionBlock.className = 'part-map-bridge__block';
    questionBlock.innerHTML = '<div class="part-map-bridge__section-label">この部を貫く問い</div>';
    const questions = document.createElement('div');
    questions.className = 'part-map-bridge__questions';
    part.questions.slice(0, 2).forEach(function(question) {
      const q = document.createElement('div');
      q.className = 'part-map-bridge__question';
      q.textContent = question;
      questions.appendChild(q);
    });
    questionBlock.appendChild(questions);

    const linkBlock = document.createElement('div');
    linkBlock.className = 'part-map-bridge__block';
    linkBlock.innerHTML = '<div class="part-map-bridge__section-label">この場所から進む</div>';
    const links = document.createElement('div');
    links.className = 'part-map-bridge__links';
    const videoUrl = part.youtubeUrl || part.playlistUrl;
    if (videoUrl) links.appendChild(createLink('part-map-bridge__button part-map-bridge__button--video', videoUrl, 'YouTubeで見る', true));
    links.appendChild(createLink('part-map-bridge__button', '../index.html#map-base', 'トップの地図で探す', false));
    links.appendChild(createLink('part-map-bridge__button part-map-bridge__button--note', '../note.html', 'note記事を探す', false));
    linkBlock.appendChild(links);

    main.appendChild(questionBlock);
    main.appendChild(linkBlock);

    const side = document.createElement('div');
    side.className = 'part-map-bridge__side';

    const noteBlock = document.createElement('div');
    noteBlock.className = 'part-map-bridge__block';
    noteBlock.innerHTML = '<div class="part-map-bridge__section-label">関連note</div>';
    const noteList = document.createElement('div');
    noteList.className = 'part-map-bridge__notes';
    const notes = data.notesForPart(part.id).filter(function(note) { return note.url; }).slice(0, 4);
    if (notes.length) {
      notes.forEach(function(note) {
        noteList.appendChild(createLink('part-map-bridge__pill', note.url, '#' + note.number + ' ' + note.title, true));
      });
    } else {
      const empty = document.createElement('div');
      empty.className = 'part-map-bridge__note-empty';
      empty.textContent = 'この部の関連noteは、今後ここに接続していきます。';
      noteList.appendChild(empty);
    }
    noteBlock.appendChild(noteList);

    const nextBlock = document.createElement('div');
    nextBlock.className = 'part-map-bridge__block';
    nextBlock.innerHTML = '<div class="part-map-bridge__section-label">次に進むなら</div>';
    const nextList = document.createElement('div');
    nextList.className = 'part-map-bridge__next';
    part.next.slice(0, 4).forEach(function(id) {
      const href = hrefForNode(id);
      nextList.appendChild(createLink('part-map-bridge__pill', href, titleForNode(id), /^https?:\/\//.test(href)));
    });
    nextBlock.appendChild(nextList);

    side.appendChild(noteBlock);
    side.appendChild(nextBlock);

    body.appendChild(main);
    body.appendChild(side);
    panel.appendChild(head);
    panel.appendChild(body);
    return panel;
  }

  function init() {
    const part = data.findById(currentPartId());
    const cover = document.querySelector('.cover');
    if (!part || !cover || document.querySelector('.part-map-bridge')) return;
    cover.insertAdjacentElement('afterend', buildPanel(part));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
