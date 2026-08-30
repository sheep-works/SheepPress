---
title: "SheepBobbin Local LLM Setup"
description: "How to connect SheepBobbin with local LLMs like Ollama and LM Studio"
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

# Connecting to Local LLMs

To communicate with local LLMs from SheepBobbin, the local server function must be enabled.

## When Using Ollama

Ollama includes built-in server functionality by default. After installing Ollama and your desired model, launch it alongside SheepBobbin and leave it running in the background.

When you select Ollama as the Active Provider, SheepBobbin queries Ollama for installed models. Once the model list appears, the connection is active, and you can proceed with data processing in SheepCombWeb.
If the list does not load, restart Ollama or check the SheepBobbin console logs.

::: tip
SheepBobbin communicates with Ollama via the default port (11434). If you changed it, please revert to the default port.
:::

## When Using LM Studio

LM Studio does not open its local server by default. You need to explicitly enable the server mode.
Launch LM Studio, open the Developer/Server options, and click the Start Server button in the top left. Keep LM Studio open while working.

With the server running, select LM Studio as Active Provider in SheepBobbin. It will query the available models. Once the list loads, the connection is verified.
If models do not appear, restart LM Studio or inspect the console output.

::: tip
SheepBobbin communicates with LM Studio via the default port (8080). If you customized it, please revert to the default port.
:::
