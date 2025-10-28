import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet
} from "@/components/ui/field";
import { IMaskInput } from "react-imask";
import style from "@/pages/Consulta/style.module.css";

import useAPI from "@/hooks/useAPI";
import { useState } from "react";

export default function Consulta() {
    const { getCompanyByCNPJ } = useAPI();
    const [cnpj, setCNPJ] = useState('');



    async function handleSubmit() {
        const result = await getCompanyByCNPJ(cnpj);
        console.log(result);
    }


    return (
        <div className={style.page}>
            <form className={style.form} onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
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
                    <Field>
                        <Button className={style.submitButton} type="submit">Acessar</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}