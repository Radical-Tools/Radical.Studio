import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import ViewModuleRoundedIcon from '@material-ui/icons/ViewModuleRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import Box from '@material-ui/core/Box';
import ObjectGridWidget from '../widgets/ObjectGridWidget';
import RelationGridWidget from '../widgets/RelationGridWidget';
import { getModelGridToolbarItem } from '../../tests/getDataTestId';

const ModelToolbarWidget = (props) => {
  const { model, viewModel, onRemoveObject, onRemoveRelation, onUpsertItem } =
    props;

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChangeCallback = useCallback(
    (event, newValue) => {
      setTabIndex(newValue);
    },
    [setTabIndex]
  );

  return (
    <Box p={1} style={{ height: '92%' }}>
      <Box>
        <Tabs
          value={tabIndex}
          onChange={handleTabChangeCallback}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            data-testid={getModelGridToolbarItem('Objects')}
            aria-label="Objects"
            icon={<ViewModuleRoundedIcon />}
          />
          <Tab
            data-testid={getModelGridToolbarItem('Relations')}
            aria-label="Relations"
            icon={<InsertLinkRoundedIcon />}
          />
        </Tabs>
      </Box>
      <Box pt={1} style={{ height: '100%' }}>
        {tabIndex === 0 && (
          <ObjectGridWidget
            model={model}
            viewModel={viewModel}
            onUpsertItem={onUpsertItem}
            onRemoveObject={onRemoveObject}
          />
        )}

        {tabIndex === 1 && (
          <RelationGridWidget
            model={model}
            viewModel={viewModel}
            onUpsertItem={onUpsertItem}
            onRemoveRelation={onRemoveRelation}
          />
        )}
      </Box>
    </Box>
  );
};

ModelToolbarWidget.propTypes = {
  model: PropTypes.objectOf(PropTypes.any).isRequired,
  viewModel: PropTypes.objectOf(PropTypes.any).isRequired,
  onRemoveObject: PropTypes.func.isRequired,
  onRemoveRelation: PropTypes.func.isRequired,
  onUpsertItem: PropTypes.func.isRequired,
};

export default React.memo(ModelToolbarWidget);
