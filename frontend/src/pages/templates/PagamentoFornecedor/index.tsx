import React from "react";
import LogoImg from "@/assets/images/logo.png";
import Style from "@/pages/templates/PagamentoFornecedor/style.module.css";

export default function PagamentoFornecedor(
    { children, moduleName, company }:
        {
            children: React.ReactNode,
            moduleName: string,
            company: {
                name: string,
                comercialName: string,
                cnpj: string
            }
        }
) {
    return (
        <div className={Style.page}>
            <div className={Style.container}>
                <div className={Style.header}>
                    <div className={Style.headerLogo}>
                        <img src={LogoImg} />
                    </div>
                    <h1 className={Style.headerTitle}>Pagamento de Fornecedor</h1>
                </div>
                <div className={Style.companyInfoSection}>
                    <div className={Style.companyInfo}>
                        <p className={Style.companyInfoKey}>Razão Social:</p>
                        <p className={Style.companyInfoValue}>{company.name}</p>
                    </div>
                    <div className={`${Style.companyInfo} ${Style.companyInfoRigth}`}>
                        <p className={Style.companyInfoKey}>CNPJ:</p>
                        <p className={Style.companyInfoValue}>{company.cnpj}</p>
                    </div>
                    <div className={Style.companyInfo}>
                        <p className={Style.companyInfoKey}>Nome Fantasia:</p>
                        <p className={Style.companyInfoValue}>{company.comercialName}</p>
                    </div>
                </div>
                <div className={Style.moduleName}>
                    <p>{moduleName}</p>
                </div>
                <div className={Style.content}>
                    {children}
                </div>
                <div className={Style.footer}>
                    <div className={Style.footerLogo}>
                        <img src={LogoImg} />
                    </div>
                    <div className={Style.footerButtons}>
                        <button className={Style.footerButtonPrevious}>Anterior</button>
                        <button className={Style.footerButtonNext}>Próximo</button>
                    </div>
                    <div className={Style.footerCopyright}>
                        <span>&copy; 2022-2022 Construindo Patrimônios</span>
                    </div>
                </div>
            </div>
        </div>
    );
}