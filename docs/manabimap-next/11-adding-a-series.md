# 11. 新しいシリーズ・作品の足し方

科学・宇宙・物理・生命・AIの源流・おはなし おはなし…と、興味に応じてシリーズが増えていく前提の手順書です。
**置き場所や分類表を先に決める必要はありません。** 下の6つを書けば、銀河・時の河・問いの星座・世界・リスト、
トップの銀河、地図ページ、作品ページの橋のすべてに自動で現れます。

編集するのは `data/atlas/` の中のファイルだけです。

## いちばん短い流れ

| # | やること | ファイル | 必須 |
|---|---|---|---|
| 0 | 作品ページを作る（従来どおり、どんな作りでもよい） | `parts/…html` など | ○ |
| 1 | シリーズを1件足す（既にあるシリーズなら不要） | `series.json` | ○ |
| 2 | 作品を登録する | `works.manual.json` | ○ ※ |
| 3 | 概念に結びつける（2つ以上） | `concepts.json` | ○ |
| 4 | 作品の問いを、大きな問いに結びつける | `questions.json` | ○ |
| 5 | 既存の作品への橋を、理由つきで書く（シリーズ最初の作品は3本、以降は1本以上） | `edges.json` | ○ |
| 6 | ビルドして、レポートの「編集待ち」を見る | — | ○ |

※ 作品ページが哲学・数学シリーズと同じ作りなら、2の代わりに `series.json` の `match` にファイル名の規則を書くだけで、
題・話・問い・年表まで自動で読み取られます（下の「既存の型に合わせる場合」）。

## 1. シリーズを足す — `series.json`

```json
{ "id": "series:cosmos", "title": { "ja": "宇宙" }, "summary": { "ja": "星と銀河の成り立ちから、宇宙の中の私たちを考える。" }, "status": "published", "color": "#8fb8ff", "mark": "宇" }
```

| 項目 | 意味 |
|---|---|
| `id` | `series:` ＋ 英小文字・数字・ハイフン。**一度公開したら変えない** |
| `title` `summary` | 名前と一言の説明 |
| `status` | `published`（作品がある）／`planned`（構想中。点線の輪郭で表示される） |
| `color` | 任意。地図上の色。書かなければ淡い白 |
| `mark` | 任意。トップの銀河で星の横に出る短い印（「西哲1」の「西哲」にあたる） |
| `family` | 任意。近いシリーズをゆるく束ねる（例：`family:science`）。銀河で隣に置かれる |

構想中として登録済みのシリーズ（科学・宇宙・物理・生命・AIの源流・おはなし おはなし）は、最初の作品ができたら `status` を `published` に変えます。

- **作品が1本だけでもシリーズにできます。**
- シリーズを分けたり名前を変えたりしても、作品のIDは変わりません。

## 2. 作品を登録する — `works.manual.json`

```json
{
  "id": "work:cosmos1", "series": "series:cosmos", "number": 1,
  "title": { "ja": "星はなぜ光るのか" },
  "summary": { "ja": "核融合から元素の誕生まで、星の一生をたどる。" },
  "listSummary": { "ja": "星の一生と、元素の誕生。全10話の学びの地図。" },
  "url": { "ja": "parts/cosmos1.html" },
  "questions": ["私たちの体の材料は、どこで作られたのか。", "遠い星の光から、なぜ昔のことが分かるのか。"],
  "keywords": ["恒星", "核融合", "元素"],
  "time": [{ "start": -13600000000, "end": 2026, "precision": "geologic" }],
  "regions": ["region:cosmos"],
  "events": ["event:first-stars-galaxies"],
  "people": [],
  "episodes": [{ "title": "太陽は、何を燃やしているのか", "question": "燃えるとは、どういうことか", "anchor": "ep1" }]
}
```

