<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NoteFeed from './NoteFeed.vue'
import changelogData from './changelog.json'

interface NiltoItem {
  _id: number
  _model: string
  _status: string
  _title: string
  _created_at: string
  _updated_at: string
  _published_at?: string
  title?: string
  type?: string
  summary?: string
  body?: string
  is_pinned?: boolean
  isLiveNew?: boolean // クライアントで新着取得されたフラグ
  [key: string]: any
}

interface NiltoDataPayload {
  buildTimestamp: string
  news: NiltoItem[]
  tools_blog: NiltoItem[]
}

const activeTab = ref<'news' | 'tools_blog' | 'note' | 'changelog'>('news')

const buildTimestamp = ref<string>('')
const newsItems = ref<NiltoItem[]>([])
const blogItems = ref<NiltoItem[]>([])
const expandedItems = ref<Record<number, boolean>>({})
const isLoadingLive = ref(false)

// 静的JSONの読み込み + クライアントサイドでのリアルタイム差分取得 (ハイブリッド)
onMounted(async () => {
  try {
    const res = await fetch('/nilto-data.json')
    if (res.ok) {
      const data: NiltoDataPayload = await res.json()
      buildTimestamp.value = data.buildTimestamp || ''
      newsItems.value = data.news || []
      blogItems.value = data.tools_blog || []
    }
  } catch (err) {
    console.warn('Failed to load static nilto-data.json:', err)
  }

  // クライアントサイドでビルド時間以降の差分コンテンツを取得
  await fetchLiveNewItems()
})

declare const __NILTO_API_KEY__: string | undefined

async function fetchLiveNewItems() {
  let apiKey = ''
  try {
    if (typeof __NILTO_API_KEY__ !== 'undefined' && __NILTO_API_KEY__) {
      apiKey = __NILTO_API_KEY__
    }
  } catch (e) {}
  if (!apiKey && (import.meta as any)?.env) {
    const env = (import.meta as any).env
    apiKey = (env.VITE_NILTO_API_KEY as string) || (env.NILTO_API_KEY as string) || ''
  }

  if (!apiKey) {
    console.warn('NILTO API Key is not present for client-side live fetch.')
    return
  }

  isLoadingLive.value = true
  try {
    // キャッシュ無効化パラメータを付加して全件または差分を取得
    const cacheBuster = `_t=${Date.now()}`
    let newsUrl = `https://cms-api.nilto.com/v1/contents?model=news&body[format]=markdown&${cacheBuster}`
    if (buildTimestamp.value) {
      newsUrl += `&_updated_at[gt]=${encodeURIComponent(buildTimestamp.value)}`
    }

    const newsRes = await fetch(newsUrl, {
      headers: { 'X-NILTO-API-KEY': apiKey },
      cache: 'no-store'
    })
    if (newsRes.ok) {
      const newsJson = await newsRes.json()
      const liveNews: NiltoItem[] = (newsJson.data || []).map((item: NiltoItem) => ({
        ...item,
        isLiveNew: true
      }))
      mergeItems(newsItems, liveNews)
    }

    let blogUrl = `https://cms-api.nilto.com/v1/contents?model=tools_blog&body[format]=markdown&${cacheBuster}`
    if (buildTimestamp.value) {
      blogUrl += `&_updated_at[gt]=${encodeURIComponent(buildTimestamp.value)}`
    }

    const blogRes = await fetch(blogUrl, {
      headers: { 'X-NILTO-API-KEY': apiKey },
      cache: 'no-store'
    })
    if (blogRes.ok) {
      const blogJson = await blogRes.json()
      const liveBlogs: NiltoItem[] = (blogJson.data || []).map((item: NiltoItem) => ({
        ...item,
        isLiveNew: true
      }))
      mergeItems(blogItems, liveBlogs)
    }
  } catch (err) {
    console.warn('Error fetching live new items from NILTO:', err)
  } finally {
    isLoadingLive.value = false
  }
}

function mergeItems(targetRef: { value: NiltoItem[] }, liveItems: NiltoItem[]) {
  if (!liveItems.length) return
  const itemMap = new Map<number, NiltoItem>()
  // 既存のアイテムをセット
  for (const item of targetRef.value) {
    itemMap.set(item._id, item)
  }
  // クライアントでフェッチした最新アイテムで上書き/新規追加
  for (const liveItem of liveItems) {
    itemMap.set(liveItem._id, liveItem)
  }
  
  // 日時（_published_at または _created_at）降順でソート
  const sorted = Array.from(itemMap.values()).sort((a, b) => {
    const timeA = new Date(a._published_at || a._created_at).getTime()
    const timeB = new Date(b._published_at || b._created_at).getTime()
    return timeB - timeA
  })
  
  targetRef.value = sorted
}

