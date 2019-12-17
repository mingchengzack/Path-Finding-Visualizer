import React, { Component } from "react";
import Node, { nodeType } from "./Node";

import "./Node.css";

const DEFAULT_START_X = 8;
const DEFAULT_START_Y = 12;
const DEFAULT_END_X = 42;
const DEFAULT_END_Y = 12;

class Grid extends Component {
  constructor(props) {
    super(props);
    const grid = this.constructInitGrid();
    this.state = {
      grid: grid
    };
    this.isMousePressed = false;
    this.clickedNode = null;
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  resetGrid() {
    let rows = this.props.rows;
    let cols = this.props.cols;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const type =
          j === DEFAULT_START_X && i === DEFAULT_START_Y
            ? nodeType.START
            : j === DEFAULT_END_X && i === DEFAULT_END_Y
            ? nodeType.END
            : nodeType.DEFAULT;
        this[`node-${i}-${j}`].setNode(type);
      }
    }
  }

  handleMouseDown = node => {
    this.isMousePressed = true;
    this.clickedNode = node;
  };

  handleMouseEnter = (node, type) => {
    if (!this.isMousePressed) return;
    if (
      this.clickedNode.type !== nodeType.START &&
      this.clickedNode.type !== nodeType.END
    ) {
      let new_type;
      if (node.type === nodeType.DEFAULT) {
        new_type = type;
      } else if (node.type === type) {
        new_type = nodeType.DEFAULT;
      }
      this[`node-${node.y}-${node.x}`].setNode(new_type);
    } else {
      if (node.type === nodeType.DEFAULT) {
        const prevX = this.clickedNode.x;
        const prevY = this.clickedNode.y;
        const { x, y } = node;
        this[`node-${prevY}-${prevX}`].setNode(nodeType.DEFAULT);
        this[`node-${y}-${x}`].setNode(this.clickedNode.type);
        this.clickedNode.x = x;
        this.clickedNode.y = y;
      }
    }
  };

  handleMouseUp = () => {
    this.isMousePressed = false;
    this.clickedNode = null;
  };

  constructInitGrid() {
    let rows = this.props.rows;
    let cols = this.props.cols;
    let grid = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let node = {
          x: j,
          y: i,
          type:
            j === DEFAULT_START_X && i === DEFAULT_START_Y
              ? nodeType.START
              : j === DEFAULT_END_X && i === DEFAULT_END_Y
              ? nodeType.END
              : nodeType.DEFAULT
        };
        row.push(node);
      }
      grid.push(row);
    }
    return grid;
  }

  render() {
    let { grid } = this.state;

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} id="row">
              {row.map((node, nodeIdx) => {
                return (
                  <Node
                    key={nodeIdx}
                    id={`node-${rowIdx}-${nodeIdx}`}
                    node={node}
                    onMouseDown={this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseUp={this.handleMouseUp}
                    onRef={ref => (this[`node-${rowIdx}-${nodeIdx}`] = ref)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;
