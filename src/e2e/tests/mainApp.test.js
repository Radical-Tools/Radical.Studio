/* eslint-disable no-console */
import puppeteer from 'puppeteer';
import path from 'path';
import dragAndDrop from '../helpers';

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
      await page.waitForSelector('#common-form-project');
      await page.type('#common-form-project_name', 'Test project');
      await page.click('[data-testid=common-form-project-submit]');
      await page.waitForSelector('h6[data-testid=view-name]');
      const header = await page.$('h6[data-testid=view-name]');
      expect(await header.evaluate((node) => node.textContent)).toBe(
        'Default View'
      );
      await dragAndDrop(
        page,
        '[data-testid=metamodel-toolbar-item-Component]',
        '[data-testid=radical-canvas]',
        { x: 500, y: 500 }
      );
      await page.waitForSelector('[data-testid="node-widget-New Component"]');
      const component = await page.$(
        '[data-testid="node-widget-New Component"]'
      );
      expect(component).toBeTruthy();
      await page.waitForSelector('#common-form-edit-attributes');
      await page.click('#common-form-edit-attributes_name');
      await page.keyboard.down('Control');
      await page.keyboard.press('A');
      await page.keyboard.up('Control');
      await page.keyboard.press('Backspace');
      await page.type('#common-form-edit-attributes_name', 'Radical.Studio');
      await page.click('#common-form-edit-attributes_name');
      await page.click('[data-testid=common-form-edit-attributes-submit]');
      await page.waitForSelector('[data-testid="node-widget-Radical.Studio"]');
      const renamedComponent = await page.$(
        '[data-testid="node-widget-Radical.Studio"]'
      );
      expect(renamedComponent).toBeTruthy();
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
      const header = await page.$('h6[data-testid=view-name]');
      expect(await header.evaluate((node) => node.textContent)).toBe(
        'Test view'
      );
    },
    process.env.TIMEOUT
  );
});
