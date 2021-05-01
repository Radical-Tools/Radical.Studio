import { useDrag } from 'react-dnd';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import React from 'react';

export const transform = (viewModel) => {
  const data = [];
  Object.entries(viewModel.views).forEach(([id, view]) => {
    data.push({
      id,
      name: view.name,
    });
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
      display: false,
    },
  },
];

export const createCustomRow = (onSelected) => (rowData) => {
  const [id, name, actions] = rowData;
  return (
    <ViewsInventoryRow
      id={id}
      name={name}
      actions={actions}
      onSelected={onSelected}
    />
  );
};

const ViewsInventoryRow = (props) => {
  const { id, name, actions, onSelected } = props;

  const [dragObject] = useDrag({
    item: { type: 'string' },
    begin: () => id,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <tr key={id} ref={dragObject}>
      <td>
        <Chip
          color="primary"
          label={name}
          size="small"
          onClick={() => onSelected(id)}
        />
      </td>
      <td style={{ textAlign: 'right' }}>{actions}</td>
    </tr>
  );
};

ViewsInventoryRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
  onSelected: PropTypes.func.isRequired,
};
