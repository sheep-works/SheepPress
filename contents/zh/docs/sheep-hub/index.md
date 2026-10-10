---
title: "SheepHub 概要"
description: "SheepHub 简易 API 服务端概要"
date: 2024-01-01
updated: 2026-08-30
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "产品文档"
tags:
  - "LAMBUAGE"
  - "SheepTools"
  - "翻译支持"
  - "Geminiによる翻訳"
---

:::warning
本页面由 Gemini 机器翻译。
:::

# SheepHub

基于 FastAPI 构建的 Sheep Tools 轻量级 API 中枢服务端。

正如其名 **集线器（Hub）**，它旨在无缝连接各类工具与自动化流程。

例如：在 SheepWeave 中进行翻译时直接调用 SheepLint 进行部分句段的智能校对；或者在校对前按特定规则对双语 XLIFF 文件进行重排等，满足翻译工程中的各类定制化需求。

*注：目前处于内部预览阶段，尚未公开发布。*

## 主要功能

- **SheepWeave - SheepLint 联动**：可直接从 SheepWeave 正在翻译的文件中发起翻译与审校请求。
- **SheepComb - SheepLint 联动**：将 SheepComb 的 XLIFF 文件转换为便于编辑的 CSV 并由 SheepLint 进行智能质检。
- **SheepShuttle 联动**：将 SheepWeave 产出的 JSON 文件经由 SheepShuttle 进行格式转换，提升数据可用性。

## 使用方法

详情请期待后续版本文档更新。
