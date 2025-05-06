import React, { createContext, useContext, useState } from "react";

interface FileViewerContextType {
  selectedFile: string | null;
  openFile: (fileName: string) => void;
  closeFile: () => void;
}

const FileViewerContext = createContext<FileViewerContextType | undefined>(
  undefined,
);

export const FileViewerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const openFile = (fileName: string) => setSelectedFile(fileName);
  const closeFile = () => setSelectedFile(null);

  return (
    <FileViewerContext.Provider value={{ selectedFile, openFile, closeFile }}>
      {children}
    </FileViewerContext.Provider>
  );
};

export const useFileViewer = () => {
  const context = useContext(FileViewerContext);
  if (!context)
    throw new Error("useFileViewer must be used within FileViewerProvider");
  return context;
};
