import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
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
  customRowFactory,
  columns,
}) => {
  const removeItemCallback = useCallback((id) => onRemoveItem(id), [
    onRemoveItem,
  ]);

  const editItemCallback = useCallback((id) => onEditItem(id), [onEditItem]);

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    viewColumns: false,
    selectableRows: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10],
    customRowRender: customRowFactory(editItemCallback),
    // tableBodyHeight: '200px',
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
Inventory.propTypes = {
  data: PropTypes.array.isRequired, // eslint-disable-line
  columns: PropTypes.array.isRequired, // eslint-disable-line
  onRemoveItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  customRowFactory: PropTypes.func.isRequired,
};

export default React.memo(Inventory);
