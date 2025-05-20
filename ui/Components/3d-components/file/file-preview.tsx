import Image from "next/image";

type PFilePreview = {
  title: string;
  ext: string;
  url: string | undefined;
};

const FilePreview = ({ title, ext, url }: PFilePreview) => {
  const renderPreview = () => {
    if (ext === "video") {
      return (
        <video
          src={url}
          controls
          className="relative w-full max-w-[85%] aspect-video mx-auto object-contain"
        />
      );
    } else if (ext === "image") {
      return (
        <div className="relative w-full max-w-[85%] aspect-video mx-auto">
          {url ? (
            <Image
              src={url}
              alt={title}
              fill
              className="object-contain"
              unoptimized
            />
          ) : (
            <div className="text-white text-center p-4">
              이미지 경로가 없습니다.
            </div>
          )}
        </div>
      );
    } else if (ext === "pdf") {
      return (
        <iframe
          src={url}
          title={title}
          className="relative w-full max-w-[85%] aspect-video mx-auto"
        />
      );
    } else {
      return (
        <div
          className="flex flex-col items-center justify-center w-1/2 py-20 rounded-md shadow-2xl text-center space-y-4 bg-[#4c494c]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className="text-white text-lg">미리보기에 문제가 발생했습니다.</p>
          <div className="flex gap-6">
            <button
              type="button"
              className="px-5 py-3 text-base font-medium text-center inline-flex items-center cursor-pointer text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              다운로드
            </button>
            <button
              type="button"
              className="px-4 py-1 text-base font-medium text-center inline-flex items-center text-black bg-gray-200 rounded-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              추가 앱 연결
            </button>
          </div>
        </div>
      );
    }
  };

  return renderPreview();
};

export default FilePreview;
