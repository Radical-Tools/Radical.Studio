import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FileReader from './FileReader';
import { getFileUploader } from '../../tests/getDataTestId';

describe('FileReader', () => {
  let file;
  const content = '{"a":"1"}';
  beforeEach(() => {
    file = new File([content], 'radical.radical', {
      type: 'radical',
    });
  });
  it('reads file', async () => {
    const onDataChunk = jest.fn();
    const onChange = jest.fn();
    render(<FileReader onDataChunk={onDataChunk} onChange={onChange} />);

    const uploader = screen.getByTestId(getFileUploader());

    fireEvent.change(uploader.firstChild, {
      target: { files: [file] },
    });

    expect(uploader.firstChild.files[0].name).toBe('radical.radical');
    expect(uploader.firstChild.files.length).toBe(1);
    await waitFor(() => expect(onDataChunk).toBeCalledWith(content));
  });
});
