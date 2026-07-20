#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const noteDir = path.join(root, 'note_articles');
const noteImageDir = path.join(noteDir, 'generated_note_images');
const noteHtmlPath = path.join(root, 'note.html');
const dataPath = path.join(root, 'assets/js/manabimap-data.js');
const maxNoteNumber = Number(process.env.MAX_NOTE_NUMBER || 0);
const shouldSyncNoteImages = process.env.SYNC_NOTE_IMAGES !== '0';
const publishedYouTubeIds = new Set(String(process.env.PUBLISHED_YOUTUBE_IDS || '').split(',').map((id) => id.trim()).filter(Boolean));
let trackedFiles = null;

const partMeta = {
  part1: { orbit: 'PART 01 ORBIT', label: '第1部 蒸気の時代', href: 'parts/part1.html', relation: '機械と時間の枝道' },
  part2: { orbit: 'PART 02 ORBIT', label: '第2部 つながる世界', href: 'parts/part2.html', relation: 'つながりと思考の枝道' },
  part3: { orbit: 'PART 03 ORBIT', label: '第3部 AIと生きる未来', href: 'parts/part3.html', relation: 'AIと人間の枝道' },
  part4: { orbit: 'PART 04 ORBIT', label: '第4部 文字と知識の冒険', href: 'parts/part4.html', relation: '知識と記録の枝道' },
  part5: { orbit: 'PART 05 ORBIT', label: '第5部 言葉と思考の旅', href: 'parts/part5.html', relation: '言葉と思考の枝道' },
  part6: { orbit: 'PART 06 ORBIT', label: '第6部 数字と世界', href: 'parts/part6.html', relation: '数と社会の枝道' },
  part7: { orbit: 'PART 07 ORBIT', label: '第7部 人間の前提を外す', href: 'parts/part7.html', relation: '前提を外す枝道' },
  part8: { orbit: 'PART 08 ORBIT', label: '第8部 AIと人間のあいだ', href: 'parts/part8.html', relation: '生成AIの枝道' },
  'part8-2': { orbit: 'PART 08 ORBIT', label: '第8部 AIが日常に入る日', href: 'parts/part8_2.html', relation: '教育と日常の枝道' },
  part9: { orbit: 'PART 09 ORBIT', label: '第9部 身体という時間', href: 'parts/part9.html', relation: '身体と進化の枝道' },
  evolution: { orbit: 'HISTORY ORBIT', label: '進化の年表', href: 'evolution.html', relation: '人類史から伸びる枝道' },
  note: { orbit: 'NOTE ORBIT', label: 'note記事群', href: 'note.html', relation: '制作と学びの枝道' }
};

