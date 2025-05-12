import { PFileModal } from "@/ui/Modal/file-modal";
import { PUploadModal } from "@/ui/Modal/upload-modal";

export interface ModalRef {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export type ModalTypes = "FileModal" | "UploadModal";

export type ModalPropsMap = {
  FileModal: PFileModal;
  UploadModal: PUploadModal;
};

export type ModalProps<T extends ModalTypes> = T extends keyof ModalPropsMap
  ? ModalPropsMap[T]
  : never;
