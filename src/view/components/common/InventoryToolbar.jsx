import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const defaultToolbarStyles = {
  iconButton: {},
};

const CustomToolbar = ({ classes, onClickClb }) => (
  <>
    <Tooltip title="Add Item">
      <IconButton className={classes.iconButton} onClick={onClickClb}>
        <AddIcon className={classes.deleteIcon} />
      </IconButton>
    </Tooltip>
  </>
);

CustomToolbar.propTypes = {
  classes: PropTypes.array.isRequired, // eslint-disable-line
  onClickClb: PropTypes.func.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(
  CustomToolbar
);
