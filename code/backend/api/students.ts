import { IStudentsApi } from "../domain/interfaces/api"
import { Request, Response } from "express"
import { apiHandler } from "./handlers"
import { StudentsServices } from "../services/students"

export default class StudentsApi implements IStudentsApi {
    studentsServices: StudentsServices

    constructor(studentsServices: StudentsServices) {
        this.studentsServices = studentsServices
    }

    getStudents = async (req: Request | any, res: Response) => {
        await apiHandler(res, async () => {
            const students = await this.studentsServices.getStudents(req.user.email)
            res.status(200).json(students)
        })
    }

    getStudent(req: Request, res: Response) {
        apiHandler(res, async () => {
            // TODO: get student
        })
    }

    addStudent = async (req: Request | any, res: Response) => {
        await apiHandler(res, async () => {
            const body = req.body
            const newStudent = await this.studentsServices.addStudent(req.user.email, body.name)
            res.status(201).json(newStudent)
        })
    }

    deleteStudent = async (req: Request, res: Response) => {
        await apiHandler(res, async () => {
            const params = req.params
            await this.studentsServices.deleteStudent(params.id)
            res.status(204).json()
        })
    }
}