import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  preventDragHandler = e => {
    e.preventDefault();
  };

  render() {
    let { type } = this.props.node;
    let typename =
      type === nodeType.START
        ? "node-start"
        : type === nodeType.END
        ? "node-end"
        : type === nodeType.WALL
        ? "node-wall"
        : "";
    return (
      <div
        className={`node ${typename}`}
        onMouseDown={() =>
          this.props.onMouseDown(this.props.node, nodeType.WALL)
        }
        onMouseEnter={() =>
          this.props.onMouseEnter(this.props.node, nodeType.WALL)
        }
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
  WALL: 4
};
