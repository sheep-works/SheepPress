---
title: "SheepWeave Guide to Simple Replace"
description: "Fast global terminology replacement and automatic asset generation"
date: 2024-01-01
updated: 2026-08-30
author: "Lambuage LLC & Sheep Translation Studio"
lang: "en"
category: "SheepWeave"
tags:
  - "SheepWeave"
  - "CAT Tools"
  - "VSCode"
  - "Translation Support"
  - "Geminiによる翻訳"
---

:::warning
This page is machine-translated by Gemini.
:::

# Guide to Simple Replace

Simple Replace is inspired by the convenient `F2 Rename` feature in modern programming IDEs.

Unlike ordinary text replacement, Simple Replace automatically records every replacement event into `01_REF/auto_replace_log.jsonl`.
This log serves as valuable **translation assets**—automatically functioning as termbases and auto-completion candidates in subsequent projects!

We strongly recommend actively leveraging Simple Replace when translating with SheepWeave.

## How to Use Simple Replace

1. Select the text you wish to replace.
![Simple Replace Step1](./pict/simple_replace_step1.png)

2. Press **`F2`**.
![Simple Replace Step2](./pict/simple_replace_step2.png)

3. In the popup input box, enter the replacement text and press **`Enter`**.
![Simple Replace Step3](./pict/simple_replace_step3.png)

The change is applied across the entire file, and logged into `01_REF/auto_replace_log.jsonl`.

![Simple Replace Result](./pict/simple_replace_result.png)

Press `Ctrl + Z` to undo if needed, or press `Esc` to cancel the input box.
