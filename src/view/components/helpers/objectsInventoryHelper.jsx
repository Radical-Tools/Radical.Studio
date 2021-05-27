import React from 'react';

import { useDrag } from 'react-dnd';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

export const transform = (objects) => {
  const data = [];

  Object.entries(objects).forEach(([id, value]) => {
    data.push({ id, name: value.name, type: value.type });
  });

  return data;
};

export const columns = [
  {
    name: 'id',
    label: 'Id',
    options: {
      filter: false,
      sort: true,
      display: false,
    },
  },
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: false,
      sort: true,
      display: false,
    },
  },
  {
    name: 'type',
    label: 'Type',
    options: {
      display: false,
    },
  },
];

export const createCustomRow = (onSelected) => (rowData) => {
  const [id, name, , actions] = rowData;
  return (
    <ObjectsInventoryRow
      key={id}
      id={id}
      name={name}
      type={id}
      actions={actions}
      onSelected={onSelected}
    />
  );
};

const ObjectsInventoryRow = (props) => {
  const { id, name, actions, onSelected } = props;

  const [, drag] = useDrag({
    item: { id, type: 'model-object' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <tr>
      <td style={{ paddingLeft: '20px' }}>
        <Chip
          label={name}
          color="primary"
          size="small"
          ref={drag}
          onClick={() => onSelected(id)}
        />
      </td>
      <td style={{ textAlign: 'right' }}>{actions}</td>
    </tr>
  );
};

ObjectsInventoryRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
  onSelected: PropTypes.func.isRequired,
};
