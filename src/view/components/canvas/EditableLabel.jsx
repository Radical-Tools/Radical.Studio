import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { DIAGRAM_ITEM_NAME_CHANGED } from '../../diagram/consts';

const useStyles = makeStyles(() => ({
  nameInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    padding: '0px',
  },
}));
const useTypographyStyles = makeStyles(() => ({
  root: {
    pointerEvents: 'all',
  },
}));
const EditableLabel = ({ label, editedItem, variant, isItemSelected }) => {
  const classes = useStyles();
  const typographyStyles = useTypographyStyles();
  const inputEl = useRef(null);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');
  const finishEditCallback = useCallback(() => {
    setIsInEditMode(false);
    editedItem.setLocked(false);
  }, [setIsInEditMode, editedItem]);
  const startEditCallback = useCallback(() => {
    setIsInEditMode(true);
    editedItem.setLocked(true);
  }, [setIsInEditMode, editedItem]);
  const setCurrentNameCallback = useCallback(
    ({ target: { value } }) => setCurrentLabel(value),
    [setCurrentLabel]
  );
  const acceptChangeCallback = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        editedItem.setName(currentLabel);
        editedItem.fireEvent({}, DIAGRAM_ITEM_NAME_CHANGED);
      }
    },
    [editedItem, currentLabel]
  );
  useEffect(() => {
    if (isInEditMode && !isItemSelected) {
      finishEditCallback();
    }
    if (isInEditMode && isItemSelected) {
      inputEl.current.focus();
    }
    setCurrentLabel(label);
  }, [isItemSelected, isInEditMode, label, finishEditCallback]);
  return isInEditMode && isItemSelected ? (
    <input
      className={classes.nameInput}
      autoComplete="off"
      ref={inputEl}
      onBlur={finishEditCallback}
      value={currentLabel}
      onChange={setCurrentNameCallback}
      onKeyDown={acceptChangeCallback}
    />
  ) : (
    <Typography
      classes={typographyStyles}
      onDoubleClick={startEditCallback}
      variant={variant}
    >
      {label}
    </Typography>
  );
};
EditableLabel.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  editedItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditableLabel;
