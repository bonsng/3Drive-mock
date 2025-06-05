import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  Node,
  // processBackendTree,
  sampleTrash,
  sampleTree,
} from "@/lib/sample-tree";
import { assignPositions, PositionedNode } from "@/lib/positioning";
import { useFolderRefContext } from "@/ui/Components/context/folder-ref-context";
// import { useSession } from "next-auth/react";
import { useLoading } from "@/ui/Components/context/loading-context";

interface FileTreeContextType {
  treeData: Node | null;
  setTreeData: (tree: Node) => void;
  trashData: Node[];

  nodePositionMap: Map<number, PositionedNode>;
  fileDragging: boolean;
  setFileDragging: (dragging: boolean) => void;
  draggingNodeId: number | null;
  setDraggingNodeId: (id: number | null) => void;
  moveNodeToFolder: (nodeId: number, targetFolderId: number) => void;
  deleteNodeToTrash: (nodeId: number) => void;
  restoreNodeFromTrash: (nodeId: number) => void;
  createNewFolder: (
    targetFolderId: number,
    folderName: string,
    newFolderId: number,
  ) => void;
  addFilesToFolder: (
    targetFolderId: number,
    files: { fileId: number; fileName: string }[],
  ) => void;
  isMenu: boolean;
  setIsMenu: (dragging: boolean) => void;
  menuNodeId: number | null;
  setMenuNodeId: (id: number | null) => void;
  contextMenuPos: { x: number; y: number } | null;
  setContextMenuPos: (pos: { x: number; y: number } | null) => void;
  setSearchQuery: (query: string) => void;
  matchedNodes: number[];
  matchedPositionNodes: PositionedNode[];
  getPathFromNodeId: (nodeId: number) => string[];
  getPositionFromNodeId: (nodeId: number) => PositionedNode | undefined;
}

const FileTreeContext = createContext<FileTreeContextType | undefined>(
  undefined,
);

