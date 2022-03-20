import * as layout from '../controller/handlers/layout';
import * as theme from '../controller/handlers/theme';
import * as common from '../controller/handlers/common';
import * as notifications from '../controller/handlers/notifications';
import * as project from '../controller/handlers/project';
import * as undo from '../controller/handlers/undo';

const initialState = {
  ...layout.initialState,
  ...theme.initialState,
  ...common.initialState,
  ...notifications.initialState,
  ...project.initialState,
  ...undo.initialState,
};

export default initialState;
