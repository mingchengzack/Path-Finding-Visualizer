import { nodeType } from "../components/Node";

function isConnect(node, grid, prev) {
  const { x, y } = node;
  if (y > 0 && prev !== grid[y - 1][x] && grid[y - 1][x].isVisited) return true;
  if (
    y < grid.length - 1 &&
    prev !== grid[y + 1][x] &&
    grid[y + 1][x].isVisited
  )
    return true;
  if (x > 0 && prev !== grid[y][x - 1] && grid[y][x - 1].isVisited) return true;
  if (
    x < grid[0].length - 1 &&
    prev !== grid[y][x + 1] &&
    grid[y][x + 1].isVisited
  )
    return true;
  return false;
}

function getUnvisitedNeighbors(node, grid) {
  let neighbors = [];
  const { x, y } = node;
  if (y > 0) neighbors.push(grid[y - 1][x]);
  if (y < grid.length - 1) neighbors.push(grid[y + 1][x]);
  if (x > 0) neighbors.push(grid[y][x - 1]);
  if (x < grid[0].length - 1) neighbors.push(grid[y][x + 1]);
  const unvisitedNeighbors = neighbors.filter(
    neighbor => !neighbor.isVisited && !isConnect(neighbor, grid, node)
  );
  return unvisitedNeighbors;
}

// depth-first search approach using recursive backtracker and stack
export function dfsGeneration(grid) {
  // init node
  const initNode =
    grid[0][0].type !== nodeType.START && grid[0][0].type !== nodeType.END
      ? grid[0][0]
      : grid[0][1].type !== nodeType.START && grid[0][1].type !== nodeType.END
      ? grid[0][1]
      : grid[0][2];
  initNode.isVisited = true;
  initNode.type = nodeType.DEFAULT;

  let mazeNodes = [];
  let visitedNodes = [];
  visitedNodes.push(initNode);
  mazeNodes.push(initNode);

  while (visitedNodes.length !== 0) {
    let curNode = visitedNodes.pop();
    const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);

    // If the current cell has any neighbours which have not been visited
    if (unvisitedNeighbors.length !== 0) {
      visitedNodes.push(curNode);
      // pick a random neighbor
      let randomNeighbor =
        unvisitedNeighbors[
          Math.floor(Math.random() * unvisitedNeighbors.length)
        ];
      randomNeighbor.isVisited = true; // set visited
      visitedNodes.push(randomNeighbor); // push it to the stack
      if (randomNeighbor.type === nodeType.WALL) {
        randomNeighbor.type = nodeType.DEFAULT; // remove wall
        mazeNodes.push(randomNeighbor); // add to animation nodes
      }
    }
  }

  return mazeNodes;
}

// random traversal
export function traversalGeneration(grid) {
  // init node
  const initNode =
    grid[0][0].type !== nodeType.START && grid[0][0].type !== nodeType.END
      ? grid[0][0]
      : grid[0][1].type !== nodeType.START && grid[0][1].type !== nodeType.END
      ? grid[0][1]
      : grid[0][2];
  initNode.isVisited = true;
  initNode.type = nodeType.DEFAULT;

  let mazeNodes = [];
  let visitedNodes = [];
  visitedNodes.push(initNode);
  mazeNodes.push(initNode);

  while (visitedNodes.length !== 0) {
    // randomly expand
    let randomIdx = Math.floor(Math.random() * visitedNodes.length);
    // swap for shuffling
    let temp = visitedNodes[randomIdx];
    visitedNodes[randomIdx] = visitedNodes[0];
    visitedNodes[0] = temp;
    let curNode = visitedNodes.shift();
    if (isConnect(curNode, grid, curNode.prevNode)) {
      continue;
    }
    if (curNode.type === nodeType.WALL) {
      curNode.type = nodeType.DEFAULT; // remove wall
      mazeNodes.push(curNode); // add to animation nodes
    }
    const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);

    // If the current cell has any neighbours which have not been visited
    if (unvisitedNeighbors.length !== 0) {
      visitedNodes.push(curNode);

      for (let neighbor of unvisitedNeighbors) {
        neighbor.isVisited = true; // set visited
        neighbor.prevNode = curNode;
        visitedNodes.push(neighbor); // push it to the stack
      }
    }
  }

  return mazeNodes;
}

// recursive division
export function recursiveDivision(grid) {}
