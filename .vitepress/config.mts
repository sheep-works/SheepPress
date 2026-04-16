import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "contents",
  base: "/",
  // Google Analytics
  head: [
    ["script", { async: "true", src: "https://www.googletagmanager.com/gtag/js?id=G-PFT0GHJFSL" }],
    ["script", {}, "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-PFT0GHJFSL');"]
  ],
  // Site-wide settings
  title: "LAMBUAGE",
  description: "Lambuage provides tools for translators -- Sheep Family ",

  locales: {
    root: {
      label: '日本語',
      lang: 'ja',
      title: 'LAMBUAGE',
      description: '翻訳者のための Sheep ファミリーツールを開発・提供',
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/' },
          { text: '会社概要', link: '/about' },
          {
            text: 'ツール紹介', items: [
              { text: 'ツール一覧', link: '/product-list' },
              { text: 'JSON Viewer', link: '/json-viewer' },
            ]
          },
          { text: 'お問い合わせ', link: '/contact' },
          { text: "What's new", link: '/news' },
        ],
        sidebar: {
          '/sheep-lint/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepLint',
              items: [
                { text: '概要', link: '/sheep-lint/' },
                { text: 'はじめに', link: '/sheep-lint/01_introduction' },
              ]
            },
          ],
          '/sheep-weave/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepWeave',
              items: [
                { text: '概要', link: '/sheep-weave/' },
                { text: 'はじめに', link: '/sheep-weave/01_introduction' },
                { text: '使い始める', link: '/sheep-weave/02_get_started' },
                { text: '画面の見方', link: '/sheep-weave/03_interfaces' },
              ]
            },
          ],

          '/': [
            {
              text: 'メニュー',
              items: [
                { text: 'ホーム', link: '/' },
                { text: '会社概要', link: '/about' },
                { text: 'ツール一覧', link: '/product-list' },
                { text: 'JSON Viewer', link: '/json-viewer' },
                { text: 'お問い合わせ', link: '/contact' },
                { text: "What's new", link: '/news' },
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
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
    footer: {
      copyright: 'Copyright © 2024-present Lambuage LLC & ひつじの翻訳室'
    }
  }
})

