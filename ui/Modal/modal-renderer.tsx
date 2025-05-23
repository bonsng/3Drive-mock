import { FC, useEffect, useRef } from "react";
import { useModalContext } from "./modal-context.provider";
import { ModalRef } from "./modal.type";
import FileModal, { PFileModal } from "@/ui/Modal/file-modal";
import UploadModal, { PUploadModal } from "@/ui/Modal/upload-modal";
import CreateFolderModal from "@/ui/Modal/create-folder-modal";
import { PCreateFolderModal } from "@/ui/Modal/create-folder-modal";

export const ModalRenderer: FC = () => {
  const { state } = useModalContext();
  const modalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (!state.isOpen || !state.modalType) {
      modalRef.current?.close();
    } else {
      modalRef.current?.open();
    }
  }, [state.isOpen, state.modalType, state.props]);

  if (!state.isOpen || !state.modalType) return null;

  switch (state.modalType) {
    case "FileModal":
      if (
        !(
          "title" in state.props &&
          "ext" in state.props &&
          "parentId" in state.props
        )
      )
        return null;
      return <FileModal ref={modalRef} {...(state.props as PFileModal)} />;

    case "UploadModal":
      if (!("parentId" in state.props && "files" in state.props)) return null;
      return (
        <UploadModal
          ref={modalRef}
          {...(state.props as unknown as PUploadModal)}
        />
      );

    case "CreateFolderModal":
      if (!("targetFolderId" in state.props && "onCreate" in state.props))
        return null;
      return (
        <CreateFolderModal
          ref={modalRef}
          {...(state.props as PCreateFolderModal)}
        />
      );

    default:
      return null;
  }
};
