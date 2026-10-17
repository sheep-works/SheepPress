<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { page, lang } = useData()

const toolNameMap: Record<string, string> = {
  'sheep-weave': 'SheepWeave',
  'sheep-comb': 'SheepComb',
  'sheep-bobbin': 'SheepBobbin',
  'sheep-lint': 'SheepLint',
  'sheep-shuttle': 'SheepShuttle',
  'sheep-groom': 'SheepGroom',
  'sheep-bell': 'SheepBell',
  'sheep-spindle': 'SheepSpindle',
  'sheep-loom': 'SheepLoom',
  'sheep-stitch': 'SheepStitch'
}

interface CrumbItem {
  name: string
  path?: string
}

const domain = 'https://lambuage.com'

const breadcrumbs = computed<CrumbItem[]>(() => {
  const currentPath = route.path
  // /docs/ 以下のみを対象とする
  if (!currentPath.includes('/docs/')) {
    return []
  }

  // /docs/ 単体のページでは表示しない（またはツール一覧のみ）
  const segments = currentPath
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .split('/')

  // segments: ['docs'] または ['docs', 'sheep-weave'] または ['docs', 'sheep-weave', '01_get_started']
  const docsIndex = segments.indexOf('docs')
  if (docsIndex === -1 || segments.length <= docsIndex + 1) {
    return []
  }

  const items: CrumbItem[] = [
    {
      name: lang.value === 'en' ? 'Tools' : lang.value === 'zh' ? '工具列表' : 'ツール一覧',
      path: '/docs/'
    }
  ]

  const toolFolder = segments[docsIndex + 1]
  const toolName = toolNameMap[toolFolder] || toolFolder

  const isToolRoot = segments.length === docsIndex + 2 || (segments.length === docsIndex + 3 && segments[docsIndex + 2] === 'index')

  if (isToolRoot) {
    // ツール概要ページ（例: /docs/sheep-weave/）
    items.push({
      name: toolName
    })
  } else {
    // ツール個別記事ページ（例: /docs/sheep-weave/01_get_started）
    items.push({
      name: toolName,
      path: `/docs/${toolFolder}/`
    })

    const pageTitle = page.value.title || segments[docsIndex + 2]
    items.push({
      name: pageTitle
    })
  }

  return items
})

const jsonLd = computed(() => {
  if (breadcrumbs.value.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.value.map((crumb, idx) => {
      const itemUrl = crumb.path
        ? `${domain}${crumb.path.startsWith('/') ? crumb.path : '/' + crumb.path}`
        : `${domain}${route.path}`

      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: itemUrl
      }
    })
  }
})
</script>

<template>
  <nav v-if="breadcrumbs.length > 0" class="breadcrumbs-nav" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list">
      <li
        v-for="(crumb, idx) in breadcrumbs"
        :key="idx"
        class="breadcrumb-item"
      >
        <a
          v-if="crumb.path && idx < breadcrumbs.length - 1"
          :href="crumb.path"
          class="breadcrumb-link"
        >
          {{ crumb.name }}
        </a>
        <span
          v-else
          class="breadcrumb-current"
          aria-current="page"
        >
          {{ crumb.name }}
        </span>
        <span v-if="idx < breadcrumbs.length - 1" class="breadcrumb-separator" aria-hidden="true">
          ›
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs-nav {
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.breadcrumbs-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  margin: 0 !important;
  padding: 0 !important;
}

.breadcrumb-link {
  color: var(--vp-c-text-2) !important;
  text-decoration: none !important;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand-1) !important;
}

.breadcrumb-current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  user-select: none;
}
</style>
