import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Grid from "./Grid";
import { nodeType } from "./Node";
import Navitem from "./Navitem";
import select from "../imgs/select.svg";
import visual from "../imgs/visual.svg";
import add from "../imgs/add.svg";
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
      curNodeType: "Wall"
    };
  }

  handleChangeAlgorithm = algorithm => {
    this.setState({ curAlgorithm: algorithm });
  };

  handleChangeSpeed = speedname => {
    this.setState({ curSpeed: speedname });
  };

  handleChangeNodeType = nodetype => {
    this.setState({ curNodeType: nodetype });
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
    let nodetype =
      this.state.curNodeType === "Weight 3"
        ? nodeType.WEIGHT_THREE
        : this.state.curNodeType === "Weight 5"
        ? nodeType.WEIGHT_FIVE
        : this.state.curNodeType === "Weight 8"
        ? nodeType.WEIGHT_EIGHT
        : nodeType.WALL;
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
              curItem={this.state.curNodeType}
              onChangeItem={this.handleChangeNodeType}
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
        <div id="info">
          <ul>
            <li>
              <div className="start"></div>
              Start Node
            </li>
            <li>
              <div className="end"></div>
              End Node
            </li>
            <li>
              <div className="wall"></div>
              Wall Node
            </li>
            <li>
              <div className="weight3"></div>
              Weight 3
            </li>
            <li>
              <div className="weight5"></div>
              Weight 5
            </li>
            <li>
              <div className="weight8"></div>
              Weight 8
            </li>
            <li>
              <div className="unvisited-node"></div>
              Unvisited Node
            </li>
            <li>
              <div className="visited-node"></div>
              Visited Node
            </li>
            <li>
              <div className="path-node"></div>
              Path Node
            </li>
          </ul>
        </div>
        <div className="instruction">
          <ul>
            <li>
              <img src={select} />
              <div> Pick an Algorithm </div>
            </li>
          </ul>
          <ul>
            <li>
              <img src={add} />
              <div id="middle"> Add Wall or Weighted Nodes </div>
            </li>
          </ul>
          <ul>
            <li>
              <img src={visual} />
              <div> Visualize and Enjoy! </div>
            </li>
          </ul>
        </div>
        <Grid
          rows={23}
          cols={59}
          algorithm={this.state.curAlgorithm}
          nodetype={nodetype}
          onRef={ref => (this.grid = ref)}
        />
      </div>
    );
  }
}

export default PathfindingVisualizer;
