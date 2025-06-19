import { createContext, ReactNode, useContext, useState } from "react";

interface BgContextType {
  bgState: number;
  setBgState: (state: number) => void;
}

const BgContext = createContext<BgContextType | null>(null);

export const BgContextProvider = ({ children }: { children: ReactNode }) => {
  const [bgState, setBgState] = useState(0);

  return (
    <BgContext.Provider value={{ bgState, setBgState }}>
      {children}
    </BgContext.Provider>
  );
};

export const useBgContext = () => {
  const context = useContext(BgContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  return context;
};
