import { validate } from "uuid";
import { InvalidIdError } from "../errors/app";

export function validateId(id: string): void {
    if (!validate(id)) throw InvalidIdError
}