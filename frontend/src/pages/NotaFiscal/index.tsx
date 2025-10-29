import PagamentoFornecedor from "@/pages/templates/PagamentoFornecedor";
import Style from "@/pages/NotaFiscal/style.module.scss";
import useNotaFiscal from "@/hooks/useNotaFiscal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function NotaFiscal() {

    const {
        company,
        contract,
        invoiceData,
        formErrorMessage,
        withholdingTaxes,
        technicalRetention,
        register,
        handleNextButton,
        handlePreviousButton
    } = useNotaFiscal();


    return (
        <PagamentoFornecedor
            moduleName="Dados da Nota Fiscal"
            company={company}
            alert={null}
            handleNextButton={invoiceData === null ? handleNextButton : () => { }}
            handlePreviousButton={handlePreviousButton}
        >
            <div className={Style.container}>
                <div className={Style.contractInfo}>
                    <div className={Style.contractInfoCell}>
                        <p className={Style.contractInfoCellKey}>Código do Contrato:</p>
                        <p className={Style.contractInfoCellValue}>{contract?.code}</p>
                    </div>
                    <div className={Style.contractInfoCell}>
                        <p className={Style.contractInfoCellValue}>{contract?.name}</p>
                    </div>
                </div>

                <form className={Style.contractForm} >
                    <div className={Style.contractFormRow}>
                        <label>
                            <p>Número da Nota</p>
                            <input type="text" disabled={invoiceData !== null}  {
                                ...register(
                                    "code",
                                    {
                                        required: "Você precisa informar o número da nota fiscal.",
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "O número da nota é inválido."
                                        }
                                    }
                                )
                            } />
                        </label>

                        <label>
                            <p>Data de Emissão</p>
                            <input type="date" disabled={invoiceData !== null} {...register("issueDate", { required: "Você precisa informar a data de emissão da nota fiscal.", valueAsDate: true })} />
                        </label>

                        <label>
                            <p>Data de Vencimento</p>
                            <input type="date" disabled={invoiceData !== null} {...register("dueDate", { required: "Você precisa informar a data de vencimento da nota fiscal.", valueAsDate: true })} />
                        </label>

                        <label>
                            <p>Valor</p>
                            <input type="number" disabled={invoiceData !== null} {
                                ...register("value",
                                    {
                                        required: "Você precisa informar o valor da nota fiscal.",
                                        min: { value: 0, message: "O valor da nota fiscal não pode ser negativo." },
                                        valueAsNumber: true
                                    }
                                )} />
                        </label>
                    </div>

                    <div className={Style.contractFormRow}>
                        <label className={Style.contractFormLabelInline}>
                            <input type="checkbox" disabled={invoiceData !== null} {...register("withholdingTaxes")} />
                            <p>Retenção de Impostos</p>
                        </label>
                    </div>

                    <div className={`${Style.contractFormRow} ${Style.contractFormTaxes}`}>
                        <label>
                            <p>ISSQN</p>
                            <input type="number" disabled={!withholdingTaxes || invoiceData !== null}
                                {...register("issqnTax", { valueAsNumber: true, min: { value: 0, message: "O valor do imposto não pode ser negativo" } })} />
                        </label>
                        <label>
                            <p>IRRF</p>
                            <input type="number" disabled={!withholdingTaxes || invoiceData !== null}{...register("irrfTax", { valueAsNumber: true, min: { value: 0, message: "O valor do imposto não pode ser negativo" } })} />
                        </label>
                        <label>
                            <p>CSLL</p>
                            <input type="number" disabled={!withholdingTaxes || invoiceData !== null} {...register("csllTax", { valueAsNumber: true, min: { value: 0, message: "O valor do imposto não pode ser negativo" } })} />
                        </label>
                        <label>
                            <p>COFINS</p>
                            <input type="number" disabled={!withholdingTaxes || invoiceData !== null} {...register("cofinsTax", { valueAsNumber: true, min: { value: 0, message: "O valor do imposto não pode ser negativo" } })} />
                        </label>
                        <label>
                            <p>INSS</p>
                            <input type="number" disabled={!withholdingTaxes || invoiceData !== null} {...register("inssTax", { valueAsNumber: true, min: { value: 0, message: "O valor do imposto não pode ser negativo" } })} />
                        </label>
                        <label>
                            <p>PIS</p>
                            <input type="number" disabled={!withholdingTaxes || invoiceData !== null} {...register("pisTax", { valueAsNumber: true, min: { value: 0, message: "O valor do imposto não pode ser negativo" } })} />
                        </label>
                    </div>


                    <div className={Style.contractFormRow}>
                        <label className={Style.contractFormLabelInline}>
                            <input type="checkbox" disabled={invoiceData !== null} {...register("technicalRetention")} />
                            <p>Retenção Técnica</p>
                        </label>
                    </div>
                    <div className={`${Style.contractFormRow} ${Style.contractFormTechRetention}`}>
                        <label>
                            <p>Valor</p>
                            <input type="number" disabled={!technicalRetention || invoiceData !== null} />
                        </label>
                        <label>
                            <p>Percentual</p>
                            <input type="number" disabled={!technicalRetention || invoiceData !== null} {...register("technicalRetentionPercent", { valueAsNumber: true, min: 0 })} />
                        </label>
                    </div>
                    {invoiceData === null &&
                        <div className={`${Style.contractFormRow} ${Style.contractFormAttachment}`}>
                            <input type="file" {...register("attachment", { required: "Você precisa anexar a nota fiscal." })} />
                        </div>
                    }

                </form>

                {formErrorMessage &&
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>Dados incompletos.</AlertTitle>
                        <AlertDescription>
                            <p>{formErrorMessage}</p>
                        </AlertDescription>
                    </Alert>
                }
            </div>
        </PagamentoFornecedor>
    );
}