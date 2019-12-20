import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.node.x,
      y: props.node.y,
      type: props.node.type,
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

  setNodeandAnimation = (type, animation) => {
    this.setState({ type, animation });
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
        : type === nodeType.WEIGHT_THREE
        ? "node-three"
        : type === nodeType.WEIGHT_FIVE
        ? "node-five"
        : type === nodeType.WEIGHT_EIGHT
        ? "node-eight"
        : "";

    let { animation } = this.state;
    let animationname =
      animation === animationType.VISITED
        ? "visited"
        : animation === animationType.PATH
        ? "path"
        : animation === animationType.GENERATE
        ? "generate"
        : animation === animationType.VISITED_NOANIMATION
        ? "visited-noanimation"
        : animation === animationType.PATH_NOANIMATION
        ? "path-noanimation"
        : "";

    return (
      <div
        className={`node ${typename} ${animationname}`}
        onMouseDown={() => this.props.onMouseDown(this.state)}
        onMouseEnter={() => this.props.onMouseEnter(this.state)}
        onMouseUp={() => this.props.onMouseUp()}
        onDragStart={this.preventDragHandler}
      ></div>
    );
  }
}

export default Node;
export const nodeType = {
  DEFAULT: 1,
  START: 2,
  END: 3,
  WALL: 4,
  WEIGHT_THREE: 5,
  WEIGHT_FIVE: 6,
  WEIGHT_EIGHT: 7
};

export const animationType = {
  DEFAULT: 1,
  VISITED: 2,
  PATH: 3,
  GENERATE: 4,
  VISITED_NOANIMATION: 5,
  PATH_NOANIMATION: 6
};
