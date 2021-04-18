import { DefaultLinkModel } from '@projectstorm/react-diagrams';

export default class RadicalLinkModel extends DefaultLinkModel {
  constructor(props) {
    super({
      ...props,
      type: 'radical_default',
      width: 2,
      show: true,
      curvyness: 70,
    });
  }
}
