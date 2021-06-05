import IconButton from '@material-ui/core/IconButton';
import ControlPointRoundedIcon from '@material-ui/icons/ControlPointRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  collapsePanel: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
}));

const CollapsePanel = ({ size, isParent, onCollapse, onExpand }) => {
  const classes = useStyles();
  return (
    <div className={classes.collapsePanel}>
      {size.width === 150 && isParent && (
        <IconButton className="controlEl" onClick={onExpand}>
          <ControlPointRoundedIcon />
        </IconButton>
      )}
      {size.width > 150 && isParent && (
        <IconButton className="controlEl" onClick={onCollapse}>
          <RemoveCircleOutlineRoundedIcon />
        </IconButton>
      )}
    </div>
  );
};

CollapsePanel.propTypes = {
  size: PropTypes.objectOf(PropTypes.any).isRequired,
  isParent: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
};

export default CollapsePanel;
