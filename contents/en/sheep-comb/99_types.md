---
title: "SheepComb Data Schema & Types"
description: "Detailed guide to the JSON data schema (ShWvData) and TypeScript type definitions used across SheepComb and the SheepFamily toolchain"
date: 2026-09-08
updated: 2026-09-08
author: "Lambuage LLC & Sheep Translation Studio"
lang: "en"
category: "SheepComb"
tags:
  - "SheepComb"
  - "Type Definitions"
  - "TypeScript"
  - "JSON"
  - "AI Integration"
  - "Geminiによる翻訳"
---

:::warning
This page is machine-translated by Gemini.
:::

# Data Schema & Type Definitions (ShWvData)

SheepComb transforms diverse translation file formats—such as XML (XLIFF), CSV, and Excel—into a unified, structured **JSON format (`ShWvData`)** optimized for programmatic pipelines and Large Language Models (LLMs).

Standardizing the data schema provides several key benefits:
- **Precise AI Instruction**: Supplying the TypeScript schema to LLMs like ChatGPT and Claude ensures structured outputs without format degradation.
- **Interoperability**: SheepComb, [SheepWeave](/en/sheep-weave/), and [SheepBobbin](/en/sheep-bobbin/) share the exact same data schema for frictionless workflow handoffs.
- **Automated Script Generation**: Accelerates generation of custom Python or Node.js data manipulation scripts.

