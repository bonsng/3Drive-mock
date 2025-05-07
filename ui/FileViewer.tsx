import Image from "next/image";
import { useFileViewer } from "@/ui/Components/context/file-viewer-context";

export default function FileViewer() {
  const { selectedFile, closeFile } = useFileViewer();

  if (!selectedFile) return null;

  const ext = selectedFile.split(".").pop()?.toLowerCase();

  const renderViewer = () => {
    if (!ext) return <p>확장자를 알 수 없습니다.</p>;

    const fileUrl = `/api/files/${selectedFile}`;

    if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) {
      return (
        <Image
          src={fileUrl}
          alt={selectedFile}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 100%)"
        />
      );
    }

    if (ext === "pdf") {
      return (
        <iframe src={fileUrl} className="w-full h-full" title={selectedFile} />
      );
    }

    if (["txt", "md", "csv", "log", "json"].includes(ext)) {
      return (
        <iframe src={fileUrl} className="w-full h-full" title={selectedFile} />
      );
    }

    if (["docx", "xlsx", "pptx"].includes(ext)) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
          className="w-full h-full"
          title={selectedFile}
        />
      );
    }

    if (["mp4", "webm", "mov"].includes(ext)) {
      return <video src={fileUrl} controls className="w-full h-full" />;
    }

    if (["mp3", "wav"].includes(ext)) {
      return <audio src={fileUrl} controls className="w-full" />;
    }

    return (
      <div className="text-center">
        <p>미리보기를 지원하지 않는 형식입니다.</p>
        <a href={fileUrl} download className="text-blue-600 underline">
          다운로드하기
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 bg-black flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[60vw] h-[60vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{selectedFile}</h2>
          <button onClick={closeFile} className="text-red-500 text-sm">
            닫기
          </button>
        </div>
        <div className="overflow-auto text-sm text-gray-700">
          {renderViewer()}
        </div>
      </div>
    </div>
  );
}
