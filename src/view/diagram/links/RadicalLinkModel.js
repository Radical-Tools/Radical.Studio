import {
  DefaultLinkModel,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { PORTS_PER_NODE_SIDE } from '../consts';

const getPortsForAngle = (
  angle,
  numberOfPorts,
  sourceAlignment,
  targetAlignment
) => {
  const anglePerPort = 90 / numberOfPorts;
  const portNumber = Math.floor(angle / anglePerPort) + 1;
  return {
    source: `${sourceAlignment}${portNumber}`,
    target: `${targetAlignment}${portNumber}`,
  };
};
export default class RadicalLinkModel extends DefaultLinkModel {
  constructor(props) {
    super({
      ...props,
      type: 'radical_default',
      width: 2,
      show: true,
      curvyness: 70,
    });
  }

  update() {
    if (this.options.show) {
      if (this.getTargetPort() && this.getSourcePort()) {
        const targetPosition = {
          x:
            this.getTargetPort().getParent().getPosition().x +
            this.getTargetPort().getParent().width / 2,
          y:
            this.getTargetPort().getParent().getPosition().y +
            this.getTargetPort().getParent().height / 2,
        };
        const sourcePosition = {
          x:
            this.getSourcePort().getParent().getPosition().x +
            this.getSourcePort().getParent().width / 2,
          y:
            this.getSourcePort().getParent().getPosition().y +
            this.getSourcePort().getParent().height / 2,
        };
        let angle =
          90 +
          (Math.atan2(
            targetPosition.y - sourcePosition.y,
            targetPosition.x - sourcePosition.x
          ) *
            180) /
            Math.PI;

        angle = angle < 0 ? angle + 360 : angle;

        let ports = { source: 'left1', target: 'right1' };

        if (angle >= 45 && angle < 135) {
          ports = getPortsForAngle(
            angle - 45,
            PORTS_PER_NODE_SIDE,
            PortModelAlignment.RIGHT,
            PortModelAlignment.LEFT
          );
        } else if (angle >= 135 && angle < 225) {
          ports = getPortsForAngle(
            angle - 135,
            PORTS_PER_NODE_SIDE,
            PortModelAlignment.BOTTOM,
            PortModelAlignment.TOP
          );
        } else if (angle >= 225 && angle < 315) {
          ports = getPortsForAngle(
            angle - 225,
            PORTS_PER_NODE_SIDE,
            PortModelAlignment.LEFT,
            PortModelAlignment.RIGHT
          );
        } else {
          ports = getPortsForAngle(
            angle > 315 ? angle - 315 : 45 + angle,
            PORTS_PER_NODE_SIDE,
            PortModelAlignment.TOP,
            PortModelAlignment.BOTTOM
          );
        }

        if (
          this.getTargetPort() !==
          this.getTargetPort().getParent().getPort(ports.target)
        ) {
          this.setTargetPort(
            this.getTargetPort().getParent().getPort(ports.target)
          );
          this.getLastPoint().setPosition(this.getTargetPort().getCenter());
        }

        if (
          this.getSourcePort() !==
          this.getSourcePort().getParent().getPort(ports.source)
        ) {
          this.setSourcePort(
            this.getSourcePort().getParent().getPort(ports.source)
          );
          this.getFirstPoint().setPosition(this.getSourcePort().getCenter());
        }
      }
    }
  }
}
