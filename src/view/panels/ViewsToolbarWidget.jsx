import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ViewGridWidget from '../widgets/ViewGridWidget';

const ViewsToolbarWidget = (props) => {
  const {
    viewModel,
    current,
    editMode,
    onRemoveView,
    onUpsertItem,
    onViewActivate,
  } = props;

  const onUpsertViewCallback = useCallback(
    () => onUpsertItem({ name: 'New View' }),
    [onUpsertItem]
  );

  return (
    <Box p={1} style={{ height: '100%' }}>
      <ViewGridWidget
        viewModel={viewModel}
        current={current}
        editMode={editMode}
        onUpsertItem={onUpsertItem}
        onRemoveView={onRemoveView}
        onViewActivate={onViewActivate}
      />
      {editMode && (
        <div style={{ position: 'absolute', top: 45, right: 30 }}>
          <Tooltip title="Add New View">
            <IconButton size="small" onClick={onUpsertViewCallback}>
              <AddCircleRoundedIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Box>
  );
};

ViewsToolbarWidget.defaultProps = {
  current: undefined,
};

ViewsToolbarWidget.propTypes = {
  viewModel: PropTypes.objectOf(PropTypes.any).isRequired,
  current: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  onUpsertItem: PropTypes.func.isRequired,
  onRemoveView: PropTypes.func.isRequired,
  onViewActivate: PropTypes.func.isRequired,
};

export default React.memo(ViewsToolbarWidget);
