import type { Contract } from "@/types/Contract";
import type { Invoice } from "@/types/Invoice";
import { useEffect, useState } from "react";
import useAPI from "./useAPI";
import { useNavigate } from "react-router-dom";

export default function useContractDetails(contract: Contract) {

    const navigate = useNavigate();
    const [notasFiscais, setNotasFiscais] = useState<Invoice[]>([]);
    const { getInvoicesByContract } = useAPI();

    useEffect(() => {
        getInvoicesByContract(contract).then(setNotasFiscais);
    }, []);

    return {
        navigate,
        notasFiscais
    };
}