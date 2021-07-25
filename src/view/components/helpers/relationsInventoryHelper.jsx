import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const transform = (model) => {
  const data = [];

  Object.entries(model.relations).forEach(([id, relation]) => {
    data.push({
      id,
      name: relation.name,
      source: model.objects[relation.source].name,
      target: model.objects[relation.target].name,
      type: relation.type,
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
      display: true,
      filter: false,
    },
  },
  {
    name: 'source',
    label: 'Source',
    options: {
      display: true,
    },
  },
  {
    name: 'target',
    label: 'Target',
    options: {
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
];

export const createCustomRow = (onSelected) => (rowData) => {
  const [id, name, source, target, type, actions] = rowData;
  return (
    <RelationsInventoryRow
      key={id}
      id={id}
      name={name}
      source={source}
      target={target}
      type={type}
      actions={actions}
      onSelected={onSelected}
    />
  );
};

const RelationsInventoryRow = (props) => {
  const { id, name, source, target, type, actions, onSelected } = props;

  return (
    <tr style={{ borderBottom: '0.5pt solid #dbdbdb' }}>
      <td>
        <Box fontWeight="fontWeightBold" style={{ paddingLeft: '10px' }}>
          <Typography variant="BUTTON" onClick={() => onSelected(id)}>
            {name}
          </Typography>
        </Box>
      </td>
      <td>
        <Box fontWeight="fontWeightBold" style={{ paddingLeft: '15px' }}>
          <Typography variant="caption">{source}</Typography>
        </Box>
      </td>
      <td>
        <Box fontWeight="fontWeightBold" style={{ paddingLeft: '15px' }}>
          <Typography variant="caption">{target}</Typography>
        </Box>
      </td>
      <td>
        <Typography variant="caption" style={{ paddingLeft: '15px' }}>
          {type}
        </Typography>
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
  type: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
  onSelected: PropTypes.func.isRequired,
};
