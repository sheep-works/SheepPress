---
title: "SheepBobbin 概要"
description: "LLM（大言語モデル）連携ツール SheepBobbin の概要"
date: 2024-01-01
updated: 2026-08-10
author: "合同会社ランベージ & ひつじの翻訳室"
lang: "ja"
category: "SheepBobbin"
tags:
  - "SheepBobbin"
  - "LLM"
  - "AI連携"
  - "ローカルLLM"
---

# SheepBobbin

SheepComb の姉妹ツール。
ブラウザ上で抽出した対訳データを、LLM で処理するためのツールです。

コンセプトは **ボビン（Bobbin）**。

ユーザーの見えないところで、せっせと糸巻きを続ける存在です。
[SheepLint](/sheep-lint/)の機能を引き継ぎつつ、ブラウザ+GUI アプリで、誰でも実行しやすくしたものとなっています。

## 主な機能

- **誰でも使いやすい**: Web ブラウザで内容を確認＆デスクトップアプリで設定。ターミナル操作は基本的に不要です。
- **ローカル LLM に対応**: LM Studio や Ollama などのローカル LLM を持っていれば、完全にデバイス内だけで処理が完結します。
- **有料・無料 AI に対応**: SheepLint で使っている Vertex AI 以外にも、Google AI Studio/ChatGPT/DeepSearch などの API にも対応。普段使っている AI を利用することで、コストを抑えられます。

