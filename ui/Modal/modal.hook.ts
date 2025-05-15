import { useCallback } from "react";
import { useModalContext } from "@/ui/Modal/modal-context.provider";
import { ModalProps, ModalTypes } from "@/ui/Modal/modal.type";
import { useShowNavContext } from "@/ui/Components/context/nav-context";

export const useModal = <T extends ModalTypes>(modalType: T) => {
  const { state, dispatch } = useModalContext();
  const { setShowNav } = useShowNavContext();

  const openModal = useCallback(
    (props: ModalProps<T>) => {
      setShowNav(false);
      dispatch({ type: "OPEN_MODAL", modalType, props });
    },
    [dispatch, modalType, setShowNav],
  );

  const closeModal = useCallback(() => {
    setShowNav(true);
    dispatch({ type: "CLOSE_MODAL" });
  }, [dispatch, setShowNav]);

  const isOpen = state.isOpen && state.modalType === modalType;

  return {
    isOpen,
    openModal,
    closeModal,
  };
};
