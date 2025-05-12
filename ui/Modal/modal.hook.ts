import { useCallback } from "react";
import { useModalContext } from "@/ui/Modal/modal-context.provider";
import { ModalProps, ModalTypes } from "@/ui/Modal/modal.type";

export const useModal = <T extends ModalTypes>(modalType: T) => {
  const { state, dispatch } = useModalContext();

  const openModal = useCallback(
    (props: ModalProps<T>) => {
      dispatch({ type: "OPEN_MODAL", modalType, props });
    },
    [dispatch, modalType],
  );

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, [dispatch]);

  const isOpen = state.isOpen && state.modalType === modalType;

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
