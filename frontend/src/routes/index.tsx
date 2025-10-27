import { BrowserRouter, Routes, Route } from "react-router-dom";
import Consulta from "@/pages/Consulta";
import Contratos from "@/pages/Contratos";
import NotaFiscal from "@/pages/NotaFiscal";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Consulta />} />
                <Route path="/contratos" element={<Contratos />} />
                <Route path="/notafiscal" element={<NotaFiscal />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}