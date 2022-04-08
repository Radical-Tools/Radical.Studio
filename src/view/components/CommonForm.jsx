import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MuiForm5 as Form } from '@rjsf/material-ui';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getFormSubmitButton } from '../../tests/getDataTestId';

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
          color="secondary"
          data-testid={getFormSubmitButton(testId)}
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