const questionByPart = {
  part1: '機械は人間を何から解放し、何に縛ったのか。',
  part2: 'つながることは、近づくことと同じなのか。',
  part3: 'AIが考えているように見えるとき、人間が考えるとは何か。',
  part4: '検索できることと、理解していることは同じなのか。',
  part5: '言葉がない世界では、思考はどのように存在するのか。',
  part6: '数字で測れるものだけが、価値あるものなのか。',
  part7: '人間の当たり前を外すと、世界はどう見え直すのか。',
  part8: '生成AIは、何を生成しているのか。',
  'part8-2': 'AIが宿題を解ける時代に、学力とは何か。',
  part9: '旧石器時代の身体で、生成AI時代をどう生きるのか。',
  evolution: 'いま見ている問いは、人類史のどこから来たのか。',
  note: '学ぶとは、答えを増やすことか、問いを増やすことか。'
};

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, content) {
  fs.writeFileSync(file, content);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeTitle(line, number) {
  return line
    .replace(/^#\s*/, '')
    .replace(new RegExp('^note_?0*' + number + '\\s*[｜|]\\s*'), '')
    .trim();
}

function meta(text, label) {
  const re = new RegExp('^\\*\\*' + label + '\\*\\*:\\s*(.*)$', 'm');
  const match = text.match(re);
  return match ? match[1].trim() : '';
}

function firstMeta(text, labels) {
  for (const label of labels) {
    const value = meta(text, label);
    if (value) return value;
  }
  return '';
}

function firstHeading(text, number) {
  const lines = text.split(/\r?\n/);
  const top = lines.find((line) => /^#\s+/.test(line));
  if (top) return normalizeTitle(top, number);

  const fenced = text.match(/```[\s\S]*?^#\s+(.+)$/m);
  return fenced ? fenced[1].trim() : 'note article';
}

function stripMarkdown(value) {
  return String(value || '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .replace(/^#+\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(text, title) {
  const cleaned = text
    .replace(/^---$/gm, '')
    .replace(/^```$/gm, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^#\s+/.test(line))
    .filter((line) => !/^##\s+/.test(line))
    .filter((line) => !/^\*\*[^*]+\*\*:/.test(line))
    .filter((line) => !/^https?:\/\//.test(line))
    .filter((line) => !/関連Podcast（連続再生）/.test(line))
    .filter((line) => !/^→/.test(line))
    .filter((line) => stripMarkdown(line) !== title);

  const body = cleaned.find((line) => {
    const plain = stripMarkdown(line);
    return plain.length >= 8 && !plain.includes('あなたのURL');
  });
  const plain = stripMarkdown(body || '');
  return plain.length > 96 ? plain.slice(0, 96) + '…' : plain;
}

function parseTags(text, target) {
  const tagLine = meta(text, 'タグ');
  const tags = [];
  if (tagLine) {
    tagLine.split(/\s+/).forEach((item) => {
      const tag = item.replace(/^#/, '').trim();
      if (tag) tags.push(tag);
    });
  }

  const hashSection = text.split(/##\s*ハッシュタグ/)[1] || '';
  (hashSection.match(/#[^\s#]+/g) || []).forEach((item) => {
    const tag = item.replace(/^#/, '').trim();
    if (tag) tags.push(tag);
  });

  if (!tags.length && target) {
    target.split(/[、,\s×→・／/]+/).forEach((item) => {
      const tag = item.trim();
      if (tag && tag.length <= 18) tags.push(tag);
    });
  }

  return Array.from(new Set(tags));
}

function relatedParts(target, tags) {
  const source = [target].concat(tags).join(' ');
  const parts = [];
  if (/第9部/.test(source)) parts.push('part9');
  if (/第1部|産業革命|蒸気/.test(source)) parts.push('part1');
  if (/第2部|デジタル|SNS|通信|つながり|孤独/.test(source)) parts.push('part2');
  if (/第3部|AI革命|ChatGPT|生成AI/.test(source)) parts.push('part3');
  if (/第4部|文字|知識|検索|読書|記録/.test(source)) parts.push('part4');
  if (/第5部|言葉|言語|思考|内なる声|名前/.test(source)) parts.push('part5');
  if (/第6部|数|数字|統計|平均|測る|物差し|定規|無限|ゼロ/.test(source)) parts.push('part6');
  if (/第7部|前提|天才|アインシュタイン|チューリング/.test(source)) parts.push('part7');
  if (/第8部|AI|宿題|学力|共通テスト|教育/.test(source)) {
    if (/宿題|学力|共通テスト|教育|幸せ|幸福/.test(source)) parts.push('part8-2');
    parts.push('part8');
  }
  if (/サイト|ManabiMap|制作|Gemini|サムネ|学びの地図/.test(source)) parts.push('note');
  if (/進化|人類史|宇宙|生命/.test(source)) parts.push('evolution');
  return Array.from(new Set(parts));
}

function publicUrl(value) {
  return /^https?:\/\//.test(String(value || '').trim()) ? String(value).trim() : '';
}

function youtubeVideoId(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  return shortMatch ? shortMatch[1] : '';
}

function existingPublicYoutubeUrls() {
  try {
    const data = read(dataPath);
    return new Set(Array.from(data.matchAll(/https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/g)).map((match) => match[0]));
  } catch (error) {
    return new Set();
  }
}

function canExposeYoutubeUrl(url, existingUrls) {
  if (!url) return false;
  if (url.includes('playlist?list=')) return true;
  if (existingUrls.has(url)) return true;
  const id = youtubeVideoId(url);
  return id && publishedYouTubeIds.has(id);
}

function isPublishedStatus(value) {
  return String(value || '').trim().toLowerCase() === 'published';
}

function primaryPartId(note) {
  if (note.primaryPart && partMeta[note.primaryPart]) return note.primaryPart;
  const parts = note.relatedParts || [];
  return parts.find((id) => partMeta[id] && id !== 'note') || parts.find((id) => partMeta[id]) || 'note';
}

function branchInfo(note) {
  const partId = primaryPartId(note);
  const meta = partMeta[partId] || partMeta.note;
  return {
    partId,
    orbitLabel: meta.orbit,
    mapNodeLabel: meta.label,
    mapNodeUrl: meta.href,
    relation: meta.relation,
    question: questionByPart[partId] || note.title
  };
}

function noteImageSrc(number) {
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  for (const ext of extensions) {
    const file = path.join(noteImageDir, 'note-' + number + '.' + ext);
    if (fs.existsSync(file)) {
      return path.relative(root, file).split(path.sep).join('/');
    }
  }
  return '';
}

function gitTrackedArticleFiles() {
  if (trackedFiles) return trackedFiles;
  try {
    const output = execFileSync('git', ['ls-files', 'note_articles/note_*.md'], {
      cwd: root,
      encoding: 'utf8'
    });
    trackedFiles = new Set(output.split(/\r?\n/).filter(Boolean));
  } catch (error) {
    trackedFiles = new Set();
  }
  return trackedFiles;
}

function shouldPublishArticleFile(file, note) {
  if (note.url) return true;
  const relative = path.relative(root, file).split(path.sep).join('/');
  return gitTrackedArticleFiles().has(relative);
}

function htmlDecode(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function ogImageUrl(html) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metaTags) {
    const property = attrValue(tag, 'property') || attrValue(tag, 'name');
    if (!/^(og:image|twitter:image|thumbnail)$/i.test(property)) continue;

    const content = attrValue(tag, 'content');
    if (content) return htmlDecode(content);
  }
  return '';
}

function attrValue(tag, name) {
  const match = tag.match(new RegExp('\\s' + name + '=["\']([^"\']+)["\']', 'i'));
  return match ? match[1] : '';
}

function imageExtension(contentType, imageUrl) {
  const type = String(contentType || '').toLowerCase();
  if (type.includes('png')) return 'png';
  if (type.includes('webp')) return 'webp';
  if (type.includes('gif')) return 'gif';
  if (type.includes('jpeg') || type.includes('jpg')) return 'jpg';

  const cleanUrl = String(imageUrl || '').split('?')[0].toLowerCase();
  const match = cleanUrl.match(/\.(png|jpe?g|webp|gif)$/);
  if (!match) return 'jpg';
  return match[1] === 'jpeg' ? 'jpg' : match[1];
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'ManabiMap thumbnail sync'
    }
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'ManabiMap thumbnail sync'
    }
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  const contentType = response.headers.get('content-type') || '';
  const buffer = Buffer.from(await response.arrayBuffer());
  return { buffer, contentType };
}

async function syncMissingNoteImage(note) {
  if (!shouldSyncNoteImages || note.image || !note.url) return false;

  try {
    const html = await fetchText(note.url);
    const rawImageUrl = ogImageUrl(html);
    if (!rawImageUrl) return false;

    const absoluteImageUrl = new URL(rawImageUrl, note.url).toString();
    const image = await fetchBuffer(absoluteImageUrl);
    const ext = imageExtension(image.contentType, absoluteImageUrl);
    fs.mkdirSync(noteImageDir, { recursive: true });
    fs.writeFileSync(path.join(noteImageDir, 'note-' + note.number + '.' + ext), image.buffer);
    note.image = noteImageSrc(note.number);
    return Boolean(note.image);
  } catch (error) {
    console.warn('Could not sync note image #' + note.number + ': ' + error.message);
    return false;
  }
}

async function syncMissingNoteImages(notes) {
  if (!shouldSyncNoteImages) return 0;
  let synced = 0;
  for (const note of notes) {
    if (await syncMissingNoteImage(note)) synced += 1;
  }
  return synced;
}

function parseArticle(file) {
  const text = read(file);
  const base = path.basename(file);
  const numberMatch = base.match(/note_(\d+)/);
  if (!numberMatch) return null;

  const number = Number(numberMatch[1]);
  const title = firstHeading(text, number);
  const target = meta(text, '対象');
  const savedAt = meta(text, '保存日');
  const rawUrl = publicUrl(meta(text, 'URL'));
  const explicitStatus = firstMeta(text, ['公開状態', 'status']);
  const articleKind = firstMeta(text, ['記事種別', '種別', 'type']) || (/^\*\*YouTube（ポッドキャスト）\*\*:/m.test(text) ? 'wonder-note' : '');
  const primaryPart = firstMeta(text, ['主対象パート', 'primaryPart']);
  const relatedPodcastId = firstMeta(text, ['関連PodcastID', '関連Podcast']);
  const relatedPodcastUrl = publicUrl(firstMeta(text, ['関連PodcastURL', 'YouTube（ポッドキャスト）']));
  const relatedYouTubeId = firstMeta(text, ['関連YouTubeID']);
  const relatedYouTubeUrl = publicUrl(firstMeta(text, ['関連YouTubeURL']));
  const ctaCopy = firstMeta(text, ['CTA文言', 'CTA']);
  const tags = parseTags(text, target);
  const status = explicitStatus || (rawUrl ? 'published' : 'local-draft');
  const published = rawUrl && isPublishedStatus(status);

  return {
    id: 'note-' + String(number).padStart(2, '0'),
    number,
    title,
    url: published ? rawUrl : '',
    status,
    kind: articleKind,
    date: savedAt,
    target,
    tags,
    relatedParts: relatedParts(target, tags),
    primaryPart,
    relatedPodcastId,
    relatedPodcastUrl,
    relatedYouTubeId,
    relatedYouTubeUrl,
    ctaCopy,
    image: noteImageSrc(number),
    excerpt: excerpt(text, title)
  };
}

function cardHtml(note) {
  const branch = branchInfo(note);
  const num = '#' + String(note.number).padStart(2, '0');
  const cardId = 'note-card-' + note.number;
  const tags = (note.target ? [note.target] : note.tags.map((tag) => '#' + tag))
    .slice(0, 8)
    .map((tag) => '<span class="tag">' + escapeHtml(tag) + '</span>')
    .join('');
  const readAction = note.url
    ? '        <a class="card-action card-action--read" href="' + escapeHtml(note.url) + '" target="_blank" rel="noopener noreferrer" data-note-read-link>読む</a>'
    : '        <span class="card-action card-action--disabled">近日公開</span>';
  const mediaTag = note.url ? 'a' : 'div';
  const mediaAttrs = note.url
    ? ' href="' + escapeHtml(note.url) + '" target="_blank" rel="noopener noreferrer" data-note-read-link'
    : '';
  const mediaHtml = note.image
    ? [
        '      <' + mediaTag + ' class="note-card-media"' + mediaAttrs + '>',
        '        <img src="' + escapeHtml(note.image) + '" alt="' + escapeHtml(note.title) + ' サムネイル" loading="lazy">',
        '        <span class="note-card-media__label">NOTE THUMBNAIL</span>',
        '      </' + mediaTag + '>'
      ].join('\n')
    : '';
  const kindBadge = note.kind === 'wonder-note'
    ? '      <div class="card-kind">WONDER NOTE</div>'
    : '';
  const inner = [
    mediaHtml,
    '      <div class="card-orbit-label">' + escapeHtml(branch.orbitLabel) + '</div>',
    kindBadge,
    '      <div class="card-num">' + num + (note.url ? '' : ' <span class="badge-unpublished">準備中</span>') + '</div>',
    '      <h3 class="card-title">' + escapeHtml(note.title) + '</h3>',
    '      <div class="card-branch">',
    '        <span class="card-branch__eyebrow">この地図ノードから</span>',
    '        <a class="card-branch__node" href="' + escapeHtml(branch.mapNodeUrl) + '">' + escapeHtml(branch.mapNodeLabel) + '</a>',
    '        <span class="card-branch__tail">伸びる枝道</span>',
    '      </div>',
    '      <p class="card-question">問：' + escapeHtml(branch.question) + '</p>',
    '      <p class="card-excerpt">' + escapeHtml(note.excerpt) + '</p>',
    '      <div class="card-tags">' + tags + '</div>',
    '      <div class="card-footer">',
    '        ' + (note.date ? '<span class="card-date">' + escapeHtml(note.date) + '</span>' : '<span></span>'),
    '        <div class="card-actions">',
    readAction,
    '          <a class="card-action card-action--map" href="' + escapeHtml(branch.mapNodeUrl) + '">地図で見る</a>',
    '        </div>',
    '      </div>'
  ].join('\n');

  return [
    '    <article id="' + cardId + '" class="note-card' + (note.image ? ' note-card--has-image' : '') + (note.url ? '' : ' note-card--unpublished') + '" data-note-id="' + escapeHtml(note.id) + '" data-primary-part="' + escapeHtml(branch.partId) + '">',
    inner,
    '    </article>'
  ].join('\n');
}

function updateNoteHtml(notes) {
  let html = read(noteHtmlPath);
  const publishedNotes = notes.filter((note) => note.url);
  html = html.replace(/<div class="hero-count">\d+ articles<\/div>/, '<div class="hero-count">' + publishedNotes.length + ' articles</div>');
  html = html.replace(/<span id="note-filter-count">\d+ articles<\/span>/, '<span id="note-filter-count">' + publishedNotes.length + ' articles</span>');

  const publishedGrid = [
    '<section class="grid-section">',
    '  <div class="note-grid">',
    publishedNotes.map(cardHtml).join('\n\n'),
    '  </div>',
    '</section>'
  ].join('\n');

  const gridPattern = /<section class="grid-section">[\s\S]*?<\/section>(?:\n\n<section class="upcoming-section"[\s\S]*?<\/section>)?/;
  if (!gridPattern.test(html)) throw new Error('Could not replace note grid in note.html');
  const next = html.replace(gridPattern, publishedGrid);
  write(noteHtmlPath, next);
}

function jsValue(value) {
  return JSON.stringify(value);
}

function noteObject(note, existingYoutubeUrls) {
  const branch = branchInfo(note);
  const props = [
    "id: 'note-" + String(note.number).padStart(2, '0') + "'",
    'number: ' + note.number,
    'title: ' + jsValue(note.title)
  ];
  if (note.url) props.push('url: ' + jsValue(note.url));
  if (note.status) props.push('status: ' + jsValue(note.status));
  if (note.kind) props.push('kind: ' + jsValue(note.kind));
  if (note.date) props.push('date: ' + jsValue(note.date));
  if (note.target) props.push('target: ' + jsValue(note.target));
  props.push('tags: ' + jsValue(note.tags));
  props.push('relatedParts: ' + jsValue(note.relatedParts));
  if (note.relatedPodcastId) props.push('relatedPodcastId: ' + jsValue(note.relatedPodcastId));
  if (canExposeYoutubeUrl(note.relatedPodcastUrl, existingYoutubeUrls)) props.push('relatedPodcastUrl: ' + jsValue(note.relatedPodcastUrl));
  if (note.relatedYouTubeId) props.push('relatedYouTubeId: ' + jsValue(note.relatedYouTubeId));
  if (canExposeYoutubeUrl(note.relatedYouTubeUrl, existingYoutubeUrls)) props.push('relatedYouTubeUrl: ' + jsValue(note.relatedYouTubeUrl));
  if (note.ctaCopy) props.push('ctaCopy: ' + jsValue(note.ctaCopy));
  if (note.image) props.push('image: ' + jsValue(note.image));
  props.push('question: ' + jsValue(branch.question));
  props.push('relation: ' + jsValue(branch.relation));
  props.push('primaryPart: ' + jsValue(branch.partId));
  props.push('excerpt: ' + jsValue(note.excerpt));
  return '    { ' + props.join(', ') + ' }';
}

function updateData(notes) {
  const data = read(dataPath);
  const notesAsc = notes.slice().sort((a, b) => a.number - b.number);
  const existingYoutubeUrls = existingPublicYoutubeUrls();
  const notesBlock = '  const notes = [\n' + notesAsc.map((note) => noteObject(note, existingYoutubeUrls)).join(',\n') + '\n  ];';
  const notesPattern = /  const notes = \[[\s\S]*?\n  \];\n\n  const routes = \[/;
  if (!notesPattern.test(data)) throw new Error('Could not replace notes in manabimap-data.js');
  const next = data.replace(notesPattern, notesBlock + '\n\n  const routes = [');
  write(dataPath, next);
}

async function main() {
  const files = fs.readdirSync(noteDir)
    .filter((file) => /^note_\d+.*\.md$/.test(file))
    .filter((file) => {
      if (!maxNoteNumber) return true;
      const match = file.match(/^note_(\d+)/);
      return match && Number(match[1]) <= maxNoteNumber;
    })
    .map((file) => path.join(noteDir, file));
  const notes = files
    .map((file) => ({ file, note: parseArticle(file) }))
    .filter((item) => item.note && shouldPublishArticleFile(item.file, item.note))
    .map((item) => item.note)
    .sort((a, b) => b.number - a.number);

  const syncedImages = await syncMissingNoteImages(notes);
  updateNoteHtml(notes);
  updateData(notes);
  console.log('Synced ' + notes.length + ' note articles.');
  if (syncedImages) console.log('Synced ' + syncedImages + ' note thumbnails.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
