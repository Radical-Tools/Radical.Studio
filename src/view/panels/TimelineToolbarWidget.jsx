import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Step, StepButton, Stepper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';

const TimelineToolbarWidget = (props) => {
  const {
    presentation,
    presentationId,
    gotoStep,
    appendStep,
    removeStep,
    editEnabled,
  } = props;

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
        {editEnabled && (
          <ButtonGroup
            orientation="horizontal"
            aria-label="steps management group"
            variant="text"
            size="small"
            color="primary"
          >
            <Button onClick={() => onAppendStepCallback()}>
              <Tooltip title="Add step">
                <AddCircleRoundedIcon style={{ fontSize: 30 }} />
              </Tooltip>
            </Button>
            <Button
              onClick={() =>
                onRemoveStepCallback(presentation.currentStepIndex)
              }
              disabled={presentation.steps.length < 2}
            >
              <Tooltip title="Remove the selected step">
                <RemoveCircleRoundedIcon style={{ fontSize: 30 }} />
              </Tooltip>
            </Button>
          </ButtonGroup>
        )}
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
              <StepButton
                key={step.name}
                icon={
                  <RadioButtonCheckedRoundedIcon
                    color={
                      presentation.steps[presentation.currentStepIndex].id ===
                      step.id
                        ? 'secondary'
                        : 'primary'
                    }
                  />
                }
              >
                <Typography variant="button">{step.name}</Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box>
        <ButtonGroup
          orientation="horizontal"
          aria-label="steps navigation group"
          variant="text"
          size="small"
          color="primary"
        >
          <Button
            onClick={() =>
              onGotoStepCallback(presentation.currentStepIndex - 1)
            }
            disabled={presentation.currentStepIndex === 0}
          >
            <Tooltip title="Go to the previous step">
              <ArrowBackIosRoundedIcon style={{ fontSize: 30 }} />
            </Tooltip>
          </Button>
          <Button
            onClick={() =>
              onGotoStepCallback(presentation.currentStepIndex + 1)
            }
            disabled={
              presentation.currentStepIndex === presentation.steps.length - 1
            }
          >
            <Tooltip title="Go to the next step">
              <ArrowForwardIosRoundedIcon style={{ fontSize: 30 }} />
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
  editEnabled: PropTypes.bool.isRequired,
};

export default React.memo(TimelineToolbarWidget);
