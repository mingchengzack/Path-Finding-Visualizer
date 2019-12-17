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
    this.state = { curAlgorithm: "Dijkstra" };
  }

  handleChangeAlgorithm = algorithm => {
    this.setState({ curAlgorithm: algorithm });
  };

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Pathfinding Visualizer</Navbar.Brand>
          <Nav className="mr-auto">
            <Navitem name={"Visualize"} type={"button"} />
            <Navitem name={"Clear Board"} type={"button"} />
            <Navitem
              name={"Algorithms"}
              type={"dropdown"}
              itemList={algorithms}
              curItem={this.state.curAlgorithm}
              onChangeItem={this.handleChangeAlgorithm}
            />
          </Nav>
        </Navbar>
        <Grid rows={24} cols={54} />
      </div>
    );
  }
}

export default PathfindingVisualizer;
