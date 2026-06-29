import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium'
  });
  const page = await browser.newPage();
  
  // Go to 3D office
  await page.goto('http://localhost:5173/3d-office', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '/tmp/new-characters.png' });
  console.log('New styled characters screenshot saved');

  await browser.close();
})();
