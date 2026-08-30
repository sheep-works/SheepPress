---
title: "SheepWeave 实际文件翻译实操"
description: "在真实翻译项目中使用 SheepWeave 处理 Office 与 XLIFF 文件的全流程"
date: 2024-01-01
updated: 2026-08-30
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "SheepWeave"
tags:
  - "SheepWeave"
  - "CAT工具"
  - "VSCode"
  - "翻译支持"
  - "Geminiによる翻訳"
---

:::warning
本页面由 Gemini 机器翻译。
:::

# 实际文件翻译实操

SheepWeave 支持行业主流的 XLIFF 系列文件（XLIFF/SDLXLIFF/MXLIFF/MQXLIFF）、常见 Office 办公文件（Word/Excel/PPT）以及 HTML、TXT/MD 等格式。
若已有现成 XLIFF 文件，可直接跳至 **2. 翻译标准流程**。

若需直接翻译 Office 文档，需预先准备开源文件格式转换套件 **Okapi Framework** 与 **Java** 运行环境。

## 1. 必备组件准备

### 1.1 Java 运行环境
Okapi 基于 Java 开发。若电脑尚未安装，请访问 [Java 官方下载页面](https://www.java.com/download/) 安装。

### 1.2 Okapi Framework
访问 [Okapi 官网](https://okapiframework.org/) 下载适配您操作系统的稳定版压缩包并解压。

### 1.3 放置 Okapi 目录
在项目主目录下创建工作文件夹（如 `SheepWeave_Office`），并将解压出的 `okapi` 目录完整复制放入其中：
```text
SheepWeave_Office/
 └─ okapi/
```

## 2. 翻译标准流程

### 2.1 初始化：构建目录结构
在 SheepWeave 面板的 **工作流（Flow）** 选项卡中，选择 **初始化** 并点击执行，系统将自动创建 `Archive`、`Data`（内含 `Ref/TM`、`Ref/TB`）及 `Working` 文件夹。

| 文件夹名称 | 作用说明 |
| --- | --- |
| Archive | 归档保管已完成的历史项目。 |
| Data | 放置待翻译的原始文档。 |
| Data/Ref/TM | 放置翻译记忆库文件（`.tmx`、`.xlsx`、`.csv`、`.json`）。 |
| Data/Ref/TB | 放置术语表文件（`.tbx`、`.xlsx`、`.csv`、`.json`）。 |
| Working | 实际翻译过程中的自动工作区。 |

### 2.2 放置文件
将待翻译原稿放入 `Data/` 根目录，参考记忆库与术语库放入 `Data/Ref/` 对应子目录。

### 2.3 准备：文件复制与 XLIFF 转换
在工作流面板的 **准备** 分组中，输入项目名称与源/目标语言，点击 `复制到工作目录并转换为XLIFF`。

### 2.4 准备：生成项目文件与解析
点击 `生成项目文件并分析`，系统将生成 `project.json` 并于 `04_SHWV` 下生成 `Source.shwvs` 与 `Target.shwvt`。

### 2.5 翻译进行中
双击打开 `Target.shwvt` 逐行进行翻译，并按 `Ctrl + Enter` 实时确认。

### 2.6 完成翻译
全部翻译完成后，点击 **完成** 菜单下的 `完成翻译`，生成包含最新译文的 XLIFF 文件至 `05_COMPLETED`。

### 2.7 回填重组（组还原）
若原稿为 Office 文档，点击 `从翻译完成文件重组还原为原格式文件`，在 `06_PACKAGE` 目录下生成最终带排版的 Office 文件（`.docx` 等）。

### 2.8 项目归档
确认无误后点击 `归档化`，将本次工作区内容安全归档至 `Archive/YYYYMMDD/` 目录。
