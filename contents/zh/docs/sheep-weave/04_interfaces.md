---
title: "SheepWeave 界面与面板详解"
description: "SheepWeave 整体界面布局与各控制面板功能详解"
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

# 界面与面板详解

SheepWeave 充分运用 VS Code 的屏幕空间打造高效舒适的翻译环境。
标准工作布局为：**左侧文件目录树、中央主翻译编辑区、右侧 SheepWeave 综合面板（及 AI 对话框）**。

## VS Code 核心操作区域

![Interface VS Code](./pict/interface_vs_code.png)

1. **主编辑区（中央）**：在此对 `Target.shwvt` 逐行翻译。数字与排版标签（`{@0}` 等）均有醒目颜色区分。按 `Ctrl + Enter` 确认句段（背景变绿）。严格锁定总行数以防止错位。
2. **文件目录树（左侧）**：快速访问项目文件、参考资料及 `05_COMPLETED` 成果包。按 `Ctrl + B` 可随时折叠或展开。
3. **AI 辅助（右侧）**：选中文本按 `Ctrl + L` 即可发送至标准 AI 对话框，或按 `Ctrl + Q` 载入 SheepWeave 专有 LLM 面板。

## SheepWeave 专有控制面板（`Alt + 1` ～ `Alt + 7`）

![Interface SheepWeave Panel](./pict/interface_sheepweave_panel.png)

### 1. 工作流（Flow, `Alt + 1`）
管理翻译全生命周期：初始化、准备、进行中、完成及归档。

### 2. 翻译（Translate, `Alt + 2`）
核心翻译控制台。常驻显示当前句段原文，提供前 5 条 TM 记忆库匹配推荐（按 `Ctrl + Shift + 1..5` 一键套用），并展示 TB 术语匹配（支持 `Ctrl + Space` 补全）。

### 3. 检索（Search, `Alt + 3`）
- **语料检索（Concordance）**：从记忆库与全项目中跨语料检索词汇出现历史。
- **句段过滤（Filter）**：在当前打开文件中进行条件筛选，并支持直接在结果表中修改译文。

### 4. 辅助工具（Tools, `Alt + 4`）
- **差分对比（Diff）**：直观高亮比对当前译文与 TM 参考译文之间的细微改动。

### 5. 大模型联动（LLM, `Alt + 5`）
通过 SheepBobbin 批量执行 AI 一键初翻、译文润色与智能审校。

### 6. 项目统计（Info, `Alt + 6`）
实时查看项目总字数/词数、翻译确认进度百分比等统计指标。

### 7. 系统设置（Settings, `Alt + 7`）
自定义调整原文/译文字号排版，并管理常用短语自动补全列表（`phrase.jsonl`）。
