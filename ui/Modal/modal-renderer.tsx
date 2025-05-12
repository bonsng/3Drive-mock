import { FC, useEffect, useRef } from "react";
import { useModalContext } from "./modal-context.provider";
import { ModalRef, ModalTypes } from "./modal.type";
import FileModal from "@/ui/Modal/file-modal";
import UploadModal from "@/ui/Modal/upload-modal";

const MODAL_COMPONENT: Record<ModalTypes, FC<any>> = {
  FileModal: FileModal,
  UploadModal: UploadModal,
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

  return <ModalComponents ref={modalRef} {...state.props} />;
};
