<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang, frontmatter } = useData()

const currentLang = computed(() => {
  const l = (lang.value || 'ja').toLowerCase()
  if (l.startsWith('en')) return 'en'
  if (l.startsWith('zh')) return 'zh'
  return 'ja'
})

const footerText = computed(() => {
  if (currentLang.value === 'en') {
    return {
      privacy: 'Privacy Policy',
      privacyLink: '/privacy',
      contact: 'Contact Us',
      contactLink: '/en/contact',
      disclaimer: 'This website may contain advertisements for operational and maintenance costs.',
      copyright: 'Copyright © 2024-present Lambuage LLC & Sheep Translation Studio'
    }
  }
  if (currentLang.value === 'zh') {
    return {
      privacy: '隐私政策',
      privacyLink: '/privacy',
      contact: '联系我们',
      contactLink: '/zh/contact',
      disclaimer: '本网站可能包含用于维护与运营成本的广告内容。',
      copyright: 'Copyright © 2024-present Lambuage LLC & 绵羊翻译室'
    }
  }
  return {
    privacy: 'プライバシーポリシー',
    privacyLink: '/privacy',
    contact: 'お問い合わせ',
    contactLink: '/contact',
    disclaimer: '当サイトでは、サービスの維持・運営のため広告配信を行っている場合があります。',
    copyright: 'Copyright © 2024-present Lambuage LLC & ひつじの翻訳室'
  }
})
</script>

<template>
  <!-- layout: home 以外で表示 -->
  <footer v-if="frontmatter.layout !== 'home'" class="custom-doc-footer">
    <div class="footer-container">
      <div class="footer-links">
        <a :href="footerText.privacyLink" class="footer-link">{{ footerText.privacy }}</a>
        <span class="divider">|</span>
        <a :href="footerText.contactLink" class="footer-link">{{ footerText.contact }}</a>
      </div>
      <p class="footer-disclaimer">{{ footerText.disclaimer }}</p>
      <p class="footer-copyright">{{ footerText.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.custom-doc-footer {
  margin-top: 4rem;
  padding: 2.5rem 1.5rem 2rem;
  border-top: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  text-align: center;
}

.footer-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.footer-link {
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.divider {
  color: var(--vp-c-divider);
  opacity: 0.8;
  font-size: 0.75rem;
}

.footer-disclaimer {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

.footer-copyright {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  letter-spacing: 0.02em;
}

@media (max-width: 640px) {
  .custom-doc-footer {
    margin-top: 3rem;
    padding: 2rem 1rem 1.5rem;
  }
}
</style>
