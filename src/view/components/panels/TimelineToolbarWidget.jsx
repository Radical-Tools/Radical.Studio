import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Step, StepButton, Stepper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
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
        <IconButton color="primary" disabled={presentation.steps.length <= 1}>
          <RemoveRoundedIcon
            style={{ fontSize: 35 }}
            onClick={() => onRemoveStepCallback(presentation.currentStepIndex)}
          />
        </IconButton>
        <IconButton
          color="primary"
          disabled={presentation.currentStepIndex === 0}
        >
          <NavigateBeforeRoundedIcon
            style={{ fontSize: 35 }}
            onClick={() =>
              onGotoStepCallback(presentation.currentStepIndex - 1)
            }
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
            <Step key={step.name}>
              <StepButton
                key={step.name}
                onClick={() => onGotoStepCallback(index)}
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
          disabled={
            presentation.currentStepIndex === presentation.steps.length - 1
          }
        >
          <NavigateNextRoundedIcon
            style={{ fontSize: 35 }}
            onClick={() =>
              onGotoStepCallback(presentation.currentStepIndex + 1)
            }
          />
        </IconButton>
        <IconButton color="primary">
          <AddRoundedIcon
            style={{ fontSize: 35 }}
            onClick={() => onAppendStepCallback()}
          />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <div />
  );
};

TimelineToolbarWidget.propTypes = {
  presentation: PropTypes.arrayOf(PropTypes.object).isRequired,
  presentationId: PropTypes.number.isRequired,
  gotoStep: PropTypes.func.isRequired,
  appendStep: PropTypes.func.isRequired,
  removeStep: PropTypes.func.isRequired,
};

export default React.memo(TimelineToolbarWidget);
