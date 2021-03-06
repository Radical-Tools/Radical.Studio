import { PortModelAlignment } from '@projectstorm/react-diagrams';

export const DRAG_DIAGRAM_ITEMS_END_EVENT = 'dragDiagramsItemsEnd';
export const DRAG_CANVAS_END_EVENT = 'dragCanvasEnd';
export const CANVAS_ZOOM_CHANGED = 'zoomChanged';
export const LINK_CONNECTED_TO_TARGET_EVENT = 'linkConnectedToTarget';
export const DIAGRAM_ENTITY_REMOVED = 'entityRemoved';
export const DIAGRAM_ENTITY_SELECTED = 'selectionChanged';
export const DIAGRAM_NODE_COLLAPSED = 'nodeCollapsed';
export const DIAGRAM_NODE_EXPANDED = 'nodeExpanded';
export const DIAGRAM_ENTITY_DELETED = 'entityDeleted';
export const DIAGRAM_ITEM_NAME_CHANGED = 'diagramItemNameChanged';
export const PORTS_PER_NODE_SIDE = 7;
export const TWO_WAY_LINK_OFFSET = 2;
export const PORT_BORDER_RADIUS = 8;
export const DEFAULT_SOURCE_PORT = 'right1';
export const DEFAULT_TARGET_PORT = 'left1';
export const REVERSED_ALIGNMENTS = [
  PortModelAlignment.LEFT,
  PortModelAlignment.BOTTOM,
];
export const MODEL_DROP_TYPE = 'model-object';
export const METAMODEL_DROP_TYPE = 'metamodel-object';
export const DIAGRAM_LINK_TARGET_SELECTED_EVENT = 'linkSelected';
export const DIAGRAM_NODE_DETACHED = 'nodeDetached';
export const ENGINE_REPAINT_DEBOUNCE = 0; // Having value different than 0 makes links not render correctly
