import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import ViewGridWidget from '../widgets/ViewGridWidget';

const ViewsToolbarWidget = (props) => {
  const { viewModel, onRemoveView, onUpsertItem, onViewActivate } = props;

  const onUpsertViewCallback = useCallback(
    () => onUpsertItem({ name: 'New View' }),
    [onUpsertItem]
  );

  return (
    <Box p={1} style={{ height: '100%' }}>
      <ViewGridWidget
        viewModel={viewModel}
        onUpsertItem={onUpsertItem}
        onRemoveView={onRemoveView}
        onViewActivate={onViewActivate}
      />
      <div style={{ position: 'absolute', top: 50, right: 30 }}>
        <Tooltip title="Add New View">
          <IconButton size="small" onClick={onUpsertViewCallback}>
            <AddCircleOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Box>
  );
};

ViewsToolbarWidget.propTypes = {
  viewModel: PropTypes.objectOf(PropTypes.any).isRequired,
  onUpsertItem: PropTypes.func.isRequired,
  onRemoveView: PropTypes.func.isRequired,
  onViewActivate: PropTypes.func.isRequired,
};

export default React.memo(ViewsToolbarWidget);
