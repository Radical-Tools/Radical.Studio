import * as React from 'react';
import {
  AbstractReactFactory,
  LinkLayerModel,
} from '@projectstorm/react-canvas-core';
import RadicalLinkLayerWidget from './RadicalLinkLayerWidget';

export default class RadicalLinkLayerFactory extends AbstractReactFactory {
  constructor() {
    super('diagram-links');
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel() {
    return new LinkLayerModel();
  }

  generateReactWidget(event) {
    return <RadicalLinkLayerWidget layer={event.model} engine={this.engine} />;
  }
}
