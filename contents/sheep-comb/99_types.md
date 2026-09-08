---
title: "SheepComb のデータ構造と型定義"
description: "SheepComb および SheepFamily で使用される JSON データ構造（ShWvData）と TypeScript 型定義の解説"
date: 2026-09-08
updated: 2026-09-08
author: "合同会社ランベージ & ひつじの翻訳室"
lang: "ja"
category: "SheepComb"
tags:
  - "SheepComb"
  - "型定義"
  - "TypeScript"
  - "JSON"
  - "AI連携"
---

# データ構造と型定義（ShWvData）

SheepComb は、XML（XLIFF）や CSV、Excel などの多様な翻訳ファイルを、プログラムや AI（LLM）で扱いやすい **JSON 形式（ShWvData）** に変換・構造化して処理します。

あらかじめデータ構造（型定義）を定義しておくことで、以下のメリットがあります：
- **AI への正確な指示**: ChatGPT や Claude などの LLM に型定義を読み込ませることで、フォーマット崩れのないデータ成形や自動翻訳が可能になります。
- **ツール間の連携**: SheepComb、[SheepWeave](/sheep-weave/)、[SheepBobbin](/sheep-bobbin/) が同じデータ構造を共有し、スムーズに連携できます。
- **スクリプトの自動生成**: Python や Node.js で翻訳データを操作するスクリプトを素早く生成できます。

最新の完全な型定義ファイルは [GitHub（SheepCombV2 packages/types）](https://github.com/sheep-works/SheepCombV2/tree/main/packages/types) で公開されています。

---

## 全体マップ：4つの主要ブロック

SheepComb のルートデータ（`ShWvData`）は、大きく分けて **4 つのブロック** で構成されています。

| ブロック名 | 概要 | 主な格納情報 |
| :--- | :--- | :--- |
| **1. `define`** | フォーマット識別子とバージョン | 固定識別子（`'SHWV_DATA'`）、スキーマバージョン（`'1.3'` 等） |
| **2. `meta`** | プロジェクトの基本設定 | 言語ペア（`sourceLang`, `targetLang`）、元ファイル情報（`files`）、参照 TM/TB パス |
| **3. `body`** | 翻訳データ本体 | 1文ごとの翻訳ユニット一覧（`units`）、抽出用語一覧（`terms`） |
| **4. `projectInfo`** | プロジェクト情報（任意） | パイプライン処理状態、翻訳進捗・警告の統計情報（`ProjectStats`） |

実際の JSON データの全体イメージ：

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
      /* 1文ごとの翻訳データ（ShWvUnit の配列） */
    ],
    "terms": [
      /* 抽出された用語ペア一覧 */
    ]
  }
}
```

---

## 1. ヘッダーとメタデータ（`define` & `meta`）

データのバージョンとプロジェクトの全体設定を保持します。

### 型定義

```typescript
export interface ShWvDefine {
  /** 固定ヘッダー名 */
  name: 'SHWV_DATA'
  /** スキーマのバージョン */
  version: '1.3' | '1.2' | '1.1' | '1.0'
}

export interface ShWvMeta {
  /** 原文の言語コード（例: "ja", "en"） */
  sourceLang: string
  /** 訳文の言語コード（例: "en", "zh"） */
  targetLang: string
  /** プロジェクト名（任意） */
  projectName?: string
  /** 含まれるファイル情報の一覧（複数ファイル結合時の範囲追跡用） */
  files: ShWvFileInfo[]
  /** 参照した翻訳メモリ（TM）のファイルパス一覧 */
  tmFiles?: string[]
  /** 参照した用語集（TB）のファイルパス一覧 */
  tbFiles?: string[]
}

