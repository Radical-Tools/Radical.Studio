import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import FullscreenExitRoundedIcon from '@mui/icons-material/FullscreenExitRounded';
import Typography from '@mui/material/Typography';

const headerHeight = 33;
const cardStyles = {
  padding: 0,
  height: '100%',
};
const iconButtonStyle = {
  marginTop: '5px',
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

const cardContentStyle = (removeOverflow) => ({
  padding: 0,
  height: `calc(100% - ${headerHeight}px)`,
  '&:last-child': {
    paddingBottom: 0,
  },
  overflow: removeOverflow ? 'unset' : 'auto',
});

const headlessCardContentStyle = (removeOverflow) => ({
  padding: 0,
  height: '100%',
  '&:last-child': {
    paddingBottom: 0,
  },
  overflow: removeOverflow ? 'unset' : 'auto',
});

const CardWrapper = ({
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
  removeOverflow,
  headless,
}) => {
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
      {!headless && (
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
      )}
      <CardContent
        sx={
          headless
            ? headlessCardContentStyle(removeOverflow)
            : cardContentStyle(removeOverflow)
        }
      >
        {children}
      </CardContent>
    </Card>
  );
};

CardWrapper.defaultProps = {
  icon: undefined,
  onMinimize: undefined,
  onMaximize: undefined,
  onClose: undefined,
  onRestore: undefined,
  removeOverflow: false,
  headless: false,
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
  removeOverflow: PropTypes.bool,
  headless: PropTypes.bool,
};
CardWrapper.defaultProps = {
  className: '',
};
export default CardWrapper;
