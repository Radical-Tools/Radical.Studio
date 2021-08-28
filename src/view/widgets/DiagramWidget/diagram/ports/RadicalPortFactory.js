import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import RadicalPortModel from './RadicalPortModel';

export default class RadicalPortFactory extends AbstractModelFactory {
  constructor() {
    super('diamond');
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel() {
    return new RadicalPortModel();
  }
}
