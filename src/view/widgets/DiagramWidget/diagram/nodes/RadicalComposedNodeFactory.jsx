/* eslint-disable react/prop-types */
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import RadicalComposedNodeModel from './RadicalComposedNodeModel';
import RadicalComposedNodeWidget from './RadicalComposedNodeWidget';
import C4Icons from '../../../../../data/metamodels/c4/C4Icons';
import GenericIcon from './GenericIcon';

const Icon = React.memo(
  ({ radicalType, width, height, isSelected, isExpanded }) => {
    if (Object.prototype.hasOwnProperty.call(C4Icons, radicalType)) {
      return C4Icons[radicalType]({ width, height, isSelected, isExpanded });
    }
    return GenericIcon({ width, height, isSelected, isExpanded });
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
    isExpanded={model.options.isExpanded}
    isAsymmetric={model.options.radical_type === 'Actor'}
  >
    <Icon
      radicalType={model.options.radical_type}
      width={model.width}
      height={model.height}
      isSelected={model.isSelected()}
      isExpanded={model.options.isExpanded}
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
        width={model.width}
        height={model.height}
        isSelected={model.isSelected()}
        onNodeExpanded={this.onNodeExpanded}
        onNodeCollapsed={this.onNodeCollapsed}
      />
    );
  }
}
