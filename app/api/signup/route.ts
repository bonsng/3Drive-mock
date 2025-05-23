import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { error: "모든 항목을 입력해주세요." },
      { status: 400 },
    );
  }

  console.log("회원가입됨:", { username, email, password });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/sign-up`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error || "회원가입 실패" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, message: "회원가입 성공" });
}
