// 作品を手で登録する: data/atlas/works.manual.json
// ページの作りが既存のどの型にも当てはまらない作品（新しいシリーズ、単発の作品）は、ここに書けば地図に載る。
// 既存の型（本編・EDU・哲学/数学の静的ページ）に合う作品は、それぞれのアダプタが自動で読むので、ここには書かない。
import { readJson } from '../util.mjs';
import { galaxyLenses } from './human.mjs';

const FILE = 'data/atlas/works.manual.json';

export default function manualWorks(g) {
  const works = readJson(FILE, []);
  let episodes = 0;
  works.forEach((w) => {
    const need = ['id', 'series', 'title', 'summary', 'url'].filter((key) => !w[key]);
    if (need.length) throw new Error(`${FILE}: ${w.id || '(id なし)'} に ${need.join('・')} がありません`);
    if (!/^work:[a-z0-9][a-z0-9-]*$/.test(w.id)) throw new Error(`${FILE}: ${w.id} は work:英小文字・数字・ハイフン の形にしてください`);
    const slug = w.id.replace(/^work:/, ''), questions = w.questions || [];
    g.node({
      id: w.id, type: 'work', series: w.series, number: String(w.number || ''), title: w.title, summary: w.summary, url: w.url,
      ...(w.listSummary && { listSummary: w.listSummary }), ...(w.time && { time: w.time }), ...(w.regions && { regions: w.regions, regionsOrigin: 'curated' }),
      // レンズを書かなければ、題・要約・問い・キーワードから既存の銀河と同じ規則で決める
      lenses: w.lenses || galaxyLenses([w.title.ja, w.summary.ja, questions.join(' '), (w.keywords || []).join(' ')]), lensOrigin: w.lenses ? 'curated' : 'derived:knowledge-galaxy.js',
      keywords: w.keywords || [], status: w.status || 'published', source: { from: FILE, id: slug }
    });
    questions.forEach((text, i) => {
      const qid = `q:${slug}.${i + 1}`;
      g.node({ id: qid, type: 'question', level: 'work', text: { ja: text }, parent: null, source: { from: FILE + '#questions', id: slug } });
      g.edge(w.id, qid, 'asks');
    });
    (w.episodes || []).forEach((e, i) => {
      const eid = `ep:${slug}-${i + 1}`;
      g.node({ id: eid, type: 'episode', work: w.id, order: i + 1, title: { ja: e.title }, ...(e.question && { question: { ja: e.question } }), ...(e.anchor && { anchor: e.anchor }), source: { from: FILE + '#episodes', id: String(i + 1) } });
      g.edge(eid, w.id, 'partOf');
      episodes += 1;
    });
    (w.people || []).forEach((p) => g.edge(w.id, p, 'features', { origin: 'curated' }));
    (w.events || []).forEach((e) => g.edge(w.id, e, 'happenedAt', { origin: 'curated' }));
  });
  return { works: works.length, episodes };
}
