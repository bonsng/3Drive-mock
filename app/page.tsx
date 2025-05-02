import MainPage3D from "@/ui/MainPage/main-page-3d";
import MainPage from "@/ui/MainPage/main-page";

export default function Home() {
  return (
    <div className="bg-black-pearl dark:bg-[#030712]  w-screen h-screen  pt-16">
      <main>
        <MainPage3D />
        <MainPage />
      </main>
    </div>
  );
}
