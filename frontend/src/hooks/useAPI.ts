export default function useAPI() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const companyEndpoint = `${apiUrl}/companies`;

    //48642645000154
    async function getCompanyByCNPJ(cnpj: string): Promise<{
        id: string,
        name: string,
        cnpj: string,
        comercialName: string
    } | null> {
        const response = await fetch(`${companyEndpoint}/cnpj/${cnpj}`);
        if (response.ok) {
            const data = await response.json();
            if (data)
                return data;
        }
        return null;
    }

    return { getCompanyByCNPJ };

}