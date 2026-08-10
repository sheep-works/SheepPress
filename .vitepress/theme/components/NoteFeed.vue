<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  user?: string
  limit?: number
}>(), {
  user: 'lambuage',
  limit: 5
})

interface NoteItem {
  title: string
  link: string
  pubDate: string
  thumbnail?: string
  description?: string
}

const items = ref<NoteItem[]>([])
const loading = ref(true)
const error = ref(false)

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  } catch {
    return dateStr
  }
}

onMounted(async () => {
  try {
    const rssUrl = `https://note.com/${props.user}/rss`
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error('Failed to fetch')
    
    const data = await res.json()
    if (data.status === 'ok' && Array.isArray(data.items)) {
      items.value = data.items.slice(0, props.limit).map((item: any) => {
        // サムネイル画像の抽出
        let thumbnail = item.thumbnail || item.enclosure?.link
        if (!thumbnail && item.description) {
          const match = item.description.match(/<img[^>]+src=["']([^"']+)["']/)
          if (match) thumbnail = match[1]
        }
        
        // プレーンテキスト説明の抽出
        let description = item.description ? item.description.replace(/<[^>]+>/g, '').trim() : ''
        if (description.length > 90) {
          description = description.slice(0, 90) + '...'
        }

        return {
          title: item.title,
          link: item.link,
          pubDate: formatDate(item.pubDate),
          thumbnail,
          description
        }
      })
    } else {
      throw new Error('Invalid feed status')
    }
  } catch (err) {
    console.error('Failed to load note feed:', err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="note-feed-container">
    <div class="note-feed-header">
      <div class="note-brand">
        <svg class="note-logo" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 3h-15C3.1 3 2 4.1 2 5.5v13C2 19.9 3.1 21 4.5 21h15c1.4 0 2.5-1.1 2.5-2.5v-13C22 4.1 20.9 3 19.5 3zm-2.8 13.8h-2.4v-5.2c0-1.1-.4-1.7-1.4-1.7s-1.6.7-1.6 1.8v5.1H8.9V9.2h2.3v1c.5-.7 1.4-1.2 2.6-1.2 1.9 0 2.9 1.2 2.9 3.3v4.5z"/>
        </svg>
        <span class="note-title">note 開発日記・最新記事</span>
      </div>
      <a :href="`https://note.com/${user}`" target="_blank" rel="noopener" class="note-user-link">
        @{{ user }} の記事一覧 ↗
      </a>
    </div>

    <!-- ローディング中 -->
    <div v-if="loading" class="note-feed-loading">
      <div class="spinner"></div>
      <span>最新記事を読み込み中...</span>
    </div>

    <!-- エラー時 -->
    <div v-else-if="error" class="note-feed-error">
      <p>最新記事の取得に失敗しました。</p>
      <a :href="`https://note.com/${user}`" target="_blank" rel="noopener" class="fallback-btn">
        note.com で記事を読む ↗
      </a>
    </div>

    <!-- 記事カードリスト -->
    <div v-else class="note-feed-list">
      <a 
        v-for="(item, idx) in items" 
        :key="idx" 
        :href="item.link" 
        target="_blank" 
        rel="noopener" 
        class="note-card"
      >
        <div v-if="item.thumbnail" class="note-card-media">
          <img :src="item.thumbnail" :alt="item.title" loading="lazy" />
        </div>
        <div class="note-card-content">
          <div class="note-card-date">{{ item.pubDate }}</div>
          <h4 class="note-card-title">{{ item.title }}</h4>
          <p v-if="item.description" class="note-card-desc">{{ item.description }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.note-feed-container {
  margin: 24px 0;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.note-feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.note-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-logo {
  width: 22px;
  height: 22px;
  color: #2cb696;
}

.note-title {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.note-user-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: opacity 0.2s;
}
.note-user-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.note-feed-loading, .note-feed-error {
  padding: 32px 0;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.note-feed-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.note-card {
  display: flex;
  gap: 16px;
  padding: 14px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none !important;
  color: inherit !important;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.note-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.note-card-media {
  width: 110px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-c-bg-mute);
}

.note-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.note-card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.note-card-date {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  margin-bottom: 2px;
}

.note-card-title {
  margin: 0 0 4px 0 !important;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.note-card-desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .note-card {
    flex-direction: column;
    gap: 10px;
  }
  .note-card-media {
    width: 100%;
    height: 140px;
  }
  .note-card-title {
    white-space: normal;
  }
}
</style>
