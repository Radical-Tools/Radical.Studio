import { PortModelAlignment } from '@projectstorm/react-diagrams';
import { PORTS_PER_NODE_SIDE, PORT_BORDER_RADIUS } from './consts';

export const getPositionOnSide = (sideLength, order) =>
  (sideLength / (PORTS_PER_NODE_SIDE + 1)) * order - PORT_BORDER_RADIUS;
export const getPortStyle = (width, height, alignment, order) => {
  const style = { position: 'absolute' };
  switch (alignment) {
    case PortModelAlignment.TOP:
      style.top = -PORT_BORDER_RADIUS;
      style.left = getPositionOnSide(width, order);
      break;
    case PortModelAlignment.BOTTOM:
      style.top = height - PORT_BORDER_RADIUS;
      style.left = getPositionOnSide(width, order);
      break;
    case PortModelAlignment.LEFT:
      style.top = getPositionOnSide(height, order);
      style.left = -PORT_BORDER_RADIUS;
      break;
    case PortModelAlignment.RIGHT:
      style.top = getPositionOnSide(height, order);
      style.left = width - PORT_BORDER_RADIUS;
      break;
    default:
      break;
  }
  return style;
};
