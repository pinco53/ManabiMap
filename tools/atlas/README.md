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

## テスト

Playwright が必要です（サイト自体の依存ではありません）。リポジトリ直下で `python3 -m http.server 8765` を起動した状態で実行します。

```bash
node tools/atlas/tests/atlas.e2e.cjs
```

```bash
node tools/atlas/tests/site.e2e.cjs
```

前者は試作ページ、後者は Atlas の作品一覧を読む既存ページ（トップの銀河、`map.html`）と、変わってはいけないページの確認です。

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
| `series.json`、`families.json` | シリーズと系統。`match` は静的ページのファイル名、`mediaMatch` は先行するメディアのID、`people`・`concepts` は作品ができる前の入口 |
| `lenses.json` | レンズ（現行の銀河5種・年表10種との対応つき） |
| `people.json` | 静的ページに登場する人物、構想中のシリーズに関わる人物 |
| `concepts.json` | 概念辞書。`aliases` は既存データの語、`works` は追加で結びつける作品 |
| `questions.json` | 大きな問いと、作品の問いの親子関係 |
| `works.overrides.json` | 作品への追記（いまは時間の範囲） |
| `links.json` | 出来事どうしの対応（`sameAs`）、作品と出来事、出来事と人物、概念と出来事（`about`＝系譜） |
| `research-places.json` | 研究が行われた場所（大学・都市）。学習・認知・発達の作品の地域の手がかり |
| `places.json` | 場所の台帳。地域の定義と、出来事・人物ごとの地域・おおよその緯度経度 |
| `edges.json` | 理由つきの接続（`why` 必須）。作品どうしの橋（`bridges`）、出来事や人物の影響（`influences`）と対比（`contrasts`）。`review: "pending"` は内容の確認待ち。確認したら `"ok"` に書き換える |
| `edges.suggested.json` | 接続の候補。公開データには入らない |
| `id-registry.json` | 固定 ID の台帳（下記）。手では消さない |
| `retired-ids.json`（任意） | 意図して廃止した ID の一覧 |

| 書き出す | 内容 |
|---|---|
| `assets/atlas/data/atlas-core.json` | シリーズ・作品・概念・問い・人物・レンズ・道 |
| `assets/atlas/data/atlas-events.json` | 出来事 |
| `assets/atlas/data/atlas-detail.json` | 話・note・Podcast・動画・研究 |
| `assets/atlas/data/atlas-works.js` | 公開中の全作品の一覧（`window.ManabiAtlasWorks`）。トップの銀河と `map.html` が読む |
| `assets/atlas/data/atlas-bridges.js` | 作品ごとの「別シリーズへの橋」と「同じ問いの別の答え」（`window.ManabiAtlasBridges`）。作品ページの末尾に出る |
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

## 新しいシリーズを足すには

1. `data/atlas/series.json` に1件追加する（`id`、`title`、`summary`、`status`）。作品がまだ無ければ `status: "planned"`。
2. 作品ページが哲学・数学と同じ作りなら、`match` にファイル名の正規表現を書くだけで作品・話・問い・年表が取り込まれる。
3. `data/atlas/concepts.json` の該当する語の `works` に作品を足す（2語以上）。
4. `data/atlas/questions.json` の `parents` に、作品の問いの親を書く。
5. `data/atlas/edges.json` に、既存作品への橋を理由つきで書く（最初の作品は3本、以降は1本以上）。
6. `node tools/atlas/build.mjs --assign-ids` を実行し、レポートの「編集待ち」を確認する。
