import { nodeType } from "../components/Node";

// performs astar algorithm
export function astar(grid, startNode, endNode) {
  let visitedNodes = [];
  let unvisitedNodes = [];
  for (const row of grid) {
    for (const node of row) {
      node.euclideanDis = EuclideanDistance(node, endNode);
      unvisitedNodes.push(node);
    }
  }

  startNode.distance = 0;
  startNode.totalDis = startNode.euclideanDis;

  while (unvisitedNodes.length !== 0) {
    // sort the nodes by total distance
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.totalDis - nodeB.totalDis);
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

export function astarPath(endNode) {
  const nodesInShortestPath = [];
  let currNode = endNode;

  while (currNode !== null) {
    nodesInShortestPath.unshift(currNode);
    currNode = currNode.prevNode;
  }
  return nodesInShortestPath;
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
      neighbor.totalDis = neighbor.distance + neighbor.euclideanDis;
      neighbor.prevNode = node;
    }
  }
}

function EuclideanDistance(nodeA, nodeB) {
  return Math.sqrt(
    (nodeA.x - nodeB.x) * (nodeA.x - nodeB.x) +
      (nodeA.y - nodeB.y) * (nodeA.y - nodeB.y)
  );
}
