import PagamentoFornecedor from "@/pages/templates/PagamentoFornecedor";
import Style from "@/pages/Contratos/index.module.scss";

export default function Contratos() {
    return (
        <PagamentoFornecedor
            moduleName="Contratos Vinculados"
            company={{
                name: "Razão Social do Fornecedor Logado",
                comercialName: "Nome Fantasia do Fornecedor Logado",
                cnpj: "00.000.000/000-00"
            }}
        >
            <div className={Style.table}>
                <div className={`${Style.line} ${Style.description}`}>
                    <div></div>
                    <div>
                        <p>Nome do Contrato</p>
                    </div>
                    <div>
                        <p>Código do Contrato</p>
                    </div>
                    <div>
                        <p>Retenção Técnica</p>
                    </div>
                    <div>
                        <p>Detalhes</p>
                    </div>
                </div>

                <div className={Style.line}>
                    <div>
                        <label className={Style.checkbox}>
                            <input type="checkbox" />
                            <span className={Style.checkmark}></span>
                        </label>
                    </div>

                    <div>
                        <p>Titulo do primeiro contrato de exemplo</p>
                    </div>
                    <div>
                        <p>11002200-01 </p>
                    </div>

                    <div >
                        <p className={Style.techRetention}>
                            12%
                        </p>
                    </div>

                    <div>
                        <button className={Style.buttonDetails}>&#x1F50D;</button>
                    </div>

                </div>
            </div>
        </PagamentoFornecedor>
    );
}