import React, { useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import PropTypes from 'prop-types';

const getRows = (presentationModel) => {
  const data = [];
  Object.entries(presentationModel.presentations).forEach(
    ([id, presentation]) => {
      data.push({
        id,
        name: presentation.name,
      });
    }
  );
  return data;
};

/* eslint-disable react/prop-types */
const columns = [
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
    editable: () => true,
  },
];

const filterValue = [
  { name: 'name', operator: 'contains', type: 'string', value: '' },
];

const gridStyle = { height: '100%' };

const PresentationGridWidget = ({
  presentationModel,
  onUpdatePresentationName,
  onRemovePresentation,
  onPresentationActivate,
}) => {
  const onRemovePresentationCallback = useCallback(
    (id) => onRemovePresentation(id),
    [onRemovePresentation]
  );

  const onPresentationEditComplete = useCallback(
    (item) => onUpdatePresentationName(item.data.id, item.value),
    [onUpdatePresentationName]
  );

  const onPresentationActivateCallback = useCallback(
    (id) => onPresentationActivate(id),
    [onPresentationActivate]
  );

  /* eslint-disable no-param-reassign */
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true;
    menuProps.items = [
      {
        label: 'Remove',
        onClick: () => {
          onRemovePresentationCallback(rowProps.id);
        },
      },
    ];
  };

  return (
    <ReactDataGrid
      idProperty="id"
      columns={columns}
      dataSource={getRows(presentationModel)}
      style={gridStyle}
      defaultFilterValue={filterValue}
      showColumnMenuTool={false}
      renderRowContextMenu={renderRowContextMenu}
      onEditComplete={onPresentationEditComplete}
      onSelectionChange={(data) =>
        onPresentationActivateCallback(data.selected)
      }
      selected={presentationModel.current}
      showHoverRows={false}
      toggleRowSelectOnClick={false}
      preventRowSelectionOnClickWithMouseMove={false}
      scrollTopOnFilter={false}
      enableKeyboardNavigation={false}
    />
  );
};

PresentationGridWidget.propTypes = {
  presentationModel: PropTypes.objectOf(PropTypes.any).isRequired,
  onUpdatePresentationName: PropTypes.func.isRequired,
  onRemovePresentation: PropTypes.func.isRequired,
  onPresentationActivate: PropTypes.func.isRequired,
};

export default PresentationGridWidget;
