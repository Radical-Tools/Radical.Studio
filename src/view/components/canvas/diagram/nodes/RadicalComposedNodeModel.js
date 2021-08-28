import { NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { Polygon, Rectangle } from '@projectstorm/geometry';
import values from 'lodash/fp/values';
import reduce from 'lodash/fp/reduce';
import RadicalPortModel from '../ports/RadicalPortModel';
import {
  DIAGRAM_ENTITY_REMOVED,
  PORTS_PER_NODE_SIDE,
  REVERSED_ALIGNMENTS,
} from '../consts';

export default class RadicalComposedNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: 'radical-composed-node',
    });
    this.color = options.color || { options: 'red' };
    values(PortModelAlignment).forEach((value) => {
      for (let index = 1; index <= PORTS_PER_NODE_SIDE; index++) {
        this.addPort(
          new RadicalPortModel(
            `${value}${
              REVERSED_ALIGNMENTS.includes(value)
                ? PORTS_PER_NODE_SIDE - index + 1
                : index
            }`,
            value,
            index
          )
        );
      }
    });
    this.nodes = new Map();
    this.visible = true;
    this.parentNode = undefined;

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
      { top: 50, bottom: 50, left: 50, right: 50 }
    );
    if (boundedRect.getWidth() > 0) {
      this.setSize(
        boundedRect.points[1].x - boundedRect.points[0].x,
        boundedRect.points[2].y - boundedRect.points[0].y
      );

      // +1 issue with the update width/height only
      this.setPositionAsParent(
        boundedRect.points[0].x + 1,
        boundedRect.points[0].y
      );
    } else {
      this.setSize(150, 75);
    }
    this.updateLinks();
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
    this.updateLinks();
  }

  updateLinks() {
    this.getLinks().forEach((link) => {
      link.update();
    });
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
    return new Rectangle(
      this.getPosition().x,
      this.getPosition().y,
      this.width,
      this.height
    );
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  // fix: issue with the node size changes while moving & zooming
  // eslint-disable-next-line class-methods-use-this
  updateDimensions() {}

  setPositionAsParent(x, y) {
    if (this.parentNode) {
      this.parentNode.fitDimensions();
    }

    return super.setPosition(x, y);
  }

  setName(name) {
    this.options.name = name;
  }

  getLinks() {
    return reduce(
      (links, port) => [...links, ...values(port.getLinks())],
      [],
      values(this.getPorts())
    );
  }

  getCenter() {
    return {
      x: this.getPosition().x + this.width / 2,
      y: this.getPosition().y + this.height / 2,
    };
  }
}
