import dotenv from "dotenv"
import { sqlTransactionHandler } from "../data/handlers"
import { IStudentsServices } from "../domain/interfaces/services"
import { SimpleStudent } from "../domain/types"
import { validate, v4 as uuidv4 } from 'uuid'
import StudentsData from "../data/students"
import { InvalidIdError } from "../errors/app"
dotenv.config()
  
export class StudentsServices implements IStudentsServices {
    studentsData: StudentsData

    constructor(studentsData: StudentsData) {
        this.studentsData = studentsData
    }

    getStudents(profId: string): Promise<SimpleStudent[]> {
        return sqlTransactionHandler(async (client) => {
            const students = await this.studentsData.getStudents(client, profId)
            return students
        })
    }

    getStudent(id: string) { // return type missing
        return sqlTransactionHandler(async (client) => {
            
        })
    }

    addStudent(profId: string, name: string): Promise<SimpleStudent> {
        return sqlTransactionHandler(async (client) => {
            const newUUID = uuidv4()
            await this.studentsData.addStudent(client, profId, newUUID, name)
            return { id: newUUID, name }
        })
    }

    deleteStudent(id: string): Promise<void> {
        return sqlTransactionHandler(async (client) => {
            if (!validate(id)) throw InvalidIdError
            await this.studentsData.deleteStudent(client, id)
        })
    }
}