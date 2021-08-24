import React, { useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import PropTypes from 'prop-types';

const getRows = (viewModel) => {
  const data = [];
  Object.entries(viewModel.views).forEach(([id, view]) => {
    data.push({
      id,
      name: view.name,
    });
  });
  return data;
};

/* eslint-disable react/prop-types */
const getColumns = (editMode) => [
  {
    name: 'id',
    header: 'id',
    minWidth: 50,
    defaultFlex: 2,
    visible: false,
    editable: () => false,
  },
  {
    name: 'name',
    header: 'Name',
    minWidth: 50,
    defaultFlex: 4,
    editable: () => editMode,
  },
];

const filterValue = [
  { name: 'name', operator: 'contains', type: 'string', value: '' },
];

const gridStyle = { height: '100%' };

const ViewGridWidget = ({
  viewModel,
  current,
  editMode,
  onRemoveView,
  onUpsertItem,
  onViewActivate,
}) => {
  const onRemoveViewCallback = useCallback(
    (id) => onRemoveView(id),
    [onRemoveView]
  );

  const onViewEditComplete = useCallback(
    (item) =>
      onUpsertItem({
        id: item.data.id,
        name: item.value,
      }),
    [onUpsertItem]
  );

  const onViewActivateCallback = useCallback(
    (id) => onViewActivate(id),
    [onViewActivate]
  );

  /* eslint-disable no-param-reassign */
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true;
    menuProps.items = [
      {
        label: 'Remove',
        onClick: () => {
          onRemoveViewCallback(rowProps.id);
        },
      },
    ];
  };

  return (
    <ReactDataGrid
      idProperty="id"
      columns={getColumns(editMode)}
      dataSource={getRows(viewModel)}
      style={gridStyle}
      defaultFilterValue={filterValue}
      showColumnMenuTool={false}
      renderRowContextMenu={renderRowContextMenu}
      onEditComplete={onViewEditComplete}
      onSelectionChange={(data) => onViewActivateCallback(data.selected)}
      selected={current}
      showHoverRows={false}
      toggleRowSelectOnClick={false}
      preventRowSelectionOnClickWithMouseMove={false}
      scrollTopOnFilter={false}
      enableKeyboardNavigation={false}
    />
  );
};

ViewGridWidget.propTypes = {
  viewModel: PropTypes.objectOf(PropTypes.any).isRequired,
  current: PropTypes.string.isRequired,
  onRemoveView: PropTypes.func.isRequired,
  onUpsertItem: PropTypes.func.isRequired,
  onViewActivate: PropTypes.func.isRequired,
};

export default ViewGridWidget;
