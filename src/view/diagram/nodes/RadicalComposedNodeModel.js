import { NodeModel } from '@projectstorm/react-diagrams';
import RadicalPortModel from '../ports/RadicalPortModel';

export default class RadicalComposedNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: 'radical-composed-node',
    });
    this.color = options.color || { options: 'red' };

    this.addPort(new RadicalPortModel('top'));
    this.addPort(new RadicalPortModel('left'));
    this.addPort(new RadicalPortModel('bottom'));
    this.addPort(new RadicalPortModel('right'));
    this.nodes = new Map();
    this.size = {
      width: 150,
      height: 110,
    };

    this.visible = true;

    this.width = 150;
    this.height = 110;
    this.parentNode = undefined;

    this.minDimensionSize = { width: 150, height: 110 };
  }
}
