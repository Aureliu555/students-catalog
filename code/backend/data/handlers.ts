import { PoolClient } from "pg"
import getPool from "./connection"

const pool = getPool()

export async function sqlTransactionHandler(action: (client: PoolClient) => Promise<any>): Promise<any> {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const res = await action(client)
        await client.query('COMMIT')
        return res
    } catch (error: any) {
        console.log("Transaction error ->", error.name)
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
}