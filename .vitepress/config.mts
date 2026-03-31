import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "contents",
  
  // Site-wide settings
  title: "Sheep Tools",
  description: "Sheep family tools for translators",

  locales: {
    root: {
      label: '日本語',
      lang: 'ja',
      title: 'Sheep Tools',
      description: '翻訳者のための Sheep シリーズツール紹介',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/' },
          { text: '事例', link: '/markdown-examples' }
        ],
        sidebar: [
          {
            text: '事例',
            items: [
              { text: 'Markdown の書き方', link: '/markdown-examples' },
              { text: 'ランタイムAPI事例', link: '/api-examples' }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      title: 'Sheep Tools',
      description: 'Introducing Sheep family tools for translators',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Examples', link: '/en/markdown-examples' }
        ],
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/en/markdown-examples' },
              { text: 'Runtime API Examples', link: '/en/api-examples' }
            ]
          }
        ]
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      title: 'Sheep Tools',
      description: '为翻译者提供的 Sheep 系列工具介绍',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '示例', link: '/zh/markdown-examples' }
        ],
        sidebar: [
          {
            text: '示例',
            items: [
              { text: 'Markdown 示例', link: '/zh/markdown-examples' },
              { text: '运行时 API 示例', link: '/zh/api-examples' }
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    // These will be overridden by locale-specific configs if defined there, 
    // but useful for shared settings
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

