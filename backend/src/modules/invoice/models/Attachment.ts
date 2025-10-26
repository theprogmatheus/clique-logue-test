export class Attachment {

    id?: string;
    invoiceId?: string;
    name?: string;
    path?: string;
    size?: number;

    constructor(attachment: Attachment) {
        Object.assign(this, attachment);
    }
}