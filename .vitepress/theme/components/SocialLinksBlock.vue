<script setup lang="ts">
interface SocialLink {
  name: string
  url: string
  description: string
  color: string
  icon: 'note' | 'x' | 'linkedin' | 'github'
}

const socialLinks: SocialLink[] = [
  {
    name: 'note',
    url: 'https://note.com/lambuage',
    description: '開発日記・翻訳ツールや業務に関する知見を発信',
    color: '#2cb696',
    icon: 'note'
  },
  {
    name: 'X (旧Twitter)',
    url: 'https://x.com/transheep_biz',
    description: '日々の開発進捗・お知らせ・つぶやき',
    color: '#000000',
    icon: 'x'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/%E6%85%8E%E4%BB%8B-%E7%9F%B3%E7%94%B0-b867311b5/',
    description: '石田 慎介 (合同会社ランベージ 代表)',
    color: '#0a66c2',
    icon: 'linkedin'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/sheep-works',
    description: 'Sheep Tools オープンソースリポジトリ',
    color: '#24292e',
    icon: 'github'
  }
]
</script>

<template>
  <div class="social-links-container">
    <div class="social-links-grid">
      <a 
        v-for="link in socialLinks" 
        :key="link.name" 
        :href="link.url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-card"
      >
        <div class="social-card-header">
          <div class="icon-wrapper" :style="{ '--brand-color': link.color }">
            <!-- note -->
            <svg v-if="link.icon === 'note'" class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 3h-15C3.1 3 2 4.1 2 5.5v13C2 19.9 3.1 21 4.5 21h15c1.4 0 2.5-1.1 2.5-2.5v-13C22 4.1 20.9 3 19.5 3zm-2.8 13.8h-2.4v-5.2c0-1.1-.4-1.7-1.4-1.7s-1.6.7-1.6 1.8v5.1H8.9V9.2h2.3v1c.5-.7 1.4-1.2 2.6-1.2 1.9 0 2.9 1.2 2.9 3.3v4.5z"/>
            </svg>

            <!-- X -->
            <svg v-else-if="link.icon === 'x'" class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>

            <!-- LinkedIn -->
            <svg v-else-if="link.icon === 'linkedin'" class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>

            <!-- GitHub -->
            <svg v-else-if="link.icon === 'github'" class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </div>
          <span class="external-arrow">↗</span>
        </div>

        <div class="social-card-body">
          <h3 class="social-name">{{ link.name }}</h3>
          <p class="social-desc">{{ link.description }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.social-links-container {
  margin: 24px 0;
}

.social-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.social-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.social-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  background: var(--vp-c-bg-alt);
}

.social-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--brand-color);
  transition: transform 0.2s ease;
}

.dark .icon-wrapper[style*="#000000"] {
  color: #ffffff;
}

.dark .icon-wrapper[style*="#24292e"] {
  color: #ffffff;
}

.social-card:hover .icon-wrapper {
  transform: scale(1.08);
}

.social-icon {
  width: 22px;
  height: 22px;
}

.external-arrow {
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  transition: transform 0.2s ease, color 0.2s ease;
}

.social-card:hover .external-arrow {
  color: var(--vp-c-brand-1);
  transform: translate(2px, -2px);
}

.social-card-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.social-name {
  margin: 0 !important;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border: none !important;
  padding: 0 !important;
}

.social-desc {
  margin: 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