export const FileTreeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setIsLoading } = useLoading();
  const [treeData, setTreeData] = useState<Node | null>(null);
  const [trashData, setTrashData] = useState<Node[]>([]);
  // const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);
    setTreeData(sampleTree);
    setTrashData(sampleTrash);
    setIsLoading(false);
  }, [setIsLoading]);
  const [fileDragging, setFileDragging] = useState(false);
  const [draggingNodeId, setDraggingNodeId] = useState<number | null>(null);
  const [isMenu, setIsMenu] = useState(false);

  const [menuNodeId, setMenuNodeId] = useState<number | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const { unregisterFolderRef } = useFolderRefContext();
  const [searchQuery, setSearchQuery] = useState("");
  const nodePositionMap = useMemo(() => {
    if (!treeData) return new Map();
    return assignPositions(treeData);
  }, [treeData]);
  const [matchedNodes, matchedPositionNodes] = useMemo(() => {
    if (!searchQuery) return [[], []];

    const matched: PositionedNode[] = [...nodePositionMap.values()].filter(
      (node) => node.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const ids = matched.map((node) => node.id);

    return [ids, matched];
  }, [searchQuery, nodePositionMap]);

  const getPathFromNodeId = (nodeId: number): string[] => {
    if (!treeData) return [];
    const nodeMap = new Map<number, Node>();
    const buildMap = (node: Node) => {
      nodeMap.set(node.id, node);
      node.children?.forEach(buildMap);
    };
    buildMap(treeData);

    const path: string[] = [];
    let current = nodeMap.get(nodeId);

    while (current) {
      path.unshift(current.name);
      if (current.parentId === null) break;
      current = nodeMap.get(current.parentId);
    }

    return path;
  };

  const getPositionFromNodeId = (
    nodeId: number,
  ): PositionedNode | undefined => {
    return nodePositionMap.get(nodeId);
  };

  const moveNodeToFolder = (nodeId: number, targetFolderId: number) => {
    setTreeData((prevTree) => {
      const cloneTree = structuredClone(prevTree);
      if (!cloneTree) return prevTree;
      const nodeMap = new Map<number, Node>();
      const buildMap = (node: Node) => {
        nodeMap.set(node.id, node);
        node.children?.forEach(buildMap);
      };

      buildMap(cloneTree);

      const node = nodeMap.get(nodeId);
      const target = nodeMap.get(targetFolderId);
      if (!node || !target || target.type !== "folder" || !node.parentId)
        return prevTree;

      const oldParent = nodeMap.get(node.parentId);
      if (oldParent && oldParent.children) {
        oldParent.children = oldParent.children.filter((n) => n.id !== nodeId);
      }

      node.parentId = targetFolderId;
      target.children = target.children || [];
      target.children.push(node);

      return cloneTree;
    });
  };

  const deleteNodeToTrash = (nodeId: number) => {
    unregisterFolderRef(nodeId);
    setTreeData((prevTree) => {
      const cloneTree = structuredClone(prevTree);
      const nodeMap = new Map<number, Node>();
      const buildMap = (node: Node) => {
        nodeMap.set(node.id, node);
        node.children?.forEach(buildMap);
      };
      if (!cloneTree) return prevTree;

      buildMap(cloneTree);

      const node = nodeMap.get(nodeId);
      if (!node || !node.parentId) return prevTree;

      const parent = nodeMap.get(node.parentId);
      if (parent && parent.children) {
        parent.children = parent.children.filter(
          (child) => child.id !== nodeId,
        );
      }

      setTrashData((prevTrash) => {
        if (prevTrash.find((n) => n.id === node.id)) return prevTrash;
        return [...prevTrash, structuredClone(node)];
      });
      return cloneTree;
    });
  };

  const restoreNodeFromTrash = (nodeId: number) => {
    const node = trashData.find((n) => n.id === nodeId);
    if (!node) return;

    setTrashData((prev) => prev.filter((n) => n.id !== nodeId));

    setTreeData((prevTree) => {
      const cloneTree = structuredClone(prevTree);
      if (!cloneTree) return prevTree;
      const nodeMap = new Map<number, Node>();
      const buildMap = (n: Node) => {
        nodeMap.set(n.id, n);
        n.children?.forEach(buildMap);
      };

      buildMap(cloneTree);
      if (!node.parentId) return prevTree;
      const parent = nodeMap.get(node.parentId);
      if (!parent || parent.type !== "folder") return prevTree;

      parent.children = parent.children || [];
      parent.children.push(node);

      return cloneTree;
    });
  };

  const createNewFolder = (
    targetFolderId: number,
    folderName: string,
    newFolderId: number,
  ) => {
    setTreeData((prevTree) => {
      const cloneTree = structuredClone(prevTree);
      if (!cloneTree) return prevTree;

      const nodeMap = new Map<number, Node>();
      const buildMap = (n: Node) => {
        nodeMap.set(n.id, n);
        n.children?.forEach(buildMap);
      };
      buildMap(cloneTree);

      const target = nodeMap.get(targetFolderId);
      if (!target || target.type !== "folder") return prevTree;

      const newFolder: Node = {
        id: newFolderId,
        name: folderName,
        type: "folder",
        parentId: targetFolderId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
      };

      target.children = target.children || [];
      target.children.push(newFolder);

      return cloneTree;
    });
  };

  const addFilesToFolder = (
    targetFolderId: number,
    files: { fileId: number; fileName: string }[],
  ) => {
    setTreeData((prevTree) => {
      const cloneTree = structuredClone(prevTree);
      if (!cloneTree) return prevTree;

      const nodeMap = new Map<number, Node>();
      const buildMap = (n: Node) => {
        nodeMap.set(n.id, n);
        n.children?.forEach(buildMap);
      };
      buildMap(cloneTree);

      const target = nodeMap.get(targetFolderId);
      if (!target || target.type !== "folder") return prevTree;

      const newNodes: Node[] = files.map((file) => ({
        id: file.fileId,
        name: file.fileName,
        type: "file",
        parentId: targetFolderId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      target.children = target.children || [];
      target.children.push(...newNodes);

      return cloneTree;
    });
  };

  return (
    <FileTreeContext.Provider
      value={{
        treeData,
        setTreeData,
        nodePositionMap,
        fileDragging,
        setFileDragging,
        draggingNodeId,
        setDraggingNodeId,
        moveNodeToFolder,
        deleteNodeToTrash,
        restoreNodeFromTrash,
        createNewFolder,
        addFilesToFolder,
        isMenu,
        setIsMenu,
        menuNodeId,
        setMenuNodeId,
        contextMenuPos,
        setContextMenuPos,
        trashData,
        setSearchQuery,
        matchedNodes,
        getPathFromNodeId,
        matchedPositionNodes,
        getPositionFromNodeId,
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
