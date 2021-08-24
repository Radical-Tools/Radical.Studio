import React, { useCallback, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import PropTypes from 'prop-types';
import zipObjectDeep from 'lodash/fp/zipObjectDeep';
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter';
import { getRelationGridItem } from '../../getDataTestId';

const getRows = (model) => {
  const data = [];

  Object.entries(model.relations).forEach(([id, relation]) => {
    data.push({
      id,
      name: relation.name,
      source: model.objects[relation.source].name,
      target: model.objects[relation.target].name,
      type: relation.type,
      'attributes.technology': relation.attributes
        ? relation.attributes.technology
        : undefined,
      'attributes.description': relation.attributes
        ? relation.attributes.description
        : undefined,
    });
  });

  return data;
};

const getSelected = (currentView) => {
  const selectedRelations = Object.entries(currentView.links).filter(
    ([, value]) => value.isSelected === true
  );
  return selectedRelations.length > 0 ? selectedRelations[0][0] : undefined;
};

/* eslint-disable react/prop-types */
const columns = [
  {
    name: 'id',
    header: 'Id',
    minWidth: 50,
    defaultFlex: 2,
    editable: () => false,
    defaultVisible: false,
  },
  {
    name: 'name',
    header: 'Name',
    minWidth: 50,
    defaultFlex: 2,
    editable: () => true,
    render: ({ value }) => (
      <div data-testid={getRelationGridItem(value)}>{value}</div>
    ),
  },
  {
    name: 'type',
    header: 'Type',
    minWidth: 30,
    defaultFlex: 2,
    editable: () => false,
    filterEditor: SelectFilter,
    filterEditorProps: {
      multiple: true,
      wrapMultiple: false,
      dataSource: ['Interacts', 'Includes'].map((c) => ({ id: c, label: c })),
    },
  },
  {
    name: 'source',
    header: 'Source',
    minWidth: 50,
    defaultFlex: 2,
    editable: () => false,
  },
  {
    name: 'target',
    header: 'Target',
    minWidth: 50,
    defaultFlex: 2,
    editable: () => false,
  },
  {
    name: 'attributes.technology',
    header: 'Technology',
    minWidth: 0,
    defaultFlex: 2,
    editable: () => true,
    visible: true,
  },
  {
    name: 'attributes.description',
    header: 'Description',
    minWidth: 0,
    defaultFlex: 2,
    editable: () => true,
    defaultVisible: false,
  },
];

const filterValue = [
  { name: 'name', operator: 'contains', type: 'string', value: '' },
  { name: 'type', operator: 'inlist', type: 'select' },
  { name: 'source', operator: 'contains', type: 'string', value: '' },
  { name: 'target', operator: 'contains', type: 'string', value: '' },
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

const RelationGridWidget = ({
  model,
  viewModel,
  onRemoveRelation,
  onUpsertItem,
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

  const onRemoveRelationCallback = useCallback(
    (id) => onRemoveRelation(id),
    [onRemoveRelation]
  );

  const onRelationEditComplete = useCallback(
    (item) =>
      onUpsertItem('Relation', {
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
          onRemoveRelationCallback(rowProps.id);
        },
      },
    ];
  };

  const selected = getSelected(viewModel.views[viewModel.current]);

  if (gridRef) {
    if (gridRef.current.getVirtualList()) {
      scrollTo(selected);
    }
  }

  return (
    <ReactDataGrid
      onReady={setGridRef}
      id="relationsGrid"
      idProperty="id"
      columns={columns}
      dataSource={getRows(model)}
      style={gridStyle}
      defaultFilterValue={filterValue}
      showColumnMenuTool={false}
      renderRowContextMenu={renderRowContextMenu}
      onEditComplete={onRelationEditComplete}
      selected={selected}
      showHoverRows={false}
      toggleRowSelectOnClick={false}
      preventRowSelectionOnClickWithMouseMove={false}
      scrollTopOnFilter={false}
      enableKeyboardNavigation={false}
    />
  );
};

RelationGridWidget.propTypes = {
  model: PropTypes.objectOf(PropTypes.any).isRequired,
  viewModel: PropTypes.objectOf(PropTypes.any).isRequired,
  onRemoveRelation: PropTypes.func.isRequired,
  onUpsertItem: PropTypes.func.isRequired,
};

export default RelationGridWidget;
