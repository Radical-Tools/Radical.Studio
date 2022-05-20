export const currentMetamodelIdSelector = (state) =>
  state?.project?.metamodel ? Object.keys(state.project.metamodel)[0] : 'C4';

export const currentMetamodelSelector = (state) =>
  state.metamodel[currentMetamodelIdSelector(state)];

export const currentMetamodelRelationAttributesSelector = (state) => {
  if (currentMetamodelSelector(state)) {
    return Object.keys(
      currentMetamodelSelector(state)?.schemas?.relation?.data?.properties
        ?.attributes?.properties
    );
  }
  return [];
};

export const currentMetamodelObjectAttributesSelector = (state) => {
  if (currentMetamodelSelector(state)) {
    return Object.keys(
      currentMetamodelSelector(state)?.schemas?.object?.data?.properties
        ?.attributes?.properties
    );
  }
  return [];
};
