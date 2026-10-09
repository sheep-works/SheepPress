<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

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

const currentLang = computed(() => {
  const l = (lang.value || 'ja').toLowerCase()
  if (l.startsWith('en')) return 'en'
  if (l.startsWith('zh')) return 'zh'
  return 'ja'
})

const content = computed(() => {
  if (currentLang.value === 'en') {
    return {
      title: 'Tool Development & Comprehensive Language Solutions for Translators',
      company1: {
        name: '🐑 Lambuage LLC',
        linkText: 'About Us →',
        url: '/en/about',
        paras: [
          'We provide comprehensive services including translation project direction, multilingual DTP/editing, and website creation.',
          'We also develop the Sheep Family translation assistance tools born directly from real-world translation workflows.',
          'Feel free to consult with us regarding language-related workflow optimization or any challenges you face.'
        ]
      },
      company2: {
        name: '📖 Sheep Translation Studio',
        linkText: 'Overview →',
        url: '/en/about#hitsuji',
        paras: [
          'Extensive experience in medical/pharmaceutical, legal/contract, and IT-related translations.',
          'We also handle numerous projects in creative fields such as gaming and manga localization.',
          'Whenever you need professional translation services, please reach out to us.'
        ]
      },
      actions: {
        contact: { text: 'Contact Us', url: '/en/contact' },
        products: { text: 'Products & Details', url: '/en/product-list' },
        records: { text: 'Track Record', url: '/en/records' }
      }
    }
  }
  if (currentLang.value === 'zh') {
    return {
      title: '专为译员打造的工具研发与全方位语言解决方案',
      company1: {
        name: '🐑 合同会社Lambuage',
        linkText: '公司概要 →',
        url: '/zh/about',
        paras: [
          '承接翻译项目统筹管理、多语言DTP排版与编辑、网站建设等全方位语言业务。',
          '同时研发源自一线翻译实战的各类 Sheep Family 翻译辅助工具。',
          '如您有任何多语言业务优化或技术难题，欢迎随时与我们探讨交流。'
        ]
      },
      company2: {
        name: '📖 绵羊翻译室',
        linkText: '概要 →',
        url: '/zh/about#hitsuji',
        paras: [
          '长期深耕医疗医药、商业合同及IT技术领域的专业翻译。',
          '近年来亦参与了大量游戏、动漫等数字娱乐领域的本地化作品。',
          '如您需要高品质的翻译与本地化服务，欢迎随时联系我们。'
        ]
      },
      actions: {
        contact: { text: '联系我们', url: '/zh/contact' },
        products: { text: '产品列表', url: '/zh/product-list' },
        records: { text: '业绩成果', url: '/zh/records' }
      }
    }
  }
  return {
    title: '翻訳者のためのツール開発と一貫した言語ソリューション',
    company1: {
      name: '🐑 合同会社ランベージ',
      linkText: '会社概要 →',
      url: '/about',
      paras: [
        '翻訳に付随するディレクションや多言語DTP・編集、Webサイト制作などを広く請け負っております。',
        'さらに、翻訳実務の現場から生まれた各種翻訳支援ツール（Sheep Family）として開発もしています。',
        '言語にまつわる業務の効率化やお困りごとがあれば、いつでもご相談ください。'
      ]
    },
    company2: {
      name: '📖 ひつじの翻訳室',
      linkText: '概要 →',
      url: '/about#hitsuji',
      paras: [
        '医療・医薬品や契約書、IT関連の翻訳に長く携わってきました。',
        '昨今はゲームや漫画といった分野でも多くの作品を手がけております。',
        '翻訳が必要なときは、お気軽にお声がけください。'
      ]
    },
    actions: {
      contact: { text: 'お問い合わせ・ご相談', url: '/contact' },
      products: { text: 'ツール一覧・詳細', url: '/product-list' },
      records: { text: '翻訳実績', url: '/records' }
    }
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
      <h2 class="company-title">{{ content.title }}</h2>
      
      <div class="company-grid">
        <a :href="content.company1.url" class="company-item">
          <div class="company-item-header">
            <h3>{{ content.company1.name }}</h3>
            <span class="company-link-arrow">{{ content.company1.linkText }}</span>
          </div>
          <p v-for="(p, idx) in content.company1.paras" :key="idx">{{ p }}</p>
        </a>

        <a :href="content.company2.url" class="company-item">
          <div class="company-item-header">
            <h3>{{ content.company2.name }}</h3>
            <span class="company-link-arrow">{{ content.company2.linkText }}</span>
          </div>
          <p v-for="(p, idx) in content.company2.paras" :key="idx">{{ p }}</p>
        </a>
      </div>

      <div class="company-actions">
        <a :href="content.actions.contact.url" class="btn-primary">{{ content.actions.contact.text }}</a>
        <a :href="content.actions.products.url" class="btn-secondary">{{ content.actions.products.text }}</a>
        <a :href="content.actions.records.url" class="btn-secondary">{{ content.actions.records.text }}</a>
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
  transition-delay: 0.5s;
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
