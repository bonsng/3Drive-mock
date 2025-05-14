import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "@/ui/Modal/modal.type";
import { useModal } from "@/ui/Modal/modal.hook";
import FilePreview from "@/ui/Components/file-preview";

export type PFileModal = {
  title: string;
  ext: string;
  url: string | undefined;
};

const FileModal = forwardRef<ModalRef, PFileModal>(
  ({ title, ext, url }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { closeModal } = useModal("FileModal" as const);
    const handleClose = () => {
      closeModal();
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

    return (
      <div
        className="fixed inset-0 z-40 bg-black/80 flex justify-center items-center"
        onClick={handleClose}
      >
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
            <div>{title}</div>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 stroke-2 rounded-full p-2 hover:bg-gray-500/60 cursor-pointer mr-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </div>
        </div>
        <FilePreview title={title} ext={ext} url={url} />
      </div>
    );
  },
);

FileModal.displayName = "FileModal";
export default FileModal;
