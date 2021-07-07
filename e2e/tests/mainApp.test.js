/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

let browser = null;
let page = null;

beforeAll(async () => {
  const config = {
    headless: process.env.HEADLESS === 'true',
    devtools: process.env.DEVTOOLS === 'true',
    slowMo: Number(process.env.SLOW_MO),
  };
  browser = await puppeteer.launch(config);
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
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
});

afterEach(async () => {
  await page.close();
});

describe('Basic flow', () => {
  it(
    'Can open C4 model and see default view',
    async () => {
      await page.goto(process.env.APP_URL);
      await page.waitForSelector('button[data-testid=metamodel-selector-C4]');
      await page.waitForTimeout(50);
      await page.click('button[data-testid=metamodel-selector-C4]');
      await page.waitForSelector('h6[data-testid=view-name]');
      const textContent = await page.evaluate(
        () => document.querySelector('h6[data-testid=view-name]').textContent
      );
      expect(textContent).toBe('Default View');
    },
    process.env.TIMEOUT
  );
  it(
    'Can open file and see view',
    async () => {
      const filePath = path.relative(
        process.cwd(),
        path.join(__dirname, '../resources/test.radical')
      );
      await page.goto(process.env.APP_URL);
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
    },
    process.env.TIMEOUT
  );
});
