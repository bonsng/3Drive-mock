import { PositionedNode } from "@/lib/positioning";

export function getDescendantIds(
  nodeId: string,
  nodeMap: Map<string, PositionedNode>,
): Set<string> {
  const descendants = new Set<string>();

  for (const [id, node] of nodeMap.entries()) {
    let current = node.parentId;
    while (current) {
      if (current === nodeId) {
        descendants.add(id);
        break;
      }
      current = nodeMap.get(current)?.parentId ?? null;
    }
  }

  return descendants;
}
