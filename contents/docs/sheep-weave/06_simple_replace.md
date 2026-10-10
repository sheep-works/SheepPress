---
title: "SheepWeave 簡易置換のすすめ"
description: "高速な用語一括置換とスタイル調整の活用法"
date: 2024-01-01
updated: 2026-08-10
author: "合同会社ランベージ & ひつじの翻訳室"
lang: "ja"
category: "SheepWeave"
tags:
  - "SheepWeave"
  - "CATツール"
  - "VSCode"
  - "翻訳支援"
---

# 簡易置換のすすめ

簡易置換は VS Code のプログラミングで使う `F2 リネーム` という便利な置換機能に着想を得たものです。

この機能は、通常の置換とは異なり、`01_REF/auto_replace_log.jsonl` にログが自動で貯まっていきます。
そしてこのログは、次回以降のプロジェクトで用語集や自動補完フレーズといった、**翻訳資産**として活用できます。
（詳細は「7. 継続的な翻訳」の「自動補完の強化」にて）

そのため、SheepWeave で翻訳する際は、この簡易置換を活用することを強くおすすめします。

## 簡易置換の利用方法

1. 置換したいテキストを選択します。
![Simple Replace Step1](./pict/simple_replace_step1.png)
2. `F2` を押します。
![Simple Replace Step2](./pict/simple_replace_step2.png)
3. テキストエリアが出現するので、置換後のテキストを入力して `Enter` を押します。
![Simple Replace Step3](./pict/simple_replace_step3.png)

これで、ファイル全体に対して置換が行われ、また、`01_REF/auto_replace_log.jsonl` にログが自動で記録されます。

![Simple Replace Result](./pict/simple_replace_result.png)

この置換は通常の置換と似た処理が行われているため、`Ctrl + Z` で元に戻すことができます。

また、テキストエリアを呼び出した後にキャンセルする場合は、`Esc` を押してください。

::: tip テキストエリアの出現位置
初めて `F2` を押した際は、テキストエリアが画面の左上や中央といった場所に表示されることがあります。
このテキストエリアの位置は記憶されているため、自分の使いやすい位置にドラッグしておきましょう。
:::

