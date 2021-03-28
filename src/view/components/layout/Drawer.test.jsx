import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
    await waitFor(() =>
      expect(screen.getByText('Toolbox')).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.getByText('Model')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Canvas')).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText('Metamodel')).toBeInTheDocument()
    );
  });
});
