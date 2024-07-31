import { IAuthApi } from "../domain/interfaces/api"
import { Request, Response } from "express"
import { IAuthServices } from "../domain/interfaces/services"

export default class AuthApi implements IAuthApi {
    authService: IAuthServices

    constructor(authService: IAuthServices) {
        this.authService = authService
    }

    login = async (req: Request, res: Response) => {
        
    }

    register = async (req: Request, res: Response) => {
        const body = req.body
        const user = await this.authService.register(body.name, body.password, body.email, body.birth_date)
        res.status(201).send(user)
        console.log(user)
    }

    getRegisterUser(req: Request) {
        return {
            name: req.body.name,
            email: req.body.email, 
            password: req.body.password,
            birth_date: req.body.birth_date
        }
    }
}