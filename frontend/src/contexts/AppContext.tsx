import { createContext, useContext, useState, type ReactNode } from "react";
import type { Company } from "@/types/Company";


interface AppContextType {
    company: Company | null;
    setCompany: (company: Company | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [company, setCompany] = useState<Company | null>(null);
    return (
        <AppContext.Provider value={{ company, setCompany }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Context is null.");
    }
    return context;
}