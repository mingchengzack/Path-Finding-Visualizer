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

  toggleWall() {
    let new_type = this.state.type;
    if (
      this.state.type === nodeType.DEFAULT ||
      this.state.type === nodeType.VISITED ||
      this.state.type === nodeType.VISITED_NOANIMATION ||
      this.state.type === nodeType.PATH ||
      this.state.type === nodeType.PATH_NOANIMATION
    ) {
      new_type = nodeType.WALL;
      this.setState({ weight: weightType.DEFAULT });
    } else if (
      this.state.type === nodeType.WALL ||
      this.state.type === nodeType.WEIGHT_THREE ||
      this.state.type === nodeType.WEIGHT_FIVE ||
      this.state.type === nodeType.WEIGHT_EIGHT
    ) {
      new_type = nodeType.DEFAULT;
    }
    this.setState({ type: new_type });
    return new_type;
  }

  toggleWeight() {
    let new_weight;
    if (this.state.weight === weightType.DEFAULT) {
      if (this.state.type !== nodeType.WALL) {
        new_weight = this.props.weight;
      }
    } else {
      new_weight = weightType.DEFAULT;
    }
    this.setState({ weight: new_weight });
    return new_weight;
  }

  handleChangeNode = () => {
    let new_type = this.state.type;
    let new_weight = this.state.weight;
    if (
      this.state.type !== nodeType.START &&
      this.state.type !== nodeType.END
    ) {
      if (this.props.weight === weightType.DEFAULT) {
        new_type = this.toggleWall();
      } else {
        new_weight = this.toggleWeight();
      }
    }
    this.props.onMouseDown(this.state, new_type, new_weight);
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
        onMouseDown={() => this.handleChangeNode()}
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
