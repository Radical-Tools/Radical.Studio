import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import DeleteRoundedeIcon from '@material-ui/icons/DeleteRounded';
import FolderRoundedIcon from '@material-ui/icons/FolderRounded';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CommonForm from '../components/CommonForm';
import {
  getDateOrderedProjectsListFromLocalStorage,
  removeProjectFromLocalStorage,
} from '../../controller/localStorageController';
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

const AdminDialog = ({
  show,
  onEditProjectName,
  projectName,
  onToggleAdminDialog,
}) => {
  const [orderedProjects, setOrderedProjects] = useState([]);
  useEffect(() => {
    setOrderedProjects(getDateOrderedProjectsListFromLocalStorage());
  }, []);
  const refreshProjects = () => {
    setOrderedProjects(getDateOrderedProjectsListFromLocalStorage());
  };
  const editProjectName = useCallback(
    (title, data) => {
      onEditProjectName(data);
      refreshProjects();
    },
    [onEditProjectName]
  );
  const onRemoveProject = useCallback((p) => {
    removeProjectFromLocalStorage(p);
    refreshProjects();
  }, []);

  return (
    <Dialog
      fullScreen
      open={show}
      TransitionComponent={Transition}
      sx={dialogStyle}
    >
      <DialogAppBar
        closeAction={onToggleAdminDialog}
        secondaryText="Admin Panel"
      />
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        margin={10}
      >
        <Card elevation={3} sx={{ width: '100%' }}>
          <CardHeader
            title={<Typography variant="h6">Projects Settings</Typography>}
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
        <Card elevation={3} sx={{ width: '100%', marginTop: '50px' }}>
          <CardHeader
            title={
              <Typography variant="h6">Projects in local storage</Typography>
            }
          />
          <CardContent>
            <List>
              {orderedProjects.map((p) => (
                <ListItem
                  key={p}
                  secondaryAction={
                    p !== projectName && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onRemoveProject(p)}
                      >
                        <DeleteRoundedeIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={p} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Dialog>
  );
};

AdminDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  projectName: PropTypes.string.isRequired,
  onEditProjectName: PropTypes.func.isRequired,
  onToggleAdminDialog: PropTypes.func.isRequired,
};
export default AdminDialog;
