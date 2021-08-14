import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomeDialog from './HomeDialog';

const metamodels = [
  {
    name: 'C4',
    id: 'C4',
  },
  {
    name: 'Togaf',
    id: 'tgfs',
  },
];
describe('HomeDialog', () => {
  it('renders radical studio wizard initial screen', async () => {
    render(<HomeDialog metamodels={metamodels} show />);
    await waitFor(() =>
      expect(screen.getByText('Radical Studio - Wizard')).toBeInTheDocument()
    );
  });
});
