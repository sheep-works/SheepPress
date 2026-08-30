---
title: "SheepComb 概要"
description: "XLF / TMX / TBX 双语资产处理工具 SheepComb 概要"
date: 2024-01-01
updated: 2026-08-30
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "SheepComb"
tags:
  - "SheepComb"
  - "XLF"
  - "TMX"
  - "TBX"
  - "翻译工具"
  - "Geminiによる翻訳"
---

:::warning
本页面由 Gemini 机器翻译。
:::

# SheepComb

用于转换、提取以及合并重组 XLF / TMX / TBX 双语资产的工具。

核心设计理念是 **梳理（Comb）**。

整理并疏通翻译资产，打造顺畅高效的数据流。

## 主要功能

- **TMX 高速模糊检索**：极速比对翻译记忆库相似度，毫秒级筛选出相似句段候选。
- **SheepLint 深度联动**：在向 AI 发起审校时自动注入高匹配度上下文，显著提升质检准确率。
- **本地 LLM 联动**：支持[利用本地环境大模型进行离线校验与翻译](/zh/sheep-comb/02_steps_desc)。
