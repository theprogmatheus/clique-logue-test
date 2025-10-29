import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Contract } from "@/types/Contract";
import useContractDetails from "@/hooks/useContractDetails";

interface ContractDetailsModelProps {
    contract: Contract;
}

export default function ContractDetailsModel({ contract }: ContractDetailsModelProps) {
    const { navigate, notasFiscais } = useContractDetails(contract);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-500 hover:bg-blue-600 cursor-pointer">&#x1F50D;</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Detalhes do Contrato</DialogTitle>
                    <DialogDescription>
                        Informações completas do contrato selecionado.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-2">
                    <p><strong>Nome:</strong> {contract.name}</p>
                    <p><strong>Código:</strong> {contract.code}</p>
                    <p><strong>Retenção Técnica:</strong> {contract.technicalRetention}%</p>

                    {notasFiscais.length > 0 &&
                        (
                            <div>
                                <h3><strong>Notas Fiscais</strong></h3>
                                <ul>
                                    {notasFiscais.map((invoice, index) => (
                                        <li key={index} className="flex flex-col m-2 border-gray-500 border-1 p-1">
                                            <p><strong>Código:</strong> {invoice.code}</p>
                                            <p><strong>Valor:</strong> R$ {invoice.value / 100}</p>
                                            <p><strong>Emissão:</strong> {new Date(invoice.issueDate).toLocaleDateString(navigator.language)}</p>
                                            <p><strong>Vencimento:</strong> {new Date(invoice.dueDate).toLocaleDateString(navigator.language)}</p>
                                            <a
                                                href={`/notafiscal/${invoice.id}`}
                                                target="_blank"
                                                className="bg-blue-500 text-white p-1 rounded-sm text-center cursor-pointer"
                                            >Detalhes</a>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        )
                    }
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}