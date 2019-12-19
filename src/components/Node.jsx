import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.node.x,
      y: props.node.y,
      type: props.node.type,
      weight: props.weight,
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

  render() {
    let { type } = this.state;
    let typename =
      type === nodeType.START
        ? "node-start"
        : type === nodeType.END
        ? "node-end"
        : type === nodeType.WALL
        ? "node-wall"
        : type === nodeType.VISITED
        ? "node-visited"
        : type === nodeType.PATH
        ? "node-path"
        : type === nodeType.VISITED_NOANIMATION
        ? "node-visited-nonanimated"
        : type === nodeType.PATH_NOANIMATION
        ? "node-path-nonanimated"
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
        className={`node ${typename}`}
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
  WALL: 4,
  VISITED: 5,
  PATH: 6,
  VISITED_NOANIMATION: 7,
  PATH_NOANIMATION: 8
};

export const weightType = {
  DEFAULT: 1,
  WEIGHT_THREE: 2,
  WEIGHT_FIVE: 3,
  WEIGHT_EIGHT: 4
};
