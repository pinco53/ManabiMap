(function () {
  'use strict';

  const MAX_AGE = 13_800_000_000;
  const PRESENT = 2026;
  const PICTURE_ZOOM = 2.7;
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
    const century = date.match(/(\d+)世紀/);
    const bce = date.indexOf('紀元前') >= 0;
    const raw = date.match(/\d+/);
    if (!raw) return 0;
    const year = century ? (bce ? -Number(century[1]) * 100 : (Number(century[1]) - 1) * 100 + 1) : (bce ? -1 : 1) * Number(raw[0]);
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

  const futureEvents = [];
  const events = Array.from(document.querySelectorAll('.timeline-container .event')).map(function (node, index) {
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
      y: .40 + seeded(index + 1) * .28
    };
    if (future) futureEvents.push(event);
    return event;
  });

  const lensQuestions = {
    all: '',
    information: '知識は、どう人の外へ広がった？',
    energy: '使える力が変わると、暮らしはどう変わる？',
    cooperation: '人は、どんな仕組みで共に生きてきた？'
  };
  let lens = 'all';
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
    const z = Math.max(1, Math.min(24, zoom));
    return { zoom: z, center: Math.max(.5 / z, Math.min(1 - .5 / z, center)) };
  }

  function screenX(position, camera) { return .5 + (position - camera.center) * camera.zoom * .92; }
  function worldX(screen, camera) { return camera.center + (screen - .5) / (camera.zoom * .92); }
  function zoomAt(camera, factor, anchor) {
    const z = Math.max(1, Math.min(24, camera.zoom * factor));
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
    button.setAttribute('aria-label', event.date + ' ' + event.title + 'へ近づく');
    button.innerHTML = '<span class="deep-time-point__core"></span>';
    button.addEventListener('pointerdown', function (event_) { event_.stopPropagation(); });
    button.addEventListener('dblclick', function (event_) { event_.stopPropagation(); });
    button.addEventListener('click', function () {
      selected = event;
      if (view.zoom < PICTURE_ZOOM) target = bound(event.position, 4);
      else openEvent(event);
    });
    pointLayer.appendChild(button);
    return button;
  });

  const markers = [
    { age: MAX_AGE, label: '138億年前' }, { age: 1e8, label: '1億年前' },
    { age: 1e6, label: '100万年前' }, { age: 1e4, label: '1万年前' },
    { age: 1e3, label: '1000年前' }, { age: 100, label: '100年前' },
    { age: 10, label: '10年前' }, { age: 0, label: 'いま' }
  ].map(function (marker) {
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

  function isRelated(event) { return lens === 'all' || event.themes.indexOf(lens) >= 0; }

  function renderPoints() {
    const visible = [];
    events.forEach(function (event, index) {
      const x = screenX(event.position, view);
      const button = nodes[index];
      const shown = x > .025 && x < .975;
      button.hidden = !shown;
      if (!shown) return;
      button.style.left = (x * 100).toFixed(3) + '%';
      button.style.top = (event.y * 100).toFixed(3) + '%';
      button.classList.toggle('is-muted', !isRelated(event));
      button.classList.toggle('is-future', event.future);
      button.setAttribute('aria-label', event.date + ' ' + event.title + (view.zoom < PICTURE_ZOOM ? 'へ近づく' : 'の背景を読む'));
      visible.push({ event: event, button: button, x: x });
    });

    const pictures = [];
    if (view.zoom >= PICTURE_ZOOM) {
      visible.filter(function (item) { return isRelated(item.event); }).sort(function (a, b) { return Math.abs(a.x - .5) - Math.abs(b.x - .5); }).some(function (item) {
        const px = item.x * surface.clientWidth;
        if (px < 75 || px > surface.clientWidth - 75) return false;
        const clear = pictures.every(function (placed) { return Math.hypot((item.x - placed.x) * surface.clientWidth, (item.event.y - placed.event.y) * surface.clientHeight) > 145; });
        if (clear) pictures.push(item);
        return pictures.length >= 7;
      });
    }
    const pictureIds = new Set(pictures.map(function (item) { return item.event.id; }));
    visible.forEach(function (item) {
      const shouldShow = pictureIds.has(item.event.id);
      const hasImage = item.button.classList.contains('has-image');
      if (shouldShow && !hasImage) {
        const img = document.createElement('img');
        img.src = item.event.image;
        img.alt = '';
        img.loading = 'lazy';
        const caption = document.createElement('span');
        caption.className = 'deep-time-point__caption';
        caption.innerHTML = '<small></small>';
        caption.querySelector('small').textContent = item.event.date;
        caption.appendChild(document.createTextNode(item.event.title));
        item.button.appendChild(img);
        item.button.appendChild(caption);
        item.button.classList.add('has-image');
      } else if (!shouldShow && hasImage) {
        const img = item.button.querySelector('img');
        const caption = item.button.querySelector('.deep-time-point__caption');
        if (img) img.remove();
        if (caption) caption.remove();
        item.button.classList.remove('has-image');
      }
    });
  }

  function renderInterface() {
    if (view.zoom < 1.15) {
      ageText.textContent = '138';
      ageText.classList.remove('is-age');
      unitText.textContent = '億年';
      rangeText.textContent = '宇宙のはじまりから、人類の問いへ。';
    } else {
      ageText.textContent = ageLabel(view.center);
      ageText.classList.add('is-age');
      unitText.textContent = '';
      rangeText.textContent = ageLabel(Math.max(0, view.center - .5 / view.zoom)) + ' — ' + ageLabel(Math.min(1, view.center + .5 / view.zoom));
    }
    zoomLabel.textContent = view.zoom.toFixed(1) + '×';
    zoomOut.disabled = target.zoom <= 1.001;
    zoomIn.disabled = target.zoom >= 23.999;
    instruction.textContent = view.zoom < PICTURE_ZOOM ? 'スクロール・ピンチで近づく。粒を選んで、時代の中へ。' : 'ドラッグで時を移動。粒や画像を選ぶと、学びの入口が開きます。';
    scrubber.value = String(Math.round(view.center * 1000));
    output.value = ageLabel(Math.max(0, view.center - .5 / view.zoom)) + ' — ' + ageLabel(Math.min(1, view.center + .5 / view.zoom));
    markers.forEach(function (marker) {
      const x = screenX(marker.position, view);
      marker.node.hidden = !(x > .025 && x < .975);
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
      renderPoints();
    });
  });

  document.querySelectorAll('[data-time-stop]').forEach(function (button) {
    button.addEventListener('click', function () {
      const values = button.dataset.timeStop.split(',').map(Number);
      target = bound(values[0], values[1]);
      selected = null;
    });
  });

  zoomIn.addEventListener('click', function () { target = zoomAt(target, 1.6, .5); });
  zoomOut.addEventListener('click', function () { target = zoomAt(target, 1 / 1.6, .5); });
  document.getElementById('deepTimeReset').addEventListener('click', function () { target = { center: .5, zoom: 1 }; selected = null; });
  document.getElementById('deepTimeFlow').addEventListener('click', function (event) {
    flowing = !flowing;
    event.currentTarget.textContent = flowing ? 'Ⅱ' : '▶';
    event.currentTarget.setAttribute('aria-label', flowing ? '粒の漂いを止める' : '粒の漂いを再開する');
  });
  scrubber.addEventListener('input', function () { target = bound(Number(scrubber.value) / 1000, target.zoom); });

  surface.addEventListener('wheel', function (event) {
    event.preventDefault();
    const box = surface.getBoundingClientRect();
    target = zoomAt(target, Math.exp(-event.deltaY * .0025), (event.clientX - box.left) / box.width);
  }, { passive: false });
  surface.addEventListener('dblclick', function (event) {
    const box = surface.getBoundingClientRect();
    target = zoomAt(target, 2, (event.clientX - box.left) / box.width);
  });

  const pointers = new Map();
  let drag = null;
  let pinch = null;
  surface.addEventListener('pointerdown', function (event) {
    if (event.button !== 0 || event.target.closest('.deep-time-point')) return;
    surface.setPointerCapture(event.pointerId);
    surface.classList.add('is-dragging');
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    drag = { x: event.clientX, center: target.center };
    if (pointers.size === 2) {
      const values = Array.from(pointers.values());
      pinch = Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y);
    }
  });
  surface.addEventListener('pointermove', function (event) {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2) {
      const values = Array.from(pointers.values());
      const distance = Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y);
      const ratio = distance / Math.max(1, pinch || distance);
      const rect = surface.getBoundingClientRect();
      const anchor = ((values[0].x + values[1].x) / 2 - rect.left) / rect.width;
      target = zoomAt(target, ratio, anchor);
      pinch = distance;
    } else if (drag) {
      target = bound(drag.center - (event.clientX - drag.x) / (surface.clientWidth * .92 * target.zoom), target.zoom);
    }
  });
  function finishPointer(event) {
    pointers.delete(event.pointerId);
    pinch = null;
    if (!pointers.size) { drag = null; surface.classList.remove('is-dragging'); }
  }
  surface.addEventListener('pointerup', finishPointer);
  surface.addEventListener('pointercancel', finishPointer);

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
    selected = event;
    dialogImage.src = event.image;
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
    detailLink.href = '#' + event.eraId;
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
    const prompt = 'ManabiMapの年表から学びを深める対話をしてください。\n転換点：' + selected.date + '／' + selected.title + '\n説明：' + selected.description + '\n時代：' + selected.eraTitle + '\n見方：' + (lens === 'all' ? '全体' : document.querySelector('[data-time-lens="' + lens + '"]').textContent) + '\n\nまず、この出来事の前の状況・何が変わったか・後への影響を日常語で説明してください。いきなり私の意見を求めず、理解の足場を作ってください。事実と解釈、不確かな年代、未来の推測は区別してください。時系列の近さを因果と見なさず、別の地域や反対の見方にも触れてください。続いてたどれる方向を2〜3個示してください。';
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
    if (!gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (dprUniform) gl.uniform1f(dprUniform, dpr);
  }
  new ResizeObserver(resizeCanvas).observe(canvas);
  resizeCanvas();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function animate(now) {
    const dt = Math.min((now - lastFrame) / 1000, .05);
    lastFrame = now;
    const blend = reducedMotion.matches ? 1 : 1 - Math.exp(-dt * 9);
    view.center += (target.center - view.center) * blend;
    view.zoom += (target.zoom - view.zoom) * blend;
    if (flowing && !reducedMotion.matches) elapsed += dt;
    renderPoints();
    renderInterface();
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
