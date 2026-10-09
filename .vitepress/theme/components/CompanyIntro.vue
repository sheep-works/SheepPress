<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(sectionRef.value)
  } else {
    isVisible.value = true
  }
})
</script>

<template>
  <div 
    ref="sectionRef" 
    class="company-intro-section" 
    :class="{ 'is-visible': isVisible }"
  >
    <div class="company-intro-content">
      <!-- <div class="company-badge">ABOUT US</div> -->
      <h2 class="company-title">翻訳者のためのツール開発と一貫した言語ソリューション</h2>
      
      <div class="company-grid">
        <a href="/about" class="company-item">
          <div class="company-item-header">
            <h3>🐑 合同会社ランベージ</h3>
            <span class="company-link-arrow">会社概要 →</span>
          </div>
          <p>翻訳に付随するディレクションや多言語DTP・編集、Webサイト制作などを広く請け負っております。</p>
          <p>さらに、翻訳実務の現場から生まれた各種翻訳支援ツール（Sheep Family）として開発もしています。</p>
          <p>言語にまつわる業務の効率化やお困りごとがあれば、いつでもご相談ください。</p>
        </a>

        <a href="/about#hitsuji" class="company-item">
          <div class="company-item-header">
            <h3>📖 ひつじの翻訳室</h3>
            <span class="company-link-arrow">概要 →</span>
          </div>
          <p>医療・医薬品や契約書、IT関連の翻訳に長く携わってきました。</p>
          <p>昨今はゲームや漫画といった分野でも多くの作品を手がけております。</p>
          <p>翻訳が必要なときは、お気軽にお声がけください。</p>
        </a>
      </div>

      <div class="company-actions">
        <a href="/contact" class="btn-primary">お問い合わせ・ご相談</a>
        <a href="/product-list" class="btn-secondary">ツール一覧・詳細</a>
        <a href="/records" class="btn-secondary">翻訳実績</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.company-intro-section {
  max-width: 1152px;
  margin: 0 auto 4rem;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.5s; /* 初期表示時にHero画像のフェードインに合わせて時間差で出現 */
}

.company-intro-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.company-intro-content {
  padding: 0.5rem 0 1.5rem;
}

.company-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.company-title {
  font-size: 1.6rem !important;
  font-weight: 700 !important;
  margin-top: 0 !important;
  margin-bottom: 1.5rem !important;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  line-height: 1.4 !important;
  text-align: center !important;
}

.company-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .company-grid {
    grid-template-columns: 1fr;
  }
}

.company-item {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem 1.75rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.company-item:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-elv);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.company-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.company-item h3 {
  margin: 0 !important;
  font-size: 1.18rem !important;
  font-weight: 700 !important;
  border-bottom: none !important;
  padding-bottom: 0 !important;
  color: var(--vp-c-text-1);
}

.company-link-arrow {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  transition: transform 0.2s ease;
  white-space: nowrap;
}

.company-item:hover .company-link-arrow {
  transform: translateX(4px);
}

.company-item p {
  margin: 0 0 0.5rem 0 !important;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.company-item p:last-child {
  margin-bottom: 0 !important;
}

.company-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white) !important;
  border: 1px solid var(--vp-c-brand-1);
}

.btn-primary:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--vp-c-brand-soft);
}

.btn-secondary {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-divider);
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
  transform: translateY(-2px);
}
</style>
