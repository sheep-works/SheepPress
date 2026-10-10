---
title: "SheepWeave Continuous Translation"
description: "Managing continuous workflows, asset reuse, and incremental updates in SheepWeave"
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

# Continuous Translation

In professional translation, tasks rarely end with a single delivery. You often receive additional files midway through a project or need to reuse previous project data as Translation Memories (TM) or Termbases (TB).

Built on plain text and open JSON standards, SheepWeave excels at continuous translation and agile asset reuse.

---

## Adding Source Files Midway

If the client supplies new files (Word, Excel, XLIFF, etc.) during an ongoing project:

1. **Place New Files**: Copy the new source files into `Working/02_SOURCE`.
2. **Update Project (Flow Tab)**: In the SheepWeave panel **Flow** tab under **On Working**, click **`🧶 Add Source Files`**.
3. **Automatic Editor Sync**: The new segments are extracted and appended to the end of `Target.shwvt` without affecting your confirmed translations or `project.json`.

---

## Utilizing Reference Files

### Reusing `project.json` as a TM
Any `project.json` from completed SheepWeave projects functions directly as a full TM.
Copy `project.json` into the new project's `Data/Ref/TM` folder. Matches and similarity ratios will be automatically calculated in the Translate tab.

### Leveraging Generated Assets
- **`phrase.jsonl` (IntelliSense Phrases)**: Store frequent expressions in `Working/01_REF/phrase.jsonl` for instant `Ctrl + Space` completion.
- **`auto_replace_log.jsonl` (Direct TB)**: Replacements made with `F2` or `Ctrl + Shift + Z` are automatically logged and recognized as live termbase candidates.

### Standard Format Compatibility
Place standard TMX, TBX, Excel (`.xlsx`), or CSV files into `Data/Ref/TM` or `Data/Ref/TB`, then execute **`📈 Reanalyze Project Files & Add Reference Files`** in the Flow tab.

---

## Future Roadmap

### ManticoreSearch Indexing
Because SheepWeave data is structured JSON, indexing hundreds of thousands of past segments into the lightning-fast ManticoreSearch engine enables sub-millisecond concordance lookups and rich RAG context for LLMs.

### Git Version Control
All SheepWeave files (`.shwvt`, `.shwvs`, `project.json`) are 100% plain text. Using Git allows precise diff tracking per line, branch-based collaborative reviews, and effortless cloud synchronization.
