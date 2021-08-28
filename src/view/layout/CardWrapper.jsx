import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import MinimizeRoundedIcon from '@material-ui/icons/MinimizeRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded';
import Typography from '@material-ui/core/Typography';

const headerHeight = 37;
const cardStyles = {
  padding: 0,
  height: '100%',
};
const iconButtonStyle = {
  marginTop: '7px',
  marginRight: '2px',
  color: '#ffffff',
};

const cardHeaderStyle = {
  backgroundColor: 'primary.main',
  padding: 0,
  paddingRight: '10px',
  paddingLeft: '10px',
  color: 'white',
  height: `${headerHeight}px`,
};

const cardContentStyle = {
  padding: 0,
  height: `calc(100% - ${headerHeight}px)`,
  overflow: 'auto',
  '&:last-child': {
    paddingBottom: 0,
  },
};

function CardWrapper({
  title,
  icon,
  onMinimize,
  onMaximize,
  onClose,
  onRestore,
  id,
  children,
  className,
  isMaximized,
}) {
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
    <Card elevation={3} sx={cardStyles}>
      <CardHeader
        sx={cardHeaderStyle}
        className={className}
        title={
          icon ? (
            <>
              <icon />
              <Typography variant="h6">{title}</Typography>
            </>
          ) : (
            <Typography variant="h6">{title}</Typography>
          )
        }
        action={
          <Box>
            {isMaximized && onRestore ? (
              <IconButton
                size="small"
                label="Restore"
                sx={iconButtonStyle}
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
                    sx={iconButtonStyle}
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
                    sx={iconButtonStyle}
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
                    sx={iconButtonStyle}
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
      <CardContent sx={cardContentStyle}>{children}</CardContent>
    </Card>
  );
}

CardWrapper.defaultProps = {
  icon: undefined,
  onMinimize: undefined,
  onMaximize: undefined,
  onClose: undefined,
  onRestore: undefined,
};

CardWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.any),
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