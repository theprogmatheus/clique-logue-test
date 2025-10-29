import LogoImg from "@/assets/images/logo.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Style from "@/pages/templates/PagamentoFornecedor/style.module.css";
import type { Company } from "@/types/Company";
import { formatCNPJ } from "@/utils/CNPJUtil";
import { AlertCircleIcon } from "lucide-react";
import React from "react";

export default function PagamentoFornecedor(
    {
        children,
        moduleName,
        company,
        alert,
        handleNextButton,
        handlePreviousButton
    }: {
        children: React.ReactNode,
        moduleName: string,
        company: Company | null,
        alert: { title: string, message: string } | null
        handleNextButton: () => void,
        handlePreviousButton: () => void
    }
) {
    if (company == null)
        return children;
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
                        <p className={Style.companyInfoValue}>{formatCNPJ(company.cnpj)}</p>
                    </div>
                    <div className={Style.companyInfo}>
                        <p className={Style.companyInfoKey}>Nome Fantasia:</p>
                        <p className={Style.companyInfoValue}>{company.comercialName}</p>
                    </div>
                </div>
                <div className={Style.moduleName}>
                    <p>{moduleName}</p>
                </div>
                {alert &&
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>
                            <p>{alert.message}</p>
                        </AlertDescription>
                    </Alert>
                }
                <div className={Style.content}>
                    {children}
                </div>
                <div className={Style.footer}>
                    <div className={Style.footerLogo}>
                        <img src={LogoImg} />
                    </div>
                    <div className={Style.footerButtons}>
                        <button className={Style.footerButtonPrevious} onClick={handlePreviousButton}>Anterior</button>
                        <button className={Style.footerButtonNext} onClick={handleNextButton}>Próximo</button>
                    </div>
                    <div className={Style.footerCopyright}>
                        <span>&copy; 2022-2022 Construindo Patrimônios</span>
                    </div>
                </div>
            </div>
        </div>
    );
}