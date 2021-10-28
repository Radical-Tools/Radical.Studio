import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import WidgetsIcon from '@material-ui/icons/Widgets';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CommonForm from '../components/CommonForm';

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
  data: (name) => ({
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', title: 'Project Name', default: name },
    },
  }),
  ui: {
    ui: {
      name: {
        'ui:autofocus': true,
        'ui:emptyValue': '',
      },
    },
  },
};

const AdminDialog = ({ show, onEditProjectName, projectName }) => {
  const editProjectName = useCallback(
    (title, data) => onEditProjectName(data),
    [onEditProjectName]
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
            <Box>
              <Typography variant="h6" sx={titleStyle}>
                Admin Panel
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        margin={30}
      >
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardHeader
            title={<Typography variant="h6">Project Settings</Typography>}
          />
          <CardContent>
            <CommonForm
              uiSchema={projectForm.ui}
              dataSchema={projectForm.data(projectName)}
              onSubmit={editProjectName}
              testId="LoadFromLocal"
            />
          </CardContent>
        </Card>
        {/* <Card elevation={3} sx={{ height: '100%' }}>
          <CardHeader
            title={<Typography variant="h6">Admin Panel</Typography>}
          />
          <CardContent>ddssd</CardContent>
        </Card>
        <Card elevation={3} sx={{ height: '100%' }}>
          <CardHeader
            title={<Typography variant="h6">Admin Panel</Typography>}
          />
          <CardContent>ddssd</CardContent>
        </Card> */}
      </Box>
    </Dialog>
  );
};

AdminDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  projectName: PropTypes.string.isRequired,
  onEditProjectName: PropTypes.func.isRequired,
};
export default AdminDialog;
