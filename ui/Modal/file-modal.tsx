import { toast } from "react-hot-toast";
import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "@/ui/Modal/modal.type";
import { useModal } from "@/ui/Modal/modal.hook";
import { useSession } from "next-auth/react";
import FilePreview from "@/ui/Components/3d-components/file/file-preview";

export type PFileModal = {
  title: string;
  ext: string;
  parentId: number | null;
};

const FileModal = forwardRef<ModalRef, PFileModal>(
  ({ title, ext, parentId }, ref) => {
    const { data: session } = useSession();
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

    const handleDownload = async () => {
      if (!parentId) return;

      await toast.promise(
        (async () => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${parentId}/${title}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session?.accessToken}`,
              },
            },
          );

          if (!response.ok) throw new Error("다운로드 실패");

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = title;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        })(),
        {
          loading: "다운로드 중...",
          success: "다운로드가 완료되었습니다.",
          error: "다운로드에 실패했습니다.",
        },
      );
    };

    return (
      <div
        className="fixed inset-0 z-40 bg-black/80 flex justify-center items-center"
        onClick={handleClose}
      >
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 flex justify-between gap-4 w-full pt-2.5 px-5"
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
        </div>
        <FilePreview title={title} ext={ext} onDownload={handleDownload} />
      </div>
    );
  },
);

FileModal.displayName = "FileModal";
export default FileModal;
