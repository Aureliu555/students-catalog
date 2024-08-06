import { SimpleStudent, Student, User } from "../types"
import { PoolClient } from "pg"

export interface IUserData {
    createUser(client: PoolClient, user: User): void
    getUserByEmail(client: PoolClient, email: string): Promise<User | null>
}

export interface IStudentsData {
    getStudents(client: PoolClient, profId: string): Promise<SimpleStudent[]>
    getStudent(client: PoolClient, id: string): Promise<Student | null>
    addStudent(client: PoolClient, profId: string, id: string, name: string): Promise<void>
    deleteStudent(client: PoolClient, id: string): Promise<void>
}

export interface ISubjectsData {
    addSubject(client: PoolClient, studentId: string, subId: string, subName: string): Promise<void>
    deleteSubject(client: PoolClient, subId: string): Promise<void>
    addGrade(client: PoolClient, subId: string, grade: number): Promise<void>
    deleteGrade(client: PoolClient, subId: string): Promise<void>
}