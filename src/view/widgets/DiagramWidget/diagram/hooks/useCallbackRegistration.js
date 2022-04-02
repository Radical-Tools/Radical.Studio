import { NodeModel } from '@projectstorm/react-diagrams';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import {
  DRAG_DIAGRAM_ITEMS_END_EVENT,
  LINK_CONNECTED_TO_TARGET_EVENT,
  DIAGRAM_ENTITY_SELECTED,
  DIAGRAM_NODE_COLLAPSED,
  DIAGRAM_NODE_EXPANDED,
  DIAGRAM_ENTITY_DELETED,
  DIAGRAM_LINK_TARGET_SELECTED_EVENT,
  DIAGRAM_ITEM_NAME_CHANGED,
  DIAGRAM_NODE_DETACHED,
  DRAG_CANVAS_END_EVENT,
  CANVAS_ZOOM_CHANGED,
} from '../consts';

const zoomDebounceTime = 500;
const useCallbackRegistration = (
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
) => {
  const debouncedZoom = debounce(onDiagramAlignmentUpdated, zoomDebounceTime);
  return useCallback(
    () => ({
      eventDidFire: (e) => {
        switch (e.function) {
          case DRAG_DIAGRAM_ITEMS_END_EVENT:
            onDragItemsEnd({ ...e.point }, e.items);
            break;
          case LINK_CONNECTED_TO_TARGET_EVENT:
            onLinkConnected(e.sourceId, e.targetId);
            break;
          case DRAG_CANVAS_END_EVENT:
            onDiagramAlignmentUpdated(e.offsetX, e.offsetY, e.zoom);
            break;
          case CANVAS_ZOOM_CHANGED:
            debouncedZoom(e.offsetX, e.offsetY, e.zoom);
            break;
          case DIAGRAM_ENTITY_SELECTED:
            onItemSelected(
              e.entity.getID(),
              e.entity instanceof NodeModel ? 'object' : 'relation',
              e.isSelected
            );
            break;
          case DIAGRAM_NODE_COLLAPSED:
            onNodeCollapsed(e.id);
            break;
          case DIAGRAM_NODE_EXPANDED:
            onNodeExpanded(e.id);
            break;
          case DIAGRAM_ENTITY_DELETED:
            if (e.entity instanceof NodeModel) {
              if (e.deleteFromModel) {
                onObjectRemove(e.entity.getID());
              } else {
                onNodeRemove(e.entity.getID());
              }
            } else if (e.deleteFromModel) {
              onRelationRemove(e.entity.getID());
            } else {
              onLinkRemove(e.entity.getID());
            }
            break;
          case DIAGRAM_LINK_TARGET_SELECTED_EVENT:
            onLinkConnected(e.id, e.source, e.target, e.type);
            break;
          case DIAGRAM_ITEM_NAME_CHANGED:
            onItemNameUpdated(
              e.entity.getID(),
              e.entity instanceof NodeModel ? 'object' : 'relation',
              e.entity.options.name
            );
            break;
          case DIAGRAM_NODE_DETACHED:
            onNodeDetached(e.id);
            break;
          default:
            break;
        }
      },
    }),
    [
      onDragItemsEnd,
      onLinkConnected,
      onDiagramAlignmentUpdated,
      onItemSelected,
      onNodeExpanded,
      onNodeCollapsed,
      onNodeRemove,
      onLinkRemove,
      onObjectRemove,
      onRelationRemove,
      onItemNameUpdated,
      onNodeDetached,
      debouncedZoom,
    ]
  );
};
export default useCallbackRegistration;
