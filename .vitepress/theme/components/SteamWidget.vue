<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useData } from 'vitepress'

const slots = useSlots()

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
    appId: '2445690',
    url: 'https://store.steampowered.com/app/2445690/Lost_Castle_2/'
  }
)

const { lang } = useData()

interface GameMeta {
  title: string
  desc: string
  release: string
}

const knownGames: Record<string, { ja: GameMeta; en: GameMeta; zh: GameMeta }> = {
  '2445690': {
    ja: {
      title: 'ロストキャッスル 2 (Lost Castle 2)',
      desc: '最大4人オンラインマルチプレイ対応、爽快な2DローグライトアクションRPG。',
      release: '発売：2026年6月'
    },
    en: {
      title: 'Lost Castle 2',
      desc: "2D Rogue-lite Beat 'Em Up Action Game with up to 4-player co-op.",
      release: 'Release: June 2026'
    },
    zh: {
      title: '失落城堡 2 (Lost Castle 2)',
      desc: '经典2D横版 Rogue-lite 动作冒险游戏，支持最多4人联机合作。',
      release: '发售日期：2026年6月'
    }
  },
  '2939790': {
    ja: {
      title: 'ルナリウム星の旅 (Lunarium)',
      desc: '手描き風の美しい世界を冒険するファンタジーアクションRPG。',
      release: '発売：2026年7月'
    },
    en: {
      title: 'Lunarium',
      desc: 'A fantasy action RPG featuring hand-drawn visuals and challenging combat.',
      release: 'Release: July 2026'
    },
    zh: {
      title: '月核：星辰之旅 (Lunarium)',
      desc: '手绘风奇幻动作冒险 RPG 游戏。',
      release: '发售日期：2026年7月'
    }
  }
}

const currentGameMeta = computed(() => {
  const id = String(props.appId || '2445690')
  const game = knownGames[id]
  const currentLang = (lang.value || 'ja') as 'ja' | 'en' | 'zh'
  const langKey = (currentLang === 'zh' || currentLang === 'en') ? currentLang : 'ja'
  
  if (game && game[langKey]) {
    return game[langKey]
  }
  return {
    title: `Steam App ${id}`,
    desc: '',
    release: ''
  }
})

const displayTitle = computed(() => {
  return props.title || currentGameMeta.value.title
})

const displayDesc = computed(() => {
  return props.description || currentGameMeta.value.desc
})

const displayRelease = computed(() => {
  return props.releaseDate || currentGameMeta.value.release
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
  <div class="steam-widget-wrapper">
    <div class="steam-card-container">
      <a 
        :href="storeUrl" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="steam-card"
        :class="{ 'has-addon': slots.default || slots.notes }"
      >
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

      <!-- カード下部追記スロットエリア -->
      <div v-if="slots.default || slots.notes" class="steam-card-addon">
        <slot name="notes">
          <slot></slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.steam-widget-wrapper {
  margin: 18px 0 24px;
  max-width: 680px;
}

.steam-card-container {
  border: 1px solid #2a475e;
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.steam-card-container:hover {
  transform: translateY(-2px);
  border-color: #66c0f4;
  box-shadow: 0 8px 24px rgba(102, 192, 244, 0.25);
}

.steam-card {
  display: flex;
  background: #171d25;
  background: linear-gradient(135deg, #1b2838 0%, #101822 100%);
  overflow: hidden;
  text-decoration: none !important;
  color: #c6d4df !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.steam-card.has-addon {
  border-bottom: 1px solid #2a475e;
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

/* 追記スロットのスタイル */
.steam-card-addon {
  padding: 12px 18px;
  font-size: 0.88rem;
  line-height: 1.6;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.steam-card-addon :deep(ul) {
  margin: 0 !important;
  padding-left: 1.25rem !important;
}

.steam-card-addon :deep(li) {
  margin: 4px 0 !important;
  color: var(--vp-c-text-1);
}

.steam-card-addon :deep(p) {
  margin: 4px 0 !important;
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
