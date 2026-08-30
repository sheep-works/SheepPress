---
title: "SheepBobbin 云端LLM通信配置"
description: "与 OpenAI / Claude / Gemini / Vertex AI 等云端大模型的连接配置"
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

# 与云端 LLM 通信

SheepBobbin 支持与主流云端大模型 API 的无缝通信。

## Google AI Studio

AI Studio 支持在浏览器中快速创建 API 密钥。使用 Google 账号登录 AI Studio 后，点击右上角的“Get API key”，创建并复制生成的 API Key。
在 SheepBobbin 的 Active Provider 中选择 AI Studio 并粘贴密钥。
此时 SheepBobbin 会自动拉取当前可用的 Gemini 模型列表，显示后即可正常使用。

::: tip
AI Studio 提供免费版与付费版。免费层级的 API 调用数据可能会根据条款用于模型迭代训练；绑定账单后升级为付费 API，则不会将数据用于训练。
处理商业机密或敏感情报时请务必谨慎遵守相关合规要求。
:::

## ChatGPT / OpenAI

在 OpenAI 开发者平台获取 API Key 后，在 SheepBobbin 中选择对应选项并粘贴密钥，即可调用 GPT-4o 等系列模型。

## DeepSearch / Claude

同理，填入 Anthropic 或 DeepSeek 平台的 API Key 即可接入 Claude 与 DeepSeek 系列模型。

## Vertex AI（Google Cloud 企业级平台）

Vertex AI 是 Google Cloud Platform (GCP) 提供的企业级 AI 云平台。相比面向个人开发者的 AI Studio，Vertex AI 具备更高的并发能力、更严格的企业级数据安全保障与更稳定的 SLA。

配置需要开通 GCP 账号并绑定项目账单。若觉得配置较为繁琐，可考虑使用我们计划提供的企业托管共享服务。
