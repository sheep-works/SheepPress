<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface VersionItem {
  name: string
  hash?: string
  lastModified: string
  size: number
  url: string
  desc?: string
}

interface VersionsData {
  baseUrl: string
  updatedAt?: string
  weaves?: Record<string, VersionItem>
  bobbins?: Record<string, VersionItem>
  samples?: Record<string, VersionItem>
  filters?: Record<string, VersionItem>
  prompts?: Record<string, VersionItem>
}

const activeTab = ref<'apps' | 'samples' | 'okapi'>('apps')
const loading = ref(true)
const error = ref<string | null>(null)
const versionsData = ref<VersionsData | null>(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('https://storage.lambuage.com/versions.json')
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data: VersionsData = await res.json()
    versionsData.value = data
  } catch (err: any) {
    console.error('Failed to fetch versions.json:', err)
    error.value = err?.message || 'Failed to load versions'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const formatSize = (bytes: number): string => {
  if (!bytes) return '0 KB'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateStr
  }
}

const resolveUrl = (relativeUrl: string): string => {
  if (!relativeUrl) return '#'
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl
  }
  const base = versionsData.value?.baseUrl || 'https://storage.lambuage.com/'
  return base.replace(/\/$/, '') + '/' + relativeUrl.replace(/^\//, '')
}

const getSortedList = (itemsObj?: Record<string, VersionItem>): VersionItem[] => {
  if (!itemsObj) return []
  return Object.values(itemsObj).sort((a, b) => {
    return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  })
}

const weavesList = computed(() => getSortedList(versionsData.value?.weaves))
const bobbinsList = computed(() => getSortedList(versionsData.value?.bobbins))
const samplesList = computed(() => getSortedList(versionsData.value?.samples))
const promptsList = computed(() => getSortedList(versionsData.value?.prompts))
const filtersList = computed(() => getSortedList(versionsData.value?.filters))
</script>

