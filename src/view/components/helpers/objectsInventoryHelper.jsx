import React from 'react';

import { useDrag } from 'react-dnd';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { MODEL_DROP_TYPE } from '../../diagram/consts';

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
  const [id, name, type, actions] = rowData;
  return (
    <ObjectsInventoryRow
      key={id}
      id={id}
      name={name}
      type={type}
      actions={actions}
      onSelected={onSelected}
    />
  );
};

const ObjectsInventoryRow = (props) => {
  const { id, name, type, actions, onSelected } = props;

  const [, drag] = useDrag({
    item: { id, type: MODEL_DROP_TYPE },
    type: MODEL_DROP_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <tr style={{ borderBottom: '0.5pt solid #dbdbdb' }}>
      <td style={{ paddingLeft: '5px' }}>
        <Box fontWeight="fontWeightBold">
          <Typography variant="BUTTON">{name}</Typography>
        </Box>
      </td>
      <td>
        <Chip
          label={type}
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
  type: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
  onSelected: PropTypes.func.isRequired,
};
