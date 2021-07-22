import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import ViewCarouselRoundedIcon from '@material-ui/icons/ViewCarouselRounded';

import * as objectsInventory from '../helpers/objectsInventoryHelper';
import * as relationsInventory from '../helpers/relationsInventoryHelper';
import * as viewsInventory from '../helpers/viewsInventoryHelper';
import AccordionItem from '../common/AccordionItem';
import Inventory from '../common/Inventory';

const ViewsToolbarWidget = (props) => {
  const {
    model,
    viewModel,
    onRemoveObject,
    onEditObject,
    onCreateObject,
    onRemoveRelation,
    onEditRelation,
    onCreateRelation,
    onEditView,
    onRemoveView,
    onCreateView,
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

  const onEditViewCallback = useCallback((id) => onEditView(id), [onEditView]);

  const onRemoveViewCallback = useCallback(
    (id) => onRemoveView(id),
    [onRemoveView]
  );

  const onCrateViewCallback = useCallback(() => onCreateView(), [onCreateView]);

  return (
    <div>
      <AccordionItem
        name="Objects"
        logoRender={<WidgetsRoundedIcon />}
        onClick={handleChangeCallback}
        onCustomAction={onCreateObjectCallback}
        expanded={expanded === 'Objects'}
      >
        <Inventory
          data={objectsInventory.transform(model.objects)}
          onRemoveItem={onRemoveObjectCallback}
          onEditItem={onEditObjectCallback}
          customRowFactory={objectsInventory.createCustomRow}
          columns={objectsInventory.columns}
        />
      </AccordionItem>
      <AccordionItem
        name="Relations"
        logoRender={<InsertLinkRoundedIcon />}
        onClick={handleChangeCallback}
        onCustomAction={onCreateRelationCallback}
        expanded={expanded === 'Relations'}
      >
        <Inventory
          data={relationsInventory.transform(model)}
          onRemoveItem={onRemoveRelationCallback}
          onEditItem={onEditRelationCallback}
          customRowFactory={relationsInventory.createCustomRow}
          columns={relationsInventory.columns}
        />
      </AccordionItem>
      <AccordionItem
        name="Views"
        logoRender={<ViewCarouselRoundedIcon />}
        onClick={handleChangeCallback}
        onCustomAction={onCrateViewCallback}
        expanded={expanded === 'Views'}
      >
        <Inventory
          data={viewsInventory.transform(viewModel)}
          onRemoveItem={onRemoveViewCallback}
          onEditItem={onEditViewCallback}
          customRowFactory={viewsInventory.createCustomRow}
          columns={viewsInventory.columns}
        />
      </AccordionItem>
    </div>
  );
};

ViewsToolbarWidget.propTypes = {
  model: PropTypes.object.isRequired, // eslint-disable-line
  viewModel: PropTypes.object.isRequired, // eslint-disable-line
  onRemoveObject: PropTypes.func.isRequired,
  onEditObject: PropTypes.func.isRequired,
  onCreateObject: PropTypes.func.isRequired,
  onRemoveRelation: PropTypes.func.isRequired,
  onEditRelation: PropTypes.func.isRequired,
  onCreateRelation: PropTypes.func.isRequired,
  onCreateView: PropTypes.func.isRequired,
  onEditView: PropTypes.func.isRequired,
  onRemoveView: PropTypes.func.isRequired,
};

export default React.memo(ViewsToolbarWidget);
