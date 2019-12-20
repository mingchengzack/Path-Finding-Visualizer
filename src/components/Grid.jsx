import React, { Component } from "react";
import Node, { nodeType, animationType } from "./Node";
import { dijkstra, dijkstraPath } from "../algorithms/dijkstra";
import { astar, astarPath } from "../algorithms/astar";
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
    this.modfiedNodes = [];
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
        this[`node-${i}-${j}`].setAnimation(animationType.DEFAULT);
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
        this.grid[i][j].totalDis = Infinity;
        this.grid[i][j].euclideanDis = Infinity;
        this.grid[i][j].isVisited = false;
        this[`node-${i}-${j}`].setAnimation(animationType.DEFAULT);
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
    let visitedNodes, nodesInPath, find;
    switch (algorithm) {
      case "Dijkstra":
        visitedNodes = dijkstra(this.grid, this.startNode, this.endNode);
        nodesInPath = dijkstraPath(this.endNode);
        nodesInPath = nodesInPath.length == 1 ? [] : nodesInPath;
        break;
      case "A* Search":
        visitedNodes = astar(this.grid, this.startNode, this.endNode);
        nodesInPath = astarPath(this.endNode);
        nodesInPath = nodesInPath.length == 1 ? [] : nodesInPath;
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
    this.isMousePressed = true;

    // copy the node state
    this.clickedNode = {
      ...node
    };

    this.toggleNode(node, this.props.nodetype);

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
      this.toggleNode(node, this.props.nodetype);

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
          euclideanDis: Infinity,
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
