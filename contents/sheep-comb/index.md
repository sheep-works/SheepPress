---
title: "SheepComb 概要"
description: "XLF / TMX / TBX 操作ツール SheepComb の概要"
date: 2024-01-01
updated: 2026-09-08
author: "合同会社ランベージ & ひつじの翻訳室"
lang: "ja"
category: "SheepComb"
tags:
  - "SheepComb"
  - "XLF"
  - "TMX"
  - "TBX"
  - "翻訳ツール"
  - "JSON"
---

# SheepComb

XLF/TMX/TBX を JSON 形式に変換し、プログラム的に扱いやすくするためのツールです。

コンセプトは **櫛（Comb）**。

他の SheepFamily ツールと組み合わせて、翻訳資産を整理することでスムーズな流れを作り出します。

## 主な機能

- **JSON 変換**：XML や対訳形式のファイルを AI などと親和性の高い JSON に変換
- **SheepSpindle 連携**: 翻訳メモリとの類似度を高速にチェックし、類似文の候補を絞り込み
- **Web UI 提供**：SheepComb Web の形で直観的に操作可能。抽出からフィルタ、検索、構造化など、プログラムの知識がなくても実施できます
- **SheepBobbin / SheepLint 連携**: AI での処理に適した構造化 + 追加情報の注入で精度アップ。ローカル/クラウド LLM に対応しています

