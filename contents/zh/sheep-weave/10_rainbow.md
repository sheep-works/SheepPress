---
title: "SheepWeave 多语言 Excel 翻译与 Rainbow 结合应用"
description: "使用 Okapi Rainbow 与 SheepWeave 配合翻译多语言 Excel 文件的标准操作流程"
date: 2024-01-01
updated: 2026-08-30
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "SheepWeave"
tags:
  - "SheepWeave"
  - "CAT工具"
  - "VSCode"
  - "翻译支持"
  - "Geminiによる翻訳"
---

:::warning
本页面由 Gemini 机器翻译。
:::

# 多语言 Excel 翻译与 Rainbow 结合应用

在游戏本地化与大型企业资料中，常常使用多语种列并排排列的多语言（Multilingual）Excel 表格（如在同一工作表中包含“英文原文”、“日文译文”、“中文译文”等多列）。

配合 Okapi Framework 的可视化工具 **Okapi Rainbow**，能够从复杂的多语言 Excel 中精准提取标准双语 XLIFF 文件，利用 SheepWeave 进行极速翻译与 AI 润色后，再安全回填合并至原版 Excel 中。

---

## 为什么搭配使用 Rainbow？
- **复杂列关系的灵活映射**：支持自由指定原文列、译文列及注释列的坐标位置。
- **生成标准 XLIFF**：将多语言表格转化为标准 `.xlf` 格式，与 CAT 工具完美契合。
- **完美保持原表格格式**：翻译完成后，在保留原 Excel 所有排版、公式及样式的同时，将新译文安全合并回填。

---

## 完整协同工作流

1. **Rainbow 提取**：多语言 Excel ➔ 双语 XLIFF（`.xlf`）。
2. **SheepWeave 翻译**：将 `.xlf` 放入 `Working/02_SOURCE`，初始化项目并进行极速翻译。
3. **Rainbow 回填合并**：在 Rainbow 中执行 **Utilities ➔ Post-Processing**，将完成的 XLIFF 自动回填生成全新的完整多语言 Excel 文件。

::: tip 获取 Okapi Rainbow
Okapi Rainbow 为开源免费跨平台工具，可直接前往 [Okapi Framework 官网](https://okapiframework.org/) 免费下载。
:::
