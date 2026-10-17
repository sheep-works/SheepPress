<script setup lang="ts">
interface TocItem {
  title: string
  link: string
  desc?: string
  badge?: string
}

defineProps<{
  items: TocItem[]
}>()

function formatIndex(idx: number): string {
  return String(idx + 1).padStart(2, '0')
}
</script>

<template>
  <div class="toc-container">
    <div class="toc-grid">
      <a
        v-for="(item, idx) in items"
        :key="item.link"
        :href="item.link"
        class="toc-card"
      >
        <div class="toc-card-header">
          <span class="toc-index">{{ formatIndex(idx) }}</span>
          <span v-if="item.badge" class="toc-badge">{{ item.badge }}</span>
          <span class="toc-arrow">→</span>
        </div>
        <div class="toc-card-body">
          <h4 class="toc-title">{{ item.title }}</h4>
          <p v-if="item.desc" class="toc-desc">{{ item.desc }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.toc-container {
  margin: 24px 0 32px;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.toc-card {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.toc-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.toc-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.toc-index {
  font-size: 0.85rem;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
  padding: 2px 8px;
  border-radius: 6px;
}

.toc-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-dark);
  background-color: var(--vp-c-brand-soft);
  padding: 2px 6px;
  border-radius: 4px;
}

.toc-arrow {
  margin-left: auto;
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  transition: transform 0.2s ease, color 0.2s ease;
}

.toc-card:hover .toc-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

.toc-card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.toc-title {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  font-size: 1.05rem !important;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  transition: color 0.2s ease;
}

.toc-card:hover .toc-title {
  color: var(--vp-c-brand-1);
}

.toc-desc {
  margin: 6px 0 0 !important;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

@media (max-width: 640px) {
  .toc-grid {
    grid-template-columns: 1fr;
  }
}
</style>
