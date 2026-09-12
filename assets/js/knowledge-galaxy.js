(function () {
  'use strict';
  const data = window.ManabiMapData;
  const section = document.getElementById('galaxy');
  const starCanvas = document.getElementById('knowledgeGalaxyStars');
  const fieldCanvas = document.getElementById('knowledgeGalaxyField');
  if (!data || !section || !starCanvas || !fieldCanvas) return;

  const lensMeta = {
    all: { label: 'すべて', question: '世界の知識は、どこでつながっている？' },
    thinking: { label: '人間とAI', question: 'AIが答えを出せる時代に、人間が考えるとは何か。' },
    learning: { label: '学ぶこと', question: '学ぶとは、答えを増やすことか、問いを増やすことか。' },
    language: { label: '言葉と思考', question: '言葉は思考を作るのか、思考が言葉を作るのか。' },
    tool: { label: '道具と人間', question: '道具を使うことと、道具に使われることの境界はどこか。' },
    number: { label: '数と価値', question: '数字で測れないものに、どう価値を与えるのか。' }
  };
  const lensKeys = Object.keys(lensMeta);
  const parts = data.parts.map(function (part) {
    const text = [part.title, part.subtitle, (part.tags || []).join(' '), (part.questions || []).join(' ')].join(' ');
    const lenses = [];
    if (/AI|人間|思考|判断|感性|前提|勘違い|身体|意識/.test(text)) lenses.push('thinking');
    if (/学び|教育|知識|対話|理解|学校|協働|問い/.test(text)) lenses.push('learning');
    if (/言葉|文字|思考|知識|記録|物語|コミュニケーション/.test(text)) lenses.push('language');
    if (/道具|機械|技術|AI|蒸気|コンピュータ|エネルギー|デジタル|交換|移動/.test(text)) lenses.push('tool');
    if (/数字|価値|測|計算|エネルギー|交換|余っ|足り|経済/.test(text)) lenses.push('number');
    if (!lenses.length) lenses.push('learning');
    return Object.assign({}, part, { lenses: lenses });
  });

  let activeLens = 'thinking';
  let selected = parts.find(function (part) { return part.id === 'part3'; }) || parts[0];
  let depth = 18;
  let inView = true;
  const pointer = { targetX: 0, targetY: 0, x: 0, y: 0, active: false };
  const anchors = {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.getElementById('galaxyStarCount').textContent = String(data.mediaItems.length);
  document.getElementById('galaxyPartCount').textContent = String(parts.length);
  document.querySelector('[data-galaxy-lens="all"] b').textContent = String(parts.length);
  lensKeys.filter(function (key) { return key !== 'all'; }).forEach(function (key) {
    document.querySelector('[data-galaxy-lens="' + key + '"] b').textContent = String(parts.filter(function (part) { return part.lenses.indexOf(key) >= 0; }).length);
  });

  function hash(index, salt) {
    const value = Math.sin(index * 9283.31 + salt * 77.17) * 43758.5453;
    return value - Math.floor(value);
  }
  function related(part) { return activeLens === 'all' || part.lenses.indexOf(activeLens) >= 0; }

  const questionTitle = document.getElementById('galaxy-question');
  const questionCount = document.getElementById('galaxyQuestionCount');
  const depthInput = document.getElementById('galaxyDepth');
  const depthText = document.getElementById('galaxyDepthText');
  const depthOutput = document.getElementById('galaxyDepthOutput');
  function updateInterface() {
    questionTitle.textContent = lensMeta[activeLens].question;
    questionCount.textContent = parts.filter(related).length + 'の学びが、この問いの重力に引き寄せられています。';
    depthText.textContent = depth < 34 ? '全体を眺める' : depth < 70 ? '部のあいだを歩く' : '一つの問いへ潜る';
    depthOutput.value = Math.round(depth) + ' / 100';
    depthInput.value = String(Math.round(depth));
  }

  document.querySelectorAll('[data-galaxy-lens]').forEach(function (button) {
    button.addEventListener('click', function () {
      activeLens = button.dataset.galaxyLens;
      document.querySelectorAll('[data-galaxy-lens]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      const first = parts.find(related);
      if (first) selected = first;
      closeCard();
      updateInterface();
    });
  });
  depthInput.addEventListener('input', function () { depth = Number(depthInput.value); updateInterface(); });
  fieldCanvas.addEventListener('wheel', function (event) {
    event.preventDefault();
    depth = Math.max(0, Math.min(100, depth + event.deltaY * .028));
    updateInterface();
  }, { passive: false });

  const card = document.getElementById('galaxyCard');
  function openCard(part) {
    selected = part;
    document.getElementById('galaxyCardGroup').textContent = 'YOU ARE HERE / ' + (part.group || 'MANABI MAP');
    document.getElementById('galaxyCardPart').textContent = 'PART ' + part.number;
    document.getElementById('galaxyCardTitle').textContent = part.title;
    document.getElementById('galaxyCardQuestion').textContent = (part.questions && part.questions[0]) || part.subtitle || '';
    document.getElementById('galaxyCardPartLink').href = part.pageUrl || 'map.html';
    card.classList.add('is-open');
    card.setAttribute('aria-hidden', 'false');
  }
  function closeCard() { card.classList.remove('is-open'); card.setAttribute('aria-hidden', 'true'); }
  document.getElementById('galaxyCardClose').addEventListener('click', closeCard);
  document.getElementById('galaxyRandom').addEventListener('click', function () {
    const pool = parts.filter(related);
    const next = pool[Math.floor(Math.random() * pool.length)];
    depth = 34 + Math.floor(Math.random() * 28);
    updateInterface();
    openCard(next);
  });

  const field = fieldCanvas.getContext('2d');
  const dustCount = Math.max(310, data.mediaItems.length);
  const dust = Array.from({ length: dustCount }, function (_, index) {
    return { x: 0, y: 0, sx: hash(index, 1), sy: hash(index, 2), radius: 1 + hash(index, 4) * 2.2, partIndex: index % parts.length };
  });
  let width = 1, height = 1, dpr = 1, frame = 0;

  function resizeField() {
    const rect = fieldCanvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width; height = rect.height;
    fieldCanvas.width = Math.max(1, Math.floor(width * dpr));
    fieldCanvas.height = Math.max(1, Math.floor(height * dpr));
    field.setTransform(dpr, 0, 0, dpr, 0, 0);
    dust.forEach(function (particle) { if (!particle.x && !particle.y) { particle.x = width * particle.sx; particle.y = height * particle.sy; } });
  }

  function tilt(x, y) {
    const amount = -.18;
    return { x: x * Math.cos(amount) - y * Math.sin(amount), y: x * Math.sin(amount) + y * Math.cos(amount) };
  }
  function particleTarget(particle) {
    const cx = width * .54, cy = height * .51;
    const isRelated = related(parts[particle.partIndex]);
    const phase = lensKeys.indexOf(activeLens) * .18;
    const maxRadius = Math.min(width, height) * .46;
    const radius = 18 + Math.pow(particle.sx, .72) * maxRadius;
    const arm = particle.partIndex % 4;
    const spread = (particle.sy - .5) * (isRelated ? .72 : 2.7);
    const angle = arm * Math.PI / 2 + radius / maxRadius * 5.5 + spread + phase + frame * .00016;
    const halo = isRelated ? 1 : 1.18 + particle.sy * .34;
    const point = tilt(Math.cos(angle) * radius * 1.38 * halo, Math.sin(angle) * radius * .58 * halo);
    const scale = .84 + depth * .017;
    return { x: cx + point.x * scale, y: cy + point.y * scale, related: isRelated };
  }
  function anchorTarget(index) {
    const cx = width * .54, cy = height * .51, part = parts[index];
    const relatedParts = parts.filter(related);
    const relatedIndex = relatedParts.findIndex(function (item) { return item.id === part.id; });
    const order = relatedIndex >= 0 ? relatedIndex : index;
    const total = relatedIndex >= 0 ? relatedParts.length : parts.length;
    const u = (order + 2) / (total + 3);
    const maxRadius = Math.min(width, height) * .43;
    const radius = 46 + u * maxRadius;
    const phase = lensKeys.indexOf(activeLens) * .18;
    const angle = (order % 4) * Math.PI / 2 + radius / maxRadius * 5.5 + phase;
    let point = tilt(Math.cos(angle) * radius * 1.38, Math.sin(angle) * radius * .58);
    if (relatedIndex < 0 && activeLens !== 'all') {
      const haloAngle = index * 2.31 + phase;
      const haloRadius = Math.min(width, height) * (.52 + index % 3 * .05);
      point = tilt(Math.cos(haloAngle) * haloRadius * 1.28, Math.sin(haloAngle) * haloRadius * .62);
    }
    const scale = .84 + depth * .018;
    const x = cx + point.x * scale;
    const y = cy + point.y * scale;
    return { x: Math.max(26, Math.min(width - (width < 760 ? 135 : 205), x)), y: Math.max(185, Math.min(height - 105, y)), related: relatedIndex >= 0 || activeLens === 'all' };
  }

  function drawField() {
    frame += 1;
    field.clearRect(0, 0, width, height);
    dust.forEach(function (particle) {
      const target = particleTarget(particle);
      particle.x += (target.x - particle.x) * .035;
      particle.y += (target.y - particle.y) * .035;
      let glow = 0;
      if (pointer.active) {
        const dx = particle.x - pointer.x, dy = particle.y - pointer.y, distance = Math.hypot(dx, dy);
        if (distance < 120 && distance > 0) {
          const force = (120 - distance) / 120;
          particle.x += (dx / distance * .7 - dy / distance * 1.9) * force;
          particle.y += (dy / distance * .7 + dx / distance * 1.9) * force;
          glow = force;
        }
      }
      const warmth = Math.max(0, 1 - Math.pow(particle.sx, .72) * 3);
      const red = Math.round(205 + warmth * 50), green = Math.round(220 + warmth * 8), blue = Math.round(242 - warmth * 88);
      const alpha = target.related ? .34 + glow * .62 : .07 + glow * .2;
      const size = particle.radius + glow * 3.8;
      field.beginPath(); field.arc(particle.x, particle.y, size * 3.2, 0, Math.PI * 2); field.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha * .1 + ')'; field.fill();
      field.beginPath(); field.arc(particle.x, particle.y, size, 0, Math.PI * 2); field.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')'; field.fill();
    });
    parts.forEach(function (part, index) {
      const target = anchorTarget(index);
      anchors[part.id] = { x: target.x, y: target.y };
      const isSelected = part.id === selected.id;
      const near = pointer.active && Math.hypot(target.x - pointer.x, target.y - pointer.y) < 46;
      const visible = target.related || isSelected || near;
      field.beginPath(); field.arc(target.x, target.y, isSelected ? 20 : 12, 0, Math.PI * 2); field.fillStyle = visible ? '#dbebff1f' : '#8496ae0a'; field.fill();
      field.beginPath(); field.arc(target.x, target.y, isSelected ? 6 : visible ? 4 : 2, 0, Math.PI * 2); field.fillStyle = visible ? '#e8f2ff' : '#4d5868'; field.fill();
      if (isSelected) { field.beginPath(); field.arc(target.x, target.y, 13 + Math.sin(frame * .05) * 2, 0, Math.PI * 2); field.strokeStyle = '#e8f2ffc7'; field.lineWidth = 1.2; field.stroke(); }
      if (visible && (isSelected || near || (width > 760 && depth < 62))) {
        field.font = (isSelected ? '600 13px' : '500 10px') + ' "Noto Sans JP", sans-serif';
        field.fillStyle = isSelected ? '#fff' : '#ebebf6d1';
        field.fillText(part.number + '  ' + part.title, target.x + 12, target.y - 7);
      }
    });
  }

  function fieldPoint(event) {
    const rect = fieldCanvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  fieldCanvas.addEventListener('pointermove', function (event) { const p = fieldPoint(event); pointer.targetX = p.x; pointer.targetY = p.y; pointer.active = true; });
  fieldCanvas.addEventListener('pointerleave', function () { pointer.active = false; });
  fieldCanvas.addEventListener('click', function (event) {
    const p = fieldPoint(event);
    const nearest = Object.keys(anchors).map(function (id) { return { id: id, distance: Math.hypot(anchors[id].x - p.x, anchors[id].y - p.y) }; }).sort(function (a, b) { return a.distance - b.distance; })[0];
    if (nearest && nearest.distance < 48) openCard(parts.find(function (part) { return part.id === nearest.id; }));
  });

  const STAR_COUNT = 320000;
  const STRIDE = 8;
  const gl = starCanvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' });
  let galaxyReady = false, galaxyUniforms = {}, galaxyDpr = 1, galaxyTime = 0, galaxyZoom = .84 + depth * .018;
  if (gl) {
    try {
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, 'precision highp float;attribute vec3 a_position;attribute vec3 a_color;attribute vec2 a_light;uniform vec2 u_resolution;uniform vec2 u_pointer;uniform float u_scale;uniform float u_dpr;uniform float u_time;varying vec3 v_color;varying float v_alpha;void main(){float rot=u_time*.002;vec2 p=mat2(cos(rot),-sin(rot),sin(rot),cos(rot))*a_position.xy;float inclinedY=p.y*.63+a_position.z*.78;vec2 projected=mat2(.984,.178,-.178,.984)*vec2(p.x,inclinedY);projected+=u_pointer*a_position.z*.075;float radius=min(u_resolution.x*.48,u_resolution.y*.60)*u_scale;vec2 pixel=vec2(u_resolution.x*.54,u_resolution.y*.49)+projected*radius;gl_Position=vec4(pixel/u_resolution*2.-1.,0.,1.);gl_PointSize=max(1.,a_light.x*u_dpr*pow(u_scale,.35));v_color=a_color;v_alpha=a_light.y/pow(u_scale,.2);}'));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec3 v_color;varying float v_alpha;void main(){float r=length(gl_PointCoord-.5)*2.;if(r>1.)discard;float light=exp(-r*r*3.6);gl_FragColor=vec4(v_color*v_alpha*light,1.);}'));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Galaxy program link failed');
      gl.useProgram(program);
      const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, makeStars(), gl.STATIC_DRAW);
      [['a_position',3,0],['a_color',3,3],['a_light',2,6]].forEach(function (item) { const location=gl.getAttribLocation(program,item[0]);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,item[1],gl.FLOAT,false,STRIDE*4,item[2]*4); });
      galaxyUniforms = { resolution: gl.getUniformLocation(program,'u_resolution'), pointer: gl.getUniformLocation(program,'u_pointer'), scale: gl.getUniformLocation(program,'u_scale'), dpr: gl.getUniformLocation(program,'u_dpr'), time: gl.getUniformLocation(program,'u_time') };
      gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.clearColor(.002,.004,.009,1); galaxyReady = true;
      starCanvas.dataset.starCount = String(STAR_COUNT);
    } catch (error) { console.warn('Galaxy renderer is unavailable.', error); }
  }
  function compile(type, source) { const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader));return shader; }
  function makeStars() {
    let seed=193742;
    function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return(seed+1)/4294967297;}
    function normal(){return Math.sqrt(-2*Math.log(random()))*Math.cos(2*Math.PI*random());}
    const stars=new Float32Array(STAR_COUNT*STRIDE);
    for(let i=0;i<STAR_COUNT;i++){
      const population=random();let r,angle,z;
      if(population<.24){r=Math.min(.36,Math.sqrt(-2*Math.log(random()))*.07);angle=random()*Math.PI*2;z=normal()*.035*Math.exp(-r*5);}
      else if(population<.79){r=.065+Math.pow(random(),.8)*.87;const arm=Math.floor(random()*4),branch=arm*Math.PI/2+.3*Math.sin(arm*4.7),ridge=branch+Math.log(1+r*9)*2.8,feather=.07*Math.sin(r*38+arm)+.05*Math.sin(r*83-arm*3);angle=ridge+feather+normal()*(.08+r*.13);r+=normal()*.012;z=normal()*(.009+r*.018);}
      else if(population<.975){r=Math.min(1.18,-Math.log(random()*random())*.18);angle=random()*Math.PI*2;z=normal()*(.015+r*.045);}
      else{r=.35+random()*1.45;angle=random()*Math.PI*2;z=normal()*.13;}
      const warmth=Math.exp(-r*r*19),tone=random(),rare=random(),size=rare>.998?3.8:rare>.975?2:.9+random()*.8,patch=.63+.19*Math.sin(r*43+angle*3)+.18*Math.sin(r*109-angle*7),luminosity=(.075+Math.pow(random(),3)*.36)*patch*(1-Math.min(r,1)*.4);
      stars.set([Math.cos(angle)*r,Math.sin(angle)*r,z,.63+warmth*.37+tone*.09,.74+warmth*.06+tone*.06,.9-warmth*.46+tone*.08,size,rare>.975?.6:luminosity],i*STRIDE);
    } return stars;
  }
  function resizeStars(){if(!gl)return;const rect=starCanvas.getBoundingClientRect();galaxyDpr=Math.min(window.devicePixelRatio||1,2);starCanvas.width=Math.max(1,Math.round(rect.width*galaxyDpr));starCanvas.height=Math.max(1,Math.round(rect.height*galaxyDpr));gl.viewport(0,0,starCanvas.width,starCanvas.height);}

  new ResizeObserver(function(){resizeField();resizeStars();}).observe(section);
  resizeField(); resizeStars(); updateInterface();
  let previous=performance.now();
  function animate(now){const dt=Math.min((now-previous)/1000,.05);previous=now;if(inView&&!document.hidden){const smoothing=reduced.matches?1:1-Math.exp(-dt*5);pointer.x+=(pointer.targetX-pointer.x)*smoothing;pointer.y+=(pointer.targetY-pointer.y)*smoothing;drawField();if(galaxyReady){if(!reduced.matches)galaxyTime+=dt;galaxyZoom+=(.84+depth*.018-galaxyZoom)*smoothing;gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform2f(galaxyUniforms.resolution,starCanvas.width,starCanvas.height);gl.uniform2f(galaxyUniforms.pointer,reduced.matches||!pointer.active?0:(pointer.x/width-.5),reduced.matches||!pointer.active?0:(.5-pointer.y/height));gl.uniform1f(galaxyUniforms.scale,galaxyZoom);gl.uniform1f(galaxyUniforms.dpr,galaxyDpr);gl.uniform1f(galaxyUniforms.time,galaxyTime);gl.drawArrays(gl.POINTS,0,width<760?180000:STAR_COUNT);}}requestAnimationFrame(animate);}
  requestAnimationFrame(animate);
  new IntersectionObserver(function(entries){inView=entries[0].isIntersecting;document.body.classList.toggle('galaxy-in-view',inView);},{threshold:.1}).observe(section);
})();
