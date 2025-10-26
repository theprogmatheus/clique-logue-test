export class User {

    public id?: string;
    public name?: string;
    public password?: string;

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}