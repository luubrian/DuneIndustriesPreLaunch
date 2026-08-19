import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

// Auto-increment filename
let n = 1;
let filename;
do {
  filename = label
    ? path.join(screenshotDir, `screenshot-${n}-${label}.png`)
    : path.join(screenshotDir, `screenshot-${n}.png`);
  n++;
} while (fs.existsSync(filename));

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/xoisu/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

// Let fonts and animations settle
await new Promise(r => setTimeout(r, 1200));

await page.screenshot({ path: filename, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${filename}`);
