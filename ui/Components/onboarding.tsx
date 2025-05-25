import { useState } from "react";
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
  const [hovered, setHovered] = useState<string>("explore");

  return (
    <div className="rounded-xl p-8 bg-white dark:bg-gray-900 shadow-xl h-full overflow-y-hidden">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">👋 3Drive에 오신 걸 환영합니다!</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          아래 기능들을 활용해 입체적으로 파일을 탐색해보세요.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {tips.map((tip) => (
          <div
            key={tip.title}
            onMouseEnter={() => setHovered(tip.tag)}
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

      <div className="mt-6 h-4/6 w-full flex gap-4">
        <div className="w-3/5 h-full">
          <video
            src={tips.find((t) => t.tag === hovered)?.video}
            className="object-contain rounded-2xl"
            autoPlay
            muted
            loop
          />
        </div>

        <div className="w-2/5 h-11/12 p-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
          {hovered ? (
            <>
              <h3 className="text-2xl font-semibold mb-3 border-b border-gray-300 dark:border-gray-600 pb-2">
                {tips.find((t) => t.tag === hovered)?.title}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {details[hovered]}
              </p>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              왼쪽에서 항목에 마우스를 올려보세요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
