---
title: "SheepBobbin Cloud LLM Setup"
description: "Connecting with Cloud LLMs such as OpenAI, Claude, Gemini, and Vertex AI"
date: 2024-01-01
updated: 2026-08-30
author: "Lambuage LLC & Sheep Translation Studio"
lang: "en"
category: "SheepBobbin"
tags:
  - "SheepBobbin"
  - "LLM"
  - "AI Integration"
  - "Local LLM"
  - "Geminiによる翻訳"
---

:::warning
This page is machine-translated by Gemini.
:::

# Connecting to Cloud LLMs

SheepBobbin supports seamless integration with various cloud-based LLMs.

## Google AI Studio

AI Studio allows quick generation of API keys directly in the browser. Log in to AI Studio with your Google account and click "Get API key". Create a new key with a descriptive project name.
Copy the generated API key, select "AI Studio" in SheepBobbin's Active Provider dropdown, and paste the key.
SheepBobbin will query available Gemini models. Once listed, the integration is complete.

::: tip
AI Studio offers both free and paid tiers. Free-tier API calls may be used for model training according to Google's terms. Setting up billing on your API key upgrades it to a paid key where user data is not used for training.
Exercise strict caution regarding confidential client information.
:::

## ChatGPT / OpenAI

Obtain an API key from the OpenAI Developer Platform, select ChatGPT/OpenAI in SheepBobbin, and paste your API key to access GPT-4o / GPT-4o-mini and other models.

## DeepSearch / Claude

Similarly, provide your respective API keys to connect with DeepSeek or Anthropic Claude models.

## Vertex AI (Google Cloud)

Vertex AI is Google's enterprise-grade PaaS on Google Cloud Platform (GCP). While powered by the same foundation models as AI Studio, Vertex AI offers dedicated enterprise quotas, robust security certifications, and high-concurrency stability.

Setup requires a GCP account, project configuration, and billing setup. If you prefer a streamlined experience without managing GCP infrastructure, consider our upcoming shared enterprise service.
