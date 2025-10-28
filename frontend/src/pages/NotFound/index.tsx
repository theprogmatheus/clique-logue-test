import Style from "@/pages/NotFound/style.module.scss";
import { useLocation } from "react-router-dom";

export default function NotFound() {

    const location = useLocation();

    return (
        <div className={Style.container}>
            <div className={Style.content}>
                <h1>Erro 404 - Página não encontrada 😢</h1>
                <p>
                    O caminho <strong>{location.pathname}</strong> não existe.
                </p>
                <a href="/">Clique para voltar para a página inicial</a>
            </div>
        </div>
    );
}