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
    } else if (typeof val === 'object') {
      str += `${key}:\n`;
      for (const [k, v] of Object.entries(val)) {
        str += `  ${k}: ${JSON.stringify(v)}\n`;
      }
    } else if (typeof val === 'string' && (val.includes('\n') || val.includes(':') || val.includes('#'))) {
      str += `${key}: ${JSON.stringify(val)}\n`;
    } else {
      str += `${key}: ${val}\n`;
    }
  }
  str += '---\n';
  return str;
}

async function niltoToMarkdown(targetModel = '') {
  loadEnv();
  const apiKey = process.env.NILTO_API_KEY;

  if (!apiKey) {
    console.error('Error: NILTO_API_KEY is not defined in .env');
    process.exit(1);
  }

  // クエリパラメータの作成 (body[format]=markdown)
  let url = 'https://cms-api.nilto.com/v1/contents?body[format]=markdown';
  if (targetModel) {
    url += `&model=${encodeURIComponent(targetModel)}`;
  }

  console.log(`Fetching contents from NILTO API (${targetModel ? `model=${targetModel}` : 'all models'})...`);
  const res = await fetch(url, {
    headers: {
      'X-NILTO-API-KEY': apiKey
    }
  });

  if (!res.ok) {
    throw new Error(`API Request failed with status ${res.status}`);
  }

  const json = await res.json();
  const items = json.data || [];

  console.log(`Fetched ${items.length} item(s) from NILTO.`);

  for (const item of items) {
    const modelName = item._model || 'default';
    const outputDir = path.resolve('output_nilto', modelName);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // システム属性以外の独自カスタムフィールドをフロントマター用に自動抽出
    const frontmatter = {
      title: item.title || item._title,
      description: item.summary || '',
      slug: item.slug || String(item._id),
      id: item._id,
      model: item._model,
      status: item._status,
      created_at: item._created_at,
      updated_at: item._updated_at,
      published_at: item._published_at,
    };

    // itemの中のカスタムフィールド（body以外）をフロントマターに追加
    for (const [key, value] of Object.entries(item)) {
      if (key === 'body' || key.startsWith('_') || key in frontmatter) continue;
      frontmatter[key] = value;
    }

    const bodyContent = item.body || '';
    const mdContent = `${stringifyFrontmatter(frontmatter)}\n${bodyContent.trim()}\n`;

    const filename = `${frontmatter.slug || item._id}.md`;
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, mdContent, 'utf8');

    console.log(`\nGenerated: ${filePath}`);
    console.log('--- Output Preview ---');
    console.log(mdContent);
    console.log('----------------------');
  }
}

// コマンドライン引数からモデル名を取得 (例: node scripts/nilto-fetch.js news)
const modelArg = process.argv[2] || '';
niltoToMarkdown(modelArg).catch(console.error);
