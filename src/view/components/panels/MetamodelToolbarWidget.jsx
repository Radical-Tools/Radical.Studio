import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { useDrag } from 'react-dnd';

import { METAMODEL_DROP_TYPE } from '../../diagram/consts';

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
        color="primary"
        data-testid={`metamodel-toolbar-item-${id}`}
        label={name}
        ref={drag}
      />
    </Box>
  );
};

const MetamodelToolbarWidget = (props) => {
  const { objectClasses } = props;

  return (
    <div>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {objectClasses.map((item) => (
          <ToolbarItem key={item.id} id={item.id} name={item.name} />
        ))}
      </Box>
    </div>
  );
};

MetamodelToolbarWidget.propTypes = {
  objectClasses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
ToolbarItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default React.memo(MetamodelToolbarWidget);
