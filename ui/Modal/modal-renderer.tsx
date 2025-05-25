import React, { FC, useEffect, useRef } from "react";
import { useModalContext } from "./modal-context.provider";
import { ModalProps, ModalRef, ModalTypes } from "./modal.type";
import FileModal from "@/ui/Modal/file-modal";
import UploadModal from "@/ui/Modal/upload-modal";
import CreateFolderModal from "@/ui/Modal/create-folder-modal";
import GuideModal from "@/ui/Modal/guide-modal";

const MODAL_COMPONENT: {
  [K in ModalTypes]: FC<ModalProps<K> & { ref?: React.Ref<ModalRef> }>;
} = {
  FileModal,
  UploadModal,
  CreateFolderModal,
  GuideModal,
};

export const ModalRenderer: FC = () => {
  const { state } = useModalContext();
  const modalRef = useRef<ModalRef>(null);

  const ModalComponents = MODAL_COMPONENT[state.modalType as ModalTypes];

  useEffect(() => {
    if (!state.isOpen || !state.modalType) {
      modalRef.current?.close();
    } else {
      modalRef.current?.open();
    }
  }, [state.isOpen, state.modalType, state.props]);

  if (!state.isOpen || !state.modalType) return null;

  return (
    <ModalComponents
      title={""}
      ext={""}
      parentId={null}
      folderId={0}
      targetFolderId={0}
      isFirst={false}
      ref={modalRef}
      {...state.props}
    />
  );
};
