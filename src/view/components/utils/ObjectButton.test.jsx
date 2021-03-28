import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ObjectButton from './ObjectButton';

describe('ObjectButton', () => {
  it('calls on click with object id', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <ObjectButton onClick={onClick} id="test" name="Test Button Name" />
    );
    fireEvent.click(getByLabelText(/Test Button Name/i));
    expect(onClick).toBeCalledWith('test');
  });
});
