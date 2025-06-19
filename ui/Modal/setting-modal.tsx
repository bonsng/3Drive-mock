import { forwardRef, useImperativeHandle, useState } from "react";
import { ModalRef } from "@/ui/Modal/modal.type";
import { useModal } from "@/ui/Modal/modal.hook";
import { useBgContext } from "@/ui/Components/context/bg-context";
import clsx from "clsx";
import Image from "next/image";

export type PSettingModal = {
  isFirst: boolean;
};

const BgDescriptions = [
  "Default",
  "Purple Grid",
  "Dark Universe",
  "Purple Universe",
  "Purple Spacial Grid",
  "Red Universe",
];

const SettingModal = forwardRef<ModalRef, PSettingModal>(({ isFirst }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { closeModal } = useModal("SettingModal" as const);
  const [isClosing, setIsClosing] = useState(false);
  const { setBgState, bgState } = useBgContext();
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
          className={`relative bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-lg w-3/4 flex gap-4 text-white ${
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
          <div className="flex flex-col w-full h-full p-6">
            <h2 className="text-xl font-semibold mb-4">배경화면 선택</h2>
            <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
              {[0, 1, 2, 3, 4, 5].map((bg, index) => (
                <div
                  key={index}
                  className={clsx(
                    "inline-block w-48 h-28 rounded-lg overflow-hidden cursor-pointer border border-transparent hover:border-white transition-all relative",
                    { "border-white": index === bgState },
                  )}
                  onClick={() => {
                    setBgState(index);
                  }}
                >
                  <Image
                    src={`/grid-bg${bg}.png`}
                    alt={`Background ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <p className="text-white bg-black/40 px-2 py-1 text-sm absolute bottom-2 left-2 rounded">
                    {BgDescriptions[index]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
});

SettingModal.displayName = "SettingModal";
export default SettingModal;
