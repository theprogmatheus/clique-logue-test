import { useAppContext } from "@/contexts/AppContext";
import type { Contract } from "@/types/Contract";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import { useNavigate } from "react-router-dom";


export default function useContrato() {

    const { getContractsByCompany } = useAPI();
    const { company, setContract } = useAppContext();
    const navigate = useNavigate();

    const [contracts, setContracts] = useState<Contract[]>([]);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [alert, setAlert] = useState<{
        title: string,
        message: string
    } | null>(null);

    // executar assim que a página for executada
    useEffect(() => {
        if (!company) {
            navigate("/");
            return;
        }
        loadContracts();
    }, []);

    // Carregar os contratos da api
    async function loadContracts(): Promise<void> {
        const contracts = await getContractsByCompany(company!);
        setContracts(contracts);
    }


    // exibir os detalhes do contrato
    async function showContractDetails(contract: Contract): Promise<void> {
        // TODO
        console.log(contract);
    }

    function handlePreviousButton(): void {
        navigate("/");
    }

    function handleNextButton(): void {
        // verificar o contrato selecionado, e ir para a página de nota fiscal
        if (selectedContract) {
            setContract(selectedContract);
            navigate("/notafiscal");
            return;
        }

        setAlert({
            title: "Contrato não selecionado",
            message: "Você precisa selecionar um contrato para prosseguir."
        });
    }

    function handleSelectContract(contract: Contract): void {
        if (selectedContract === contract) {
            setSelectedContract(null);
            return;
        }
        setSelectedContract(contract);
    }

    return {
        company,
        contracts,
        selectedContract,
        alert,
        showContractDetails,
        handlePreviousButton,
        handleNextButton,
        handleSelectContract
    };
}