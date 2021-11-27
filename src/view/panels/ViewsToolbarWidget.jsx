import React, { useCallback, useState } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Popover, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

import ViewGridWidget from '../widgets/ViewGridWidget';
import TextFieldDebounced from '../components/TextFieldDebounced';

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
    (name) => onUpsertItem({ name }),
    [onUpsertItem]
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'NewView-Popover' : undefined;

  return (
    <>
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
            <Tooltip title="Add View">
              <IconButton size="small" onClick={handleClick}>
                <AddCircleRoundedIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
        )}
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
            initialValue="New View"
            label="type name and press enter"
            onSubmit={(item) => {
              handleClose();
              onUpsertViewCallback(item);
            }}
          />
        </Box>
      </Popover>
    </>
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
