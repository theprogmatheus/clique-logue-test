import logo from "@/assets/images/logo.png";

export default function Consulta() {
    return (
        <div>
            <form>
                <img src={logo} />
                <h1>Pagamento de Fornecedor</h1>
                <label>CNPJ</label>
                <input type="text" />
                <button>Acessar</button>
            </form>
        </div>
    );
}