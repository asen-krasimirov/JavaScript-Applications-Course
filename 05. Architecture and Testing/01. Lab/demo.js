const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://whatsmyuseragent.org/');
  await page.screenshot({ path: `example2.png` });
  await browser.close();
})();
