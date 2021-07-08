import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import EditAttributesRoundedIcon from '@material-ui/icons/EditAttributesRounded';
import ClassRoundedIcon from '@material-ui/icons/ClassRounded';
import { useDrag } from 'react-dnd';
import CommonForm from '../common/CommonForm';
import AccordionItem from '../common/AccordionItem';
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
        size="small"
        ref={drag}
      />
    </Box>
  );
};

const MetamodelToolbarWidget = (props) => {
  const { sandbox, upsertItem, objectClasses } = props;

  const [expanded, setExpanded] = useState('Toolbar');

  const handleChangeCallback = useCallback(
    (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false),
    [setExpanded]
  );

  return (
    <div>
      <AccordionItem
        name="Toolbar"
        logoRender={<ClassRoundedIcon />}
        onClick={handleChangeCallback}
        expanded={expanded === 'Toolbar'}
      >
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {objectClasses.map((item) => (
            <ToolbarItem key={item.id} id={item.id} name={item.name} />
          ))}
        </Box>
      </AccordionItem>
      <AccordionItem
        name="Properties"
        logoRender={<EditAttributesRoundedIcon />}
        onClick={handleChangeCallback}
        expanded={expanded === 'Properties' || sandbox.data !== undefined}
        disabled={sandbox.data === undefined}
      >
        {sandbox.data && (
          <CommonForm
            uiSchema={sandbox.ui}
            onSubmit={upsertItem}
            dataSchema={sandbox.data}
            testId="edit-attributes"
          />
        )}
      </AccordionItem>
    </div>
  );
};

MetamodelToolbarWidget.propTypes = {
  sandbox: PropTypes.objectOf(PropTypes.any).isRequired,
  upsertItem: PropTypes.func.isRequired,
  objectClasses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
ToolbarItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default React.memo(MetamodelToolbarWidget);
