"use client";
import MainPage from "@/ui/MainPage/main-page";

export default function Home() {
  // const { data: session } = useSession();
  // const isLoggedIn = !!session?.accessToken;
  return (
    <div className="w-screen h-screen">
      <main>
        <MainPage />
      </main>
    </div>
  );
}
