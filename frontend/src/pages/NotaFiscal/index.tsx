import PagamentoFornecedor from "@/pages/templates/PagamentoFornecedor";
import Style from "@/pages/NotaFiscal/style.module.css";

export default function NotaFiscal() {
    return (
        <PagamentoFornecedor
            moduleName="Dados da Nota Fiscal"
            company={
                {
                    name: "Razão Social do Fornecedor Logado",
                    comercialName: "Nome Fantasia do Fornecedor Logado",
                    cnpj: "00.000.000/000-00"
                }
            }
        >
            <div className={Style.container}>
                <div className={Style.contractInfo}>
                    <div className={Style.contractInfoCell}>
                        <p className={Style.contractInfoCellKey}>Código do Contrato:</p>
                        <p className={Style.contractInfoCellValue}>11002200-01</p>
                    </div>
                    <div className={Style.contractInfoCell}>
                        <p className={Style.contractInfoCellValue}>Título do segundo contrato de exemplo</p>
                    </div>
                </div>

                <form className={Style.contractForm}>
                    <div className={Style.contractFormRow}>
                        <label>
                            <p>Número da Nota</p>
                            <input type="text" />
                        </label>

                        <label>
                            <p>Data de Emissão</p>
                            <input type="date" />
                        </label>

                        <label>
                            <p>Data de Vencimento</p>
                            <input type="date" />
                        </label>

                        <label>
                            <p>Valor</p>
                            <input type="number" />
                        </label>
                    </div>

                    <div className={Style.contractFormRow}>
                        <label className={Style.contractFormLabelInline}>
                            <input type="checkbox" />
                            <p>Retenção de Impostos</p>
                        </label>
                    </div>

                    <div className={`${Style.contractFormRow} ${Style.contractFormTaxes}`}>
                        <label>
                            <p>ISSQN</p>
                            <input type="number" />
                        </label>
                        <label>
                            <p>IRRF</p>
                            <input type="number" />
                        </label>
                        <label>
                            <p>CSLL</p>
                            <input type="number" />
                        </label>
                        <label>
                            <p>COFINS</p>
                            <input type="number" />
                        </label>
                        <label>
                            <p>INSS</p>
                            <input type="number" />
                        </label>
                        <label>
                            <p>PIS</p>
                            <input type="number" />
                        </label>
                    </div>


                    <div className={Style.contractFormRow}>
                        <label className={Style.contractFormLabelInline}>
                            <input type="checkbox" />
                            <p>Retenção Técnica</p>
                        </label>
                    </div>
                    <div className={`${Style.contractFormRow} ${Style.contractFormTechRetention}`}>
                        <label>
                            <p>Valor</p>
                            <input type="number" />
                        </label>
                        <label>
                            <p>Percentual</p>
                            <input type="number" />
                        </label>
                    </div>

                    <div className={`${Style.contractFormRow} ${Style.contractFormAttachment}`}>
                        <input type="file" />
                    </div>
                </form>

            </div>
        </PagamentoFornecedor>
    );
}