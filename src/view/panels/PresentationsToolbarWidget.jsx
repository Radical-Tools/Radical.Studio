import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Popover, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import { LAYOUT_MODE } from '../../app/consts';
import TextFieldDebounced from '../components/TextFieldDebounced';
import PresentationGridWidget from '../widgets/PresentationGridWidget';

const PresentationsToolbarWidget = (props) => {
  const {
    presentationModel,
    onRemovePresentation,
    onUpdatePresentationName,
    onCreatePresentation,
    onPresentationActivate,
    onSetMode,
  } = props;

  const onCreatePresentationCallback = useCallback(
    (name) => onCreatePresentation(name),
    [onCreatePresentation]
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'NewPresentation-Popover' : undefined;

  return (
    <>
      <Box p={1} style={{ height: '100%' }}>
        <PresentationGridWidget
          presentationModel={presentationModel}
          onUpdatePresentationName={onUpdatePresentationName}
          onRemovePresentation={onRemovePresentation}
          onPresentationActivate={onPresentationActivate}
        />
        <div style={{ position: 'absolute', top: 45, right: 30 }}>
          <Tooltip title="Add New Presentation">
            <IconButton size="small" onClick={handleClick}>
              <AddCircleRoundedIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Play Selected Presentation">
            <span>
              <IconButton
                size="small"
                onClick={() => onSetMode(LAYOUT_MODE.SHOW)}
                disabled={presentationModel.current === undefined}
              >
                <PlayCircleFilledWhiteRoundedIcon
                  color={
                    presentationModel.current !== undefined
                      ? 'secondary'
                      : 'inherit'
                  }
                />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={1}>
          <TextFieldDebounced
            initialValue="New Presentation"
            label="type name and press enter"
            onSubmit={(item) => {
              handleClose();
              onCreatePresentationCallback(item);
            }}
          />
        </Box>
      </Popover>
    </>
  );
};

PresentationsToolbarWidget.propTypes = {
  presentationModel: PropTypes.objectOf(PropTypes.any).isRequired,
  onRemovePresentation: PropTypes.func.isRequired,
  onUpdatePresentationName: PropTypes.func.isRequired,
  onCreatePresentation: PropTypes.func.isRequired,
  onPresentationActivate: PropTypes.func.isRequired,
  onSetMode: PropTypes.func.isRequired,
};

export default React.memo(PresentationsToolbarWidget);
