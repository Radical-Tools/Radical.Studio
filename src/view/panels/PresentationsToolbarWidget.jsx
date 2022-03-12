import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import PresentationGridWidget from '../widgets/PresentationGridWidget';
import { LAYOUT_MODE } from '../../app/consts';

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
    () => onCreatePresentation('New Presentation'),
    [onCreatePresentation]
  );

  return (
    <Box p={1} style={{ height: '100%' }}>
      <PresentationGridWidget
        presentationModel={presentationModel}
        onUpdatePresentationName={onUpdatePresentationName}
        onRemovePresentation={onRemovePresentation}
        onPresentationActivate={onPresentationActivate}
      />
      <div style={{ position: 'absolute', top: 45, right: 30 }}>
        <Tooltip title="Add New Presentation">
          <IconButton size="small" onClick={onCreatePresentationCallback}>
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
