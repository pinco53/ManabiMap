/*
 * 部の紋章（シジル）と固有星座。
 * 各部固有の視覚的アイデンティティを、線画SVG（紋章）と
 * シード決定的な微細な星座パターンとして提供する。
 * stroke=currentColor / fill=none を基本とし、色は呼び出し側の
 * currentColor（部色）を継承する。
 */
(function() {
  'use strict';

  const SIGIL_ATTRS = 'viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';

  const PART_SIGILS = {
    part1: '<svg ' + SIGIL_ATTRS + '>' +
      '<circle cx="24" cy="34" r="9"/>' +
      '<path d="M14 20 q3 -4 0 -8"/>' +
      '<path d="M24 16 q3 -4 0 -8"/>' +
      '<path d="M34 20 q3 -4 0 -8"/>' +
      '</svg>',
    part2: '<svg ' + SIGIL_ATTRS + '>' +
      '<circle cx="12" cy="32" r="1.8" fill="currentColor" stroke="none"/>' +
      '<circle cx="24" cy="14" r="1.8" fill="currentColor" stroke="none"/>' +
      '<circle cx="36" cy="32" r="1.8" fill="currentColor" stroke="none"/>' +
      '<path d="M12 32 Q18 20 24 14"/>' +
      '<path d="M24 14 Q30 20 36 32"/>' +
      '</svg>',
    part3: '<svg ' + SIGIL_ATTRS + '>' +
      '<circle cx="19" cy="24" r="12"/>' +
      '<circle cx="29" cy="24" r="12"/>' +
      '</svg>',
    part4: '<svg ' + SIGIL_ATTRS + '>' +
      '<path d="M24 12 L24 36"/>' +
      '<path d="M24 14 L10 20 L10 34 L24 30"/>' +
      '<path d="M24 14 L38 20 L38 34 L24 30"/>' +
      '</svg>',
    part5: '<svg ' + SIGIL_ATTRS + '>' +
      '<path d="M24 24 c6 0 10 4 10 9 c0 6 -5 10 -11 10 c-7 0 -12 -6 -12 -13 c0 -8 7 -14 15 -14 c9 0 16 8 16 17"/>' +
      '</svg>',
    part6: '<svg ' + SIGIL_ATTRS + '>' +
      '<line x1="8" y1="30" x2="40" y2="30"/>' +
      '<line x1="14" y1="26" x2="14" y2="30"/>' +
      '<line x1="24" y1="24" x2="24" y2="30"/>' +
      '<line x1="34" y1="26" x2="34" y2="30"/>' +
      '<circle cx="24" cy="16" r="2" fill="currentColor" stroke="none"/>' +
      '</svg>',
    part7: '<svg ' + SIGIL_ATTRS + '>' +
      '<path d="M18 14 L34 14 L34 34 L18 34"/>' +
      '<path d="M10 12 L10 30"/>' +
      '</svg>',
    part8: '<svg ' + SIGIL_ATTRS + '>' +
      '<circle cx="15" cy="24" r="9"/>' +
      '<circle cx="33" cy="24" r="9"/>' +
      '</svg>',
    'part8-2': '<svg ' + SIGIL_ATTRS + '>' +
      '<path d="M24 10 L40 22 L40 38 L8 38 L8 22 Z"/>' +
      '<circle cx="24" cy="30" r="4"/>' +
      '</svg>',
    part9: '<svg ' + SIGIL_ATTRS + '>' +
      '<circle cx="24" cy="24" r="13"/>' +
      '<line x1="24" y1="11" x2="24" y2="37"/>' +
      '<path d="M15 16 Q11 24 15 32"/>' +
      '<path d="M33 16 Q37 24 33 32"/>' +
      '</svg>',
    part17: '<svg ' + SIGIL_ATTRS + '>' +
      '<circle cx="13" cy="24" r="5"/>' +
      '<circle cx="35" cy="24" r="5"/>' +
      '<path d="M18 21 C23 16 25 16 30 21"/>' +
      '<path d="M18 27 C23 32 25 32 30 27"/>' +
      '</svg>',
    part18: '<svg ' + SIGIL_ATTRS + '>' +
      '<path d="M7 24 C13 14 19 10 24 10 C29 10 35 14 41 24 C35 34 29 38 24 38 C19 38 13 34 7 24 Z"/>' +
      '<circle cx="24" cy="24" r="6"/>' +
      '<path d="M24 18 C27 21 27 27 24 30"/>' +
      '</svg>'
  };

  function hashSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed;
    return function() {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function constellationSvg(partId, options) {
    const opts = options || {};
    const width = opts.width || 100;
    const height = opts.height || 100;
    const pointCount = opts.pointCount || (5 + (hashSeed(partId) % 3));
    const lineRatio = opts.lineRatio != null ? opts.lineRatio : 0.65;
    const rng = mulberry32(hashSeed(partId + ':constellation'));

    const points = [];
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: 6 + rng() * (width - 12),
        y: 6 + rng() * (height - 12),
        r: 0.7 + rng() * 0.8,
        o: 0.35 + rng() * 0.25
      });
    }

    const lineCount = Math.max(2, Math.round((pointCount - 1) * lineRatio));
    const order = points.map(function(_, i) { return i; });
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    const lines = [];
    for (let i = 0; i < lineCount && i < order.length - 1; i++) {
      lines.push([points[order[i]], points[order[i + 1]]]);
    }

    const lineHtml = lines.map(function(pair) {
      return '<line x1="' + pair[0].x.toFixed(1) + '" y1="' + pair[0].y.toFixed(1) +
        '" x2="' + pair[1].x.toFixed(1) + '" y2="' + pair[1].y.toFixed(1) +
        '" stroke="currentColor" stroke-width="0.75" opacity="0.28"/>';
    }).join('');
    const pointHtml = points.map(function(p) {
      return '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + p.r.toFixed(2) +
        '" fill="currentColor" opacity="' + p.o.toFixed(2) + '"/>';
    }).join('');

    return '<svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none" aria-hidden="true">' +
      lineHtml + pointHtml + '</svg>';
  }

  window.PART_SIGILS = PART_SIGILS;
  window.constellationSvg = constellationSvg;
})();
