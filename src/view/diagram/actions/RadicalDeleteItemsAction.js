import { Action, InputType } from '@projectstorm/react-canvas-core';

class RadicalDeleteItemsAction extends Action {
  constructor(options = {}) {
    const { keyCodes, onItemDelete } = options;

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
                onItemDelete(model, ctrlKey);
              }
            });
          this.engine.repaintCanvas();
        }
      },
    });
  }
}

export default RadicalDeleteItemsAction;
