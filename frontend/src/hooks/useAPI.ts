import type { Company } from "@/types/Company";

export default function useAPI() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const companyEndpoint = `${apiUrl}/companies`;

    //48642645000154
    async function getCompanyByCNPJ(cnpj: string): Promise<Company | null> {
        const response = await fetch(`${companyEndpoint}/cnpj/${cnpj}`);
        if (response.ok) {
            const data = await response.json();
            return data?.body || null;
        }
        return null;
    }

    return { getCompanyByCNPJ };
}