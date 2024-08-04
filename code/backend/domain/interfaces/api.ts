import { Request, Response } from "express"

export interface IAuthApi {
    login(req: Request, res: Response): void
    register(req: Request, res: Response): void
}

export interface IStudentsApi {
    getStudents(req: Request, res: Response): void
    getStudent(req: Request, res: Response): void
    addStudent(req: Request, res: Response): void
    deleteStudent(req: Request, res: Response): void
}

export interface ISubjectsApi {
    addSubject(req: Request, res: Response): void
    deleteSubject(req: Request, res: Response): void
    addGrade(req: Request, res: Response): void
    deleteGrade(req: Request, res: Response): void
}