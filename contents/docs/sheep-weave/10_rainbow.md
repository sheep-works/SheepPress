---
title: "SheepWeave 多言語 Excel の翻訳と Rainbow の活用"
description: "Rainbow を使用した多言語 Excel ファイルの翻訳手順"
date: 2024-01-01
updated: 2026-08-30
author: "合同会社ランベージ & ひつじの翻訳室"
lang: "ja"
category: "SheepWeave"
tags:
  - "SheepWeave"
  - "CATツール"
  - "VSCode"
  - "翻訳支援"
---

# 多言語 Excel の翻訳と Rainbow の活用

多言語（Multilingual）の Excel ファイル（例: 1 つのシート内に「英語原文」「日本語訳」「中国語訳」などの列が並んでいるデータ）は、ゲーム翻訳やローカライズ実務で非常に多く使われます。

Okapi Framework の GUI ツールである **Okapi Rainbow** を併用することで、多言語 Excel から二言語間の標準 XLIFF ファイルを抽出し、SheepWeave で軽快に翻訳・ポストエディットを行うことができます。

---

## なぜ Rainbow を使うのか？

- **複雑な多言語列のマッピング**: 原文列・訳文列・コメント列の位置を自由かつ正確に指定可能
- **標準 XLIFF への変換**: 多言語 Excel を二言語の標準 XLIFF（`.xlf` / `.xliff`）に変換できるため、CAT ツールとの親和性が抜群
- **元の Excel への確実な書き戻し**: 翻訳完了後、Excel のレイアウトや装飾を維持したまま訳文を元の多言語 Excel へ安全にマージ（逆変換）可能

---

## ワークフローの全体像

1. **Rainbow で抽出**: 多言語 Excel ➔ 二言語 XLIFF（`.xlf`）を作成
2. **SheepWeave で翻訳**: 抽出された XLIFF を `Working/02_SOURCE` に配置して翻訳
3. **Rainbow で書き戻し**: 完了した XLIFF ➔ 元の多言語 Excel へマージ（Merge）

---

## 手順 1: Rainbow での XLIFF 抽出

現時点では、note にて使用方法を解説しています。
今後、本マニュアル用にも整理する予定です。

[Okapi Framework の Rainbow で Excel フィルタを使う ](https://note.com/lambuage/n/n61a79b9e1696)

<!--
1. **Rainbow の起動とファイル追加**:
   - Rainbow を起動し、**Input List 1** タブに対象の多言語 Excel ファイル（`.xlsx`）をドラッグ＆ドロップで追加します。
2. **言語コードの設定**:
   - **Source Language**（例: `en`）と **Target Language**（例: `ja`）を設定します。
3. **フィルターの設定（Multilingual MS Excel Filter）**:
   - メニューの **`Tools` ➔ `Edit Filter Configurations`** を開き、`okf_xmlstream@multilingual-excel`（多言語 Excel フィルター）を選択・編集します。
   - 原文が含まれる列（Source Column）や、訳文を書き込む列（Target Column）のアルファベット（例: A列, B列, C列）を指定します。
4. **XLIFF の抽出**:
   - メニューの **`Utilities` ➔ `Extraction File Creation`** を実行します。
   - 指定した出力フォルダに、標準 XLIFF ファイル（`.xlf`）が生成されます。
-->

---

## 手順 2: SheepWeave での翻訳

1. **XLIFF ファイルの配置**:
   - Rainbow で生成された `.xlf` ファイルを、SheepWeave の作業フォルダ `Working/02_SOURCE` に配置します。
2. **プロジェクトの初期化**:
   - SheepWeave パネルの **Flow** タブを開き、通常通り **`🚀 プロジェクトの新規作成・初期化`** を実行します。
3. **翻訳の実行**:
   - 生成された `Target.shwvt` を開き、SheepWeave の爆速置換（`F2`）や用語集参照（TB）、AI（LLM）連携を活用して翻訳・ポストエディットを進めます。

---

## 手順 3: 完成版 Excel への書き戻し（Merge）

1. **完了ファイルの出力**:
   - 翻訳が完了したら、Flow タブの **作業中（On Working）** メニューから **`📦 翻訳完了ファイルを生成`** を実行します。
   - `Working/05_COMPLETED` フォルダ内に、翻訳適用済みの完成 XLIFF ファイル（`-done.xlf`）が出力されます。
2. **Rainbow でのマージ（Post-Processing）**:
   - Rainbow に戻り、メニューの **`Utilities` ➔ `Post-Processing`** を実行します。
3. **多言語 Excel の完成**:
   - 訳文列に新しい翻訳が正しく挿入された、完成版の多言語 Excel ファイルが生成されます。

---

::: tip Rainbow の入手先
Okapi Rainbow は、[Okapi Framework 公式サイト](https://okapiframework.org/) から無料でダウンロードできるオープンソースのクロスプラットフォームツールです。多言語ファイルや特殊な構造のファイルを扱う際の強力なパートナーとなります。
:::
