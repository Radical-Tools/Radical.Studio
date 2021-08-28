import React, { useCallback } from 'react';
import readery from 'readery';
import { InputBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getFileUploader } from '../common/getDataTestId';

const FileReader = ({
  onChange,
  onProgress,
  onDataChunk,
  onFinished,
  readeryConfig,
  chunkSize,
}) => {
  const handleFileChange = useCallback(
    (e) => {
      onChange();
      const file = e.target.files[0];
      readery.readFromFile(
        file,
        onDataChunk,
        (p) => {
          onProgress(p);
        },
        () => {
          onFinished();
        },
        readeryConfig,
        chunkSize
      );
    },
    [chunkSize, onChange, onDataChunk, onFinished, onProgress, readeryConfig]
  );
  return (
    <InputBase
      onChange={handleFileChange}
      style={{ display: 'None' }}
      type="file"
      hidden
      accept="radical"
      data-testid={getFileUploader()}
    />
  );
};
FileReader.propTypes = {
  onChange: PropTypes.func,
  onProgress: PropTypes.func,
  onDataChunk: PropTypes.func,
  onFinished: PropTypes.func,
  readeryConfig: PropTypes.objectOf(PropTypes.any),
  chunkSize: PropTypes.number,
};
FileReader.defaultProps = {
  onChange: () => {},
  onProgress: () => {},
  onDataChunk: () => {},
  onFinished: () => {},
  readeryConfig: undefined,
  chunkSize: 1024,
};
export default FileReader;
