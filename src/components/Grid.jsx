import React, { Component } from "react";
import Node, { nodeType } from "./Node";
import { dijkstra, dijkstraPath } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";

import "./Node.css";

const DEFAULT_START_X = 14;
const DEFAULT_START_Y = 12;
const DEFAULT_END_X = 36;
const DEFAULT_END_Y = 12;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = this.constructInitGrid();
    this.startNode = this.grid[DEFAULT_START_Y][DEFAULT_START_X];
    this.endNode = this.grid[DEFAULT_END_Y][DEFAULT_END_X];
    this.isMousePressed = false;
    this.algorithm = null;
    this.clickedNode = null;
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  resetGrid() {
    let rows = this.props.rows;
    let cols = this.props.cols;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const type =
          j === DEFAULT_START_X && i === DEFAULT_START_Y
            ? nodeType.START
            : j === DEFAULT_END_X && i === DEFAULT_END_Y
            ? nodeType.END
            : nodeType.DEFAULT;
        let node = {
          x: j,
          y: i,
          type: type,
          isVisited: false,
          distance: Infinity,
          prevNode: null
        };
        this.grid[i][j] = node;
        this[`node-${i}-${j}`].setNode(type);
      }
    }
    this.startNode = this.grid[DEFAULT_START_Y][DEFAULT_START_X];
    this.endNode = this.grid[DEFAULT_END_Y][DEFAULT_END_X];
    this.algorithm = null;
  }

  resetGridforVisualize() {
    let rows = this.props.rows;
    let cols = this.props.cols;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.grid[i][j].prevNode = null;
        this.grid[i][j].distance = Infinity;
        this.grid[i][j].isVisited = false;
        if (
          this.grid[i][j].type === nodeType.VISITED ||
          this.grid[i][j].type === nodeType.PATH
        ) {
          this[`node-${i}-${j}`].setNode(nodeType.DEFAULT);
        }
      }
    }
  }

  visualize(algorithm, speed) {
    // reset the internal of the grid
    // and clear previous visualization
    this.resetGridforVisualize();
    this.algorithm = algorithm;
    const [visitedNodes, nodesInPath] = this.calculateVisualizedNodes(
      algorithm
    );
    this.animateNodes(visitedNodes, nodesInPath, speed);
  }

  adaptAlgorithm() {
    this.resetGridforVisualize();
    const [visitedNodes, nodesInPath] = this.calculateVisualizedNodes(
      this.algorithm
    );

    for (let i = 0; i < visitedNodes.length + nodesInPath.length; i++) {
      let node;
      if (i < visitedNodes.length) {
        node = visitedNodes[i];
        this[`node-${node.y}-${node.x}`].setNode(nodeType.VISITED_NOANIMATION);
      } else {
        node = nodesInPath[i - visitedNodes.length];
        this[`node-${node.y}-${node.x}`].setNode(nodeType.PATH_NOANIMATION);
      }
    }
  }

  calculateVisualizedNodes(algorithm) {
    let visitedNodes, nodesInPath;
    switch (algorithm) {
      case "Dijkstra":
        visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
        nodesInPath = dijkstraPath(this.startNode, this.endNode);
        break;
      case "A* Search":
        break;
      case "Depth First Search":
        visitedNodes = dfs(this.grid, this.startNode, this.endNode);
        nodesInPath = visitedNodes;
        break;
      case "Breadth First Search":
        visitedNodes = bfs(this.grid, this.startNode, this.endNode);
        nodesInPath = visitedNodes;
        break;
      default:
        visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
        nodesInPath = dijkstraPath(this.startNode, this.endNode);
        break;
    }
    return [visitedNodes, nodesInPath];
  }

  animateNodes(visitedNodes, nodesInPath, speed) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          for (let j = 0; j < nodesInPath.length; j++) {
            setTimeout(() => {
              const node = nodesInPath[j];
              this[`node-${node.y}-${node.x}`].setNode(nodeType.PATH);
            }, 10 + 4 * speed * j);
          }
        }, 10 + speed * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          this[`node-${node.y}-${node.x}`].setNode(nodeType.VISITED);
        }, 10 + speed * i);
      }
    }
  }

  handleMouseDown = (node, type) => {
    this.isMousePressed = true;
    this.clickedNode = node;
    this.grid[node.y][node.x].type = type;
  };

  handleMouseEnter = (node, type) => {
    if (!this.isMousePressed) return;
    if (
      this.clickedNode.type !== nodeType.START &&
      this.clickedNode.type !== nodeType.END
    ) {
      let new_type = node.type;
      if (
        node.type === nodeType.DEFAULT ||
        node.type === nodeType.VISITED ||
        node.type === nodeType.PATH
      ) {
        new_type = type;
      } else if (node.type === type) {
        new_type = nodeType.DEFAULT;
      }
      this[`node-${node.y}-${node.x}`].setNode(new_type);
      this.grid[node.y][node.x].type = new_type;
    } else {
      if (
        node.type !== nodeType.WALL &&
        node.type !== nodeType.START &&
        node.type !== nodeType.END
      ) {
        const prevX = this.clickedNode.x;
        const prevY = this.clickedNode.y;
        const { x, y } = node;
        this[`node-${prevY}-${prevX}`].setNode(nodeType.DEFAULT);
        this.grid[prevY][prevX].type = nodeType.DEFAULT;
        this[`node-${y}-${x}`].setNode(this.clickedNode.type);
        this.grid[y][x].type = this.clickedNode.type;
        if (this.grid[y][x].type === nodeType.START) {
          this.startNode = this.grid[y][x];
        } else {
          this.endNode = this.grid[y][x];
        }
        this.clickedNode.x = x;
        this.clickedNode.y = y;

        if (this.algorithm) {
          this.adaptAlgorithm();
        }
      }
    }
  };

  handleMouseUp = () => {
    this.isMousePressed = false;
    this.clickedNode = null;
  };

  constructInitGrid() {
    let rows = this.props.rows;
    let cols = this.props.cols;
    let grid = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        const type =
          j === DEFAULT_START_X && i === DEFAULT_START_Y
            ? nodeType.START
            : j === DEFAULT_END_X && i === DEFAULT_END_Y
            ? nodeType.END
            : nodeType.DEFAULT;
        let node = {
          x: j,
          y: i,
          type: type,
          isVisited: false,
          distance: Infinity,
          prevNode: null
        };
        row.push(node);
      }
      grid.push(row);
    }
    return grid;
  }

  render() {
    return (
      <div className="grid">
        {this.grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} id="row">
              {row.map((node, nodeIdx) => {
                return (
                  <Node
                    key={nodeIdx}
                    id={`node-${rowIdx}-${nodeIdx}`}
                    node={node}
                    onMouseDown={this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseUp={this.handleMouseUp}
                    onRef={ref => (this[`node-${rowIdx}-${nodeIdx}`] = ref)}
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
