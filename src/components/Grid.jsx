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
    this.state = { grid: [] };
  }

  handleChangeNode = (node, type) => {
    const { grid } = this.state;
    const { x, y } = node;
    if (grid[y][x].type === nodeType.DEFAULT) {
      grid[y][x].type = type;
      this.setState({ grid });
    }
  };

  componentDidMount() {
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
    this.setState({ grid });
  }

  render() {
    let { grid } = this.state;

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                return (
                  <Node
                    key={nodeIdx}
                    node={node}
                    onChangeNode={this.handleChangeNode}
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
