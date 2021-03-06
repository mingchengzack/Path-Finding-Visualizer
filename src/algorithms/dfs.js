import { nodeType } from "../components/Node";

// performs depth first search algorithm
export function dfs(grid, startNode, endNode) {
  const visitedNodes = [];
  let unvisitedNodes = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    // get next cur node
    const curNode = unvisitedNodes.shift();

    // stack may contain two same nodes
    if (!curNode.isVisited) {
      curNode.isVisited = true;
      visitedNodes.push(curNode);
      if (curNode === endNode) return visitedNodes;

      // add neighbors to unvisitedNodes
      updateUnvisitedNeighbors(curNode, grid, unvisitedNodes);
    }
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
    grid[y][x - 1].prevNode = node;
    unvisitedNodes.unshift(grid[y][x - 1]);
  }
  if (
    y < grid.length - 1 &&
    !grid[y + 1][x].isVisited &&
    grid[y + 1][x].type !== nodeType.WALL
  ) {
    grid[y + 1][x].prevNode = node;
    unvisitedNodes.unshift(grid[y + 1][x]);
  }
  if (
    x < grid[0].length - 1 &&
    !grid[y][x + 1].isVisited &&
    grid[y][x + 1].type !== nodeType.WALL
  ) {
    grid[y][x + 1].prevNode = node;
    unvisitedNodes.unshift(grid[y][x + 1]);
  }
  if (
    y > 0 &&
    !grid[y - 1][x].isVisited &&
    grid[y - 1][x].type !== nodeType.WALL
  ) {
    grid[y - 1][x].prevNode = node;
    unvisitedNodes.unshift(grid[y - 1][x]);
  }
}
