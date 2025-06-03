import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useShowNavContext } from "@/ui/Components/context/nav-context";

interface ShortCutContextType {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  showPreSearch: boolean;
  setShowPreSearch: (value: boolean) => void;
}

const ShortCutContext = createContext<ShortCutContextType | null>(null);

export const ShortCutProvider = ({ children }: { children: ReactNode }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showPreSearch, setShowPreSearch] = useState(false);
  const { setShowNav, setViewState } = useShowNavContext();

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setShowPreSearch(true);
        setShowNav(false);
        setViewState(2);
      } else if (e.key === "Escape") {
        if (showSearch && !showPreSearch) {
          setShowPreSearch(true);
          setShowSearch(false);
          setViewState(2);
        } else if (!showSearch && showPreSearch) {
          setShowPreSearch(false);
          setShowNav(true);
          setViewState(0);
        }
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [setShowNav, setViewState, showPreSearch, showSearch]);

  return (
    <ShortCutContext.Provider
      value={{ showSearch, setShowSearch, showPreSearch, setShowPreSearch }}
    >
      {children}
    </ShortCutContext.Provider>
  );
};

export const useShortCutContext = () => {
  const context = useContext(ShortCutContext);
  if (!context) {
    throw new Error("useUiContext must be used within a UiProvider");
  }
  return context;
};
