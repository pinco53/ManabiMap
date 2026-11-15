# Atlas ビルドレポート

> 自動生成（`node tools/atlas/build.mjs`）。手で編集しないでください。

**エラー 0件 ／ 編集待ち 315件 ／ 注意 3件 ／ 既存データの参照切れ 0件**

## 1. 取り込んだもの

| 取り込み元 | 件数 |
|---|---|
| 本編 manabimap-data.js | works 21、concepts 10、media 407、routes 6 |
| EDU edu-data/*.js | works 12、people 50、cards 60、evidence 15、history 51 |
| 哲学史 philosophy-history-data.js | entries 32、lanes 3 |
| 年表 evolution.html ほか | events 160、philosophyPoints 24、workLinks 49、core 84 |
| 静的ページ parts/(philosophy|eastern|math)*.html | works 8、episodes 80、lifeEvents 169、people 10 |

| 種類 | 件数 |
|---|---|
| family | 2 |
| series | 10 |
| lens | 13 |
| page | 4 |
| concept | 73 |
| work | 41 |
| question | 112 |
| route | 6 |
| media | 407 |
| episode | 152 |
| person | 60 |
| study | 75 |
| event | 436 |
| stream | 1 |
| （つながり） | 1420 |

| 生成物 | サイズ（非圧縮） |
|---|---|
| atlas-core.json | 130 KB |
| atlas-events.json | 336 KB |
| atlas-detail.json | 324 KB |
| atlas-index.json | 28 KB |

## 2. シリーズ別の作品

| シリーズ | 状態 | 作品数 | 時間あり | 英語題あり | 話 |
|---|---|---|---|---|---|
| ハルとおじいさん（`series:human`） | published | 21 | 0 | 21 | 0 |
| EDU（`series:edu`） | published | 12 | 12 | 0 | 72 |
| 西洋哲学（`series:philosophy-west`） | published | 4 | 4 | 0 | 40 |
| 東洋哲学（`series:philosophy-east`） | published | 2 | 2 | 0 | 20 |
| 数学（`series:math`） | published | 2 | 2 | 0 | 20 |
| 科学（`series:science`） | planned | 0 | 0 | 0 | 0 |
| 宇宙（`series:cosmos`） | planned | 0 | 0 | 0 | 0 |
| 物理（`series:physics`） | planned | 0 | 0 | 0 | 0 |
| 生命（`series:life`） | planned | 0 | 0 | 0 | 0 |
| AIの源流（`series:ai-origins`） | planned | 0 | 0 | 0 | 0 |

本編（ハルとおじいさん）の「話」は、ページの作りが3通りあるため未取り込みです（次の作業）。

## 3. 出来事（時の河の材料）

| 流れ | 件数 | 年が数値化できた件数 |
|---|---|---|
| 138億年年表 | 184 | 183 |
| 哲学史 | 32 | 32 |
| 教育史 | 51 | 51 |
| 作品内の年表（哲学・数学） | 169 | 150 |

レンズごとの所属数：

| レンズ | 作品 | 出来事 |
|---|---|---|
| 人間とAI | 22 | 0 |
| 学ぶこと | 22 | 51 |
| 言葉・情報 | 12 | 107 |
| 道具と人間 | 19 | 86 |
| 数と価値 | 10 | 0 |
| エネルギー | 0 | 39 |
| 身体・健康 | 0 | 44 |
| 環境・食料 | 0 | 43 |
| 移動・交換 | 0 | 32 |
| 協力 | 0 | 101 |
| 権力・権利 | 0 | 82 |
| 意味・世界観 | 0 | 63 |
| 哲学・思想 | 0 | 56 |

## 4. いまあるシリーズ横断のつながり

既存データと既存ページのリンクから読み取れたもの（理由文なし）。

| から | へ | 種類 | 出どころ |
|---|---|---|---|
| 苦しみの出口と、空っぽの私（work:eastern1） | 言葉の網と、網の外の顔（work:philosophy1） | relatesTo | derived:html-link |
| 苦しみの出口と、空っぽの私（work:eastern1） | 世界の枠組みと、育つ自由（work:philosophy3） | relatesTo | derived:html-link |
| 人をつくる型と、型のない道（work:eastern2） | 言葉の網と、網の外の顔（work:philosophy1） | relatesTo | derived:html-link |
| 人をつくる型と、型のない道（work:eastern2） | 野生の思考と、子どもの発見（work:philosophy2） | relatesTo | derived:html-link |
| 人をつくる型と、型のない道（work:eastern2） | 世界の枠組みと、育つ自由（work:philosophy3） | relatesTo | derived:html-link |
| 小学生にもわかる微分と積分（work:math1） | 地球は動いている（work:part14） | relatesTo | derived:html-link |
| 小学生にもわかる微分と積分（work:math1） | AIと人間のあいだ（work:part8） | relatesTo | derived:html-link |
| 小学生にもわかる微分と積分（work:math1） | 世界の枠組みと、育つ自由（work:philosophy3） | relatesTo | derived:html-link |
| 小学生にもわかる微分と積分（work:math1） | 人をつくる型と、型のない道（work:eastern2） | relatesTo | derived:html-link |
| 偶然は、計算できるのか（work:math2） | AIと人間のあいだ（work:part8） | relatesTo | derived:html-link |
| 経験そのものへ、世界の中へ（work:philosophy4） | 人をつくる型と、型のない道（work:eastern2） | relatesTo | derived:html-link |

理由つきの橋（`edges.json`）：**0本**　／　候補（`edges.suggested.json`、未公開）：14本

年表の出来事と結びついた作品：12 / 41（年表 → 作品のリンク 49本を両方向で利用可能に）

## 5. 編集待ち

ビルドは止めないが、公開前に埋める必要があるもの。
### 時間の範囲が未入力の作品（21件）

`work:part1`、`work:part2`、`work:part3`、`work:part4`、`work:part5`、`work:part6`、`work:part7`、`work:part8`、`work:part8-2`、`work:part9`、`work:part10`、`work:part11`、`work:part12`、`work:part13`、`work:part14`、`work:part15`、`work:part16`、`work:part17`、`work:part18`、`work:part19`、`work:part20`

### 概念が2つ未満の作品（20件）

`work:part21`、`work:part22`、`work:part23`、`work:part24`、`work:part25`、`work:part26`、`work:part27`、`work:part28`、`work:part29`、`work:part30`、`work:part31`、`work:part32`、`work:eastern1`、`work:eastern2`、`work:math1`、`work:math2`、`work:philosophy1`、`work:philosophy2`、`work:philosophy3`、`work:philosophy4`

### 理由つきの橋（bridges）を持たない作品（41件）

`work:part1`、`work:part2`、`work:part3`、`work:part4`、`work:part5`、`work:part6`、`work:part7`、`work:part8`、`work:part8-2`、`work:part9`、`work:part10`、`work:part11`、`work:part12`、`work:part13`、`work:part14`、`work:part15`、`work:part16`、`work:part17`、`work:part18`、`work:part19`、`work:part20`、`work:part21`、`work:part22`、`work:part23` ほか17件

### 2歩以内に別シリーズへ行けない作品（23件）

`work:part1`、`work:part6`、`work:part9`、`work:part10`、`work:part11`、`work:part12`、`work:part16`、`work:part17`、`work:part18`、`work:part19`、`work:part20`、`work:part21`、`work:part22`、`work:part23`、`work:part24`、`work:part25`、`work:part26`、`work:part27`、`work:part28`、`work:part29`、`work:part30`、`work:part31`、`work:part32`

### 説明のない概念（名前だけ使われている）（63件）

`concept:steam-engine`、`concept:labor-time`、`concept:school-clock`、`concept:internet`、`concept:sns`、`concept:chatgpt`、`concept:human-agency`、`concept:external-memory`、`concept:printing`、`concept:search-engine`、`concept:inner-voice`、`concept:abstraction`、`concept:causality`、`concept:ai-language`、`concept:zero`、`concept:statistics`、`concept:prediction`、`concept:relativity`、`concept:quantum-thinking`、`concept:turing-machine`、`concept:von-neumann`、`concept:large-language-model`、`concept:probability`、`concept:ai-history` ほか39件

### 大きな問いに結びついていない作品の問い（107件）

`q:part1.1`、`q:part1.2`、`q:part2.1`、`q:part2.2`、`q:part3.1`、`q:part3.2`、`q:part4.1`、`q:part4.2`、`q:part5.1`、`q:part5.2`、`q:part6.1`、`q:part6.2`、`q:part7.1`、`q:part7.2`、`q:part8.1`、`q:part8.2`、`q:part8-2.1`、`q:part8-2.2`、`q:part9.1`、`q:part9.2`、`q:part10.1`、`q:part10.2`、`q:part11.1`、`q:part11.2` ほか83件

### 英語の題がない作品（20件）

`work:part21`、`work:part22`、`work:part23`、`work:part24`、`work:part25`、`work:part26`、`work:part27`、`work:part28`、`work:part29`、`work:part30`、`work:part31`、`work:part32`、`work:eastern1`、`work:eastern2`、`work:math1`、`work:math2`、`work:philosophy1`、`work:philosophy2`、`work:philosophy3`、`work:philosophy4`

### 年が読み取れない出来事（20件）

`event:leave-it-blank（?）`、`event:eastern1-undated（誕生）`、`event:eastern1-undated-b（29歳）`、`event:eastern1-undated-c（35歳ごろ）`、`event:eastern1-undated-d（その後）`、`event:eastern1-undated-e（伝道）`、`event:eastern1-undated-f（80歳ごろ）`、`event:eastern1-undated-g（没後すぐ）`、`event:eastern1-undated-h（約100年後）`、`event:eastern1-undated-i（紀元前後）`、`event:eastern1-undated-j（同じころ）`、`event:eastern2-undated（若いころ）`、`event:eastern2-undated-b（50代）`、`event:eastern2-undated-c（55歳ごろ）`、`event:eastern2-undated-d（旅のとちゅう）`、`event:eastern2-undated-e（68歳ごろ）`、`event:eastern2-undated-f（晩年）`、`event:eastern2-undated-g（伝承）`、`event:math1-undated（いま）`、`event:math2-undated（いま）`

## 6. 既存データの参照切れ

なし。
## 7. 注意

- どこにもつながっていない person: 18件（例 person:P-J01, person:P-J02, person:P-J06, person:P-J10, person:P-J12）
- 1作品にしか現れない概念: 62 / 73件（横断に使えるのは残り 11件）
- 同じ題材らしい出来事（統合候補）: 19組 — event:philosophy-upanishads ⇔ event:phist-east-upanishads / event:philosophy-confucius ⇔ event:phist-east-confucius / event:philosophy-mozi ⇔ event:phist-east-mohism / event:philosophy-socrates ⇔ event:phist-west-socrates-plato / event:philosophy-aristotle ⇔ event:phist-west-aristotle / event:philosophy-nagarjuna ⇔ event:phist-east-nagarjuna / event:philosophy-al-ghazali ⇔ event:phist-crossroads-al-ghazali / event:philosophy-zhu-xi ⇔ event:phist-east-zhu-xi / event:philosophy-aquinas ⇔ event:phist-west-aquinas / event:philosophy-locke ⇔ event:phist-west-locke / event:philosophy-kant ⇔ event:phist-west-kant / event:philosophy-wollstonecraft ⇔ event:phist-west-wollstonecraft / event:philosophy-marx ⇔ event:phist-west-marx / event:philosophy-du-bois ⇔ event:phist-crossroads-du-bois / event:philosophy-satyagraha ⇔ event:phist-crossroads-gandhi / event:philosophy-beauvoir ⇔ event:phist-west-beauvoir / event:philosophy-land-ethic ⇔ event:phist-crossroads-land-ethic / event:philosophy-fanon ⇔ event:phist-crossroads-fanon / event:philosophy-intersectionality ⇔ event:phist-crossroads-intersectionality

