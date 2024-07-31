import { Request, Response } from "express"

export interface IAuthApi {
    login(req: Request, res: Response): void
    register(req: Request, res: Response): void
}