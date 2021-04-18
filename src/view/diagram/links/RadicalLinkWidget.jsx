/* eslint-disable react/prop-types */
import { DefaultLinkWidget, LinkWidget } from '@projectstorm/react-diagrams';
import * as React from 'react';
import RadicalLinkPointWidget from './RadicalLinkPointWidget';

const CustomLinkArrowWidget = ({ point, type, color }) => {
  let angle = 0;
  switch (type) {
    case 'left':
      angle = 90;
      break;
    case 'right':
      angle = 270;
      break;
    case 'bottom':
      angle = 0;
      break;
    case 'top':
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

  generatePoint(point) {
    return (
      <RadicalLinkPointWidget
        key={point.getID()}
        point={point}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
      />
    );
  }

  render() {
    // ensure id is present for all points on the path
    const points = this.props.link.getPoints();
    const paths = [];
    this.refPaths = [];

    if (this.props.link.getOptions().show === false) {
      return (
        <g data-default-link-test={this.props.link.getOptions().testName}>{}</g>
      );
    }

    if (points.length === 2) {
      paths.push(
        this.generateLink(
          this.props.link.getSVGPath(),
          {
            onMouseDown: () => {
              // todo: uncomment to enable adding points to the links
              // this.addPointToLink(event, 1);
            },
          },
          '0'
        )
      );

      // draw the link as dangeling
      if (this.props.link.getTargetPort() == null) {
        paths.push(this.generatePoint(points[1]));
      }
    } else {
      // draw the multiple anchors and complex line instead
      for (let j = 0; j < points.length - 1; j++) {
        paths.push(
          this.generateLink(
            LinkWidget.generateLinePath(points[j], points[j + 1]),
            {
              'data-linkid': this.props.link.getID(),
              'data-point': j,
              onMouseDown: (event) => {
                this.addPointToLink(event, j + 1);
              },
            },
            j
          )
        );
      }

      // render the circles
      for (let i = 1; i < points.length - 1; i++) {
        paths.push(this.generatePoint(points[i]));
      }

      if (this.props.link.getTargetPort() == null) {
        paths.push(this.generatePoint(points[points.length - 1]));
      }
    }
    if (this.props.link.getTargetPort() !== null) {
      paths.push(
        this.generateArrow(
          this.props.link.getTargetPort().getOptions().name,
          points[points.length - 1],
          points[points.length - 2]
        )
      );
    } else {
      // paths.push(this.generatePoint(points[points.length - 1]));
    }

    // to not show the dangling link while creating
    // if (this.props.link.getTargetPort() === null) {
    //     return <g data-default-link-test={this.props.link.getOptions().testName}>{}</g>
    // }

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
