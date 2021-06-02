import { Action, InputType } from '@projectstorm/react-canvas-core';
import { DIAGRAM_ENTITY_DELETED } from '../consts';

class RadicalDeleteItemsAction extends Action {
  constructor(options = {}) {
    const { keyCodes } = options;

    super({
      type: InputType.KEY_DOWN,
      fire: (event) => {
        const { keyCode, ctrlKey } = event.event;
        if (keyCodes.indexOf(keyCode) !== -1) {
          this.engine
            .getModel()
            .getSelectedEntities()
            .forEach((model) => {
              if (!model.isLocked()) {
                model.fireEvent(
                  {
                    entity: model,
                    deleteFromModel: ctrlKey,
                  },
                  DIAGRAM_ENTITY_DELETED
                );
              }
            });
          this.engine.repaintCanvas();
        }
      },
    });
  }
}

export default RadicalDeleteItemsAction;
