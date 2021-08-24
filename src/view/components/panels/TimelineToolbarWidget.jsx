import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Step, StepButton, Stepper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

const TimelineToolbarWidget = (props) => {
  const { presentation, presentationId, gotoStep, appendStep, removeStep } =
    props;

  const onGotoStepCallback = useCallback(
    (stepIndex) => gotoStep(presentationId, stepIndex),
    [gotoStep, presentationId]
  );

  const onAppendStepCallback = useCallback(
    () => appendStep(presentationId),
    [appendStep, presentationId]
  );

  const onRemoveStepCallback = useCallback(
    (stepIndex) => removeStep(presentationId, stepIndex),
    [removeStep, presentationId]
  );

  return presentation ? (
    <Box display="flex" alignItems="center">
      <Box>
        <IconButton color="primary"  onClick={() => onAppendStepCallback()}>
          <AddCircleOutlineRoundedIcon
            style={{ fontSize: 30 }}
          />
        </IconButton>
        <IconButton color="primary" disabled={presentation.steps.length <= 1}    onClick={() => onRemoveStepCallback(presentation.currentStepIndex)}>
          <RemoveCircleOutlineRoundedIcon
            style={{ fontSize: 30 }}
          />
        </IconButton>
      </Box>
      <Box flexGrow={1}>
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={
            presentation.currentStepIndex
              ? presentation.currentStepIndex
              : undefined
          }
        >
          {presentation.steps.map((step, index) => (
            <Step key={step.id} onClick={() => onGotoStepCallback(index)}>
              <StepButton
                key={step.name}
              >
                <Typography variant="button">{step.name}</Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>
        <IconButton
          color="primary"
          disabled={presentation.currentStepIndex === 0}
          onClick={() =>
            onGotoStepCallback(presentation.currentStepIndex - 1)
          }
        >
          <ArrowLeftIcon
            style={{ fontSize: 50 }}
          />
        </IconButton>
        <IconButton
          color="primary"
          disabled={
            presentation.currentStepIndex === presentation.steps.length - 1
          }
          onClick={() =>
            onGotoStepCallback(presentation.currentStepIndex + 1)
          }
        >
          <ArrowRightIcon
            style={{ fontSize: 50 }}
          />
        </IconButton>
      </Box>
    </Box>
  ) :
    <div />
  ;
};
TimelineToolbarWidget.defaultProps = {
  presentation: undefined,
  presentationId: undefined
}


TimelineToolbarWidget.propTypes = {
  presentation: PropTypes.objectOf(PropTypes.any),
  presentationId: PropTypes.string,
  gotoStep: PropTypes.func.isRequired,
  appendStep: PropTypes.func.isRequired,
  removeStep: PropTypes.func.isRequired,
};

export default React.memo(TimelineToolbarWidget);
