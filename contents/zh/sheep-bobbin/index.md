---
title: "SheepBobbin 概要"
description: "大语言模型（LLM）联动工具 SheepBobbin 概要"
date: 2024-01-01
updated: 2026-08-30
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "SheepBobbin"
tags:
  - "SheepBobbin"
  - "LLM"
  - "AI联动"
  - "本地LLM"
  - "Geminiによる翻訳"
---

:::warning
本页面由 Gemini 机器翻译。
:::

# SheepBobbin

SheepComb 的姊妹工具。
用于通过 LLM 大模型处理在浏览器中提取的双语数据的桌面客户端工具。

核心设计理念是 **线轴（Bobbin）**。

正如在幕后默默运转缠绕丝线的线轴一样，在后台高效处理各类数据任务。它继承了 [SheepLint](/zh/sheep-lint/) 的核心能力，同时结合 Web 浏览器界面与桌面 GUI 应用，让任何人都能轻松上手。

## 主要功能

- **开箱即用，人人可用**：在网页浏览器中直观核对内容，在桌面端可视化配置，基本无需任何终端命令行操作。
- **全面支持本地 LLM**：配合 LM Studio 或 Ollama 等本地大模型运行时，所有数据处理完全在本地设备内部闭环完成，数据绝对安全。
- **兼容各类付费与免费云端 AI**：除 SheepLint 使用的 Vertex AI 外，还支持 Google AI Studio、ChatGPT、DeepSearch 等 API 接口，可直接复用现有 AI 额度降低使用成本。
