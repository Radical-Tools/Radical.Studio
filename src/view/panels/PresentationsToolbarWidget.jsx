import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
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
        <Tooltip title="Play selected presentation">
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