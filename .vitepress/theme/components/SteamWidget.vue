<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(
  defineProps<{
    appId?: string | number
    url?: string
    title?: string
    description?: string
    image?: string
    releaseDate?: string
    tags?: string[]
  }>(),
  {
    appId: '2623480',
    url: 'https://store.steampowered.com/app/2623480/Lost_Castle_2/'
  }
)

const { lang } = useData()

const displayTitle = computed(() => {
  if (props.title) return props.title
  if (lang.value === 'zh') return '失落城堡 2 (Lost Castle 2)'
  if (lang.value === 'en') return 'Lost Castle 2'
  return 'ロストキャッスル 2 (Lost Castle 2)'
})

const displayDesc = computed(() => {
  if (props.description) return props.description
  if (lang.value === 'zh') return '经典2D横版 Rogue-lite 动作冒险游戏，支持最多4人联机合作。'
  if (lang.value === 'en') return '2D Rogue-lite Beat \'Em Up Action Game with up to 4-player co-op.'
  return '最大4人オンラインマルチプレイ対応、爽快な2DローグライトアクションRPG。'
})

const displayRelease = computed(() => {
  if (props.releaseDate) return props.releaseDate
  if (lang.value === 'zh') return '发售日期：2026年6月'
  if (lang.value === 'en') return 'Release: June 2026'
  return '発売：2026年6月'
})

const buttonText = computed(() => {
  if (lang.value === 'zh') return '在 Steam 上查看'
  if (lang.value === 'en') return 'View on Steam'
  return 'Steam ストアを見る'
})

const bannerImage = computed(() => {
  if (props.image) return props.image
  return `https://cdn.akamai.steamstatic.com/steam/apps/${props.appId}/header.jpg`
})

const storeUrl = computed(() => {
  if (props.url) return props.url
  return `https://store.steampowered.com/app/${props.appId}/`
})
</script>

<template>
  <div class="steam-card-container">
    <a :href="storeUrl" target="_blank" rel="noopener noreferrer" class="steam-card">
      <div class="steam-card-image-wrap">
        <img :src="bannerImage" :alt="displayTitle" class="steam-card-image" loading="lazy" />
      </div>

      <div class="steam-card-content">
        <div class="steam-card-badge">
          <svg class="steam-logo-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12c0-5.52-4.48-10-10-10z"/>
          </svg>
          STEAM
        </div>

        <h4 class="steam-card-title">{{ displayTitle }}</h4>
        <p class="steam-card-desc">{{ displayDesc }}</p>

        <div class="steam-card-footer">
          <span class="steam-release-date">{{ displayRelease }}</span>
          <span class="steam-store-btn">
            {{ buttonText }}
            <span class="btn-arrow">→</span>
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.steam-card-container {
  margin: 18px 0;
  max-width: 680px;
}

.steam-card {
  display: flex;
  background: #171d25;
  background: linear-gradient(135deg, #1b2838 0%, #101822 100%);
  border: 1px solid #2a475e;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none !important;
  color: #c6d4df !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.steam-card:hover {
  transform: translateY(-2px);
  border-color: #66c0f4;
  box-shadow: 0 8px 24px rgba(102, 192, 244, 0.25);
}

.steam-card-image-wrap {
  width: 240px;
  min-width: 240px;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.steam-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.steam-card:hover .steam-card-image {
  transform: scale(1.04);
}

.steam-card-content {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.steam-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #66c0f4;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.steam-logo-icon {
  width: 13px;
  height: 13px;
}

.steam-card-title {
  margin: 0 0 6px 0 !important;
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  line-height: 1.3 !important;
}

.steam-card-desc {
  margin: 0 0 12px 0 !important;
  font-size: 0.85rem !important;
  line-height: 1.45 !important;
  color: #8f98a0 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.steam-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.steam-release-date {
  font-size: 0.8rem;
  color: #67c1f5;
  font-weight: 500;
}

.steam-store-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  background: linear-gradient(90deg, #47bfff 0%, #1a9fff 100%);
  color: #ffffff !important;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 4px;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.steam-card:hover .steam-store-btn {
  background: linear-gradient(90deg, #66c0f4 0%, #31a4ff 100%);
}

.btn-arrow {
  transition: transform 0.2s;
}

.steam-card:hover .btn-arrow {
  transform: translateX(2px);
}

@media (max-width: 640px) {
  .steam-card {
    flex-direction: column;
  }
  .steam-card-image-wrap {
    width: 100%;
    min-width: 100%;
    height: 140px;
  }
  .steam-card-content {
    padding: 14px 16px;
  }
}
</style>
