import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MinimizeRoundedIcon from '@material-ui/icons/MinimizeRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded';
import Typography from '@material-ui/core/Typography';

const headerHeight = 37;
const useCardStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    height: '100%',
  },
}));
const useIconButtonStyles = makeStyles(() => ({
  root: {
    marginTop: '12px',
    marginRight: '5px',
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
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));

function CardWrapper({
  title,
  onMinimize,
  onMaximize,
  onClose,
  onRestore,
  id,
  children,
  className,
  isMaximized,
}) {
  const buttonClasses = useIconButtonStyles();
  const onMinimizeCallback = useCallback(
    () => onMinimize(id),
    [onMinimize, id]
  );
  const onMaximizeCallback = useCallback(
    () => onMaximize(id),
    [onMaximize, id]
  );
  const onCloseCallback = useCallback(() => onClose(id), [onClose, id]);
  const onRestoreCallback = useCallback(() => onRestore(id), [onRestore, id]);
  const getAriaLabel = (iconPurpose) => `${iconPurpose} ${title}`;
  return (
    <Card elevation={3} classes={useCardStyles()}>
      <CardHeader
        classes={useCardHeaderStyles()}
        className={className}
        title={<Typography variant="h6">{title}</Typography>}
        action={
          <Box>
            {isMaximized && onRestore ? (
              <IconButton
                size="small"
                label="Restore"
                classes={buttonClasses}
                aria-label={getAriaLabel('Restore')}
                onClick={onRestoreCallback}
              >
                <FullscreenExitRoundedIcon />
              </IconButton>
            ) : (
              <>
                {onMinimize && (
                  <IconButton
                    size="small"
                    label="Minimize"
                    classes={buttonClasses}
                    aria-label={getAriaLabel('Minimize')}
                    onClick={onMinimizeCallback}
                  >
                    <MinimizeRoundedIcon />
                  </IconButton>
                )}
                {onMaximize && (
                  <IconButton
                    size="small"
                    label="Maximize"
                    classes={buttonClasses}
                    aria-label={getAriaLabel('Maximize')}
                    onClick={onMaximizeCallback}
                  >
                    <FullscreenRoundedIcon />
                  </IconButton>
                )}
                {onClose && (
                  <IconButton
                    size="small"
                    label="Close"
                    classes={buttonClasses}
                    aria-label={getAriaLabel('Close')}
                    onClick={onCloseCallback}
                  >
                    <HighlightOffRoundedIcon />
                  </IconButton>
                )}
              </>
            )}
          </Box>
        }
      />
      <CardContent classes={useCardContentStyles()}>{children}</CardContent>
    </Card>
  );
}

CardWrapper.defaultProps = {
  onMinimize: undefined,
  onMaximize: undefined,
  onClose: undefined,
  onRestore: undefined,
};

CardWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isMaximized: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  onClose: PropTypes.func,
  onRestore: PropTypes.func,
};
CardWrapper.defaultProps = {
  className: '',
};
export default CardWrapper;
