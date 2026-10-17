import fs from 'node:fs';
import path from 'node:path';

const HOST = 'lambuage.com';
const KEY = '1038cdd5e2d744d5926760a7a95aed57';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ONLINE_SITEMAP = `https://${HOST}/sitemap.xml`;

async function getSitemapXml() {
  // 1. 公開済みのオンライン sitemap.xml を取得試行
  try {
    const res = await fetch(ONLINE_SITEMAP, { cache: 'no-store' });
    if (res.ok) {
      console.log(`[IndexNow] Fetched sitemap from ${ONLINE_SITEMAP}`);
      return await res.text();
    }
  } catch (e) {
    // オフラインまたはエラー時はローカルファイルを試す
  }

  // 2. ローカルビルドの sitemap.xml を取得試行
  const sitemapPath = path.resolve('.vitepress/dist/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    console.log(`[IndexNow] Loaded local sitemap from ${sitemapPath}`);
    return fs.readFileSync(sitemapPath, 'utf8');
  }

  return null;
}

async function main() {
  console.log('[IndexNow] Starting notification...');

  const sitemapContent = await getSitemapXml();
  if (!sitemapContent) {
    console.warn('[IndexNow] sitemap.xml could not be found (neither online nor locally). Skipping.');
    return;
  }

  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }

  if (urls.length === 0) {
    console.warn('[IndexNow] No URLs found in sitemap.xml. Skipping.');
    return;
  }

  console.log(`[IndexNow] Found ${urls.length} URLs to submit.`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`[IndexNow] Successfully notified! Status: ${res.status}`);
    } else {
      const text = await res.text();
      console.warn(`[IndexNow] Response status ${res.status}: ${text}`);
    }
  } catch (err) {
    console.error('[IndexNow] Failed to send request:', err);
  }
}

main().catch((err) => {
  console.error('[IndexNow] Unexpected error:', err);
});
