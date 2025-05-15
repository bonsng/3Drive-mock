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
}

const ShortCutContext = createContext<ShortCutContextType | null>(null);

export const ShortCutProvider = ({ children }: { children: ReactNode }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { setShowNav } = useShowNavContext();

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setShowSearch(true);
      } else if (e.key === "Escape") {
        setShowSearch(false);
        setShowNav(true);
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return (
    <ShortCutContext.Provider value={{ showSearch, setShowSearch }}>
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
