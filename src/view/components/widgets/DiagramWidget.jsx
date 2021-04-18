/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import RadicalCanvasWidget from '../../diagram/RadicalCanvasWidget';

const DiagramWidget = (props) => {
  const { view, onAddRelation } = props;
  return (
    <RadicalCanvasWidget
      onDrop={(point, data) => console.log(point, data)}
      onDragItemsEnd={(point, items) => console.log(point, items)}
      onDiagramAlignmentUpdated={(offsetX, offsetY, zoom) =>
        console.log(offsetX, offsetY, zoom)
      }
      onLinkConnected={(id, sourceId, targetId) => {
        console.log(id, sourceId, targetId);
        onAddRelation(sourceId, targetId);
      }}
      viewmodel={view}
    />
  );
};

DiagramWidget.propTypes = {
  view: PropTypes.objectOf(PropTypes.any).isRequired,
  onAddRelation: PropTypes.func.isRequired,
};

export default React.memo(DiagramWidget);
