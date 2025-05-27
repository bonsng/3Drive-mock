import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

const tips = [
  {
    tag: "explore",
    title: "탐색",
    video: "/videos/explore.mp4",
    description: "파일과 폴더를 입체적으로 둘러보세요.",
  },
  {
    tag: "create",
    title: "생성",
    video: "/videos/create.mp4",
    description: "폴더 또는 파일을 새로 만들어보세요.",
  },
  {
    tag: "move",
    title: "이동",
    video: "/videos/move.mp4",
    description: "파일을 드래그해서 이동시킬 수 있어요.",
  },
  {
    tag: "delete",
    title: "삭제",
    video: "/videos/delete.mp4",
    description: "휴지통에 끌어다 놓으면 삭제돼요.",
  },
  {
    tag: "search",
    title: "검색",
    video: "/videos/search.mp4",
    description: "파일명을 입력해 원하는 항목을 바로 찾아보세요.",
  },
];

const details: Record<string, string> = {
  explore: `✅ 드래그로 시점을 이동하고, 스크롤로 시점 확대/축소를 할 수 있습니다\n
✅ 폴더를 더블클릭하면 해당 폴더 위치로 카메라가 이동합니다\n
✅ 파일을 더블클릭하면 파일에 대한 정보가 나옵니다`,
  create: "✅ 폴더에 우클릭 후, 해당 위치에 새 폴더를 생성 할 수 있습니다",
  move: "✅ 파일/폴더를 1초 이상 잡고, 드래그하여 옮기고 싶은 폴더 위치에 놓으면 이동을 할 수 있습니다",
  delete: "✅ 삭제한 폴더/파일은 휴지통으로 이동합니다",
  search: "✅ 검색 탭에서 찾고싶은 파일/폴더를 검색해보세요",
};

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hovered = tips[currentIndex].tag;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.src !== location.origin + tips[currentIndex].video) {
        video.pause();
        video.src = tips[currentIndex].video;
        video.load();
        video.onloadeddata = () => {
          setIsLoading(true);
          setTimeout(() => {
            video.play().catch(() => {});
            setIsLoading(false);
          }, 1000);
        };
      }
    }
  }, [currentIndex]);

  return (
    <div className="rounded-xl p-8 bg-white dark:bg-gray-900 shadow-xl h-full w-full overflow-y-hidden">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">👋 3Drive에 오신 걸 환영합니다!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          아래 기능들을 활용해 입체적으로 파일을 탐색해보세요.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {tips.map((tip, i) => (
          <div
            key={tip.title}
            onClick={() => setCurrentIndex(i)}
            className={clsx(
              "rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer",
              hovered === tip.tag && "ring-2 ring-blue-500",
            )}
          >
            <div className="text-lg font-medium mb-1">{tip.title}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {tip.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-400 shadow-inner transition-colors"
        >
          이전
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => Math.min(tips.length - 1, prev + 1))
          }
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-400 shadow-inner transition-colors"
        >
          다음
        </button>
      </div>

      <div className="mt-10 h-4/7 w-full flex gap-4">
        <div className="relative w-3/5 h-full">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white dark:bg-gray-900 bg-opacity-75 space-y-2">
              <div className="w-12 h-12 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg" />
              <span className="absolute bottom-32 text-sm text-gray-500 dark:text-gray-300 animate-pulse">
                Loading video...
              </span>
            </div>
          )}
          <video
            ref={videoRef}
            className="object-contain rounded-2xl w-full h-full"
            muted
            loop
            playsInline
          />
        </div>

        <div className="w-2/5 h-full p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
          <h3 className="text-2xl font-semibold mb-3 border-b border-gray-300 dark:border-gray-600 pb-2">
            {tips[currentIndex].title}
          </h3>
          <p className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {details[hovered]}
          </p>
        </div>
      </div>
    </div>
  );
}
