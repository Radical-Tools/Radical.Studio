import React from 'react';
import PropTypes from 'prop-types';

const RadicalLinkSegmentWidget = ({
  factory,
  link,
  selected,
  path,
  forwardRef,
  onSelection,
  extras,
}) => {
  const Bottom = React.cloneElement(
    factory.generateLinkSegment(link, selected || link.isSelected(), path),
    {
      ref: forwardRef,
    }
  );

  const Top = React.cloneElement(Bottom, {
    strokeLinecap: 'round',
    onMouseLeave: () => {
      onSelection(false);
    },
    onMouseEnter: () => {
      onSelection(true);
    },
    ...extras,
    ref: null,
    'data-linkid': link.getID(),
    strokeOpacity: selected ? 0.1 : 0,
    strokeWidth: 20,
    fill: 'none',
    onContextMenu: (event) => {
      if (!link.isLocked()) {
        event.preventDefault();
      }
    },
  });

  return (
    <g>
      {Bottom}
      {Top}
    </g>
  );
};

RadicalLinkSegmentWidget.propTypes = {
  link: PropTypes.objectOf(PropTypes.any).isRequired,
  factory: PropTypes.objectOf(PropTypes.any).isRequired,
  forwardRef: PropTypes.objectOf(PropTypes.any).isRequired,
  extras: PropTypes.objectOf(PropTypes.any).isRequired,
  path: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelection: PropTypes.func.isRequired,
};

export default RadicalLinkSegmentWidget;
