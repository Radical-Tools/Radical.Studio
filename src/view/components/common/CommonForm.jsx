import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Form from '@rjsf/material-ui';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';

const getId = (testId, suffix = '') => `common-form-${testId}${suffix}`;
const CommonForm = ({ dataSchema, uiSchema, onSubmit, testId }) => {
  const onSubmitCallback = useCallback(
    (data) => onSubmit(data.schema.title, data.formData),
    [onSubmit]
  );

  return (
    <Form
      schema={dataSchema}
      uiSchema={uiSchema}
      onSubmit={onSubmitCallback}
      id={getId(testId)}
      idPrefix={getId(testId)}
      autoComplete="off"
    >
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid={getId(testId, '-submit')}
        >
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
  testId: PropTypes.string.isRequired,
};

export default CommonForm;
