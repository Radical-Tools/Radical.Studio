/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

async function dragAndDrop(
  pageObject,
  originSelector,
  destinationSelector,
  dropCoordinates
) {
  const origin = await pageObject.waitForSelector(originSelector);
  await pageObject.waitForSelector(destinationSelector);
  const originBox = await origin.boundingBox();
  const lastPositionCoordenate = (box) => ({
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  });
  const getPayload = (box) => ({
    bubbles: true,
    cancelable: true,
    screenX: lastPositionCoordenate(box).x,
    screenY: lastPositionCoordenate(box).y,
    clientX: lastPositionCoordenate(box).x,
    clientY: lastPositionCoordenate(box).y,
  });

  const getPayloadByCoordinates = (coordinates) => ({
    bubbles: true,
    cancelable: true,
    screenX: coordinates.x,
    screenY: coordinates.y,
    clientX: coordinates.x,
    clientY: coordinates.y,
  });

  const pageFunction = async (
    _originSelector,
    _destinationSelector,
    originPayload,
    destinationPayload
  ) => {
    const _origin = document.querySelector(_originSelector);
    let _destination = document.querySelector(_destinationSelector);

    _destination = _destination.lastElementChild || _destination;

    _origin.dispatchEvent(new MouseEvent('pointerdown', originPayload));
    _origin.dispatchEvent(new DragEvent('dragstart', originPayload));

    await new Promise((resolve) => setTimeout(resolve, 2000));
    _destination.dispatchEvent(new MouseEvent('dragenter', destinationPayload));
    _destination.dispatchEvent(new MouseEvent('pointerup', destinationPayload));
    _destination.dispatchEvent(new MouseEvent('drop', destinationPayload));
    _origin.dispatchEvent(new DragEvent('dragend', destinationPayload));
  };

  await pageObject.evaluate(
    pageFunction,
    originSelector,
    destinationSelector,
    getPayload(originBox),
    getPayloadByCoordinates(dropCoordinates)
  );
}

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
