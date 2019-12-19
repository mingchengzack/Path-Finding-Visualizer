import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.node.x,
      y: props.node.y,
      type: props.node.type,
      weight: weightType.DEFAULT,
      animation: animationType.DEFAULT,
      canModify: true
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  preventDragHandler = e => {
    e.preventDefault();
  };

  setWeightType = weight => {
    this.setState({ weight });
  };

  setNode = type => {
    this.setState({ type });
  };

  setAnimation = animation => {
    this.setState({ animation });
  };

  render() {
    let { type } = this.state;
    let typename =
      type === nodeType.START
        ? "node-start"
        : type === nodeType.END
        ? "node-end"
        : type === nodeType.WALL
        ? "node-wall"
        : "";

    let { animation } = this.state;
    let animationname =
      animation === animationType.VISITED
        ? "visited"
        : animation === animationType.PATH
        ? "path"
        : animation === animationType.VISITED_NOANIMATION
        ? "visited-noanimation"
        : animation === animationType.PATH_NOANIMATION
        ? "path-noanimation"
        : "";

    let { weight } = this.state;
    let weightname =
      weight === weightType.WEIGHT_THREE
        ? "node-three"
        : weight === weightType.WEIGHT_FIVE
        ? "node-five"
        : weight === weightType.WEIGHT_EIGHT
        ? "node-eight"
        : "";

    return (
      <div
        className={`node ${typename} ${animationname}`}
        onMouseDown={() => this.props.onMouseDown(this.state)}
        onMouseEnter={() => this.props.onMouseEnter(this.state)}
        onMouseUp={() => this.props.onMouseUp()}
        onDragStart={this.preventDragHandler}
      >
        <div className={`${weightname}`}></div>
      </div>
    );
  }
}

export default Node;
export const nodeType = {
  DEFAULT: 1,
  START: 2,
  END: 3,
  WALL: 4
};

export const animationType = {
  DEFAULT: 1,
  VISITED: 2,
  PATH: 3,
  VISITED_NOANIMATION: 4,
  PATH_NOANIMATION: 5
};

export const weightType = {
  DEFAULT: 1,
  WEIGHT_THREE: 2,
  WEIGHT_FIVE: 3,
  WEIGHT_EIGHT: 4
};
