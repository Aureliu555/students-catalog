import { PoolClient } from "pg"
import { IStudentsData } from "../domain/interfaces/data"
import { SimpleStudent } from "../domain/types"

export default class StudentsData implements IStudentsData {
    getStudents = async (client: PoolClient, profId: string): Promise<SimpleStudent[]> => {
        const get_students_query = `
                SELECT s.id, s.name
                FROM students s
                JOIN users_students us ON s.id = us.student_id
                WHERE us.user_email = $1;
            `
        const result = await client.query(get_students_query, [profId])
        return result.rows
    }

    getStudent = async (client: PoolClient, id: string) => {
        // TODO: get student
        return undefined
    }

    addStudent = async (client: PoolClient, profId: string, id: string, name: string): Promise<void> => {
        const insert_query_st = `INSERT INTO students (id, name) VALUES ($1, $2)`
        const insert_query_ust = `INSERT INTO users_students (user_email, student_id) VALUES ($1, $2)`
        await client.query(insert_query_st, [id, name])
        await client.query(insert_query_ust, [profId, id])
    }

    deleteStudent = async (client: PoolClient, id: string): Promise<void> => { 
        const delete_query = `DELETE FROM students WHERE id = $1`
        await client.query(delete_query, [id])
    }
}