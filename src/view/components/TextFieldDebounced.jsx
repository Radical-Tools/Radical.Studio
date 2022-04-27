import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextFieldDebounced = ({ initialValue, onSubmit, label }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <TextField
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onSubmit(value);
        }
      }}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      label={label}
      size="small"
      variant="outlined"
      focused
    />
  );
};

TextFieldDebounced.propTypes = {
  initialValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextFieldDebounced;
