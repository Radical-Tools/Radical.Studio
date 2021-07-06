import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const usebuttonStyles = makeStyles(() => ({
  root: {
    margin: '10px',
    maxWidth: '120px',
    maxHeight: '120px',
    minWidth: '120px',
    minHeight: '120px',
  },
}));
const ObjectButton = ({ id, name, onClick, testId }) => {
  const onClickCallback = useCallback(() => onClick(id), [id, onClick]);
  return (
    <Button
      aria-label={name}
      data-testid={testId}
      variant="contained"
      color="primary"
      classes={usebuttonStyles()}
      onClick={onClickCallback}
    >
      <Typography variant="h5">{name}</Typography>
    </Button>
  );
};
ObjectButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default React.memo(ObjectButton);
