# 学びの地図サイト 制作計画

## 概要
「ハルとおじいさん」シリーズ全8部の学びの地図を統合するWebサイト。
GitHub Pagesで公開し、YouTubeの概要欄等からリンクする。

## サイト構成
```
site/
├── index.html          # 統合ページ（メインマップ）
├── parts/              # 各部の学びの地図HTML
│   ├── part1.html
│   ├── part2.html
│   ├── part3.html
│   ├── part4.html
│   ├── part5.html
│   ├── part6.html
│   ├── part7.html
│   └── part8.html
└── PLAN.md             # この計画書
```

## デザイン方針
- **基調色**: 黒（#0a0a0f）
- **アクセントカラー**: ネオンカラー
  - 第1部: オレンジ (#ff6b2b) — 蒸気の時代
  - 第2部: ブルー (#4da6ff) — つながる世界
  - 第3部: シアン (#00e5ff) — AIと生きる未来
  - 第4部: グリーン (#39ff14) — 文字と知識の冒険
  - 第5部: パープル (#bf5fff) — 言葉と思考の旅
  - 第6部: ゴールド (#ffd700) — 数字と世界
  - 第7部: マゼンタ (#ff2d95) — 人間の前提を外す
  - 第8部: ネオンブルー (#00d4ff) — AIと人間のあいだ
- **フォント**: Noto Sans JP / システムフォント
- **レスポンシブ対応**: モバイルからPC幅まで

## コンテンツ構造（人類の進化軸）
1. **三大革命** (第1-3部): 産業革命 → デジタル革命 → AI革命
2. **文明の道具** (第4-6部): 文字 → 言葉 → 数字
3. **前提を超える** (第7部): 4人の天才の挑戦
4. **いま、ここ** (第8部): AIと人間の境界

## YouTube連携
- サムネイル: YouTube APIサムネイル (img.youtube.com) を使用
- 各部に再生リストリンクを設置
- 第4部〜第8部のYouTube URL: メタデータから取得済み
- 第1部〜第3部: YouTube URLは未取得（後日追加可能）

## 再生リスト URL
- 第4部: https://www.youtube.com/playlist?list=PLJ-qAmzHO2WxoHkQX1M6VJCrFKtdxXx8Z
- 第5部: https://www.youtube.com/playlist?list=PLJ-qAmzHO2Wz9a-nLF0FAkTgRr8km-ql8
- 第6部: https://www.youtube.com/playlist?list=PLJ-qAmzHO2Wwmx7EE_-oXyN4FOeIsbXos
- 第7部: https://www.youtube.com/playlist?list=PLJ-qAmzHO2WxfmzrTlbDejA9E6F5NvHHf
- 第8部: https://www.youtube.com/playlist?list=PLJ-qAmzHO2Wx32GuS8t4vuk8_kjK_NIa5

## 作業ログ
- 2026-03-08: 初期調査、計画策定、フォルダ構成作成
- 2026-03-08: index.html 統合ページ作成
- 2026-03-08: 各部学びの地図HTMLをpartsフォルダにコピー

## 今後の更新手順
1. 新しい部が完成したら `parts/partN.html` を追加
2. `index.html` にカード/セクションを追加
3. GitHub Pagesにプッシュして反映