| 項目 | 必須 | 意味 |
|---|---|---|
| `id` | ○ | `work:` ＋ 英小文字・数字・ハイフン。作品ページのファイル名と同じにしておくと、ページ末尾の橋が自動で出る |
| `series` `title` `summary` `url` | ○ | 所属・題・要約・ページの場所 |
| `number` | — | 第何部か |
| `listSummary` | — | 地図ページのカードに出す短い文。無ければ `summary` |
| `questions` | 推奨 | この作品の問い。1〜3つ |
| `time` | 推奨 | 扱う時代の範囲。西暦年（紀元前1年が0、紀元前2年が−1）。`precision` は exact／circa／century／era／geologic |
| `regions` | 推奨 | 地域。`region:europe` など（一覧は `places.json`）。書かなければ、結びつけた出来事・人物・研究から自動で決まる |
| `events` `people` | — | 年表の出来事や人物のID。結びつけると、時の河・世界地図・年表から行き来できる |
| `episodes` | — | 話の一覧 |
| `keywords` | — | 検索とレンズの手がかり |
| `lenses` | — | 切り口（`lens:energy` など）。書かなければ題・要約・問いから自動で決まる |

### 既存の型に合わせる場合

作品ページを哲学・数学シリーズ（`parts/philosophy1.html` など）と同じ構造で作るなら、`works.manual.json` には書かず、
`series.json` に `"match": "^cosmos\\d+\\.html$"` と書くだけです。題・要約・全話・考えてみたい問い・年表が自動で取り込まれます。

### 作品ページの末尾に橋を出す

作品ページの `</body>` の直前に、次の2行を入れます（既存の44ページと同じ）。

```html
<script src="../assets/atlas/data/atlas-bridges.js"></script>
<script src="../assets/atlas/js/part-bridge.js" defer></script>
```

## 3. 概念に結びつける — `concepts.json`

該当する概念の `works` に、作品のIDを足します。**2つ以上**結びつけてください。

```json
{ "id": "concept:energy", "works": ["work:part1", "work:cosmos1"] }
```

- いまある概念は39語です。一覧は [reports/atlas-report.md](reports/atlas-report.md) の4章にあります。
- 合うものが無ければ新しい概念を足せます（`id` `title` `summary` `aliases: []` `works`）。**2つ以上の作品に現れるもの**に限ります。1作品だけの語は `keywords` に書きます。

## 4. 問いを結びつける — `questions.json`

作品の問いには `q:作品名.番号` というIDが自動で付きます（`work:cosmos1` の1つ目なら `q:cosmos1.1`）。
`parents` に、どの大きな問いに向かうかを書きます。

```json
"q:cosmos1.1": "q:change",
"q:cosmos1.2": "q:reality"
```

大きな問いは13個あります：`q:tool`（道具）／`q:thinking`（考える）／`q:language`（言葉）／`q:number`（数と価値）／`q:learning`（学ぶ）／
`q:reality`（見えている世界）／`q:self`（私）／`q:others`（他者）／`q:body`（身体）／`q:enough`（足りること）／`q:uncertainty`（わからなさ）／`q:growth`（育つこと）／`q:change`（変化）。

どれにも合わない問いが2つ以上の作品で出てきたら、`big` に新しい大きな問いを足します。

## 5. 橋を書く — `edges.json`

雑多にシリーズが増えても世界がばらばらにならないのは、この橋があるからです。**理由の一文（20字以上）が必須**です。

```json
{
  "from": "work:cosmos1", "to": "work:part16", "type": "bridges",
  "via": ["concept:energy"],
  "why": { "ja": "星が光る仕組みである核融合は、第16部が人類史の最後に置く「次のエネルギー」そのもの。星の中で起きていることを、地上で再現しようとしている。" },
  "review": "ok"
}
```

- シリーズの**最初の作品は3本**、以降の作品は**1本以上**。別のシリーズの作品へ向けて書きます。
- 理由が書けないつながりは、書かないでください。
- 書いた橋は、相手側の作品ページの末尾にも自動で出ます。
- 自信のない橋は `"review": "pending"` にしておくと、知の地図帳で「確認待ち」と表示されます。

