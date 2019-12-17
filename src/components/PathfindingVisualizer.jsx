import React, { Component } from "react";
import Grid from "./Grid";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Navitem from "./Navitem";
import "./Navbar.css";

const algorithms = [
  "Dijkstra",
  "A*",
  "Depth First Search",
  "Breadth First Search"
];

class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = { curAlgorithm: "Dijkstra", reset: false };
  }

  handleChangeAlgorithm = algorithm => {
    this.setState({ curAlgorithm: algorithm });
  };

  handleReset = () => {
    this.grid.resetGrid();
  };

  handleVisualize = () => {
    console.log("visualize");
  };

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
          <Nav className="mr-auto">
            <Navitem
              name={"Visualize"}
              type={"button"}
              onClick={this.handleVisualize}
            />
            <Navitem
              name={"Reset Board"}
              type={"button"}
              onClick={this.handleReset}
            />
            <Navitem
              name={"Algorithms"}
              type={"dropdown"}
              itemList={algorithms}
              curItem={this.state.curAlgorithm}
              onChangeItem={this.handleChangeAlgorithm}
            />
          </Nav>
        </Navbar>
        <Grid rows={24} cols={54} onRef={ref => (this.grid = ref)} />
      </div>
    );
  }
}

export default PathfindingVisualizer;
