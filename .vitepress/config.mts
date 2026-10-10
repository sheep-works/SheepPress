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
  ignoreDeadLinks: [
    /\/app\//,
  ],
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
  // Google Analytics & BowNow
  head: [
    ["script", { async: "true", src: "https://www.googletagmanager.com/gtag/js?id=G-PFT0GHJFSL" }],
    ["script", {}, "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-PFT0GHJFSL');"],
    [
      "script",
      { id: "_bownow_ts" },
      `var _bownow_ts = document.createElement('script');
_bownow_ts.charset = 'utf-8';
_bownow_ts.src = 'https://contents.bownow.jp/js/UTC_0b6e8f464ee2de6eb03f/trace.js';
document.getElementsByTagName('head')[0].appendChild(_bownow_ts);`
    ]
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
          { text: 'SheepComb (Web)', link: '/app/', target: '_blank' },
          { text: 'お問い合わせ', link: '/contact' },
          { text: "What's new", link: '/news' },
        ],
        sidebar: {
          '/docs/sheep-lint/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepLint',
              items: [
                { text: '概要', link: '/docs/sheep-lint/' },
                { text: 'はじめに', link: '/docs/sheep-lint/01_introduction' },
              ]
            },
          ],
          '/docs/sheep-weave/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepWeave',
              items: [
                { text: '概要', link: '/docs/sheep-weave/' },
                { text: 'はじめに', link: '/docs/sheep-weave/01_get_started' },
                { text: 'チュートリアル（基本体験編）', link: '/docs/sheep-weave/02_tutorial' },
                { text: '実際のファイルの翻訳', link: '/docs/sheep-weave/03_actual_translation' },
                { text: '画面の見方', link: '/docs/sheep-weave/04_interfaces' },
                { text: 'ショートカットと便利な機能', link: '/docs/sheep-weave/05_shortcuts_and_functions' },
                { text: '簡易置換のすすめ', link: '/docs/sheep-weave/06_simple_replace' },
                { text: '継続的な翻訳', link: '/docs/sheep-weave/07_continuous_translation' },
                { text: 'LLM / AI 連携', link: '/docs/sheep-weave/08_LLM_usage' },
                { text: 'その他の機能', link: '/docs/sheep-weave/09_other_usage' },
                { text: '多言語 Excel の翻訳と Rainbow の活用', link: '/docs/sheep-weave/10_rainbow' },
                { text: 'CATツールについて', link: '/docs/sheep-weave/11_about_cat' },
                { text: 'VS Codeの使い方', link: '/docs/sheep-weave/12_vscode_usage' },
              ]
            },
          ],
          '/docs/sheep-comb/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepComb',
              items: [
                { text: '概要', link: '/docs/sheep-comb/' },
                { text: 'はじめに', link: '/docs/sheep-comb/01_introduction' },
                { text: 'SheepShuttle の詳細手順', link: '/docs/sheep-comb/11_shuttle_steps_desc' },
                { text: 'SheepGroom の詳細手順', link: '/docs/sheep-comb/21_groom_steps_desc' },
                { text: 'SheepBell の詳細手順', link: '/docs/sheep-comb/31_bell_steps_desc' },
                { text: '対訳検索（コンコーダンス）', link: '/docs/sheep-comb/91_tools_concordance' },
                { text: 'テキスト比較（差分ツール）', link: '/docs/sheep-comb/92_tools_diff' },
              ]
            },
          ],
          '/docs/sheep-bobbin/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepBobbin',
              items: [
                { text: '概要', link: '/docs/sheep-bobbin/' },
                { text: 'はじめに', link: '/docs/sheep-bobbin/01_introduction' },
                { text: 'ローカルLLMとの通信', link: '/docs/sheep-bobbin/02_local_llm' },
                { text: 'クラウドLLMとの通信', link: '/docs/sheep-bobbin/03_cloud_llm' },
                { text: 'コンソールとログ・消費トークン', link: '/docs/sheep-bobbin/04_console_and_tokens' },
              ]
            },
          ],
          '/docs/sheep-bell/': [
            { text: 'トップへ戻る', link: '/' },
            {
              text: 'SheepBell',
              items: [
                { text: '概要', link: '/docs/sheep-bell/' },
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
          { text: 'SheepComb (Web)', link: '/app/', target: '_blank' },
          { text: 'Contact', link: '/en/contact' },
          { text: "What's new", link: '/en/news' },
        ],
        sidebar: {
          '/en/docs/sheep-lint/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepLint',
              items: [
                { text: 'Overview', link: '/en/docs/sheep-lint/' },
                { text: 'Getting Started', link: '/en/docs/sheep-lint/01_introduction' },
              ]
            },
          ],
          '/en/docs/sheep-weave/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepWeave',
              items: [
                { text: 'Overview', link: '/en/docs/sheep-weave/' },
                { text: 'Getting Started', link: '/en/docs/sheep-weave/01_get_started' },
                { text: 'Tutorial', link: '/en/docs/sheep-weave/02_tutorial' },
                { text: 'Translating Actual Files', link: '/en/docs/sheep-weave/03_actual_translation' },
                { text: 'UI & Interfaces', link: '/en/docs/sheep-weave/04_interfaces' },
                { text: 'Shortcuts & Functions', link: '/en/docs/sheep-weave/05_shortcuts_and_functions' },
                { text: 'Simple Replace', link: '/en/docs/sheep-weave/06_simple_replace' },
                { text: 'Continuous Translation', link: '/en/docs/sheep-weave/07_continuous_translation' },
                { text: 'LLM / AI Integration', link: '/en/docs/sheep-weave/08_LLM_usage' },
                { text: 'Other Features', link: '/en/docs/sheep-weave/09_other_usage' },
                { text: 'Multilingual Excel & Rainbow', link: '/en/docs/sheep-weave/10_rainbow' },
                { text: 'About CAT Tools', link: '/en/docs/sheep-weave/11_about_cat' },
                { text: 'VS Code Usage', link: '/en/docs/sheep-weave/12_vscode_usage' },
              ]
            },
          ],
          '/en/docs/sheep-comb/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepComb',
              items: [
                { text: 'Overview', link: '/en/docs/sheep-comb/' },
                { text: 'Getting Started', link: '/en/docs/sheep-comb/01_introduction' },
                { text: 'SheepShuttle Guide', link: '/en/docs/sheep-comb/11_shuttle_steps_desc' },
                { text: 'SheepGroom Guide', link: '/en/docs/sheep-comb/21_groom_steps_desc' },
                { text: 'SheepBell Guide', link: '/en/docs/sheep-comb/31_bell_steps_desc' },
                { text: 'Concordance Search', link: '/en/docs/sheep-comb/91_tools_concordance' },
                { text: 'Text Diff Tool', link: '/en/docs/sheep-comb/92_tools_diff' },
              ]
            },
          ],
          '/en/docs/sheep-bobbin/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepBobbin',
              items: [
                { text: 'Overview', link: '/en/docs/sheep-bobbin/' },
                { text: 'Getting Started', link: '/en/docs/sheep-bobbin/01_introduction' },
                { text: 'Local LLM Setup', link: '/en/docs/sheep-bobbin/02_local_llm' },
                { text: 'Cloud LLM Setup', link: '/en/docs/sheep-bobbin/03_cloud_llm' },
                { text: 'Console, Logs & Tokens', link: '/en/docs/sheep-bobbin/04_console_and_tokens' },
              ]
            },
          ],
          '/en/docs/sheep-bell/': [
            { text: 'Back to Home', link: '/en/' },
            {
              text: 'SheepBell',
              items: [
                { text: 'Overview', link: '/en/docs/sheep-bell/' },
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
          { text: 'SheepComb (Web)', link: '/app/', target: '_blank' },
          { text: '联系我们', link: '/zh/contact' },
          { text: "最新资讯", link: '/zh/news' },
        ],
        sidebar: {
          '/zh/docs/sheep-lint/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepLint',
              items: [
                { text: '概要', link: '/zh/docs/sheep-lint/' },
                { text: '使用入门', link: '/zh/docs/sheep-lint/01_introduction' },
              ]
            },
          ],
          '/zh/docs/sheep-weave/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepWeave',
              items: [
                { text: '概要', link: '/zh/docs/sheep-weave/' },
                { text: '使用入门', link: '/zh/docs/sheep-weave/01_get_started' },
                { text: '基础体验教程', link: '/zh/docs/sheep-weave/02_tutorial' },
                { text: '实际文件翻译实操', link: '/zh/docs/sheep-weave/03_actual_translation' },
                { text: '界面与面板详解', link: '/zh/docs/sheep-weave/04_interfaces' },
                { text: '快捷键与高频功能', link: '/zh/docs/sheep-weave/05_shortcuts_and_functions' },
                { text: '简易替换推荐指南', link: '/zh/docs/sheep-weave/06_simple_replace' },
                { text: '持续性翻译与资产复用', link: '/zh/docs/sheep-weave/07_continuous_translation' },
                { text: 'LLM / AI 深度联动', link: '/zh/docs/sheep-weave/08_LLM_usage' },
                { text: '其他扩展功能', link: '/zh/docs/sheep-weave/09_other_usage' },
                { text: '多语言 Excel 翻译与 Rainbow', link: '/zh/docs/sheep-weave/10_rainbow' },
                { text: '关于 CAT 辅助翻译工具', link: '/zh/docs/sheep-weave/11_about_cat' },
                { text: 'VS Code 使用技巧', link: '/zh/docs/sheep-weave/12_vscode_usage' },
              ]
            },
          ],
          '/zh/docs/sheep-comb/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepComb',
              items: [
                { text: '概要', link: '/zh/docs/sheep-comb/' },
                { text: '使用入门', link: '/zh/docs/sheep-comb/01_introduction' },
                { text: 'SheepShuttle 详细操作指南', link: '/zh/docs/sheep-comb/11_shuttle_steps_desc' },
                { text: 'SheepGroom 详细操作指南', link: '/zh/docs/sheep-comb/21_groom_steps_desc' },
                { text: 'SheepBell 详细操作指南', link: '/zh/docs/sheep-comb/31_bell_steps_desc' },
                { text: '双语语料检索', link: '/zh/docs/sheep-comb/91_tools_concordance' },
                { text: '文本对比工具', link: '/zh/docs/sheep-comb/92_tools_diff' },
              ]
            },
          ],
          '/zh/docs/sheep-bobbin/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepBobbin',
              items: [
                { text: '概要', link: '/zh/docs/sheep-bobbin/' },
                { text: '使用入门', link: '/zh/docs/sheep-bobbin/01_introduction' },
                { text: '本地LLM通信配置', link: '/zh/docs/sheep-bobbin/02_local_llm' },
                { text: '云端LLM通信配置', link: '/zh/docs/sheep-bobbin/03_cloud_llm' },
                { text: '控制台、日志与Token记录', link: '/zh/docs/sheep-bobbin/04_console_and_tokens' },
              ]
            },
          ],
          '/zh/docs/sheep-bell/': [
            { text: '返回首页', link: '/zh/' },
            {
              text: 'SheepBell',
              items: [
                { text: '概要', link: '/zh/docs/sheep-bell/' },
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
