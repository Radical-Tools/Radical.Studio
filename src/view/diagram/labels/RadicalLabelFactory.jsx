import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import RadicalLabelWidget from './RadicalLabelWidget';
import RadicalLabelModel from './RadicalLabelModel';

export default class RadicalLabelFactory extends AbstractReactFactory {
  constructor() {
    super('radical_default_label');
  }

  // eslint-disable-next-line class-methods-use-this
  generateReactWidget(event) {
    return (
      <RadicalLabelWidget
        visible={event.model.getOptions().visible}
        label={event.model.getOptions().label}
        label2={event.model.getOptions().label2}
      />
    );
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel() {
    return new RadicalLabelModel();
  }
}
