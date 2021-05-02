/* eslint-disable react/prop-types */
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import RadicalComposedNodeModel from './RadicalComposedNodeModel';
import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';

function Generic({ width, height }) {
  return (
    <rect
      fill="#85bbf0"
      fillOpacity="1.0"
      stroke="white"
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  );
}

function C4Container({ width, height, isSelected }) {
  if (width === 150) {
    return (
      <rect
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={isSelected ? 'black' : 'white'}
        rx="5"
        ry="5"
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
      />
    );
  }

  return (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={isSelected ? 'black' : 'gray'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  );
}

function C4Component({ width, height, isSelected }) {
  return (
    <rect
      fill="#85bbf0"
      fillOpacity="1.0"
      stroke={isSelected ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  );
}

function C4System({ width, height, isSelected }) {
  if (width === 150) {
    return (
      <rect
        fill="#1168bd"
        fillOpacity="1.0"
        stroke={isSelected ? 'black' : 'white'}
        rx="5"
        ry="5"
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
      />
    );
  }

  return (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={isSelected ? 'black' : 'gray'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  );
}

function C4ExternalSystem({ width, height, isSelected }) {
  return (
    <rect
      fill="#999999"
      fillOpacity="1.0"
      stroke={isSelected ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  );
}

function C4Actor({ width, height }) {
  return (
    <rect
      fill="#85bbf0"
      fillOpacity="1.0"
      stroke="white"
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  );
}

function C4Database({ width, height, isSelected }) {
  return (
    <g>
      <rect
        fill="#438dd5"
        fillOpacity="1.0"
        // stroke= {isSelected ? 'white' : ''}
        rx="0"
        ry="0"
        x="0"
        y="20"
        width={width}
        height={height - 42}
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
        stroke={isSelected ? 'black' : 'white'}
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

const Icon = React.memo(({ radicalType, width, height, isSelected }) => {
  if (Object.prototype.hasOwnProperty.call(objects, radicalType)) {
    return objects[radicalType]({ width, height, isSelected });
  }
  return Generic({ width, height, isSelected });
});

const Widget = ({ model, engine }) => (
  <RadicalComposedNodeWidget engine={engine} node={model}>
    <Icon
      radicalType={model.options.radical_type}
      width={model.size.width}
      height={model.size.height}
      isSelected={model.isSelected()}
    />
  </RadicalComposedNodeWidget>
);

const MemoizedWidget = React.memo(Widget);
export default class RadicalComposedNodeFactory extends AbstractReactFactory {
  constructor() {
    super('radical-composed-node');
  }

  // eslint-disable-next-line class-methods-use-this
  generateModel() {
    return new RadicalComposedNodeModel();
  }

  generateReactWidget(event) {
    const { model } = event;
    return (
      <MemoizedWidget
        model={event.model}
        engine={this.engine}
        isDragged={model.isDragged}
        width={model.size.width}
        height={model.size.height}
        isSelected={model.isSelected()}
      />
    );
  }
}
