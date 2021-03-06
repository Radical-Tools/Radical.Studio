import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TopMenu from './TopMenu';

describe.skip('Theme', () => {
  it('changes theme', async () => {
    const onChangeTheme = jest.fn();
    render(
      <TopMenu
        onChangeTheme={onChangeTheme}
        windowDimensions={{ height: 768 }}
      />
    );
    fireEvent.click(
      screen
        .getByTestId('theme-switch')
        .getElementsByClassName('MuiSwitch-input')[0]
    );
    expect(onChangeTheme).toBeCalled();
  });
});

describe('TopMenu', () => {
  it('renders app name', async () => {
    render(
      <TopMenu
        history={{ prev: [], next: [] }}
        windowDimensions={{ height: 768 }}
      />
    );
    expect(screen.getByText('Radical.Studio')).toBeInTheDocument();
  });
});
