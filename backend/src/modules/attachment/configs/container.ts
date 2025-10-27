import { AttachmentController } from "@/modules/attachment/controllers/AttachmentController.js";
import { AttachmentRepositoryImpl } from "@/modules/attachment/repositories/impl/AttachmentRepositoryImpl.js";
import { AttachmentService } from "@/modules/attachment/services/AttachmentService.js";
import { invoiceRepository } from "@/modules/invoice/configs/container.js";

const attachmentRepository = new AttachmentRepositoryImpl();
const attachmentService = new AttachmentService(attachmentRepository, invoiceRepository);
const attachmentController = new AttachmentController(attachmentService);

export {
    attachmentController, attachmentRepository,
    attachmentService
};
