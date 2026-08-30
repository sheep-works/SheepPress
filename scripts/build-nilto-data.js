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
  return json.data || [];
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
}

buildNiltoData().catch(console.error);
