import React, { Component } from "react";
import Node, { nodeType, animationType } from "./Node";
import { dijkstra, findPath } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { greedy } from "../algorithms/greedy";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import { randomWall, randomWeight } from "../maze/random";
import {
  dfsGeneration,
  traversalGeneration,
  recursiveDivision
} from "../maze/mazeGeneration";

import "./Node.css";

const DEFAULT_START_X = Math.floor((window.innerWidth / 25 + 1) / 4);
const DEFAULT_START_Y = Math.floor((window.innerHeight / 25 - 9) / 2);
const DEFAULT_END_X = Math.floor(((window.innerWidth / 25 + 1) * 3) / 4);
const DEFAULT_END_Y = Math.floor((window.innerHeight / 25 - 9) / 2);

class Grid extends Component {
  constructor(props) {
    super(props);
    this.grid = this.constructInitGrid();
    this.startNode = this.grid[DEFAULT_START_Y][DEFAULT_START_X];
    this.endNode = this.grid[DEFAULT_END_Y][DEFAULT_END_X];
    this.isMousePressed = false;
    this.isVisualized = false;
    this.algorithm = null;
    this.chosenAlgorithm = "Dijkstra";
    this.nodetype = nodeType.WALL;
    this.clickedNode = null;
    this.modfiedNodes = [];
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  resetGrid() {
    if (this.isVisualized) return;
    let rows = this.grid.length;
    let cols = this.grid[0].length;
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
        }
        this.grid[i][j].prevNode = null;
        this.grid[i][j].distance = Infinity;
        this.grid[i][j].totalDis = Infinity;
        this.grid[i][j].manhattanDis = Infinity;
        this.grid[i][j].isVisited = false;
        this[`node-${i}-${j}`].setAnimation(animationType.DEFAULT);
      }
    }
  }

  generateMaze(mazeType) {
    if (this.isVisualized) return;
    this.resetGrid(); // reset the grid for new maze
    this.isVisualized = true; // set flag

    // generate maze nodes in grid
    const mazeNodes = this.calculateMazeNodes(mazeType);
    const generateWall =
      mazeType === "Random Traversal" || mazeType === "Depth-First Search"
        ? true
        : false;
    this.animateMaze(mazeNodes, generateWall);
  }

  generateAllWalls() {
    let i = 0;
    for (const row of this.grid) {
      for (const node of row) {
        // generate a grid with all walls
        if (node.type === nodeType.DEFAULT) {
          node.type = nodeType.WALL; // set to wall
          setTimeout(() => {
            this[`node-${node.y}-${node.x}`].setNodeandAnimation(
              nodeType.WALL,
              animationType.GENERATE
            );
          }, 4 * i);
          i++;
        }
      }
    }
  }

  calculateMazeNodes(mazeType) {
    let mazeNodes;
    switch (mazeType) {
      case "Random Wall":
        mazeNodes = randomWall(this.grid);
        break;
      case "Random Weight":
        mazeNodes = randomWeight(this.grid);
        break;
      case "Random Traversal":
        this.generateAllWalls();
        mazeNodes = traversalGeneration(this.grid);
        break;
      case "Depth-First Search":
        this.generateAllWalls();
        mazeNodes = dfsGeneration(this.grid);
        break;
      case "Recursive Division":
        mazeNodes = recursiveDivision(this.grid);
        break;
      default:
        mazeNodes = [];
        break;
    }
    return mazeNodes;
  }

  animateMaze(mazeNodes, generateWall) {
    let rows = this.grid.length;
    let cols = this.grid[0].length;
    let interval = generateWall ? rows * cols : 0;
    // animate maze nodes
    for (let i = 0; i < mazeNodes.length; i++) {
      setTimeout(() => {
        const node = mazeNodes[i];
        this[`node-${node.y}-${node.x}`].setNodeandAnimation(
          node.type,
          node.type === nodeType.DEFAULT
            ? animationType.DEFAULT
            : animationType.GENERATE
        );
      }, 4 * (i + interval + 1));
    }

    // finish maze generation
    setTimeout(() => {
      this.isVisualized = false;
    }, 10 + (interval + mazeNodes.length + 1) * 4);
  }

  resetGridforVisualize() {
    let rows = this.grid.length;
    let cols = this.grid[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.grid[i][j].prevNode = null;
        this.grid[i][j].distance = Infinity;
        this.grid[i][j].totalDis = Infinity;
        this.grid[i][j].manhattanDis = Infinity;
        this.grid[i][j].isVisited = false;
        this[`node-${i}-${j}`].setAnimation(animationType.DEFAULT);
      }
    }
  }

  visualize(algorithm, speed) {
    if (this.isVisualized) return;
    this.isVisualized = true; // set flag

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
      this.chosenAlgorithm
    );

    for (let i = 0; i < visitedNodes.length + nodesInPath.length; i++) {
      let node;
      if (i < visitedNodes.length) {
        node = visitedNodes[i];
        this[`node-${node.y}-${node.x}`].setAnimation(
          animationType.VISITED_NOANIMATION
        );
      } else {
        node = nodesInPath[i - visitedNodes.length];
        this[`node-${node.y}-${node.x}`].setAnimation(
          animationType.PATH_NOANIMATION
        );
      }
    }
  }

  calculateVisualizedNodes(algorithm) {
    let visitedNodes, nodesInPath;
    switch (algorithm) {
      case "Dijkstra":
        visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
        break;
      case "A* Search":
        visitedNodes = astar(this.grid, this.startNode, this.endNode);
        break;
      case "Greedy Best-First Search":
        visitedNodes = greedy(this.grid, this.startNode, this.endNode);
        break;
      case "Depth-First Search":
        visitedNodes = dfs(this.grid, this.startNode, this.endNode);
        break;
      case "Breadth-First Search":
        visitedNodes = bfs(this.grid, this.startNode, this.endNode);
        break;
      default:
        visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
        break;
    }
    nodesInPath = findPath(this.endNode);
    return [visitedNodes, nodesInPath];
  }

  animateNodes(visitedNodes, nodesInPath, speed) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          for (let j = 0; j < nodesInPath.length; j++) {
            setTimeout(() => {
              const node = nodesInPath[j];
              if (node.type === nodeType.START || node.type === nodeType.END) {
                this[`node-${node.y}-${node.x}`].setAnimation(
                  animationType.PATH_NOANIMATION
                );
              } else {
                this[`node-${node.y}-${node.x}`].setAnimation(
                  animationType.PATH
                );
              }
            }, 10 + 2 * speed * j);
          }
        }, 10 + speed * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          this[`node-${node.y}-${node.x}`].setAnimation(animationType.VISITED);
        }, 10 + speed * i);
      }
    }

    // finish visualization
    setTimeout(() => {
      this.isVisualized = false;
    }, 100 + speed * visitedNodes.length + 2 * speed * nodesInPath.length);
  }

  toggleNode(node, type) {
    let new_type = node.type;
    if (node.type === nodeType.DEFAULT) {
      new_type = type;
      let weight =
        new_type === nodeType.WEIGHT_THREE
          ? 3
          : new_type === nodeType.WEIGHT_FIVE
          ? 5
          : new_type === nodeType.WEIGHT_EIGHT
          ? 8
          : Infinity;
      this.grid[node.y][node.x].weight = weight; // set weight
      this[`node-${node.y}-${node.x}`].setNodeandAnimation(
        new_type,
        animationType.GENERATE
      );
    } else if (
      node.type === nodeType.WALL ||
      node.type === nodeType.WEIGHT_THREE ||
      node.type === nodeType.WEIGHT_FIVE ||
      node.type === nodeType.WEIGHT_EIGHT
    ) {
      new_type = nodeType.DEFAULT;
      this.grid[node.y][node.x].weight = 1; // reset weight to 1
      this[`node-${node.y}-${node.x}`].setNodeandAnimation(
        new_type,
        animationType.DEFAULT
      );
    }

    this.grid[node.y][node.x].type = new_type;
  }

  moveStartorEndNode(node) {
    if (node.type === nodeType.DEFAULT) {
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

  handleMouseDown = node => {
    if (this.isVisualized) return;
    this.isMousePressed = true;

    // copy the node state
    this.clickedNode = {
      ...node
    };

    this.toggleNode(node, this.nodetype);

    // can only modify the node once (for non-start, non-end nodes)
    if (
      this.clickedNode.type !== nodeType.START &&
      this.clickedNode.type !== nodeType.END
    ) {
      node.canModify = false;
      this.modfiedNodes.push(node);
    }
  };

  handleMouseEnter = node => {
    // can only modify the node once
    if (!this.isMousePressed || !node.canModify) return;
    if (
      this.clickedNode.type !== nodeType.START &&
      this.clickedNode.type !== nodeType.END
    ) {
      this.toggleNode(node, this.nodetype);

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
          totalDis: Infinity,
          manhattanDis: Infinity,
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
    return (
      <div
        className="grid"
        onMouseUp={() => this.handleMouseUp()}
        onMouseLeave={() => this.handleMouseUp()}
      >
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
