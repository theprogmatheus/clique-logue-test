import logo from "@/assets/images/logo.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet
} from "@/components/ui/field";
import useConsulta from "@/hooks/useConsulta";
import style from "@/pages/Consulta/style.module.scss";
import { AlertCircleIcon } from "lucide-react";
import { IMaskInput } from "react-imask";

export default function Consulta() {

    const { cnpj, setCNPJ, handleSubmit, alert } = useConsulta();

    return (
        <div className={style.page}>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.logo}>
                    <img src={logo} />
                </div>
                <FieldGroup>
                    <FieldSet>
                        <h1>Pagamento de Fornecedor</h1>
                    </FieldSet>
                </FieldGroup>
                <FieldGroup className={style.inputGroup}>
                    <Field>
                        <FieldLabel htmlFor="cnpj-input">
                            CNPJ
                        </FieldLabel>
                        <IMaskInput
                            value={cnpj}
                            unmask={true}
                            onAccept={v => setCNPJ(v)}
                            className={style.cnpjInput}
                            id="cnpj-input"
                            mask="00.000.000/0000-00"
                            minLength={18}
                            required
                        />
                    </Field>

                    {alert &&
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>{alert.title}</AlertTitle>
                            <AlertDescription>
                                <p>{alert.message}</p>
                            </AlertDescription>
                        </Alert>
                    }
                    <Field>
                        <Button className={style.submitButton} type="submit">Acessar</Button>
                    </Field>
                </FieldGroup>

            </form>
        </div>
    );
}