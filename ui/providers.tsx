"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { FileTreeProvider } from "@/ui/Components/context/file-tree-context";
import { ShortCutProvider } from "@/ui/Components/context/short-cut-context";
import { ModalProvider } from "@/ui/Modal/modal-context.provider";
import { FolderRefProvider } from "@/ui/Components/context/folder-ref-context";
import { NavContextProvider } from "@/ui/Components/context/nav-context";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <NavContextProvider>
          <ModalProvider>
            <ShortCutProvider>
              <FolderRefProvider>
                <FileTreeProvider>{children}</FileTreeProvider>
              </FolderRefProvider>
            </ShortCutProvider>
          </ModalProvider>
        </NavContextProvider>
      </SessionProvider>
    </>
  );
}
