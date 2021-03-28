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
  it('renders metamodels', async () => {
    render(<HomeDialog metamodels={metamodels} show />);
    await waitFor(() => expect(screen.getByText('C4')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Togaf')).toBeInTheDocument());
  });
});
