import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import PropTypes from 'prop-types';

const LinkingPanel = ({ label, onClick }) => (
  <Chip className="controlEl" label={label} size="small" onClick={onClick} />
);

LinkingPanel.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LinkingPanel;
