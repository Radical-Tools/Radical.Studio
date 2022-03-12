import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import DeleteRoundedeIcon from '@mui/icons-material/DeleteRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
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
        <Card elevation={3} sx={{ width: '100%', marginTop: '50px' }}>
          <CardHeader
            title={<Typography variant="h6">Browser Local Storage</Typography>}
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
