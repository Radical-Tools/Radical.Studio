import * as React from 'react';
import PropTypes from 'prop-types';
import { LAYOUT_COLOR } from '../../../../../app/consts';

const GenericIcon = ({ width, height, isSelected, isExpanded }) =>
  isExpanded ? (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : '#808080'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
      strokeWidth={isSelected ? 4 : 1}
    />
  ) : (
    <rect
      fill="#0099cc"
      fillOpacity="1.0"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
      strokeWidth={isSelected ? 4 : 1}
    />
  );

GenericIcon.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default GenericIcon;
