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
  "Greedy Best-First Search",
  "Depth-First Search",
  "Breadth-First Search"
];

const maze = [
  "Random Wall",
  "Random Weight",
  "Random Traversal",
  "Depth-First Search",
  "Recursive Division"
];

const weights = ["Wall", "Weight 3", "Weight 5", "Weight 8"];

const speeds = ["Fast", "Medium", "Slow"];

class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.curAlgorithm = "Dijkstra";
    this.curSpeed = "Fast";
    this.curNodeType = "Wall";
    this.curMaze = "Random Wall";
  }

  handleChangeAlgorithm = algorithm => {
    this.curAlgorithm = algorithm;
    this.grid.chosenAlgorithm = algorithm;
  };

  handleChangeMaze = mazeType => {
    this.curMaze = mazeType;
  };

  handleChangeSpeed = speedname => {
    this.curSpeed = speedname;
  };

  handleChangeNodeType = nodetype => {
    this.curNodeType = nodetype;
    this.grid.nodetype =
      this.curNodeType === "Weight 3"
        ? nodeType.WEIGHT_THREE
        : this.curNodeType === "Weight 5"
        ? nodeType.WEIGHT_FIVE
        : this.curNodeType === "Weight 8"
        ? nodeType.WEIGHT_EIGHT
        : nodeType.WALL;
  };

  handleReset = () => {
    this.grid.resetGrid();
  };

  handleGenerateMaze = () => {
    this.grid.generateMaze(this.curMaze);
  };

  handleVisualize = () => {
    let speed = 12;
    switch (this.curSpeed) {
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
    if (window.innerWidth > 1440) {
      speed = speed / 2;
    }
    this.grid.visualize(this.curAlgorithm, speed);
  };

  render() {
    let row = Math.ceil(window.innerHeight / 25) - 9;
    let col = Math.ceil(window.innerWidth / 25) + 1;
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
              name={"Generate Maze"}
              type={"button"}
              onClick={this.handleGenerateMaze}
            />
            <Navitem
              name={"Reset"}
              type={"button"}
              onClick={this.handleReset}
            />
            <Navitem
              name={"Algorithms"}
              type={"dropdown"}
              itemList={algorithms}
              curItem={this.curAlgorithm}
              onChangeItem={this.handleChangeAlgorithm}
            />
            <Navitem
              name={"Maze"}
              type={"dropdown"}
              itemList={maze}
              curItem={this.curMaze}
              onChangeItem={this.handleChangeMaze}
            />
            <Navitem
              name={"Add Node"}
              type={"dropdown"}
              itemList={weights}
              curItem={this.curNodeType}
              onChangeItem={this.handleChangeNodeType}
            />
            <Navitem
              name={"Speed"}
              type={"dropdown"}
              itemList={speeds}
              curItem={this.curSpeed}
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
              <img src={select} alt="select" />
              <div> Pick an Algorithm </div>
            </li>
          </ul>
          <ul>
            <li>
              <img src={add} alt="select" />
              <div id="middle"> Add Wall, Weighted Nodes or Generate Maze </div>
            </li>
          </ul>
          <ul>
            <li>
              <img src={visual} alt="select" />
              <div> Visualize and Enjoy! </div>
            </li>
          </ul>
        </div>
        <Grid rows={row} cols={col} onRef={ref => (this.grid = ref)} />
      </div>
    );
  }
}

export default PathfindingVisualizer;
