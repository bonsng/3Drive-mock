"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function GlobalNav() {
  const { data: session } = useSession();
  return (
    <nav className="fixed top-0 w-full bg-transparent z-50">
      <div className="flex justify-between px-9 py-4 items-center">
        <Link href="/" className="font-boldonse text-lg">
          3Drive
        </Link>
        {session && session.nickName ? (
          <div className="text-md flex">
            <div className="mr-4">{session.nickName}님</div>
            <div className="cursor-pointer" onClick={() => signOut()}>
              로그아웃
            </div>
          </div>
        ) : (
          // <Link href="/login" className="text-md">
          //   Login
          // </Link>
          <span className="text-md text-gray-400 cursor-not-allowed">
            demo@example.com
          </span>
        )}
      </div>
    </nav>
  );
}
