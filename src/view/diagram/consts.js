import { PortModelAlignment } from '@projectstorm/react-diagrams';

export const DROP_DATA_KEY = 'storm-diagram-node';
export const DRAG_DIAGRAM_ITEMS_END_EVENT = 'dragDiagramsItemsEnd';
export const LINK_CONNECTED_TO_TARGET_EVENT = 'linkConnectedToTarget';
export const DIAGRAM_ALIGNMENT_UPDATED_EVENT = 'offsetUpdated';
export const DIAGRAM_ENTITY_REMOVED = 'entityRemoved';
export const DIAGRAM_ENTITY_SELECTED = 'selectionChanged';
export const PORTS_PER_NODE_SIDE = 3;
export const PORT_BORDER_RADIUS = 8;
export const REVERSED_ALIGNMENTS = [
  PortModelAlignment.LEFT,
  PortModelAlignment.BOTTOM,
];
