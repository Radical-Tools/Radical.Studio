import { useDrag } from 'react-dnd';
import Chip from '@material-ui/core/Chip';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import PropTypes from 'prop-types';
import React from 'react';

export const transform = (model) => {
  const data = [];

  Object.entries(model.relations).forEach(([id, relation]) => {
    data.push({
      id,
      name: relation.name,
      source: model.objects[relation.source].name,
      target: model.objects[relation.target].name,
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
  {
    name: 'source',
    label: 'Source',
    options: {
      display: false,
    },
  },
  {
    name: 'target',
    label: 'Target',
    options: {
      display: false,
    },
  },
];

export const createCustomRow = (onSelected) => (rowData) => {
  const [id, name, source, target, actions] = rowData;
  return (
    <RelationsInventoryRow
      id={id}
      name={name}
      source={source}
      target={target}
      actions={actions}
      onSelected={onSelected}
    />
  );
};

const RelationsInventoryRow = (props) => {
  const { id, name, source, target, actions, onSelected } = props;

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
      <td
        style={{
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: '0px',
          textAlign: 'right',
        }}
      >
        <Chip color="secondary" label={source} size="small" />
      </td>
      <td>
        <ArrowForwardRoundedIcon />
      </td>
      <td style={{ paddingLeft: '10px', textAlign: 'left' }}>
        <Chip color="secondary" label={target} size="small" />
      </td>
      <td style={{ textAlign: 'right' }}>{actions}</td>
    </tr>
  );
};

RelationsInventoryRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
  onSelected: PropTypes.func.isRequired,
};