出来事どうしの因果（`"type": "influences"`）や人物どうしの影響・対比（`"contrasts"`）も、同じファイルに同じ形で書けます。

## 6. ビルドして確かめる

```bash
node tools/atlas/build.mjs --assign-ids
```

- **エラー**が出たら、メッセージの指す箇所を直します（IDの書き間違い、存在しないページ、理由文の欠落など）。
- 通ったら [reports/atlas-report.md](reports/atlas-report.md) の「5. 編集待ち」を開き、足した作品の名前が残っていないかを見ます。
  残ってよいのは「英語の題がない作品」だけです。
- 銀河での位置は、橋・概念・問いを多く共有する既存作品の近くに**自動で**決まります。既存の星は動きません。
  決まった位置は `layout.lock.json` に記録され、以後は変わりません。
  気に入らなければ、`layout.lock.json` からそのシリーズと作品の行を消し、`series.json` に `"pos": [x, y]` を書いてビルドし直します
  （中心が `[0, 0]`、既存のシリーズはおよそ ±1.3 の範囲にあります）。

画面で確かめる：

```bash
python3 -m http.server 8765
```

`http://localhost:8765/atlas.html` と、トップ・地図ページ・足した作品ページを開きます。

## 手順を練習する（本番のデータに触れない）

```bash
node tools/atlas/tests/add-series.test.mjs
```

架空のシリーズ「音楽」（2作品）を、上の1〜5のとおりに一時フォルダで足し、ビルドして次を確かめます。
足す内容は `tools/atlas/tests/fixtures/new-series/additions.json` にあり、**書き方の見本**としても使えます。

- 置き場所を書かなくても銀河に位置が付き、既存のシリーズと重ならず、既存の星が1つも動かない
- 時間・大きな問い・概念2つ以上が結びついている
- トップの銀河と地図ページが読む一覧に載る
- 作品ページの橋が、新しい作品にも、相手側の既存作品にも出る
- 「編集待ち」に、英語の題以外が残らない

## こういうときは

| 状況 | やり方 |
|---|---|
| まだ構想だけ | `series.json` に `status: "planned"` で足す。人物（`people`）や概念（`concepts`）を書いておくと、作品ができる前から入口になる |
| ページより先に Podcast だけ出ている | `series.json` の `mediaMatch` に、メディアIDの規則を書く（「AIの源流」がこの形） |
| シリーズに属さない単発の作品 | 作品1本だけのシリーズとして足す |
| 「科学」が育って「宇宙」を独立させたい | `series.json` に新しいシリーズを足し、作品の `series` を書き換える。作品のIDと橋はそのまま |
| シリーズの名前を変えたい | `title` を書き換えるだけ。`id` は変えない |
| 作品をやめたい・IDを変えたい | 消したIDを `retired-ids.json` に書く（書かないとビルドが止まる。公開済みのリンクを守るため） |
| 年表に出来事を足した | `evolution.html` に足してから `--assign-ids` つきでビルド。場所は `places.json`、因果は `edges.json` に書ける |
| 新しい人物を足したい | `people.json` に `id` `name` と、分かれば `time`。場所は `places.json` |

## 「おはなし おはなし」を足す場合（例）

いまは構想中として、名称・説明・人物（河合隼雄、ユング）・概念「物語」だけが登録されています。最初の作品ができたら：

1. `series.json` の `series:ohanashi` の `status` を `published` に。
2. `works.manual.json` に作品を足す（または同じ型のページなら `match`）。`people` に `person:P-J01`（河合隼雄）や `person:jung` を書く。
3. `concepts.json` の `concept:story`（物語）ほかに結びつける。
4. `questions.json` で問いの親を決める（`q:self`、`q:others` など）。
5. `edges.json` に橋を3本。候補として、第10部「感性という深層」が `edges.suggested.json` に挙げてあります。
6. ビルド。
