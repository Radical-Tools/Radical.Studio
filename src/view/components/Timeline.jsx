import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import Box from '@material-ui/core/Box';
import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Step, StepButton, Stepper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const Timeline = ({ jumpCmd, lockCmd, history, undoCmd, redoCmd }) => (
  <Box display="flex" flexDirection="row" alignItems="center">
    <Box>
      <IconButton
        disabled={history.prev.length === 0}
        onClick={() => undoCmd()}
        color="secondary"
      >
        <ArrowBackIosRoundedIcon />
      </IconButton>
    </Box>
    <Box maxWidth="1200px" minWidth="1200px" alignItems="center">
      <Stepper activeStep={history.prev.length + history.next.length}>
        {history.prev
          .filter((item) => item.isLocked)
          .slice()
          .reverse()
          .map((item, index) => (
            /* eslint-disable react/no-array-index-key */
            <Step key={`Prev-${index}`}>
              <StepButton
                icon={
                  <RadioButtonCheckedRoundedIcon
                    color={
                      index === history.prev.length - 1
                        ? 'secondary'
                        : 'inherit'
                    }
                  />
                }
                onClick={() => jumpCmd(index - history.prev.length + 1)}
              >
                <Typography
                  color={
                    index === history.prev.length - 1 ? 'secondary' : 'white'
                  }
                >
                  {item.name}
                </Typography>
              </StepButton>
            </Step>
          ))}
        {history.next
          .filter((item) => item.isLocked)
          .map((item, index) => (
            <Step key={`Next-${index}`}>
              <StepButton
                icon={<RadioButtonCheckedRoundedIcon color="inherit" />}
                onClick={() => jumpCmd(index + 1)}
              />
            </Step>
          ))}
        <Step key={100}>
          <StepButton
            icon={
              <Badge
                badgeContent={
                  history.prev.filter((item) => !item.isLocked).length
                }
                color="secondary"
              >
                <RadioButtonUncheckedRoundedIcon
                  color={
                    history.prev.filter((item) => !item.isLocked).length > 0
                      ? 'secondary'
                      : 'inherit'
                  }
                />
              </Badge>
            }
            onClick={() =>
              history.next.length === 0
                ? lockCmd()
                : jumpCmd(history.next.length)
            }
          />
        </Step>
      </Stepper>
    </Box>
    <Box>
      <IconButton
        disabled={history.next.length === 0}
        onClick={() => redoCmd()}
        color="secondary"
      >
        <ArrowForwardIosRoundedIcon />
      </IconButton>
    </Box>
  </Box>
);

Timeline.propTypes = {
  jumpCmd: PropTypes.func.isRequired,
  lockCmd: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
};

export default Timeline;
