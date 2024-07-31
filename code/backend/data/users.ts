import { Pool } from "pg"
import { IUserData } from "../domain/interfaces/data"
import { User } from "../domain/types"
import getPool from "./connection"

export default class UserData implements IUserData {
    pool: Pool

    constructor() {
        this.pool = getPool()
    }

    createUser = async (user: User) => {
        console.log("Inside createUser with pool -> ", this.pool)
        const client = await this.pool.connect()
        console.log("client -> ", client)
        try {
            await client.query('BEGIN')
            const insert_query = `INSERT INTO users (name, email, password, birth_date) VALUES ($1, $2, $3, $4)`
            const result = await this.pool.query(insert_query, [user.name, user.email, user.password, user.birth_date])
            await client.query('COMMIT')
            console.log("commit with result -> ", result.rows[0])
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('Transaction error', error)
        } finally {
            client.release()
        }
    }
}