The latest type definitions are available on [GitHub (SheepCombV2 packages/types)](https://github.com/sheep-works/SheepCombV2/tree/main/packages/types).

---

## Overview: 4 Core Data Blocks

A `ShWvData` root object is divided into **four main sections**:

| Block Name | Summary | Key Contents |
| :--- | :--- | :--- |
| **1. `define`** | Format identifier & version | Fixed identifier (`'SHWV_DATA'`), schema version (`'1.3'`, etc.) |
| **2. `meta`** | Project configuration | Language pair (`sourceLang`, `targetLang`), file list (`files`), TM/TB paths |
| **3. `body`** | Core translation data | List of translation units (`units`), extracted term pairs (`terms`) |
| **4. `projectInfo`** | Project metadata (Optional) | Pipeline processing state, progress & QA warning stats (`ProjectStats`) |

Complete JSON Structure Example:

```json
{
  "define": {
    "name": "SHWV_DATA",
    "version": "1.3"
  },
  "meta": {
    "sourceLang": "ja",
    "targetLang": "en",
    "projectName": "Manual_Translation_v1",
    "files": [
      { "name": "guide.xlsx", "start": 1, "end": 50 }
    ],
    "tmFiles": ["main_memory.tmx"],
    "tbFiles": ["glossary.tbx"]
  },
  "body": {
    "units": [
      /* Array of translation segments (ShWvUnit[]) */
    ],
    "terms": [
      /* Array of extracted term pairs */
    ]
  }
}
```

---

## 1. Header & Metadata (`define` & `meta`)

Maintains dataset schema versioning and project-wide configurations.

### TypeScript Schema

```typescript
export interface ShWvDefine {
  /** Fixed header identifier */
  name: 'SHWV_DATA'
  /** Schema version */
  version: '1.3' | '1.2' | '1.1' | '1.0'
}

export interface ShWvMeta {
  /** Source language BCP-47 / ISO code (e.g., "ja", "en") */
  sourceLang: string
  /** Target language BCP-47 / ISO code (e.g., "en", "zh") */
  targetLang: string
  /** Optional project name */
  projectName?: string
  /** Contained file range info for multi-file datasets */
  files: ShWvFileInfo[]
  /** Paths to referenced Translation Memory (TM) files */
  tmFiles?: string[]
  /** Paths to referenced Termbase (TB) files */
  tbFiles?: string[]
}

export interface ShWvFileInfo {
  /** File name */
  name: string
  /** Starting segment index (1-based, inclusive) */
  start: number
  /** Ending segment index (inclusive) */
  end: number
}
```

> 💡 **Multi-file Range Tracking**: Even when merging dozens of source files into a single project, `meta.files` maintains the exact `start` and `end` segment boundaries for each file.

---

## 2. Translation Body Data (`body` & `ShWvUnit`)

`body.units` is an array of `ShWvUnit` objects representing individual translation segments. This is the primary target for translation editing and AI operations.

### TypeScript Schema

```typescript
export interface ShWvUnit {
  /** 1-based segment index */
  idx: number
  /** Source language text */
  src: string
  /** Machine translation or pre-translation initial text */
  pre: string
  /** Active target translation text (★ Primary field for editing and AI generation) */
  tgt: string
  /** Optional translator note */
  note?: string
  /** Flag indicating if segment is subordinate (joined/split segment) */
  isSub?: boolean
  /** Status code (0: untranslated, 1: draft, 2: completed, etc.) */
  status?: number
  /** Placeholder tag mapping (e.g., { 0: "{0}", 1: "<b>" }) */
  placeholders?: Record<number, string>
  /** Reference match data (TM matches, TB terms, etc.) */
  ref: ShWvRef
}
```

### Segment Example in JSON

```json
{
  "idx": 1,
  "src": "設定画面で {0} をクリックしてください。",
  "pre": "Click {0} on the settings screen.",
  "tgt": "Click {0} on the settings screen.",
  "note": "Per style guide section 3.2",
  "status": 1,
  "placeholders": {
    "0": "<b>[Save]</b>"
  },
  "ref": {
    "tms": [
      {
        "idx": 104,
        "ratio": 88,
        "src": "設定画面で [OK] をクリックしてください。",
        "tgt": "Click [OK] on the settings screen."
      }
    ],
    "tb": [
      {
        "src": "設定画面",
        "tgts": ["settings screen", "Settings page"]
      }
    ],
    "quoted": [],
    "quoted100": []
  }
}
```

---

## 3. Reference Matches (`ref`: TM & Termbase)

To maximize translation accuracy, matched fuzzy suggestions from Translation Memories (TM) and Termbases (TB) are populated into `unit.ref`.

### TypeScript Schema

```typescript
export interface ShWvRef {
  /** Translation Memory (TM) match results */
  tms: ShWvRefTm[]
  /** Termbase (TB) glossary match results */
  tb: ShWvRefTb[]
  /** Quoted text ranges as [start, end] tuple arrays */
  quoted: [number, number][]
  /** Indices of 100% exact matches in quoted ranges */
  quoted100: number[]
}

export interface ShWvRefTm {
  /** Index in TM source */
  idx: number
  /** Match similarity ratio (0 to 100) */
  ratio: number
  /** Source text in TM */
  src: string
  /** Word/char diff between unit source and TM source */
  diff?: string
  /** Translation text in TM */
  tgt: string
}

export interface ShWvRefTb {
  /** Matched source term */
  src: string
  /** Candidate target translations */
  tgts: string[]
  /** Usage note or term definition */
  note?: string
}
```

> 💡 **AI Prompting Tip**: Passing `unit.ref.tb` (mandatory terminology) and `unit.ref.tms` (reference translations) alongside `src` in your AI prompts ensures **consistent terminology and stylistic alignment with historical translations**.

---

## 4. AI Chunking & Export Formats (`ChunkedJsonlItem` / `ChunkOptions`)

Feeding large documents to LLMs in a single call risks context degradation and token limit errors. SheepComb provides robust chunking to export datasets in streamable **JSONL format**.

### TypeScript Schema

```typescript
/** Single-line JSONL item representation */
export interface ChunkedJsonlItem {
  /** Segment index */
  index: number
  /** Source text */
  src: string
  /** Target text */
  tgt: string
  /** Edit history */
  history: ExportPair[]
}

/** Options selecting fields to include in export chunks */
export interface ChunkOptions {
  src?: boolean
  tgt?: boolean
  note?: boolean
  history?: boolean
  terms?: boolean
}
```

### JSONL Stream Sample

```jsonl
{"index": 1, "src": "設定画面で {0} をクリックしてください。", "tgt": "Click {0} on the settings screen.", "history": []}
{"index": 2, "src": "変更内容が自動的に保存されます。", "tgt": "Changes will be saved automatically.", "history": []}
```

---

## 5. Practical AI Prompt Examples (ChatGPT / Claude / Gemini)

### Example 1: Translation & QA Prompt (JSON Input/Output)

```markdown
You are a professional localization specialist. Below is a JSON dataset adhering to the `ShWvUnit` schema.

[Task Instructions]
1. Translate `src` into natural English and place the result into `tgt`.
2. Strictly follow the candidate translations provided in `ref.tb` whenever present.
3. Preserve all placeholders like `{0}` exactly in their proper positions.
4. Return ONLY the updated JSON array matching the exact input structure.

[Input Data]
[Paste your ShWvUnit JSON array here]
```

### Example 2: Automatic Python Script Generation

```markdown
Below is a TypeScript type definition for a translation dataset (`ShWvData`).

[Task]
Write a Python script that:
1. Loads an `project.json` file structured as `ShWvData`.
2. Filters all items in `body.units` where `tgt` is empty.
3. Saves the filtered segments into `untranslated.csv` with columns `idx` and `src`.

[Type Definitions]
[Paste ShWvData TypeScript schema here]
```

### Example 3: Custom Extraction via Built-in Windows PowerShell (No Coding Environment Required)

If you don't have Python or a developer environment installed, you can leverage **Windows built-in PowerShell** to safely execute custom data filtering that isn't provided by default in SheepComb Web (e.g., extracting segments containing numbers, filtering specific terminology notes, etc.).

Asking an LLM to directly process and reformat large datasets carries risks of line truncation and hallucination. In contrast, **"asking the AI to write a PowerShell script and running it locally"** provides 100% deterministic accuracy with zero truncation risk, even on massive files.

#### Prompt Example

```markdown
Below is a TypeScript type definition for a translation dataset (ShWvData) contained in a JSON file (`project.json`).
I do not have a Python environment. Please write a Windows PowerShell script (or one-liner command) to process the file.

[Task Instructions]
- From `body.units`, extract all items where either `src` (source) or `tgt` (target) contains numbers.
- Export the matching segments to `numbers_list.csv` using UTF-8 with BOM for clean Excel compatibility (columns: idx, src, tgt).

[Type Definitions]
[Paste ShWvData TypeScript schema here]
```

#### PowerShell Output Example

```powershell
# Load project.json, filter units containing numbers, and export to CSV
$data = Get-Content -Raw -Encoding UTF8 "project.json" | ConvertFrom-Json
$data.body.units | Where-Object { $_.src -match '\d' -or $_.tgt -match '\d' } | 
  Select-Object idx, src, tgt | 
  Export-Csv -Path "numbers_list.csv" -NoTypeInformation -Encoding utf8BOM
```

::: tip How to Run PowerShell Commands
1. Open the folder containing your JSON file (`project.json`).
2. Hold **`Shift` and right-click** in an empty area of the folder, then select "Open PowerShell window here" (or "Open in Terminal").
3. Paste the AI-generated command and press **`Enter`**. Your CSV file will be generated instantly.
:::

---

## Complete TypeScript Definitions (Reference)

::: details Click to view complete type.d.ts

```typescript
// ShWvData type definitions for SheepFamily Tools
// Package: @sheep-works/types

export interface TranslationPair {
  idx: number
  src: string
  tgt: string
  note?: string
  isSub?: boolean
  status?: number
  placeholders?: Record<number, string>
}

export interface TranslationPairWithFile extends TranslationPair {
  file: string
}

export interface ShWvDefine {
  name: 'SHWV_DATA'
  version: '1.3' | '1.2' | '1.1' | '1.0'
}

export interface ShWvFileInfo {
  name: string
  start: number
  end: number
}

export interface ShWvMeta {
  bilingualPath?: string
  files: ShWvFileInfo[]
  sourceLang: string
  targetLang: string
  projectName?: string
  tmFiles?: string[]
  tbFiles?: string[]
  workflow?: { index: number; role: string; name: string; segmentation?: string }
}

export interface ShWvBody {
  units: ShWvUnit[]
  terms: { src: string; tgt: string }[]
}

export interface ShWvUnit {
  idx: number
  src: string
  pre: string
  tgt: string
  note?: string
  isSub?: boolean
  status?: number
  isPeRef?: boolean
  ref: ShWvRef
  placeholders?: Record<number, string>
}

export interface ShWvRef {
  tms: ShWvRefTm[]
  tb: ShWvRefTb[]
  quoted: [number, number][]
  quoted100: number[]
}

export interface ShWvRefTm {
  idx: number
  src: string
  diff?: string
  tgt: string
  ratio: number
  freeze?: boolean
  file?: string
}

export interface ShWvRefTb {
  src: string
  tgts: string[]
  note?: string
  file?: string
}

export interface ProjectFileStatus {
  source: string
  xliff: string | null
  status: 'extracted' | 'translated' | 'merged' | 'error'
  errorMsg?: string
}

export interface ProjectGroup {
  filter: string
  files: ProjectFileStatus[]
}

export interface ProjectStats {
  segments: number
  untranslated: number
  qaWarnings: number
  termsMatched: number
}

export interface ProjectInfo {
  version: number
  projectName: string
  sourceLanguage: string
  targetLanguage: string
  sourceFiles: string[]
  okapi: ProjectGroup[]
  lastPreparedAt?: string
  stats?: ProjectStats
}

export interface ShWvData {
  define: ShWvDefine
  meta: ShWvMeta
  body: ShWvBody
  projectInfo?: ProjectInfo
}

export interface ExportPair {
  src: string
  tgt: string
}

export interface ChunkedJsonlItem {
  index: number
  src: string
  tgt: string
  history: ExportPair[]
}

export type ManagedDataType = 'UNITS' | 'TMS' | 'TBS' | 'JSONL' | 'JSONL_CHUNKED' | 'CSV' | 'SPLIT_BY_FILE' | 'SPLIT_BY_LENGTH'

export type DntFilterType = 'digit' | 'eng' | 'digit eng' | null

export interface ProcessorOptions {
  toFilterDuplicate?: boolean
  filterLevel?: "SRC" | "SRC_TGT" | "SRC_TGT_NOTE"
  toFilterDnt?: DntFilterType
  toFilterLock?: boolean
}

export interface ChunkOptions {
  src?: boolean
  tgt?: boolean
  note?: boolean
  history?: boolean
  terms?: boolean
}

export function createChunkOptions(options?: ChunkOptions): Required<ChunkOptions> {
  return {
    src: options?.src ?? false,
    tgt: options?.tgt ?? false,
    note: options?.note ?? false,
    history: options?.history ?? false,
    terms: options?.terms ?? false,
  }
}
```

:::
