import { DefaultPortModel } from '@projectstorm/react-diagrams';
import RadicalLinkModel from '../links/RadicalLinkModel';

export default class RadicalPortModel extends DefaultPortModel {
  constructor(alignment) {
    super({
      type: 'diamond',
      name: alignment,
      alignment,
    });
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