function toggleExpand(id: number) {
  expandedItems.value[id] = !expandedItems.value[id]
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

import { marked } from 'marked'

marked.setOptions({
  breaks: true,
  gfm: true
})

function transformMediaEmbeds(text: string) {
  if (!text) return '';
  text = text.replace(
    /\[(?:埋め込み動画:?|動画:?)?\s*([^\]]*)\]\((https?:\/\/[^\s\)]+\.(?:mp4|webm|mov|m4v|ogg)(?:\?[^\s\)]*)?)\)/gi,
    '<video controls style="max-width: 100%; width: 100%; border-radius: 8px; margin: 1.5rem 0;" preload="metadata"><source src="$2">お使いのブラウザは動画タグをサポートしていません。</video>'
  );
  text = text.replace(
    /\[(?:埋め込み動画:?|YouTube:?)?\s*[^\]]*\]\((https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)[^\s\)]*)\)/gi,
    '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 8px;"><iframe src="https://www.youtube-nocookie.com/embed/$2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );
  text = text.replace(
    /\[(?:埋め込み音声:?|音声:?)?\s*([^\]]*)\]\((https?:\/\/[^\s\)]+\.(?:mp3|wav|m4a|aac|ogg)(?:\?[^\s\)]*)?)\)/gi,
    '<audio controls style="width: 100%; margin: 1rem 0;"><source src="$2">お使いのブラウザは音声タグをサポートしていません。</audio>'
  );
  return text;
}

function renderMarkdown(mdStr?: string) {
  if (!mdStr) return ''
  try {
    const transformed = transformMediaEmbeds(mdStr)
    return marked.parse(transformed) as string
  } catch (e) {
    return mdStr
  }
}
</script>

<template>
  <div class="whats-new-tabs-wrapper">
    <!-- タブヘッダー -->
    <div class="tabs-header">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'news' }" 
        @click="activeTab = 'news'"
      >
        <span class="tab-badge-count" v-if="newsItems.length">{{ newsItems.length }}</span>
        お知らせ
      </button>

      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'tools_blog' }" 
        @click="activeTab = 'tools_blog'"
      >
        <span class="tab-badge-count" v-if="blogItems.length">{{ blogItems.length }}</span>
        雑記
      </button>

      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'note' }" 
        @click="activeTab = 'note'"
      >
        note
      </button>

      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'changelog' }" 
        @click="activeTab = 'changelog'"
      >
        更新履歴
      </button>
    </div>

    <!-- タブ1: お知らせ (news) -->
    <div v-show="activeTab === 'news'" class="tab-content">
      <div v-if="newsItems.length === 0" class="empty-state">
        現在、お知らせはありません。
      </div>

      <div class="article-list" v-else>
        <article 
          v-for="item in newsItems" 
          :key="item._id" 
          class="article-card"
          :class="{ expanded: expandedItems[item._id] }"
        >
          <div class="article-header" @click="toggleExpand(item._id)">
            <div class="article-meta">
              <span class="article-date">{{ formatDate(item._published_at || item._created_at) }}</span>
              <span v-if="item.isLiveNew" class="badge-new">NEW</span>
              <span v-if="item.is_pinned" class="badge-pinned">固定</span>
              <span class="badge-model">お知らせ</span>
            </div>

            <h3 class="article-title">
              {{ item.title || item._title }}
              <span class="expand-icon">{{ expandedItems[item._id] ? '▲' : '▼' }}</span>
            </h3>
          </div>

          <div v-show="expandedItems[item._id]" class="article-body">
            <div class="markdown-body" v-html="renderMarkdown(item.body)"></div>
          </div>
        </article>
      </div>
    </div>

    <!-- タブ2: 雑記 (tools_blog) -->
    <div v-show="activeTab === 'tools_blog'" class="tab-content">
      <div v-if="blogItems.length === 0" class="empty-state">
        現在、雑記記事はありません。
      </div>

      <div class="article-list" v-else>
        <article 
          v-for="item in blogItems" 
          :key="item._id" 
          class="article-card"
          :class="{ expanded: expandedItems[item._id] }"
        >
          <div class="article-header">
            <div class="article-meta">
              <span class="article-date">{{ formatDate(item._published_at || item._created_at) }}</span>
              <span v-if="item.isLiveNew" class="badge-new">NEW</span>
              <span v-if="item.target_tool" class="badge-tool">{{ item.target_tool }}</span>
              <span class="badge-model">雑記</span>
            </div>

            <h3 class="article-title" @click="toggleExpand(item._id)">
              <a :href="'/blog/' + (item.slug || item._id)" class="blog-title-link">
                {{ item.title || item._title }}
              </a>
              <span class="expand-icon">{{ expandedItems[item._id] ? '▲' : '▼' }}</span>
            </h3>

            <p v-if="item.summary && !expandedItems[item._id]" class="article-summary">
              {{ item.summary }}
            </p>

            <div class="article-actions">
              <a :href="'/blog/' + (item.slug || item._id)" class="read-more-link">
                個別ページで読む ↗
              </a>
              <button class="toggle-preview-btn" @click="toggleExpand(item._id)">
                {{ expandedItems[item._id] ? 'プレビューを閉じる' : 'ここでプレビュー' }}
              </button>
            </div>
          </div>

          <div v-show="expandedItems[item._id]" class="article-body">
            <div class="markdown-body" v-html="renderMarkdown(item.body)"></div>
          </div>
        </article>
      </div>
    </div>

    <!-- タブ3: note -->
    <div v-show="activeTab === 'note'" class="tab-content">
      <NoteFeed user="lambuage" :limit="5" />
    </div>

    <!-- タブ4: 更新履歴 (Changelog) -->
    <div v-show="activeTab === 'changelog'" class="tab-content">
      <div class="changelog-timeline">
        <div 
          v-for="(log, idx) in changelogData" 
          :key="idx" 
          class="changelog-item"
        >
          <div class="changelog-date">{{ log.date }}</div>
          <div class="changelog-body">
            <ul>
              <li v-for="(item, i) in log.items" :key="i" v-html="item"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whats-new-tabs-wrapper {
  margin: 24px 0;
}

