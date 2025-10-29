import type { Company } from "@/types/Company";
import type { Contract } from "@/types/Contract";

export default function useAPI() {

    const apiUrl = import.meta.env.VITE_API_URL;
    const endPoints = {
        companies: `${apiUrl}/companies`,
        contracts: `${apiUrl}/contracts`,
    };

    //48642645000154
    async function getCompanyByCNPJ(cnpj: string): Promise<Company | null> {
        const response = await fetch(`${endPoints.companies}/cnpj/${cnpj}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }

    async function getContractsByCompany(company: Company): Promise<Contract[]> {
        const response = await fetch(`${endPoints.contracts}/cnpj/${company.cnpj}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || [];
        }
        return [];
    }

    return {
        getCompanyByCNPJ,
        getContractsByCompany
    };
}