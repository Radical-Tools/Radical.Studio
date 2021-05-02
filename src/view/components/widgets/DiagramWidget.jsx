/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import RadicalCanvasWidget from '../../diagram/RadicalCanvasWidget';

const DiagramWidget = (props) => {
  const {
    view,
    alignment,
    onAddRelation,
    onNodeUpdate,
    onNodeRemoved,
    onCanvasAlignmentUpdated,
    onLinkRemoved,
  } = props;
  return (
    <RadicalCanvasWidget
      onDragItemsEnd={(point, items) => {
        items.forEach((item) => {
          onNodeUpdate(item.getID(), item.position, item.dimension);
        });
      }}
      onDrop={(point, data) => console.log(point, data)}
      onDiagramAlignmentUpdated={(offsetX, offsetY, zoom) =>
        onCanvasAlignmentUpdated(offsetX, offsetY, zoom)
      }
      onLinkConnected={(id, sourceId, targetId) => {
        onAddRelation(sourceId, targetId);
      }}
      onNodeRemove={(id) => {
        onNodeRemoved(id);
      }}
      onLinkRemove={(id) => {
        onLinkRemoved(id);
      }}
      viewmodel={view}
      alignment={alignment}
    />
  );
};

DiagramWidget.propTypes = {
  view: PropTypes.objectOf(PropTypes.any).isRequired,
  alignment: PropTypes.objectOf(PropTypes.any).isRequired,
  onAddRelation: PropTypes.func.isRequired,
  onNodeUpdate: PropTypes.func.isRequired,
  onNodeRemoved: PropTypes.func.isRequired,
  onCanvasAlignmentUpdated: PropTypes.func.isRequired,
  onLinkRemoved: PropTypes.func.isRequired,
};

export default React.memo(DiagramWidget);
