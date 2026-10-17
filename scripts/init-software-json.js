#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

/**
 * 新しい Sheep Tool フォルダに SoftwareApplication.json の雛形を作成するヘルパースクリプト
 * 使い方:
 *   node scripts/init-software-json.js <tool-name> [web|desktop] [description]
 * 例:
 *   node scripts/init-software-json.js sheep-new web "翻訳支援Webツール"
 */

const args = process.argv.slice(2);
const toolName = args[0];
const type = (args[1] || 'desktop').toLowerCase();
const description = args[2] || `${toolName} の概要`;

if (!toolName) {
  console.log(`
[init-software-json] 使用方法:
  node scripts/init-software-json.js <tool-name> [web|desktop] [description]

例:
  node scripts/init-software-json.js sheep-test web "テスト用Webツール"
`);
  process.exit(1);
}

const targetDir = path.resolve('contents/docs', toolName);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`[init-software-json] Created directory: ${targetDir}`);
}

const targetFile = path.join(targetDir, 'SoftwareApplication.json');
if (fs.existsSync(targetFile)) {
  console.warn(`[init-software-json] ${targetFile} already exists. Skipping.`);
  process.exit(0);
}

const isWeb = type === 'web';
const template = {
  "@context": "https://schema.org",
  "@type": isWeb ? "WebApplication" : "SoftwareApplication",
  "name": toolName,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": isWeb ? "Web Browser" : "Windows, macOS, Linux",
  "description": description,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY"
  }
};

fs.writeFileSync(targetFile, JSON.stringify(template, null, 2), 'utf8');
console.log(`[init-software-json] Successfully generated: ${targetFile}`);
