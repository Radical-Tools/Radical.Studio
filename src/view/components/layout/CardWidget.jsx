import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MinimizeRoundedIcon from '@material-ui/icons/MinimizeRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import Typography from '@material-ui/core/Typography';

const headerHeight = 50;
const useCardStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    height: '100%',
  },
}));
const useIconButtonStyles = makeStyles(() => ({
  root: {
    marginTop: '10px',
    color: '#ffffff',
  },
}));
const useCardHeaderStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0),
    paddingRight: '10px',
    paddingLeft: '10px',
    color: 'white',
    height: `${headerHeight}px`,
  },
}));
const useCardContentStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    height: `calc(100% - ${headerHeight}px)`,
    overflow: 'auto',
  },
}));

function CardWidget({
  title,
  onMinimize,
  onMaximize,
  onClose,
  id,
  children,
  className,
}) {
  const buttonClasses = useIconButtonStyles();
  const onMinimizeCallback = useCallback(() => onMinimize(id), [
    onMinimize,
    id,
  ]);
  const onMaximizeCallback = useCallback(() => onMaximize(id), [
    onMaximize,
    id,
  ]);
  const onCloseCallback = useCallback(() => onClose(id), [onClose, id]);
  const getAriaLabel = (iconPurpose) => `${iconPurpose} ${title}`;
  return (
    <Card elevation={3} classes={useCardStyles()}>
      <CardHeader
        classes={useCardHeaderStyles()}
        className={className}
        title={<Typography variant="h5">{title}</Typography>}
        action={
          <Box>
            <IconButton
              label="Minimize"
              classes={buttonClasses}
              aria-label={getAriaLabel('Minimize')}
              onClick={onMinimizeCallback}
            >
              <MinimizeRoundedIcon />
            </IconButton>
            <IconButton
              label="Maximize"
              classes={buttonClasses}
              aria-label={getAriaLabel('Maximize')}
              onClick={onMaximizeCallback}
            >
              <FullscreenRoundedIcon />
            </IconButton>
            <IconButton
              label="Close"
              classes={buttonClasses}
              aria-label={getAriaLabel('Close')}
              onClick={onCloseCallback}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </Box>
        }
      />
      <CardContent classes={useCardContentStyles()}>{children}</CardContent>
    </Card>
  );
}
CardWidget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onMinimize: PropTypes.func.isRequired,
  onMaximize: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
CardWidget.defaultProps = {
  className: '',
};
export default CardWidget;
