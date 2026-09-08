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

# SheepComb 的使用方法

SheepComb 是一个集合了 **类型定义**、**格式转换核心**、**CLI 命令行工具**、**Web UI**、**API 控制器** 以及 **API 枢纽本地服务端** 的复合型工具链项目。
通过组合这些模块，能够高效实现以下能力：

- 从 XML（XLIFF 等）、CSV、Excel 等多源文件中提取翻译数据，完成字数统计与结构化校验（TM/TB 适配）
- 与翻译记忆库（TM）及术语库（TB）进行精准匹配，自动检测完全匹配与模糊匹配项
- 将海量翻译数据自动切分为适合 AI 处理的“小分块（Chunking）”，或导出为其他通用格式
- 将分块数据与定制提示词（Prompt）批量发送至 AI，实现自动化翻译与质检
- 针对 AI 特性深度优化的结构化数据 + 背景上下文注入，显著提升翻译精度，全面兼容本地及云端 LLM

对于超大规模语料库可借助 CLI 工具处理，而日常绝大多数业务场景下，**Web UI** 界面更为直观易用。
因此本手册重点介绍 **Web UI** 的操作流程。关于 CLI 的高级参数，请参阅开源仓库的 README 文档。

::: tip
关于数据格式定义，请参阅 [数据结构与类型定义](/zh/sheep-comb/99_types)；关于本地 API 服务配置，请参阅 [SheepBobbin](/zh/sheep-bobbin/)。
:::

# 使用 SheepComb Web

[SheepComb Web](https://comb.lambuage.com) 提供了一站式的翻译数据提取、字数统计、结构化（TM/TB 校验）、AI 辅助翻译与审校、术语检索以及文本差异对比等全套生产力功能。

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
