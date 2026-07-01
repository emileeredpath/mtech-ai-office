import { chromium } from '@playwright/test';

const browser = await chromium.launch({
  headless: true,
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});

const page = await browser.newPage();
page.setViewportSize({ width: 1920, height: 1080 });

page.on('console', msg => console.log('BROWSER:', msg.type(), msg.text().substring(0, 100)));
page.on('pageerror', err => console.log('ERROR:', err.message));

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(3000);

const screenshot = await page.screenshot({ path: '/tmp/app-screenshot.png', fullPage: true });
console.log('Screenshot saved');

await browser.close();
