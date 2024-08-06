import { Pool } from "pg"
import dotenv from "dotenv"
dotenv.config()

// if the localhost database does not accept ssl connection, set (ssl: false) when using local connection
export default function getPool(): Pool {
    return new Pool({
        connectionString: process.env.DB_URL, 
        ssl: {
            rejectUnauthorized: false 
        },
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    })
}

