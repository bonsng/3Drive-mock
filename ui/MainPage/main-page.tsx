import Link from "next/link";

export default function MainPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="relative z-10 flex py-56 flex-col w-screen items-center h-screen font-poppins">
        <div className="px-6 py-1.5 rounded-full bg-gray-600 text-white font-medium text-lg tracking-wide shadow-2xl">
          WELCOME TO 3DRIVE
        </div>
        <div className="text-8xl flex flex-col items-center font-extrabold mt-12">
          <p>3D Based</p>
          <p>Cloud Storage Service</p>
        </div>
        <div className="mt-9 text-lg text-white text-opacity-90">
          Experience your file system in 3D space. You can access to your files
          more easily.
        </div>
        <Link
          href="/example"
          className="text-slate-950 mt-20 px-12 py-5 bg-gradient-to-r from-[#C9D6FF] to-[#E2E2E2] text-xl font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
        >
          예시 파일 트리 보기
        </Link>
      </div>
    </div>
  );
}
