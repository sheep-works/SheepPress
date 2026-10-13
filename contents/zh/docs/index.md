---
title: "Sheep Tools 产品列表与文档"
description: "为翻译从业者打造的 Sheep Tools 实用工具列表与文档"
date: 2024-01-01
updated: 2026-10-11
author: "合同会社ランベージ & 绵羊翻译室"
lang: "zh"
category: "文档"
tags:
  - "产品列表"
  - "文档"
  - "SheepTools"
  - "Sheep Tools"
  - "CAT工具"
  - "Geminiによる翻訳"
---

:::info 关于广告投放
绝大多数 Sheep Tools 工具均作为开源项目（MIT 许可协议）完全免费公开。

为支持工具的持续研发、免费分发以及服务器运维成本，我们计划在此文档页面以及 Web 应用 [SheepComb](https://lambuage.com/app/) 中展示克制且适度的广告内容。

衷心感谢您的理解与支持！
:::

# 整体架构概念图 ～产品协同生态～

![整体架构概念图](/abstract.png)

# Web 应用程序

## [SheepComb](/zh/docs/sheep-comb/)

致力于便捷操作 XLF / TMX / TBX 双语资产的“SheepShuttle” Web 应用程序版。

以 XLIFF 文件为核心，支持原文与译文抽取、文件格式转换（CSV/JSON）、双语语料检索、QA 质检校验、TM 引用可视化、重复及相似句段一键批量锁定、术语库（TB）自动匹配等，汇集了 CAT 工具日常重度用户梦寐以求的各项实用功能。
同时，它也承担着后文介绍的 **SheepGroom** 和 **SheepBell** 等工具的 Web UI 前端交互职责。

## [SheepGroom](/zh/docs/sheep-groom/)

双语对齐文件无论是作为长期语料资产沉淀，还是与 AI 深度协同，都具有无可替代的巨大价值。

然而，日常实际工作中往往直接使用普通的 Office 文件，缺少现成的双语对齐语料，而在翻译交付后手动制作对齐往往耗时极长。

SheepGroom 是一款以“粗粒度”（按段落、按工作表、按幻灯片页）快速对齐 Office 文件的工具。在大幅降低对齐操作成本的同时，支持根据需要手动灵活调整，为 AI 审校快速构建理想的双语数据。

## [SheepBell](/zh/docs/sheep-bell/)

专为本地化测试（LQA）打造的视频剪辑与缺陷提取辅助工具。

在录制游戏或应用测试视频时，只需对着麦克风口头记录发现的问题，SheepBell 即可自动检测语音区间并提取关键画面与视频片段。结合语音识别，让测试人员无需中断操作即可高效生成 Bug 报告与测试日志。

---

# 桌面端应用程序

## [SheepWeave](/zh/docs/sheep-weave/)

将翻译辅助工具（CAT 工具）以 Visual Studio Code 扩展插件形态实现的全新工具。

当今时代，代码编程领域的 AI 辅助与现代化开发环境生态远领先于传统翻译行业，而这离不开以 VS Code 为代表的高性能集成开发环境（IDE）。
SheepWeave 正是本着“让译员也能享受到顶级代码编辑器红利”理念而诞生的插件。
通过将 XLIFF 文件转换为对程序极度友好的 JSON 数据流，让译员在编辑器的强大辅助、毫秒级模糊替换与 AI 补全下进行高效翻译。

除 CAT 工具标配的重复句段核对、术语提示、QA 质检之外，还强化了特定开发术语的高亮显示以及与 LLM 的深度集成。
我们致力于打造一种名为“集成翻译环境（ITE）”的全新形态 CAT 工具。

### SheepWeaveMedia
作为 SheepWeave 的子扩展插件正在紧锣密鼓开发中。
通过利用 MVP 架构，在进行 SRT 等字幕翻译时，实现“边看视频边翻译”以及“译文实时预览插入”。
此外，在漫画本地化翻译中，亦支持直接对照画面分格与页面进行翻译。

整体架构已开发完毕，待测试与验证充分后将正式公开发布。

## [SheepBobbin](/zh/docs/sheep-bobbin/)

连接 SheepComb / SheepWeave 与 AI（LLM）大模型的桌面枢纽工具。
支持 ChatGPT、Claude、Gemini、DeepSeek 等各类云端 AI，同时兼容 Ollama、AI Studio 等本地离线大模型。

可作为日常翻译自我复查的得力助手，亦可作为终审交付前的可靠第二意见。除翻译核对质检外，亦可直接生成译文初稿或润色修改。

*※ API Key 及本地大模型运行环境需由用户自行配置准备。*

## [SheepLint](/zh/docs/sheep-lint/)

基于 AI 的全自动双语文本校对与质检工具。

与 SheepBobbin 的不同之处在于，SheepLint 全量采用 Python 开发。
虽然需要通过 UV 配置运行环境或从 PowerShell 等终端调用，但也因此彻底摆脱了浏览器内存容量的限制。

底层采用 Vertex AI 企业级平台，实现安全、高速且严谨的 AI 自动审校。
即便是 SheepComb / SheepWeave 与 SheepBobbin 联动时难以承受的超大规模文件，也能稳定完成批处理。

---

# 底层核心程序与库

## SheepShuttle

在 SheepComb 中统筹负责 XLIFF 族文件格式转换与核心数据处理的底层核心库。
同时统一管理各类工具所使用的 TypeScript 类型定义，堪称整个 Sheep Tools 的基石支柱。

## SheepLoom

让 SVG 动画制作更加轻量便捷的开发环境。
只需按照特定规则编写 SVG 与 Markdown，即可自动生成交互式沙盒预览。
最终可将其导出为独立的 Vue 组件，方便在各种场景中复用。

## SheepStitch

实现跨各类封闭平台自动化输入的辅助工具。

面对不支持标准导入导出的各类私有翻译平台，译员往往被迫反复手动复制粘贴。SheepStitch 正是为此打造的半自动批量录入工具。
直接操作 GUI 虽是最后的手段，但有了它，工作效率将产生质的飞跃！

# 下载

<ClientOnly>
  <SoftwareDownloads />
</ClientOnly>

<style>
/* 调整 H1 紧跟 H2 时的上边框与间距 */
.vp-doc h1 + h2 {
  margin-top: 1.2rem;
  padding-top: 0;
  border-top: none;
}

/* 调整 H1 上下间距 */
.vp-doc h1 {
  margin-top: 2.5rem;
  margin-bottom: 0.8rem;
}

/* 分隔线（---）紧跟 H1 时的上间距 */
.vp-doc hr + h1 {
  margin-top: 1.5rem;
}
</style>
