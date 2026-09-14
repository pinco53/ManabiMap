(function () {
  'use strict';

  const MAX_AGE = 13_800_000_000;
  const PRESENT = 2026;
  const PICTURE_ZOOM = 2.7;
  const DETAIL_ZOOM = 2.35;
  const MAX_ZOOM = 48;
  const section = document.getElementById('top');
  const surface = document.getElementById('deepTimeSurface');
  const pointLayer = document.getElementById('deepTimePoints');
  const axis = document.getElementById('deepTimeAxis');
  const canvas = document.getElementById('deepTimeCanvas');
  if (!section || !surface || !pointLayer || !axis || !canvas) return;

  function ageFromDate(date) {
    if (date.indexOf('約3分後') >= 0) return MAX_AGE - 0.000006;
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

  function themesFor(text) {
    const result = [];
    if (/文字|言葉|紙|印刷|通信|情報|計算|大学|百科|ネット|Web|コンピュー|AI|知識|記録|理論|法則|分類|教育|メディア|スマートフォン|SNS/i.test(text)) result.push('information');
    if (/宇宙|星|生命|光合成|火|鉄|蒸気|電気|電球|原子|核|エネルギー|石油|飛行|ロケット|気候|動力/i.test(text)) result.push('energy');
    if (/人類|農業|定住|都市|文明|法典|宗教|帝国|民主|革命|戦争|社会|協力|共同|国家|パンデミック|つなが|制度|市場|家畜/i.test(text)) result.push('cooperation');
    return result;
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
  const sourceEvents = Array.from(document.querySelectorAll('.timeline-container .event:not([data-curated-event])')).map(function (node, index) {
    const date = (node.querySelector('.event-date') || {}).textContent || '';
    const titleNode = node.querySelector('.event-title');
    const iconNode = titleNode && titleNode.querySelector('.icon');
    const title = titleNode ? titleNode.textContent.replace(iconNode ? iconNode.textContent : '', '').trim() : '';
    const description = ((node.querySelector('.event-desc') || {}).textContent || '').trim();
    const era = node.closest('.era');
    const future = era && era.id === 'era-future';
    const futureIndex = future ? futureEvents.length : -1;
    const event = {
      node: node,
      index: index,
      id: 'deep-event-' + (index + 1),
      date: date.trim(),
      title: title,
      description: description,
      eraId: era ? era.id : '',
      eraTitle: era && era.querySelector('.era-title') ? era.querySelector('.era-title').textContent.trim() : '',
      future: future,
      position: future ? .91 + futureIndex * .018 : logPosition(ageFromDate(date)),
      image: 'assets/images/evolution/event-' + String(index + 1).padStart(3, '0') + '.webp',
      themes: themesFor(title + ' ' + description),
      links: Array.from(node.querySelectorAll('.event-link')).map(function (link) { return { href: link.getAttribute('href'), label: link.textContent.trim() }; }),
      y: .40 + seeded(index + 1) * .28,
      core: CORE_SOURCE_INDICES.has(index + 1),
      curated: false,
      icon: iconNode ? iconNode.textContent.trim() : ''
    };
    if (future) futureEvents.push(event);
    return event;
  });

  const curatedEvents = CURATED_ADDITIONS.map(function (event, index) {
    return {
      ...event,
      node: null,
      index: sourceEvents.length + index,
      detailId: 'event-curated-' + event.id,
      id: 'deep-curated-' + event.id,
      future: false,
      position: logPosition(ageFromDate(event.date)),
      image: 'assets/images/evolution/curated/curated-' + event.id + '.webp',
      y: .40 + seeded(401 + index) * .28,
      core: true,
      curated: true
    };
  });
  const events = sourceEvents.concat(curatedEvents);

  const lensQuestions = {
    core: '宇宙史をつかむ主要60点。近づくと、詳細65点が星のように現れます。',
    all: '主要・詳細・現在地・未来の問いを、すべて表示します。',
    information: '知識は、どう人の外へ広がった？',
    energy: '使える力が変わると、暮らしはどう変わる？',
    cooperation: '人は、どんな仕組みで共に生きてきた？'
  };
  let lens = 'core';
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
    if (position > .891) return '未来';
    const p = Math.min(.88, Math.max(0, position));
    const age = Math.max(0, Math.pow(1 + MAX_AGE, 1 - p / .88) - 1);
    if (age < 1) return 'いま';
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
    button.setAttribute('aria-label', event.date + ' ' + event.title + 'へ近づく');
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

  const markerData = [
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
  const touchDevice = window.matchMedia('(pointer: coarse)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let needsRender = true;

  function ageAt(position) {
    return Math.max(0, Math.pow(1 + MAX_AGE, 1 - Math.min(.88, Math.max(0, position)) / .88) - 1);
  }
  function durationLabel(years) {
    const unit = years >= 1e8 ? 1e8 : years >= 1e4 ? 1e4 : 1;
    if (years < 1) return Math.max(1, Math.round(years * 365)) + '日';
    return Number((years / unit).toPrecision(2)).toLocaleString('ja-JP') + (unit === 1e8 ? '億年' : unit === 1e4 ? '万年' : '年');
  }

  function isRelated(event) {
    if (lens === 'all') return true;
    if (lens === 'core') return event.core || event.future;
    return event.themes.indexOf(lens) >= 0;
  }

  function isUnlocked(event) {
    if (lens === 'all') return true;
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
      const shown = x > .025 && x < .975 && isUnlocked(event) && (lens === 'core' || lens === 'all' || isRelated(event));
      button.hidden = !shown;
      if (!shown) return;
      button.style.left = (x * 100).toFixed(3) + '%';
      const y = compact ? (.42 + (event.y - .4) * .38) * surface.clientHeight : shortPhone ? 240 + (event.y - .4) / .28 * Math.max(30, axis.offsetTop - 260) : event.y * surface.clientHeight;
      button.style.top = y.toFixed(2) + 'px';
      button.classList.toggle('is-muted', lens === 'core' && !event.core && !event.future);
      button.classList.toggle('is-detail', !event.core && !event.future);
      button.classList.toggle('is-future', event.future);
      button.setAttribute('aria-label', event.date + ' ' + event.title + (view.zoom < PICTURE_ZOOM ? 'へ近づく' : 'の背景を読む'));
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
      ageText.textContent = '138';
      ageText.classList.remove('is-age');
      unitText.textContent = '億年';
      rangeText.textContent = '宇宙のはじまりから、人類の問いへ。';
    } else {
      ageText.textContent = ageLabel(view.center);
      ageText.classList.add('is-age');
      unitText.textContent = '';
      rangeText.textContent = ageLabel(leftEdge) + ' — ' + ageLabel(rightEdge);
    }
    zoomLabel.textContent = view.zoom.toFixed(1) + '×';
    zoomOut.disabled = target.zoom <= 1.001;
    zoomIn.disabled = target.zoom >= MAX_ZOOM - .001;
    instruction.textContent = touchDevice.matches ? '上下で近づく・離れる ／ 左右で時代を移動 ／ 2本指で拡大' : 'スクロールで近づく ／ ドラッグで時代を移動 ／ 粒を選ぶ';
    scrubber.value = String(Math.round(view.center * 1000));
    output.value = ageLabel(leftEdge) + ' — ' + ageLabel(rightEdge);
    scrubber.setAttribute('aria-valuetext', ageLabel(view.center) + '付近、' + output.value);
    overviewWindow.style.left = (100 * leftEdge) + '%';
    overviewWindow.style.width = (100 * (rightEdge - leftEdge)) + '%';
    const span = ageAt(leftEdge) - ageAt(rightEdge);
    const portion = span / MAX_AGE * 100;
    portionText.textContent = leftEdge >= .88 ? '未来は年代に比例しない別枠です' : '見えている歴史の幅：宇宙史の約' + Number(portion.toPrecision(2)).toLocaleString('ja-JP', { maximumFractionDigits: 8 }) + '%';
    const halfScale = 40 / surface.clientWidth;
    scaleText.textContent = view.center >= .88 ? '未来への問い' : '中央付近では、この幅で約' + durationLabel(ageAt(worldX(.5 - halfScale, view)) - ageAt(worldX(.5 + halfScale, view)));
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
      document.getElementById('deepTimeQuestion').textContent = lensQuestions[lens];
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
    event.currentTarget.setAttribute('aria-label', flowing ? '粒の漂いを止める' : '粒の漂いを再開する');
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
  const dialogLinks = document.getElementById('deepTimeDialogLinks');
  const detailLink = document.getElementById('deepTimeDetailLink');
  const copyStatus = document.getElementById('deepTimeCopyStatus');
  const promptBox = document.getElementById('deepTimePrompt');

  function openEvent(event) {
    stopMotion();
    selected = event;
    dialogImage.hidden = !event.image;
    if (event.image) dialogImage.src = event.image;
    dialogDate.textContent = (event.future ? '未来への問い · ' : '') + event.date;
    dialogTitle.textContent = event.title;
    dialogDescription.textContent = event.description;
    dialogEra.textContent = event.eraTitle;
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
  document.getElementById('deepTimeCopy').addEventListener('click', async function () {
    if (!selected) return;
    const prompt = 'ManabiMapの年表から学びを深める対話をしてください。\n転換点：' + selected.date + '／' + selected.title + '\n説明：' + selected.description + '\n時代：' + selected.eraTitle + '\n見方：' + document.querySelector('[data-time-lens="' + lens + '"]').textContent + '\n\nまず、この出来事の前の状況・何が変わったか・後への影響を日常語で説明してください。いきなり私の意見を求めず、理解の足場を作ってください。事実と解釈、不確かな年代、未来の推測は区別してください。時系列の近さを因果と見なさず、別の地域や反対の見方にも触れてください。続いてたどれる方向を2〜3個示してください。';
    try {
      await navigator.clipboard.writeText(prompt);
      copyStatus.textContent = 'コピーしました。普段使うAIに貼り付けてください。';
    } catch (error) {
      promptBox.value = prompt;
      promptBox.hidden = false;
      copyStatus.textContent = '下の対話文を選択してコピーしてください。';
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
  requestAnimationFrame(animate);

  new IntersectionObserver(function (entries) {
    inSpace = entries[0].isIntersecting;
    document.body.classList.toggle('deep-in-space', inSpace);
  }, { threshold: .1 }).observe(section);
})();
