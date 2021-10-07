import * as layout from '../controller/handlers/layout';
import * as model from '../controller/handlers/model';
import * as theme from '../controller/handlers/theme';
import * as viewModel from '../controller/handlers/viewModel';
import * as common from '../controller/handlers/common';
import * as notifications from '../controller/handlers/notifications';
import * as project from '../controller/handlers/project';
import * as presentations from '../controller/handlers/presentation';
import * as history from '../controller/handlers/history';
import * as undo  from '../controller/handlers/undo';

const initialState = {
  ...layout.initialState,
  ...model.initialState,
  ...theme.initialState,
  ...viewModel.initialState,
  ...common.initialState,
  ...notifications.initialState,
  ...project.initialState,
  ...presentations.initialState,
  ...history.initialState,
  ...undo.initialState,
};

export default initialState;
