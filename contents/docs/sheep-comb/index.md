---
title: "SheepComb 概要"
description: "Web ポータルツール SheepComb の概要"
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

対訳データ（バイリンガルファイル）を JSON 形式に変換し、プログラム的に扱いやすくする [SheepShuttle](/docs/sheep-shuttle/)。

翻訳メモリや用語集データを高速に扱うための [SheepSpindle](/docs/sheep-spindle/)。

Office 形式の原文・訳文データを対訳形式に変換する [SheepGroom](/docs/sheep-groom/)。

LQA を音声認識で支援する [SheepBell](/docs/sheep-bell/) ――

これらを Web アプリとして統合するのが **SheepComb** です。

コンセプトは **櫛（Comb）**。

他の Sheep Tools と組み合わせて、翻訳資産を整理することでスムーズな流れを作り出します。

## 主な機能

- **JSON 変換**：XML や対訳形式のファイルを AI などと親和性の高い JSON に変換
- **SheepSpindle 連携**: 翻訳メモリとの類似度を高速にチェックし、類似文の候補を絞り込み
- **Web UI 提供**：SheepComb Web の形で直観的に操作可能。抽出からフィルタ、検索、構造化など、プログラムの知識がなくても実施できます
- **SheepGroom / SheepBell 内包**: 翻訳に付随する言語業務に特化したツールを提供しています
- **SheepBobbin / SheepLint 連携**: AI での処理に適した構造化 + 追加情報の注入で精度アップ。ローカル/クラウド LLM に対応しています

## 目次・ドキュメント一覧

<Toc :items="[
  { title: 'はじめに', link: './01_introduction', desc: 'SheepComb の基本機能と使い方の流れ' },
  { title: 'SheepShuttle の詳細手順', link: './11_shuttle_steps_desc', desc: 'XLIFF / TMX / TBX などの変換・操作手順' },
  { title: 'SheepGroom の詳細手順', link: './21_groom_steps_desc', desc: 'Office ファイルからの対訳抽出・アライン手順' },
  { title: 'SheepBell の詳細手順', link: './31_bell_steps_desc', desc: '音声認識を活用した LQA・動画クリップ抽出手順' },
  { title: '対訳検索（コンコーダンス）', link: './91_tools_concordance', desc: 'バイリンガルデータからの高速対訳検索' },
  { title: 'テキスト比較（差分ツール）', link: './92_tools_diff', desc: 'テキスト間の差分抽出・比較機能' }
]" />

