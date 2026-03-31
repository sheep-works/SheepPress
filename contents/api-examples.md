---
outline: deep
---

# ランタイム API の事例

このページでは、VitePress が提供するいくつかのランタイム API の使用方法を紹介します。

メインの `useData()` API を使用すると、現在のページのサイト、テーマ、ページデータにアクセスできます。これは `.md` と `.vue` の両方のファイルで動作します。

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## 結果

### テーマデータ
<pre>{{ theme }}</pre>

### ページデータ
<pre>{{ page }}</pre>

### ページのフロントマター
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## 結果

### テーマデータ
<pre>{{ theme }}</pre>

### ページデータ
<pre>{{ page }}</pre>

### ページのフロントマター
<pre>{{ frontmatter }}</pre>

## 詳細

[ランタイム API の全リスト](https://vitepress.dev/reference/runtime-api#usedata)については、ドキュメントを確認してください。