.tabs-header {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 2px;
  overflow-x: auto;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px 8px 0 0;
  white-space: nowrap;
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

.tab-badge-count {
  display: inline-block;
  padding: 2px 7px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 10px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.tab-content {
  margin-top: 20px;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  border: 1px dashed var(--vp-c-divider);
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.article-card:hover {
  border-color: var(--vp-c-brand-1);
}

.article-header {
  padding: 18px 20px;
  cursor: pointer;
  user-select: none;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 0.85rem;
}

.article-date {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.badge-new {
  background: #ef4444;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.badge-pinned {
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.badge-model, .badge-tool {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
}

.article-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 !important;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border: none !important;
  padding: 0 !important;
}

.expand-icon {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  margin-left: 12px;
}

.article-summary {
  margin: 8px 0 0 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.article-body {
  padding: 20px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.markdown-body {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.blog-title-link {
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
}

.blog-title-link:hover {
  color: var(--vp-c-brand-1) !important;
}

.article-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff !important;
  background: var(--vp-c-brand-1);
  border-radius: 6px;
  text-decoration: none !important;
  transition: background 0.2s;
}

.read-more-link:hover {
  background: var(--vp-c-brand-2);
}

.toggle-preview-btn {
  background: none;
  border: 1px solid var(--vp-c-divider);
  padding: 4px 10px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-preview-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin-top: 1.2em;
  margin-bottom: 0.6em;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.markdown-body :deep(h4) { font-size: 1.1rem; }
.markdown-body :deep(h5) { font-size: 1.0rem; }

.markdown-body :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 0.8em 0;
}

.markdown-body :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin: 0.8em 0;
}

.markdown-body :deep(li) {
  margin-bottom: 0.3em;
  line-height: 1.6;
}

.markdown-body :deep(p) {
  margin: 0.8em 0;
  line-height: 1.7;
}

.markdown-body :deep(blockquote) {
  margin: 1em 0;
  padding: 0.5em 1em;
  color: var(--vp-c-text-2);
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

/* 更新履歴タイムライン */
.changelog-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 10px;
}

.changelog-item {
  position: relative;
  padding-left: 24px;
  border-left: 2px solid var(--vp-c-brand-1);
}

.changelog-item::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
}

.changelog-date {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--vp-c-brand-1);
  margin-bottom: 6px;
}

.changelog-body ul {
  margin: 0;
  padding-left: 20px;
  color: var(--vp-c-text-1);
}

.changelog-body li {
  margin-bottom: 4px;
}
</style>
