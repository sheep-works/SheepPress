---
title: "SheepWeave Shortcuts & Useful Features"
description: "Comprehensive list of keyboard shortcuts and productivity features"
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

# Shortcuts & Useful Features

## Essential VS Code Shortcuts

| Shortcut | Action | Description |
| --- | --- | --- |
| **`Ctrl + B`** | Toggle Primary Side Bar | Collapse/expand the folder tree to maximize editor width. |
| **`Ctrl + G`** | Go to Line | Jump directly to a specific segment line number. |
| **`Ctrl + Shift + P`** | Command Palette | Access all VS Code and SheepWeave commands. |
| **`Ctrl + ,`** | Open Settings | Customize editor preferences. |
| **`Ctrl + H`** | Global Replace | Powerful regex search and replace across the file. |
| **`Ctrl + Space`** | IntelliSense Auto-Complete | Trigger termbase and phrase completions. |

### Recommended Editor Settings
- **Font Size**: `18` (larger text reduces eye strain)
- **Line Height**: `2` (generous spacing makes confirmation colors clearer)
- **Word Wrap**: `on` (`Alt + Z`) (prevents horizontal scrolling)
- **Minimap**: Disable (reclaims editor horizontal width)

---

## SheepWeave Dedicated Shortcuts

### Translation & Segment Editing
| Shortcut | Action | Description |
| --- | --- | --- |
| **`Ctrl + Enter`** | Confirm Segment | Marks current line as green and moves to the next segment. |
| **`Alt + Down`** | Next Unconfirmed Line | Jumps to the next unconfirmed (white) segment. |
| **`Ctrl + Shift + 1..5`** | Apply TM Match 1..5 | Inserts the chosen TM match suggestion directly. |
| **`F2`** | Simple Replace / Term Rename | Global replace with automatic logging to asset history. |
| **`Ctrl + Shift + C`** | Copy Source to Target | Copies the current segment's source text into target. |

### Navigation & AI Integration
| Shortcut | Action | Description |
| --- | --- | --- |
| **`Alt + 1..7`** | Switch Panel Tabs | Instantly jump between Flow, Translate, Search, Tools, LLM, Info, Settings. |
| **`Ctrl + K`** | Concordance (Source) | Search selected word in source corpus. |
| **`Ctrl + Shift + K`** | Concordance (Target) | Search selected word in target corpus. |
| **`Ctrl + L`** | Send to AI Chat | Send selected text to the standard AI chat pane. |
| **`Ctrl + Q`** | Load into LLM Tab | Send selection to SheepWeave's dedicated LLM tab. |

### Terminology (TB) Management
| Shortcut | Action | Description |
| --- | --- | --- |
| **`Ctrl + Shift + Z`** | Apply Term | Replace selected text with matching termbase target. |
| **`Ctrl + Shift + Alt + Z`** | Apply Term Globally | Batch-replace term across the entire file. |
| **`Ctrl + T`** | Add Term Entry | Register a new term pair into the project glossary. |
