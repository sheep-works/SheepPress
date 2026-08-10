import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import './custom.css'
import JsonViewer from './components/JsonViewer.vue'
import NoteFeed from './components/NoteFeed.vue'
import SocialFeed from './components/SocialFeed.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component('JsonViewer', JsonViewer)
    app.component('NoteFeed', NoteFeed)
    app.component('SocialFeed', SocialFeed)
  }
}
