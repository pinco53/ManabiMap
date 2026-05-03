#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const noteDir = path.join(root, 'note_articles');
const noteHtmlPath = path.join(root, 'note.html');
const dataPath = path.join(root, 'assets/js/manabimap-data.js');

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
    .filter((line) => !/^\*\*(対象|保存日|URL|タグ)\*\*:/.test(line))
    .filter((line) => !/^https?:\/\//.test(line))
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

function parseArticle(file) {
  const text = read(file);
  const base = path.basename(file);
  const numberMatch = base.match(/note_(\d+)/);
  if (!numberMatch) return null;

  const number = Number(numberMatch[1]);
  const title = firstHeading(text, number);
  const target = meta(text, '対象');
  const savedAt = meta(text, '保存日');
  const url = meta(text, 'URL');
  const tags = parseTags(text, target);
  const published = /^https?:\/\//.test(url);

  return {
    id: 'note-' + String(number).padStart(2, '0'),
    number,
    title,
    url: published ? url : '',
    status: published ? undefined : 'local-draft',
    date: savedAt,
    target,
    tags,
    relatedParts: relatedParts(target, tags),
    excerpt: excerpt(text, title)
  };
}

function cardHtml(note) {
  const num = '#' + String(note.number).padStart(2, '0');
  const tags = (note.target ? [note.target] : note.tags.map((tag) => '#' + tag))
    .slice(0, 8)
    .map((tag) => '<span class="tag">' + escapeHtml(tag) + '</span>')
    .join('');
  const footer = note.url
    ? [
        note.date ? '        <span class="card-date">' + escapeHtml(note.date) + '</span>' : '        <span></span>',
        '        <span class="card-link">記事を読む →</span>'
      ].join('\n')
    : [
        '        <span></span>',
        '        <span class="card-link card-link--dim">近日公開</span>'
      ].join('\n');
  const inner = [
    '      <div class="card-num">' + num + (note.url ? '' : ' <span class="badge-unpublished">準備中</span>') + '</div>',
    '      <h3 class="card-title">' + escapeHtml(note.title) + '</h3>',
    '      <p class="card-excerpt">' + escapeHtml(note.excerpt) + '</p>',
    '      <div class="card-tags">' + tags + '</div>',
    '      <div class="card-footer">',
    footer,
    '      </div>'
  ].join('\n');

  if (note.url) {
    return [
      '    <a href="' + escapeHtml(note.url) + '" target="_blank" rel="noopener noreferrer" class="note-card">',
      inner,
      '    </a>'
    ].join('\n');
  }

  return [
    '    <div class="note-card note-card--unpublished">',
    inner,
    '    </div>'
  ].join('\n');
}

function updateNoteHtml(notes) {
  let html = read(noteHtmlPath);
  const total = notes.length;
  html = html.replace(/<div class="hero-count">\d+ articles<\/div>/, '<div class="hero-count">' + total + ' articles</div>');
  html = html.replace(/<span id="note-filter-count">\d+ articles<\/span>/, '<span id="note-filter-count">' + total + ' articles</span>');

  const grid = [
    '<section class="grid-section">',
    '  <div class="note-grid">',
    '    ',
    notes.map(cardHtml).join('\n\n'),
    '  </div>',
    '</section>'
  ].join('\n');

  const gridPattern = /<section class="grid-section">[\s\S]*?<\/section>/;
  if (!gridPattern.test(html)) throw new Error('Could not replace note grid in note.html');
  const next = html.replace(gridPattern, grid);
  write(noteHtmlPath, next);
}

function jsValue(value) {
  return JSON.stringify(value);
}

function noteObject(note) {
  const props = [
    "id: 'note-" + String(note.number).padStart(2, '0') + "'",
    'number: ' + note.number,
    'title: ' + jsValue(note.title)
  ];
  if (note.url) props.push('url: ' + jsValue(note.url));
  if (note.status) props.push('status: ' + jsValue(note.status));
  props.push('tags: ' + jsValue(note.tags));
  props.push('relatedParts: ' + jsValue(note.relatedParts));
  return '    { ' + props.join(', ') + ' }';
}

function updateData(notes) {
  const data = read(dataPath);
  const notesAsc = notes.slice().sort((a, b) => a.number - b.number);
  const notesBlock = '  const notes = [\n' + notesAsc.map(noteObject).join(',\n') + '\n  ];';
  const notesPattern = /  const notes = \[[\s\S]*?\n  \];\n\n  const routes = \[/;
  if (!notesPattern.test(data)) throw new Error('Could not replace notes in manabimap-data.js');
  const next = data.replace(notesPattern, notesBlock + '\n\n  const routes = [');
  write(dataPath, next);
}

function main() {
  const files = fs.readdirSync(noteDir)
    .filter((file) => /^note_\d+.*\.md$/.test(file))
    .map((file) => path.join(noteDir, file));
  const notes = files
    .map(parseArticle)
    .filter(Boolean)
    .sort((a, b) => b.number - a.number);

  updateNoteHtml(notes);
  updateData(notes);
  console.log('Synced ' + notes.length + ' note articles.');
}

main();
