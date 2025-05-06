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

  const nodeMap = useMemo(() => assignPositions(treeData), [treeData]);

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
