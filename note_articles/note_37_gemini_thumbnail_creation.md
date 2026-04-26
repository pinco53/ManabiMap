# note_37｜プロンプトを書くことが、デザインになった──GeminiでYouTube・noteのサムネをつくる

**対象**: Geminiサムネ制作プロセス紹介 → ManabiMapサイト紹介
**コンテスト**: #AIと始めてみた（Google/Gemini、締め切り2026-05-15）
**保存日**: 2026-04-21
**URL**: https://note.com/manabimapcreator/n/n90cb4cd059df

---

## 記事

```
# プロンプトを書くことが、デザインになった──GeminiでYouTube・noteのサムネをつくる

YouTubeのサムネイルは、誰が作るのでしょう。

デザイナーに頼む、Canvaで作る、写真を加工する。
そういう方法が一般的だと思います。

「世界観を統一しながら、毎回ゼロからデザインする」
——それをGeminiへのプロンプトで代替することにしました。

https://youtu.be/WOGeJkSUkz0

---

## YouTubeもnoteも、同じ仕組みで作っている

学習アニメシリーズ「ハルとおじいさん」を運営しています。

YouTubeに動画を投稿するたびにサムネが必要です。
noteに記事を書くたびにサムネが必要です。

テーマは毎回変わります。
でも世界観は、ずっと同じにしたい。

黒猫のシルエット。
クリームからスカイブルーへのグラデーション。
夢幻的な光と、上部にはっきりしたタイトル。

この一貫性を、Geminiへのプロンプト設計で実現しています。

## JSONでルールを管理する

Geminiへの指示を、毎回JSONで書くことにしました。

共通ルールはすべての画像で固定です。

```json
"visibility_rules": [
  "主役は黒猫アインシュタイン（シルエット）1体のみ",
  "上部25%はタイトルテキスト専用帯",
  "背景は明るく保ち、暗くしすぎない",
  "ハル・おじいさんは絶対に登場させない"
]
```

毎回変えるのは、その回のテーマを表す「シーン描写」だけです。

## テーマをポーズで語らせる

黒猫の「ポーズ」が、そのコンテンツのテーマを表します。

たとえば——

「AIは本当に理解しているのか」というテーマなら：
> 小さな扉の前に座り、鍵穴を静かに覗き込んでいる。
> 扉の隙間から漢字の断片と「?」マークが淡く滲み出る。

「産業革命」のYouTubeサムネなら：
> 煙突から薄い煙が上がる工場のシルエットを遠くに見ながら、
> 静かに佇んでいる。足元には歯車の影が淡く広がる。

「数の歴史」のサムネなら：
> 砂漠の砂地に座り、爪先で数字を書いている。
> 砂の上に残る文字が、やわらかな光で輝いている。

文章でシーンを指定すると、Geminiがそれを絵にしてくれます。

## 禁止リストが世界観を守る

「入れてはいけないもの」を明示することで、
生成ブレを防いでいます。

```json
"do_not_include": [
  "ハルのキャラクター",
  "おじいさんのキャラクター",
  "暗い背景・重い色調",
  "リアルな人物・顔",
  "ロボット・コンピュータの図解"
]
```

キャラクターを出さないのは著作権への配慮でもあります。
黒猫のシルエットだけに絞ることで、
世界観を守りながら生成ブレを最小化できました。

## 実際のサムネを、ここで見られます

この仕組みで作ったYouTubeサムネが、特設サイトに並んでいます。

https://pinco53.github.io/ManabiMap/

第1部「蒸気の時代」から第8部「AIの断層」まで、
各エピソードのサムネが一覧で確認できます。

同じ黒猫シルエット、同じ色調、でも毎回違うシーン。
それがGeminiとJSONプロンプトの組み合わせで実現できています。

## このサムネが使われているシリーズ

「ハルとおじいさん」は、産業革命・デジタル革命・AI革命を
一本の物語で学べるYouTube学習アニメシリーズです。

現在8部まで公開。
各部には、動画の補足資料として機能する「学びの地図」ページが揃っています。
歴史年表・各話詳解・用語集・問いの地図——
すべて無料で読めます。

---

https://youtu.be/WOGeJkSUkz0

→ **[ハルとおじいさん 学びの地図｜特設サイト](https://pinco53.github.io/ManabiMap/)**

---

*ハルとおじいさん YouTube チャンネル → https://www.youtube.com/@ManabiMap*
```

