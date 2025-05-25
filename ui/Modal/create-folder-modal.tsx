import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-hot-toast";
import { ModalRef } from "@/ui/Modal/modal.type";
import { useModal } from "@/ui/Modal/modal.hook";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
// import { useSession } from "next-auth/react";

export type PCreateFolderModal = {
  targetFolderId: number;
};

const CreateFolderModal = forwardRef<ModalRef, PCreateFolderModal>(
  ({ targetFolderId }, ref) => {
    // const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [value, setValue] = useState("제목없는 폴더");
    const inputRef = useRef<HTMLInputElement>(null);
    const { closeModal } = useModal("CreateFolderModal");
    const { createNewFolder } = useFileTree();
    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        closeModal();
        setIsClosing(false);
      }, 200);
    };
    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isOpen]);
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
        className={`fixed inset-0 z-40 bg-black/30 flex justify-center items-center ${isClosing && "animate-fade-out"}`}
        onClick={handleClose}
      >
        <div
          className={`bg-white rounded-lg p-6 w-1/4 h-1/5 flex flex-col gap-4 text-black ${
            isClosing ? "animate-scale-out" : "animate-scale-in"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full text-xl font-bold">새 폴더</div>
          <input
            ref={inputRef}
            className="border border-blue-500 rounded px-4 py-2 outline-none mt-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-end gap-4 mt-auto">
            <button
              className="text-blue-600 cursor-pointer"
              onClick={handleClose}
            >
              취소
            </button>
            <button
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={async () => {
                // toast.promise(
                //   (async () => {
                //     const formData = new FormData();
                //     formData.append("folderName", value);
                //     formData.append("parentId", String(targetFolderId));
                //
                //     const res = await fetch(
                //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/folders`,
                //       {
                //         method: "POST",
                //         body: formData,
                //         headers: {
                //           Authorization: `Bearer ${session?.accessToken}`,
                //         },
                //       },
                //     );
                //
                //     if (!res.ok) throw new Error("폴더 생성 실패");
                //
                //     const data = await res.json();
                //     createNewFolder(
                //       targetFolderId,
                //       value,
                //       data?.result?.folderId,
                //     );
                //   })(),
                //   {
                //     loading: "폴더를 생성 중입니다...",
                //     success: "폴더가 생성되었습니다!",
                //     error: "폴더 생성에 실패했습니다.",
                //   },
                // );
                createNewFolder(
                  targetFolderId,
                  value,
                  Date.now() + Math.random(),
                );
                toast.success("폴더가 생성되었습니다!");
                handleClose();
              }}
            >
              만들기
            </button>
          </div>
        </div>
      </div>
    );
  },
);

CreateFolderModal.displayName = "CreateFolderModal";
export default CreateFolderModal;
