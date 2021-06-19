import { LabelModel } from '@projectstorm/react-diagrams';

export default class RadicalLabelModel extends LabelModel {
  constructor(options = {}) {
    super({
      offsetY: options.offsetY == null ? +26 : options.offsetY,
      type: 'radical_default_label',
      ...options,
    });
  }

  setLabel(label) {
    this.options.label = label;
  }

  deserialize(event) {
    super.deserialize(event);
    this.options.label = event.data.label;
    this.options.label2 = event.data.label2;
    this.options.visible = event.data.visible;
  }

  serialize() {
    return {
      ...super.serialize(),
      label: this.options.label,
      label2: this.options.label2,
      visible: this.options.visible,
    };
  }
}
