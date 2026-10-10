<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

interface ToolItem {
  title: string
  details: string
  link: string
  badge?: string
}

const currentLang = computed(() => {
  const l = (lang.value || 'ja').toLowerCase()
  if (l.startsWith('en')) return 'en'
  if (l.startsWith('zh')) return 'zh'
  return 'ja'
})

const toolsData = computed(() => {
  if (currentLang.value === 'en') {
    return {
      title: '🐑 Sheep Family Tools',
      subtitle: 'Making translation workflows smoother, faster, and more accurate. Translation tools built from real-world practitioner experience.',
      webCategory: 'Web Applications',
      desktopCategory: 'Desktop Applications',
      baseCategory: 'Core Engines & Utilities',
      webTools: [
        {
          title: 'SheepComb',
          details: 'Web app for converting, visualizing, and structuring translation data. Integrates other tools.',
          link: '/en/docs/sheep-comb'
        },
        {
          title: 'SheepGroom',
          details: 'Bilingual alignment assistance for Office files (Word / Excel / PowerPoint)',
          link: '/en/docs/sheep-groom'
        },
        {
          title: 'SheepBell',
          details: 'Video clipping and issue extraction tool for LQA testing',
          link: '/en/docs/sheep-bell'
        },
      ] as ToolItem[],
      desktopTools: [
        {
          title: 'SheepWeave',
          details: 'Integrated translation environment extension for VS Code (Lightweight CAT Tool)',
          link: '/en/docs/sheep-weave'
        },
        {
          title: 'SheepBobbin',
          details: 'Desktop client for LLM-powered translation processing and QA checking',
          link: '/en/docs/sheep-bobbin'
        },
        {
          title: 'SheepLint',
          details: 'Large-scale LLM proofreading and QA tool powered by Vertex AI',
          link: '/en/docs/sheep-lint'
        }
      ] as ToolItem[],
      baseTools: [
        {
          title: 'SheepShuttle',
          details: 'Core conversion CLI module powering SheepWeave and SheepComb',
          link: '/en/docs/sheep-shuttle'
        },
        {
          title: 'SheepSpindle',
          details: 'Blazing-fast TM / TB lookup & processing engine powered by WASM',
          link: '/en/docs/sheep-spindle'
        },
        {
          title: 'SheepLoom',
          details: 'Smart document and slide generation tool using Vivliostyle and Marp',
          link: '/en/docs/sheep-loom'
        },
        {
          title: 'SheepStitch',
          details: 'Input automation and semi-automated importer for diverse translation platforms',
          link: '/en/docs/sheep-stitch'
        },
      ] as ToolItem[]
    }
  }

  if (currentLang.value === 'zh') {
    return {
      title: '🐑 Sheep Family 实用工具集',
      subtitle: '让翻译工作更顺畅、更高效、更精准。源自一线实战经验的专业翻译辅助工具。',
      webCategory: 'Web 网页应用',
      desktopCategory: '桌面客户端应用',
      baseCategory: '底层基础程序',
      webTools: [
        {
          title: 'SheepComb',
          details: '支持翻译数据转换、可视化与结构化的 Web 应用，并内嵌多种实用工具',
          link: '/zh/docs/sheep-comb'
        },
        {
          title: 'SheepGroom',
          details: '支持 Office 文件（Word / Excel / PowerPoint）的双语对齐工具',
          link: '/zh/docs/sheep-groom'
        },
        {
          title: 'SheepBell',
          details: '专为 LQA 本地化测试打造的视频剪辑与缺陷提取辅助工具',
          link: '/zh/docs/sheep-bell'
        },
      ] as ToolItem[],
      desktopTools: [
        {
          title: 'SheepWeave',
          details: '基于 VS Code 的集成翻译环境扩展（轻量级 CAT 辅助翻译工具）',
          link: '/zh/docs/sheep-weave'
        },
        {
          title: 'SheepBobbin',
          details: '基于 LLM 大模型的翻译处理与质量审查桌面客户端',
          link: '/zh/docs/sheep-bobbin'
        },
        {
          title: 'SheepLint',
          details: '基于 Vertex AI 的大规模 LLM 智能审校与质检工具',
          link: '/zh/docs/sheep-lint'
        }
      ] as ToolItem[],
      baseTools: [
        {
          title: 'SheepShuttle',
          details: 'SheepWeave 与 SheepComb 底层核心数据转换模块（CLI）',
          link: '/zh/docs/sheep-shuttle'
        },
        {
          title: 'SheepSpindle',
          details: '基于 WASM 的毫秒级高速 TM / TB 检索与处理引擎',
          link: '/zh/docs/sheep-spindle'
        },
        {
          title: 'SheepLoom',
          details: '基于 Vivliostyle 与 Marp 的专业文档与幻灯片生成工具',
          link: '/zh/docs/sheep-loom'
        },
        {
          title: 'SheepStitch',
          details: '适用于各类平台的半自动化批量录入与搬运辅助工具',
          link: '/zh/docs/sheep-stitch'
        },
      ] as ToolItem[]
    }
  }

  return {
    title: '🐑 Sheep Family ツール群',
    subtitle: '翻訳業務をよりスムーズに、より正確に。実務者の声から生まれた翻訳支援ツールです。',
    webCategory: 'Web アプリケーション',
    desktopCategory: 'デスクトップアプリ',
    baseCategory: '基盤プログラム',
    webTools: [
      {
        title: 'SheepComb',
        details: '翻訳データの変換・可視化・構造化が可能な Web アプリ。他のツールも内包',
        link: '/docs/sheep-comb'
      },
      {
        title: 'SheepGroom',
        details: 'Office ファイル（Word / Excel / PowerPoint）の対訳化支援',
        link: '/docs/sheep-groom'
      },
      {
        title: 'SheepBell',
        details: 'LQA 支援のための動画クリップ・エラー抽出ツール',
        link: '/docs/sheep-bell'
      },
    ] as ToolItem[],
    desktopTools: [
      {
        title: 'SheepWeave',
        details: 'VS Code を利用した統合翻訳環境（軽量CATツール）',
        link: '/docs/sheep-weave'
      },
      {
        title: 'SheepBobbin',
        details: 'LLM を用いた翻訳処理・チェックデスクトップクライアント',
        link: '/docs/sheep-bobbin'
      },
      {
        title: 'SheepLint',
        details: 'Vertex AI を活用した大規模 LLM 処理ツール',
        link: '/docs/sheep-lint'
      }
    ] as ToolItem[],
    baseTools: [
      {
        title: 'SheepShuttle',
        details: 'SheepWeave / SheepComb の基盤となる変換モジュール（CLI）',
        link: '/docs/sheep-shuttle'
      },
      {
        title: 'SheepSpindle',
        details: 'WASM を使った高速 TM / TB 参照・処理エンジン',
        link: '/docs/sheep-spindle'
      },
      {
        title: 'SheepLoom',
        details: 'Vivliostyle と Marp を使ったスマートな資料作成ツール',
        link: '/docs/sheep-loom'
      },
      {
        title: 'SheepStitch',
        details: '各種プラットフォームでの入力自動化・半自動インポーター',
        link: '/docs/sheep-stitch'
      },
    ] as ToolItem[]
  }
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (typeof IntersectionObserver !== 'undefined' && sectionRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(sectionRef.value)
  } else {
    isVisible.value = true
  }
})
</script>

