/*
 * 時刻で変わる空 ── 訪問者の端末の時刻で、ページ全体の色調がごくわずかに変わる。
 * 明け方は地平線が薄く色づき、昼はわずかに澄み、夕方は琥珀がにじみ、夜は青が深くなる。
 * 機能ではなく気配。pointer-events:none の薄い色のヴェールを一枚かけるだけで、
 * 各ページの背景・文字には触れない。
 */
(function() {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // 動きはないが、体感を変えたくない人にはヴェール自体をかけない
    return;
  }

  const VEILS = {
    dawn: [
      'linear-gradient(0deg, rgba(255,168,130,0.10) 0%, rgba(255,168,130,0.02) 34%, transparent 55%)',
      'linear-gradient(180deg, rgba(110,130,255,0.05) 0%, transparent 40%)'
    ].join(','),
    day: [
      'linear-gradient(180deg, rgba(170,205,255,0.06) 0%, transparent 48%)'
    ].join(','),
    dusk: [
      'linear-gradient(0deg, rgba(255,140,80,0.09) 0%, rgba(200,90,160,0.04) 36%, transparent 58%)',
      'linear-gradient(180deg, rgba(90,70,180,0.06) 0%, transparent 42%)'
    ].join(','),
    night: [
      'linear-gradient(180deg, rgba(40,55,160,0.09) 0%, rgba(15,15,50,0.07) 60%, rgba(10,10,40,0.09) 100%)'
    ].join(',')
  };

  function bandFor(hour) {
    if (hour >= 4 && hour < 7) return 'dawn';
    if (hour >= 7 && hour < 16) return 'day';
    if (hour >= 16 && hour < 19) return 'dusk';
    return 'night';
  }

  let veil = null;

  function apply() {
    const band = bandFor(new Date().getHours());
    if (!veil) {
      veil = document.createElement('div');
      veil.setAttribute('aria-hidden', 'true');
      veil.style.cssText = [
        'position: fixed',
        'inset: 0',
        'z-index: 2147483000',
        'pointer-events: none',
        'transition: opacity 2.4s ease, background 2.4s ease'
      ].join(';');
      document.body.appendChild(veil);
    }
    if (veil.dataset.skyBand === band) return;
    veil.dataset.skyBand = band;
    veil.style.background = VEILS[band];
    document.documentElement.dataset.sky = band;
  }

  function init() {
    apply();
    // 開きっぱなしのタブでも、空は静かに移ろう
    setInterval(apply, 10 * 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
