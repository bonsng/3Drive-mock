import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { tips, details } from "@/lib/guides";

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
