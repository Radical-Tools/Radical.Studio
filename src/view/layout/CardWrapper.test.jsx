import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CardWrapper from './CardWrapper';

describe('CardWidget', () => {
  it('calls minimize prop on minimize click', () => {
    const onMinimize = jest.fn();
    render(<CardWrapper onMinimize={onMinimize} id="test" />);
    fireEvent.click(screen.getByLabelText(/Minimize/i));
    expect(onMinimize).toBeCalledWith('test');
  });
  it('calls maximize prop on maximize click', () => {
    const onMaximize = jest.fn();
    render(<CardWrapper onMaximize={onMaximize} id="test" />);
    fireEvent.click(screen.getByLabelText(/Maximize/i));
    expect(onMaximize).toBeCalledWith('test');
  });
  it('calls close prop on close click', () => {
    const onClose = jest.fn();
    render(<CardWrapper onClose={onClose} id="test" />);
    fireEvent.click(screen.getByLabelText(/Close/i));
    expect(onClose).toBeCalledWith('test');
  });
  it('renders title', () => {
    const onClose = jest.fn();
    render(<CardWrapper onClose={onClose} id="test" title="Test Title" />);
    const title = screen.getByText(/Test Title/i);
    expect(title).toBeInTheDocument();
  });
});
