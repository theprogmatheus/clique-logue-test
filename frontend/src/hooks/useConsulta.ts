import useAPI from "@/hooks/useAPI";
import { useState, type FormEvent } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";


export default function useConsulta() {

    const { setCompany } = useAppContext();
    const { getCompanyByCNPJ } = useAPI();
    const [cnpj, setCNPJ] = useState('');
    const [alert, setAlert] = useState<{ title: string, message: string } | null>(null);
    const navigate = useNavigate();


    async function handleSubmit(event: FormEvent): Promise<void> {
        event.preventDefault();

        try {
            // tratar se o CNPJ é válido...
            if (!validateCNPJ()) {
                setAlert({
                    title: "CNPJ inválido",
                    message: "Por favor, insira um CNPJ válido antes de continuar."
                });
                return;
            }

            // consultar a API...
            const result = await getCompanyByCNPJ(cnpj);
            if (!result) {
                setAlert({
                    title: "Empresa não encontrada",
                    message: "Nenhum registro foi localizado para o CNPJ informado."
                });
                return;
            }

            setCompany(result);
            navigate("/contratos");
        } catch (err: any) {
            console.error(err);
            setAlert({
                title: "Erro ao consultar",
                message: "Não foi possível conectar à API. Tente novamente mais tarde.",
            });
        }
    }

    function validateCNPJ(): boolean {
        return cnpj.replace(/\D/g, "").length === 14;
    }

    return {
        cnpj,
        setCNPJ,
        handleSubmit,
        alert
    };
}