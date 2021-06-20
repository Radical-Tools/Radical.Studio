/* eslint-disable react/prop-types */
import * as React from 'react';
import * as _ from 'lodash';
import RadicalLinkParentWidget from './RadicalLinkParentWidget';

const LinkLayerWidget = ({ layer, engine }) => (
  <>
    {
      // only perform these actions when we have a diagram
      _.map(layer.getLinks(), (link) => (
        <RadicalLinkParentWidget
          key={link.getID()}
          link={link}
          diagramEngine={engine}
        />
      ))
    }
  </>
);

export default LinkLayerWidget;
