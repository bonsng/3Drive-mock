"use client";

import MainPage3D from "@/ui/MainPage/main-page-3d";
import { useModal } from "@/ui/Modal/modal.hook";
import { useEffect } from "react";

export default function Page() {
  const { openModal } = useModal("GuideModal");
  useEffect(() => {
    openModal({ isFirst: true });
  }, [openModal]);
  return <MainPage3D />;
}
