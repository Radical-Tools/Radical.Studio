import Button from '@material-ui/core/Button';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Popover, Step, StepButton, Stepper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextFieldDebounced from './TextFieldDebounced';
import {
  getUnlockedCount,
  isActive,
  isFirst,
  isLast,
  isPrevLocked,
} from '../../controller/handlers/common/historyUtils';

const HistoryTimeline = ({
  jumpCmd,
  lockCmd,
  history,
  undoCmd,
  redoCmd,
  changeNameCmd,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'TimeLine-Popover' : undefined;

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
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
                          isActive(index, history) ? 'secondary' : 'inherit'
                        }
                      />
                    }
                    onClick={() => {
                      jumpCmd(index - history.prev.length + 1);
                    }}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      if (isActive(index, history)) {
                        handleClick(event);
                      }
                    }}
                    optional={
                      <Typography
                        color={isActive(index, history) ? 'secondary' : 'white'}
                      >
                        {item.name}
                      </Typography>
                    }
                  />
                </Step>
              ))}
            {history.next
              .filter((item) => item.isLocked)
              .map((item, index) => (
                <Step key={`Next-${index}`}>
                  <StepButton
                    icon={<RadioButtonCheckedRoundedIcon color="inherit" />}
                    onClick={() => jumpCmd(index + 1)}
                    optional={
                      <Typography color="white">{item.name}</Typography>
                    }
                  />
                </Step>
              ))}
            {history.count > 0 && (
              <Step key="Last">
                <StepButton
                  icon={
                    <Badge
                      badgeContent={getUnlockedCount(history)}
                      color="secondary"
                    >
                      <RadioButtonUncheckedRoundedIcon
                        color={isPrevLocked(history) ? 'secondary' : 'inherit'}
                      />
                    </Badge>
                  }
                  onClick={() => jumpCmd(history.next.length)}
                  onDoubleClick={() => isLast(history) && lockCmd()}
                  optional={<Typography color="white">Latest</Typography>}
                />
              </Step>
            )}
          </Stepper>
        </Box>
        <Box>
          <ButtonGroup
            orientation="horizontal"
            aria-label="steps navigation group"
            variant="text"
            size="small"
            color="inherit"
          >
            <Button
              disabled={isFirst(history)}
              onClick={() => undoCmd()}
              color="inherit"
            >
              <ArrowBackIosRoundedIcon />
            </Button>
            <Button
              disabled={isLast(history)}
              onClick={() => redoCmd()}
              color="inherit"
            >
              <ArrowForwardIosRoundedIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={1}>
          <TextFieldDebounced
            initialValue={history.prev[0] ? history.prev[0].name : ''}
            label="name"
            onSubmit={(item) => {
              handleClose();
              changeNameCmd(item);
            }}
          />
        </Box>
      </Popover>
    </>
  );
};

HistoryTimeline.propTypes = {
  jumpCmd: PropTypes.func.isRequired,
  lockCmd: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  undoCmd: PropTypes.func.isRequired,
  redoCmd: PropTypes.func.isRequired,
  changeNameCmd: PropTypes.func.isRequired,
};

export default HistoryTimeline;
