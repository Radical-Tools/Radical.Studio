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

const loadState = (state, payload) =>
  payload
    ? flow([
        ...saveTransformations
          .filter(isTransformationApplicable(payload.project?.version))
          .map((st) => st.transformation),
        set(['layout'], state.layout),
        set(['layout', 'showDrawer'], false),
        set(['layout', 'showHomeDialog'], false),
      ])(payload)
    : state;

export default loadState;
