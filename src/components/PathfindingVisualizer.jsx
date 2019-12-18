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

const speeds = ["Fast", "Medium", "Slow"];

class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = { curAlgorithm: "Dijkstra", curSpeed: "Fast" };
  }

  handleChangeAlgorithm = algorithm => {
    this.setState({ curAlgorithm: algorithm });
  };

  handleChangeSpeed = speedName => {
    this.setState({ curSpeed: speedName });
  };

  handleReset = () => {
    this.grid.resetGrid();
  };

  handleVisualize = () => {
    let speed = 3;
    switch (this.state.curSpeed) {
      case "Fast":
        speed = 3;
        break;
      case "Medium":
        speed = 7;
        break;
      case "Slow":
        speed = 11;
        break;
      default:
        speed = 3;
        break;
    }
    this.grid.visualize(this.state.curAlgorithm, speed);
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
              name={"Speed"}
              type={"dropdown"}
              itemList={speeds}
              curItem={this.state.curSpeed}
              onChangeItem={this.handleChangeSpeed}
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
