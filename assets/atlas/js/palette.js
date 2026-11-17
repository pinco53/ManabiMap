// Atlas palette: every colour the atlas draws with lives here (docs/manabimap-next/12-star-colour-spec.md).
// A series colour is a formula: lightness and chroma are fixed, only the hue angle is chosen.

export const STAR_CORE = '#fff8ee';
export const STAR_DIM = '#5a6678';
export const STAR_SELECT = '#f1dca9';
export const STAR_TONE = '#dce9ff';
export const PLANNED = '#9fb4c9';

// Tier 1 for published series, tier 2 (lighter, softer) for a second series inside the same family.
const TIER = { 1: [0.8, 0.085], 2: [0.87, 0.05] };

export function oklch(L, C, h) {
  const a = C * Math.cos(h * Math.PI / 180), b = C * Math.sin(h * Math.PI / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return '#' + rgb.map((v) => { v = Math.max(0, Math.min(1, v)); v = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055; return Math.round(v * 255).toString(16).padStart(2, '0'); }).join('');
}

export function mix(a, b, t) {
  const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16), at = (n, s) => (n >> s) & 255;
  return '#' + [16, 8, 0].map((s) => Math.round(at(p, s) + (at(q, s) - at(p, s)) * t).toString(16).padStart(2, '0')).join('');
}

export const hueColor = (hue, tier = 1) => oklch(TIER[tier][0], TIER[tier][1], hue);

const HUE = {
  'series:ai': 48, 'series:philosophy-east': 8, 'series:mind-body': 325, 'series:philosophy-west': 292, 'series:science-thinking': 262,
  'series:math': 228, 'series:words-numbers': 195, 'series:edu': 158, 'series:learning': 122,
  'region:central': 66, 'region:westasia': 48, 'region:southasia': 8, 'region:eastasia': 325, 'region:japan': 292, 'region:europe': 262,
  'region:namerica': 228, 'region:lamerica': 195, 'region:oceania': 122
};
const GOLD = '#d7be8b';

export const SERIES_COLOR = {
  'series:civilization': GOLD, 'region:africa': GOLD,
  'region:cosmos': '#b4becf', 'region:global': STAR_TONE,
  'series:science': '#9fb4c9', 'series:cosmos': '#9fb4c9', 'series:physics': '#9fb4c9', 'series:life': '#9fb4c9', 'series:ai-origins': '#c9b39f', 'series:ohanashi': '#c9a9c0'
};
Object.keys(HUE).forEach((id) => { SERIES_COLOR[id] = hueColor(HUE[id]); });

export const STREAM_COLOR = { 'deep-time': STAR_TONE, 'philosophy-history': '#beb4f1', 'edu-history': '#8ecfa9' };
export const TYPE_COLOR = { question: STAR_SELECT, concept: '#b3dbee', person: '#f2cbb2', lens: STAR_TONE };
export const CONTRAST = '#eea7b3';

// A node's colour: its own colour, then planned (grey), then a hue from series.json, then the table above.
export function seriesColor(node) {
  if (!node) return STAR_TONE;
  if (node.color) return node.color;
  if (node.status === 'planned') return SERIES_COLOR[node.id] || PLANNED;
  if (node.hue !== undefined) return hueColor(node.hue, node.tier === 2 ? 2 : 1);
  return SERIES_COLOR[node.id] || STAR_TONE;
}
