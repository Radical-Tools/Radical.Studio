/* eslint-disable no-console */
import puppeteer from 'puppeteer';
import path from 'path';
import dragAndDrop, { getDataTestIdSelector } from '../helpers';
import {
  getCanvas,
  getCanvasLink,
  getCanvasNode,
  getCanvasNodePossibleRelation,
  getCanvasViewName,
  getFileUploader,
  getFormSubmitButton,
  getMetamodelItem,
  getModelGridToolbarItem,
  getObjectGridName,
  getRelationGridItem,
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
    },
    process.env.TIMEOUT
  );

  it(
    'Create a simple C4 model',
    async () => {
      await page.goto(process.env.APP_URL);
      await page.waitForSelector('#common-form-project_name');
      await page.type('#common-form-project_name', 'Test project');
      await page.waitForTimeout(100);
      await page.click(getDataTestIdSelector(getFormSubmitButton('project')));

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

      const gridItem = await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New Actor'))
      );
      expect(await gridItem.evaluate((node) => node.textContent)).toBe(
        'New Actor'
      );
    },
    process.env.TIMEOUT
  );

  it(
    'Can change the object name by editing grid item',
    async () => {
      await page.goto(process.env.APP_URL);
      await page.waitForSelector('#common-form-project_name');
      await page.type('#common-form-project_name', 'Test project');
      await page.waitForTimeout(100);
      await page.click(getDataTestIdSelector(getFormSubmitButton('project')));

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Actor')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );

      const gridItem = await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New Actor'))
      );
      expect(await gridItem.evaluate((node) => node.textContent)).toBe(
        'New Actor'
      );

      await page.click(getDataTestIdSelector(getObjectGridName('New Actor')));
      await page.waitForTimeout(10);
      await page.click(getDataTestIdSelector(getObjectGridName('New Actor')), {
        clickCount: 2,
      });
      await page.keyboard.press('2');
      await page.keyboard.press('Enter');

      expect(await gridItem.evaluate((node) => node.textContent)).toBe(
        'New Actor2'
      );

      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New Actor2'))
      );
    },
    process.env.TIMEOUT
  );

  it(
    'Can change the relation name by editing grid item',
    async () => {
      await page.goto(process.env.APP_URL);
      await page.waitForSelector('#common-form-project_name');
      await page.type('#common-form-project_name', 'Test project');
      await page.waitForTimeout(100);
      await page.click(getDataTestIdSelector(getFormSubmitButton('project')));

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Actor')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );

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

      await page.click(getDataTestIdSelector(getCanvasNode('New Actor')));
      await page.click(
        getDataTestIdSelector(
          getCanvasNodePossibleRelation('New System', 'Interacts')
        )
      );

      await page.click(
        getDataTestIdSelector(getModelGridToolbarItem('Relations'))
      );
      await page.waitForTimeout(100);

      const gridItem = await page.waitForSelector(
        getDataTestIdSelector(getRelationGridItem('Interacts'))
      );

      expect(await gridItem.evaluate((node) => node.textContent)).toBe(
        'Interacts'
      );

      await page.click(getDataTestIdSelector(getRelationGridItem('Interacts')));
      await page.waitForTimeout(10);
      await page.click(
        getDataTestIdSelector(getRelationGridItem('Interacts')),
        {
          clickCount: 2,
        }
      );
      await page.keyboard.press('2');
      await page.keyboard.press('Enter');

      expect(await gridItem.evaluate((node) => node.textContent)).toBe(
        'Interacts2'
      );

      await page.waitForSelector(
        getDataTestIdSelector(
          getCanvasLink('Interacts2', 'New Actor', 'New System')
        )
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
