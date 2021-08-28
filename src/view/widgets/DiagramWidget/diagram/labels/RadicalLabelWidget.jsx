import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import EditableLabel from '../../../../components/EditableLabel';

const RadicalLabelWidget = ({ visible, label, label2, link }) => {
  if (visible) {
    return (
      <Box bgcolor="background.paper" textAlign="center">
        <EditableLabel
          editedItem={link}
          isItemSelected
          variant="subtitle2"
          label={label}
        />
        <Typography variant="caption">{label2}</Typography>
      </Box>
    );
  }
  return <div />;
};
RadicalLabelWidget.propTypes = {
  visible: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  link: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default React.memo(RadicalLabelWidget);
