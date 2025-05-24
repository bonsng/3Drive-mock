import Image from "next/image";

type PFilePreview = {
  title: string;
  ext: string;
  onDownload?: () => void;
};

const FilePreview = ({ title, ext, onDownload }: PFilePreview) => {
  const renderPreview = () => {
    return (
      <div className="flex flex-col  p-4 gap-10 items-center justify-start">
        <div className="text-3xl font-semibold font-poppins">{title}</div>
        <div className="relative w-2/3 h-48">
          <Image
            src={`/icon-tex/${ext}-tex.png`}
            alt={`${ext} icon`}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          className="flex flex-col items-center justify-center  rounded-md shadow-2xl text-center space-y-4 "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/*<p className="text-white text-lg">미리보기에 문제가 발생했습니다.</p>*/}
          <div className="flex gap-6">
            <button
              type="button"
              onClick={onDownload}
              disabled={true}
              title="현재 다운로드는 지원하지 않습니다"
              className="px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg opacity-50 cursor-not-allowed"
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
      </div>
    );
  };

  return renderPreview();
};

export default FilePreview;
