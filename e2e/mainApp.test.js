const puppeteer = require('puppeteer');
const path = require('path');

describe('Basic flow', () => {
  it('Can open C4 model and see default view', async () => {
    const browser = await puppeteer.launch({
      // headless: false,
      // devtools: true,
      // slowMo: 250,
    });
    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1024,
        height: 768,
      },
      userAgent: '',
    });

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('button[aria-label=C4]');
    await page.click('button[aria-label=C4]');
    await page.waitForSelector('h6[data-testid=view-name]');
    const textContent = await page.evaluate(
      () => document.querySelector('h6[data-testid=view-name]').textContent
    );
    expect(textContent).toBe('Default View');
    browser.close();
  }, 9000000);
  it('Can open file and see view', async () => {
    const browser = await puppeteer.launch({
      // headless: false,
      // devtools: true,
      // slowMo: 250,
    });
    const page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1024,
        height: 768,
      },
      userAgent: '',
    });
    const filePath = path.relative(
      process.cwd(),
      path.join(__dirname, './test.radical')
    );
    await page.goto('http://localhost:3000/');
    const loader = await page.waitForSelector('div[data-testid=file-uploader]');
    const elementHandle = await loader.$('input[type=file]');
    await elementHandle.uploadFile(filePath);
    await page.waitForSelector('h6[data-testid=view-name]');
    const textContent = await page.evaluate(
      () => document.querySelector('h6[data-testid=view-name]').textContent
    );
    expect(textContent).toBe('Test view');
    browser.close();
  }, 9000000);
});
