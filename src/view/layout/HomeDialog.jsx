import React, { useCallback, useState } from 'react';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import KeyboardReturnRoundedIcon from '@material-ui/icons/KeyboardReturnRounded';
import WidgetsIcon from '@material-ui/icons/Widgets';
import Box from '@material-ui/core/Box';
import { Tooltip } from '@material-ui/core';
import orderBy from 'lodash/orderBy';
import FileReader from '../components/FileReader';
import CommonForm from '../components/CommonForm';
import config from '../../app/appConfig';
import { getWizardItemButton } from '../../tests/getDataTestId';

const dialogStyle = {
  minWidth: (theme) => theme.app?.minWidth || 'initial',
  minHeight: (theme) => theme.app?.minHeight || 'initial',
  '& .MuiDialog-container': {
    overflow: 'auto',
    display: 'block',
  },
};
const appBarStyle = {
  position: 'relative',
};
const titleStyle = {
  ml: 2,
  flex: 1,
};

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const projectForm = {
  data: {
    type: 'object',
    required: ['name', 'metamodel'],
    properties: {
      name: { type: 'string', title: 'Project Name' },
      metamodel: {
        type: 'string',
        title: 'Metamodel',
        default: 'C4',
      },
    },
  },
  ui: {
    ui: {
      name: {
        'ui:autofocus': true,
        'ui:emptyValue': '',
      },
      metamodel: {
        'ui:emptyValue': '',
      },
    },
  },
};

const localStorageForm = {
  data: {
    title: '',
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', title: 'Project Name' },
    },
  },
  ui: {
    ui: {
      name: {
        'ui:autofocus': false,
        'ui:emptyValue': '',
      },
    },
  },
};

const getDateOrderedProjectsListFromLocalStorage = () => {
  const projects = Object.entries(localStorage)
    .filter(([key]) => key.startsWith(config.operations.storageKey))
    .map(([key, value]) => {
      const parsedValue = JSON.parse(value);
      return {
        name: key.replace(`${config.operations.storageKey}:`, ''),
        timestamp: parsedValue.timestamp ? parsedValue.timestamp : 0,
      };
    });
  return orderBy(projects, 'timestamp', ['desc']).map(
    (project) => project.name
  );
};
const getEnchancedLocalStorageSchema = () => {
  const projects = getDateOrderedProjectsListFromLocalStorage();
  return flow(
    set('properties.name.enum', projects),
    set('properties.name.default', projects.length ? projects[0] : undefined)
  )(localStorageForm.data);
};

const HomeDialog = ({
  show,
  metamodels,
  onSubmitProjectForm,
  onLoadStorage,
  onLoadFile,
}) => {
  const [page, setPage] = useState('Initial');
  const onSubmitProjectFormCallback = useCallback(
    (title, data) => onSubmitProjectForm(data),
    [onSubmitProjectForm]
  );
  const onSubmitLoadStorageCallback = useCallback(
    (title, data) => onLoadStorage(data.name),
    [onLoadStorage]
  );
  return (
    <Dialog
      fullScreen
      open={show}
      TransitionComponent={Transition}
      sx={dialogStyle}
    >
      <AppBar sx={appBarStyle}>
        <Toolbar>
          <WidgetsIcon />
          <Box display="flex" alignItems="flex-end">
            <Box>
              <Typography variant="h6" sx={titleStyle}>
                Radical.Studio
              </Typography>
            </Box>
            <Box ml={0.5}>
              <Typography variant="caption">
                v{process.env.REACT_APP_VERSION}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {page === 'Initial' && (
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          margin={30}
        >
          <Box padding={3}>
            <Tooltip
              title={<Typography variant="h6">Create A New Project</Typography>}
            >
              <IconButton
                variant="contained"
                color="secondary"
                data-testid={getWizardItemButton('CreateProject')}
                onClick={() => setPage('CreateNew')}
              >
                <AddCircleRoundedIcon style={{ fontSize: 120 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box padding={3}>
            <Tooltip
              title={<Typography variant="h6">Open From File</Typography>}
            >
              <IconButton
                variant="contained"
                color="primary"
                component="label"
                data-testid={getWizardItemButton('LoadFile')}
              >
                <FileCopyRoundedIcon style={{ fontSize: 120 }} />
                <FileReader
                  onDataChunk={(dataChunk) => onLoadFile(JSON.parse(dataChunk))}
                  chunkSize={400000}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box padding={3}>
            <Tooltip
              title={
                <Typography variant="h6">Open From Local Storage</Typography>
              }
            >
              <IconButton
                variant="contained"
                color="primary"
                data-testid={getWizardItemButton('RestoreAny')}
                onClick={() => setPage('LoadFromLocalStorage')}
              >
                <StorageRoundedIcon style={{ fontSize: 120 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
      {page === 'LoadFromLocalStorage' && (
        <Box margin={30} justifyContent="center" display="flex">
          <Box width="500px">
            <Box>
              <Tooltip title="return to the initial screen">
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => setPage('Initial')}
                >
                  <KeyboardReturnRoundedIcon style={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <CommonForm
                uiSchema={localStorageForm.ui}
                dataSchema={getEnchancedLocalStorageSchema()}
                onSubmit={onSubmitLoadStorageCallback}
                testId="LoadFromLocal"
              />
            </Box>
          </Box>
        </Box>
      )}
      {page === 'CreateNew' && (
        <Box margin={30} justifyContent="center" display="flex">
          <Box width="500px">
            <Box>
              <Tooltip title="return to the initial screen">
                <IconButton
                  variant="contained"
                  color="primary"
                  onClick={() => setPage('Initial')}
                >
                  <KeyboardReturnRoundedIcon style={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <CommonForm
                uiSchema={projectForm.ui}
                dataSchema={set(
                  'properties.metamodel.enum',
                  metamodels.map((metamodel) => metamodel.id),
                  projectForm.data
                )}
                onSubmit={onSubmitProjectFormCallback}
                testId="CreateNew"
              />
            </Box>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

HomeDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  metamodels: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmitProjectForm: PropTypes.func.isRequired,
  onLoadStorage: PropTypes.func.isRequired,
  onLoadFile: PropTypes.func.isRequired,
};
export default HomeDialog;
