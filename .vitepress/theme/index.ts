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

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('NoteFeed', NoteFeed)
    app.component('SocialFeed', SocialFeed)
    app.component('SocialLinksBlock', SocialLinksBlock)
    app.component('WhatsNewTabs', WhatsNewTabs)
    app.component('SteamWidget', SteamWidget)
    app.component('ToolsGrid', ToolsGrid)
    app.component('CompanyIntro', CompanyIntro)
  }
}
