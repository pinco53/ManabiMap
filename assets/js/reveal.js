/* ==========================================================================
   Reveal on scroll（Phase 4）
   podcast / note / infographics 用の共通スクロールリビール。
   index.html / evolution.html は各ページ内に同等の実装があるため読み込まない。
   クラス命名は既存実装（reveal-init / reveal-on）に合わせる。
   ========================================================================== */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var SELECTOR = [
    '.podcast-card',
    '.note-card',
    '.note-recommend-card',
    '.zukai-card'
  ].join(', ');

  var STAGGER_MS = 60;
  var STAGGER_MAX_MS = 300;

  var observer = new IntersectionObserver(function (entries) {
    var delay = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.style.transitionDelay = Math.min(delay, STAGGER_MAX_MS) + 'ms';
      el.classList.add('reveal-on');
      observer.unobserve(el);
      delay += STAGGER_MS;
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

  function register(el) {
    if (el.classList.contains('reveal-init')) return;
    el.classList.add('reveal-init');
    observer.observe(el);
  }

  function scan(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.nodeType === 1 && root.matches(SELECTOR)) register(root);
    root.querySelectorAll(SELECTOR).forEach(register);
  }

  /* JSレンダリングされるカード（podcast / zukai）を拾う */
  var mutationObs = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) scan(node);
      });
    });
  });

  function init() {
    scan(document);
    mutationObs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
