import React, { createContext, useContext, useState, useMemo } from "react";
import { Node, sampleTree } from "@/lib/sample-tree";
import { assignPositions, PositionedNode } from "@/lib/positioning";

interface FileTreeContextType {
  treeData: Node;
  setTreeData: (tree: Node) => void;
  nodeMap: Map<string, PositionedNode>;
  fileDragging: boolean;
  setFileDragging: (dragging: boolean) => void;
  draggingNodeId: string | null;
  setDraggingNodeId: (id: string | null) => void;
  moveNodeToFolder: (nodeId: string, targetFolderId: string) => void;
  isMenu: boolean;
  setIsMenu: (dragging: boolean) => void;
  menuNodeId: string | null;
  setMenuNodeId: (id: string | null) => void;
  contextMenuPos: { x: number; y: number } | null;
  setContextMenuPos: (pos: { x: number; y: number } | null) => void;
}

const FileTreeContext = createContext<FileTreeContextType | undefined>(
  undefined,
);

export const FileTreeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [treeData, setTreeData] = useState<Node>(sampleTree);
  const [fileDragging, setFileDragging] = useState(false);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [isMenu, setIsMenu] = useState(false);
  const [menuNodeId, setMenuNodeId] = useState<string | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const nodeMap = useMemo(() => assignPositions(treeData), [treeData]);

  const moveNodeToFolder = (nodeId: string, targetFolderId: string) => {
    setTreeData((prevTree) => {
      const cloneTree = structuredClone(prevTree);

      const nodeMap = new Map<string, Node>();
      const buildMap = (node: Node) => {
        nodeMap.set(node.id, node);
        node.children?.forEach(buildMap);
      };
      buildMap(cloneTree);

      const node = nodeMap.get(nodeId);
      const target = nodeMap.get(targetFolderId);
      if (!node || !target || target.type !== "folder") return prevTree;

      const oldParent = nodeMap.get(node.parentId ?? "");
      if (oldParent && oldParent.children) {
        oldParent.children = oldParent.children.filter((n) => n.id !== nodeId);
      }

      node.parentId = targetFolderId;
      target.children = target.children || [];
      target.children.push(node);

      return cloneTree;
    });
  };

  return (
    <FileTreeContext.Provider
      value={{
        treeData,
        setTreeData,
        nodeMap,
        fileDragging,
        setFileDragging,
        draggingNodeId,
        setDraggingNodeId,
        moveNodeToFolder,
        isMenu,
        setIsMenu,
        menuNodeId,
        setMenuNodeId,
        contextMenuPos,
        setContextMenuPos,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  );
};

export const useFileTree = () => {
  const context = useContext(FileTreeContext);
  if (!context) {
    throw new Error("useFileTree must be used within a FileTreeProvider");
  }
  return context;
};
