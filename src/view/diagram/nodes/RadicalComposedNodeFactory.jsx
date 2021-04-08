/* eslint-disable react/prop-types */
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import RadicalComposedNodeModel from './RadicalComposedNodeModel';
import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';

function Generic({ node }) {
  return (
    <rect
      fill="#85bbf0"
      fillOpacity="1.0"
      stroke="white"
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={node.size.width - 2}
      height={node.size.height - 2}
    />
  );
}

function C4Container({ node }) {
  if (node.size.width === 150) {
    return (
      <rect
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={node.isSelected() ? 'black' : 'white'}
        rx="5"
        ry="5"
        x="1"
        y="1"
        width={node.size.width - 2}
        height={node.size.height - 2}
      />
    );
  }

  return (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={node.isSelected() ? 'black' : 'gray'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={node.size.width - 2}
      height={node.size.height - 2}
    />
  );
}

function C4Component({ node }) {
  return (
    <rect
      fill="#85bbf0"
      fillOpacity="1.0"
      stroke={node.isSelected() ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={node.size.width - 2}
      height={node.size.height - 2}
    />
  );
}

function C4System({ node }) {
  if (node.size.width === 150) {
    return (
      <rect
        fill="#1168bd"
        fillOpacity="1.0"
        stroke={node.isSelected() ? 'black' : 'white'}
        rx="5"
        ry="5"
        x="1"
        y="1"
        width={node.size.width - 2}
        height={node.size.height - 2}
      />
    );
  }

  return (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={node.isSelected() ? 'black' : 'gray'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={node.size.width - 2}
      height={node.size.height - 2}
    />
  );
}

function C4ExternalSystem({ node }) {
  return (
    <rect
      fill="#999999"
      fillOpacity="1.0"
      stroke={node.isSelected() ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={node.size.width - 2}
      height={node.size.height - 2}
    />
  );
}

function C4Actor({ node }) {
  return (
    <g>
      <rect
        fill="#2072C3"
        fillOpacity="1.0"
        stroke={node.isSelected() ? 'black' : 'white'}
        rx="20"
        ry="20"
        x="1"
        y="25"
        width={node.size.width - 2}
        height={node.size.height - 28}
      />
      <circle
        fill="#2072C3"
        stroke={node.isSelected() ? 'black' : 'white'}
        fillOpacity="1.0"
        cx="75"
        cy="20"
        r="20"
      />
    </g>
  );
}

function C4Database({ node }) {
  return (
    <g>
      <rect
        fill="#438dd5"
        fillOpacity="1.0"
        // stroke= {node.isSelected() ? 'white' : ''}
        rx="0"
        ry="0"
        x="0"
        y="20"
        width={node.size.width}
        height={node.size.height - 42}
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        cx="75"
        cy="90"
        rx="75"
        ry="20"
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={node.isSelected() ? 'black' : 'white'}
        cx="75"
        cy="20"
        rx="75"
        ry="20"
      />
    </g>
  );
}

const objects = {
  Actor: C4Actor,
  Container: C4Container,
  System: C4System,
  Component: C4Component,
  'External System': C4ExternalSystem,
  Database: C4Database,
};

function Icon({ node }) {
  if (
    Object.prototype.hasOwnProperty.call(objects, node.options.radical_type)
  ) {
    return objects[node.options.radical_type]({ node });
  }
  return Generic({ node });
}

export default class RadicalComposedNodeFactory extends AbstractReactFactory {
  constructor() {
    super('radical-composed-node');
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel() {
    return new RadicalComposedNodeModel();
  }

  generateReactWidget(event) {
    return (
      <RadicalComposedNodeWidget
        engine={this.engine}
        node={event.model}
        linkingMode={this.engine.getModel().linkingMode}
      >
        <Icon node={event.model} />
      </RadicalComposedNodeWidget>
    );
  }
}
