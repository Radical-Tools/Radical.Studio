import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import FileReader from '../utils/FileReader';
import ObjectButton from '../utils/ObjectButton';

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

const HomeDialog = ({ show, metamodels, onSelectMetamodel }) => (
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
            title="To open existing model"
            subheader="upload the local file"
          />

          <CardContent>
            <FileReader
              // eslint-disable-next-line no-alert
              onDataChunk={(dataChunk) => alert(JSON.stringify(dataChunk))}
              chunkSize={400000}
            />
          </CardContent>
        </Card>
      </Box>
      <Box boxShadow={3} m={2}>
        <Card>
          <CardHeader
            title="To create a new model"
            subheader="select one of the predefined metamodels"
          />
          <CardContent>
            {metamodels.map((metamodel) => (
              <ObjectButton
                key={metamodel.id}
                id={metamodel.id}
                name={metamodel.name}
                onClick={onSelectMetamodel}
              />
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Dialog>
);

HomeDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  metamodels: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectMetamodel: PropTypes.func.isRequired,
};
export default HomeDialog;
