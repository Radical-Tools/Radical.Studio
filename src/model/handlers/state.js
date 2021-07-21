import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

const loadState = (state, payload) =>
  payload
    ? flow(
        set(['layout'], state.layout),
        set(['layout', 'showDrawer'], false),
        set(['layout', 'showHomeDialog'], false)
      )(payload)
    : state;

export default loadState;
