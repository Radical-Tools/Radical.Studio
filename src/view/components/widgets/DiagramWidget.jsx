import React from 'react';
import PropTypes from 'prop-types';
import RadicalCanvasWidget from '../../diagram/RadicalCanvasWidget';

// const viewmodel = {
//   nodes: [
//     {
//       radical_type: 'Component',
//       name: 'Test',
//       attributes: {
//         technology: 'JS',
//       },
//     },
//     {
//       radical_type: 'Container',
//       name: 'Test2',
//       attributes: {
//         technology: '.NET',
//       },
//     },
//   ],
// };

const DiagramWidget = (props) => {
  const { view } = props;
  return (
    <RadicalCanvasWidget
      // eslint-disable-next-line no-console
      onDrop={(point, data) => console.log(point, data)}
      viewmodel={view}
    />
  );
};

DiagramWidget.propTypes = {
  view: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default React.memo(DiagramWidget);
