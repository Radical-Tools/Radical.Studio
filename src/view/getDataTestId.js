export const getMetamodelItem = (metamodelItemName) =>
  `Metamodel-${metamodelItemName}`;

export const getFileUploader = () => `Component-FileUploader`;

export const getCanvas = () => `Canvas`;

export const getCanvasViewName = () => `Canvas-View-Name`;

export const getCanvasNode = (nodeName) => `Canvas-Node-${nodeName}`;

export const getCanvasNodePossibleRelation = (nodeName, relationName) =>
  `Canvas-Node-${nodeName}-Toolbar-PossibleRelation-${relationName}`;

export const getCanvasNodeRemoveButton = (nodeName) =>
  `Canvas-Node-${nodeName}-Toolbar-RemoveButton`;

export const getCanvasNodeExpandButton = (nodeName) =>
  `Canvas-Node-${nodeName}-Toolbar-ExpandButton`;

export const getCanvasNodeCollapseButton = (nodeName) =>
  `Canvas-Node-${nodeName}-Toolbar-CollapseButton`;

export const getCanvasNodeDeleteButton = (nodeName) =>
  `Canvas-Node-${nodeName}-Toolbar-DeleteButton`;

export const getCanvasLink = (relationName, sourceName, targetName) =>
  `Canvas-Link-${relationName}-Source-${sourceName}-Target-${targetName}`;

export const getObjectGridName = (objectName) =>
  `Model-Grid-Object-${objectName}-Name`;

export const getRelationGridItem = (relationName) =>
  `Model-Grid-Relation-${relationName}-Name`;

export const getWidgetListItem = (id) => `WidgetList-${id}`;

export const getFormSubmitButton = (Context) => `Form-${Context}`;

export const getModelGridToolbarItem = (TabName) =>
  `Model-Grid-Tabs-${TabName}`;
