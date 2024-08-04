import { UUID } from "crypto"
import { SimpleStudent, Student, User } from "../types"
import { PoolClient } from "pg"

export interface IUserData {
    createUser(client: PoolClient, user: User): void
    getUserByEmail(client: PoolClient, email: string): Promise<User | undefined>
}

export interface IStudentsData {
    getStudents(client: PoolClient, profId: string): Promise<SimpleStudent[]>
    getStudent(client: PoolClient, id: string): Promise<Student | undefined>
    addStudent(client: PoolClient, profId: string, id: string, name: string): void
    deleteStudent(client: PoolClient, id: string): void
}