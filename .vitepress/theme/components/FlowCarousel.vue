<script setup lang="ts">
import { ref, onMounted, onUpdated, watch, computed } from 'vue'
import { useData } from 'vitepress'

interface Props {
  label?: string
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  defaultOpen: false,
})

const { lang } = useData()

const defaultLabel = computed(() => {
  if (props.label) return props.label
  const l = (lang.value || 'ja').toLowerCase()
  if (l.startsWith('en')) return 'Workflow'
  if (l.startsWith('zh')) return '处理流程图'
  return 'ワークフロー図'
})

const isOpen = ref(props.defaultOpen)
const currentIndex = ref(0)
const totalSlides = ref(0)
const viewportRef = ref<HTMLElement | null>(null)

const applyActiveSlide = () => {
  if (!viewportRef.value) return
  const children = Array.from(viewportRef.value.children) as HTMLElement[]
  totalSlides.value = children.length

  if (totalSlides.value === 0) return

  if (currentIndex.value >= totalSlides.value) {
    currentIndex.value = 0
  }

  children.forEach((child, idx) => {
    if (idx === currentIndex.value) {
      child.style.display = ''
      child.classList.add('carousel-active-slide')
    } else {
      child.style.display = 'none'
      child.classList.remove('carousel-active-slide')
    }
  })
}

const prev = () => {
  if (totalSlides.value <= 1) return
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
}

const next = () => {
  if (totalSlides.value <= 1) return
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value
}

const goTo = (index: number) => {
  currentIndex.value = index
}

watch(currentIndex, applyActiveSlide)
watch(isOpen, (open) => {
  if (open) {
    applyActiveSlide()
  }
})

onMounted(() => {
  applyActiveSlide()
})

onUpdated(() => {
  applyActiveSlide()
})
</script>

<template>
  <div class="flow-carousel-wrapper" :class="{ 'is-open': isOpen }">
    <!-- コントロールバー（開閉トグル ＆ 左右選択） -->
    <div class="carousel-control-bar">
      <!-- 開閉トグルボタン -->
      <button
        type="button"
        class="collapse-toggle-btn"
        @click="isOpen = !isOpen"
        :aria-expanded="isOpen"
      >
        <span class="flow-badge">FLOW</span>
        <span class="flow-label">{{ defaultLabel }}</span>
        <svg
          class="chevron-icon"
          :class="{ 'is-rotated': isOpen }"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <!-- 左右選択（展開中かつ2スライド以上で表示） -->
      <div v-if="isOpen && totalSlides > 1" class="carousel-nav-group">
        <button
          type="button"
          class="carousel-btn prev-btn"
          @click="prev"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="carousel-dots">
          <button
            v-for="i in totalSlides"
            :key="i"
            type="button"
            class="carousel-dot"
            :class="{ active: currentIndex === i - 1 }"
            @click="goTo(i - 1)"
            :aria-label="`Slide ${i}`"
          />
        </div>

        <button
          type="button"
          class="carousel-btn next-btn"
          @click="next"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <!-- スライド表示エリア（折りたたみ時は非表示、v-showでDOM維持） -->
    <div
      v-show="isOpen"
      ref="viewportRef"
      class="carousel-viewport"
    >
      <slot :active-index="currentIndex" :is-open="isOpen" />
    </div>
  </div>
</template>

<style scoped>
.flow-carousel-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0;
  transition: all 0.25s ease;
}

.flow-carousel-wrapper.is-open {
  margin: 2rem 0;
}

/* メインのピル型コントロールバー */
.carousel-control-bar {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 4px 8px 4px 6px;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-divider, #e2e2e3);
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.flow-carousel-wrapper.is-open .carousel-control-bar {
  border-color: var(--vp-c-brand-1, #10b981);
  margin-bottom: 1.25rem;
}

/* 開閉トグルボタン */
.collapse-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 10px 4px 4px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1, #111);
  cursor: pointer;
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.collapse-toggle-btn:hover {
  background: var(--vp-c-bg, #fff);
}

.flow-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 9999px;
  background: var(--vp-c-brand-1, #10b981);
  color: #fff;
  letter-spacing: 0.5px;
}

.flow-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #222);
}

.chevron-icon {
  color: var(--vp-c-text-2, #666);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.chevron-icon.is-rotated {
  transform: rotate(180deg);
  color: var(--vp-c-brand-1, #10b981);
}

/* 左右スライドナビゲーション */
.carousel-nav-group {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid var(--vp-c-divider, #e2e2e3);
  animation: fadeIn 0.2s ease;
}

.carousel-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2, #666);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.carousel-btn:hover {
  background: var(--vp-c-bg, #fff);
  border-color: var(--vp-c-divider, #e2e2e3);
  color: var(--vp-c-brand-1, #10b981);
  transform: scale(1.08);
}

.carousel-dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.carousel-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: none;
  background: var(--vp-c-divider, #d1d5db);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
}

.carousel-dot:hover {
  background: var(--vp-c-text-3, #9ca3af);
}

.carousel-dot.active {
  width: 18px;
  border-radius: 4px;
  background: var(--vp-c-brand-1, #10b981);
}

/* スライド表示エリア */
.carousel-viewport {
  width: 100%;
}

:deep(.carousel-active-slide) {
  animation: flowFadeIn 0.3s ease;
}

@keyframes flowFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
