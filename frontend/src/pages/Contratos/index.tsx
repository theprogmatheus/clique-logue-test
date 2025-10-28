import logo from "@/assets/images/logo.png";
import style from "@/pages/Contratos/index.module.css"
import { Checkbox } from "@/components/ui/checkbox";

export default function Contratos() {
    return (
        <div className={style.page}>
            <div className={style.content}>
                <div className={style.header}>
                    <div className={style.brand}>
                        <div className={style.logo}>
                            <img src={logo} />
                        </div>
                        <h1>Pagamento de fornecedor</h1>
                    </div>
                    <div className={style.info}>
                        <div>
                            <p>Razão Social:</p>
                            <span>Razao social do fornecedor logado</span>
                        </div>
                        <div className={style.cnpj}>
                            <p>CNPJ:</p>
                            <span>00.000.000/000-00</span>
                        </div>
                        <div>
                            <p>Nome Fantasia:</p>
                            <span>Nome fantasia do fornecedor logado</span>
                        </div>
                    </div>
                </div>

                <div className={style.body}>
                    <p className={style.title}>Contratos Vinculados</p>

                    <div className={style.table}>
                        <div className={`${style.line} ${style.description}`}>
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

                        <div className={style.line}>
                            <div>
                                <label className={style.checkbox}>
                                    <input type="checkbox" />
                                    <span className={style.checkmark}></span>
                                </label>
                            </div>

                            <div>
                                <p>Titulo do primeiro contrato de exemplo</p>
                            </div>
                            <div>
                                <p>11002200-01 </p>
                            </div>

                            <div >
                                <p className={style.techRetention}>
                                    12%
                                </p>
                            </div>

                            <div>
                                <button className={style.buttonDetails}>&#x1F50D;</button>
                            </div>

                        </div>
                    </div>

                    <div className={style.footer}>
                        <div className={style.footerLogo}>
                            <img src={logo} />
                        </div>
                        <div className={style.footerButtons}>
                            <button className={style.btnAnterior}>Anterior</button>
                            <button className={style.btnProximo}>Próximo</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}