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

  function trackLink(link, eventName, contentId, destinationType, destinationId) {
    link.dataset.trackEvent = eventName;
    link.dataset.trackSource = currentPartId();
    link.dataset.trackContentId = contentId;
    link.dataset.trackDestinationType = destinationType;
    link.dataset.trackDestinationId = destinationId;
    return link;
  }

  function publicNotesForPart(partId) {
    return data.notesForPart(partId).filter(function(note) {
      return note && note.url && note.status !== 'local-draft';
    });
  }

  function podcastsForPart(partId) {
    return data.mediaForPart(partId, 'podcast').filter(function(item) {
      return item && item.url;
    });
  }

  function firstPodcastForPart(partId) {
    return podcastsForPart(partId)[0] || null;
  }

  function youtubeIdFromUrl(url) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'youtu.be') return parsed.pathname.replace('/', '');
      if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
      const match = parsed.pathname.match(/\/embed\/([^/?]+)/);
      return match ? match[1] : '';
    } catch (error) {
      return '';
    }
  }

  function buildLane(kind, label, title, text, action) {
    const lane = document.createElement('div');
    lane.className = 'part-map-bridge__lane part-map-bridge__lane--' + kind + (action ? '' : ' part-map-bridge__lane--empty');
    lane.innerHTML = [
      '<div class="part-map-bridge__lane-label">' + label + '</div>',
      '<div class="part-map-bridge__lane-title">' + title + '</div>',
      '<div class="part-map-bridge__lane-text">' + text + '</div>'
    ].join('');
    if (action) {
      lane.appendChild(action);
    }
    return lane;
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

    const topLink = createLink('part-map-bridge__top-link', '../index.html#map-base', 'Manabi Mapへ戻る', false);
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

    const videoUrl = part.youtubeUrl || part.playlistUrl;
    const partPodcasts = podcastsForPart(part.id);
    const podcastCount = partPodcasts.length;
    const podcast = partPodcasts[0] || null;
    const publicNotes = publicNotesForPart(part.id);
    const firstNote = publicNotes[0] || null;

    const routeSummary = document.createElement('div');
    routeSummary.className = 'part-map-bridge__route-summary';
    routeSummary.innerHTML = [
      '<div class="part-map-bridge__section-label">最短ルート</div>',
      '<div class="part-map-bridge__route-steps">',
      '<span>1. 動画で輪郭</span>',
      '<span>2. ' + (firstNote ? 'noteで問いを補強' : '地図で周辺確認') + '</span>',
      '<span>3. ' + (podcast ? 'Podcastで深掘り' : '次の部へ進む') + '</span>',
      '</div>'
    ].join('');

    const laneBlock = document.createElement('div');
    laneBlock.className = 'part-map-bridge__block';
    laneBlock.innerHTML = '<div class="part-map-bridge__section-label">この場所から進む</div>';
    const lanes = document.createElement('div');
    lanes.className = 'part-map-bridge__lanes';

    const videoAction = videoUrl
      ? trackLink(
          createLink('part-map-bridge__lane-action', videoUrl, part.youtubeUrl ? '動画で見る' : '再生リストで見る', true),
          'part_to_youtube_click',
          part.id,
          part.youtubeUrl ? 'youtube_video' : 'playlist',
          part.youtubeUrl ? 'youtube-' + part.id : 'playlist-' + part.id
        )
      : null;

    const podcastAction = podcast
      ? trackLink(
          createLink('part-map-bridge__lane-action', podcast.url, 'Podcastで聴く', true),
          'part_to_podcast_click',
          part.id,
          'podcast',
          podcast.id
        )
      : null;

    const noteAction = firstNote
      ? trackLink(
          createLink('part-map-bridge__lane-action', firstNote.url, 'noteを読む', true),
          'part_to_note_click',
          part.id,
          'note_article',
          firstNote.id
        )
      : trackLink(
          createLink('part-map-bridge__lane-action', '../note.html', '読みものを探す', false),
          'part_to_note_click',
          part.id,
          'note_hub',
          'note'
        );

    lanes.appendChild(buildLane(
      'watch',
      'WATCH',
      'まず見る',
      part.youtubeUrl ? '初めてなら、まず物語の動画で問いの輪郭をつかむ。' : 'シリーズで流れを追いながら、全体像をつかむ。',
      videoAction
    ));
    lanes.appendChild(buildLane(
      'listen',
      'LISTEN',
      '深く聴く',
      podcast
        ? '背景や歴史を、移動中にも耳で深くたどる。' + (podcastCount > 1 ? '（この部は全' + podcastCount + '本）' : '')
        : 'この部のPodcastは、今後ここに接続していきます。',
      podcastAction
    ));
    lanes.appendChild(buildLane(
      'read',
      'READ',
      '問いを読む',
      firstNote ? '文章で少し遠くまで進み、問いを別角度から眺める。' : '関連するnote記事を探して、枝道へ進む。',
      noteAction
    ));
    laneBlock.appendChild(lanes);

    main.appendChild(questionBlock);
    main.appendChild(routeSummary);
    main.appendChild(laneBlock);

    const side = document.createElement('div');
    side.className = 'part-map-bridge__side';

    const noteBlock = document.createElement('div');
    noteBlock.className = 'part-map-bridge__block';
    noteBlock.innerHTML = '<div class="part-map-bridge__section-label">関連note</div>';
    const noteList = document.createElement('div');
    noteList.className = 'part-map-bridge__notes';
    const notes = publicNotesForPart(part.id).slice(0, 4);
    if (notes.length) {
      notes.forEach(function(note) {
        noteList.appendChild(trackLink(
          createLink('part-map-bridge__pill', note.url, '#' + note.number + ' ' + note.title, true),
          'part_to_note_click',
          part.id,
          'note_article',
          note.id
        ));
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

  /* tokens.css の部カラーのミラー。
     色を変更するときは tokens.css と両方を同期すること。 */
  const NAV_ACCENTS = {
    'part1': '#c98f69',
    'part2': '#cfbb6e',
    'part3': '#a7c973',
    'part4': '#73c984',
    'part5': '#73c9b8',
    'part6': '#73afc9',
    'part7': '#7384c9',
    'part8': '#8d73c9',
    'part8-2': '#a473c9',
    'part9': '#bb73c9',
    'part17': '#496f9b',
    'part18': '#746a9f',
    'part19': '#8a667f',
    'part20': '#a47c55'
  };

  function injectNavStyles() {
    if (document.getElementById('manabi-nav-style')) return;
    const style = document.createElement('style');
    style.id = 'manabi-nav-style';
    style.textContent = [
      '.manabi-nav { position: sticky; top: 0; z-index: 100; display: flex; gap: 8px; align-items: center; padding: 0 24px; overflow-x: auto; background: rgba(8,8,13,0.92); border-bottom: 1px solid #2a2a40; backdrop-filter: blur(12px); scrollbar-width: none; font-family: "Hiragino Sans", "Noto Sans JP", sans-serif; }',
      '.manabi-nav::-webkit-scrollbar { display: none; }',
      '.manabi-nav a { flex-shrink: 0; padding: 14px 16px; color: #a3a3bf; border-bottom: 2px solid transparent; font-size: 12px; font-weight: 800; letter-spacing: 0.1em; white-space: nowrap; text-decoration: none; transition: color 0.25s, border-color 0.25s; }',
      '.manabi-nav a:hover { color: #ffffff; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function navPartNumber(part) {
    return parseInt(String(part.number).split('-')[0], 10);
  }

  function initNav(part) {
    if (document.querySelector('.manabi-nav')) return;
    injectNavStyles();
    const currentNum = part ? navPartNumber(part) : null;
    const accent = part && NAV_ACCENTS[part.color] ? NAV_ACCENTS[part.color] : '#00d4ff';

    const nav = document.createElement('nav');
    nav.className = 'manabi-nav';
    nav.setAttribute('aria-label', '学びの地図ナビゲーション');

    const links = [{ href: '../index.html', label: '学びの地図' }];
    const seenNums = {};
    data.parts.forEach(function(item) {
      const num = navPartNumber(item);
      if (seenNums[num] || !item.pageUrl) return;
      seenNums[num] = true;
      links.push({ href: item.pageUrl.replace(/^parts\//, ''), label: '第' + num + '部', num: num });
    });
    links.push({ href: '../note.html', label: '読みもの' });
    links.push({ href: '../podcast.html', label: 'Podcast' });
    links.push({ href: '../infographics.html', label: '図解' });

    links.forEach(function(link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      if (link.num && currentNum && link.num === currentNum) {
        a.className = 'active';
        a.style.color = accent;
        a.style.borderBottomColor = accent;
        a.setAttribute('aria-current', 'page');
      }
      nav.appendChild(a);
    });

    document.body.insertAdjacentElement('afterbegin', nav);
  }

  function injectPodcastRailStyles() {
    if (document.getElementById('part-podcast-rail-style')) return;
    const style = document.createElement('style');
    style.id = 'part-podcast-rail-style';
    style.textContent = [
      '.part-podcast-rail { max-width: 880px; margin: 0 auto; padding: 48px 40px; background: #09090f; border-top: 3px solid #ffb86b; font-family: "Hiragino Sans", "Noto Sans JP", sans-serif; }',
      '.part-podcast-rail__header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 12px; }',
      '.part-podcast-rail__title { display: flex; align-items: center; gap: 10px; color: #fff; font-size: 18px; font-weight: 900; letter-spacing: 0.08em; }',
      '.part-podcast-rail__title::before { content: ""; display: inline-block; width: 4px; height: 20px; background: #ffb86b; border-radius: 2px; }',
      '.part-podcast-rail__count { color: #9090aa; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; }',
      '.part-podcast-rail__hub-btn { display: inline-flex; align-items: center; padding: 10px 22px; background: #ffb86b; color: #000; font-size: 13px; font-weight: 700; border-radius: 6px; text-decoration: none; letter-spacing: 0.05em; transition: opacity 0.2s; }',
      '.part-podcast-rail__hub-btn:hover { opacity: 0.85; }',
      '.part-podcast-rail__lead { margin: 0 0 24px; color: #9090aa; font-size: 12.5px; line-height: 1.9; }',
      '.part-podcast-rail__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }',
      '.part-podcast-rail__card { display: block; overflow: hidden; background: #13131f; border: 1px solid #2a2a40; border-radius: 8px; text-decoration: none; transition: all 0.3s; }',
      '.part-podcast-rail__card:hover { border-color: #ffb86b; transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.4); }',
      '.part-podcast-rail__thumb { position: relative; aspect-ratio: 16/9; overflow: hidden; background: #000; }',
      '.part-podcast-rail__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }',
      '.part-podcast-rail__card:hover .part-podcast-rail__thumb img { transform: scale(1.06); }',
      '.part-podcast-rail__badge { position: absolute; left: 8px; top: 8px; padding: 3px 8px; border: 1px solid rgba(255,184,107,0.5); border-radius: 999px; background: rgba(8,8,13,0.72); color: #ffd8a8; font-size: 10px; font-weight: 900; letter-spacing: 0.14em; }',
      '.part-podcast-rail__label { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; padding: 10px 12px; color: #ccc; font-size: 12px; font-weight: 700; line-height: 1.5; }',
      '@media (max-width: 600px) { .part-podcast-rail { padding: 32px 20px; } .part-podcast-rail__grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function buildPodcastRail(part, podcasts) {
    const rail = document.createElement('div');
    rail.className = 'part-podcast-rail';
    rail.setAttribute('aria-label', 'この部のPodcast');

    const header = document.createElement('div');
    header.className = 'part-podcast-rail__header';

    const title = document.createElement('div');
    title.className = 'part-podcast-rail__title';
    title.textContent = '耳で聴く ── この部のPodcast';
    const count = document.createElement('span');
    count.className = 'part-podcast-rail__count';
    count.textContent = '全' + podcasts.length + '本';
    title.appendChild(count);

    const hubLink = trackLink(
      createLink('part-podcast-rail__hub-btn', '../podcast.html', '聴くコンテンツを見る', false),
      'part_to_podcast_click',
      part.id,
      'podcast_hub',
      'podcast'
    );

    header.appendChild(title);
    header.appendChild(hubLink);

    const lead = document.createElement('p');
    lead.className = 'part-podcast-rail__lead';
    lead.textContent = '動画で見た流れを、歴史背景ごと音声で深掘りするPodcast版。移動中や家事中の「ながら学習」に使えます。';

    const grid = document.createElement('div');
    grid.className = 'part-podcast-rail__grid';

    podcasts.forEach(function(item, index) {
      const card = trackLink(
        createLink('part-podcast-rail__card', item.url, '', true),
        'part_to_podcast_click',
        part.id,
        'podcast',
        item.id
      );

      const thumb = document.createElement('div');
      thumb.className = 'part-podcast-rail__thumb';
      const videoId = youtubeIdFromUrl(item.url);
      if (videoId) {
        const img = document.createElement('img');
        img.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
        img.alt = item.title;
        img.loading = 'lazy';
        thumb.appendChild(img);
      }
      const badge = document.createElement('span');
      badge.className = 'part-podcast-rail__badge';
      badge.textContent = 'PODCAST ' + (index + 1) + '/' + podcasts.length;
      thumb.appendChild(badge);

      const label = document.createElement('div');
      label.className = 'part-podcast-rail__label';
      label.textContent = item.title;

      card.appendChild(thumb);
      card.appendChild(label);
      grid.appendChild(card);
    });

    rail.appendChild(header);
    rail.appendChild(lead);
    rail.appendChild(grid);
    return rail;
  }

  function initPodcastRail(part) {
    if (document.querySelector('.part-podcast-rail')) return;
    const podcasts = podcastsForPart(part.id);
    if (!podcasts.length) return;
    injectPodcastRailStyles();
    const rail = buildPodcastRail(part, podcasts);
    const ytSection = document.querySelector('.yt-section');
    const bridge = document.querySelector('.part-map-bridge');
    if (ytSection) {
      ytSection.insertAdjacentElement('afterend', rail);
    } else if (bridge) {
      bridge.insertAdjacentElement('afterend', rail);
    }
  }

  function initShootingStars() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.querySelector('.shooting-star-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'shooting-star-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const stars = [];
    let nextSpawn = 90;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnStar() {
      const fromLeft = Math.random() > 0.18;
      const speed = 9 + Math.random() * 5;
      stars.push({
        x: fromLeft ? -80 : canvas.width + 80,
        y: Math.random() * canvas.height * 0.48 + 20,
        vx: (fromLeft ? 1 : -1) * speed,
        vy: speed * (0.22 + Math.random() * 0.18),
        life: 0,
        maxLife: 54 + Math.random() * 18,
        len: 120 + Math.random() * 80,
        hue: Math.random() > 0.5 ? '0,212,255' : '255,215,0'
      });
      nextSpawn = 180 + Math.random() * 260;
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nextSpawn--;
      if (nextSpawn <= 0) spawnStar();

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const alpha = Math.sin((s.life / s.maxLife) * Math.PI);
        const backX = s.x - s.vx / Math.abs(s.vx) * s.len;
        const backY = s.y - s.vy / Math.abs(s.vx) * s.len;
        const grad = ctx.createLinearGradient(backX, backY, s.x, s.y);
        grad.addColorStop(0, 'rgba(' + s.hue + ',0)');
        grad.addColorStop(0.72, 'rgba(' + s.hue + ',' + (0.24 * alpha) + ')');
        grad.addColorStop(1, 'rgba(255,255,255,' + (0.88 * alpha) + ')');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(backX, backY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,' + (0.9 * alpha) + ')';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (s.life > s.maxLife || s.x < -220 || s.x > canvas.width + 220 || s.y > canvas.height + 120) {
          stars.splice(i, 1);
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  function init() {
    const part = data.findById(currentPartId());
    if (!part) return;
    initNav(part);
    const cover = document.querySelector('.cover');
    if (cover && !document.querySelector('.part-map-bridge')) {
      cover.insertAdjacentElement('afterend', buildPanel(part));
      initShootingStars();
    }
    initPodcastRail(part);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
