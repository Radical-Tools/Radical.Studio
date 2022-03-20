import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

const saveTransformations = [];
const prepareVersionString = (version) =>
  version.split('.').map((x) => Number(x));
const isTransformationApplicable = (version) => (saveTransformation) => {
  const [major, minor, patch] = prepareVersionString(
    saveTransformation.version
  );
  const [saveMajor, saveMinor, savePatch] = prepareVersionString(version);
  return (
    saveMajor < major ||
    (saveMajor === major && saveMinor < minor) ||
    (saveMajor === major && saveMinor === minor && savePatch < patch)
  );
};

const loadState = (state, payload) => {
  if (!payload) return state;
  const preparedPayload = flow([
    ...saveTransformations
      .filter(isTransformationApplicable(payload.project?.version))
      .map((st) => st.transformation),
  ])(payload);
  const metamodelToLoad = preparedPayload.metamodels.find(
    (metamodel) => metamodel.id === preparedPayload.project.metamodel.C4.id
  );
  return flow([
    set('project', preparedPayload.project),
    set(['metamodel', 'C4'], metamodelToLoad),
    set(['layout', 'showHomeDialog'], false),
  ])(state);
};

export default loadState;
