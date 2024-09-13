import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocalityContextType {
  localityId: string | null;
  setLocalityId: (id: string | null) => void;
}

const LocalityContext = createContext<LocalityContextType | undefined>(
  undefined
);

export function LocalityProvider({ children }: { children: ReactNode }) {
  const [localityId, setLocalityId] = useState<string | null>(null);

  return (
    <LocalityContext.Provider value={{ localityId, setLocalityId }}>
      {children}
    </LocalityContext.Provider>
  );
}

export function useLocality() {
  const context = useContext(LocalityContext);
  if (context === undefined) {
    throw new Error("useLocality must be used within a LocalityProvider");
  }
  return context;
}
