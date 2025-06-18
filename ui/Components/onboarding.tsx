import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const tips = [
  {
    tag: "explore",
    title: "탐색",
    video: "/videos/explore.mp4",
    description: "입체적으로 둘러보세요",
  },
  {
    tag: "create",
    title: "생성",
    video: "/videos/create.mp4",
    description: "입체적으로 생성해보세요",
  },
  {
    tag: "move",
    title: "이동",
    video: "/videos/move.mp4",
    description: "드래그해서 이동해보세요",
  },
  {
    tag: "delete",
    title: "삭제",
    video: "/videos/delete.mp4",
    description: "휴지통에 넣어보세요",
  },
  {
    tag: "search",
    title: "검색",
    video: "/videos/search.mp4",
    description: "원하는 항목을 바로 찾아보세요",
  },
];

const details: Record<string, string> = {
  explore: `✅\t드래그로 시점을 이동하고, 스크롤로 시점 확대/축소를 할 수 있습니다\n\n✅\t폴더를 더블클릭하면 해당 폴더 위치로 카메라가 이동합니다\n\n✅\t파일을 더블클릭 하면 파일에 대한 정보가 나옵니다`,
  create: "✅\t폴더에 우클릭 후, 해당 위치에 새 폴더를 생성 할 수 있습니다",
  move: "✅\t파일/폴더를 1초 이상 잡고, 드래그하여 옮기고 싶은 폴더 위치에 놓으면 이동을 할 수 있습니다",
  delete:
    "✅\t삭제한 폴더/파일은 휴지통으로 이동합니다\n\n✅\t휴지통에 있는 파일/폴더들은 모두 복원 가능합니다",
  search:
    "✅\t검색 탭에서 찾고싶은 파일/폴더를 검색해보세요\n\n✅\t처음 검색시에는 전체 구조에서 위치를 보여줍니다\n\n✅\tEnter를 누르면 검색 결과만 볼 수 있습니다",
};

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hovered = tips[currentIndex].tag;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="rounded-xl p-8  shadow-xl h-full w-full overflow-y-hidden">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">3Drive에 오신 걸 환영합니다!</h2>
        <p className="text-gray-300 dark:text-gray-400 mt-2">
          아래 기능들을 활용해 입체적으로 파일을 탐색해보세요!
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {tips.map((tip, i) => (
          <div
            key={tip.title}
            onClick={() => setCurrentIndex(i)}
            className={clsx(
              "rounded-lg border p-3 text-center transition-all cursor-pointer hover:text-gray-50 hover:border-gray-50",
              hovered === tip.tag
                ? "border-gray-50 inset-shadow-blue-300 text-gray-50"
                : "border-gray-500 text-gray-500",
            )}
          >
            <div className="text-lg font-medium mb-1">{tip.title}</div>
            <p className="text-sm transition-colors">{tip.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="px-4 py-2 bg-transparent rounded-md cursor-pointer hover:bg-gray-400 shadow-inner transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => Math.min(tips.length - 1, prev + 1))
          }
          className="px-4 py-2 bg-transparent rounded-md cursor-pointer hover:bg-gray-400 shadow-inner transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div className="mt-6 h-4/7 w-full flex gap-4">
        <div className="relative w-3/5 h-full">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent dark:bg-gray-900 bg-opacity-75 space-y-2">
              <div className="w-12 h-12 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg" />
              <span className="absolute bottom-32 text-sm text-gray-500 dark:text-gray-300 animate-pulse">
                Loading video...
              </span>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="object-contain rounded-2xl w-full h-full"
              autoPlay
              muted
              loop
              playsInline
              src={tips[currentIndex].video}
            />
          )}
        </div>

        <div className="w-2/5 h-full p-4 bg-transparent flex">
          <p className="text-lg text-white whitespace-pre-wrap">
            {details[hovered]}
          </p>
        </div>
      </div>
    </div>
  );
}
