import { DefaultLinkPointWidget } from '@projectstorm/react-diagrams';
import * as React from 'react';
import styled from '@emotion/styled';

export default class RadicalLinkPointWidget extends DefaultLinkPointWidget {
  render() {
    const { point } = this.props;
    const PointTop = styled.circle`
      pointer-events: all;
    `;
    return (
      <g>
        <circle
          cx={point.getPosition().x}
          cy={point.getPosition().y}
          r={5}
          fill={
            this.state.selected || this.props.point.isSelected()
              ? this.props.colorSelected
              : this.props.color
          }
        />
        <PointTop
          className="point"
          onMouseLeave={() => {
            this.setState({ selected: false });
          }}
          onMouseEnter={() => {
            this.setState({ selected: true });
          }}
          data-id={point.getID()}
          data-linkid={point.getLink().getID()}
          cx={point.getPosition().x}
          cy={point.getPosition().y}
          r={15}
          opacity={0.0}
        />
      </g>
    );
  }
}
