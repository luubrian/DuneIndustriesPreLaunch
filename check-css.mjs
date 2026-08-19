import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/xoisu/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setCacheEnabled(false);
await page.goto('http://localhost:3002/index.html?t=' + Date.now(), { waitUntil: 'networkidle2' });

// Open menu
await page.evaluate(() => {
  document.getElementById('menuOpen').click();
});

// Wait a tiny bit for class to apply
await new Promise(r => setTimeout(r, 50));

const result = await page.evaluate(() => {
  const overlay = document.getElementById('menuOverlay');
  const firstNav = overlay.querySelector('.menu-nav li a');
  const logo = overlay.querySelector('.menu-brand img');
  const navStyles = getComputedStyle(firstNav);
  const logoStyles = getComputedStyle(logo);
  return {
    overlayClasses: overlay.className,
    firstNavTransform: navStyles.transform,
    firstNavTransition: navStyles.transition,
    logoTransform: logoStyles.transform,
    logoTransition: logoStyles.transition,
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
