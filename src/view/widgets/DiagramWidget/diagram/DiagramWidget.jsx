import React, { useRef } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';
import { CANVAS_ZOOM_CHANGED } from './consts';
import ToolbarMenu from '../../../components/ToolbarMenu';
import { getCanvas } from '../../../../tests/getDataTestId';
import ObjectMenuWrapper from './components/ObjectMenuWrapper';
import useCallbackRegistration from './hooks/useCallbackRegistration';
import useViewSetup from './hooks/useViewSetup';
import useDragAndDrop from './hooks/useDragAndDrop';

const fillStyle = {
  width: '100%',
  height: '100%',
};
const fillCanvasStyle = {
  width: '100%',
  height: '94%',
  '& .fill': fillStyle,
};
const DiagramWidget = ({
  viewmodel,
  alignment,
  editEnabled,
  smoothTransitionMode,
  onDragItemsEnd,
  onLinkConnected,
  onDiagramAlignmentUpdated,
  onNodeRemove,
  onNodeRestoreOutgoingLinks,
  onLinkRemove,
  onLayoutAlign,
  onAddObjectToView,
  onObjectRemove,
  onRelationRemove,
  onItemSelected,
  onNodeCollapsed,
  onNodeExpanded,
  onAddMetamodelObjectToView,
  onItemNameUpdated,
  onNodeDetached,
  alignEnabled,
  zoomToFitEnabled,
  exportEnabled,
  title,
  selectionEnabled,
  linkingMode,
  setLinkingMode,
}) => {
  const contextMenuCallbackRef = useRef(null);
  const registerCallbacks = useCallbackRegistration(
    onDragItemsEnd,
    onLinkConnected,
    onDiagramAlignmentUpdated,
    onItemSelected,
    onNodeCollapsed,
    onNodeExpanded,
    onObjectRemove,
    onNodeRemove,
    onRelationRemove,
    onLinkRemove,
    onItemNameUpdated,
    onNodeDetached
  );
  const [engine, isModelSet] = useViewSetup(
    registerCallbacks,
    viewmodel,
    editEnabled,
    selectionEnabled,
    smoothTransitionMode,
    alignment
  );

  const [, drop] = useDragAndDrop(
    engine,
    onAddObjectToView,
    onAddMetamodelObjectToView
  );
  return (
    engine &&
    isModelSet && (
      <>
        <Box sx={fillStyle}>
          <ToolbarMenu
            onLayoutAlign={onLayoutAlign}
            onZoomToFit={() => {
              engine.zoomToFitNodes();
              engine.getModel().fireEvent(
                {
                  offsetX: engine.getModel().getOptions().offsetX,
                  offsetY: engine.getModel().getOptions().offsetY,
                  zoom: engine.getModel().getOptions().zoom,
                },
                CANVAS_ZOOM_CHANGED
              );
            }}
            linkingEnabled={alignEnabled}
            linkingMode={linkingMode}
            onSetLinkingMode={setLinkingMode}
            name={title}
            alignEnabled={alignEnabled}
            zoomToFitEnabled={zoomToFitEnabled}
            exportEnabled={exportEnabled}
          />
          <Box
            data-testid={getCanvas()}
            ref={drop}
            sx={fillCanvasStyle}
            onContextMenu={contextMenuCallbackRef.current}
          >
            <CanvasWidget className="fill canvas-view" engine={engine} />
          </Box>
        </Box>
        <ObjectMenuWrapper
          engine={engine}
          onNodeRestoreOutgoingLinks={onNodeRestoreOutgoingLinks}
          contextMenuCallbackRef={contextMenuCallbackRef}
        />
      </>
    )
  );
};
DiagramWidget.propTypes = {
  viewmodel: PropTypes.objectOf(PropTypes.any).isRequired,
  alignment: PropTypes.objectOf(PropTypes.any).isRequired,
  editEnabled: PropTypes.bool.isRequired,
  smoothTransitionMode: PropTypes.bool.isRequired,
  onDragItemsEnd: PropTypes.func.isRequired,
  onLinkConnected: PropTypes.func.isRequired,
  onDiagramAlignmentUpdated: PropTypes.func.isRequired,
  onNodeRemove: PropTypes.func.isRequired,
  onNodeRestoreOutgoingLinks: PropTypes.func.isRequired,
  onLinkRemove: PropTypes.func.isRequired,
  onObjectRemove: PropTypes.func.isRequired,
  onRelationRemove: PropTypes.func.isRequired,
  onLayoutAlign: PropTypes.func.isRequired,
  onAddObjectToView: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onNodeCollapsed: PropTypes.func.isRequired,
  onNodeExpanded: PropTypes.func.isRequired,
  onAddMetamodelObjectToView: PropTypes.func.isRequired,
  onItemNameUpdated: PropTypes.func.isRequired,
  onNodeDetached: PropTypes.func.isRequired,
  alignEnabled: PropTypes.bool.isRequired,
  zoomToFitEnabled: PropTypes.bool.isRequired,
  exportEnabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  selectionEnabled: PropTypes.bool.isRequired,
  linkingMode: PropTypes.bool.isRequired,
  setLinkingMode: PropTypes.func.isRequired,
};

export default React.memo(DiagramWidget);
