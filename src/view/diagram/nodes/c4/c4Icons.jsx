import * as React from 'react';
import PropTypes from 'prop-types';

export function C4Container({ width, height, isSelected, isExpanded }) {
  return isExpanded ? (
    <rect
      fill="#1168bd"
      fillOpacity="0.01"
      strokeDasharray="5 10"
      stroke={isSelected ? 'black' : 'gray'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  ) : (
    <rect
      fill="#438dd5"
      fillOpacity="1.0"
      stroke={isSelected ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
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
      stroke={isSelected ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
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
      stroke={isSelected ? 'black' : 'gray'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
    />
  ) : (
    <rect
      fill="#1168bd"
      fillOpacity="1.0"
      stroke={isSelected ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
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
      stroke={isSelected ? 'black' : 'white'}
      rx="5"
      ry="5"
      x="1"
      y="1"
      width={width - 2}
      height={height - 2}
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
        stroke={isSelected ? 'black' : 'white'}
        rx="25"
        ry="20"
        x="1"
        y="40"
        width={width - 2}
        height={height - 40}
      />
      <circle
        fill="#2072C3"
        stroke={isSelected ? 'black' : 'white'}
        fillOpacity="1.0"
        cx="75"
        cy="30"
        r="30"
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
        fill="#438dd5"
        fillOpacity="1.0"
        rx="0"
        ry="0"
        x="0"
        y="20"
        width={width}
        height={height - 42}
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        cx="75"
        cy="110"
        rx="75"
        ry="20"
      />
      <ellipse
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={isSelected ? 'black' : 'white'}
        cx="75"
        cy="20"
        rx="75"
        ry="20"
      />
    </g>
  );
}

C4Database.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
