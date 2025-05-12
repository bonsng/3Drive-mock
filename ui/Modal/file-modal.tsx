import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "@/ui/Modal/modal.type";
import { useModal } from "@/ui/Modal/modal.hook";

export type PFileModal = {
  title: string;
  ext: string;
};

const FileModal = forwardRef<ModalRef, PFileModal>(({ title, ext }, ref) => {
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
    <div className="fixed inset-0 z-40 bg-black flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[60vw] h-[60vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">
            {title} {ext}
          </h2>
          <button onClick={handleClose} className="text-red-500 text-sm">
            닫기
          </button>
        </div>
        <div className="overflow-auto text-sm text-gray-700">
          {/*{renderViewer()}*/}
        </div>
      </div>
    </div>
  );
});

FileModal.displayName = "FileModal";
export default FileModal;
