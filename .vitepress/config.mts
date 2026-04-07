import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "contents",
  base: "/SheepPress/",

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
          { text: '製品一覧', link: '/product-list' },
          { text: 'JSON Viewer', link: '/json-viewer' },
          { text: 'お問い合わせ', link: '/contact' }
        ],
        sidebar: {
          '/sheep-lint/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepLint',
              items: [
                { text: '概要', link: '/sheep-lint/' },
              ]
            },

          ],
          '/': [
            {
              text: 'メニュー',
              items: [
                { text: '製品一覧', link: '/product-list' },
                { text: 'JSON Viewer', link: '/json-viewer' },
                { text: 'お問い合わせ', link: '/contact' }
              ]
            }
          ]
        }
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
          { text: 'Products', link: '/en/product-list' },
          { text: 'JSON Viewer', link: '/json-viewer' },
          { text: 'Contact', link: '/en/contact' }
        ],
        sidebar: {
          '/en/sheep-lint/': [
            {
              text: 'SheepLint',
              items: [
                { text: 'Overview', link: '/en/sheep-lint/' },
              ]
            },
            { text: 'Product List', link: '/en/product-list' }
          ],
          '/en/': [
            {
              text: 'Menu',
              items: [
                { text: 'Products', link: '/en/product-list' },
                { text: 'Contact', link: '/en/contact' }
              ]
            }
          ]
        }
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
          { text: '产品列表', link: '/zh/product-list' },
          { text: 'JSON Viewer', link: '/json-viewer' },
          { text: '联系我们', link: '/zh/contact' }
        ],
        sidebar: {
          '/zh/sheep-lint/': [
            {
              text: 'SheepLint',
              items: [
                { text: '概要', link: '/zh/sheep-lint/' },
              ]
            },
            { text: '产品列表', link: '/zh/product-list' }
          ],
          '/zh/': [
            {
              text: '菜单',
              items: [
                { text: '产品列表', link: '/zh/product-list' },
                { text: '联系我们', link: '/zh/contact' }
              ]
            }
          ]
        }
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

