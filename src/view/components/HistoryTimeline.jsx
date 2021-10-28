import Button from '@material-ui/core/Button';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import CircleIcon from '@material-ui/icons//Circle';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Popover,
  Step,
  StepButton,
  StepConnector,
  Stepper,
  Tooltip,
} from '@material-ui/core';
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
  rollbackCmd,
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
        <Box width="auto" alignItems="center">
          <Stepper
            activeStep={history.prev.length + history.next.length}
            connector={
              <StepConnector
                sx={{
                  width: '40px',
                }}
              />
            }
          >
            <Step key="initial">
              <StepButton
                icon={
                  <CircleIcon
                    color={history.prev.length === 0 ? 'secondary' : 'inherit'}
                  />
                }
                onClick={() => jumpCmd(-history.prev.length)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  if (history.prev.length === 0) {
                    handleClick(event);
                  }
                }}
              />
            </Step>
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
          {history.prev[0] && (
            <TextFieldDebounced
              initialValue={history.prev[0].name}
              label="Name"
              onSubmit={(item) => {
                handleClose();
                changeNameCmd(item);
              }}
            />
          )}
          <Tooltip
            placement="bottom"
            title={
              <Typography variant="caption">Rollback to this state</Typography>
            }
          >
            <span>
              <Button
                disabled={isLast(history)}
                onClick={() => {
                  handleClose();
                  rollbackCmd();
                }}
                color="primary"
              >
                <SettingsBackupRestoreIcon />
              </Button>
            </span>
          </Tooltip>
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
  rollbackCmd: PropTypes.func.isRequired,
};

export default HistoryTimeline;
