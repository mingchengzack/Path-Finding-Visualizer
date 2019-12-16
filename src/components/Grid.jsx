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
    this.state = {
      grid: [],
      isMousePressed: false,
      start: null,
      end: null,
      clickedNode: null
    };
  }

  getGridWithNewNode = (node, type) => {
    const { grid } = this.state;
    const { x, y } = node;
    if (grid[y][x].type === nodeType.DEFAULT) {
      grid[y][x].type = type;
    } else if (grid[y][x].type === type) {
      grid[y][x].type = nodeType.DEFAULT;
    }
    return grid;
  };

  handleMouseDown = (node, type) => {
    const grid = this.getGridWithNewNode(node, type);
    this.setState({ grid: grid, isMousePressed: true, clickedNode: node });
  };

  handleMouseEnter = (node, type) => {
    if (!this.state.isMousePressed) return;
    if (
      this.state.clickedNode.type !== nodeType.START &&
      this.state.clickedNode.type !== nodeType.END
    ) {
      const grid = this.getGridWithNewNode(node, type);
      this.setState({ grid });
    } else {
      if (node.type == nodeType.DEFAULT) {
        const { grid } = this.state;
        const prevX = this.state.clickedNode.x;
        const prevY = this.state.clickedNode.y;
        const { x, y } = node;
        grid[y][x].type = this.state.clickedNode.type;
        grid[prevY][prevX].type = nodeType.DEFAULT;
        this.setState({ grid: grid, clickedNode: grid[y][x] });
      }
    }
  };

  handleMouseUp = () => {
    this.setState({ isMousePressed: false, clickedNode: null });
  };

  componentDidMount() {
    let rows = this.props.rows;
    let cols = this.props.cols;
    let grid = [];
    let start = [];
    let end = [];

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
        if (node.type === nodeType.START) {
          start = node;
        } else if (node.type === nodeType.END) {
          end = node;
        }
        row.push(node);
      }
      grid.push(row);
    }
    this.setState({ grid, start, end });
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
                    node={node}
                    onMouseDown={this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseUp={this.handleMouseUp}
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
