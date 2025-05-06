"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { FileViewerProvider } from "@/ui/Components/context/file-viewer-context";
import { FileTreeProvider } from "@/ui/Components/context/file-tree-context";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <FileTreeProvider>
          <FileViewerProvider>{children}</FileViewerProvider>
        </FileTreeProvider>
      </SessionProvider>
    </>
  );
}
