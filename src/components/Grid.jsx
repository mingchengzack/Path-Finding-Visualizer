import React, { Component } from "react";
import Node, { nodeType, weightType } from "./Node";
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
    let weight =
      this.props.weightname === "Weight 3"
        ? weightType.WEIGHT_THREE
        : this.props.weightname === "Weight 5"
        ? weightType.WEIGHT_FIVE
        : this.props.weightname === "Weight 8"
        ? weightType.WEIGHT_EIGHT
        : weightType.DEFAULT;

    this.state = { weight: weight };
    this.grid = this.constructInitGrid();
    this.startNode = this.grid[DEFAULT_START_Y][DEFAULT_START_X];
    this.endNode = this.grid[DEFAULT_END_Y][DEFAULT_END_X];
    this.isMousePressed = false;
    this.algorithm = null;
    this.clickedNode = null;
    this.modfiedNodes = [];
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  changeWeightType(weightname) {
    let weight =
      weightname === "Weight 3"
        ? weightType.WEIGHT_THREE
        : weightname === "Weight 5"
        ? weightType.WEIGHT_FIVE
        : weightname === "Weight 8"
        ? weightType.WEIGHT_EIGHT
        : weightType.DEFAULT;
    this.setState({ weight });
  }

  resetGrid() {
    let rows = this.props.rows;
    let cols = this.props.cols;
    this.algorithm = null;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          this.grid[i][j].type !== nodeType.START &&
          this.grid[i][j].type !== nodeType.END
        ) {
          this.grid[i][j].type = nodeType.DEFAULT;
          this.grid[i][j].weight = 1;
          this[`node-${i}-${j}`].setNode(nodeType.DEFAULT);
          this[`node-${i}-${j}`].setWeightType(weightType.DEFAULT);
        }
      }
    }
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
          this.grid[i][j].type = nodeType.DEFAULT;
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
      this.props.algorithm
    );

    for (let i = 0; i < visitedNodes.length + nodesInPath.length; i++) {
      let node;
      if (i < visitedNodes.length) {
        node = visitedNodes[i];
        node.type = nodeType.VISITED;
        this[`node-${node.y}-${node.x}`].setNode(nodeType.VISITED_NOANIMATION);
      } else {
        node = nodesInPath[i - visitedNodes.length];
        node.type = nodeType.PATH;
        this[`node-${node.y}-${node.x}`].setNode(nodeType.PATH_NOANIMATION);
      }
    }
  }

  calculateVisualizedNodes(algorithm) {
    let visitedNodes, nodesInPath, find;
    switch (algorithm) {
      case "Dijkstra":
        visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
        nodesInPath = dijkstraPath(this.startNode, this.endNode);
        break;
      case "A* Search":
        break;
      case "Depth First Search":
        [visitedNodes, find] = dfs(this.grid, this.startNode, this.endNode);
        nodesInPath = find ? visitedNodes : [];
        break;
      case "Breadth First Search":
        [visitedNodes, find] = bfs(this.grid, this.startNode, this.endNode);
        nodesInPath = find ? visitedNodes : [];
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
              node.type = nodeType.PATH;
              this[`node-${node.y}-${node.x}`].setNode(nodeType.PATH);
            }, 10 + 2 * speed * j);
          }
        }, 10 + speed * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          node.type = nodeType.VISITED;
          this[`node-${node.y}-${node.x}`].setNode(nodeType.VISITED);
        }, 10 + speed * i);
      }
    }
  }

  handleMouseDown = (node, type) => {
    this.isMousePressed = true;

    // copy the node state
    this.clickedNode = {
      ...node
    };

    let { weight } = this.state;
    if (weight === weightType.DEFAULT) {
      this.grid[node.y][node.x].type = type;
    } else {
      let w =
        weight === weightType.WEIGHT_THREE
          ? 3
          : weight === weightType.WEIGHT_FIVE
          ? 5
          : weight === weightType.WEIGHT_EIGHT
          ? 8
          : 1;
      this.grid[node.y][node.x].weight = w;
    }

    // can only modify the node once (for non-start, non-end nodes)
    if (
      this.clickedNode.type !== nodeType.START &&
      this.clickedNode.type !== nodeType.END
    ) {
      node.canModify = false;
      this.modfiedNodes.push(node);
    }
  };

  toggleWall(node) {
    let new_type = node.type;
    if (
      node.type === nodeType.DEFAULT ||
      node.type === nodeType.VISITED ||
      node.type === nodeType.VISITED_NOANIMATION ||
      node.type === nodeType.PATH ||
      node.type === nodeType.PATH_NOANIMATION
    ) {
      new_type = nodeType.WALL;
      this.grid[node.y][node.x].weight = Infinity;
      this[`node-${node.y}-${node.x}`].setWeightType(weightType.DEFAULT);
    } else if (
      node.type === nodeType.WALL ||
      node.type === nodeType.WEIGHT_THREE ||
      node.type === nodeType.WEIGHT_FIVE ||
      node.type === nodeType.WEIGHT_EIGHT
    ) {
      new_type = nodeType.DEFAULT;
    }

    this[`node-${node.y}-${node.x}`].setNode(new_type);
    this.grid[node.y][node.x].type = new_type;
  }

  toggleWeight(node) {
    if (
      node.type !== nodeType.START &&
      node.type !== nodeType.END &&
      node.type !== nodeType.WALL
    ) {
      let new_weight;
      if (node.weight === weightType.DEFAULT) {
        new_weight = this.state.weight;
      } else {
        new_weight = weightType.DEFAULT;
      }

      let w =
        new_weight === weightType.WEIGHT_THREE
          ? 3
          : new_weight === weightType.WEIGHT_FIVE
          ? 5
          : new_weight === weightType.WEIGHT_EIGHT
          ? 8
          : 1;

      this.grid[node.y][node.x].weight = w;
      this[`node-${node.y}-${node.x}`].setWeightType(new_weight);
    }
  }

  moveStartorEndNode(node) {
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

  handleMouseEnter = node => {
    // can only modify the node once
    if (!this.isMousePressed || !node.canModify) return;
    const { weight } = this.state;
    if (
      this.clickedNode.type !== nodeType.START &&
      this.clickedNode.type !== nodeType.END
    ) {
      if (weight === weightType.DEFAULT) {
        this.toggleWall(node);
      } else {
        this.toggleWeight(node);
      }

      // set the flag so that the node cannot be modified
      node.canModify = false;
      this.modfiedNodes.push(node);
    } else {
      this.moveStartorEndNode(node);
    }
  };

  handleMouseUp = () => {
    this.isMousePressed = false;
    this.clickedNode = null;

    // reset all the modified nodes to can-modifiy
    for (let i = 0; i < this.modfiedNodes.length; i++) {
      const node = this.modfiedNodes[i];
      this[`node-${node.y}-${node.x}`].setState({ canModify: true });
    }
    this.modfiedNodes = [];
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
          weight: 1,
          prevNode: null
        };
        row.push(node);
      }
      grid.push(row);
    }
    return grid;
  }

  render() {
    let { weight } = this.state;

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
                    weight={weight}
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
