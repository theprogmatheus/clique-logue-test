import type { User } from "@/modules/user/models/User.js";

export interface UserRepository {

    getUserById(id: string): Promise<User>;
    getUserByName(username: string): Promise<User>;
    saveUser(user: User): Promise<User>;
    deleteUser(userId: string): Promise<boolean>;

}