"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function GlobalNav() {
  const { data: session } = useSession();
  return (
    <nav className="fixed top-0 w-full bg-black-pearl border-b border-b-charade z-10">
      <div className="flex justify-between px-9 py-4 items-center">
        <Link href="/" className="font-boldonse text-lg">
          3Drive
        </Link>
        {session && session.nickName ? (
          <div className="text-md">{session.nickName}</div>
        ) : (
          <Link href="/login" className="text-md">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