---

## サムネイル JSON（Gemini用）

```json
{
  "task": "note記事 サムネイル画像生成",
  "specifications": {
    "size": "1280x720px (16:9)",
    "style": "Visionary Digital Painting, soft-focus with velvety textures, ethereal dreamlike academic fantasy, luminous, whimsical — grainy painterly feel resembling soft pastel or airbrushing, layered transparency, misty atmosphere",
    "color_palette": "クリーム〜スカイブルー〜ペールラベンダー基調。アクセントにルミナスゴールド・ソフトアンバー。パステル重視、ハイキー輝度。暗くしすぎない",
    "visibility_rules": [
      "主役は黒猫アインシュタイン（シルエット）1体のみ",
      "上部25%はタイトルテキスト専用帯（何も置かない）",
      "背景は明るく保ち、暗くしすぎない",
      "ハル・おじいさんは絶対に登場させない"
    ]
  },
  "layout": {
    "text": {
      "line1": "プロンプトを書くことが、",
      "line2": "デザインになった。",
      "position": "上部（上部25%の文字帯内）、中央揃え",
      "font": "太字ゴシック",
      "color": "深いネイビー（#1a2a4a）+ 白縁（2-3px）",
      "size": "line1: 46px、line2: 46px",
      "safe_margin": "文字の下に余白を確保し、黒猫の耳・頭に被せない"
    },
    "main_subject": {
      "einstein_cat": {
        "position": "中央やや下寄り",
        "size": "画面の40-46%",
        "style": "黒猫シルエット。スカイブルー〜ゴールドのリムライトで輪郭がふんわり発光する。目はアンバーゴールドに輝く",
        "lighting": "Bioluminescent backlighting — スカイブルーとゴールドの光がシルエット背後から滲み出るように広がる",
        "pose": "無数の小さなサムネイルのような光の額縁が空中に浮かんでいる中心に座り、それらを静かに眺めている。どの額縁も同じ黒猫のシルエットが入っているが、背景のシーンが少しずつ違う",
        "expression": "「これが揃った」という静かな達成感。コレクターの満足と職人の誇り"
      }
    },
    "background": {
      "description": "クリーム〜スカイブルーへの夢幻的なグラデーション。浮かぶ要素：小さな光の額縁（サムネイルを連想させる長方形の光の枠）が25-30%の不透明度で空中に漂う。各枠の中に異なる淡いシーン（歯車・砂時計・地図・星座）が微かに見える",
      "depth": "手前に黒猫（ソフトフォーカス）、中景に光の額縁が立体的に浮かぶ、奥に広がる明るいルミナスな空間"
    }
  },
  "scene_description": "Visionary digital painting — a black cat silhouette sitting at the center of many small floating light frames (evoking thumbnails), each frame softly glowing with a different faint scene inside — gears, hourglasses, maps, constellations — all at 25% opacity. The cat gazes quietly at this gallery of light with calm satisfaction. The background is a soft cream-to-sky-blue gradient. Bioluminescent backlighting in sky blue and gold makes the cat's silhouette edges softly glow. Sparkling orbs drift gently. Top area kept luminously clear for title text. Soft-focus edges, grainy painterly velvety texture, layered transparency.",
  "important_notes": [
    "黒猫シルエット以外のキャラクター（ハル・おじいさん）は絶対に入れない",
    "光の額縁は小さく・繊細に・浮遊感を持たせる。主張しすぎない",
    "額縁の中のシーンは25%以下の不透明度で、ぼんやりと",
    "クリーム〜スカイブルーが暗く沈んだらペールラベンダー・ピーチで引き上げる",
    "スマホ縮小でも黒猫シルエットと目が認識できるコントラストを維持"
  ],
  "do_not_include": [
    "ハルのキャラクター",
    "おじいさんのキャラクター",
    "エピソード番号ラベル",
    "暗い背景・重い色調",
    "リアルな人物・顔",
    "ロボット・コンピュータの図解",
    "実際の文字テキスト（タイトル以外）"
  ]
}
```
