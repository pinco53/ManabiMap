/*
 * 部ページ表紙に、トップと同じ紋章・星座を静かに差し込む。
 * data-part は分割ページも親部にそろえるため、part9_1/2/3 は part9 を使う。
 */
(function() {
  'use strict';

  const PART_KEY_BY_DATA = {
    '1': 'part1',
    '2': 'part2',
    '3': 'part3',
    '4': 'part4',
    '5': 'part5',
    '6': 'part6',
    '7': 'part7',
    '8': 'part8',
    '8-2': 'part8-2',
    '9': 'part9'
  };

  function initPartCoverIdentity() {
    const partKey = PART_KEY_BY_DATA[document.body && document.body.dataset.part];
    const cover = document.querySelector('.cover');
    if (!partKey || !cover || !window.PART_SIGILS) return;

    if (!cover.querySelector('.cover-constellation') && window.constellationSvg) {
      const constellation = document.createElement('span');
      constellation.className = 'cover-constellation';
      constellation.setAttribute('aria-hidden', 'true');
      constellation.innerHTML = window.constellationSvg(partKey, { pointCount: 7, lineRatio: 0.58 });
      cover.insertBefore(constellation, cover.firstChild);
    }

    if (!cover.querySelector('.cover-sigil') && window.PART_SIGILS[partKey]) {
      const sigil = document.createElement('div');
      sigil.className = 'cover-sigil';
      sigil.setAttribute('aria-hidden', 'true');
      sigil.innerHTML = window.PART_SIGILS[partKey];
      const divider = cover.querySelector('.cover-divider');
      if (divider) {
        cover.insertBefore(sigil, divider);
      } else {
        cover.appendChild(sigil);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPartCoverIdentity);
  } else {
    initPartCoverIdentity();
  }
})();
