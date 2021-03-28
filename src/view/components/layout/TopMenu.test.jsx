import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TopMenu from './TopMenu';

describe('TopMenu', () => {
  it('changes theme', async () => {
    const onChangeTheme = jest.fn();
    const { getByTestId } = render(<TopMenu onChangeTheme={onChangeTheme} />);
    fireEvent.click(
      getByTestId('theme-switch').getElementsByClassName('MuiSwitch-input')[0]
    );
    expect(onChangeTheme).toBeCalled();
  });
  it('renders app name', async () => {
    render(<TopMenu />);
    expect(screen.getByText('Radical.Studio')).toBeInTheDocument();
  });
});
