import PagamentoFornecedor from "@/pages/templates/PagamentoFornecedor";
import Style from "@/pages/Contratos/index.module.scss";
import useContrato from "@/hooks/useContrato";

export default function Contratos() {

    const {
        company,
        contracts,
        selectedContract,
        alert,
        showContractDetails,
        handlePreviousButton,
        handleNextButton,
        handleSelectContract
    } = useContrato();

    return (
        <PagamentoFornecedor
            moduleName="Contratos Vinculados"
            company={company}
            alert={alert}
            handleNextButton={handleNextButton}
            handlePreviousButton={handlePreviousButton}
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
                {contracts.map((contract, index) => (
                    <div className={Style.line} key={index}>
                        <div>
                            <label className={Style.checkbox}>
                                <input checked={contract === selectedContract} type="checkbox" onClick={() => handleSelectContract(contract)} />
                                <span className={Style.checkmark}></span>
                            </label>
                        </div>
                        <div>
                            <p>{contract.name}</p>
                        </div>
                        <div>
                            <p>{contract.code}</p>
                        </div>
                        <div >
                            <p className={Style.techRetention}>
                                {contract.technicalRetention}%
                            </p>
                        </div>
                        <div>
                            <button className={Style.buttonDetails} onClick={() => showContractDetails(contract)}>&#x1F50D;</button>
                        </div>
                    </div>
                ))}

            </div>
        </PagamentoFornecedor>
    );
}