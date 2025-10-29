import { createContext, useContext, useState, type ReactNode } from "react";
import type { Company } from "@/types/Company";
import type { Contract } from "@/types/Contract";


interface AppContextType {
    company: Company | null;
    setCompany: (company: Company | null) => void;

    contract: Contract | null;
    setContract: (contract: Contract | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [company, setCompany] = useState<Company | null>(null);
    const [contract, setContract] = useState<Contract | null>(null);
    return (
        <AppContext.Provider value={{ company, setCompany, contract, setContract }}>
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