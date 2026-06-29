import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium'
  });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 20000 });
    console.log('Page loaded, taking screenshot...');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/tmp/test-load.png' });
    console.log('Screenshot taken');
  } catch (err) {
    console.error('Error:', err.message);
  }

  await browser.close();
})();
