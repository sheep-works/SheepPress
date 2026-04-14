# はじめに

SheepWeave はプログラミングエディタのいいとこ取りを目指した、新しい翻訳支援ツール（CATツール）です。

最近のプログラミングエディタは、統合開発環境（IDE）とも呼ばれていますが、その名のとおり様々なツールが統合されて使いやすくなっています。特定のテキストに色をつけたり、文脈に合わせた入力候補を表示したりといったことが可能です。ほかにも自分用のショートカットやキーバインドをつくることもできますし、「選択中の部分を括弧で囲む」ような処理も得意です。

さらに昨今では、AI機能が標準搭載。すぐ横のチャット欄でやり取りするのはもちろん、編集中も前後の文脈にあわせて調整してくれることもあります。たとえば、not more than 1% を 1%未満に翻訳すると、同じようなフレーズをタブだけで変換していくことも可能です。この機能が力を発揮しやすいのがポストエディット。能動態を受動態に書き換えるのもサポートしてくれますし、「全編を敬語に」といったことも可能です。

こんな便利な機能が満載のIDEを、プログラミングだけで使うのはもったいない。その思いから始まっているのがこのSheepWeaveです。これまでOfficeなどで上書き翻訳していた人にも、CATツールをよく使っていた人にも馴染みやすいエディタを目指しています。

***

# インストール
## 必要なソフト
### エディタ

SheepWeaveはVisual Studio Code（VS Code）をベースに、拡張機能として開発をしています。

そのため使用するにはVS Codeかその派生製品（Cursor/Windsurf/Antigravity/TRAEなど）をインストールする必要があります。

いずれもOSを問わず、無料でインストールできます。

::: tip
ダウンロードURL
- VS Code：https://azure.microsoft.com/ja-jp/products/visual-studio-code
- Cursor：https://cursor.com/
- Windsurf：https://windsurf.com/
- Antigravity：https://antigravity.google/
- TRAE：https://www.trae.ai/
:::

### Okapi Framework
SheepWeaveは基本的にバイリンガルファイル（xliff）ベースの入出力を想定しています。
Office形式やhtmlなども一度xliffに変換することで、一貫したテキストエディタでの翻訳を可能にします。
すでにmemoqやtradosなどのCATツールをお持ちであれば自前で変換することもできると思いますが、持っていない場合はOkapi Frameworkの使用がおすすめです。
Okapi Frameworkは歴史ある変換ソフトで、安定した動作が特徴です。
SheepWeaveではエディタ画面で直接変換できるよう、Okapi Frameworkのなかでもtikalというソフトを利用しますが、多言語ファイルや特殊なフィルタが必要な場合はrainbowというソフトで画面をみながら設定して、xliffを生成することまできます。

::: tip
ダウンロードURL
- Okapi Framework[https://okapiframework.org/]
Download の Latest Stable から自分の環境にあったものをダウンロードし、展開しておいてください。
:::

### Java実行環境
Okapi Framework はJavaという言語で動いており、実行にはJavaが必要です。
公式サイトからダウンロードしてインストールしておいてください。

::: tip
ダウンロードURL
- Java[https://www.java.com/ja/download/]
:::

### SheepWeave.vsix
SheepWeaveをVS Codeにインストールするためのファイルです。分かりやすいところに保存しておいてください。
https://lambuage.jp.larksuite.com/drive/folder/MVZJfK0dRlCB1SdNUWIj9K1PpOc
