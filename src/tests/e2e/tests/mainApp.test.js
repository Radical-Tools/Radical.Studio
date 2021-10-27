/* eslint-disable no-console */
import puppeteer from 'puppeteer';
import path from 'path';
import dragAndDrop, { getDataTestIdSelector } from '../helpers';
import {
  getCanvas,
  getCanvasLink,
  getCanvasNode,
  getCanvasNodeDeleteButton,
  getCanvasNodePossibleRelation,
  getCanvasNodeRemoveButton,
  getCanvasViewName,
  getFileUploader,
  getFormSubmitButton,
  getMetamodelItem,
  getModelGridToolbarItem,
  getObjectGridName,
  getRelationGridItem,
  getWizardItemButton,
} from '../../getDataTestId';

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

async function CreateNewProject() {
  await page.goto(process.env.APP_URL);
  await page.waitForTimeout(1000);
  await page.waitForSelector(
    getDataTestIdSelector(getWizardItemButton('CreateProject'))
  );
  await page.click(getDataTestIdSelector(getWizardItemButton('CreateProject')));
  await page.waitForSelector('#common-form-CreateNew_name');
  await page.type('#common-form-CreateNew_name', 'Test project');
  await page.waitForSelector(
    getDataTestIdSelector(getFormSubmitButton('CreateNew'))
  );
  await page.click(getDataTestIdSelector(getFormSubmitButton('CreateNew')));
  await page.waitForSelector(getDataTestIdSelector(getCanvasViewName()));
  await page.waitForTimeout(1000);
}

describe('Basic flow', () => {
  it(
    'Can open C4 model and see default view',
    async () => {
      await CreateNewProject();
      const header = await page.$(getDataTestIdSelector(getCanvasViewName()));
      expect(await header.evaluate((node) => node.textContent)).toBe(
        'Test project :: Initial :: Default View'
      );
    },
    process.env.TIMEOUT
  );

  it(
    'Create a simple C4 model',
    async () => {
      await CreateNewProject();

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
    'Create a nested object by drag & drop',
    async () => {
      await CreateNewProject();

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('System')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );

      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New System'))
      );

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Container')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );

      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New Container'))
      );

      const containerNode = await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New Container'))
      );
      expect(await containerNode.evaluate((node) => node.textContent)).toBe(
        'New Container'
      );

      await page.click(
        getDataTestIdSelector(getModelGridToolbarItem('Relations'))
      );

      const gridItem = await page.waitForSelector(
        getDataTestIdSelector(getRelationGridItem('Includes'))
      );

      expect(await gridItem.evaluate((node) => node.textContent)).toBe(
        'Includes'
      );
    },

    process.env.TIMEOUT
  );

  it(
    'Can change the object name by editing grid item',
    async () => {
      await CreateNewProject();
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
      await CreateNewProject();

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
    'Hide a DiagramWidget node',
    async () => {
      await CreateNewProject();

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Actor')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New Actor'))
      );

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('System')),
        getDataTestIdSelector(getCanvas()),
        { x: 700, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New System'))
      );

      await page.click(getDataTestIdSelector(getCanvasNode('New Actor')));
      await page.waitForSelector(
        getDataTestIdSelector(
          getCanvasNodePossibleRelation('New System', 'Interacts')
        )
      );
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

      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New System'))
      );
      await page.click(getDataTestIdSelector(getCanvasNode('New System')));

      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNodeRemoveButton('New System'))
      );
      await page.click(
        getDataTestIdSelector(getCanvasNodeRemoveButton('New System'))
      );

      await page.waitForTimeout(1000);

      await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New System'))
      );

      const linkItem = await page.$(
        getDataTestIdSelector(
          getCanvasLink('Interacts', 'New Actor', 'New System')
        )
      );

      if (linkItem) {
        throw new Error('Link is visible on the DiagramWidget');
      }
    },
    process.env.TIMEOUT
  );

  it(
    'Remove a model node from the DiagramWidget node toolbar',
    async () => {
      await CreateNewProject();

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Actor')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New Actor'))
      );

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('System')),
        getDataTestIdSelector(getCanvas()),
        { x: 700, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New System'))
      );

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

      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New System'))
      );

      await page.click(getDataTestIdSelector(getCanvasNode('New System')));

      await page.click(
        getDataTestIdSelector(getCanvasNodeDeleteButton('New System'))
      );

      await page.waitForTimeout(1000);

      const canvasNode = await page.$(
        getDataTestIdSelector(getObjectGridName('New System'))
      );

      if (canvasNode) {
        throw new Error('New System Node still visible');
      }

      const gridNode = await page.$(
        getDataTestIdSelector(getObjectGridName('New System'))
      );

      if (gridNode) {
        throw new Error('New System Grid Item still visible');
      }
    },
    process.env.TIMEOUT
  );

  it(
    'Remove a view node and should update the target to parent node',
    async () => {
      await CreateNewProject();

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Actor')),
        getDataTestIdSelector(getCanvas()),
        { x: 500, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New Actor'))
      );

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('System')),
        getDataTestIdSelector(getCanvas()),
        { x: 700, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New System'))
      );

      await dragAndDrop(
        page,
        getDataTestIdSelector(getMetamodelItem('Container')),
        getDataTestIdSelector(getCanvas()),
        { x: 700, y: 500 }
      );
      await page.waitForSelector(
        getDataTestIdSelector(getCanvasNode('New Container'))
      );

      await page.click(getDataTestIdSelector(getCanvasNode('New Actor')));
      await page.click(
        getDataTestIdSelector(
          getCanvasNodePossibleRelation('New Container', 'Interacts')
        )
      );

      await page.waitForSelector(
        getDataTestIdSelector(
          getCanvasLink('Interacts', 'New Actor', 'New Container')
        )
      );

      await page.click(getDataTestIdSelector(getCanvasNode('New Container')));

      await page.click(
        getDataTestIdSelector(getCanvasNodeRemoveButton('New Container'))
      );

      await page.waitForTimeout(1000);

      await page.waitForSelector(
        getDataTestIdSelector(getObjectGridName('New Container'))
      );

      const canvasNode = await page.$(
        getDataTestIdSelector(getCanvasNode('New Container'))
      );

      if (canvasNode) {
        throw new Error('New Container Node still visible');
      }

      await page.waitForSelector(
        getDataTestIdSelector(
          getCanvasLink('Interacts', 'New Actor', 'New System')
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
        'Radical Tools :: 3.0 :: Default View'
      );
    },
    process.env.TIMEOUT
  );
});
