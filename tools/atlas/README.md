# tools/atlas — Atlas データのビルド

既存サイトのデータを**読むだけ**で1つの知識グラフにまとめ、検証し、静的 JSON を書き出します。
設計は [`docs/manabimap-next/`](../../docs/manabimap-next/README.md) を参照してください。

必要なもの：Node 20 以上。外部ライブラリは使いません（`npm install` 不要）。

## 使い方

ビルド（取り込み → 検証 → 書き出し）：

```bash
node tools/atlas/build.mjs
```

検証のみ（生成物が最新でなければ失敗。CI 用）：

```bash
node tools/atlas/build.mjs --check
```

年表などに出来事を足したあと、新しい固定 ID を割り当てる：

```bash
node tools/atlas/build.mjs --assign-ids
```

## 何を読み、何を書くか

| 読む（変更しない） | アダプタ |
|---|---|
| `assets/js/manabimap-data.js`、`manabimap-en.js` | `adapters/human.mjs` |
| `assets/js/edu-data/*.js` | `adapters/edu.mjs` |
| `assets/js/philosophy-history-data.js` | `adapters/philosophy-history.mjs` |
| `evolution.html`、`en/evolution.html`、`evolution-deep-time.js`、`evolution-philosophy.js` | `adapters/timeline.mjs` |
| `parts/philosophy*.html`、`eastern*.html`、`math*.html` | `adapters/static-parts.mjs` |

| 人が編集する（`data/atlas/`） | 内容 |
|---|---|
| `series.json`、`families.json` | シリーズと系統。`match` は静的ページのファイル名との対応 |
| `lenses.json` | レンズ（現行の銀河5種・年表10種との対応つき） |
| `people.json` | 静的ページに登場する人物 |
| `edges.json` | 理由つきの横断接続（`why` 必須） |
| `edges.suggested.json` | 接続の候補。公開データには入らない |
| `id-registry.json` | 固定 ID の台帳（下記）。手では消さない |
| `retired-ids.json`（任意） | 意図して廃止した ID の一覧 |

| 書き出す | 内容 |
|---|---|
| `assets/atlas/data/atlas-core.json` | シリーズ・作品・概念・問い・人物・レンズ・道 |
| `assets/atlas/data/atlas-events.json` | 出来事 |
| `assets/atlas/data/atlas-detail.json` | 話・note・Podcast・動画・研究 |
| `assets/atlas/data/atlas-index.json` | ID の一覧と件数（次回ビルドとの比較用） |
| `docs/manabimap-next/reports/atlas-report.md` | 件数・編集待ち・注意の一覧 |

## 固定 ID の考え方

年表の出来事などは元データに ID がありません。初めて見たときに ID を決めて `id-registry.json` に記録し、
以後は同じものに同じ ID を返します。出来事を途中に足したり並べ替えたりしても、既存の ID は変わりません。

- 題や日付を書き換えると「同じもの」と見なせなくなります。その場合はビルドが止まるので、
  `id-registry.json` の該当キーを新しい題に書き換えてください（ID はそのまま）。
- 公開済みの ID が消えるとエラーになります。意図した廃止なら `retired-ids.json` に ID を書きます。

## 検証の3段階

| 段階 | 意味 | ビルド |
|---|---|---|
| エラー | 構造が壊れている（ID 重複、参照先なし、ファイルなし、時間の矛盾、件数の急減、公開済み ID の消失） | 止まる |
| 編集待ち | 人が埋める必要がある（時間、概念、問いの親子、橋の理由文など） | 止まらない |
| 注意 | 見ておくとよい（孤立、統合候補、固定 ID の対応先なし） | 止まらない |
