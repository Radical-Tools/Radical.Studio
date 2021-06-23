import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useAccordionDetailsStyle = makeStyles(() => ({
  root: {
    padding: '0px 8px 0px 8px',
  },
}));

const useAccordionStyle = makeStyles(() => ({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}));

const useAccordionSummaryStyle = makeStyles(() => ({
  root: {
    borderBottom: '0px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 30,
    '&$expanded': {
      minHeight: 30,
    },
  },
  content: {
    '&$expanded': {
      margin: '6px 0',
    },
    margin: '6px 0',
  },
  expanded: {},
}));

const AccordionItem = ({
  logoRender,
  name,
  onCustomAction,
  disabled,
  onClick,
  expanded,
  children,
}) => {
  const detailsStyle = useAccordionDetailsStyle();
  const summaryStyle = useAccordionSummaryStyle();
  const generalStyle = useAccordionStyle();

  return (
    <div>
      <Accordion
        disabled={disabled}
        classes={generalStyle}
        key={name}
        square
        expanded={expanded}
        onChange={onClick(name)}
      >
        <AccordionSummary
          classes={summaryStyle}
          aria-controls={`panel-${name}`}
          id={`panel-${name}-header`}
        >
          <Box display="flex" alignItems="center">
            {logoRender}
          </Box>
          <Box ml={1} width="100%" display="flex" alignItems="center">
            <Typography variant="body1">{name}</Typography>
          </Box>
          {onCustomAction && (
            <Box flexShrink={0} display="flex" alignItems="center">
              <IconButton
                aria-label="add new item"
                onClick={(event) => {
                  event.stopPropagation();
                  onCustomAction();
                }}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails classes={detailsStyle}>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

AccordionItem.defaultProps = {
  disabled: false,
  onCustomAction: undefined,
  children: <div />,
};

AccordionItem.propTypes = {
  logoRender: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.element,
  onCustomAction: PropTypes.func,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AccordionItem;
