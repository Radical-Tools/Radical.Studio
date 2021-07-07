/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

const timeout = 60000;
describe('Basic flow', () => {
  it(
    'Can open C4 model and see default view',
    async () => {
      const browser = await puppeteer.launch({
        // headless: false,
        // devtools: true,
        slowMo: 50,
      });
      try {
        const page = await browser.newPage();
        page.emulate({
          viewport: {
            width: 1024,
            height: 768,
          },
          userAgent: '',
        });
        page
          .on('console', (message) =>
            console.log(
              `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
            )
          )
          .on('pageerror', ({ message }) => console.log(message))
          .on('requestfailed', (request) =>
            console.log(`${request.failure().errorText} ${request.url()}`)
          );
        await page.goto('http://localhost:5000/');
        await page.waitForSelector('button[data-testid=metamodel-selector-C4]');
        await page.click('button[data-testid=metamodel-selector-C4]');
        await page.waitForSelector('h6[data-testid=view-name]');
        const textContent = await page.evaluate(
          () => document.querySelector('h6[data-testid=view-name]').textContent
        );
        expect(textContent).toBe('Default View');
      } finally {
        await browser.close();
      }
    },
    timeout
  );
  it(
    'Can open file and see view',
    async () => {
      const browser = await puppeteer.launch({
        // headless: false,
        // devtools: true,
        slowMo: 50,
      });
      try {
        const page = await browser.newPage();

        page.emulate({
          viewport: {
            width: 1024,
            height: 768,
          },
          userAgent: '',
        });
        page
          .on('console', (message) =>
            console.log(
              `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
            )
          )
          .on('pageerror', ({ message }) => console.log(message))
          .on('requestfailed', (request) =>
            console.log(`${request.failure().errorText} ${request.url()}`)
          );
        const filePath = path.relative(
          process.cwd(),
          path.join(__dirname, './test.radical')
        );
        await page.goto('http://localhost:5000/');
        const loader = await page.waitForSelector(
          'div[data-testid=file-uploader]'
        );
        const elementHandle = await loader.$('input[type=file]');
        await elementHandle.uploadFile(filePath);
        await page.waitForSelector('h6[data-testid=view-name]');
        const textContent = await page.evaluate(
          () => document.querySelector('h6[data-testid=view-name]').textContent
        );
        expect(textContent).toBe('Test view');
      } finally {
        await browser.close();
      }
    },
    timeout
  );
});
