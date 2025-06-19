"use client";
import MainPage3D from "@/ui/MainPage/main-page-3d";
import MainPage from "@/ui/MainPage/main-page";
import { useSession } from "next-auth/react";
import React from "react";
import { useBgContext } from "@/ui/Components/context/bg-context";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.accessToken;
  const { bgState } = useBgContext();
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-[#12161F] to-[#1A1E29] z-0" />
      <div
        className={`absolute inset-0 bg-cover bg-center opacity-80 z-0`}
        style={{
          backgroundImage: `url(/grid-bg${bgState}.png)`,
        }}
      />
      <div className={`  w-screen h-screen`}>
        <main>{isLoggedIn ? <MainPage3D /> : <MainPage />}</main>
      </div>
    </>
  );
}
