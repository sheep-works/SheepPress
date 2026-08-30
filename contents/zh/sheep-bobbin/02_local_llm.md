---
title: "SheepBobbin 本地LLM通信配置"
description: "与 Ollama / LM Studio 等本地大模型连接的配置方法"
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

# 与本地 LLM 通信

要在 SheepBobbin 中与本地 LLM 通信，必须开启本地服务端功能。

## 使用 Ollama 时

Ollama 默认自带后台服务功能。安装 Ollama 并下载好对应模型后，保持其在后台常驻运行即可。

在此状态下，在 Active Provider 中选择 Ollama，SheepBobbin 会自动查询本地已安装的模型列表。若列表中正常显示模型名称，说明通信成功，即可返回 SheepCombWeb 进行后续数据处理。
若未显示模型列表，请尝试重启 Ollama 或查看 SheepBobbin 控制台日志。

::: tip
SheepBobbin 与 Ollama 通信默认使用 11434 端口。若曾修改过端口配置，请还原为默认端口。
:::

## 使用 LM Studio 时

LM Studio 默认状态下并未开启本地服务。因此需要手动启用 Local Server 功能。
启动 LM Studio 后进入 Developer / Server 选项卡，点击左上角的 Start Server 按钮启动服务，并保持 LM Studio 窗口开启。

在此状态下，在 Active Provider 中选择 LM Studio，SheepBobbin 会自动拉取已加载的模型列表。正常显示模型名称即表示连接成功。
若未检测到模型，请重启 LM Studio 或检查控制台信息。

::: tip
SheepBobbin 与 LM Studio 通信默认使用 8080 端口。若曾修改过端口，请还原为默认端口。
:::
