/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import * as React from 'react';
import styled from '@emotion/styled';
import { Point } from '@projectstorm/geometry';
import ResizeObserver from 'resize-observer-polyfill';

export const Label = styled.div`
  display: inline-block;
  position: absolute;
`;

export const Foreign = styled.foreignObject`
  pointer-events: none;
  overflow: visible;
`;

export default class RadicalLabelParentWidget extends React.Component {
  ref;

  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { childRect: { width: 0, height: 0 } };
  }

  componentDidMount() {
    this.ob = new ResizeObserver(([entity]) => {
      this.state.childRect = entity.contentRect;
      this.forceUpdate();
    });

    this.ob.observe(this.ref.current);
  }

  componentWillUnmount() {
    this.ob.disconnect();
    this.ob = null;
  }

  render() {
    const pathCentre = Point.middlePoint(
      this.props.label.getParent().sourcePort?.position,
      this.props.label.getParent().targetPort?.position
    );
    const labelCoordinates = {
      x:
        pathCentre.x -
        this.state.childRect.width / 2 +
        this.props.label.getOptions().offsetX,
      y:
        pathCentre.y -
        this.state.childRect.height / 2 +
        this.props.label.getOptions().offsetY,
    };
    const canvas = this.props.engine.getCanvas();
    const label = this.props.engine
      .getFactoryForLabel(this.props.label)
      .generateReactWidget({ model: this.props.label });
    return (
      <Foreign
        key={this.props.label.getID()}
        width={canvas.offsetWidth}
        height={canvas.offsetHeight}
      >
        <Label
          ref={this.ref}
          style={{
            transform: `translate(${labelCoordinates.x}px, ${labelCoordinates.y}px)`,
          }}
        >
          {label}
        </Label>
      </Foreign>
    );
  }
}
