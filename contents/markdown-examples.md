# Markdown 拡張機能の事例

このページでは、VitePress が提供する組み込みの Markdown 拡張機能のいくつかを紹介します。

## シンタックスハイライト

VitePress は [Shiki](https://github.com/shikijs/shiki) による強力なシンタックスハイライトを提供しており、行のハイライトなどの追加機能も備えています。

**入力**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**出力**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## カスタムコンテナ

**入力**

```md
::: info
これは情報ボックスです。
:::

::: tip
これはヒントです。
:::

::: warning
これは警告です。
:::

::: danger
これは危険な警告です。
:::

::: details
これは詳細ブロックです。
:::
```

**出力**

::: info
これは情報ボックスです。
:::

::: tip
これはヒントです。
:::

::: warning
これは警告です。
:::

::: danger
これは危険な警告です。
:::

::: details
これは詳細ブロックです。
:::

## 詳細

[Markdown 拡張機能の全リスト](https://vitepress.dev/guide/markdown)については、ドキュメントを確認してください。

