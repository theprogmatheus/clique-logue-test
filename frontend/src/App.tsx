import AppRoutes from "@/routes";
import "@/styles/index.css";
import { AppContextProvider } from "@/contexts/AppContext";

export default function App() {
    return (
        <AppContextProvider>
            <AppRoutes />
        </AppContextProvider>
    );
}