import { User } from "../types"
import { PoolClient } from "pg"

export interface IUserData {
    createUser(client: PoolClient, user: User): void
    getUserByEmail(client: PoolClient, email: string): Promise<User | undefined>
}