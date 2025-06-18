import { forwardRef, useImperativeHandle, useState } from "react";
import { useModal } from "@/ui/Modal/modal.hook";
import { ModalRef } from "@/ui/Modal/modal.type";
import Onboarding from "@/ui/Components/onboarding";

export type PGuideModal = {
  isFirst: boolean;
};

const GuideModal = forwardRef<ModalRef, PGuideModal>(({ isFirst }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { closeModal } = useModal("GuideModal" as const);
  const [isClosing, setIsClosing] = useState(false);
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
    },
    close: () => {
      setIsOpen(false);
    },
    isOpen,
  }));

  return (
    isFirst && (
      <div
        className={`fixed inset-0 z-50 bg-transparent flex justify-center items-center ${isClosing && "animate-fade-out"}`}
        onClick={handleClose}
      >
        <div
          className={`relative bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-lg w-3/4 h-3/4 flex gap-4 text-white ${
            isClosing ? "animate-scale-out" : "animate-scale-in"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute cursor-pointer top-2 right-4 text-gray-500 hover:text-white text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
          <Onboarding />
        </div>
      </div>
    )
  );
});

GuideModal.displayName = "GuideModal";
export default GuideModal;
