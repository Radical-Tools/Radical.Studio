import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import * as viewsInventory from '../helpers/viewsInventoryHelper';
import Inventory from '../common/Inventory';

const ViewsToolbarWidget = (props) => {
  const { viewModel, onEditView, onRemoveView, onCreateView } = props;

  const onEditViewCallback = useCallback((id) => onEditView(id), [onEditView]);

  const onRemoveViewCallback = useCallback(
    (id) => onRemoveView(id),
    [onRemoveView]
  );

  const onCrateViewCallback = useCallback(() => onCreateView(), [onCreateView]);

  return (
    <div>
      <Box p={1}>
        <Inventory
          data={viewsInventory.transform(viewModel)}
          onRemoveItem={onRemoveViewCallback}
          onEditItem={onEditViewCallback}
          onCreateItem={onCrateViewCallback}
          customRowFactory={viewsInventory.createCustomRow}
          columns={viewsInventory.columns}
        />
      </Box>
    </div>
  );
};

ViewsToolbarWidget.propTypes = {
  model: PropTypes.object.isRequired, // eslint-disable-line
  viewModel: PropTypes.object.isRequired, // eslint-disable-line
  onCreateView: PropTypes.func.isRequired,
  onEditView: PropTypes.func.isRequired,
  onRemoveView: PropTypes.func.isRequired,
};

export default React.memo(ViewsToolbarWidget);
