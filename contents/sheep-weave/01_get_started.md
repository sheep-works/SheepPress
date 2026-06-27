# はじめに

SheepWeave はプログラミングエディタのいいとこ取りを目指した、新しい翻訳支援ツール（CAT ツール）です。

最近のプログラミングエディタは、統合開発環境（IDE）とも呼ばれていますが、その名のとおり様々なツールが統合されて使いやすくなっています。特定のテキストに色をつけたり、文脈に合わせた入力候補を表示したりといったことが可能です。ほかにも自分用のショートカットやキーバインドをつくることもできますし、「選択中の部分を括弧で囲む」ような処理も得意です。

さらに昨今では、AI 機能が標準搭載。すぐ横のチャット欄でやり取りするのはもちろん、編集中も前後の文脈にあわせて調整してくれることもあります。たとえば、not more than 1%を 1%未満に翻訳すると、同じようなフレーズをタブだけで変換していくことも可能です。この機能が力を発揮しやすいのがポストエディット。能動態を受動態に書き換えるのもサポートしてくれますし、「全編を敬語に」といったことも可能です。

こんな便利な機能が満載の IDE を、プログラミングだけで使うのはもったいない。その思いから始まっているのがこの SheepWeave です。これまで Office などで上書き翻訳していた人にも、CAT ツールをよく使っていた人にも馴染みやすいエディタを目指しています。

***

# インストール
## 必要なソフト
### エディタ

SheepWeave は Visual Studio Code（VS Code）をベースに、拡張機能として開発をしています。

そのため使用するには VS Code かその派生製品（Cursor/Windsurf/Antigravity/TRAE など）をインストールする必要があります。

いずれも OS を問わず、無料でインストールできます。

::: tip
ダウンロード URL
-[VS Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code)
-[Cursor](https://cursor.com/)
-[Windsurf](https://windsurf.com/)
-[Antigravity](https://antigravity.google/)
-[TRAE](https://www.trae.ai/)
:::

### Okapi Framework
SheepWeave は基本的にバイリンガルファイル（xliff）ベースの入出力を想定しています。
Office 形式や html なども一度 xliff に変換することで、一貫したテキストエディタでの翻訳を可能にします。
すでに memoq や trados などの CAT ツールをお持ちであれば自前で変換することもできると思いますが、持っていない場合は Okapi Framework の使用がおすすめです。
Okapi Framework は歴史ある変換ソフトで、安定した動作が特徴です。
SheepWeave ではエディタ画面で直接変換できるよう、Okapi Framework のなかでも tikal というソフトを利用しますが、多言語ファイルや特殊なフィルタが必要な場合は rainbow というソフトで画面をみながら設定して、xliff を生成することまできます。

::: tip
ダウンロード URL
-[Okapi Framework](https://okapiframework.org/)
Download の Latest Stable から自分の環境にあったものをダウンロードし、展開しておいてください。
:::

### Java 実行環境
Okapi Framework は Java という言語で動いており、実行には Java が必要です。
公式サイトからダウンロードしてインストールしておいてください。

::: tip
ダウンロード URL
-[Java](https://www.java.com/ja/download/)
:::

### SheepWeave.vsix
SheepWeave を VS Code にインストールするためのファイルです。分かりやすいところに保存しておいてください。

::: tip
ダウンロード URL
- <a href="https://ogi.teracloud.jp/share/12028f51cf1f58b1" target="_blank" rel="noopener noreferrer">最新はVer 0.0.16</a>
:::
