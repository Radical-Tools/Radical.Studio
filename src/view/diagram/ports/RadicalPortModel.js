import { DefaultPortModel } from '@projectstorm/react-diagrams';
import RadicalLinkModel from '../links/RadicalLinkModel';

export default class RadicalPortModel extends DefaultPortModel {
  order = 1;

  constructor(name, alignment, order) {
    super({
      type: 'diamond',
      name,
      alignment,
    });
    this.order = order;
  }

  // eslint-disable-next-line class-methods-use-this
  createLinkModel() {
    return new RadicalLinkModel();
  }

  // eslint-disable-next-line class-methods-use-this
  canLinkToPort() {
    return true;
  }
}
