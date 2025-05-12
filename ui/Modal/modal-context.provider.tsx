import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { ModalRenderer } from "./modal-renderer";
import { ModalPropsMap, ModalTypes } from "@/ui/Modal/modal.type";

type ModalState = {
  isOpen: boolean;
  modalType: ModalTypes | null;
  props: object;
};

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  props: {},
};

type ModalAction =
  | {
      type: "OPEN_MODAL";
      modalType: ModalTypes;
      props: ModalPropsMap[ModalTypes];
    }
  | { type: "CLOSE_MODAL" };

export const ModalContext = createContext<{
  state: ModalState;
  dispatch: Dispatch<ModalAction>;
}>({ state: initialState, dispatch: () => undefined });

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isOpen: true,
        modalType: action.modalType,
        props: action.props,
      };
    case "CLOSE_MODAL":
      return initialState;
    default:
      return state;
  }
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
      <ModalRenderer />
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
