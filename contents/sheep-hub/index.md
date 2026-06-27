# SheepHub

FastAPI を使った Sheep Tools の簡易 API サーバーです。

**ハブ（Hub）** という名前のとおり、各種ツール間を簡単につなぎます。

たとえば、SheepWeave での翻訳中に、一部だけ SheepLint で翻訳/校正したい、
あるいは、バイリンガルファイル（XLIFF）を校正前に特定のルールに沿って並べ替えたい、
といった痒い所に手が届くサービスを目指しています。

※現在はまだ未公開

## 主な機能

- **SheepWeave - SheepLint 連携**: SheepWeave で翻訳中のファイルから翻訳・校正を直接リクエスト可能
- **SheepComb - SheepLint 連携**: SheepComb XLIFF ファイルを編集しやすい CSV に変換して SheepLint で校正可能
- **SheepShuttle 連携** : SheepWeave でできた JSON ファイルを、SheepShuttle で形式変換し、扱いやすく

## 使い方

詳細は今後の更新をお待ちください。
