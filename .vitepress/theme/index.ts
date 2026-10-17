import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './custom.css'
import NoteFeed from './components/NoteFeed.vue'
import SocialFeed from './components/SocialFeed.vue'
import SocialLinksBlock from './components/SocialLinksBlock.vue'
import WhatsNewTabs from './components/WhatsNewTabs.vue'
import SteamWidget from './components/SteamWidget.vue'
import ToolsGrid from './components/ToolsGrid.vue'
import CompanyIntro from './components/CompanyIntro.vue'
import SoftwareDownloads from './components/SoftwareDownloads.vue'
import DocFooter from './components/DocFooter.vue'
import { h } from 'vue'
import SheepShuttleFlow from './components/SheepShuttleFlow.standalone.vue'
import SheepGroomFlow from './components/SheepGroomFlow.standalone.vue'
import FlowCarousel from './components/FlowCarousel.vue'
import Toc from './components/Toc.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(Breadcrumbs),
      'doc-after': () => h(DocFooter),
      'page-bottom': () => h(DocFooter)
    })
  },
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('NoteFeed', NoteFeed)
    app.component('SocialFeed', SocialFeed)
    app.component('SocialLinksBlock', SocialLinksBlock)
    app.component('WhatsNewTabs', WhatsNewTabs)
    app.component('SteamWidget', SteamWidget)
    app.component('ToolsGrid', ToolsGrid)
    app.component('CompanyIntro', CompanyIntro)
    app.component('SoftwareDownloads', SoftwareDownloads)
    app.component('DocFooter', DocFooter)
    app.component('SheepShuttleFlow', SheepShuttleFlow)
    app.component('sheep-shuttle-flow', SheepShuttleFlow)
    app.component('SheepGroomFlow', SheepGroomFlow)
    app.component('sheep-groom-flow', SheepGroomFlow)
    app.component('FlowCarousel', FlowCarousel)
    app.component('flow-carousel', FlowCarousel)
    app.component('Toc', Toc)
    app.component('toc', Toc)
  }
}
