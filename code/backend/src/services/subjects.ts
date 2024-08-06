import dotenv from "dotenv"
import { sqlTransactionHandler } from "../data/handlers"
import { ISubjectsServices } from "../domain/interfaces/services"
import { Subject } from "../domain/types"
import { v4 as uuidv4 } from 'uuid'
import { validateId } from "./utils"
import SubjectsData from "../data/subjects"
dotenv.config()
  
export class SubjectsServices implements ISubjectsServices {
    subjectsData: SubjectsData

    constructor(subjectsData: SubjectsData) {
        this.subjectsData = subjectsData
    }

    addSubject = async (studentId: string, subName: string): Promise<Subject> => {
        return sqlTransactionHandler(async (client) => {
            const newUUID = uuidv4()
            await this.subjectsData.addSubject(client, studentId, newUUID, subName)
            return { id: newUUID, name: subName }
        })
    }

    deleteSubject = async (subId: string): Promise<void> => {
        return sqlTransactionHandler(async (client) => {
            validateId(subId)
            await this.subjectsData.deleteSubject(client, subId)
        })
    }

    addGrade = async (subId: string, grade: number): Promise<void> => {
        return sqlTransactionHandler(async (client) => {
            validateId(subId)
            await this.subjectsData.addGrade(client, subId, grade)
        })
    }

    deleteGrade = async (subId: string): Promise<void> => {
        return sqlTransactionHandler(async (client) => {
            validateId(subId)
            await this.subjectsData.deleteGrade(client, subId)
        })
    }
}