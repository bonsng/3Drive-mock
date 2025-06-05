import React, { createContext, useContext, useRef } from "react";
import * as THREE from "three";

interface FolderRefContextType {
  registerFolderRef: (id: number, ref: THREE.Object3D) => void;
  unregisterFolderRef: (id: number) => void;
  getFolderRefs: () => THREE.Object3D[];
  getFolderRefById: (id: number) => THREE.Object3D | undefined;
}

const FolderRefContext = createContext<FolderRefContextType | null>(null);

export const FolderRefProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const folderRefMap = useRef<Map<number, THREE.Object3D>>(new Map());

  const registerFolderRef = (id: number, ref: THREE.Object3D) => {
    folderRefMap.current.set(id, ref);
  };

  const unregisterFolderRef = (id: number) => {
    if (!folderRefMap.current.has(id)) return;
    folderRefMap.current.delete(id);
  };

  const getFolderRefs = () => Array.from(folderRefMap.current.values());

  const getFolderRefById = (id: number): THREE.Object3D | undefined => {
    return folderRefMap.current.get(id);
  };

  return (
    <FolderRefContext.Provider
      value={{
        registerFolderRef,
        unregisterFolderRef,
        getFolderRefs,
        getFolderRefById,
      }}
    >
      {children}
    </FolderRefContext.Provider>
  );
};

export const useFolderRefContext = () => {
  const context = useContext(FolderRefContext);
  if (!context) {
    throw new Error(
      "useFolderRefContext must be used within a FolderRefProvider",
    );
  }
  return context;
};
