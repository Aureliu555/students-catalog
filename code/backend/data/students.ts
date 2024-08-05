import { PoolClient } from "pg"
import { IStudentsData } from "../domain/interfaces/data"
import { SimpleStudent, Student } from "../domain/types"

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

    getStudent = async (client: PoolClient, id: string): Promise<Student | null> => {
        const get_student_query = `SELECT * FROM students WHERE id = $1`
        const get_students_subjects_query = `SELECT id, name, grade FROM subjects WHERE student_id = $1`

        const studentRes = await client.query(get_student_query, [id])
        if (studentRes.rows.length === 0) return null
        
        const subjectsRes = await client.query(get_students_subjects_query, [id])
        const student = studentRes.rows[0]
        return { id: student.id, name: student.name, subjects: subjectsRes.rows }
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

    resToStudent(rows: any[]): Student {
        if (rows.length === 0) return { id: "a", name: "b", subjects: [] }
        const { student_id, student_name } = rows[0]
        const subjects = rows.map((r) => { 
            const { subject_id, subject_name, grade } = r
            return { name: subject_name, id: subject_id, grade }
        })

        return { id: student_id, name: student_name, subjects }
    }
}