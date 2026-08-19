import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url   = process.argv[2] || 'http://localhost:3002/index.html';
const label = process.argv[3] || 'menu-open';

const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

let n = 1;
let filename;
do {
  filename = path.join(screenshotDir, `screenshot-${n}-${label}.png`);
  n++;
} while (fs.existsSync(filename));

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/xoisu/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 600));

// Click menu open button
await page.evaluate(() => {
  const btn = document.getElementById('menuOpen') || document.querySelector('.menu-open');
  if (btn) btn.click();
});

// Wait for the mask-reveal stagger (logo 0.2s + 0.8s, nav items up to 0.46s + 0.8s ≈ 1.26s)
await new Promise(r => setTimeout(r, 1500));

await page.screenshot({ path: filename, fullPage: false });
await browser.close();

console.log(`Screenshot saved: ${filename}`);
