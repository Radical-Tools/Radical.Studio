import * as React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const descriptionIconStyle = (isExpanded) => ({
  color: isExpanded ? '#595959' : 'white',
  position: 'absolute',
  top: 10,
  right: 10,
});

const NodeDescriptionIcon = ({ node }) => (
  <Tooltip
    title={
      <div>
        <Typography variant="subtitle1">Description:</Typography>
        <div>
          <Typography variant="caption">
            {node.options.attributes?.description || '-'}
          </Typography>
        </div>
        <Typography variant="subtitle1">Outgoing Relations:</Typography>
        <div>
          {node
            .getLinks()
            .filter(
              (element) =>
                element.getSourcePort().getParent().getID() === node.getID()
            )
            .map((element) => (
              <div key={element.getID()}>
                <Typography variant="subtitle2" display="block">
                  {`${element.getOptions().name} - ${
                    element.getTargetPort().getParent().getOptions().name
                  }:`}
                </Typography>
                <Typography variant="caption" display="block">
                  {element.getOptions().attributes?.description}
                </Typography>
              </div>
            ))}
        </div>
      </div>
    }
    aria-label="description"
    placement="right-start"
    arrow
  >
    <VisibilityIcon sx={descriptionIconStyle(node.options.isExpanded)} />
  </Tooltip>
);

NodeDescriptionIcon.propTypes = {
  node: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NodeDescriptionIcon;
