export class Attachment {

    public id?: string;
    public invoiceId?: string;
    public name?: string;
    public path?: string;
    public size?: number;

    constructor(attachment: Attachment) {
        Object.assign(this, attachment);
    }
}