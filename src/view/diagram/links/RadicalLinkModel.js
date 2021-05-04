import { DefaultLinkModel } from '@projectstorm/react-diagrams';

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

        const ports = { source: 'left1', target: 'right1' };

        if (angle >= 45 && angle < 135) {
          ports.source = 'right1';
          ports.target = 'left1';
        } else if (angle >= 135 && angle < 225) {
          ports.source = 'bottom1';
          ports.target = 'top1';
        } else if (angle >= 225 && angle < 315) {
          ports.source = 'left1';
          ports.target = 'right1';
        } else {
          ports.source = 'top1';
          ports.target = 'bottom1';
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
