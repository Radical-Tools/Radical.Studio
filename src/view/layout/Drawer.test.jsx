import React from 'react';
import { render, screen } from '@testing-library/react';
import Drawer from './Drawer';

const widgets = {
  model: {
    isActive: true,
    title: 'Model',
  },
  canvas: {
    isActive: true,
    title: 'Canvas',
  },
  metamodel: {
    isActive: true,
    title: 'Metamodel',
  },
};
describe('Drawer', () => {
  it('renders widgets toolbox', async () => {
    render(<Drawer widgetsConfig={widgets} show />);
    await screen.findByText('Toolbox');
    await screen.findByText('Model');
    await screen.findByText('Canvas');
    await screen.findByText('Metamodel');
  });
});
