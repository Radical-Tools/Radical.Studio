import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CommonForm from '../common/CommonForm';

const PropertiesToolbarWidget = (props) => {
  const { sandbox, upsertItem } = props;

  return (
    <div>
      <Box p={1}>
        {sandbox.data && (
          <CommonForm
            uiSchema={sandbox.ui}
            onSubmit={upsertItem}
            dataSchema={sandbox.data}
            testId="edit-attributes"
          />
        )}
      </Box>
    </div>
  );
};

PropertiesToolbarWidget.propTypes = {
  sandbox: PropTypes.objectOf(PropTypes.any).isRequired,
  upsertItem: PropTypes.func.isRequired,
};

export default React.memo(PropertiesToolbarWidget);
