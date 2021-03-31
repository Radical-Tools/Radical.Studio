import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import CommonForm from '../common/CommonForm';
import AccordionItem from '../common/AccordionItem';

const MetamodelToolbarWidget = (props) => {
  const { sandbox, upsertItem } = props;

  const [expanded, setExpanded] = useState(undefined);

  const handleChangeCallback = useCallback(
    (panel) => (event, newExpanded) => setExpanded(newExpanded ? panel : false),
    [setExpanded]
  );

  return (
    <div>
      <AccordionItem
        name="Properties"
        logoRender={<WidgetsRoundedIcon />}
        onClick={handleChangeCallback}
        expanded={expanded === 'Properties' || sandbox.data !== undefined}
        disabled={sandbox.data === undefined}
      >
        {sandbox.data && (
          <CommonForm
            uiSchema={sandbox.ui}
            onSubmit={upsertItem}
            dataSchema={sandbox.data}
          />
        )}
      </AccordionItem>
    </div>
  );
};

MetamodelToolbarWidget.propTypes = {
  sandbox: PropTypes.object.isRequired, // eslint-disable-line
  upsertItem: PropTypes.func.isRequired,
};

export default React.memo(MetamodelToolbarWidget);
