import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  headless: true,
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

const page = await browser.newPage();
page.setViewportSize({ width: 1920, height: 1080 });

// Listen to console messages
page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGE ERROR:', err));

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
await page.waitForTimeout(4000);

// Check for errors in the page
const hasErrors = await page.evaluate(() => {
  return window.errors?.length > 0 ? 'Yes' : 'No';
});

// Check DOM content
const rootContent = await page.evaluate(() => {
  const root = document.getElementById('root');
  return {
    hasRoot: !!root,
    innerHTML: root?.innerHTML?.substring(0, 200) || 'None'
  };
});

console.log('Page content:', rootContent);
console.log('Has errors:', hasErrors);

const screenshot = await page.screenshot({ path: '/tmp/app-screenshot.png', fullPage: true });
console.log('Screenshot saved');

await browser.close();
