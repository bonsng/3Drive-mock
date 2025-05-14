import React, { createContext, useContext, useRef } from "react";
import * as THREE from "three";

interface FolderRefContextType {
  registerFolderRef: (id: string, ref: THREE.Object3D) => void;
  unregisterFolderRef: (id: string) => void;
  getFolderRefs: () => THREE.Object3D[];
}

const FolderRefContext = createContext<FolderRefContextType | null>(null);

export const FolderRefProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const folderRefMap = useRef<Map<string, THREE.Object3D>>(new Map());

  const registerFolderRef = (id: string, ref: THREE.Object3D) => {
    folderRefMap.current.set(id, ref);
  };

  const unregisterFolderRef = (id: string) => {
    folderRefMap.current.delete(id);
  };

  const getFolderRefs = () => Array.from(folderRefMap.current.values());

  return (
    <FolderRefContext.Provider
      value={{ registerFolderRef, unregisterFolderRef, getFolderRefs }}
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
