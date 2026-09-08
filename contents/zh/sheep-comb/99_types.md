---
title: "SheepComb 数据结构与类型定义"
description: "SheepComb 及 SheepFamily 翻译工具链通用的 JSON 数据结构（ShWvData）与 TypeScript 类型定义详解"
date: 2026-09-08
updated: 2026-09-08
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "SheepComb"
tags:
  - "SheepComb"
  - "类型定义"
  - "TypeScript"
  - "JSON"
  - "AI联动"
  - "Geminiによる翻訳"
---

:::warning
本页面由 Gemini 机器翻译。
:::

# 数据结构与类型定义（ShWvData）

SheepComb 能够将 XML（XLIFF）、CSV、Excel 等多种格式的翻译文件统一转换并结构化为 **JSON 格式（`ShWvData`）**，便于自动化程序与大语言模型（LLM）进行深度处理。

预先规范数据结构（类型定义）具有以下核心优势：
- **精准引导 AI**：将 TypeScript 类型定义提供给 ChatGPT、Claude 等大模型，可确保其输出格式完全符合预期，杜绝数据损坏。
- **工具链无缝联动**：SheepComb、[SheepWeave](/zh/sheep-weave/)、[SheepBobbin](/zh/sheep-bobbin/) 共享统一数据结构，实现跨工具资产流转。
- **自动化脚本快速生成**：便于快速生成 Python 或 Node.js 数据处理脚本。

