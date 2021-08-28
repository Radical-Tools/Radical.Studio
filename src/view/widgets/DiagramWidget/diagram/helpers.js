import { PortModelAlignment } from '@projectstorm/react-diagrams';
import {
  DEFAULT_SOURCE_PORT,
  DEFAULT_TARGET_PORT,
  PORTS_PER_NODE_SIDE,
  PORT_BORDER_RADIUS,
  TWO_WAY_LINK_OFFSET,
} from './consts';

const alignmentOrder = [
  PortModelAlignment.RIGHT,
  PortModelAlignment.BOTTOM,
  PortModelAlignment.LEFT,
  PortModelAlignment.TOP,
];

const getPortsForAngle = (
  angle,
  numberOfPorts,
  sourceAlignment,
  targetAlignment,
  areLinksTwoWay = false
) => {
  const offset = areLinksTwoWay ? TWO_WAY_LINK_OFFSET : 0;
  const anglePerPort = 90 / numberOfPorts;
  let calculatedSourceAlignment = sourceAlignment;
  let calculatedTargetAlignment = targetAlignment;
  const portNumber = Math.floor(angle / anglePerPort) + 1;
  let sourcePortNumber = portNumber + offset;
  let targetPortNumber = portNumber - offset;
  if (sourcePortNumber > PORTS_PER_NODE_SIDE) {
    sourcePortNumber -= PORTS_PER_NODE_SIDE;
    const index = alignmentOrder.indexOf(calculatedSourceAlignment);
    calculatedSourceAlignment =
      alignmentOrder[index + 1 > 3 ? index - 3 : index + 1];
  }
  if (targetPortNumber < 1) {
    targetPortNumber += PORTS_PER_NODE_SIDE;
    const index = alignmentOrder.indexOf(calculatedTargetAlignment);
    calculatedTargetAlignment =
      alignmentOrder[index - 1 < 0 ? index + 3 : index - 1];
  }
  return {
    source: `${calculatedSourceAlignment}${sourcePortNumber}`,
    target: `${targetAlignment}${targetPortNumber}`,
  };
};

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

export const calculateAngle = (sourcePoint, targetPoint) => {
  let angle =
    90 +
    (Math.atan2(targetPoint.y - sourcePoint.y, targetPoint.x - sourcePoint.x) *
      180) /
      Math.PI;

  angle = angle < 0 ? angle + 360 : angle;
  return angle;
};

export const getPortsBasedOnAngle = (
  angle,
  areLinksTwoWay = false,
  portsPerNodeSide = PORTS_PER_NODE_SIDE
) => {
  let ports = {
    source: DEFAULT_SOURCE_PORT,
    target: DEFAULT_TARGET_PORT,
  };

  if (angle >= 45 && angle < 135) {
    ports = getPortsForAngle(
      angle - 45,
      portsPerNodeSide,
      PortModelAlignment.RIGHT,
      PortModelAlignment.LEFT,
      areLinksTwoWay
    );
  } else if (angle >= 135 && angle < 225) {
    ports = getPortsForAngle(
      angle - 135,
      portsPerNodeSide,
      PortModelAlignment.BOTTOM,
      PortModelAlignment.TOP,
      areLinksTwoWay
    );
  } else if (angle >= 225 && angle < 315) {
    ports = getPortsForAngle(
      angle - 225,
      portsPerNodeSide,
      PortModelAlignment.LEFT,
      PortModelAlignment.RIGHT,
      areLinksTwoWay
    );
  } else {
    ports = getPortsForAngle(
      angle >= 315 ? angle - 315 : 45 + angle,
      portsPerNodeSide,
      PortModelAlignment.TOP,
      PortModelAlignment.BOTTOM,
      areLinksTwoWay
    );
  }

  return ports;
};
