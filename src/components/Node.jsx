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
    if (this.state.type === nodeType.DEFAULT) {
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
  WALL: 4
};
