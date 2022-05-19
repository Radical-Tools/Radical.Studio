export const currentMetamodelIdSelector = (state) =>
  state?.project?.metamodel ? Object.keys(state.project.metamodel)[0] : 'C4';
export const currentMetamodelSelector = (state) =>
  state.metamodel[currentMetamodelIdSelector(state)];
