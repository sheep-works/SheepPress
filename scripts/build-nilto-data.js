import fs from 'node:fs';
import path from 'node:path';

function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  }
}

function transformMediaEmbeds(text) {
  if (!text) return '';

  // 1. NILTO埋め込み動画 または 動画ファイルへのMarkdownリンク
  text = text.replace(
    /\[(?:埋め込み動画:?|動画:?)?\s*([^\]]*)\]\((https?:\/\/[^\s\)]+\.(?:mp4|webm|mov|m4v|ogg)(?:\?[^\s\)]*)?)\)/gi,
    '<video controls style="max-width: 100%; width: 100%; border-radius: 8px; margin: 1.5rem 0;" preload="metadata"><source src="$2">お使いのブラウザは動画タグをサポートしていません。</video>'
  );

  // 2. YouTubeの埋め込みリンク
  text = text.replace(
    /\[(?:埋め込み動画:?|YouTube:?)?\s*[^\]]*\]\((https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)[^\s\)]*)\)/gi,
    '<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 8px;"><iframe src="https://www.youtube-nocookie.com/embed/$2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
  );

  // 3. 音声ファイルへのMarkdownリンク
  text = text.replace(
    /\[(?:埋め込み音声:?|音声:?)?\s*([^\]]*)\]\((https?:\/\/[^\s\)]+\.(?:mp3|wav|m4a|aac|ogg)(?:\?[^\s\)]*)?)\)/gi,
    '<audio controls style="width: 100%; margin: 1rem 0;"><source src="$2">お使いのブラウザは音声タグをサポートしていません。</audio>'
  );

  return text;
}

async function fetchModelData(apiKey, modelName) {
  const url = `https://cms-api.nilto.com/v1/contents?model=${encodeURIComponent(modelName)}&body[format]=markdown&limit=100`;
  const res = await fetch(url, {
    headers: {
      'X-NILTO-API-KEY': apiKey
    }
  });
  if (!res.ok) {
    console.warn(`Failed to fetch ${modelName}: status ${res.status}`);
    return [];
  }
  const json = await res.json();
  const items = json.data || [];
  for (const item of items) {
    if (item.body) {
      item.body = transformMediaEmbeds(item.body);
    }
  }
  return items;
}

function stringifyFrontmatter(data) {
  let str = '---\n';
  for (const [key, val] of Object.entries(data)) {
    if (val === undefined || val === null) continue;
    if (Array.isArray(val)) {
      if (val.length === 0) {
        str += `${key}: []\n`;
      } else {
        str += `${key}:\n`;
        for (const item of val) {
          str += `  - ${JSON.stringify(item)}\n`;
        }
      }
    } else if (typeof val === 'string' && (val.includes('\n') || val.includes(':') || val.includes('#') || val.includes('"'))) {
      str += `${key}: ${JSON.stringify(val)}\n`;
    } else {
      str += `${key}: ${val}\n`;
    }
  }
  str += '---\n';
  return str;
}

function generateBlogMarkdownFiles(blogItems) {
  const blogDir = path.resolve('contents/blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // 1. 各記事の .md ファイルを生成
  for (const item of blogItems) {
    const slug = item.slug || String(item._id);
    const dateStr = (item._published_at || item._created_at || '').split('T')[0];
    const updateStr = (item._updated_at || item._created_at || '').split('T')[0];

    const frontmatter = {
      title: item.title || item._title,
      description: item.summary || '',
      date: dateStr,
      updated: updateStr,
      pageClass: 'blog-post-page',
      author: '合同会社ランベージ & ひつじの翻訳室',
      lang: 'ja',
      category: '開発雑記',
      target_tool: item.target_tool || '',
      tags: item.tags || []
    };

    const title = item.title || item._title;
    let bodyContent = (item.body || '').trim();

    // Bodyの最上部に H1 タイトルとメタ情報を自動配置（重複防止ガード付き）
    if (!bodyContent.startsWith('# ')) {
      let headerMarkdown = `# ${title}\n\n`;
      if (dateStr || item.target_tool) {
        headerMarkdown += `<div class="blog-post-meta"><span class="blog-post-date">📅 ${dateStr}</span>${item.target_tool ? `<span class="blog-post-tag">🛠 ${item.target_tool}</span>` : ''}</div>\n\n`;
      }
      bodyContent = headerMarkdown + bodyContent;
    }

    const fileContent = `${stringifyFrontmatter(frontmatter)}\n${bodyContent}\n`;

    const filePath = path.join(blogDir, `${slug}.md`);
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`[build-nilto-data] Generated blog post: ${filePath}`);
  }

  // 2. contents/blog/index.md (雑記一覧ページ) も必要に応じて生成
  const indexMdPath = path.join(blogDir, 'index.md');
  if (!fs.existsSync(indexMdPath)) {
    const indexContent = `---
title: "開発雑記・マニュアル"
description: "Sheep Tools開発者の雑記および解説マニュアル"
date: 2026-08-15
author: "合同会社ランベージ & ひつじの翻訳室"
lang: "ja"
category: "雑記"
---

# 開発雑記・マニュアル

最新の雑記・マニュアル一覧は [What's new](/news/) ページの「雑記」タブよりご確認いただけます。
`;
    fs.writeFileSync(indexMdPath, indexContent, 'utf8');
  }
}

async function buildNiltoData() {
  loadEnv();
  const apiKey = process.env.NILTO_API_KEY || process.env.VITE_NILTO_API_KEY;

  if (!apiKey) {
    console.error('Warning: NILTO_API_KEY is not defined in .env');
    return;
  }

  const buildTimestamp = new Date().toISOString();
  console.log(`[build-nilto-data] Fetching data at ${buildTimestamp}...`);

  const newsData = await fetchModelData(apiKey, 'news');
  const blogData = await fetchModelData(apiKey, 'tools_blog');

  const payload = {
    buildTimestamp,
    news: newsData,
    tools_blog: blogData
  };

  const outputDir = path.resolve('contents/public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'nilto-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[build-nilto-data] Successfully saved nilto-data.json (${newsData.length} news, ${blogData.length} blogs)`);

  // 雑記の個別 Markdown ファイル生成
  generateBlogMarkdownFiles(blogData);
}

buildNiltoData().catch(console.error);
