import express from "express"
import dotenv from "dotenv"
import AuthApi from "./api/auth"
import { AuthServices } from "./services/auth"
import UserData from "./data/users"
import { authorization } from "./api/middlewares"
import cors from "cors"
import StudentsData from "./data/students"
import { StudentsServices } from "./services/students"
import StudentsApi from "./api/students"
dotenv.config()

const app = express()
const serverPort = process.env.PORT || 5555

// Auth
const userData = new UserData()
const authServices = new AuthServices(userData)
const authApi = new AuthApi(authServices)

// Students
const studentsData = new StudentsData()
const studentsServices = new StudentsServices(studentsData)
const studentsApi = new StudentsApi(studentsServices)

app.use(cors())
app.use(express.json())

// Auth Endpoints
app.post("/api/login", authApi.login)
app.post("/api/register", authApi.register)

// Test endpoint with authorization middleware
app.get("/api/students", authorization, studentsApi.getStudents)
app.post("/api/student", authorization, studentsApi.addStudent)
app.delete("/api/student/:id", authorization, studentsApi.deleteStudent)

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})
