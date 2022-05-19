import * as React from 'react';
import PropTypes from 'prop-types';
import { LAYOUT_COLOR } from '../../../app/consts';

const Entity = ({
  width,
  height,
  isSelected,
  isExpanded,
  showComponentTypeText,
}) =>
  isExpanded ? (
    <rect
      fill="#5a8dfa"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : '#808080'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
      strokeWidth={isSelected ? 2 : 1}
    />
  ) : (
    <>
      <rect
        fill="#5a8dfa"
        fillOpacity="1.0"
        stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
        rx="10"
        ry="10"
        x="2"
        y="2"
        width={width - 4}
        height={height - 4}
        strokeWidth={isSelected ? 2 : 2}
      />
      {showComponentTypeText && (
        <text x="34" y="85" fontSize="30px" fill="white">
          Entity
        </text>
      )}
    </>
  );
Entity.defaultProps = {
  showComponentTypeText: false,
  isSelected: false,
  isExpanded: false,
};
Entity.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isExpanded: PropTypes.bool,
  showComponentTypeText: PropTypes.bool,
};

const ERDIcons = {
  Entity,
};

export default ERDIcons;
