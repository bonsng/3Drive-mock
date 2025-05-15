import { createContext, ReactNode, useContext, useState } from "react";

interface NavContextType {
  showNav: boolean;
  setShowNav: (value: boolean) => void;
  viewState: number;
  setViewState: (value: number) => void;
  toDefault: boolean;
  setToDefault: (value: boolean) => void;
  isTrash: boolean;
  setIsTrash: (value: boolean) => void;
}

const NavContext = createContext<NavContextType | null>(null);

export const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [showNav, setShowNav] = useState(true);
  const [viewState, setViewState] = useState(0);
  const [toDefault, setToDefault] = useState(false);
  const [isTrash, setIsTrash] = useState(false);

  return (
    <NavContext.Provider
      value={{
        showNav,
        setShowNav,
        viewState,
        setViewState,
        toDefault,
        setToDefault,
        isTrash,
        setIsTrash,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useShowNavContext = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};
