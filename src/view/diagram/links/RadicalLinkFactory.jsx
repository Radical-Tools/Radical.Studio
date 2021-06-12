import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import * as React from 'react';
import RadicalLinkModel from './RadicalLinkModel';
import RadicalLinkWidget from './RadicalLinkWidget';

export default class RadicalLinkFactory extends DefaultLinkFactory {
  constructor() {
    super('radical_default');
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel() {
    return new RadicalLinkModel();
  }

  generateReactWidget(event) {
    return (
      <RadicalLinkWidget
        link={event.model}
        diagramEngine={this.engine}
        factory={this}
      />
    );
  }
}
