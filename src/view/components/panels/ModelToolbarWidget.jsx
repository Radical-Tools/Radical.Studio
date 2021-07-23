import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';

import * as objectsInventory from '../helpers/objectsInventoryHelper';
import * as relationsInventory from '../helpers/relationsInventoryHelper';
import AccordionItem from '../common/AccordionItem';
import Inventory from '../common/Inventory';

const ModelToolbarWidget = (props) => {
  const {
    model,
    onRemoveObject,
    onEditObject,
    onCreateObject,
    onRemoveRelation,
    onEditRelation,
    onCreateRelation,
  } = props;
  const [expanded, setExpanded] = useState('Objects');

  const handleChangeCallback = useCallback(
    (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false),
    [setExpanded]
  );

  const onRemoveObjectCallback = useCallback(
    (id) => onRemoveObject(id),
    [onRemoveObject]
  );

  const onEditObjectCallback = useCallback(
    (id) => onEditObject(id),
    [onEditObject]
  );

  const onCreateObjectCallback = useCallback(
    () => onCreateObject(),
    [onCreateObject]
  );

  const onRemoveRelationCallback = useCallback(
    (id) => onRemoveRelation(id),
    [onRemoveRelation]
  );

  const onEditRelationCallback = useCallback(
    (id) => onEditRelation(id),
    [onEditRelation]
  );

  const onCreateRelationCallback = useCallback(
    () => onCreateRelation(),
    [onCreateRelation]
  );

  return (
    <div>
      <AccordionItem
        name="Objects"
        logoRender={<WidgetsRoundedIcon />}
        onClick={handleChangeCallback}
        expanded={expanded === 'Objects'}
      >
        <Inventory
          data={objectsInventory.transform(model.objects)}
          onRemoveItem={onRemoveObjectCallback}
          onEditItem={onEditObjectCallback}
          onCreateItem={onCreateObjectCallback}
          customRowFactory={objectsInventory.createCustomRow}
          columns={objectsInventory.columns}
        />
      </AccordionItem>
      <AccordionItem
        name="Relations"
        logoRender={<InsertLinkRoundedIcon />}
        onClick={handleChangeCallback}
        expanded={expanded === 'Relations'}
      >
        <Inventory
          data={relationsInventory.transform(model)}
          onRemoveItem={onRemoveRelationCallback}
          onEditItem={onEditRelationCallback}
          onCreateItem={onCreateRelationCallback}
          customRowFactory={relationsInventory.createCustomRow}
          columns={relationsInventory.columns}
        />
      </AccordionItem>
    </div>
  );
};

ModelToolbarWidget.propTypes = {
  model: PropTypes.object.isRequired, // eslint-disable-line
  viewModel: PropTypes.object.isRequired, // eslint-disable-line
  onRemoveObject: PropTypes.func.isRequired,
  onEditObject: PropTypes.func.isRequired,
  onCreateObject: PropTypes.func.isRequired,
  onRemoveRelation: PropTypes.func.isRequired,
  onEditRelation: PropTypes.func.isRequired,
  onCreateRelation: PropTypes.func.isRequired,
};

export default React.memo(ModelToolbarWidget);
