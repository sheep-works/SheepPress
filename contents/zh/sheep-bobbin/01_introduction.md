---
title: "SheepBobbin 使用入门"
description: "SheepBobbin 的基本概念与初始化配置指南"
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

# 使用入门

SheepBobbin 是一款利用大语言模型（LLM）进行翻译数据处理的桌面辅助工具。
其核心应用场景为翻译质检与校验，同时也支持译文初稿生成与修改润色。
通常情况下，它与在线 Web 应用 [SheepCombWeb](https://sheepcomb.netlify.app/) 配合使用。
在浏览器端将双语对齐文件（XLIFF、XLSX 等）转换为 AI 友好的 JSONL 格式，并自动切分为 AI 能够最佳理解的 Token 长度（分块/Chunking），从而获得显著优于直接盲目投喂整篇原始文件的处理精度。
此外，翻译记忆库（TM）与术语库（TB）信息亦可作为上下文一并保留在 JSON 数据结构中，实现充分融合背景信息的智能翻译与校验。

# 软件安装

1. 访问 <a href="https://storage.lambuage.com" target="_blank" rel="noopener noreferrer">下载页面</a> 获取 exe 安装程序（最新版本：Ver 1.0.1）。
2. 双击安装并启动程序。
3. 首次启动时若系统弹出网络防火墙访问提示，请选择 **允许**。

# 使用指南

打开 SheepBobbin 后将进入配置界面。
首先在 **Active Provider** 下拉列表中选择您希望使用的 AI 供应商。

## 供应商与模型配置

### 使用本地 LLM

使用 Ollama 或 LM Studio 时，需确保在同一台设备上已启动对应程序且开启了本地服务接口。

::: tip
详细配置说明请参阅 [与本地 LLM 通信](/zh/sheep-bobbin/02_local_llm)。
:::

选择供应商后若成功建立通信，将自动列出本地已安装的模型列表，从中选择要使用的模型即可。

### 使用 Google AI Studio / ChatGPT / DeepSearch

使用此类公有云服务需要您拥有对应平台的账号并获取了有效的 API 密钥（API Key）。
选择供应商后输入 API Key，校验有效后将自动拉取可用模型列表，按需选择即可。

请仔细阅读各服务的隐私条款（如数据是否会被用于模型训练等）。免费版与付费版在数据使用协议上往往存在差异。

::: tip
API 密钥获取方式请参阅 [与云端 LLM 通信](/zh/sheep-bobbin/03_cloud_llm)。
:::

### 使用 Vertex AI（企业级/共享账号）

若需要更高并发与企业级稳定性，可选择 Google Cloud Platform (GCP) 上的 Vertex AI。该方式需要拥有 GCP 账号、启用 Vertex AI 服务的项目并绑定账单。

若自行配置存在门槛，后续我们计划提供 **官方托管共享账号**。具体用户注册及费用方案正在制定中，敬请期待。

## 在 SheepCombWeb 中准备数据并发起 AI 请求

访问 [SheepCombWeb](https://sheepcomb.netlify.app/)，从 **提取（Parse）** 页面开始处理。
在浏览器端依次按照“提取 ＞ 过滤 ＞ 结构化 ＞ 解析 ＞ 管理”的步骤加工数据，最后进入 **API** 页面向 AI（LLM）发起批量处理请求。

::: tip
SheepCombWeb 的具体操作流程与功能说明请参阅 [SheepComb 帮助文档](/zh/sheep-comb/)。
:::
