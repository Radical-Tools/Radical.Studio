import * as React from 'react';
import PropTypes from 'prop-types';
import { LAYOUT_COLOR } from '../../../app/consts';

const C4Container = ({
  width,
  height,
  isSelected,
  isExpanded,
  showComponentTypeText,
}) =>
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
      strokeWidth={isSelected ? 2 : 1}
    />
  ) : (
    <>
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
        strokeWidth={isSelected ? 2 : 2}
      />
      {showComponentTypeText && (
        <text x="8" y="85" fontSize="30px" fill="white">
          Container
        </text>
      )}
    </>
  );
C4Container.defaultProps = {
  showComponentTypeText: false,
  isSelected: false,
  isExpanded: false,
};
C4Container.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isExpanded: PropTypes.bool,
  showComponentTypeText: PropTypes.bool,
};

const C4Component = ({
  width,
  height,
  isSelected,
  isExpanded,
  showComponentTypeText,
}) =>
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
      strokeWidth={isSelected ? 2 : 1}
    />
  ) : (
    <>
      <rect
        fill="#438dd5"
        fillOpacity="1.0"
        stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
        rx="10"
        ry="10"
        x="2"
        y="2"
        width={width - 4 + (showComponentTypeText ? 20 : 0)}
        height={height - 4}
        strokeWidth={isSelected ? 2 : 2}
      />
      {showComponentTypeText && (
        <text x="5" y="85" fontSize="30px" fill="white">
          Component
        </text>
      )}
    </>
  );
C4Component.defaultProps = {
  showComponentTypeText: false,
  isSelected: false,
  isExpanded: false,
};
C4Component.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isExpanded: PropTypes.bool,
  showComponentTypeText: PropTypes.bool,
};

const C4System = ({
  width,
  height,
  isSelected,
  isExpanded,
  showComponentTypeText,
}) =>
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
      strokeWidth={isSelected ? 2 : 1}
    />
  ) : (
    <>
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
        strokeWidth={isSelected ? 2 : 2}
      />
      {showComponentTypeText && (
        <text x="20" y="85" fontSize="30px" fill="white">
          System
        </text>
      )}
    </>
  );
C4System.defaultProps = {
  showComponentTypeText: false,
  isSelected: false,
  isExpanded: false,
};
C4System.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isExpanded: PropTypes.bool,
  showComponentTypeText: PropTypes.bool,
};

const C4ExternalSystem = ({
  width,
  height,
  isSelected,
  showComponentTypeText,
}) => (
  <>
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
      strokeWidth={isSelected ? 2 : 2}
    />
    {showComponentTypeText && (
      <>
        <text x="17" y="70" fontSize="30px" fill="white">
          External
        </text>
        <text x="20" y="104" fontSize="30px" fill="white">
          System
        </text>
      </>
    )}
  </>
);
C4ExternalSystem.defaultProps = {
  showComponentTypeText: false,
  isSelected: false,
};
C4ExternalSystem.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  showComponentTypeText: PropTypes.bool,
};

const C4Actor = ({ width, height, isSelected, showComponentTypeText }) => (
  <g>
    <rect
      fill="#0f4880"
      fillOpacity="1.0"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
      rx="20"
      ry="20"
      x="5"
      y="40"
      strokeWidth={isSelected ? 2 : 2}
      width={width - 10}
      height={height - 45}
    />
    {showComponentTypeText && (
      <text x="39" y="100" fontSize="30px" fill="white">
        Actor
      </text>
    )}

    <circle
      fill="#0f4880"
      stroke={isSelected ? LAYOUT_COLOR.SECONDARY : 'white'}
      fillOpacity="1.0"
      cx="75"
      cy="30"
      r="27"
      strokeWidth={isSelected ? 2 : 2}
    />
  </g>
);
C4Actor.defaultProps = {
  showComponentTypeText: false,
  isSelected: false,
};
C4Actor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  showComponentTypeText: PropTypes.bool,
};

const C4Database = ({ width, height, isSelected, showComponentTypeText }) => (
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
      cy={108 + (showComponentTypeText ? 15 : 0)}
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
    {showComponentTypeText && (
      <text x="9" y="94" fontSize="30px" fill="white">
        Database
      </text>
    )}
  </g>
);
C4Database.defaultProps = {
  showComponentTypeText: false,
  isSelected: false,
};
C4Database.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  showComponentTypeText: PropTypes.bool,
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
