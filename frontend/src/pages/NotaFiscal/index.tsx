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
            <div className={Style.content}>
                <p>TODO</p>
            </div>
        </PagamentoFornecedor>
    );
}