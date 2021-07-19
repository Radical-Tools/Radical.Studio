import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useInventoryStyle = makeStyles(() => ({
  paper: {
    width: '100%',
    boxShadow: 'none',
  },
}));

const Inventory = ({
  data,
  onRemoveItem,
  onEditItem,
  onAddItemToView,
  customRowFactory,
  columns,
}) => {
  const removeItemCallback = useCallback(
    (id) => onRemoveItem(id),
    [onRemoveItem]
  );
  const editItemCallback = useCallback((id) => onEditItem(id), [onEditItem]);
  const addToViewCallback = useCallback(
    (id) => onAddItemToView(id),
    [onAddItemToView]
  );

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    viewColumns: false,
    selectableRows: 'none',
    rowsPerPage: 10,
    rowsPerPageOptions: [10],
    customRowRender: customRowFactory(editItemCallback),
  };

  return (
    <MUIDataTable
      classes={useInventoryStyle()}
      data={data}
      columns={[
        ...columns,
        ...[
          {
            name: 'actions',
            label: 'Actions',
            options: {
              display: false,
              filter: false,
              customBodyRender: (value, tableMeta) => (
                <Box pr={1}>
                  {onAddItemToView && (
                    <Tooltip title="add to view">
                      <IconButton
                        size="small"
                        aria-label="add to view"
                        onClick={() => addToViewCallback(tableMeta.rowData[0])}
                      >
                        <AddRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="delete">
                    <IconButton
                      size="small"
                      aria-label="delete"
                      onClick={() => removeItemCallback(tableMeta.rowData[0])}
                    >
                      <BackspaceRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              ),
              setCellProps: () => ({
                align: 'right',
              }),
            },
          },
        ],
      ]}
      options={options}
    />
  );
};

Inventory.defaultProps = {
  onAddItemToView: undefined,
};

Inventory.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
  columns: PropTypes.array.isRequired, // eslint-disable-line
  onRemoveItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onAddItemToView: PropTypes.func,
  customRowFactory: PropTypes.func.isRequired,
};

export default React.memo(Inventory);
