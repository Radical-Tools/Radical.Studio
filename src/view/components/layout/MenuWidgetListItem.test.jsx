import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuWidgetListItem from './MenuWidgetListItem';

describe('MenuWidgetListItem', () => {
  it('renders title', () => {
    render(<MenuWidgetListItem title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  it('renders disabled if is disabled', () => {
    render(<MenuWidgetListItem id="Test Disabled" isDisabled />);
    expect(screen.getByTestId(/Test Disabled/i)).toBeDisabled();
  });
  it('renders enabled if it is not disabled', () => {
    render(<MenuWidgetListItem id="Test Disabled" />);
    expect(screen.getByTestId(/Test Disabled/i)).not.toBeDisabled();
  });
});