<template>
  <div class="software-downloads-wrapper">
    <!-- Tab Navigation -->
    <div class="downloads-tab-nav" role="tablist">
      <button
        class="downloads-tab-btn"
        :class="{ active: activeTab === 'apps' }"
        role="tab"
        :aria-selected="activeTab === 'apps'"
        @click="activeTab = 'apps'"
      >
        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        Applications
      </button>
      <button
        class="downloads-tab-btn"
        :class="{ active: activeTab === 'samples' }"
        role="tab"
        :aria-selected="activeTab === 'samples'"
        @click="activeTab = 'samples'"
      >
        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Samples & Prompts
      </button>
      <button
        class="downloads-tab-btn"
        :class="{ active: activeTab === 'okapi' }"
        role="tab"
        :aria-selected="activeTab === 'okapi'"
        @click="activeTab = 'okapi'"
      >
        <svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        Okapi Resources
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="state-container loading-state">
      <div class="spinner"></div>
      <p>Loading available downloads...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="state-container error-state">
      <p>⚠️ Failed to load release information: {{ error }}</p>
      <button class="retry-btn" @click="fetchData">Retry</button>
    </div>

    <!-- Tab Contents -->
    <div v-else class="tab-content-container">
      <!-- TAB 1: Applications -->
      <div v-if="activeTab === 'apps'" class="cards-grid">
        <!-- SheepWeave -->
        <section class="download-card weaves-card">
          <div class="card-header">
            <div class="icon-box weaves-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div class="header-text">
              <h3>SheepWeave</h3>
              <p class="card-desc">VS Code Extension (CAT Tool for translators)</p>
            </div>
          </div>

          <div class="version-list-container">
            <div v-if="weavesList.length === 0" class="empty-state">No releases found.</div>
            <div v-else class="version-stack">
              <!-- Latest Version -->
              <a
                :href="resolveUrl(weavesList[0].url)"
                class="version-item latest-item"
                :download="weavesList[0].name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="version-info">
                  <div class="name-row">
                    <span class="version-name">{{ weavesList[0].name }}</span>
                    <span class="badge">Latest</span>
                  </div>
                  <div class="meta-row">
                    <span>{{ formatDate(weavesList[0].lastModified) }}</span>
                    <span class="dot">•</span>
                    <span>{{ formatSize(weavesList[0].size) }}</span>
                  </div>
                  <div v-if="weavesList[0].desc" class="version-desc">{{ weavesList[0].desc }}</div>
                </div>
                <div class="download-btn-icon" title="Download">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              </a>

              <!-- Earlier Versions Accordion -->
              <details v-if="weavesList.length > 1" class="earlier-accordion">
                <summary>
                  <span>Earlier Versions ({{ weavesList.length - 1 }})</span>
                  <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </summary>
                <div class="earlier-list">
                  <a
                    v-for="item in weavesList.slice(1)"
                    :key="item.name"
                    :href="resolveUrl(item.url)"
                    class="version-item"
                    :download="item.name"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div class="version-info">
                      <span class="version-name">{{ item.name }}</span>
                      <div class="meta-row">
                        <span>{{ formatDate(item.lastModified) }}</span>
                        <span class="dot">•</span>
                        <span>{{ formatSize(item.size) }}</span>
                      </div>
                      <div v-if="item.desc" class="version-desc">{{ item.desc }}</div>
                    </div>
                    <div class="download-btn-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </details>
            </div>
          </div>
        </section>

        <!-- SheepBobbin -->
        <section class="download-card bobbins-card">
          <div class="card-header">
            <div class="icon-box bobbins-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <div class="header-text">
              <h3>SheepBobbin</h3>
              <p class="card-desc">Desktop Client for LLM Translation & QA Processing</p>
            </div>
          </div>

          <div class="version-list-container">
            <div v-if="bobbinsList.length === 0" class="empty-state">No releases found.</div>
            <div v-else class="version-stack">
              <!-- Latest Version -->
              <a
                :href="resolveUrl(bobbinsList[0].url)"
                class="version-item latest-item"
                :download="bobbinsList[0].name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="version-info">
                  <div class="name-row">
                    <span class="version-name">{{ bobbinsList[0].name }}</span>
                    <span class="badge">Latest</span>
                  </div>
                  <div class="meta-row">
                    <span>{{ formatDate(bobbinsList[0].lastModified) }}</span>
                    <span class="dot">•</span>
                    <span>{{ formatSize(bobbinsList[0].size) }}</span>
                  </div>
                  <div v-if="bobbinsList[0].desc" class="version-desc">{{ bobbinsList[0].desc }}</div>
                </div>
                <div class="download-btn-icon" title="Download">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              </a>

              <!-- Earlier Versions Accordion -->
              <details v-if="bobbinsList.length > 1" class="earlier-accordion">
                <summary>
                  <span>Earlier Versions ({{ bobbinsList.length - 1 }})</span>
                  <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </summary>
                <div class="earlier-list">
                  <a
                    v-for="item in bobbinsList.slice(1)"
                    :key="item.name"
                    :href="resolveUrl(item.url)"
                    class="version-item"
                    :download="item.name"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div class="version-info">
                      <span class="version-name">{{ item.name }}</span>
                      <div class="meta-row">
                        <span>{{ formatDate(item.lastModified) }}</span>
                        <span class="dot">•</span>
                        <span>{{ formatSize(item.size) }}</span>
                      </div>
                      <div v-if="item.desc" class="version-desc">{{ item.desc }}</div>
                    </div>
                    <div class="download-btn-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </details>
            </div>
          </div>
        </section>
      </div>

      <!-- TAB 2: Samples & Prompts -->
      <div v-if="activeTab === 'samples'" class="cards-grid">
        <!-- Samples -->
        <section class="download-card samples-card">
          <div class="card-header">
            <div class="icon-box samples-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
            <div class="header-text">
              <h3>Sample Projects</h3>
              <p class="card-desc">Ready-to-use sample project packages</p>
            </div>
          </div>

          <div class="version-list-container">
            <div v-if="samplesList.length === 0" class="empty-state">No samples found.</div>
            <div v-else class="version-stack">
              <a
                v-for="item in samplesList"
                :key="item.name"
                :href="resolveUrl(item.url)"
                class="version-item"
                :download="item.name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="version-info">
                  <span class="version-name">{{ item.name }}</span>
                  <div class="meta-row">
                    <span>{{ formatDate(item.lastModified) }}</span>
                    <span class="dot">•</span>
                    <span>{{ formatSize(item.size) }}</span>
                  </div>
                  <div v-if="item.desc" class="version-desc">{{ item.desc }}</div>
                </div>
                <div class="download-btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>

        <!-- Prompts -->
        <section class="download-card prompts-card">
          <div class="card-header">
            <div class="icon-box prompts-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="header-text">
              <h3>Prompt Templates</h3>
              <p class="card-desc">Curated prompt templates for SheepBobbin & LLMs</p>
            </div>
          </div>

          <div class="version-list-container">
            <div v-if="promptsList.length === 0" class="empty-state">No prompts found.</div>
            <div v-else class="version-stack">
              <a
                v-for="item in promptsList"
                :key="item.name"
                :href="resolveUrl(item.url)"
                class="version-item"
                :download="item.name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="version-info">
                  <span class="version-name">{{ item.name }}</span>
                  <div class="meta-row">
                    <span>{{ formatDate(item.lastModified) }}</span>
                    <span class="dot">•</span>
                    <span>{{ formatSize(item.size) }}</span>
                  </div>
                  <div v-if="item.desc" class="version-desc">{{ item.desc }}</div>
                </div>
                <div class="download-btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>

      <!-- TAB 3: Okapi Resources -->
      <div v-if="activeTab === 'okapi'" class="cards-grid single-card">
        <!-- Okapi Filters -->
        <section class="download-card filters-card">
          <div class="card-header">
            <div class="icon-box okapi-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </div>
            <div class="header-text">
              <h3>Okapi Filters & Configurations</h3>
              <p class="card-desc">Pre-configured Okapi Framework filters for translation pipelines</p>
            </div>
          </div>

          <div class="version-list-container">
            <div v-if="filtersList.length === 0" class="empty-state">No filter resources found.</div>
            <div v-else class="version-stack">
              <a
                v-for="item in filtersList"
                :key="item.name"
                :href="resolveUrl(item.url)"
                class="version-item"
                :download="item.name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="version-info">
                  <span class="version-name">{{ item.name }}</span>
                  <div class="meta-row">
                    <span>{{ formatDate(item.lastModified) }}</span>
                    <span class="dot">•</span>
                    <span>{{ formatSize(item.size) }}</span>
                  </div>
                  <div v-if="item.desc" class="version-desc">{{ item.desc }}</div>
                </div>
                <div class="download-btn-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.software-downloads-wrapper {
  margin: 2rem 0;
  width: 100%;
}

