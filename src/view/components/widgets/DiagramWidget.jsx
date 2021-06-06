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
    onLayoutAlign,
    onAddObjectToView,
    onObjectRemoved,
    onRelationRemoved,
    onItemSelected,
    onNodeCollapsed,
    onNodeExpanded,
    onAddMetamodelObjectToView,
    onItemNameUpdated,
  } = props;
  return (
    <RadicalCanvasWidget
      onDragItemsEnd={(point, items) => {
        items.forEach((item) => {
          onNodeUpdate(item.getID(), item.position, item.dimension);
        });
      }}
      onDiagramAlignmentUpdated={(offsetX, offsetY, zoom) =>
        onCanvasAlignmentUpdated(offsetX, offsetY, zoom)
      }
      onLinkConnected={(sourceId, targetId, type) => {
        onAddRelation(sourceId, targetId, type);
      }}
      onNodeRemove={onNodeRemoved}
      onLinkRemove={onLinkRemoved}
      onObjectRemove={onObjectRemoved}
      onRelationRemove={onRelationRemoved}
      viewmodel={view}
      alignment={alignment}
      onLayoutAlign={onLayoutAlign}
      onAddObjectToView={onAddObjectToView}
      onItemSelected={onItemSelected}
      onNodeCollapsed={onNodeCollapsed}
      onNodeExpanded={onNodeExpanded}
      onAddMetamodelObjectToView={onAddMetamodelObjectToView}
      onItemNameUpdated={onItemNameUpdated}
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
  onObjectRemoved: PropTypes.func.isRequired,
  onRelationRemoved: PropTypes.func.isRequired,
  onLayoutAlign: PropTypes.func.isRequired,
  onAddObjectToView: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onNodeCollapsed: PropTypes.func.isRequired,
  onNodeExpanded: PropTypes.func.isRequired,
  onAddMetamodelObjectToView: PropTypes.func.isRequired,
  onItemNameUpdated: PropTypes.func.isRequired,
};

export default React.memo(DiagramWidget);
