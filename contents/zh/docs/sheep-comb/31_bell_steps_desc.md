---
title: "SheepBell 各步骤详细操作指南"
description: "详解使用 SheepBell 处理游戏 LQA 语音与视频记录、生成报告的操作流程"
date: 2026-10-10
updated: 2026-10-10
author: "合同会社ランベージ & 绵羊翻译工作室"
lang: "zh"
category: "SheepBell"
tags:
  - "SheepBell"
  - "SheepComb"
  - "LQA"
  - "OBS"
  - "FFmpeg"
  - "Google Colab"
  - "Faster-Whisper"
---

# 使用 SheepBell 自动化处理 LQA 记录

![SheepBell Top](./pict/sheepbell_top.png)

**SheepBell** 能够自动从游戏 LQA（本地化质量保证）与测试录像中**精准检测测试员的语音发话区间（口述 Bug 记录）**，并批量生成包含前后完整上下文的视频片段、关键帧截图、AI 语音转文字以及结构化报告数据（CSV / JSON / Google 表格）。

生成的成果可直接在基于 Web 的 [SheepBell 审查器](https://lambuage.com/app/bell) 中打开，完成多媒体预览、文字校对、审校批注填写与报告导出的一站式工作。

## 整体工作流程

| 步骤 | 工作内容 | 主要工具 |
|:---:|:---|:---|
| **1. 录制准备** | 将游戏背景音与测试员麦克风声音分轨录制。 | OBS Studio 等 |
| **2. 运行处理** | 自动检测语音区间，执行视频切片、抓图与语音识别。 | Google Colab / 本地 UI |
| **3. Web 审校与微调** | 在 Web 查看器中边看视频图像边校对文本与填写批注。 | SheepComb Web (/app) |
| **4. 报告导出** | 导出规范的 CSV、JSON 或 Google 在线表格交付研发团队。 | SheepComb / Google Drive |

## 1. 录制环境准备（OBS 多音轨分轨设置）

SheepBell 建议将**测试员麦克风声音**与**游戏/系统声音**分别录制在不同的音频轨道中。

分轨录制能够有效避免游戏音效掩盖口述语音、防止游戏内 NPC 角色语音引起误检，并在剪辑输出时保留完整的多音轨信息。

### OBS Studio 设置步骤

1. 在 **[音频混音器]** 面板点击齿轮图标，打开 **[高级音频属性]**。

![OBS Audio pane](./pict/audio_pane.png)

2. 将**麦克风音频分配至轨道 2**，**游戏音频分配至轨道 1**，取消勾选未使用的轨道。

![OBS Audio tracks](./pict/audio_tracks.png)

3. 打开 **[控件]** 面板中的 **[设置]**。

![OBS Control pane](./pict/control_pane.png)

4. 进入 **[输出]** 选项卡的 **[录像]** 栏，确保勾选了需要输出的所有音轨（如轨道 1 和 2）。

![OBS Recording settings](./pict/recording_settings.png)

::: tip 录制技巧
测试开始前对着麦克风简短口述（如“10月10日，第3关 LQA 开始”），既方便识别音轨，又能作为测试视频的索引。
:::

## 2. 程序运行

SheepBell 支持在 **Google Colab（推荐）** 或 **本地 PC** 环境中运行。

### ☁️ 在 Google Colab 中运行（推荐・免费 GPU 支持）

1. 在 Google Colab 中打开提供的 `colab_sheepbell_zh.ipynb` 笔记本（运行环境选择 **T4 GPU**）。
2. 执行 **挂载 Google Drive**（方便读取视频与保存交付成果）。
3. 运行安装与启动代码单元格，启动 `app.py --share`。
4. 打开生成的 `https://xxxx.gradio.live` 链接访问操作界面。
5. 任务完成后，运行后续单元格将视频、图片以及自动生成的 Google 电子表格一键归档至 Drive。

### 💻 在本地环境中运行 (Windows / Mac / Linux)

```bash
uv sync
uv run python app.py
```

在浏览器中打开 `http://127.0.0.1:7860` 即可访问。

## 3. 操作界面与参数详解

![SheepBell UI overview](./pict/ui_overview.png)

### 核心参数设置

| 参数项 | 说明 | 推荐/默认值 |
|:---|:---|:---:|
| **视频文件路径** | 待处理视频路径（Colab 运行时使用 Drive 挂载路径）。 | `sample/...` |
| **麦克风音轨编号** | 测试员语音所在轨道（从 0 开始计数，轨道 2 填 `1`）。 | `1` |
| **游戏音轨编号** | 游戏背景音所在轨道（轨道 1 填 `0`）。 | `0` |
| **VAD 静音检测阈值** | 语音活动检测灵敏度（Silero VAD）。数值越高越不易误检。 | `0.5` |
| **静音合并容忍时间** | 两次发话间隔在此秒数内将合并为一个 Issue 片段。 | `2.0` 秒 |
| **前后缓冲时长** | 发话前后保留的视频缓冲秒数，用于记录上下文。 | 前后 `2.0` 秒 |
| **Whisper 识别语言** | Faster-Whisper 识别语言（`ja`、`zh`、`en`、`auto`）。 | `zh` / `ja` |
| **截图偏移秒数** | 语音开始后抓取关键帧截图的时间偏移。 | `0.1` 秒 |

## 4. 输出成果文件

```text
issues/
├── lqa_issues.json         # 结构化 Issue 汇总数据
├── lqa_issues.csv          # Excel / 电子表格兼容 CSV (UTF-8 BOM)
├── issue_001.mp4           # 保留多音轨的视频切片
├── issue_001.png           # 关键帧截图
├── issue_002.mp4
├── issue_002.png
└── ...
```

## 5. Web 查看器中的审校与报告编辑

使用 [SheepBell 审查器](https://lambuage.com/app/bell) 打开成果：

![SheepBell Open Folder](./pict/sheepbell_open_folder.png)

1. 点击 **选择文件夹** 并指定输出的 `issues/` 目录。
2. 同步预览发话前后的视频片段、截图与文字记录。
3. 校对 AI 识别的口述文字，补充问题分类、严重级别及评审批注。
4. 导出更新后的 CSV / JSON 报告，直接录入 Jira、Redmine 等缺陷跟踪系统。

*(系统会自动将编辑进度保存至 `lqa_issues_review.json`，亦可随时按 `Ctrl + S` 手动保存。)*
