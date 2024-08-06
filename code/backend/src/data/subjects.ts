import { PoolClient } from "pg"
import { ISubjectsData } from "../domain/interfaces/data"

export default class SubjectsData implements ISubjectsData {
    addSubject = async (client: PoolClient, studentId: string, subId: string, subName: string): Promise<void> => {
        const insert_query = `INSERT INTO subjects (id, name, student_id) VALUES ($1, $2, $3)`
        await client.query(insert_query, [subId, subName, studentId])
    }

    deleteSubject = async (client: PoolClient, subId: string): Promise<void> => {
        const delete_query = `DELETE FROM subjects WHERE id = $1`
        await client.query(delete_query, [subId])
    }

    addGrade = async (client: PoolClient, subId: string, grade: number): Promise<void> => {
        const insert_query = `UPDATE subjects SET grade = $1 WHERE id = $2`
        await client.query(insert_query, [grade, subId])
    }

    deleteGrade = async (client: PoolClient, subId: string): Promise<void> => {
        const insert_query = `UPDATE subjects SET grade = NULL WHERE id = $1`
        await client.query(insert_query, [subId])
    }
}