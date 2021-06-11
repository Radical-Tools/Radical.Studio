import * as React from 'react';
import PropTypes from 'prop-types';

export function C4Container({ width, height, isSelected, isExpanded }) {
  return isExpanded ? (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={isSelected ? '#080808' : '#808080'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
      strokeWidth="1"
    />
  ) : (
    <rect
      fill="#438dd5"
      fillOpacity="1.0"
      stroke={isSelected ? '#505050' : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth="2"
    />
  );
}

C4Container.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export function C4Component({ width, height, isSelected }) {
  return (
    <rect
      fill="#85bbf0"
      fillOpacity="1.0"
      stroke={isSelected ? '#505050' : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth="2"
    />
  );
}

C4Component.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export function C4System({ width, height, isSelected, isExpanded }) {
  return isExpanded ? (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={isSelected ? '#080808' : '#808080'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
      strokeWidth="1"
    />
  ) : (
    <rect
      fill="#1168bd"
      fillOpacity="1.0"
      stroke={isSelected ? '#505050' : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth="2"
    />
  );
}

C4System.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export function C4ExternalSystem({ width, height, isSelected }) {
  return (
    <rect
      fill="#999999"
      fillOpacity="1.0"
      stroke={isSelected ? '#505050' : 'white'}
      rx="10"
      ry="10"
      x="2"
      y="2"
      width={width - 4}
      height={height - 4}
      strokeWidth="2"
    />
  );
}

C4ExternalSystem.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export function C4Actor({ width, height, isSelected }) {
  return (
    <g>
      <rect
        fill="#2072C3"
        fillOpacity="1.0"
        stroke={isSelected ? '#505050' : 'white'}
        rx="20"
        ry="20"
        x="5"
        y="40"
        strokeWidth="2"
        width={width - 10}
        height={height - 45}
      />
      <circle
        fill="#2072C3"
        stroke={isSelected ? '#505050' : 'white'}
        fillOpacity="1.0"
        cx="75"
        cy="30"
        r="27"
        strokeWidth="2"
      />
    </g>
  );
}

C4Actor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export function C4Database({ width, height, isSelected }) {
  return (
    <g>
      <rect
        stroke={isSelected ? '#505050' : 'white'}
        fill="#438dd5"
        fillOpacity="1.0"
        rx="0"
        ry="0"
        x="2"
        y="20"
        width={width - 4}
        height={height - 42}
        strokeWidth="2"
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={isSelected ? '#505050' : 'white'}
        cx="75"
        cy="108"
        rx="72"
        ry="20"
        strokeWidth={isSelected ? '2' : '0'}
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={isSelected ? '#505050' : 'white'}
        cx="75"
        cy="22"
        rx="73"
        ry="20"
        strokeWidth="2"
      />
    </g>
  );
}

C4Database.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
