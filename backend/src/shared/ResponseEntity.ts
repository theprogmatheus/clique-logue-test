export class ResponseEntity<T> {

    public status: number;
    public body: T;
    public message?: string;


    constructor(response: Partial<ResponseEntity<T>>) {
        if (!(response.status && response.body))
            throw new Error("Status and Body can't be null.");

        this.status = response.status;
        this.body = response.body;

        if (response.message)
            this.message = response.message;
    }
}