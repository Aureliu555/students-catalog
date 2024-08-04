import { NewUser, SimpleStudent, Student, Subject } from "../types"

export interface IAuthServices {
    register(name: string, password: string, email: string, birth_date: bigint): Promise<NewUser>
    login(email: string, password: string): Promise<NewUser>
}

export interface IStudentsServices {
    getStudents(profId: string): Promise<SimpleStudent[]>
    getStudent(id: string): Promise<Student>
    addStudent(profId: string, name: string): Promise<SimpleStudent>
    deleteStudent(id: string): Promise<void>
}

export interface ISubjectsServices {
    addSubject(studentId: string, subName: string): Promise<Subject>
    deleteSubject(subId: string): Promise<void>
    addGrade(subId: string, grade: number): Promise<void>
    deleteGrade(subId: string): Promise<void>
}