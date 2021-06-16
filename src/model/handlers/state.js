import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

const loadState = (state, payload) => {
  if (payload) {
    const newState = flow(
      set(['layout', 'showDrawer'], false),
      set(['layout', 'showHomeDialog'], false)
    )(payload);
    return newState;
  }
  return state;
};
export default loadState;
