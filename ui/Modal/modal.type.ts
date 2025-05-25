import { PFileModal } from "@/ui/Modal/file-modal";
import { PUploadModal } from "@/ui/Modal/upload-modal";
import { PCreateFolderModal } from "@/ui/Modal/create-folder-modal";
import { PGuideModal } from "@/ui/Modal/guide-modal";

export interface ModalRef {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export type ModalTypes =
  | "FileModal"
  | "UploadModal"
  | "CreateFolderModal"
  | "GuideModal";

export type ModalPropsMap = {
  FileModal: PFileModal;
  UploadModal: PUploadModal;
  CreateFolderModal: PCreateFolderModal;
  GuideModal: PGuideModal;
};

export type ModalProps<T extends ModalTypes> = T extends keyof ModalPropsMap
  ? ModalPropsMap[T]
  : never;
