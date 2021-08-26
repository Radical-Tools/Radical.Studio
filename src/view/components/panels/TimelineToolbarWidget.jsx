import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Step, StepButton, Stepper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

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
    <Box display="flex" alignItems="center" height="100%">
      <Box>
        <ButtonGroup
          orientation="vertical"
          aria-label="steps management group"
          variant="text"
          size="small"
          color="secondary"
        >
          <Button onClick={() => onAppendStepCallback()}>
            <Tooltip title="Add step">
              <AddRoundedIcon color="inherit" style={{ fontSize: 35 }} />
            </Tooltip>
          </Button>
          <Button
            onClick={() => onRemoveStepCallback(presentation.currentStepIndex)}
            disabled={presentation.steps.length < 2}
          >
            <Tooltip title="Remove the selected step">
              <RemoveRoundedIcon color="inherit" style={{ fontSize: 35 }} />
            </Tooltip>
          </Button>
        </ButtonGroup>
      </Box>
      <Box flexGrow={1}>
        <Stepper
          nonLinear
          activeStep={
            presentation.currentStepIndex
              ? presentation.currentStepIndex
              : undefined
          }
        >
          {presentation.steps.map((step, index) => (
            <Step key={step.id} onClick={() => onGotoStepCallback(index)}>
              <StepButton key={step.name}>
                <Typography variant="button">{step.name}</Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>
        <ButtonGroup
          orientation="vertical"
          aria-label="steps management group"
          variant="text"
          size="small"
          color="secondary"
        >
          <Button
            onClick={() =>
              onGotoStepCallback(presentation.currentStepIndex + 1)
            }
            disabled={
              presentation.currentStepIndex === presentation.steps.length - 1
            }
          >
            <Tooltip title="Go to the next step">
              <ArrowRightIcon style={{ fontSize: 35 }} />
            </Tooltip>
          </Button>
          <Button
            onClick={() =>
              onGotoStepCallback(presentation.currentStepIndex - 1)
            }
            disabled={presentation.currentStepIndex === 0}
          >
            <Tooltip title="Go to the previous step">
              <ArrowLeftIcon style={{ fontSize: 35 }} />
            </Tooltip>
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  ) : (
    <div />
  );
};
TimelineToolbarWidget.defaultProps = {
  presentation: undefined,
  presentationId: undefined,
};

TimelineToolbarWidget.propTypes = {
  presentation: PropTypes.objectOf(PropTypes.any),
  presentationId: PropTypes.string,
  gotoStep: PropTypes.func.isRequired,
  appendStep: PropTypes.func.isRequired,
  removeStep: PropTypes.func.isRequired,
};

export default React.memo(TimelineToolbarWidget);
