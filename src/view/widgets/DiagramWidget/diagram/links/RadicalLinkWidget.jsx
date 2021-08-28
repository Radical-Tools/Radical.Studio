/* eslint-disable react/prop-types */
import { DefaultLinkWidget } from '@projectstorm/react-diagrams';
import * as React from 'react';
import RadicalLinkSegmentWidget from './RadicalLinkSegmentWidget';
import { getCanvasLink } from '../../../../../test/getDataTestId';

const CustomLinkArrowWidget = ({ point, previousPoint, color }) => {
  const angle =
    (Math.atan2(
      point.position.y - previousPoint.position.y,
      point.position.x - previousPoint.position.x
    ) *
      180) /
      Math.PI +
    90;
  return (
    <g
      className="arrow"
      transform={`translate(${point.getPosition().x}, ${
        point.getPosition().y
      })`}
    >
      <g style={{ transform: `rotate(${angle}deg)` }}>
        <g transform="translate(0, -12)">
          <polygon
            points="0,10 7,25 -7,25"
            fill={color}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          />
        </g>
      </g>
    </g>
  );
};

export default class RadicalLinkWidget extends DefaultLinkWidget {
  generateArrow(type, point, previousPoint) {
    return (
      <CustomLinkArrowWidget
        key={this.props.link.getID()}
        point={point}
        previousPoint={previousPoint}
        color={this.props.link.getOptions().color}
      />
    );
  }

  generateLink(path, extraProps, id) {
    const ref = React.createRef();
    this.refPaths.push(ref);
    return (
      <RadicalLinkSegmentWidget
        key={`link-${id}`}
        path={path}
        selected={this.state.selected}
        diagramEngine={this.props.diagramEngine}
        factory={this.props.factory}
        link={this.props.link}
        forwardRef={ref}
      />
    );
  }

  render() {
    // ensure id is present for all points on the path
    const points = this.props.link.getPoints();
    const paths = [];
    this.refPaths = [];

    if (points.length === 2) {
      paths.push(this.generateLink(this.props.link.getSVGPath(), '0'));
    }
    if (this.props.link.getTargetPort() !== null) {
      paths.push(
        this.generateArrow(
          this.props.link.getTargetPort().getOptions().alignment,
          points[points.length - 1],
          points[points.length - 2]
        )
      );
    }
    return (
      <g
        data-testid={getCanvasLink(
          this.props.link.getOptions().name,
          this.props.link.getSourcePort().getNode().getOptions().name,
          this.props.link.getTargetPort().getNode().getOptions().name
        )}
        style={{ strokeDasharray: 7 }}
        data-default-link-test={this.props.link.getOptions().testName}
      >
        {paths}
      </g>
    );
  }
}
