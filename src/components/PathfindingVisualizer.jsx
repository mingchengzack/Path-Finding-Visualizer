import React, { Component } from "react";
import Grid from "./Grid";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Navitem from "./Navitem";
import "./Navbar.css";

const algorithms = [
  "Dijkstra",
  "A* Search",
  "Depth First Search",
  "Breadth First Search"
];

const weights = ["Wall", "Weight 3", "Weight 5", "Weight 8"];

const speeds = ["Fast", "Medium", "Slow"];

class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      curAlgorithm: "Dijkstra",
      curSpeed: "Fast",
      curWeight: "Wall"
    };
  }

  handleChangeAlgorithm = algorithm => {
    this.setState({ curAlgorithm: algorithm });
  };

  handleChangeSpeed = speedName => {
    this.setState({ curSpeed: speedName });
  };

  handleChangeWeight = weightname => {
    this.setState({ curWeight: weightname });
    this.grid.changeWeightType(weightname);
  };

  handleReset = () => {
    this.grid.resetGrid();
  };

  handleVisualize = () => {
    let speed = 12;
    switch (this.state.curSpeed) {
      case "Fast":
        speed = 12;
        break;
      case "Medium":
        speed = 16;
        break;
      case "Slow":
        speed = 20;
        break;
      default:
        speed = 12;
        break;
    }
    this.grid.visualize(this.state.curAlgorithm, speed);
  };

  render() {
    return (
      <div>
        <Navbar variant="custom">
          <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
          <Nav>
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
              name={"Add Node"}
              type={"dropdown"}
              itemList={weights}
              curItem={this.state.curWeight}
              onChangeItem={this.handleChangeWeight}
            />
            <Navitem
              name={"Algorithms"}
              type={"dropdown"}
              itemList={algorithms}
              curItem={this.state.curAlgorithm}
              onChangeItem={this.handleChangeAlgorithm}
            />
            <Navitem
              name={"Speed"}
              type={"dropdown"}
              itemList={speeds}
              curItem={this.state.curSpeed}
              onChangeItem={this.handleChangeSpeed}
            />
          </Nav>
        </Navbar>
        <Grid
          rows={24}
          cols={54}
          algorithm={this.state.curAlgorithm}
          weightname={this.state.curWeight}
          onRef={ref => (this.grid = ref)}
        />
      </div>
    );
  }
}

export default PathfindingVisualizer;
