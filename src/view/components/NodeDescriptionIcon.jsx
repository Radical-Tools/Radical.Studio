import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const descriptionIconStyle = (isExpanded, isParentAsymmetric) => ({
  color: isExpanded ? '#595959' : 'white',
  position: 'absolute',
  top: 10 + (isParentAsymmetric ? 15 : 0),
  right: 10,
});

const hasLinksWithDescription = (node) =>
  !!node.getOutgoingLinks().length &&
  node.getOutgoingLinks().some((link) => link.getDescription());
const NodeDescriptionIcon = ({ node, isParentAsymmetric }) =>
  node.getDescription() || hasLinksWithDescription(node) ? (
    <Tooltip
      title={
        <div>
          {node.getDescription() && (
            <>
              <Typography variant="subtitle1">Description:</Typography>
              <div>
                <Typography variant="caption">
                  {node.getDescription()}
                </Typography>
              </div>
            </>
          )}
          {hasLinksWithDescription(node) && (
            <>
              <Typography variant="subtitle1">
                Outgoing Relations Description:
              </Typography>
              <div>
                {node
                  .getOutgoingLinks()
                  .filter((link) => link.getDescription())
                  .map((link) => (
                    <div key={link.getID()}>
                      <Typography variant="subtitle2" display="block">
                        {`${link.getOptions().name} - ${
                          link.getTargetPort().getParent().getOptions().name
                        }:`}
                      </Typography>
                      <Typography variant="caption" display="block">
                        {link.getDescription()}
                      </Typography>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      }
      aria-label="description"
      placement="right-start"
      arrow
    >
      <DescriptionRoundedIcon
        sx={descriptionIconStyle(node.options.isExpanded, isParentAsymmetric)}
      />
    </Tooltip>
  ) : null;

NodeDescriptionIcon.propTypes = {
  node: PropTypes.objectOf(PropTypes.any).isRequired,
  isParentAsymmetric: PropTypes.bool.isRequired,
};

export default NodeDescriptionIcon;
