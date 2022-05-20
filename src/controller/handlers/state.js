import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import cloneDeep from 'lodash/fp/cloneDeep';

const saveTransformations = [
  {
    version: '0.1.4',
    transformation: (payload) => {
      const newHistory = cloneDeep(payload.project.history);
      newHistory.prev.forEach((historyItem) =>
        historyItem.changes.forEach((change) => {
          // eslint-disable-next-line no-param-reassign
          change.path = ['project', ...change.path];
        })
      );
      return flow([
        set(['project'], payload.project.project),
        set(['project', 'metamodel'], {
          C4: {
            id: 'C4',
            version: '1.0',
          },
        }),
        set(['project', 'model'], payload.project.model),
        set(['project', 'viewModel'], payload.project.viewModel),
        set(
          ['project', 'presentationModel'],
          payload.project.presentationModel
        ),
        set(['project', 'history'], newHistory),
      ])(payload);
    },
  },
];

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
      .filter(
        isTransformationApplicable(
          payload.project?.version || payload.project?.project?.version
        )
      )
      .map((st) => st.transformation),
  ])(payload);

  const projectMetamodel = Object.keys(preparedPayload.project.metamodel)[0];
  const metamodelToLoad = preparedPayload.metamodels.find(
    (metamodel) =>
      metamodel.id === preparedPayload.project.metamodel[projectMetamodel].id
  );

  return flow([
    set('project', preparedPayload.project),
    set(['project', 'version'], process.env.REACT_APP_VERSION),
    set(['metamodel', projectMetamodel], metamodelToLoad),
    set(['layout', 'showHomeDialog'], false),
  ])(state);
};

export default loadState;
