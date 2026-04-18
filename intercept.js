const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('request', request => {
    if (request.url().includes('sector.run/_msearch')) {
      console.log('Intercepted request to:', request.url());
      console.log('Headers:', JSON.stringify(request.headers(), null, 2));
      console.log('Post data:', request.postData());
    }
  });

  try {
    await page.goto('https://www.olx.com.lb/', { waitUntil: 'networkidle2' });
  } catch (e) {
    console.error('Error opening page:', e);
  }
  
  setTimeout(async () => {
    await browser.close();
  }, 10000);
})();
