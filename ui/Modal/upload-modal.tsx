import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { ModalRef } from "@/ui/Modal/modal.type";
import { useModal } from "@/ui/Modal/modal.hook";

export type PUploadModal = {
  title: string;
  folderId: string;
  files?: File[];
};

const UploadModal = forwardRef<ModalRef, PUploadModal>(
  ({ title, folderId, files }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { closeModal } = useModal("UploadModal");
    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        closeModal();
        setIsClosing(false);
      }, 200);
    };
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
        console.log("opened");
      },
      close: () => {
        setIsOpen(false);
      },
      isOpen,
    }));

    useEffect(() => {
      if (files && files.length > 0) {
        setUploadedFiles((prev) => {
          const existingNames = new Set(prev.map((f) => f.name));
          const newFiles = files.filter((f) => !existingNames.has(f.name));
          return [...prev, ...newFiles];
        });
      }
    }, [files]);

    const UploadHeader = () => {
      return (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 flex justify-between gap-4 w-full pt-2.5 px-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center">
            <svg
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 stroke-2 rounded-full p-1 hover:bg-gray-500/60 cursor-pointer mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
              </svg>
              {title} {`(${folderId})`}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div
        className={`fixed inset-0 z-40 bg-black/80 flex justify-center items-center ${isClosing && "animate-fade-out"}`}
        onClick={handleClose}
      >
        <UploadHeader />
        <div
          className={`bg-white rounded-lg p-6 w-3/5 h-4/5 flex flex-col gap-4 text-black ${
            isClosing ? "animate-scale-out" : "animate-scale-in"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full text-xl font-bold">파일 업로드</div>
          <label
            htmlFor="fileUpload"
            className={`border border-dashed border-gray-400 rounded-lg w-full h-1/5 transition-colors flex flex-col items-center justify-center text-gray-600 cursor-pointer shadow-lg ${
              isDragOver ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const files = Array.from(e.dataTransfer.files || []);
              const newFiles = files.filter(
                (f) => !uploadedFiles.some((uf) => uf.name === f.name),
              );
              setUploadedFiles([...uploadedFiles, ...newFiles]);
            }}
          >
            <span className="text-sm">
              여기에 파일을 드래그하거나 클릭하여 업로드
            </span>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const newFiles = files.filter(
                  (f) => !uploadedFiles.some((uf) => uf.name === f.name),
                );
                setUploadedFiles([...uploadedFiles, ...newFiles]);
              }}
            />
          </label>

          <div className="w-full mt-3 font-semibold border-b border-dashed border-gray-600 pb-3">
            Upload Queue
          </div>

          <div className="w-full text-sm text-gray-700 mt-2 h-1/2 max-h-1/2 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between px-3 py-2 border rounded-md border-gray-200 mb-1"
              >
                <div className="flex">
                  <div className="w-9 h-9 bg-blue-500 flex justify-center items-center mr-4 font-bold">
                    {file.name.split(".").pop()?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() =>
                    setUploadedFiles(
                      uploadedFiles.filter((f) => f.name !== file.name),
                    )
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-auto pt-4">
            <button
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded cursor-pointer"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer flex justify-center items-center "
              onClick={() => {
                console.log("업로드할 파일:", uploadedFiles);
                handleClose();
              }}
              disabled={uploadedFiles.length === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 mr-3"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  },
);

UploadModal.displayName = "UploadModal";
export default UploadModal;
