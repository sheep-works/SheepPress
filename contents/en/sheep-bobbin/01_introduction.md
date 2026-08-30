---
title: "SheepBobbin Getting Started"
description: "Fundamental concepts and initial setup for SheepBobbin"
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

# Getting Started

SheepBobbin is an AI-powered translation processing tool.
While its primary purpose is translation checking and QA, it also supports generating and revising translated texts.
Typically, it is used in tandem with the web application [SheepCombWeb](https://sheepcomb.netlify.app/).
By converting bilingual files (XLIFF, XLSX, etc.) into the AI-optimized JSONL format in the browser and breaking them into optimal token sizes (chunking), it achieves significantly higher accuracy than feeding raw entire files.
Furthermore, Translation Memories (TM) and Termbases (TB) can be embedded into the JSON payload, making context-aware translation and QA seamless.

# Installation

1. Visit <a href="https://storage.lambuage.com" target="_blank" rel="noopener noreferrer">this link</a> to download the executable (`.exe`) (Latest: Ver 1.0.1).
2. Double-click to install and launch the application.
3. On first startup, if prompted for network firewall permissions, click **Allow**.

# How to Use

When you open SheepBobbin, the configuration window will appear.
First, select your desired provider from the **Active Provider** dropdown list.

## Configuring Providers and Models

### Using Local LLMs

For Ollama and LM Studio, the application must be running on the same machine with its server API enabled.

::: tip
For detailed instructions, refer to [Connecting to Local LLMs](/en/sheep-bobbin/02_local_llm).
:::

Once selected, if the connection is established, the list of installed models will appear. Select the model you wish to use.

### Using Google AI Studio / ChatGPT / DeepSearch

To use these services, you must hold access credentials and an active API key for the respective service.
Select the provider, enter your API key, and if valid, available models will be populated. Select the model you want.

Please review each service's privacy policy regarding data handling (whether prompts are used for model training). Data terms often differ between free and paid tiers.

::: tip
For how to obtain API keys, refer to [Connecting to Cloud LLMs](/en/sheep-bobbin/03_cloud_llm).
:::

### Using Vertex AI (Sheep / User Account)

For advanced enterprise processing, Vertex AI on Google Cloud Platform (GCP) is supported. This requires a GCP account, a project with Vertex AI enabled, and billing information.

If setting up your own GCP project is challenging, we plan to provide access through **our managed shared account**. User registration details and pricing are currently being finalized.

## Preparing Data in SheepCombWeb and Requesting AI

Access [SheepCombWeb](https://sheepcomb.netlify.app/) and start from the **Extract (Parse)** page.
Follow the sequence: "Extract > Filter > Structure > Analyze > Manage", and finally proceed to the **API** page to send requests to your AI models.

::: tip
For step-by-step instructions on SheepCombWeb, refer to [SheepComb Documentation](/en/sheep-comb/).
:::
