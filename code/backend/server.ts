import express from "express"
import dotenv from "dotenv"
import AuthApi from "./api/auth"
import { AuthServices } from "./services/auth"
import  getPool from "./data/connection"
dotenv.config()

const app = express()
const serverPort = process.env.PORT || 5555

// Auth
const authServices = new AuthServices()
const authApi = new AuthApi(authServices)

const pool = getPool()

app.use(express.json())

// Auth Endpoints
app.get("/api/login", authApi.login)
app.get("/api/register", authApi.register)

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})
