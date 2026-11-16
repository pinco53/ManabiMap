// 哲学史: assets/js/philosophy-history-data.js — read only.
import { loadGlobals, parseJaDate } from '../util.mjs';

const SOURCE = 'assets/js/philosophy-history-data.js';
export default function philosophyHistory(g) {
  const groups = loadGlobals([SOURCE]).MANABI_PHILOSOPHY_HISTORY;
  g.node({ id: 'page:philosophy-history', type: 'page', title: { ja: '哲学の歴史' }, url: { ja: 'philosophy-history.html' } });
  let count = 0;
  groups.forEach((group) => group.entries.forEach((e) => {
    const time = parseJaDate(e.date);
    g.node({ id: `event:phist-${group.id}-${e.id}`, type: 'event', stream: 'philosophy-history', lane: group.id, title: { ja: e.title }, summary: { ja: e.essence }, region: e.region,
      question: { ja: e.question }, time: time ? [{ ...time, label: { ja: e.date } }] : [], timeLabel: { ja: e.date }, lenses: ['lens:philosophy'],
      sources: e.source ? [{ href: e.source }] : [], source: { from: SOURCE, id: e.id } });
    count += 1;
  }));
  return { entries: count, lanes: groups.length };
}
