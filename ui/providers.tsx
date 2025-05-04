"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { DragProvider } from "@/ui/Components/context/file-drag-context";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <DragProvider>{children}</DragProvider>
      </SessionProvider>
    </>
  );
}
