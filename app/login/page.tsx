"use client";

import { LoginPage3D } from "@/ui/LoginPage/login-page-3D";
import LoginForm from "@/ui/LoginPage/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-black-pearl dark:bg-[#030712]  w-screen h-screen  pt-16 flex flex-row justify-between">
      <div className="w-3/5">
        <LoginPage3D />
      </div>
      <div className="w-2/5 mr-48 mb-10 flex justify-center items-center flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
