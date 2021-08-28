import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { useDrag } from 'react-dnd';
import { METAMODEL_DROP_TYPE } from '../components/canvas/diagram/consts';
import { getMetamodelItem } from '../common/getDataTestId';

const ToolbarItem = ({ name, id }) => {
  const [, drag] = useDrag({
    item: { metamodelType: id, type: METAMODEL_DROP_TYPE },
    type: METAMODEL_DROP_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <Box p={1}>
      <Chip
        data-testid={getMetamodelItem(id)}
        label={name}
        ref={drag}
        size="small"
        color="secondary"
      />
    </Box>
  );
};

const MetamodelToolbarWidget = (props) => {
  const { objectClasses } = props;

  return (
    <Box display="flex" alignItems="center" height="100%">
      {objectClasses &&
        Object.entries(objectClasses).map(([categoryId, items]) => (
          <Box
            key={categoryId}
            paddingLeft={2}
            flexDirection="row"
            display="flex"
            alignItems="center"
          >
            <Chip label={categoryId} color="primary" />
            {items.map((item) => (
              <ToolbarItem key={item.id} id={item.id} name={item.name} />
            ))}
          </Box>
        ))}
    </Box>
  );
};

MetamodelToolbarWidget.defaultProps = {
  objectClasses: undefined,
};

MetamodelToolbarWidget.propTypes = {
  objectClasses: PropTypes.objectOf(PropTypes.any),
};
ToolbarItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default React.memo(MetamodelToolbarWidget);
