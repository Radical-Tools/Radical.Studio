import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Step, StepButton, Stepper } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import { LAYOUT_MODE } from '../../app/consts';

const PresentationTimelineToolbarWidget = (props) => {
  const {
    presentation,
    presentationId,
    gotoStep,
    appendStep,
    removeStep,
    editEnabled,
    onSetMode,
    playEnabled,
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
        <ButtonGroup
          orientation="vertical"
          aria-label="steps management group"
          variant="text"
          size="small"
          color="primary"
        >
          {editEnabled && (
            <Button onClick={() => onAppendStepCallback()}>
              <Tooltip title="Add Presentation Step">
                <AddCircleRoundedIcon style={{ fontSize: 25 }} />
              </Tooltip>
            </Button>
          )}
          {editEnabled && (
            <Button
              onClick={() =>
                onRemoveStepCallback(presentation.currentStepIndex)
              }
              disabled={presentation.steps.length < 2}
            >
              <Tooltip title="Remove the Selected Presentation Step">
                <RemoveCircleRoundedIcon style={{ fontSize: 25 }} />
              </Tooltip>
            </Button>
          )}
          {!playEnabled && (
            <Button
              onClick={() => onSetMode(LAYOUT_MODE.PRESENTATION)}
              disabled={presentation.steps.length === 0}
            >
              <Tooltip title="Back to the designer">
                <BackspaceRoundedIcon style={{ fontSize: 25 }} />
              </Tooltip>
            </Button>
          )}
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
            <Tooltip title="Go to the previous presentation step">
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
            <Tooltip title="Go to the next presentation step">
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
PresentationTimelineToolbarWidget.defaultProps = {
  presentation: undefined,
  presentationId: undefined,
};

PresentationTimelineToolbarWidget.propTypes = {
  presentation: PropTypes.objectOf(PropTypes.any),
  presentationId: PropTypes.string,
  gotoStep: PropTypes.func.isRequired,
  appendStep: PropTypes.func.isRequired,
  removeStep: PropTypes.func.isRequired,
  onSetMode: PropTypes.func.isRequired,
  editEnabled: PropTypes.bool.isRequired,
  playEnabled: PropTypes.bool.isRequired,
};

export default React.memo(PresentationTimelineToolbarWidget);
