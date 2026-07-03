#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const noteDir = path.join(root, 'note_articles');

const playlists = {
  part8: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyHi5PE81uv7FzZs2pvfWyC',
  revolution: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WwJhGwN9UvRFwgltPZ-Y6ur',
  part4: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WzdYxS9_vc26ueExwm2tXka',
  part5: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WymfiZhA30YZ763uf1VE7Jc',
  part6: 'https://www.youtube.com/playlist?list=PLJ-qAmzHO2WyNGF4SsLElXoXOS4jX_XQp'
};

const groups = {
  part8: [1, 3, 5, 6, 7, 8, 9, 40, 41, 43, 45, 46, 47, 53],
  revolution: [10, 11, 12, 49, 50, 51, 52, 54, 55, 56, 57, 58, 59, 60],
  part4: [13, 14, 15, 16, 17, 18, 19, 61, 62, 63, 64, 65, 66, 67, 83, 84, 85, 86, 87, 88, 89],
  part5: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31],
  part6: [32, 33, 34, 35, 39, 42, 44]
};

const playlistByNumber = new Map();
for (const [group, numbers] of Object.entries(groups)) {
  for (const number of numbers) playlistByNumber.set(number, playlists[group]);
}

function bodyHasPlaylist(text, url) {
  const articleStart = text.indexOf('## 記事');
  return articleStart >= 0 ? text.slice(articleStart).includes(url) : text.includes(url);
}

function insertBodyBlock(text, url) {
  if (bodyHasPlaylist(text, url)) return text;

  const block = `\n\n🎙️ **関連Podcast（連続再生）**\n${url}`;
  const fencedHeading = /(^## 記事\s*\n+```\s*\n+# .+$)/m;
  if (fencedHeading.test(text)) return text.replace(fencedHeading, `$1${block}`);

  const firstDivider = /\n---\s*\n/;
  if (firstDivider.test(text)) return text.replace(firstDivider, (match) => `${match}${block.trim()}\n\n`);

  return `${text.trimEnd()}${block}\n`;
}

function upsertMetadata(text, url) {
  const line = `**関連PodcastURL**: ${url}`;
  if (/^\*\*関連PodcastURL\*\*:/m.test(text)) {
    return text.replace(/^\*\*関連PodcastURL\*\*:.*$/m, line);
  }
  if (/^\*\*URL\*\*:/m.test(text)) {
    return text.replace(/^(\*\*URL\*\*:.*)$/m, `$1\n${line}`);
  }
  return text;
}

const changed = [];
for (const file of fs.readdirSync(noteDir)) {
  const match = file.match(/^note_(\d+).*\.md$/);
  if (!match) continue;
  const number = Number(match[1]);
  const playlistUrl = playlistByNumber.get(number);
  if (!playlistUrl) continue;

  const filePath = path.join(noteDir, file);
  const before = fs.readFileSync(filePath, 'utf8');
  const after = upsertMetadata(insertBodyBlock(before, playlistUrl), playlistUrl);
  if (after === before) continue;
  fs.writeFileSync(filePath, after);
  changed.push(file);
}

console.log(`Updated note podcast playlist metadata/body: ${changed.length}`);
changed.forEach((file) => console.log(file));
