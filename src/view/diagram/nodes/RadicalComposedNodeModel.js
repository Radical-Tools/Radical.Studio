import { NodeModel } from '@projectstorm/react-diagrams';
import { Polygon, Rectangle } from '@projectstorm/geometry';
import RadicalPortModel from '../ports/RadicalPortModel';
import { DIAGRAM_ENTITY_REMOVED } from '../consts';

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
    this.isDragged = false;
  }

  addNode(node) {
    this.nodes.set(node.getID(), node);
  }

  removeNode(nodeID) {
    this.nodes.delete(nodeID);
  }

  getNodes() {
    return this.nodes;
  }

  getNode(nodeID) {
    return this.nodes[nodeID];
  }

  addParent(node) {
    this.parentNode = node;
  }

  collapseChildren() {
    this.nodes.forEach((node) => {
      node.remove();
    });
  }

  remove() {
    this.fireEvent({}, DIAGRAM_ENTITY_REMOVED);
  }

  lockScalingDown() {
    this.minDimensionSize = this.size;
  }

  unlockScalingDown() {
    this.minDimensionSize = { width: 0, height: 0 };
  }

  static getBoundingNodesRect(nodes, margin) {
    if (nodes && nodes.length > 0) {
      const boundingBox = Polygon.boundingBoxFromPolygons(
        nodes.map((node) => node.getBoundingBox())
      );
      if (margin) {
        return new Rectangle(
          boundingBox.getTopLeft().x - margin.left,
          boundingBox.getTopLeft().y - margin.top,
          boundingBox.getWidth() + margin.left + margin.right,
          boundingBox.getHeight() + margin.top + margin.bottom
        );
      }

      return boundingBox;
    }
    return new Rectangle(0, 0, 0, 0);
  }

  fitDimensions() {
    const boundedRect = RadicalComposedNodeModel.getBoundingNodesRect(
      Array.from(this.nodes.values()),
      { top: 70, bottom: 70, left: 20, right: 20 }
    );
    if (boundedRect.getWidth() > 0) {
      this.size.width = boundedRect.points[1].x - boundedRect.points[0].x;
      this.size.height = boundedRect.points[2].y - boundedRect.points[0].y;
      this.width = this.size.width;
      this.height = this.size.height;

      // +1 issue with the update width/height only
      this.setPositionAsParent(
        boundedRect.points[0].x + 1,
        boundedRect.points[0].y
      );

      this.lockScalingDown();
    } else {
      this.size.width = 150;
      this.size.height = 75;
      this.width = 150;
      this.height = 75;
      // this.setPositionAsParent(this.getBoundingBox().getLeftMiddle() - 75, this.getBoundingBox().getTopMiddle() - 35)
      this.lockScalingDown();
    }
    if (this.parentNode) {
      this.parentNode.fitDimensions();
    }
  }

  setPosition(x, y) {
    const offset = { x: x - this.getPosition().x, y: y - this.getPosition().y };

    if (this.nodes?.size > 0) {
      this.nodes.forEach((node) => {
        node.setPosition(
          node.getPosition().x + offset.x,
          node.getPosition().y + offset.y
        );
      });
    }

    if (this.parentNode) {
      this.parentNode.fitDimensions();
    }
    super.setPosition(x, y);
  }

  setIsDragged(dragged = false) {
    this.isDragged = dragged;
    if (this.nodes?.size > 0) {
      this.nodes.forEach((node) => {
        node.setIsDragged(dragged);
      });
    }
  }

  getBoundingBox() {
    return new Rectangle(this.getPosition(), this.size.width, this.size.height);
  }

  setSize(width, height) {
    this.size.width = width;
    this.size.height = height;
    this.width = width;
    this.height = height;
  }

  setPositionAsParent(x, y) {
    if (this.parentNode) {
      this.parentNode.fitDimensions();
    }

    return super.setPosition(x, y);
  }
}
