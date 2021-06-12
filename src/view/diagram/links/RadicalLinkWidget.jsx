/* eslint-disable react/prop-types */
import {
  DefaultLinkWidget,
  PortModelAlignment,
} from '@projectstorm/react-diagrams';
import * as React from 'react';
import RadicalLinkSegmentWidget from './RadicalLinkSegmentWidget';

const CustomLinkArrowWidget = ({ point, type, color }) => {
  let angle = 0;
  switch (type) {
    case PortModelAlignment.LEFT:
      angle = 90;
      break;
    case PortModelAlignment.RIGHT:
      angle = 270;
      break;
    case PortModelAlignment.BOTTOM:
      angle = 0;
      break;
    case PortModelAlignment.TOP:
      angle = 180;
      break;
    default:
  }

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
        key={point.getID()}
        point={point}
        previousPoint={previousPoint}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
        type={type}
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
        factory={this.props.diagramEngine.getFactoryForLink(this.props.link)}
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
        style={{ strokeDasharray: 7 }}
        data-default-link-test={this.props.link.getOptions().testName}
      >
        {paths}
      </g>
    );
  }
}
