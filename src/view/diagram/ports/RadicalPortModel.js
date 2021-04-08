import {
  DefaultPortModel,
  DefaultLinkModel,
} from '@projectstorm/react-diagrams';

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
    return new DefaultLinkModel();
  }
}
