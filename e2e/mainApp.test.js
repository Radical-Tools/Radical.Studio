const puppeteer = require('puppeteer');

describe('Basic flow', () => {
  it('Can open C4 model and see default view', async () => {
    const browser = await puppeteer.launch({});
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
});
