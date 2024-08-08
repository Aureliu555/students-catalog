import { requestHandler } from "./handlers"
import { getStudentsRequest, addStudentRequest, deleteStudentRequest, getStudentRequest } from "../requests/students"

export async function getStudents() {
    return await requestHandler(() => getStudentsRequest(), true)
}

export async function addStudent(name) {
    if (!name) return false
    return await requestHandler(() => addStudentRequest(name), true)
}

export async function deleteStudent(id) {
    return await requestHandler(() => deleteStudentRequest(id))
}

export async function getStudent(id) {
    return await requestHandler(() => getStudentRequest(id), true)
}
