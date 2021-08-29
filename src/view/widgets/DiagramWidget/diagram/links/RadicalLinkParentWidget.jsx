/* eslint-disable react/prop-types */
import * as React from 'react';
import * as _ from 'lodash';
import { LinkWidget } from '@projectstorm/react-diagrams';
import { PeformanceWidget } from '@projectstorm/react-canvas-core';
import RadicalLabelParentWidget from '../labels/RadicalLabelParentWidget';

export default class RadicalLinkParentWidget extends LinkWidget {
  render() {
    const { link } = this.props;

    // only draw the link when we have reported positions
    if (link.getSourcePort() && !link.getSourcePort().reportedPosition) {
      return null;
    }
    if (link.getTargetPort() && !link.getTargetPort().reportedPosition) {
      return null;
    }

    // generate links
    return (
      <PeformanceWidget
        model={this.props.link}
        serialized={this.props.link.serialize()}
      >
        {() => (
          <g data-linkid={this.props.link.getID()}>
            {this.props.diagramEngine.generateWidgetForLink(link)}
            {_.map(this.props.link.getLabels(), (labelModel, index) => (
              <RadicalLabelParentWidget
                key={labelModel.getID()}
                engine={this.props.diagramEngine}
                label={labelModel}
                index={index}
              />
            ))}
          </g>
        )}
      </PeformanceWidget>
    );
  }
}
