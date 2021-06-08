/* eslint-disable react/prop-types */
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import RadicalComposedNodeModel from './RadicalComposedNodeModel';
import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';
import {
  C4Actor,
  C4Component,
  C4Container,
  C4Database,
  C4ExternalSystem,
  C4System,
} from './c4/c4Icons';

function Generic({ width, height, isSelected }) {
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

const objects = {
  Actor: C4Actor,
  Container: C4Container,
  System: C4System,
  Component: C4Component,
  'External System': C4ExternalSystem,
  Database: C4Database,
};

const Icon = React.memo(
  ({ radicalType, width, height, isSelected, isExpanded }) => {
    if (Object.prototype.hasOwnProperty.call(objects, radicalType)) {
      return objects[radicalType]({ width, height, isSelected, isExpanded });
    }
    return Generic({ width, height, isSelected, isExpanded });
  }
);

const Widget = ({ model, engine, onNodeExpanded, onNodeCollapsed }) => (
  <RadicalComposedNodeWidget
    engine={engine}
    node={model}
    onNodeExpanded={onNodeExpanded}
    onNodeCollapsed={onNodeCollapsed}
    isSelected={model.isSelected() || false}
    name={model.options.name}
    isExpanded={model.width > 150}
    isAsymmetric={model.options.radical_type === 'Actor'}
  >
    <Icon
      radicalType={model.options.radical_type}
      width={model.size.width}
      height={model.size.height}
      isSelected={model.isSelected()}
      isExpanded={model.width > 150}
    />
  </RadicalComposedNodeWidget>
);

const MemoizedWidget = React.memo(Widget);
export default class RadicalComposedNodeFactory extends AbstractReactFactory {
  constructor(onNodeExpanded, onNodeCollapsed) {
    super('radical-composed-node');
    this.onNodeExpanded = onNodeExpanded;
    this.onNodeCollapsed = onNodeCollapsed;
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
        onNodeExpanded={this.onNodeExpanded}
        onNodeCollapsed={this.onNodeCollapsed}
      />
    );
  }
}
