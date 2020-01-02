import { nodeType } from "../components/Node";

// performs greedy best-first search algorithm
export function greedy(grid, startNode, endNode) {
  let visitedNodes = [];
  let unvisitedNodes = [];

  // calculate heuristic distance from each node to end node
  for (const row of grid) {
    for (const node of row) {
      node.distance = node.weight + ManhattanDistance(node, endNode);
    }
  }

  unvisitedNodes.push(startNode);
  startNode.isVisited = true;

  while (unvisitedNodes.length !== 0) {
    // sort the nodes by total distance
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    const closestNode = unvisitedNodes.shift();

    // trapped by wall
    if (closestNode.distance === Infinity) return visitedNodes;

    visitedNodes.push(closestNode);

    // reach goal
    if (closestNode === endNode) return visitedNodes;

    // update distance for neighbors
    updateUnvisitedNeighbors(closestNode, grid, unvisitedNodes);
  }

  return visitedNodes;
}

function updateUnvisitedNeighbors(node, grid, unvisitedNodes) {
  const { x, y } = node;
  if (
    x > 0 &&
    !grid[y][x - 1].isVisited &&
    grid[y][x - 1].type !== nodeType.WALL
  ) {
    grid[y][x - 1].isVisited = true;
    grid[y][x - 1].prevNode = node;
    unvisitedNodes.push(grid[y][x - 1]);
  }
  if (
    y < grid.length - 1 &&
    !grid[y + 1][x].isVisited &&
    grid[y + 1][x].type !== nodeType.WALL
  ) {
    grid[y + 1][x].isVisited = true;
    grid[y + 1][x].prevNode = node;
    unvisitedNodes.push(grid[y + 1][x]);
  }
  if (
    x < grid[0].length - 1 &&
    !grid[y][x + 1].isVisited &&
    grid[y][x + 1].type !== nodeType.WALL
  ) {
    grid[y][x + 1].isVisited = true;
    grid[y][x + 1].prevNode = node;
    unvisitedNodes.push(grid[y][x + 1]);
  }
  if (
    y > 0 &&
    !grid[y - 1][x].isVisited &&
    grid[y - 1][x].type !== nodeType.WALL
  ) {
    grid[y - 1][x].isVisited = true;
    grid[y - 1][x].prevNode = node;
    unvisitedNodes.push(grid[y - 1][x]);
  }
}

function ManhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}
