import { nodeType } from "../components/Node";

// performs Dijkstra's algorithm
export function dijkstra(grid, startNode, endNode) {
  let visitedNodes = [];
  let unvisitedNodes = [];
  for (const row of grid) {
    for (const node of row) {
      unvisitedNodes.push(node);
    }
  }
  startNode.distance = 0;
  while (unvisitedNodes.length !== 0) {
    // sort the nodes by distance
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unvisitedNodes.shift();

    // trapped by wall
    if (closestNode.distance === Infinity) return visitedNodes;

    closestNode.isVisited = true;
    visitedNodes.push(closestNode);

    // reach goal
    if (closestNode === endNode) return visitedNodes;

    // update distance for neighbors
    updateUnvisitedNeighbors(closestNode, grid);
  }
  return visitedNodes;
}

// backtracks from the endNode to find the shortest path
export function findPath(endNode) {
  let nodesInPath = [];
  let currNode = endNode;

  while (currNode !== null) {
    nodesInPath.unshift(currNode);
    currNode = currNode.prevNode;
  }

  // check if end node is reached
  nodesInPath = nodesInPath.length === 1 ? [] : nodesInPath;
  return nodesInPath;
}

function updateUnvisitedNeighbors(node, grid) {
  let neighbors = [];
  const { x, y } = node;
  if (y > 0) neighbors.push(grid[y - 1][x]);
  if (y < grid.length - 1) neighbors.push(grid[y + 1][x]);
  if (x > 0) neighbors.push(grid[y][x - 1]);
  if (x < grid[0].length - 1) neighbors.push(grid[y][x + 1]);
  const unvisitedNeighbors = neighbors.filter(
    neighbor => !neighbor.isVisited && neighbor.type !== nodeType.WALL
  );

  for (const neighbor of unvisitedNeighbors) {
    if (node.distance + neighbor.weight < neighbor.distance) {
      neighbor.distance = node.distance + neighbor.weight;
      neighbor.prevNode = node;
    }
  }
}
