---
title: "产品列表"
description: "为翻译从业者打造的 Sheep 绵羊工具家族产品一览"
date: 2024-01-01
updated: 2026-08-30
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "产品列表"
tags:
  - "产品列表"
  - "SheepTools"
  - "CAT工具"
  - "Geminiによる翻訳"
---

:::warning
本页面由 Gemini 机器翻译。
:::

# 产品列表

## 整体架构概念图 ～产品协同生态～

![整体架构概念图](/abstract.png)

## [SheepLint](/zh/sheep-lint/)

基于 AI 的双语文本校对与质检工具。

以 Vertex AI 为底层服务平台，实现安全、高速且企业级的 AI 智能审校。

输入支持双语格式（XLF/XLSX/DOCX 等），在明确原文与译文对应关系的基础上进行校对，具备极高的检测准确率。不仅能排查错别字与漏译，还能高精度识别理解偏差与语境误译。

此外，通过与后文介绍的 SheepComb 联动，还支持与翻译记忆库（TM）的一致性校验。可作为译员自我复查的得力助手，亦可作为终审交付前的第二意见把关。

## [SheepComb](/zh/sheep-comb/)

致力于便捷操作 XLF / TMX / TBX 双语资产的工具。

从双语提取、Phrase (MXLIFF) / memoQ (MQXLIFF) 重复及相似句段的一键批量锁定，到术语库（TB）的自动匹配应用，汇集了 CAT 工具日常重度用户梦寐以求的各项实用功能。

## [SheepBobbin](/zh/sheep-bobbin/)

用于通过 LLM 大模型处理在浏览器端提取的双语数据的桌面端工具。
主要用于翻译校验与质量审查，亦可用于翻译初稿生成与译文润色。

## [SheepGroom](/zh/sheep-groom/)

SheepLint 的核心优势在于基于双语对齐文件的智能审校。
然而日常工作中很多时候直接使用 Office 文件，缺少现成的双语对齐文件，而在完工后再去手动制作双语对齐往往极其耗时耗力……

SheepGroom 是一款以“粗粒度”（按段落、按工作表、按幻灯片页）快速对齐 Office 文件的工具，在大幅减轻对齐工作负担的同时，快速构建适合 AI 进行上下文审校的双语数据。

## [SheepWeave](/zh/sheep-weave/)

专为翻译打造的 Visual Studio Code 扩展插件。

当今时代，代码编程领域的 AI 辅助与开发工具生态远领先于传统翻译行业，而这离不开以 VS Code 为代表的高性能现代编辑器。SheepWeave 正是本着“让译员也能享受到顶级代码编辑器红利”的理念而诞生的插件。
通过将 XLIFF 文件转换为对程序极度友好的 JSON 数据流，让译员在编辑器的强大辅助与毫秒级替换响应下进行翻译。

（后续规划）
将搭载深度 AI 翻译辅助功能，自动注入上下文并回传译文修改反馈。当然，一键生成用于 SheepLint 审校的双语文件更是不在话下。
本项目作为开源项目推进，已在 GitHub 上公开。

## [SheepLoom](/zh/sheep-loom/)

基于 vivliostyle 与 Marp 的文档与排版制作工具。
可从 Markdown 标记文件极速生成专业级 ePub 电子书、PDF 文档以及幻灯片演示文稿。

## [SheepStitch](/zh/sheep-stitch/)

实现跨各类封闭平台自动化输入的辅助工具。
面对不支持标准导入导出的各类私有翻译平台，译员往往被迫反复手动复制粘贴。SheepStitch 正是为此打造的半自动批量录入工具。
