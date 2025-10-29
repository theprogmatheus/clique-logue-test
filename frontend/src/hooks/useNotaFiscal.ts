import { useAppContext } from "@/contexts/AppContext";
import type { Invoice, InvoiceFormSchema } from "@/types/Invoice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAPI from "./useAPI";

export default function useNotaFiscal() {

    const { company, contract, setContract } = useAppContext();
    const navigate = useNavigate();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<InvoiceFormSchema>();

    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const withholdingTaxes = watch("withholdingTaxes");
    const technicalRetention = watch("technicalRetention");
    const { createInvoice, createAttachment } = useAPI();

    useEffect(() => {
        if (!company) {
            navigate("/");
            return;
        }
    }, []);



    async function handleFormData(data: InvoiceFormSchema) {
        setFormErrorMessage(null);

        // cadastrar nota fiscal
        const invoiceResponse = await createInvoice(contract!, data);
        if (invoiceResponse !== null) {
            console.log(invoiceResponse);
            if (data.attachment.length > 0) {
                const attachmentResponse = await createAttachment(invoiceResponse, data.attachment[0]);
                console.log(attachmentResponse);
            }
            window.alert(`Solicitação ${invoiceResponse.id} foi enviada com sucesso.`);
            navigate("/");
        }
    }

    function handlePreviousButton() {
        setContract(null);
        navigate("/contratos");
    }

    function handleNextButton() {
        const errorsArray = Object.values(errors ?? {});
        console.log(errorsArray);
        if (errorsArray.length > 0)
            setFormErrorMessage(
                errorsArray[0].message && errorsArray[0].message.trim().length > 0 ?
                    errorsArray[0].message :
                    "Alguns campos não atendem os critérios de validação."
            );


        handleSubmit(handleFormData)();
    }


    return {
        company,
        contract,
        formErrorMessage,
        withholdingTaxes,
        technicalRetention,
        navigate,
        register,
        watch,
        handlePreviousButton,
        handleNextButton
    };
}