"use client";

import MainPage3D from "@/ui/MainPage/main-page-3d";
import { useModal } from "@/ui/Modal/modal.hook";
import React, { useEffect } from "react";
import { useBgContext } from "@/ui/Components/context/bg-context";

export default function Page() {
  const { openModal } = useModal("GuideModal");
  const { bgState } = useBgContext();
  useEffect(() => {
    openModal({ isFirst: true });
  }, [openModal]);
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#12161F] to-[#1A1E29] z-0" />
      <div
        className={`absolute inset-0 bg-cover bg-center opacity-80 z-0`}
        style={{
          backgroundImage: `url(/grid-bg${bgState}.png)`,
        }}
      />
      <MainPage3D />
    </>
  );
}
