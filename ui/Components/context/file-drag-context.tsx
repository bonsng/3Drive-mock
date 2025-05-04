import React, { createContext, useContext, useState } from "react";

interface DragContextType {
  fileDragging: boolean;
  setFileDragging: (v: boolean) => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileDragging, setFileDragging] = useState(false);
  return (
    <DragContext.Provider value={{ fileDragging, setFileDragging }}>
      {children}
    </DragContext.Provider>
  );
};

export const useFileDrag = () => {
  const context = useContext(DragContext);
  if (!context) throw new Error("useDrag must be used within DragProvider");
  return context;
};
