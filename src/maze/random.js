import { nodeType } from "../components/Node";

export function randomWall(grid) {
  let mazeNodes = [];
  for (const row of grid) {
    for (const node of row) {
      // generate wall on default node
      if (node.type === nodeType.DEFAULT) {
        if (Math.random() >= 0.65) {
          node.type = nodeType.WALL; // set type
          mazeNodes.push(node);
        }
      }
    }
  }
  return mazeNodes;
}

export function randomWeight(grid) {
  let mazeNodes = [];
  const weights = [
    nodeType.WEIGHT_THREE,
    nodeType.WEIGHT_FIVE,
    nodeType.WEIGHT_EIGHT
  ];
  for (const row of grid) {
    for (const node of row) {
      // generate differnet weights on default node
      if (node.type === nodeType.DEFAULT) {
        if (Math.random() >= 0.4) {
          // randomly choose a weight
          const weightType = weights[Math.floor(Math.random() * 3)];
          let weight =
            weightType === nodeType.WEIGHT_THREE
              ? 3
              : weightType === nodeType.WEIGHT_FIVE
              ? 5
              : weightType === nodeType.WEIGHT_EIGHT
              ? 8
              : 3;
          node.weight = weight; // set weight
          node.type = weightType; // set type
          mazeNodes.push(node);
        }
      }
    }
  }
  return mazeNodes;
}
