import React from 'react';

import { useDrag } from 'react-dnd';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { MODEL_DROP_TYPE } from '../../diagram/consts';

export const transform = (objects) => {
  const data = [];

  Object.entries(objects).forEach(([id, value]) => {
    data.push({
      id,
      name: value.name,
      type: value.type,
      technology: value.attributes ? value.attributes.technology : undefined,
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
      sort: false,
      display: false,
    },
  },
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: false,
      sort: true,
      display: true,
    },
  },
  {
    name: 'type',
    label: 'Type',
    options: {
      display: true,
    },
  },
  {
    name: 'technology',
    label: 'Technology',
    options: {
      display: true,
    },
  },
];

export const createCustomRow = (onSelected) => (rowData) => {
  const [id, name, type, technology, actions] = rowData;
  return (
    <ObjectsInventoryRow
      key={id}
      id={id}
      name={name}
      type={type}
      technology={technology}
      actions={actions}
      onSelected={onSelected}
    />
  );
};

const ObjectsInventoryRow = (props) => {
  const { id, name, type, technology, actions, onSelected } = props;

  const [, drag] = useDrag({
    item: { id, type: MODEL_DROP_TYPE },
    type: MODEL_DROP_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <tr style={{ borderBottom: '0.5pt solid #dbdbdb' }}>
      <td>
        <Box
          fontWeight="fontWeightBold"
          ref={drag}
          style={{ paddingLeft: '10px' }}
        >
          <Typography variant="OVERLINE" onClick={() => onSelected(id)}>
            {name}
          </Typography>
        </Box>
      </td>
      <td>
        <Typography variant="caption" style={{ paddingLeft: '15px' }}>
          {type}
        </Typography>
      </td>
      <td>
        <Typography variant="caption" style={{ paddingLeft: '20px' }}>
          {technology}
        </Typography>
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
  technology: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
};
