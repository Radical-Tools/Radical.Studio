import React, { useCallback, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import zipObjectDeep from 'lodash/fp/zipObjectDeep';
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter';
import { MODEL_DROP_TYPE } from './DiagramWidget/diagram/consts';
import { getObjectGridName } from '../../tests/getDataTestId';
import descriptionColumnCellConfig from './shared';

const getRows = (model) => {
  const data = [];
  Object.entries(model.objects).forEach(([id, value]) => {
    data.push({
      id,
      name: value.name,
      type: value.type,
      'attributes.technology': value.attributes
        ? value.attributes.technology
        : undefined,
      'attributes.description': value.attributes
        ? value.attributes.description
        : undefined,
    });
  });
  return data;
};

const getSelected = (currentView) => {
  const selectedNodes = Object.entries(currentView.nodes).filter(
    ([, value]) => value.isSelected === true
  );
  return selectedNodes.length > 0 ? selectedNodes[0][0] : undefined;
};

const DraggableCell = ({ value, data }) => {
  const [, drag] = useDrag({
    item: { id: data.id, type: MODEL_DROP_TYPE },
    type: MODEL_DROP_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div data-testid={getObjectGridName(value)} ref={drag}>
      {value}
    </div>
  );
};

DraggableCell.propTypes = {
  value: PropTypes.string.isRequired, // eslint-disable-line
  data: PropTypes.object.isRequired, // eslint-disable-line
};

/* eslint-disable react/prop-types */
const getColumns = (isDescriptionVisible = false) => [
  {
    name: 'id',
    header: 'Id',
    minWidth: 50,
    defaultFlex: 2,
    defaultVisible: false,
    editable: () => false,
  },
  {
    name: 'name',
    header: 'Name',
    minWidth: 50,
    defaultFlex: 2,
    editable: () => true,
    render: ({ value, data }) => <DraggableCell value={value} data={data} />,
  },
  {
    name: 'type',
    header: 'Type',
    minWidth: 50,
    defaultFlex: 1,
    editable: () => false,
    filterEditor: SelectFilter,
    filterEditorProps: {
      multiple: true,
      wrapMultiple: false,
      dataSource: [
        'System',
        'Actor',
        'Container',
        'Component',
        'Database',
        'External Database',
      ].map((c) => ({ id: c, label: c })),
    },
  },
  {
    name: 'attributes.technology',
    header: 'Technology',
    minWidth: 50,
    defaultFlex: 1,
    editable: () => true,
    defaultVisible: true,
  },
  {
    name: 'attributes.description',
    header: 'Description',
    minWidth: 0,
    defaultFlex: 2,
    defaultVisible: false,
    editable: () => true,
    visible: isDescriptionVisible,
    ...descriptionColumnCellConfig,
  },
];

const filterValue = [
  { name: 'name', operator: 'contains', type: 'string', value: '' },
  { name: 'type', operator: 'inlist', type: 'select' },
  {
    name: 'attributes.technology',
    operator: 'contains',
    type: 'string',
    value: '',
  },
  {
    name: 'attributes.description',
    operator: 'contains',
    type: 'string',
    value: '',
  },
];

const gridStyle = { height: '100%' };

const ObjectGridWidget = ({
  model,
  viewModel,
  onRemoveObject,
  onUpsertItem,
  isDescriptionVisible,
}) => {
  const [gridRef, setGridRef] = useState(null);
  const scrollTo = useCallback(
    (id) => {
      if (gridRef.current) {
        gridRef.current.scrollToId(id, { duration: 300 });
      }
    },
    [gridRef]
  );

  const onRemoveObjectCallback = useCallback(
    (id) => onRemoveObject(id),
    [onRemoveObject]
  );

  const onObjectEditComplete = useCallback(
    (item) =>
      onUpsertItem('Object', {
        id: item.data.id,
        ...zipObjectDeep([item.columnId], [item.value]),
      }),
    [onUpsertItem]
  );

  /* eslint-disable no-param-reassign */
  const renderRowContextMenu = (menuProps, { rowProps }) => {
    menuProps.autoDismiss = true;
    menuProps.items = [
      {
        label: 'Remove',
        onClick: () => {
          onRemoveObjectCallback(rowProps.id);
        },
      },
    ];
  };

  const selectedObject = getSelected(viewModel.views[viewModel.current]);

  if (gridRef) {
    if (gridRef.current.getVirtualList()) {
      scrollTo(selectedObject);
    }
  }

  return (
    <ReactDataGrid
      onReady={setGridRef}
      id="objectsGrid"
      idProperty="id"
      columns={getColumns(isDescriptionVisible)}
      dataSource={getRows(model)}
      style={gridStyle}
      defaultFilterValue={filterValue}
      showColumnMenuTool={false}
      renderRowContextMenu={renderRowContextMenu}
      onEditComplete={onObjectEditComplete}
      selected={selectedObject}
      showHoverRows={false}
      toggleRowSelectOnClick={false}
      preventRowSelectionOnClickWithMouseMove={false}
      scrollTopOnFilter={false}
      enableKeyboardNavigation={false}
    />
  );
};

ObjectGridWidget.propTypes = {
  model: PropTypes.objectOf(PropTypes.any).isRequired,
  viewModel: PropTypes.objectOf(PropTypes.any).isRequired,
  onRemoveObject: PropTypes.func.isRequired,
  onUpsertItem: PropTypes.func.isRequired,
  isDescriptionVisible: PropTypes.bool.isRequired,
};

export default ObjectGridWidget;
