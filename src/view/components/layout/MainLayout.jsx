import React from 'react';
import ModelToolbarWidget from './ModelToolbarWidget';
import MetamodelToolbarWidget from './MetamodelToolbarWidget';
import DiagramWidget from './DiagramWidget';
import TopMenu from './TopMenu';

const MainLayout = () => (
  <>
    <TopMenu />
    <ModelToolbarWidget />
    <MetamodelToolbarWidget />
    <DiagramWidget />
  </>
);
export default MainLayout;
