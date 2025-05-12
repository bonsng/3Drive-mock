import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "@/ui/Modal/modal.type";

export type PUploadModal = {
  title: string;
};

const UploadModal = forwardRef<ModalRef, PUploadModal>(({ title }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
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
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="text-red-500 text-sm">닫기</button>
        </div>
        <div className="overflow-auto text-sm text-gray-700">
          {/*{renderViewer()}*/}
        </div>
      </div>
    </div>
  );
});

UploadModal.displayName = "UploadModal";
export default UploadModal;
