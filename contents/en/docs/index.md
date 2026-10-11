---
title: "Documentation & Tools"
description: "Overview and documentation of the Sheep Tool Family for Translators"
date: 2024-01-01
updated: 2026-10-11
author: "Lambuage LLC & Sheep Translation Studio"
lang: "en"
category: "Documentation"
tags:
  - "Product List"
  - "Documentation"
  - "SheepTools"
  - "CAT Tools"
  - "Geminiによる翻訳"
---

:::info About Advertising
Most Sheep tools are fully open source (MIT licensed) and free to use.

To support continued development, free distribution, and server maintenance costs, we plan to display unobtrusive advertisements on this documentation site and on our web app [SheepComb](https://lambuage.com/app/).

We appreciate your kind understanding and support.
:::

# Conceptual Architecture: Tool Connections

![Conceptual Overview](/abstract.png)

# Web Applications

## [SheepComb](/en/docs/sheep-comb/)

The web application edition of "SheepShuttle", designed for efficient handling of XLF, TMX, and TBX files.

Built around XLIFF files, it offers extraction of source and target segments, file format conversions (CSV/JSON), concordance search, QA checks, TM reference visualization, batch locking of duplicate/similar segments, and automatic termbase (TB) matching—packing in all the features daily CAT tool users wish they had.
It also serves as the Web UI for tools introduced below, such as **SheepGroom** and **SheepBell**.

## [SheepGroom](/en/docs/sheep-groom/)

Bilingual paired files are tremendously useful for leveraging translations as long-term assets and for collaborating with AI.

However, daily translation work often revolves around Office files without existing bilingual alignments. Creating strict aligned files after drafting can be quite time-consuming.

SheepGroom aligns Office files at a "coarse granularity"—by paragraph, worksheet, or slide. This substantially reduces alignment effort while allowing manual adjustments as needed, creating ideal bilingual data for AI inspection.

## [SheepBell](/en/docs/sheep-bell/)

A video clipping and defect extraction tool designed for Language Quality Assurance (LQA).

While recording test play or gameplay footage, simply speak your findings into a microphone. SheepBell automatically detects voice intervals and clips the corresponding video and screenshot moments. Combined with speech recognition, you can create detailed bug reports and action logs effortlessly without interrupting your testing workflow.

---

# Desktop Applications

## [SheepWeave](/en/docs/sheep-weave/)

A computer-assisted translation (CAT) tool implemented as a Visual Studio Code extension.

In the modern landscape, AI-driven development in software programming advances far faster than in translation, largely powered by advanced code editors and Integrated Development Environments (IDEs) like VS Code.
SheepWeave was created to bring the benefits of modern high-performance code editors to professional translators.
By transforming XLIFF files into program-friendly JSON structures, translators can enjoy full editor support, fast fuzzy search, and auto-completion while translating.

Along with standard CAT capabilities such as repetition checking, term suggestion, and QA, it enhances developer-oriented features like syntax highlighting for custom tags and seamless LLM integration.
Our goal is to build a new breed of "Integrated Translation Environment (ITE)".

### SheepWeaveMedia
Currently under development as a companion extension to SheepWeave.
By leveraging MVP architectures, it enables "translating while watching video" and "temporary live preview insertion" during subtitle translation (e.g. SRT).
It also supports comic and manga translation workflows by displaying panels and pages alongside segments.

The core framework is already built, and it will be released as soon as testing and validation are complete.

## [SheepBobbin](/en/docs/sheep-bobbin/)

A dedicated hub connecting SheepComb and SheepWeave to Large Language Models (LLMs).
Supports cloud AI providers including ChatGPT, Claude, Gemini, and DeepSeek, as well as local LLMs such as Ollama and AI Studio.

Ideal for self-checking, proofreading, or seeking a second opinion before delivery. While its main purpose is translation verification and QA, it can also draft or revise translated text.

*Note: Users provide their own API keys or local LLM runtimes.*

## [SheepLint](/en/docs/sheep-lint/)

An automated text proofreading and QA tool powered by AI.

Unlike SheepBobbin, SheepLint is written entirely in Python.
While it assumes a CLI environment via UV or PowerShell, it runs without browser memory constraints, making it ideal for large workloads.

Powered by Vertex AI as its foundational platform, it delivers enterprise-grade, secure, and fast automated review.
It reliably processes large-scale files that would be challenging to handle through browser-based SheepComb / SheepBobbin workflows alone.

---

# Core Engines & Libraries

## SheepShuttle

The core library handling format conversion and data processing for XLIFF files in SheepComb.
It also consolidates data schemas and TypeScript definitions used across various tools, serving as the architectural backbone of the Sheep ecosystem.

## SheepLoom

A documentation and presentation generation tool powered by Vivliostyle and Marp.
Rapidly converts Markdown documents into professional ePub, PDF documents, and slide decks, playing an important role in promoting Sheep tools.

## SheepStitch

An automation tool for semi-automated data entry across diverse platforms.

With the proliferation of proprietary translation portals lacking standard import/export capabilities, translators are often forced to manually copy and paste. SheepStitch automates repetitive pasting and navigation, saving translators countless hours of tedious manual work.
While direct GUI automation is often a last resort, having it makes an enormous difference in daily productivity!

# Downloads

<ClientOnly>
  <SoftwareDownloads />
</ClientOnly>

<style>
/* Adjust spacing between H1 and immediate H2 */
.vp-doc h1 + h2 {
  margin-top: 1.2rem;
  padding-top: 0;
  border-top: none;
}

/* Balance H1 margins */
.vp-doc h1 {
  margin-top: 2.5rem;
  margin-bottom: 0.8rem;
}

/* Margin after dividers */
.vp-doc hr + h1 {
  margin-top: 1.5rem;
}
</style>
