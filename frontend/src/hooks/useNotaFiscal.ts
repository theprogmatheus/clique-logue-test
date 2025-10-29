import { useAppContext } from "@/contexts/AppContext";
import type { Invoice, InvoiceFormSchema } from "@/types/Invoice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "./useAPI";

export default function useNotaFiscal() {

    const { company, contract, setContract, setCompany } = useAppContext();
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<InvoiceFormSchema>();

    const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const withholdingTaxes = watch("withholdingTaxes");
    const technicalRetention = watch("technicalRetention");
    const {
        createInvoice,
        createAttachment,
        getInvoice,
        getContract,
        getCompany
    } = useAPI();

    useEffect(() => {
        if ((!company || !contract) && !id) {
            navigate("/");
            return;
        }

        async function load(id: string) {
            const invoice = await getInvoice(id);
            if (!invoice) return;

            const contract = await getContract(invoice.contractId);
            if (!contract) return;

            const company = await getCompany(contract.companyId);
            if (!company) return;

            setCompany(company);
            setContract(contract);
            setInvoiceData(invoice);
            reset({
                code: invoice.code,
                issueDate: new Date(invoice.issueDate),
                dueDate: new Date(invoice.dueDate),
                value: invoice.value / 100,
                withholdingTaxes: invoice.withholdingTaxes,
                issqnTax: (invoice.issqnTax || 0) / 100,
                irrfTax: (invoice.irrfTax || 0) / 100,
                csllTax: (invoice.csllTax || 0) / 100,
                cofinsTax: (invoice.cofinsTax || 0) / 100,
                inssTax: (invoice.inssTax || 0) / 100,
                pisTax: (invoice.pisTax || 0) / 100,
                technicalRetention: invoice.technicalRetention,
                technicalRetentionPercent: invoice.technicalRetentionPercent,
            });
        }

        if (id) {
            load(id);
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
        invoiceData,
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