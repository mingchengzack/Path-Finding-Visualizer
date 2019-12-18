import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = { x: props.node.x, y: props.node.y, type: props.node.type };
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

  handleChangeNode = type => {
    let new_type = this.state.type;
    if (
      this.state.type === nodeType.DEFAULT ||
      this.state.type === nodeType.VISITED ||
      this.state.type === nodeType.VISITED_NOANIMATION ||
      this.state.type === nodeType.PATH ||
      this.state.type === nodeType.PATH_NOANIMATION
    ) {
      new_type = type;
    } else if (this.state.type === type) {
      new_type = nodeType.DEFAULT;
    }
    this.setState({ type: new_type });
    this.props.onMouseDown(this.state, new_type);
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
    return (
      <div
        className={`node ${typename}`}
        onMouseDown={() => this.handleChangeNode(nodeType.WALL)}
        onMouseEnter={() => this.props.onMouseEnter(this.state, nodeType.WALL)}
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
  VISITED: 5,
  PATH: 6,
  VISITED_NOANIMATION: 7,
  PATH_NOANIMATION: 8
};
