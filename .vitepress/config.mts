import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "contents",
  base: "/",
  sitemap: {
    hostname: 'https://lambuage.com'
  },
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
          { text: '実績', link: '/records' },
          { text: 'ツール一覧', link: '/product-list' },
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
                { text: 'はじめに', link: '/sheep-weave/01_get_started' },
                { text: 'チュートリアル（基本体験編）', link: '/sheep-weave/02_tutorial' },
                { text: '実際のファイルの翻訳', link: '/sheep-weave/03_actual_translation' },
                { text: '画面の見方', link: '/sheep-weave/04_interfaces' },
                { text: 'ショートカットと便利な機能', link: '/sheep-weave/05_shortcuts_and_functions' },
                { text: '簡易置換のすすめ', link: '/sheep-weave/06_simple_replace' },
                { text: '継続的な翻訳', link: '/sheep-weave/07_continuous_translation' },
                { text: 'LLM / AI 連携', link: '/sheep-weave/08_LLM_usage' },
                { text: 'その他の機能', link: '/sheep-weave/09_other_usage' },
                { text: '多言語 Excel の翻訳と Rainbow の活用', link: '/sheep-weave/10_rainbow' },
                { text: 'CATツールについて', link: '/sheep-weave/11_about_cat' },
                { text: 'VS Codeの使い方', link: '/sheep-weave/12_vscode_usage' },
              ]
            },
          ],
          '/sheep-comb/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepComb',
              items: [
                { text: '概要', link: '/sheep-comb/' },
                { text: 'はじめに', link: '/sheep-comb/01_introduction' },
                { text: '各ステップの詳細手順', link: '/sheep-comb/02_steps_desc' },
                { text: '対訳検索（コンコーダンス）', link: '/sheep-comb/11_tools_concordance' },
                { text: 'テキスト比較（差分ツール）', link: '/sheep-comb/12_tools_diff' },
              ]
            },
          ],
          '/sheep-bobbin/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepBobbin',
              items: [
                { text: '概要', link: '/sheep-bobbin/' },
                { text: 'はじめに', link: '/sheep-bobbin/01_introduction' },
                { text: 'ローカルLLMとの通信', link: '/sheep-bobbin/02_local_llm' },
                { text: 'クラウドLLMとの通信', link: '/sheep-bobbin/03_cloud_llm' },
              ]
            },
          ],

          '/': [
            {
              text: 'メニュー',
              items: [
                { text: 'ホーム', link: '/' },
                { text: '会社概要', link: '/about' },
                { text: '実績', link: '/records' },
                { text: 'ツール一覧', link: '/product-list' },
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
    footer: {
      copyright: 'Copyright © 2024-present Lambuage LLC & ひつじの翻訳室'
    }
  }
})
