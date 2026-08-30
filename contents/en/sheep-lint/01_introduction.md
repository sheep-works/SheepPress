---
title: "SheepLint Getting Started"
description: "Installation and Usage Guide for SheepLint"
date: 2024-01-01
updated: 2026-08-30
author: "Lambuage LLC & Sheep Translation Studio"
lang: "en"
category: "SheepLint"
tags:
  - "SheepLint"
  - "AI Proofreading"
  - "Text QA"
  - "Translation Quality"
  - "Geminiによる翻訳"
---

:::warning
This page is machine-translated by Gemini.
:::

# Getting Started

SheepLint is an AI-powered translation QA verification tool. By accepting bilingual file formats (XLIFF, XLSX, etc.) and automatically partitioning data into optimal chunk sizes that AI can process accurately, it achieves far superior precision compared to feeding raw entire documents.

In addition, it can inject Translation Memories (TM) and group similar segments together in batch requests, enabling thorough checks against past translations and stylistic patterns.

# Input / Output Workflow

SheepLint functions as an automated pipeline. It sequentially processes input files and outputs results in a clear list view as TXT, CSV, or XLSX.

## 1. Data Ingestion

The tool first converts input files into structured data consisting of Source text, Target text, and Context notes.
Supported formats include:
- XLIFF
- MXLIFF (Phrase)
- MQXLIFF (memoQ)
- Excel (Column A: Source, Column B: Target, Column C: Notes/Context)
- CSV (Same column layout as Excel)
- Word (Bilingual tables exported from Phrase / memoQ / Xbench)
- JSONL (Structured format)

Input files must be in one of these bilingual formats.
If translation is progressing in standard Office documents without alignment, an aligner tool must be used first to generate bilingual pairs.

However, given the context window of modern AI, you do not need strict sentence-by-sentence alignment like building a traditional TM. For coarse-grained alignment by paragraph or slide, we provide the companion tool [SheepGroom](/en/sheep-groom/).

## 2. Parsing & Transformation

Once extracted, text is split and structured for optimal AI comprehension.

Supported output formats include human-readable CSV (`ID, Source, Target, Context`) and AI-friendly JSONL format.
For simple proofreading, CSV is sufficient; however, for complex workflows involving TM lookups, rich context, or grouped similar segments, JSONL format is recommended.

## 3. Retrieving Results

After parsing, data is sent to the AI engine. SheepLint utilizes Google's enterprise cloud platform, **Vertex AI**.

By leveraging Vertex AI's enterprise-grade security and stability, you can execute AI-assisted quality verification securely and reliably.
