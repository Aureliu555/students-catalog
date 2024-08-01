import { IAuthApi } from "../domain/interfaces/api"
import { Request, Response } from "express"
import { IAuthServices } from "../domain/interfaces/services"
import { apiHandler } from "./handlers"

export default class AuthApi implements IAuthApi {
    authService: IAuthServices

    constructor(authService: IAuthServices) {
        this.authService = authService
    }

    login = async (req: Request, res: Response) => {
        await apiHandler(res, async () => {
            const body = req.body
            const user = await this.authService.login(body.email, body.password)
            res.status(200).send(user)
        })
    }

    register = async (req: Request, res: Response) => {
        await apiHandler(res, async () => {
            const body = req.body
            const user = await this.authService.register(body.name, body.password, body.email, body.birth_date)
            res.status(201).send(user)
        })
    }
}