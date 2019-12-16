import React, { Component } from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";
import Node from "./Node";

class PathfindingVisualizer extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Grid rows={20} cols={50} />
      </div>
    );
  }
}

export default PathfindingVisualizer;