export interface ShWvFileInfo {
  /** ファイル名 */
  name: string
  /** 開始セグメント番号（1始まり・含む） */
  start: number
  /** 終了セグメント番号（含む） */
  end: number
}
```

> 💡 **複数ファイルの管理**: 複数のファイルを1つのプロジェクトにまとめた場合でも、`meta.files` の `start` と `end` を参照することで、どのセグメントがどのファイルに属しているかを正確に逆引きできます。

---

## 2. 翻訳本文データ（`body` & `ShWvUnit`）

`body.units` は、1文（セグメント）ごとの翻訳ユニット（`ShWvUnit`）の配列です。翻訳作業や AI 処理のメイン対象となります。

### 型定義

```typescript
export interface ShWvUnit {
  /** 1から始まる通し番号 */
  idx: number
  /** 原文テキスト */
  src: string
  /** 機械翻訳（MT）や事前翻訳の初期テキスト */
  pre: string
  /** 現在の訳文（★編集・AI処理のメインフィールド） */
  tgt: string
  /** 翻訳者メモや注記 */
  note?: string
  /** 分割・結合された従属セグメントかどうかのフラグ */
  isSub?: boolean
  /** ステータスコード（0:未着手、1:下書き、2:確定 など） */
  status?: number
  /** タグやインライン要素の退避マップ（例: { 0: "{0}", 1: "<b>" }） */
  placeholders?: Record<number, string>
  /** 参照情報（TM一致・用語集一致など） */
  ref: ShWvRef
}
```

### 1 セグメントの実例 JSON

```json
{
  "idx": 1,
  "src": "設定画面で {0} をクリックしてください。",
  "pre": "Click {0} on the settings screen.",
  "tgt": "Click {0} on the settings screen.",
  "note": "公式マニュアル 3.2 節に準拠",
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

## 3. 参照データ（`ref`: TM / 用語集のマッチ情報）

高精度な翻訳を行うために、過去の翻訳資産（TM）や用語集（TB）の一致結果が `unit.ref` に自動で注入されます。

### 型定義

```typescript
export interface ShWvRef {
  /** 翻訳メモリ（TM）の一致候補リスト */
  tms: ShWvRefTm[]
  /** 用語集（TB）の一致用語リスト */
  tb: ShWvRefTb[]
  /** 引用符で囲まれた範囲 [開始位置, 終了位置] */
  quoted: [number, number][]
  /** 引用範囲内の100%一致インデックス */
  quoted100: number[]
}

export interface ShWvRefTm {
  /** TM側でのインデックス */
  idx: number
  /** 一致率（0〜100） */
  ratio: number
  /** TMに登録されている原文 */
  src: string
  /** 原文とTM原文の差分情報（diff文字列） */
  diff?: string
  /** TMに登録されている過去訳文（※ユニットのtgtと混同しないこと） */
  tgt: string
}

export interface ShWvRefTb {
  /** 原文中で検出された用語 */
  src: string
  /** 推奨される訳語の候補リスト */
  tgts: string[]
  /** 用語の定義や使い分けに関するメモ */
  note?: string
}
```

> 💡 **AI 活用のコツ**: プロンプトに `unit.ref.tb`（必須用語）や `unit.ref.tms`（参考訳）を一緒に渡すことで、**用語の統一性を保ち、過去の訳調に揃えた高精度な翻訳**を AI に出力させることができます。

---

## 4. AI 連携・エクスポート用データ（`ChunkedJsonlItem` / `ChunkOptions`）

長大なファイルを AI に一括投入すると、トークン上限や精度低下の原因になります。SheepComb では、データを安全なサイズに小分け（チャンク化）し、扱いやすい **JSONL 形式** でエクスポートできます。

### 型定義

```typescript
/** JSONL の 1 行を表すデータ形式 */
export interface ChunkedJsonlItem {
  /** 文番号 */
  index: number
  /** 原文 */
  src: string
  /** 訳文 */
  tgt: string
  /** 過去の編集履歴 */
  history: ExportPair[]
}

/** チャンクに含める項目を選択するオプション */
export interface ChunkOptions {
  /** 原文を含めるか */
  src?: boolean
  /** 訳文を含めるか */
  tgt?: boolean
  /** メモを含めるか */
  note?: boolean
  /** 編集履歴を含めるか */
  history?: boolean
  /** 用語集の一致を含めるか */
  terms?: boolean
}
```

### JSONL エクスポートの 1 行例

```jsonl
{"index": 1, "src": "設定画面で {0} をクリックしてください。", "tgt": "Click {0} on the settings screen.", "history": []}
{"index": 2, "src": "変更内容が自動的に保存されます。", "tgt": "Changes will be saved automatically.", "history": []}
```

---

## 5. 実践：ChatGPT / Claude / Gemini での活用プロンプト例

型定義を活用して、AI（LLM）にデータ変換や自動翻訳を実行させるプロンプトの実例です。

### 事例 1: 翻訳・校正プロンプト（JSON 入出力）

少量であれば、AI に直接加工を依頼することもできます。

```markdown
以下の TypeScript 型定義（ShWvUnit）に準拠した JSON データがあります。

【依頼内容】
1. 各項目の `src`（原文）を自然な英語に翻訳し、`tgt` フィールドに格納してください。
2. `ref.tb`（用語集）に指定がある用語は、必ずその候補訳を使用してください。
3. `{0}` などのプレースホルダーはそのままの位置で保持してください。
4. 入力と同じ JSON 配列形式のみを出力してください。

【対象データ】
[ここに ShWvUnit の JSON 配列を貼り付け]
```

### 事例 2: Python スクリプト自動生成プロンプト

大量のデータを AI に直接渡して抽出・編集させると、行の脱落やハルシネーションの恐れがありますが、**「AI にスクリプトを書かせて、手元で実行する」** 方法であれば、脱落リスク 0% で大容量ファイルも処理できます。

```markdown
以下の TypeScript 型定義（ShWvData）に準拠した JSON ファイルがあります。

【依頼内容】
Python スクリプトを作成してください。
- 入力: project.json（ShWvData 形式）
- 処理: `body.units` の中で、`tgt` が空文字列になっている項目のみを抽出し、CSV 形式（カラム: idx, src）で `untranslated.csv` に保存する。

【型定義】
[ShWvData の型定義を貼り付け]
```

### 事例 3: Windows 標準の PowerShell を使った独自抽出（開発環境不要・おすすめ）

Python などのプログラミング環境が手元にない場合でも、Windows に標準搭載されている **PowerShell** を使うのも一つの手です。

#### プロンプト例

```markdown
以下の TypeScript 型定義（ShWvData）に準拠した JSON ファイル（project.json）があります。
Python などの開発環境がないため、Windows 標準の PowerShell で実行できるスクリプト（または1行コマンド）を作成してください。

【依頼内容】
- `body.units` の中から、`src`（原文）または `tgt`（訳文）に数字が含まれているユニットを抽出する。
- 抽出結果を `numbers_list.csv` として Excel で文字化けしない UTF-8（BOM付き）で保存する（カラム: idx, src, tgt）。

【型定義】
[ShWvData の型定義を貼り付け]
```

#### AI が出力する PowerShell スクリプトの例

```powershell
# project.json を読み込み、数字を含む文を抽出して CSV に保存
$data = Get-Content -Raw -Encoding UTF8 "project.json" | ConvertFrom-Json
$data.body.units | Where-Object { $_.src -match '\d' -or $_.tgt -match '\d' } | 
  Select-Object idx, src, tgt | 
  Export-Csv -Path "numbers_list.csv" -NoTypeInformation -Encoding utf8BOM
```

::: tip PowerShell の実行手順
1. 対象の JSON ファイル（`project.json`）があるフォルダを開きます。
2. フォルダの何もない場所で **`Shift` キーを押しながら右クリック** し、「PowerShell ウィンドウをここで開く」（または「ターミナルで開く」）を選択します。
3. AI が出力したコマンドを貼り付けて **`Enter`** を押すだけで、一瞬で CSV ファイルが作成されます。
:::

---

## 完全な TypeScript 型定義コード（リファレンス）

開発者向けの完全な型定義コードです。

::: details 完全な type.d.ts を表示

```typescript
// ShWvData type definitions for SheepFamily Tools
// Package: @sheep-works/types

/**
 * 基本的な翻訳ペア（単一セグメント）
 */
export interface TranslationPair {
  idx: number
  src: string
  tgt: string
  note?: string
  isSub?: boolean
  status?: number
  placeholders?: Record<number, string>
}

/**
 * ファイル情報付きの翻訳ペア
 */
export interface TranslationPairWithFile extends TranslationPair {
  file: string
}

/**
 * データ形式のヘッダー定義
 */
export interface ShWvDefine {
  name: 'SHWV_DATA'
  version: '1.3' | '1.2' | '1.1' | '1.0'
}

/**
 * 複数ファイル管理用のファイル範囲情報
 */
export interface ShWvFileInfo {
  name: string
  start: number
  end: number
}

/**
 * プロジェクトおよび言語のメタデータ
 */
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

/**
 * 翻訳データ本体
 */
export interface ShWvBody {
  units: ShWvUnit[]
  terms: { src: string; tgt: string }[]
}

/**
 * 1 セグメントごとの翻訳ユニット
 */
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

/**
 * 参照データ（TM・用語集・引用一致）
 */
export interface ShWvRef {
  tms: ShWvRefTm[]
  tb: ShWvRefTb[]
  quoted: [number, number][]
  quoted100: number[]
}

/**
 * 翻訳メモリ（TM）の一致結果
 */
export interface ShWvRefTm {
  idx: number
  src: string
  diff?: string
  tgt: string
  ratio: number
  freeze?: boolean
  file?: string
}

/**
 * 用語集（TB）の一致結果
 */
export interface ShWvRefTb {
  src: string
  tgts: string[]
  note?: string
  file?: string
}

/**
 * パイプライン処理における個別ファイルの状態
 */
export interface ProjectFileStatus {
  source: string
  xliff: string | null
  status: 'extracted' | 'translated' | 'merged' | 'error'
  errorMsg?: string
}

/**
 * プロジェクト内のファイルグループ
 */
export interface ProjectGroup {
  filter: string
  files: ProjectFileStatus[]
}

/**
 * プロジェクトの進捗統計
 */
export interface ProjectStats {
  segments: number
  untranslated: number
  qaWarnings: number
  termsMatched: number
}

/**
 * プロジェクト情報およびパイプラインのメタデータ
 */
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

/**
 * SheepComb / ShWv JSON データセットのルート構造
 */
export interface ShWvData {
  define: ShWvDefine
  meta: ShWvMeta
  body: ShWvBody
  projectInfo?: ProjectInfo
}

/**
 * エクスポート用のシンプルな対訳ペア
 */
export interface ExportPair {
  src: string
  tgt: string
}

/**
 * 編集履歴付きの JSONL エクスポート項目
 */
export interface ChunkedJsonlItem {
  index: number
  src: string
  tgt: string
  history: ExportPair[]
}

/**
 * サポートされているデータ管理・エクスポート形式
 */
export type ManagedDataType = 'UNITS' | 'TMS' | 'TBS' | 'JSONL' | 'JSONL_CHUNKED' | 'CSV' | 'SPLIT_BY_FILE' | 'SPLIT_BY_LENGTH'

/**
 * 翻訳対象外（DNT）フィルタの種別
 */
export type DntFilterType = 'digit' | 'eng' | 'digit eng' | null

/**
 * プロセッサーの処理設定オプション
 */
export interface ProcessorOptions {
  toFilterDuplicate?: boolean
  filterLevel?: "SRC" | "SRC_TGT" | "SRC_TGT_NOTE"
  toFilterDnt?: DntFilterType
  toFilterLock?: boolean
}

/**
 * チャンクエクスポートに含めるフィールドの選択オプション
 */
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
