import express from "express"
import dotenv from "dotenv"
import AuthApi from "./api/auth"
import { AuthServices } from "./services/auth"
import UserData from "./data/users"
dotenv.config()

const app = express()
const serverPort = process.env.PORT || 5555

// Auth
const userData = new UserData()
const authServices = new AuthServices(userData)
const authApi = new AuthApi(authServices)

app.use(express.json())

// Auth Endpoints
app.post("/api/login", authApi.login)
app.post("/api/register", authApi.register)

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})
