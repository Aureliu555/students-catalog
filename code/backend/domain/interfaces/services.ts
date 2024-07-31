import { SimpleUser, User } from "../types"

export interface IAuthServices {
    register(name: string, password: string, email: string, birth_date: bigint): Promise<SimpleUser>
    login(email: string, password: string): Promise<SimpleUser>
}