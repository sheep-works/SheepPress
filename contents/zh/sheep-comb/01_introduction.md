---
title: "SheepComb 使用入门"
description: "SheepComb Web 的核心功能与操作指南"
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

# SheepComb Web 使用指南

[SheepComb Web](https://sheepcomb.netlify.app) 提供了从双语数据提取、字数统计、数据结构化（TM/TB 匹配应用）、AI 辅助翻译与审校，到术语快速检索和文本差分对比等全套翻译效率工具。

SheepComb Web 无需安装任何客户端，直接在现代浏览器（Google Chrome、Edge 等）中即可运行。

除调用 AI 进行翻译和质检外，所有数据解析与计算全部在浏览器本地（客户端）完成，确保核心商业数据的保密性。

![SheepComb Web 首页](./sheepcomb_top.png)

---

## 双语数据处理标准工作流

SheepComb Web 提供了规范的 6 步标准流程，确保在安全且高质量的前提下调用 AI：

| 序号 | 步骤名称 | 概述 |
| :---: | :--- | :--- |
| 1 | **提取（Parse）** | 从各类双语及办公文件中提取原文与译文句段对。 |
| 2 | **排除与过滤（Filter）** | 剔除重复项、已锁定句段以及无需翻译（DNT）的内容。 |
| 3 | **整合与结构化（Structure）** | 将多份数据整合为本系统通用的“项目结构化数据”（`ShWvData`）。 |
| 4 | **分析匹配（Match）** | 对照翻译记忆库（TM）与术语库（TB），计算匹配率与重叠度。 |
| 5 | **管理切分（Chunk）** | 将海量数据切分为最适合 AI 处理的“小数据块（Chunk）”并导出 JSONL。 |
| 6 | **AI 请求（API）** | 将分块数据与定制提示词批量发送至 LLM，执行自动化翻译或质检。 |
