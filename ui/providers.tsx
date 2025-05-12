"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { FileTreeProvider } from "@/ui/Components/context/file-tree-context";
import { ShortCutProvider } from "@/ui/Components/context/short-cut-context";
import { ModalProvider } from "@/ui/Modal/modal-context.provider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <ModalProvider>
          <ShortCutProvider>
            <FileTreeProvider>{children}</FileTreeProvider>
          </ShortCutProvider>
        </ModalProvider>
      </SessionProvider>
    </>
  );
}