/* Tabs */
.downloads-tab-nav {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 0.75rem;
  flex-wrap: wrap;
}

.downloads-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid transparent;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.downloads-tab-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.downloads-tab-btn.active {
  color: #fff;
  background: #0d9488;
  border-color: #0d9488;
  box-shadow: 0 4px 14px rgba(13, 148, 136, 0.35);
}

.tab-icon {
  stroke-width: 2.2;
}

/* State */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(13, 148, 136, 0.2);
  border-top-color: #0d9488;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  color: var(--vp-c-danger-1, #ef4444);
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  color: var(--vp-c-text-1);
  font-weight: 500;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: var(--vp-c-bg-elv);
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.cards-grid.single-card {
  max-width: 700px;
  margin: 0 auto;
}

/* Card */
.download-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.download-card:hover {
  transform: translateY(-3px);
  border-color: rgba(13, 148, 136, 0.4);
  box-shadow: 0 10px 30px rgba(13, 148, 136, 0.12);
}

/* Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1.2rem;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex-shrink: 0;
}

.weaves-icon {
  background: rgba(13, 148, 136, 0.12);
  color: #0d9488;
}

.bobbins-icon {
  background: rgba(20, 184, 166, 0.12);
  color: #14b8a6;
}

.samples-icon {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
}

.prompts-icon {
  background: rgba(168, 85, 247, 0.12);
  color: #a855f7;
}

.okapi-icon {
  background: rgba(234, 88, 12, 0.12);
  color: #ea580c;
}

.header-text h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.card-desc {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

/* Version List */
.version-list-container {
  display: flex;
  flex-direction: column;
}

.version-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  padding: 1.5rem 0;
}

/* Version Item Link */
.version-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
}

.version-item:hover {
  background: var(--vp-c-bg-elv);
  border-color: rgba(13, 148, 136, 0.5);
  transform: translateX(3px);
  text-decoration: none;
}

.version-item.latest-item {
  border-color: rgba(13, 148, 136, 0.5);
  background: rgba(13, 148, 136, 0.05);
}

.version-item.latest-item:hover {
  border-color: #0d9488;
  background: rgba(13, 148, 136, 0.1);
}

.version-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.version-name {
  font-weight: 600;
  font-size: 0.92rem;
  word-break: break-all;
  color: var(--vp-c-text-1);
}

.badge {
  background: #0d9488;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  line-height: 1;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.dot {
  opacity: 0.5;
}

.version-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.25rem;
}

.download-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}

.version-item:hover .download-btn-icon {
  color: #0d9488;
  transform: translateY(2px);
}

/* Earlier Accordion */
.earlier-accordion {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg);
  margin-top: 0.25rem;
}

.earlier-accordion summary {
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  transition: color 0.2s, background 0.2s;
  list-style: none;
}

.earlier-accordion summary::-webkit-details-marker {
  display: none;
}

.earlier-accordion summary:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.chevron {
  transition: transform 0.25s ease;
}

.earlier-accordion[open] summary .chevron {
  transform: rotate(180deg);
}

.earlier-list {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
  max-height: 320px;
  overflow-y: auto;
}

.earlier-list .version-item {
  padding: 0.65rem 0.85rem;
}

/* Scrollbar */
.earlier-list::-webkit-scrollbar {
  width: 5px;
}
.earlier-list::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 4px;
}

@media (max-width: 640px) {
  .downloads-tab-btn {
    padding: 0.5rem 0.9rem;
    font-size: 0.88rem;
  }
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
