import dotenv from "dotenv"
import { sqlTransactionHandler } from "../data/handlers"
import { IStudentsServices } from "../domain/interfaces/services"
import { SimpleStudent, Student } from "../domain/types"
import { v4 as uuidv4 } from 'uuid'
import StudentsData from "../data/students"
import { validateId } from "./utils"
import { InvalidIdError, InvalidParamsError, NotFoundError } from "../errors/app"
dotenv.config()
  
export class StudentsServices implements IStudentsServices {
    studentsData: StudentsData

    constructor(studentsData: StudentsData) {
        this.studentsData = studentsData
    }

    getStudents = async (profId: string): Promise<SimpleStudent[]> => {
        return await sqlTransactionHandler(async (client) => {
            const students = await this.studentsData.getStudents(client, profId)
            return students
        })
    }

    getStudent = async (id: string): Promise<Student> => {
        return await sqlTransactionHandler(async (client) => {
            validateId(id)
            const student = await this.studentsData.getStudent(client, id)
            if (!student) throw NotFoundError
            return student
        })
    }

    addStudent = async (profId: string, name: string): Promise<SimpleStudent> => {
        return await sqlTransactionHandler(async (client) => {
            if (!name) throw InvalidParamsError

            const newUUID = uuidv4()
            await this.studentsData.addStudent(client, profId, newUUID, name)
            return { id: newUUID, name }
        })
    }

    deleteStudent = async (id: string): Promise<void> => {
        return await sqlTransactionHandler(async (client) => {
            validateId(id)
            await this.studentsData.deleteStudent(client, id)
        })
    }
}