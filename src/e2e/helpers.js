/* eslint-disable no-underscore-dangle */
export default async function dragAndDrop(
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
