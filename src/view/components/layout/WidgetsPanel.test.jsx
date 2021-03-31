import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WidgetsPanel from './WidgetsPanel';

const config = {
  widgets: {
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
  },
};
const layout = {
  lg: [
    {
      i: 'top-panel',
      x: 0,
      y: 0,
      w: 24,
      h: 1,
      static: true,
    },
    {
      i: 'model',
      x: 0,
      y: 1,
      w: 4,
      h: 16,
      minW: 1,
    },
    {
      i: 'canvas',
      x: 4,
      y: 1,
      w: 16,
      h: 16,
      minW: 4,
      minH: 1,
    },
    {
      i: 'metamodel',
      x: 20,
      y: 1,
      w: 4,
      h: 16,
      minW: 1,
    },
  ],
};

// store is required to initialize the model & metamodel panel
describe('WidgetsPanel', () => {
  xit('renders widgets', async () => {
    render(<WidgetsPanel config={config} layout={layout} />);
    await waitFor(() => expect(screen.getByText('Model')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Canvas')).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText('Metamodel')).toBeInTheDocument()
    );
  });
});
