"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { FileTreeProvider } from "@/ui/Components/context/file-tree-context";
import { ShortCutProvider } from "@/ui/Components/context/short-cut-context";
import { ModalProvider } from "@/ui/Modal/modal-context.provider";
import { FolderRefProvider } from "@/ui/Components/context/folder-ref-context";
import { NavContextProvider } from "@/ui/Components/context/nav-context";
import { LoadingProvider } from "@/ui/Components/context/loading-context";
import { BgContextProvider } from "@/ui/Components/context/bg-context";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <BgContextProvider>
          <LoadingProvider>
            <NavContextProvider>
              <FolderRefProvider>
                <FileTreeProvider>
                  <ModalProvider>
                    <ShortCutProvider>{children}</ShortCutProvider>
                  </ModalProvider>
                </FileTreeProvider>
              </FolderRefProvider>
            </NavContextProvider>
          </LoadingProvider>
        </BgContextProvider>
      </SessionProvider>
    </>
  );
}
