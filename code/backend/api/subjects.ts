import { ISubjectsApi } from "../domain/interfaces/api"
import { Request, Response } from "express"
import { apiHandler } from "./handlers"
import { SubjectsServices } from "../services/subjects"

export default class SubjectsApi implements ISubjectsApi {
    subjectsServices: SubjectsServices

    constructor(subjectsServices: SubjectsServices) {
        this.subjectsServices = subjectsServices
    }

    addSubject = async (req: Request, res: Response) => {
        await apiHandler(res, async () => {
            const newSubject = await this.subjectsServices.addSubject(req.params.studentId, req.body.name)
            res.status(201).json(newSubject)
        })
    }

    deleteSubject = async (req: Request, res: Response) => {
        await apiHandler(res, async () => {
            await this.subjectsServices.deleteSubject(req.params.subjectId)
            res.status(204).json()
        })
    }

    addGrade = async (req: Request, res: Response) => {
        await apiHandler(res, async () => {
            await this.subjectsServices.addGrade(req.params.subjectId, req.body.grade)
            res.status(204).json()
        })
    }

    deleteGrade = async (req: Request, res: Response) => {
        await apiHandler(res, async () => {
            await this.subjectsServices.deleteGrade(req.params.subjectId)
            res.status(204).json()
        })
    }
}