import { nodeType } from "../components/Node";

// performs breadth first search algorithm
export function bfs(grid, startNode, endNode) {
  const visitedNodes = [];
  let unvisitedNodes = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    // get next cur node
    const curNode = unvisitedNodes.shift();
    // add neighbors to unvisitedNodes
    updateUnvisitedNeighbors(curNode, grid, unvisitedNodes);
    curNode.isVisited = true;
    if (curNode === endNode) return visitedNodes;
    if (curNode !== startNode) {
      curNode.type = nodeType.VISITED;
      visitedNodes.push(curNode);
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
    grid[y][x - 1].isVisited = true;
    unvisitedNodes.push(grid[y][x - 1]);
  }
  if (
    y < grid.length - 1 &&
    !grid[y + 1][x].isVisited &&
    grid[y + 1][x].type !== nodeType.WALL
  ) {
    grid[y + 1][x].isVisited = true;
    unvisitedNodes.push(grid[y + 1][x]);
  }
  if (
    x < grid[0].length - 1 &&
    !grid[y][x + 1].isVisited &&
    grid[y][x + 1].type !== nodeType.WALL
  ) {
    grid[y][x + 1].isVisited = true;
    unvisitedNodes.push(grid[y][x + 1]);
  }
  if (
    y > 0 &&
    !grid[y - 1][x].isVisited &&
    grid[y - 1][x].type !== nodeType.WALL
  ) {
    grid[y - 1][x].isVisited = true;
    unvisitedNodes.push(grid[y - 1][x]);
  }
}
