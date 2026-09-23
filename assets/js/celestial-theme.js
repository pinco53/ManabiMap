/* Decorative star dust: drawn once per size, no animation loop or interaction. */
(() => {
  'use strict';
  const hero = document.querySelector('.simple-page-hero, .map-hero--simple, .page-hero, body[data-part] .cover, body.media-hub .hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'celestial-dust';
  canvas.setAttribute('aria-hidden', 'true');
  hero.classList.add('celestial-hero');
  hero.prepend(canvas);
  const context = canvas.getContext('2d');
  if (!context) { canvas.remove(); return; }
  let lastWidth = 0, lastHeight = 0, frame = 0;
  function draw() {
    const width = Math.round(hero.clientWidth), height = Math.round(hero.clientHeight);
    if (!width || !height || (width === lastWidth && height === lastHeight)) return;
    lastWidth = width; lastHeight = height;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    let seed = 1382026;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const scatter = () => random() + random() + random() - 1.5;
    const compact = width < 600;
    // A dense field keeps every inner-page hero feeling like the same galaxy.
    // Most added stars are intentionally tiny and faint so the copy stays clear.
    const count = compact ? 42000 : 110000;
    const centerX = width * (compact ? .62 : .78);
    const centerY = height * (compact ? .55 : .48);
    const spanX = Math.min(width * (compact ? .72 : .62), height * 1.45);
    const spanY = Math.min(height * .47, width * .31);

    context.save();
    context.translate(centerX, centerY);
    context.scale(1, .5);
    const coreGlow = context.createRadialGradient(0, 0, 0, 0, 0, spanY * 1.05);
    coreGlow.addColorStop(0, 'rgba(224,201,152,.18)');
    coreGlow.addColorStop(.22, 'rgba(161,181,207,.08)');
    coreGlow.addColorStop(1, 'rgba(70,102,140,0)');
    context.fillStyle = coreGlow;
    context.fillRect(-spanY * 1.1, -spanY * 1.1, spanY * 2.2, spanY * 2.2);
    context.restore();

    for (let i = 0; i < count; i++) {
      const population = random();
      let x, y, radius = 1, alpha;
      if (population < .18) {
        x = random() * width;
        y = random() * height;
        alpha = .055 + random() * .27;
      } else {
        let angle;
        if (population < .30) {
          radius = Math.pow(random(), 2.7) * .24;
          angle = random() * Math.PI * 2;
          alpha = .14 + random() * .43;
        } else if (population < .93) {
          radius = .035 + Math.pow(random(), .78) * .98;
          const arm = Math.floor(random() * 4);
          angle = arm * Math.PI / 2 + radius * 5.35 + scatter() * (.1 + radius * .2);
          alpha = (.07 + random() * .37) * (1 - radius * .28);
        } else {
          radius = Math.sqrt(random()) * 1.18;
          angle = random() * Math.PI * 2;
          alpha = (.04 + random() * .15) * (1 - Math.min(radius, 1) * .35);
        }
        const localX = Math.cos(angle) * radius * spanX;
        const localY = Math.sin(angle) * radius * spanY + scatter() * spanY * (.025 + radius * .055);
        x = centerX + localX * .985 - localY * .174;
        y = centerY + localX * .174 + localY * .985;
      }
      context.fillStyle = radius < .3 && population >= .13 ? `rgba(226,204,158,${alpha})` : `rgba(184,205,230,${alpha})`;
      const size = random() < .004 ? 1.55 : .2 + random() * .58;
      context.fillRect(x, y, size, size);
    }
  }
  const resize = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
  draw();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener('resize', resize, { passive: true });
})();
