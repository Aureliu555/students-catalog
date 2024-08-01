import { Response } from "express";
import { HttpError, mapAppErrorToHttpError } from "../errors/http";

export async function apiHandler(res: Response, action: () => Promise<any>) {
    try {
        await action()
    } catch (error: any) {
        console.log("Error ->", error)
        const httpError: HttpError = mapAppErrorToHttpError(error) 
        res.status(httpError.code).send(httpError.message)
    }
}