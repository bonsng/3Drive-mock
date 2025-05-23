"use client";
import MainPage3D from "@/ui/MainPage/main-page-3d";
import MainPage from "@/ui/MainPage/main-page";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.accessToken;
  return (
    <div className="bg-black-pearl dark:bg-[#030712]  w-screen h-screen">
      <main>{isLoggedIn ? <MainPage3D /> : <MainPage />}</main>
    </div>
  );
}
