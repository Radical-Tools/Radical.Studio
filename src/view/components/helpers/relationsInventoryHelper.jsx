import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

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
      key={id}
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

  return (
    <tr>
      <td>
        <Typography variant="caption">{source}</Typography>
      </td>
      <td>
        <Chip
          color="primary"
          label={`${name} >`}
          size="small"
          onClick={() => onSelected(id)}
        />
      </td>
      <td style={{ textAlign: 'right' }}>
        <Typography variant="caption">{target}</Typography>
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
