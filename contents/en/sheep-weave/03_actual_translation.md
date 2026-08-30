---
title: "SheepWeave Translating Actual Files"
description: "How to use SheepWeave in real-world translation projects with Office and XLIFF files"
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

# Translating Actual Files

SheepWeave primarily handles industry-standard XLIFF variants (XLIFF/SDLXLIFF/MXLIFF/MQXLIFF), standard Office files (Word/Excel/PPT), HTML, and TXT/MD files.
If you already receive XLIFF files from clients, skip directly to **2. Translation Workflow**.

To translate non-XLIFF files directly, set up **Okapi Framework** (open-source format conversion tool) and **Java**.

## 1. Prerequisites

### 1.1 Java Runtime Environment
Okapi requires Java. Download and install Java from the [Official Java Website](https://www.java.com/download/) if not already installed.

### 1.2 Okapi Framework
Download the latest stable ZIP for your OS from the [Okapi Framework Website](https://okapiframework.org/) and extract it.

### 1.3 Setting up Okapi Folder
Place the extracted `okapi` folder inside your translation project folder (e.g., `SheepWeave_Office/okapi/`).

## 2. Translation Workflow

### 2.1 Initialization: Directory Setup
In the SheepWeave panel **Flow** tab, select **Initialization** and click execute.
This creates `Archive`, `Data` (with `Ref/TM` and `Ref/TB`), and `Working` folders.

| Folder | Purpose |
| --- | --- |
| Archive | Stores finished and archived projects. |
| Data | Place files you want to translate here. |
| Data/Ref/TM | Place translation memories (`.tmx`, `.xlsx`, `.csv`, `.json`). |
| Data/Ref/TB | Place termbases/glossaries (`.tbx`, `.xlsx`, `.csv`, `.json`). |
| Working | Auto-generated workspace for active translation tasks. |

### 2.2 Placing Files
Place source documents in `Data/` and any reference TM/TB files in `Data/Ref/`.

### 2.3 Preparation: Copy & XLIFF Conversion
In the Flow tab under **Preparation**, enter the Project Name, Source/Target languages, and execute `Copy to Working & Convert to XLIFF`.

### 2.4 Preparation: Parsing & Project File Generation
Execute `Create Project File & Analyze`. This generates `project.json` and creates `Source.shwvs` and `Target.shwvt` inside `04_SHWV`.

### 2.5 Active Translation
Open `Target.shwvt` and translate line by line, confirming segments with `Ctrl + Enter`.

### 2.6 Completion
When finished, execute `Complete Translation` under the Completion section to build updated XLIFF files in `05_COMPLETED`.

### 2.7 Rebuilding Target Office Files
Execute `Rebuild Original Files from Translated Files` to merge translations back into final Office documents (`.docx`, `.xlsx`, etc.) in `06_PACKAGE`.

### 2.8 Archiving
Execute `Archive Project` to move the working project to `Archive/YYYYMMDD`.
