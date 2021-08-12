/* eslint-disable no-console */
import puppeteer from 'puppeteer';
import path from 'path';
import dragAndDrop, {
  getDataTestIdAttribute,
  getDataTestIdSelector,
} from '../helpers';
import {
  getCanvas,
  getCanvasLink,
  getCanvasNode,
  getCanvasNodePossibleRelation,
  getCanvasViewName,
  getFileUploader,
  getFormSubmitButton,
  getMetamodelItem,
  getObjectGridName,
} from '../../view/getDataTestId';

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
      await page.waitForSelector('#common-form-project_name');
      await page.type('#common-form-project_name', 'Test project');
      await page.waitForSelector(
        getDataTestIdSelector(getFormSubmitButton('project'))
      );
      await page.waitForTimeout(100);
      await page.click(getDataTestIdSelector(getFormSubmitButton('project')));
      await page.waitForSelector(getDataTestIdSelector(getCanvasViewName()));
      const header = await page.$(getDataTestIdSelector(getCanvasViewName()));
      expect(await header.evaluate((node) => node.textContent)).toBe(
        'Default View'
      );
      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Actor')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New Actor'))
      );
      await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New Actor'))
      );

      const actor = await page.$(
        getDataTestIdSelector(getCanvasNode('New Actor'))
      );
      expect(actor).toBeTruthy();

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('System')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 900 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New System'))
      );
      await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New System'))
      );

      const system = await page.$(
        getDataTestIdSelector(getCanvasNode('New System'))
      );
      expect(system).toBeTruthy();

      await page.click(getDataTestIdSelector(getCanvasNode('New Actor')));
      await page.click(
        getDataTestIdSelector(
          getCanvasNodePossibleRelation('New System', 'Interacts')
        )
      );

      await page.waitForSelector(
        getDataTestIdSelector(
          getCanvasLink('Interacts', 'New Actor', 'New System')
        )
      );

      let gridItem = await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New Actor'))
      );
      expect(await gridItem.evaluate((node) => node.textContent)).toBe(
        ' New Actor'
      );
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
        getDataTestIdSelector(getFileUploader())
      );
      const elementHandle = await loader.$('input[type=file]');
      await elementHandle.uploadFile(filePath);
      await page.waitForSelector(getDataTestIdSelector(getCanvasViewName()));
      const header = await page.$(getDataTestIdSelector(getCanvasViewName()));
      expect(await header.evaluate((node) => node.textContent)).toBe(
        'Test view'
      );
    },
    process.env.TIMEOUT
  );
});
