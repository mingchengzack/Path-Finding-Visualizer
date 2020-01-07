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

  // where to draw
  let selectedRow =
    rowStart + (horizontal ? Math.floor(Math.random() * (height - 2)) + 1 : 0);
  let selectedCol =
    colStart + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)) + 1);

  // where is the passage
  let passageRow =
    selectedRow + (horizontal ? 0 : Math.floor(Math.random() * height));
  let passageCol =
    selectedCol + (horizontal ? Math.floor(Math.random() * width) : 0);

  // random walls and passage (walls on even, passage on odd)
  if (horizontal) {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    selectedRow = possibleRows[randomRowIndex];
    passageCol = possibleCols[randomColIndex];
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    selectedCol = possibleCols[randomColIndex];
    passageRow = possibleRows[randomRowIndex];
  }

  // draw walls and passage
  for (let row of grid) {
    for (let node of row) {
      const { x, y } = node;
      if (horizontal) {
        if (
          y === selectedRow &&
          x !== passageCol &&
          x >= colStart - 1 &&
          x <= colEnd + 1 &&
          node.type === nodeType.DEFAULT
        ) {
          node.type = nodeType.WALL;
          mazeNodes.push(node);
        }
      } else {
        if (
          x === selectedCol &&
          y !== passageRow &&
          y >= rowStart - 1 &&
          y <= rowEnd + 1 &&
          node.type === nodeType.DEFAULT
        ) {
          node.type = nodeType.WALL;
          mazeNodes.push(node);
        }
      }
    }
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
