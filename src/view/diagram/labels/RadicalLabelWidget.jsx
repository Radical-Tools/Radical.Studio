import * as React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';

const RadicalLabelWidget = ({ visible, label, label2 }) => {
  if (visible) {
    return (
      <Box
        bgcolor="palette.background.paper"
        borderRadius={12}
        p={0.5}
        alignItems="center"
      >
        <Typography variant="subtitle2">{label}</Typography>
        <Divider />
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
};

export default React.memo(RadicalLabelWidget);
