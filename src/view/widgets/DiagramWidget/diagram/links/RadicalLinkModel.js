import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { calculateAngle, getPortsBasedOnAngle } from '../helpers';

export default class RadicalLinkModel extends DefaultLinkModel {
  constructor(props) {
    super({
      ...props,
      type: 'radical_default',
      width: 2,
      curvyness: 0,
    });
  }

  update() {
    if (this.getTargetPort() && this.getSourcePort()) {
      const parentNodeId = this.getSourcePort().getParent().getID();
      let areLinksTwoWay = false;
      this.getTargetPort()
        .getParent()
        .getLinks()
        .forEach((element) => {
          areLinksTwoWay =
            areLinksTwoWay ||
            element.getTargetPort().getParent().getID() === parentNodeId;
        });

      const angle = calculateAngle(
        this.getSourceNodePosition(),
        this.getTargetNodePosition()
      );
      const ports = getPortsBasedOnAngle(angle, areLinksTwoWay);
      this.handlePortsUpdate(ports);
    }
  }

  getSourceNodePosition() {
    return this.getSourcePort().getParent().getCenter();
  }

  getTargetNodePosition() {
    return this.getTargetPort().getParent().getCenter();
  }

  handlePortsUpdate(ports) {
    const currentSource = this.getSourcePort();
    const nextSource = this.getSourcePort().getParent().getPort(ports.source);
    const currentTarget = this.getTargetPort();
    const nextTarget = this.getTargetPort().getParent().getPort(ports.target);
    if (currentSource !== nextSource) {
      this.setSourcePort(nextSource);
      this.getFirstPoint().setPosition(this.getSourcePort().getCenter());
    }
    if (currentTarget !== nextTarget) {
      this.setTargetPort(nextTarget);
      this.getLastPoint().setPosition(this.getTargetPort().getCenter());
    }
  }

  setName(name) {
    this.options.name = name;
  }

  getDescription() {
    return this.options.attributes?.description;
  }
}
