import type { Node } from "@/lib/sample-tree";

export interface PositionedNode extends Node {
  position: [number, number, number];
  depth: number;
  parentPosition?: [number, number, number];
}

export function assignPositions(
  tree: Node,
  baseRadius = 0.5,
  radiusStep = 0.8,
): PositionedNode[] {
  const result: PositionedNode[] = [];

  function traverse(
    node: Node,
    depth: number,
    thetaRange: [number, number],
    phiRange: [number, number],
    parentPosition?: [number, number, number],
  ) {
    let position: [number, number, number];

    if (depth === 0) {
      position = [0, 0, 0];
    } else {
      const radius = baseRadius + depth * radiusStep;
      const theta = (thetaRange[0] + thetaRange[1]) / 2;
      const phi = (phiRange[0] + phiRange[1]) / 2 + Math.random() * 0.5;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      position = [x, y, z];
    }

    result.push({
      ...node,
      position,
      depth,
      parentPosition,
    });

    if (node.children && node.children.length > 0) {
      const childCount = node.children.length;
      const thetaStep = (thetaRange[1] - thetaRange[0]) / childCount;
      const phiStep = (phiRange[1] - phiRange[0]) / childCount;

      node.children.forEach((child, i) => {
        const childThetaRange: [number, number] = [
          thetaRange[0] + thetaStep * i,
          thetaRange[0] + thetaStep * (i + 1),
        ];
        const childPhiRange: [number, number] = [
          phiRange[0] + phiStep * i,
          phiRange[0] + phiStep * (i + 1),
        ];

        traverse(child, depth + 1, childThetaRange, childPhiRange, position);
      });
    }
  }

  traverse(tree, 0, [0, Math.PI], [0, 2 * Math.PI]);
  return result;
}
