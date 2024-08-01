import { NewUser, SimpleUser, User } from "../types"

export interface IAuthServices {
    register(name: string, password: string, email: string, birth_date: bigint): Promise<NewUser>
    login(email: string, password: string): Promise<NewUser>
}