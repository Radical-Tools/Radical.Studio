import React, { useCallback } from 'react';
import set from 'lodash/fp/set';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import FileReader from '../utils/FileReader';
import CommonForm from '../common/CommonForm';
import config from '../../../config/app-config';

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    minWidth: theme.app?.minWidth || 'initial',
    minHeight: theme.app?.minHeight || 'initial',
  },
  paperScrollPaper: {},
  container: {
    overflow: 'auto',
    display: 'block',
  },
}));
const useAppBarStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
}));
const useTitleStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const projectForm = {
  data: {
    type: 'object',
    required: ['name', 'metamodel'],
    properties: {
      name: { type: 'string', title: 'Name' },
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
    title: 'Local storage',
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', title: 'Name' },
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

const HomeDialog = ({
  show,
  metamodels,
  onSubmitProjectForm,
  onLoadStorage,
  onLoadFile,
}) => {
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
      classes={useDialogStyles()}
    >
      <AppBar classes={useAppBarStyles()}>
        <Toolbar>
          <Typography variant="h6" classes={useTitleStyles()}>
            Radical Studio - Setup
          </Typography>
        </Toolbar>
      </AppBar>
      <Box justifyContent="center" display="flex" m={20}>
        <Box p={5} boxShadow={3} m={2}>
          <Card elevation={0}>
            <CardHeader
              title="To open existing project"
              subheader="upload the local file or load the local storage state"
            />

            <CardContent>
              <Box m={1}>
                <FileReader
                  onDataChunk={(dataChunk) => onLoadFile(JSON.parse(dataChunk))}
                  chunkSize={400000}
                />
              </Box>
              <Box m={1}>
                <CommonForm
                  uiSchema={localStorageForm.ui}
                  dataSchema={set(
                    'properties.name.enum',
                    Object.keys(localStorage)
                      .filter((key) =>
                        key.startsWith(config.operations.storageKey)
                      )
                      .map((key) =>
                        key.replace(`${config.operations.storageKey}:`, '')
                      ),
                    localStorageForm.data
                  )}
                  onSubmit={onSubmitLoadStorageCallback}
                  testId="local-storage"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box boxShadow={3} m={2}>
          <Card elevation={0}>
            <CardHeader
              title="To create a new project"
              subheader="select one of the predefined metamodels and type project's name"
            />
            <CardContent>
              <CommonForm
                uiSchema={projectForm.ui}
                dataSchema={set(
                  'properties.metamodel.enum',
                  metamodels.map((metamodel) => metamodel.id),
                  projectForm.data
                )}
                onSubmit={onSubmitProjectFormCallback}
                testId="project"
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
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
