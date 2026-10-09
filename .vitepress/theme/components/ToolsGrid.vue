<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ToolItem {
  title: string
  details: string
  link: string
  badge?: string
}

const tools: ToolItem[] = [
  {
    title: 'SheepLint',
    details: 'AI を活用したテキスト校正・品質チェックツール',
    link: '/sheep-lint'
  },
  {
    title: 'SheepWeave',
    details: '翻訳用の VS Code 拡張機能（軽量CATツール）',
    link: '/sheep-weave'
  },
  {
    title: 'SheepComb',
    details: 'XLF / TMX / TBX などの翻訳データを柔軟に操作・変換',
    link: '/sheep-comb'
  },
  {
    title: 'SheepBobbin',
    details: 'LLM を用いた翻訳処理・チェックデスクトップクライアント',
    link: '/sheep-bobbin'
  },
  {
    title: 'SheepGroom',
    details: 'Office ファイル（Word, Excel, PowerPoint）の対訳化',
    link: '/sheep-groom'
  },
  {
    title: 'SheepSpindle',
    details: 'WASM を使った高速 TM / TB 参照・処理エンジン',
    link: '/sheep-spindle'
  },
  {
    title: 'SheepShuttle',
    details: 'SheepWeave 用の JSON ファイル管理ツール',
    link: '/sheep-shuttle'
  },
  {
    title: 'SheepLoom',
    details: 'Vivliostyle と Marp を使ったスマートな資料作成ツール',
    link: '/sheep-loom'
  },
  {
    title: 'SheepStitch',
    details: '各種プラットフォームでの入力自動化・半自動インポーター',
    link: '/sheep-stitch'
  },
  {
    title: 'SheepHub',
    details: 'FastAPI を使った Sheep Tools の簡易 API サーバー',
    link: '/sheep-hub'
  }
]

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
      <h2 class="tools-main-title">🐑 Sheep Family ツール群</h2>
      <p class="tools-subtitle">翻訳業務をよりスムーズに、より正確に。実務者の声から生まれた翻訳支援ツールです。</p>
    </div>

    <!-- ツールグリッド -->
    <div class="tools-grid">
      <a 
        v-for="(tool, index) in tools" 
        :key="tool.title" 
        :href="tool.link" 
        class="tool-card"
        :style="{ '--card-index': index }"
      >
        <div class="tool-card-header">
          <span class="tool-icon">🐑</span>
          <h3 class="tool-title">{{ tool.title }}</h3>
        </div>
        <p class="tool-details">{{ tool.details }}</p>
        <span class="tool-arrow">詳細を見る →</span>
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
</style>
