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
    const count = width < 600 ? 6500 : 16000;
    for (let i = 0; i < count; i++) {
      const field = i < count * .08;
      const angle = random() * Math.PI * 2;
      const radius = Math.pow(random(), 1.75);
      const x = field ? random() * width : width * .78 + Math.cos(angle) * radius * width * .58;
      const y = field ? random() * height : height * .48 + Math.sin(angle) * radius * height * .4 - (x - width * .78) * .15;
      const alpha = (.1 + random() * .42) * (field ? 1 : .8 - radius * .4);
      context.fillStyle = radius < .32 && !field ? `rgba(224,201,152,${alpha})` : `rgba(185,205,228,${alpha})`;
      const size = random() < .005 ? 1.6 : .3 + random() * .65;
      context.fillRect(x, y, size, size);
    }
  }
  const resize = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
  draw();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener('resize', resize, { passive: true });
})();
