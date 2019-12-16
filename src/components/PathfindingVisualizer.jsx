import React, { Component } from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";

class PathfindingVisualizer extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Grid rows={24} cols={54} />
      </div>
    );
  }
}

export default PathfindingVisualizer;
