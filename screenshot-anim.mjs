import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3002/index.html';
const label = process.argv[3] || 'anim';
const dir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
const stamp = (s) => { let n=1,fn; do {fn=path.join(dir,`screenshot-${n}-${label}-${s}.png`); n++;} while(fs.existsSync(fn)); return fn; };

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/xoisu/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 200, deviceScaleFactor: 2 });
await page.setCacheEnabled(false);
await page.goto(url + '?t=' + Date.now(), { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 600));

await page.evaluate(() => document.getElementById('menuOpen').click());

const frames = [350, 500, 600, 700, 800, 950];
let prev = 0;
for (const ms of frames) {
  await new Promise(r => setTimeout(r, ms - prev));
  const fn = stamp(`t${ms}ms`);
  await page.screenshot({ path: fn, fullPage: false });
  console.log('Saved', fn);
  prev = ms;
}

await browser.close();
