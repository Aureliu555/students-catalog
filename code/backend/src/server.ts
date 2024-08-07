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
import SubjectsData from "./data/subjects"
import SubjectsApi from "./api/subjects"
import { SubjectsServices } from "./services/subjects"
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

// Subjects
const subjectsData = new SubjectsData()
const subjectsServices = new SubjectsServices(subjectsData)
const subjectsApi = new SubjectsApi(subjectsServices)

app.use(cors())
app.use(express.json())

// Auth Endpoints
app.post("/login", authApi.login)
app.post("/register", authApi.register)

// Students Endpoints
app.get("/students", authorization, studentsApi.getStudents)
app.post("/students", authorization, studentsApi.addStudent)
app.delete("/student/:id", authorization, studentsApi.deleteStudent)
app.get("/student/:id", authorization, studentsApi.getStudent)

// Subjects Endpoints
app.post("/student/:studentId/subject", authorization, subjectsApi.addSubject)
app.delete("/subject/:subjectId", authorization, subjectsApi.deleteSubject)
app.put("/subject/:subjectId/grade", authorization, subjectsApi.addGrade)
app.delete("/subject/:subjectId/grade", authorization, subjectsApi.deleteGrade)

app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`)
})