最新的完整类型定义代码已在 [GitHub（SheepCombV2 packages/types）](https://github.com/sheep-works/SheepCombV2/tree/main/packages/types) 开源。

---

## 整体架构：4 大核心数据模块

SheepComb 的根数据（`ShWvData`）由 **4 个核心模块** 组成：

| 模块名称 | 概述 | 包含的核心数据 |
| :--- | :--- | :--- |
| **1. `define`** | 格式标识符与版本 | 固定标识符（`'SHWV_DATA'`）、格式版本号（`'1.3'` 等） |
| **2. `meta`** | 项目全局配置 | 语言对（`sourceLang`, `targetLang`）、文件列表（`files`）、TM/TB 路径 |
| **3. `body`** | 翻译正文数据 | 逐句翻译单元列表（`units`）、提取的术语对（`terms`） |
| **4. `projectInfo`** | 项目信息（可选） | 流水线处理状态、翻译进度与 QA 警告统计（`ProjectStats`） |

完整 JSON 数据结构示例：

```json
{
  "define": {
    "name": "SHWV_DATA",
    "version": "1.3"
  },
  "meta": {
    "sourceLang": "ja",
    "targetLang": "zh",
    "projectName": "Manual_Translation_v1",
    "files": [
      { "name": "guide.xlsx", "start": 1, "end": 50 }
    ],
    "tmFiles": ["main_memory.tmx"],
    "tbFiles": ["glossary.tbx"]
  },
  "body": {
    "units": [
      /* 逐句翻译单元列表（ShWvUnit 数组） */
    ],
    "terms": [
      /* 提取的术语对列表 */
    ]
  }
}
```

---

## 1. 头部与元数据（`define` & `meta`）

存储数据集的版本规范与全局配置。

### TypeScript 类型定义

```typescript
export interface ShWvDefine {
  /** 固定头部标识符 */
  name: 'SHWV_DATA'
  /** 格式版本号 */
  version: '1.3' | '1.2' | '1.1' | '1.0'
}

export interface ShWvMeta {
  /** 源语言代码（例如: "ja", "en"） */
  sourceLang: string
  /** 目标语言代码（例如: "en", "zh"） */
  targetLang: string
  /** 项目名称（可选） */
  projectName?: string
  /** 包含的文件范围列表（多文件合并时用于范围追踪） */
  files: ShWvFileInfo[]
  /** 关联的翻译记忆库（TM）文件路径列表 */
  tmFiles?: string[]
  /** 关联的术语库（TB）文件路径列表 */
  tbFiles?: string[]
}

export interface ShWvFileInfo {
  /** 文件名称 */
  name: string
  /** 起始句段序号（从 1 开始，包含） */
  start: number
  /** 结束句段序号（包含） */
  end: number
}
```

> 💡 **多文件追踪**：即使将数十个源文件合并为一个项目，通过 `meta.files` 中的 `start` 与 `end` 范围，仍可精确追溯任意句段所属的具体文件。

---

## 2. 翻译正文数据（`body` & `ShWvUnit`）

`body.units` 是逐句翻译单元（`ShWvUnit`）的数组，是翻译编辑与 AI 处理的核心载体。

### TypeScript 类型定义

```typescript
export interface ShWvUnit {
  /** 从 1 开始的句段序号 */
  idx: number
  /** 源语言文本 */
  src: string
  /** 机器翻译（MT）或预翻译初始文本 */
  pre: string
  /** 当前译文文本（★ 编辑与 AI 翻译的核心字段） */
  tgt: string
  /** 译者备注与注释 */
  note?: string
  /** 是否为拆分/合并的从属句段 */
  isSub?: boolean
  /** 状态码（0:未翻译, 1:草稿, 2:完成 等） */
  status?: number
  /** 标签与占位符映射表（例如: { 0: "{0}", 1: "<b>" }） */
  placeholders?: Record<number, string>
  /** 参考匹配数据（TM 匹配、术语匹配等） */
  ref: ShWvRef
}
```

### 单句 JSON 实例

```json
{
  "idx": 1,
  "src": "設定画面で {0} をクリックしてください。",
  "pre": "请在设置界面点击 {0}。",
  "tgt": "请在设置界面点击 {0}。",
  "note": "参考官方手册 3.2 章节",
  "status": 1,
  "placeholders": {
    "0": "<b>[保存]</b>"
  },
  "ref": {
    "tms": [
      {
        "idx": 104,
        "ratio": 88,
        "src": "設定画面で [OK] をクリックしてください。",
        "tgt": "请在设置界面点击 [确定]。"
      }
    ],
    "tb": [
      {
        "src": "設定画面",
        "tgts": ["设置界面", "设置页面"]
      }
    ],
    "quoted": [],
    "quoted100": []
  }
}
```

---

## 3. 参考匹配数据（`ref`: TM / 术语库）

为提升翻译准确度，系统会将模糊匹配的历史翻译（TM）与术语（TB）自动注入至 `unit.ref`。

### TypeScript 类型定义

```typescript
export interface ShWvRef {
  /** 翻译记忆库（TM）匹配结果列表 */
  tms: ShWvRefTm[]
  /** 术语库（TB）匹配结果列表 */
  tb: ShWvRefTb[]
  /** 引号范围 [起始位置, 结束位置] */
  quoted: [number, number][]
  /** 引号范围内 100% 匹配的索引 */
  quoted100: number[]
}

export interface ShWvRefTm {
  /** TM 中的索引 */
  idx: number
  /** 匹配相似度百分比（0〜100） */
  ratio: number
  /** TM 中存储的源文本 */
  src: string
  /** 源文本与 TM 文本的差分差异（diff 字符串） */
  diff?: string
  /** TM 中存储的历史译文 */
  tgt: string
}

export interface ShWvRefTb {
  /** 源文本中命中的术语 */
  src: string
  /** 候选推荐译文列表 */
  tgts: string[]
  /** 术语释义与使用说明备注 */
  note?: string
}
```

> 💡 **AI 提示词技巧**：在 Prompt 中同时传入 `unit.ref.tb`（强制术语）与 `unit.ref.tms`（历史参考译文），可让 AI 输出**术语统一且文风高度一致的高质量译文**。

---

## 4. AI 批量交互与导出（`ChunkedJsonlItem` / `ChunkOptions`）

一次性向 LLM 投喂整篇大文件容易超出 Token 上下文限制或导致格式紊乱。SheepComb 支持将数据拆分为最佳大小的分块，并以 **JSONL 格式** 导出流式处理。

### TypeScript 类型定义

```typescript
/** 单行 JSONL 结构 */
export interface ChunkedJsonlItem {
  /** 句段序号 */
  index: number
  /** 源文本 */
  src: string
  /** 译文文本 */
  tgt: string
  /** 历史修改记录 */
  history: ExportPair[]
}

/** 分块导出字段选择配置 */
export interface ChunkOptions {
  src?: boolean
  tgt?: boolean
  note?: boolean
  history?: boolean
  terms?: boolean
}
```

### JSONL 导出示例

```jsonl
{"index": 1, "src": "設定画面で {0} をクリックしてください。", "tgt": "请在设置界面点击 {0}。", "history": []}
{"index": 2, "src": "変更内容が自動的に保存されます。", "tgt": "更改内容将自动保存。", "history": []}
```

---

## 5. ChatGPT / Claude / Gemini 实践提示词示例

### 示例 1: 结构化翻译与校对 Prompt（JSON 输入/输出）

```markdown
你是一位资深游戏/软件本地化专家。以下是符合 `ShWvUnit` 结构的 JSON 数据集。

【任务要求】
1. 将 `src` 准确翻译为流畅的简体中文，并将译文填入 `tgt` 字段。
2. 若 `ref.tb` 中存在术语指定，必须严格采用其中的候选译文。
3. 严格保留 `{0}` 等占位符标签的相对位置。
4. 仅返回与输入完全对应的 JSON 数组，不输出任何额外解释。

【待处理数据】
[在此粘贴 ShWvUnit JSON 数组]
```

### 示例 2: 自动化 Python 脚本生成 Prompt

```markdown
我有一个符合 `ShWvData` TypeScript 类型定义的 JSON 文件。

【任务】
请编写一个 Python 脚本：
1. 读取 `project.json`（ShWvData 格式）。
2. 过滤提取 `body.units` 中 `tgt` 为空的未翻译句段。
3. 将未翻译句段导出为 `untranslated.csv`，包含 `idx` 和 `src` 两列。

【类型定义参考】
[在此粘贴 ShWvData TypeScript 代码]
```

### 示例 3: 使用 Windows 自带的 PowerShell 实现定制提取（无需开发环境・强烈推荐）

若本地未安装 Python 等编程环境，可利用 Windows 系统自带的 **PowerShell**，快速安全地实现 SheepComb Web 默认功能之外的个性化条件提取（例如：“仅提取原文或译文中包含数字的句段”、“筛选包含特定术语备注的单元”等）。

直接将海量数据交给 AI 处理存在行数漏损或幻觉风险，而**“让 AI 编写 PowerShell 脚本后在本地运行”**的方式具备 100% 的准确性，且处理海量大文件毫无压力。

#### 提示词示例

```markdown
我有一个符合 `ShWvData` TypeScript 类型定义的 JSON 文件（project.json）。
由于我没有 Python 等编程环境，请为我编写一段在 Windows 自带的 PowerShell 中直接运行的脚本（或单行命令）。

【任务要求】
- 从 `body.units` 中提取 `src`（原文）或 `tgt`（译文）中包含半角数字的单元。
- 将提取结果导出为 `numbers_list.csv`，采用带 BOM 的 UTF-8 编码以防 Excel 打开乱码（字段: idx, src, tgt）。

【类型定义参考】
[在此粘贴 ShWvData TypeScript 代码]
```

#### AI 生成的 PowerShell 脚本示例

```powershell
# 读取 project.json，提取含数字的句段并保存为 CSV
$data = Get-Content -Raw -Encoding UTF8 "project.json" | ConvertFrom-Json
$data.body.units | Where-Object { $_.src -match '\d' -or $_.tgt -match '\d' } | 
  Select-Object idx, src, tgt | 
  Export-Csv -Path "numbers_list.csv" -NoTypeInformation -Encoding utf8BOM
```

::: tip PowerShell 运行操作步骤
1. 打开放置待处理 JSON 文件（`project.json`）的文件夹。
2. 在文件夹空白处 **按住 `Shift` 键并右键点击**，选择“在此处打开 PowerShell 窗口”（或“在终端中打开”）。
3. 粘贴 AI 生成的命令并按下 **`Enter`** 键，即可瞬间生成 CSV 文件。
:::

---

## 完整 TypeScript 类型定义代码（参考）

::: details 点击展开完整 type.d.ts 代码

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
