import type { User } from "@/modules/user/models/User.js";
import type { UserRepository } from "@/modules/user/repositories/UserRepository.js";

export class UserService {

    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async register(user: User): Promise<any> {
    }

    async login() {

    }
}