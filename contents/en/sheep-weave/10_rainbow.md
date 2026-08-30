---
title: "SheepWeave Multilingual Excel & Rainbow"
description: "Translating multilingual Excel files using Okapi Rainbow and SheepWeave"
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

# Multilingual Excel Translation & Rainbow

Multilingual Excel spreadsheets (with columns for English, Japanese, Chinese, etc.) are widely used in game localization and enterprise documentation.

Using **Okapi Rainbow** (the GUI utility of Okapi Framework), you can extract standard bilingual XLIFF files from complex multilingual Excel sheets, translate them rapidly in SheepWeave, and cleanly merge translations back into the original Excel workbook.

---

## Why Use Rainbow?
- **Precise Column Mapping**: Explicitly maps source, target, and comment columns.
- **Standard XLIFF Generation**: Creates standard `.xlf` files fully compatible with SheepWeave.
- **Flawless Formatting Preservation**: Merges translated text back into the original workbook without breaking styles, formulas, or cell layouts.

---

## End-to-End Workflow

1. **Extract with Rainbow**: Convert Multilingual Excel ➔ Bilingual XLIFF (`.xlf`).
2. **Translate in SheepWeave**: Place `.xlf` in `Working/02_SOURCE`, initialize, and translate with full CAT + AI power.
3. **Merge with Rainbow**: In Rainbow, run **Utilities ➔ Post-Processing** to merge the completed XLIFF back into the master multilingual Excel file.

::: tip Getting Okapi Rainbow
Okapi Rainbow is free and open-source, available for download at the [Okapi Framework Official Website](https://okapiframework.org/).
:::
