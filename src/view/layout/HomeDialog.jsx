import React, { useCallback, useState, useEffect } from 'react';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import FileReader from '../components/FileReader';
import CommonForm from '../components/CommonForm';
import { getWizardItemButton } from '../../tests/getDataTestId';
import { getDateOrderedProjectsListFromLocalStorage } from '../../controller/localStorageController';
import DialogAppBar from '../components/DialogAppBar';

const dialogStyle = {
  minWidth: (theme) => theme.app?.minWidth || 'initial',
  minHeight: (theme) => theme.app?.minHeight || 'initial',
  '& .MuiDialog-container': {
    overflow: 'auto',
    display: 'block',
  },
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

const getEnchancedLocalStorageSchema = (projects) =>
  flow(
    set('properties.name.enum', projects),
    set('properties.name.default', projects.length ? projects[0] : undefined)
  )(localStorageForm.data);

const HomeDialog = ({
  show,
  metamodels,
  onSubmitProjectForm,
  onLoadStorage,
  onLoadFile,
}) => {
  const [page, setPage] = useState('Initial');
  const [orderedProjects, setOrderedProjects] = useState([]);
  useEffect(() => {
    setOrderedProjects(getDateOrderedProjectsListFromLocalStorage());
  }, [setOrderedProjects]);
  const onSubmitProjectFormCallback = useCallback(
    (title, data) => onSubmitProjectForm(data),
    [onSubmitProjectForm]
  );
  const onSubmitLoadStorageCallback = useCallback(
    (title, data) => onLoadStorage(data.name),
    [onLoadStorage]
  );
  const onLoadLastProject = useCallback(
    () => onLoadStorage(orderedProjects[0]),
    [onLoadStorage, orderedProjects]
  );
  return (
    <Dialog
      fullScreen
      open={show}
      TransitionComponent={Transition}
      sx={dialogStyle}
    >
      <DialogAppBar />
      {page === 'Initial' && (
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          margin={30}
        >
          <Box padding={3}>
            <Tooltip
              title={<Typography variant="h6">Create New Project</Typography>}
            >
              <IconButton
                variant="contained"
                color="secondary"
                data-testid={getWizardItemButton('CreateProject')}
                onClick={() => setPage('CreateNew')}
              >
                <AddCircleRoundedIcon sx={{ fontSize: 120 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box padding={3}>
            <Tooltip
              title={
                <Typography variant="h6">Open Project From File</Typography>
              }
            >
              <IconButton
                variant="contained"
                color="primary"
                component="label"
                data-testid={getWizardItemButton('LoadFile')}
              >
                <FileCopyRoundedIcon sx={{ fontSize: 120 }} />
                <FileReader
                  onDataChunk={(dataChunk) => onLoadFile(dataChunk)}
                  chunkSize={400000}
                />
              </IconButton>
            </Tooltip>
          </Box>
          {!!orderedProjects.length && (
            <Box padding={3}>
              <Tooltip
                title={
                  <Typography variant="h6">Restore Last Project</Typography>
                }
              >
                <IconButton
                  variant="contained"
                  color="primary"
                  data-testid={getWizardItemButton('RestoreLast')}
                  onClick={onLoadLastProject}
                >
                  <RestoreRoundedIcon sx={{ fontSize: 120 }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          {!!orderedProjects.length && (
            <Box padding={3}>
              <Tooltip
                title={
                  <Typography variant="h6">
                    Open Project From Local Storage
                  </Typography>
                }
              >
                <IconButton
                  variant="contained"
                  color="primary"
                  data-testid={getWizardItemButton('RestoreAny')}
                  onClick={() => setPage('LoadFromLocalStorage')}
                >
                  <StorageRoundedIcon sx={{ fontSize: 120 }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
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
                dataSchema={getEnchancedLocalStorageSchema(orderedProjects)}
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
