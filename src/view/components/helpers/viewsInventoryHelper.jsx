import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
      display: true,
    },
  },
];

export const createCustomRow = (onSelected) => (rowData) => {
  const [id, name, actions] = rowData;
  return (
    <ViewsInventoryRow
      key={id}
      id={id}
      name={name}
      actions={actions}
      onSelected={onSelected}
    />
  );
};

const ViewsInventoryRow = (props) => {
  const { id, name, actions, onSelected } = props;
  return (
    <tr>
      <td>
        <Box fontWeight="fontWeightBold" style={{ paddingLeft: '10px' }}>
          <Typography variant="OVERLINE" onClick={() => onSelected(id)}>
            {name}
          </Typography>
        </Box>
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
