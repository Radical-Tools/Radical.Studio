import React from 'react';
import RadicalCanvasWidget from '../../diagram/RadicalCanvasWidget';

const viewmodel = {
  nodes: [
    {
      radical_type: 'Component',
      name: 'Test',
      attributes: {
        technology: 'JS',
      },
    },
    {
      radical_type: 'Container',
      name: 'Test2',
      attributes: {
        technology: '.NET',
      },
    },
  ],
};

const DiagramWidget = () => (
  <RadicalCanvasWidget
    // eslint-disable-next-line no-console
    onDrop={(point, data) => console.log(point, data)}
    viewmodel={viewmodel}
  />
);

export default React.memo(DiagramWidget);
