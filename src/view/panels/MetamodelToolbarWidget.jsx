import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useDrag } from 'react-dnd';
import { METAMODEL_DROP_TYPE } from '../widgets/DiagramWidget/diagram/consts';
import { getMetamodelItem } from '../../tests/getDataTestId';
import C4Icons from '../../data/metamodels/c4/C4Icons';

const smallHeightViewBox = '340';
const normalHeightViewBox = '200';

const getViewBox = (smallHeight) =>
  smallHeight ? smallHeightViewBox : normalHeightViewBox;

const iconContainerStyle = (smallHeight) => ({
  marginTop: `-${smallHeight ? 0 : 30}px`,
  width: '100px',
  height: '50px',
  transform: 'translate(0, 0)',
});

const categoryChipStyle = {
  marginRight: '25px',
};
const ToolbarItem = ({ id, smallHeight }) => {
  const [, drag] = useDrag({
    item: { metamodelType: id, type: METAMODEL_DROP_TYPE },
    type: METAMODEL_DROP_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const iconViewBox = `0 0 ${getViewBox(smallHeight)} ${getViewBox(
    smallHeight
  )}`;
  return (
    <Box
      ref={drag}
      p={1}
      data-testid={getMetamodelItem(id)}
      sx={iconContainerStyle(smallHeight)}
    >
      <svg viewBox={iconViewBox}>
        {React.createElement(C4Icons[id], {
          height: 150,
          width: 150,
          showComponentTypeText: true,
        })}
      </svg>
    </Box>
  );
};

const MetamodelToolbarWidget = ({ objectClasses, smallHeight }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      overflowX: 'overlay',
      overflowY: 'clip',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: 8,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }}
  >
    {objectClasses &&
      Object.entries(objectClasses).map(([categoryId, items]) => (
        <Box
          key={categoryId}
          paddingLeft={2}
          flexDirection="row"
          display="flex"
          alignItems="center"
        >
          <Chip label={categoryId} color="primary" sx={categoryChipStyle} />
          {items.map((item) => (
            <ToolbarItem key={item.id} id={item.id} smallHeight={smallHeight} />
          ))}
        </Box>
      ))}
  </Box>
);

MetamodelToolbarWidget.defaultProps = {
  objectClasses: undefined,
};

MetamodelToolbarWidget.propTypes = {
  objectClasses: PropTypes.objectOf(PropTypes.any),
  smallHeight: PropTypes.bool.isRequired,
};
ToolbarItem.propTypes = {
  id: PropTypes.string.isRequired,
  smallHeight: PropTypes.bool.isRequired,
};

export default React.memo(MetamodelToolbarWidget);
