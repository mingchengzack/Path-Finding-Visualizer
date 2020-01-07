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

    // make sure it doesn't connect previous maze
    if (isConnect(curNode, grid, curNode.prevNode)) {
      continue;
    }
    curNode.isVisited = true; // set visited flag
    if (curNode.type === nodeType.WALL) {
      curNode.type = nodeType.DEFAULT; // remove wall
      mazeNodes.push(curNode); // add to animation nodes
    }
    const unvisitedNeighbors = getUnvisitedNeighbors(curNode, grid);

    // If the current cell has any neighbours which have not been visited
    for (let neighbor of unvisitedNeighbors) {
      neighbor.prevNode = curNode;
      visitedNodes.push(neighbor); // push it to the stack
    }
  }

  return mazeNodes;
}

// recursive division
export function recursiveDivision(grid) {
  let row = grid.length;
  let col = grid[0].length;
  let mazeNodes = [];
  recursiveDivisionHelper(grid, 1, row - 2, 1, col - 2, mazeNodes); // extra room for passage
  return mazeNodes;
}

function chooseOrientation(width, height) {
  if (width > height) {
    return DIR.VERTICAL;
  } else if (width < height) {
    return DIR.HORIZONTAL;
  } else {
    return Math.floor(Math.random() * 2) === 0 ? DIR.HORIZONTAL : DIR.VERTICAL;
  }
}

function recursiveDivisionHelper(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  mazeNodes
) {
  // finish division
  if (rowEnd - rowStart < 0 || colEnd - colStart < 0) {
    return;
  }
  let width = colEnd - colStart + 1;
  let height = rowEnd - rowStart + 1;
  let horizontal = chooseOrientation(width, height) === DIR.HORIZONTAL;

  // find possible rows and cols
  let possibleRows = [];
  let possibleCols = [];

  for (
    let row = horizontal ? rowStart : rowStart - 1;
    row <= (horizontal ? rowEnd : rowEnd + 1);
    row += 2
  ) {
    possibleRows.push(row);
  }

  for (
    let col = horizontal ? colStart - 1 : colStart;
    col <= (horizontal ? colEnd + 1 : colEnd);
    col += 2
  ) {
    possibleCols.push(col);
  }

  let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
  let randomColIndex = Math.floor(Math.random() * possibleCols.length);

  // where to draw
  let selectedRow = horizontal ? possibleRows[randomRowIndex] : rowStart;
  let selectedCol = horizontal ? colStart : possibleCols[randomColIndex];

  // where is the passage : random walls and passage (walls on even, passage on odd)
  let passageRow = horizontal ? selectedRow : possibleRows[randomRowIndex];
  let passageCol = horizontal ? possibleCols[randomColIndex] : selectedCol;

  // draw walls and passage
  let x = horizontal ? colStart - 1 : selectedCol;
  let y = horizontal ? selectedRow : rowStart - 1;
  let dx = horizontal ? 1 : 0;
  let dy = horizontal ? 0 : 1;
  let length = horizontal ? width + 1 : height + 1;

  for (let i = 0; i <= length; i++) {
    if (
      (x !== passageCol || y !== passageRow) &&
      grid[y][x].type === nodeType.DEFAULT
    ) {
      grid[y][x].type = nodeType.WALL;
      mazeNodes.push(grid[y][x]);
    }

    x += dx;
    y += dy;
  }

  // recursively draw on subfields
  let ny = selectedRow + (horizontal ? 2 : 0);
  let nx = selectedCol + (horizontal ? 0 : 2);
  recursiveDivisionHelper(grid, ny, rowEnd, nx, colEnd, mazeNodes);

  ny = horizontal ? selectedRow - 2 : rowEnd;
  nx = horizontal ? colEnd : selectedCol - 2;
  recursiveDivisionHelper(grid, rowStart, ny, colStart, nx, mazeNodes);
}

const DIR = {
  HORIZONTAL: 0,
  VERTICAL: 1
};
