import { contractRepository } from "@/modules/contract/configs/container.js";
import { InvoiceController } from "@/modules/invoice/controllers/InvoiceController.js";
import { InvoiceRepositoryImpl } from "@/modules/invoice/repositories/impl/InvoiceRepositoryImpl.js";
import { InvoiceService } from "@/modules/invoice/services/InvoiceService.js";

const invoiceRepository = new InvoiceRepositoryImpl();
const invoiceService = new InvoiceService(invoiceRepository, contractRepository);
const invoiceController = new InvoiceController(invoiceService);

export {
    invoiceController, invoiceRepository,
    invoiceService
};

