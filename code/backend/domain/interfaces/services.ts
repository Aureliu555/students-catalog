import { User } from "../types"

export interface IAuthServices {
    register(name: string, password: string, email: string, birth_date: bigint): Promise<User>
    login(email: string, password: string): Promise<User>
}