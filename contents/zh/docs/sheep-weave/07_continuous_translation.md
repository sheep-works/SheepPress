---
title: "SheepWeave 持续性翻译与资产复用"
description: "大型/长期翻译项目中的资产复用与增量更新运维经验"
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

# 持续性翻译与资产复用

在实际翻译业务中，项目往往不是一次性交付即告终结，经常会遇到“翻译中途追加新原稿”、“将上一期的译文作为翻译记忆库（TM）或术语库（TB）在后续项目中持续复用”等场景。

SheepWeave 基于纯文本与开放 JSON 架构打造，极为擅长应对此类持续性增量翻译与翻译资产的灵活复用。

---

## 中途追加原文文件

在翻译进行过程中，若客户追加提供了新的待翻译文件（Word、Excel、XLIFF 等），无需推翻重建项目：

1. **放置追加文件**：将新增原稿直接放入当前项目工作区的 `Working/02_SOURCE` 目录。
2. **更新项目（Flow 面板）**：在 SheepWeave 面板的 **Flow（工作流）** 选项卡下选择 **作业中（On Working）** 菜单，点击 **`🧶 追加原文文件`**。
3. **自动同步至编辑器**：系统在完整保留既有已确认译文与 `project.json` 进度的前提下，自动解析新增内容并追加至 `Target.shwvt` 末尾。

---

## 翻译资产与参考资料复用

### 直接将 `project.json` 作为 TM 复用
任何既往 SheepWeave 项目生成的 `project.json`，都可以直接作为高精度 TM 记忆库使用。
将旧项目的 `project.json` 复制到新项目的 `Data/Ref/TM` 目录下，系统即可在 Translate 面板中自动显示相似度匹配与差异对比。

### 自动化资产沉淀
- **`phrase.jsonl`（智能联想短语）**：在 `Working/01_REF/phrase.jsonl` 中维护高频固定句式，编辑器中按 **`Ctrl + Space`** 即可极速补全。
- **`auto_replace_log.jsonl`（替换日志直接作为术语库）**：通过 `F2` 或 `Ctrl + Shift + Z` 执行的批量替换记录会自动追加至此日志中，实时作为 TB 候选词条进行高亮推荐。

### 兼容行业标准格式
支持将 TMX、TBX 以及双语 Excel（`.xlsx`）、CSV 放入 `Data/Ref/TM` 或 `Data/Ref/TB`，在 Flow 面板中点击 **`📈 重新分析项目文件并追加参考文件`** 即可即时生效。

---

## 未来演进展望

### 引入 ManticoreSearch 全文检索
得益于纯文本 JSON 结构，未来可无缝集成超高速全文检索引擎 ManticoreSearch，实现对百万句段语料库的毫秒级全文检索与面向 LLM 的深度 RAG 上下文增强。

### 基于 Git 的版本控制与多人协作
SheepWeave 所有工作文件均严格保持纯文本格式。可与 Git（GitHub / GitLab）深度融合，实现按行级别的精确 Diff 变更追踪、基于分支的代码审查流协作以及轻量云端同步备份。
