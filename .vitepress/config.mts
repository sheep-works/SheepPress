import { defineConfig, type HeadConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

// .env から API キーを自動抽出
let niltoApiKey = ''
try {
  const envPath = path.resolve('.env')
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8')
    const match = content.match(/(?:VITE_)?NILTO_API_KEY\s*=\s*(.+)/)
    if (match) niltoApiKey = match[1].trim()
  }
} catch (e) {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    define: {
      '__NILTO_API_KEY__': JSON.stringify(niltoApiKey)
    }
  },
  srcDir: "contents",
  base: "/",
  sitemap: {
    hostname: 'https://lambuage.com'
  },
  transformHead({ pageData }) {
    const head: HeadConfig[] = []
    const domain = 'https://lambuage.com'

    // Clean page path for URL
    const cleanPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')
    const pageUrl = `${domain}/${cleanPath}`

    const title = pageData.title ? `${pageData.title} | LAMBUAGE` : 'LAMBUAGE'
    const description = pageData.description || 'Lambuage provides tools for translators -- Sheep Family'
    const ogImage = `${domain}/lambuage-logo.png`

    // OGP Meta Tags
    head.push(['meta', { property: 'og:site_name', content: 'LAMBUAGE' }])
    head.push(['meta', { property: 'og:title', content: title }])
    head.push(['meta', { property: 'og:description', content: description }])
    head.push(['meta', { property: 'og:type', content: pageData.relativePath === 'index.md' ? 'website' : 'article' }])
    head.push(['meta', { property: 'og:url', content: pageUrl }])
    head.push(['meta', { property: 'og:image', content: ogImage }])

    // Twitter Card
    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:title', content: title }])
    head.push(['meta', { name: 'twitter:description', content: description }])
    head.push(['meta', { name: 'twitter:image', content: ogImage }])

    // JSON-LD Structured Data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': pageData.relativePath === 'index.md' ? 'WebSite' : 'Article',
      'name': title,
      'headline': pageData.title || title,
      'description': description,
      'url': pageUrl,
      'publisher': {
        '@type': 'Organization',
        'name': '合同会社ランベージ',
        'url': domain,
        'logo': {
          '@type': 'ImageObject',
          'url': ogImage
        }
      }
    }

    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(jsonLd)
    ])

    return head
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
          { text: 'About', link: '/en/about' },
          { text: 'Records', link: '/en/records' },
          { text: 'Products', link: '/en/product-list' },
          { text: 'Contact', link: '/en/contact' },
          { text: "What's new", link: '/en/news' },
        ],
        sidebar: {
          '/en/sheep-lint/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepLint',
              items: [
                { text: 'Overview', link: '/en/sheep-lint/' },
                { text: 'Getting Started', link: '/en/sheep-lint/01_introduction' },
              ]
            },
          ],
          '/en/sheep-weave/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepWeave',
              items: [
                { text: 'Overview', link: '/en/sheep-weave/' },
                { text: 'Getting Started', link: '/en/sheep-weave/01_get_started' },
                { text: 'Tutorial', link: '/en/sheep-weave/02_tutorial' },
                { text: 'Translating Actual Files', link: '/en/sheep-weave/03_actual_translation' },
                { text: 'UI & Interfaces', link: '/en/sheep-weave/04_interfaces' },
                { text: 'Shortcuts & Functions', link: '/en/sheep-weave/05_shortcuts_and_functions' },
                { text: 'Simple Replace', link: '/en/sheep-weave/06_simple_replace' },
                { text: 'Continuous Translation', link: '/en/sheep-weave/07_continuous_translation' },
                { text: 'LLM / AI Integration', link: '/en/sheep-weave/08_LLM_usage' },
                { text: 'Other Features', link: '/en/sheep-weave/09_other_usage' },
                { text: 'Multilingual Excel & Rainbow', link: '/en/sheep-weave/10_rainbow' },
                { text: 'About CAT Tools', link: '/en/sheep-weave/11_about_cat' },
                { text: 'VS Code Usage', link: '/en/sheep-weave/12_vscode_usage' },
              ]
            },
          ],
          '/en/sheep-comb/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepComb',
              items: [
                { text: 'Overview', link: '/en/sheep-comb/' },
                { text: 'Getting Started', link: '/en/sheep-comb/01_introduction' },
                { text: 'Step-by-Step Guide', link: '/en/sheep-comb/02_steps_desc' },
                { text: 'Concordance Search', link: '/en/sheep-comb/11_tools_concordance' },
                { text: 'Text Diff Tool', link: '/en/sheep-comb/12_tools_diff' },
              ]
            },
          ],
          '/en/sheep-bobbin/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepBobbin',
              items: [
                { text: 'Overview', link: '/en/sheep-bobbin/' },
                { text: 'Getting Started', link: '/en/sheep-bobbin/01_introduction' },
                { text: 'Local LLM Setup', link: '/en/sheep-bobbin/02_local_llm' },
                { text: 'Cloud LLM Setup', link: '/en/sheep-bobbin/03_cloud_llm' },
              ]
            },
          ],
          '/en/': [
            {
              text: 'Menu',
              items: [
                { text: 'Home', link: '/en/' },
                { text: 'About', link: '/en/about' },
                { text: 'Records', link: '/en/records' },
                { text: 'Products', link: '/en/product-list' },
                { text: 'Contact', link: '/en/contact' },
                { text: "What's new", link: '/en/news' },
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
          { text: '公司概要', link: '/zh/about' },
          { text: '业绩成果', link: '/zh/records' },
          { text: '产品列表', link: '/zh/product-list' },
          { text: '联系我们', link: '/zh/contact' },
          { text: "最新资讯", link: '/zh/news' },
        ],
        sidebar: {
          '/zh/sheep-lint/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepLint',
              items: [
                { text: '概要', link: '/zh/sheep-lint/' },
                { text: '使用入门', link: '/zh/sheep-lint/01_introduction' },
              ]
            },
          ],
          '/zh/sheep-weave/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepWeave',
              items: [
                { text: '概要', link: '/zh/sheep-weave/' },
                { text: '使用入门', link: '/zh/sheep-weave/01_get_started' },
                { text: '基础体验教程', link: '/zh/sheep-weave/02_tutorial' },
                { text: '实际文件翻译实操', link: '/zh/sheep-weave/03_actual_translation' },
                { text: '界面与面板详解', link: '/zh/sheep-weave/04_interfaces' },
                { text: '快捷键与高频功能', link: '/zh/sheep-weave/05_shortcuts_and_functions' },
                { text: '简易替换推荐指南', link: '/zh/sheep-weave/06_simple_replace' },
                { text: '持续性翻译与资产复用', link: '/zh/sheep-weave/07_continuous_translation' },
                { text: 'LLM / AI 深度联动', link: '/zh/sheep-weave/08_LLM_usage' },
                { text: '其他扩展功能', link: '/zh/sheep-weave/09_other_usage' },
                { text: '多语言 Excel 翻译与 Rainbow', link: '/zh/sheep-weave/10_rainbow' },
                { text: '关于 CAT 辅助翻译工具', link: '/zh/sheep-weave/11_about_cat' },
                { text: 'VS Code 使用技巧', link: '/zh/sheep-weave/12_vscode_usage' },
              ]
            },
          ],
          '/zh/sheep-comb/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepComb',
              items: [
                { text: '概要', link: '/zh/sheep-comb/' },
                { text: '使用入门', link: '/zh/sheep-comb/01_introduction' },
                { text: '各步骤详细操作指南', link: '/zh/sheep-comb/02_steps_desc' },
                { text: '双语语料检索', link: '/zh/sheep-comb/11_tools_concordance' },
                { text: '文本对比工具', link: '/zh/sheep-comb/12_tools_diff' },
              ]
            },
          ],
          '/zh/sheep-bobbin/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepBobbin',
              items: [
                { text: '概要', link: '/zh/sheep-bobbin/' },
                { text: '使用入门', link: '/zh/sheep-bobbin/01_introduction' },
                { text: '本地LLM通信配置', link: '/zh/sheep-bobbin/02_local_llm' },
                { text: '云端LLM通信配置', link: '/zh/sheep-bobbin/03_cloud_llm' },
              ]
            },
          ],
          '/zh/': [
            {
              text: '菜单',
              items: [
                { text: '首页', link: '/zh/' },
                { text: '公司概要', link: '/zh/about' },
                { text: '业绩成果', link: '/zh/records' },
                { text: '产品列表', link: '/zh/product-list' },
                { text: '联系我们', link: '/zh/contact' },
                { text: "最新资讯", link: '/zh/news' },
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
