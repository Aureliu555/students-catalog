import { PoolClient } from "pg"
import { IUserData } from "../domain/interfaces/data"
import { User } from "../domain/types"

export default class UserData implements IUserData {
    createUser = async (client: PoolClient, user: User) => {
        const insert_query = `INSERT INTO users (name, email, password, birth_date) VALUES ($1, $2, $3, $4)`
        await client.query(insert_query, [user.name, user.email, user.password, user.birth_date])
    }

    getUserByEmail = async (client: PoolClient, email: string) => {
        const select_query = `SELECT * FROM users WHERE email = $1`
        const result = await client.query(select_query, [email])
        console.log("Rows ->", result.rows[0])
        return result.rows[0]
    }
}