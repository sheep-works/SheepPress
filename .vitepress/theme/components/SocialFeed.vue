<script setup lang="ts">
import { ref } from 'vue'
import NoteFeed from './NoteFeed.vue'

const props = withDefaults(defineProps<{
  noteUser?: string
  xUser?: string
}>(), {
  noteUser: 'lambuage',
  xUser: 'transheep_biz'
})

const activeTab = ref<'note' | 'x'>('note')
</script>

<template>
  <div class="social-feed-wrapper">
    <div class="social-tab-header">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'note' }" 
        @click="activeTab = 'note'"
      >
        <svg class="tab-icon note-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 3h-15C3.1 3 2 4.1 2 5.5v13C2 19.9 3.1 21 4.5 21h15c1.4 0 2.5-1.1 2.5-2.5v-13C22 4.1 20.9 3 19.5 3zm-2.8 13.8h-2.4v-5.2c0-1.1-.4-1.7-1.4-1.7s-1.6.7-1.6 1.8v5.1H8.9V9.2h2.3v1c.5-.7 1.4-1.2 2.6-1.2 1.9 0 2.9 1.2 2.9 3.3v4.5z"/>
        </svg>
        note
      </button>

      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'x' }" 
        @click="activeTab = 'x'"
      >
        <svg class="tab-icon x-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X (旧Twitter)
      </button>
    </div>

    <!-- note タブ -->
    <div v-show="activeTab === 'note'">
      <NoteFeed :user="noteUser" :limit="5" />
    </div>

    <!-- X タブ -->
    <div v-show="activeTab === 'x'" class="x-tab-content">
      <div class="x-card-banner">
        <div class="x-profile-info">
          <svg class="x-big-logo" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <div>
            <h3 class="x-profile-name">ひつじの翻訳室 (@{{ xUser }})</h3>
            <p class="x-profile-desc">SheepWeave / 翻訳ツール開発や日常の進捗をポスト中！</p>
          </div>
        </div>

        <a :href="`https://x.com/${xUser}`" target="_blank" rel="noopener" class="x-follow-btn">
          X で最新の投稿を見る ↗
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.social-feed-wrapper {
  margin: 28px 0;
}

.social-tab-header {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 2px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px 6px 0 0;
}

.tab-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.tab-icon {
  width: 18px;
  height: 18px;
}
.note-icon { color: #2cb696; }
.x-icon { color: var(--vp-c-text-1); }

.x-tab-content {
  margin-top: 16px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.x-card-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.x-profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.x-big-logo {
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}

.x-profile-name {
  margin: 0 0 4px 0 !important;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.x-profile-desc {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.x-follow-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff !important;
  background: #000;
  border-radius: 20px;
  text-decoration: none !important;
  transition: opacity 0.2s, transform 0.2s;
  flex-shrink: 0;
}

.x-follow-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .x-card-banner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
