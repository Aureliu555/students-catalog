import { Pool } from "pg"
import dotenv from "dotenv"
dotenv.config()

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined 
const dbMaxConnections = process.env.DB_MAX_CONNECTIONS ? parseInt(process.env.DB_MAX_CONNECTIONS) : undefined
const dbIdleTimeoutMillis = process.env.DB_IDLE_TIMEOUT_MS ? parseInt(process.env.DB_IDLE_TIMEOUT_MS) : undefined
const dbConnectionTimeoutMillis = process.env.DB_CONNECTION_TIMEOUT_MS ? parseInt(process.env.DB_CONNECTION_TIMEOUT_MS) : undefined

export default function getPool(): Pool {
    return new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: dbPort,
        max: dbMaxConnections,
        idleTimeoutMillis: dbIdleTimeoutMillis,
        connectionTimeoutMillis: dbConnectionTimeoutMillis
    })
}