<template>
  <section 
    ref="sectionRef" 
    class="tools-section-container" 
    :class="{ 'is-visible': isVisible }"
  >
    <!-- ツール一覧ヘッダー -->
    <div class="tools-header">
      <h2 class="tools-main-title">{{ toolsData.title }}</h2>
      <p class="tools-subtitle">{{ toolsData.subtitle }}</p>
    </div>

    <!-- ツールグリッド -->
    <h3 class="tools-section-title">{{ toolsData.webCategory }}</h3>
    <div class="tools-grid">
      <a 
        v-for="(tool, index) in toolsData.webTools" 
        :key="tool.title" 
        :href="tool.link" 
        class="tool-card"
        :style="{ '--card-index': index }"
      >
        <div class="tool-card-header">
          <h4 class="tool-title">{{ tool.title }}</h4>
        </div>
        <p class="tool-details">{{ tool.details }}</p>
      </a>
    </div>

    <h3 class="tools-section-title">{{ toolsData.desktopCategory }}</h3>
    <div class="tools-grid">
      <a 
        v-for="(tool, index) in toolsData.desktopTools" 
        :key="tool.title" 
        :href="tool.link" 
        class="tool-card"
        :style="{ '--card-index': index }"
      >
        <div class="tool-card-header">
          <h4 class="tool-title">{{ tool.title }}</h4>
        </div>
        <p class="tool-details">{{ tool.details }}</p>
      </a>
    </div>

    <h3 class="tools-section-title">{{ toolsData.baseCategory }}</h3>
    <div class="tools-grid">  
      <a 
        v-for="(tool, index) in toolsData.baseTools" 
        :key="tool.title" 
        :href="tool.link" 
        class="tool-card"
        :style="{ '--card-index': index }"
      >
        <div class="tool-card-header">
          <h4 class="tool-title">{{ tool.title }}</h4>
        </div>
        <p class="tool-details">{{ tool.details }}</p>
      </a>
    </div>
  </section>
</template>

<style scoped>
.tools-section-container {
  max-width: 1152px;
  margin: 5rem auto 4rem;
  border: none !important;
}

/* ツールヘッダー（ボーダー一切なし・完全中央揃え） */
.tools-header {
  text-align: center;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.tools-section-container.is-visible .tools-header {
  opacity: 1;
  transform: translateY(0);
}

.tools-main-title {
  font-size: 1.6rem !important;
  font-weight: 700 !important;
  border: none !important;
  border-top: none !important;
  padding: 0 !important;
  margin: 0 0 0.6rem 0 !important;
  text-align: center !important;
  color: var(--vp-c-text-1);
}

.tools-subtitle {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 0 auto !important;
  line-height: 1.6;
  text-align: center !important;
  max-width: 680px;
}

/* ツールグリッド */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.tool-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  position: relative;
  
  /* Scroll reveal animation with stagger */
  opacity: 0;
  transform: translateY(24px);
  transition: 
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  transition-delay: calc(var(--card-index, 0) * 50ms + 100ms);
}

.tools-section-container.is-visible .tool-card {
  opacity: 1;
  transform: translateY(0);
}

.tool-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-elv);
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.tool-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.tool-icon {
  font-size: 1.3rem;
  line-height: 1;
}

.tool-title {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border: none !important;
}

.tool-details {
  margin: 0 !important;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  flex-grow: 1;
}

.tool-arrow {
  margin-top: 14px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.tool-card:hover .tool-arrow {
  transform: translateX(4px);
}

.tools-section-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>
