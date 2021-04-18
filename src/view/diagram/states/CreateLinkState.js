import { Action, InputType, State } from '@projectstorm/react-canvas-core';
import { PortModel } from '@projectstorm/react-diagrams';
import { LINK_CONNECTED_TO_TARGET_EVENT } from '../consts';

/**
 * This state is controlling the creation of a link.
 */
export default class CreateLinkState extends State {
  constructor() {
    super({ name: 'create-new-link' });

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (actionEvent) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(actionEvent);
          const {
            event: { clientX, clientY },
          } = actionEvent;

          const point = this.engine.getRelativeMousePoint({ clientX, clientY });

          if (element instanceof PortModel && !this.sourcePort) {
            this.sourcePort = element;

            const link = this.sourcePort.createLinkModel();
            link.setSourcePort(this.sourcePort);
            link.getFirstPoint().setPosition(point.x, point.y);
            link.getLastPoint().setPosition(point.x, point.y);

            this.link = this.engine.getModel().addLink(link);
          } else if (
            element instanceof PortModel &&
            this.sourcePort &&
            element !== this.sourcePort
          ) {
            if (this.sourcePort.canLinkToPort(element)) {
              element.reportPosition();
              this.engine.getModel().fireEvent(
                {
                  id: this.link.options.id,
                  sourceId: this.link.sourcePort.parent.options.id,
                  targetId: element.parent.options.id,
                },
                LINK_CONNECTED_TO_TARGET_EVENT
              );

              this.clearState();
              this.eject();
            }
          } else if (element === this.link.getLastPoint()) {
            this.link.point(point.x, point.y, -1);
          }

          this.engine.repaintCanvas();
        },
      })
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_MOVE,
        fire: (actionEvent) => {
          if (!this.link) return;
          const { event } = actionEvent;
          const point = this.engine.getRelativeMousePoint(event);
          this.link.getLastPoint().setPosition(point.x, point.y);
          this.engine.repaintCanvas();
        },
      })
    );

    this.registerAction(
      new Action({
        type: InputType.KEY_UP,
        fire: (actionEvent) => {
          // on esc press remove any started link and pop back to default state
          if (actionEvent.event.keyCode === 27) {
            this.link.remove();
            this.clearState();
            this.eject();
            this.engine.repaintCanvas();
          }
        },
      })
    );
  }

  clearState() {
    this.link = undefined;
    this.sourcePort = undefined;
  }
}
