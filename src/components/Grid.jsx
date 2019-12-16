import React, { Component } from "react";
import Node from "./Node";

import "./Node.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = { grid: [] };
  }

  componentDidMount() {
    const rows = this.props.rows;
    const cols = this.props.cols;
    const grid = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push([]);
      }
      grid.push(row);
    }
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                return <Node key={nodeIdx}> </Node>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;
