import type { User } from "@/modules/user/models/User.js";
import type { UserRepository } from "@/modules/user/repositories/UserRepository.js";

export class UserRepositoryImpl implements UserRepository {

    async getUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async getUserByName(username: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async saveUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}