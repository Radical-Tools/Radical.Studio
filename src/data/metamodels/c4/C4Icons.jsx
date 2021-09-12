import * as React from 'react';
import PropTypes from 'prop-types';
import { LAYOUT_COLOR } from '../../../app/consts';

function C4Container({ width, height, isSelected, isExpanded }) {
  return isExpanded ? (
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
      fill="#287ac9"
      fillOpacity="1.0"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth={isSelected ? 4 : 2}
    />
  );
}

C4Container.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

function C4Component({ width, height, isSelected, isExpanded }) {
  return isExpanded ? (
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
      fill="#438dd5"
      fillOpacity="1.0"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth={isSelected ? 4 : 2}
    />
  );
}

C4Component.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

function C4System({ width, height, isSelected, isExpanded }) {
  return isExpanded ? (
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
      fill="#075bad"
      fillOpacity="1.0"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth={isSelected ? 4 : 2}
    />
  );
}

C4System.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

function C4ExternalSystem({ width, height, isSelected }) {
  return (
    <rect
      fill="#7d7d7d"
      fillOpacity="1.0"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth={isSelected ? 4 : 2}
    />
  );
}

C4ExternalSystem.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

function C4Actor({ width, height, isSelected, text }) {
  return (
    <g>
      <rect
        fill="#0f4880"
        fillOpacity="1.0"
        stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
        rx="20"
        ry="20"
        x="5"
        y="40"
        strokeWidth={isSelected ? 4 : 2}
        width={width - 10}
        height={height - 45}
      />
      {text && (
        <text x="32" y="94" fontSize="35px" fill="white">
          {text}
        </text>
      )}

      <circle
        fill="#0f4880"
        stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
        fillOpacity="1.0"
        cx="75"
        cy="30"
        r="27"
        strokeWidth={isSelected ? 4 : 2}
      />
    </g>
  );
}
C4Actor.defaultProps = {
  text: undefined,
};
C4Actor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

function C4Database({ width, height, isSelected }) {
  return (
    <g>
      <rect
        stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
        fill="#438dd5"
        fillOpacity="1.0"
        rx="0"
        ry="0"
        x="2"
        y="20"
        width={width - 4}
        height={height - 42}
        strokeWidth={2}
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
        cx="75"
        cy="108"
        rx="72"
        ry="20"
        strokeWidth={isSelected ? '2' : '0'}
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
        cx="75"
        cy="22"
        rx="73"
        ry="20"
        strokeWidth={isSelected ? 4 : 2}
      />
    </g>
  );
}

C4Database.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const C4Icons = {
  Actor: C4Actor,
  Container: C4Container,
  System: C4System,
  Component: C4Component,
  'External System': C4ExternalSystem,
  Database: C4Database,
};

export default C4Icons;
