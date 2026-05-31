#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const noteDir = path.join(root, 'note_articles');
const rssUrl = 'https://note.com/manabimapcreator/rss';
const months = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
};

function htmlDecode(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function pubDateToDate(value) {
  const match = String(value || '').match(/\w{3},\s+(\d{2})\s+(\w{3})\s+(\d{4})/);
  return match && months[match[2]] ? match[3] + '-' + months[match[2]] + '-' + match[1] : '';
}

function firstTag(block, tag) {
  const match = block.match(new RegExp('<' + tag + '>([\\s\\S]*?)<\\/' + tag + '>'));
  return match ? htmlDecode(match[1].trim()) : '';
}

function parseRss(xml) {
  const items = String(xml || '').match(/<item>[\s\S]*?<\/item>/g) || [];
  const byTitle = new Map();
  for (const item of items) {
    const title = firstTag(item, 'title');
    const link = firstTag(item, 'link');
    if (!title || !link) continue;
    byTitle.set(title, {
      url: link,
      date: pubDateToDate(firstTag(item, 'pubDate'))
    });
  }
  return byTitle;
}

function titleFromMarkdown(text) {
  const match = text.match(/^#\s+(?:note_?\d+\s*[｜|]\s*)?(.+)$/m);
  return match ? match[1].trim() : '';
}

function upsertMeta(text, label, value, afterLabel) {
  const line = '**' + label + '**: ' + value;
  const re = new RegExp('^\\*\\*' + label + '\\*\\*:\\s*.*$', 'm');
  if (re.test(text)) return text.replace(re, line);

  if (afterLabel) {
    const afterRe = new RegExp('^(\\*\\*' + afterLabel + '\\*\\*:\\s*.*)$', 'm');
    if (afterRe.test(text)) return text.replace(afterRe, '$1\n' + line);
  }

  return text.replace(/^(# .+\n)/, '$1\n' + line + '\n');
}

async function main() {
  const response = await fetch(rssUrl, {
    headers: { 'user-agent': 'ManabiMap note RSS sync' }
  });
  if (!response.ok) throw new Error('note RSS HTTP ' + response.status);

  const publishedByTitle = parseRss(await response.text());
  const files = fs.readdirSync(noteDir)
    .filter((file) => /^note_\d+.*\.md$/.test(file))
    .map((file) => path.join(noteDir, file));

  const changed = [];
  for (const file of files) {
    const before = fs.readFileSync(file, 'utf8');
    const item = publishedByTitle.get(titleFromMarkdown(before));
    if (!item) continue;

    let after = before;
    if (item.date) after = upsertMeta(after, '保存日', item.date);
    after = upsertMeta(after, 'URL', item.url, '保存日');
    after = after.replace(/^\*\*公開状態\*\*:\s*.*$/m, '**公開状態**: published');

    if (after !== before) {
      fs.writeFileSync(file, after);
      changed.push(path.relative(root, file));
    }
  }

  console.log('Updated note publication metadata: ' + changed.length);
  changed.forEach((file) => console.log(file));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
