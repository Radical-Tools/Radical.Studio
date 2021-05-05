import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { calculateAngle, getPortsBasedOnAngle } from '../helpers';

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
        const angle = calculateAngle(
          this.getSourceNodePosition(),
          this.getTargetNodePosition()
        );
        const ports = getPortsBasedOnAngle(angle);
        this.handlePortsUpdate(ports);
      }
    }
  }

  getSourceNodePosition() {
    return this.getSourcePort().getParent().getCenter();
  }

  getTargetNodePosition() {
    return this.getTargetPort().getParent().getCenter();
  }

  handlePortsUpdate(ports) {
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
