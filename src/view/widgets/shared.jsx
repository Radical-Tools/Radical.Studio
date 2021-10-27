import React from 'react';

const descriptionColumnCellConfig = {
  cellProps: {
    style: { padding: 0 },
  },
  // eslint-disable-next-line react/prop-types
  render: ({ value }) => (
    <div style={{ whiteSpace: 'normal', overflow: 'auto', height: '40px' }}>
      {value}
    </div>
  ),
};
export default descriptionColumnCellConfig;
