import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { DIAGRAM_ITEM_NAME_CHANGED } from '../widgets/DiagramWidget/diagram/consts';

const NameInput = styled('input')({
  width: '100%',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  textAlign: 'center',
  fontSize: 14,
  padding: '0px',
  color: 'inherit',
});
const EditableLabel = ({
  label,
  width,
  editedItem,
  variant,
  isItemSelected,
}) => {
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
    <NameInput
      autoComplete="off"
      ref={inputEl}
      onBlur={finishEditCallback}
      value={currentLabel}
      onChange={setCurrentNameCallback}
      onKeyDown={acceptChangeCallback}
    />
  ) : (
    <Typography
      noWrap
      sx={{
        width, // workaround for https://github.com/bubkoo/html-to-image/issues/132
        pointerEvents: 'all',
      }}
      onDoubleClick={startEditCallback}
      variant={variant}
    >
      {label}
    </Typography>
  );
};

EditableLabel.defaultProps = {
  width: undefined,
};

EditableLabel.propTypes = {
  width: PropTypes.number,
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  editedItem: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditableLabel;
