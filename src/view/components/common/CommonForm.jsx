import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Form from '@rjsf/material-ui';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';

const CommonForm = ({ dataSchema, uiSchema, onSubmit }) => {
  const onSubmitCallback = useCallback(
    (data) => onSubmit(data.schema.title, data.formData),
    [onSubmit]
  );

  return (
    <Form
      schema={dataSchema}
      uiSchema={uiSchema}
      onSubmit={onSubmitCallback}
      autoComplete="off"
    >
      <Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Form>
  );
};
CommonForm.propTypes = {
  dataSchema: PropTypes.shape({ type: PropTypes.string }).isRequired,
  uiSchema: PropTypes.shape({ id: PropTypes.object }).isRequired, // eslint-disable-line
  onSubmit: PropTypes.func.isRequired,
};

export default CommonForm;
