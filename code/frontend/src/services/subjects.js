import { requestHandler } from "./handlers"
import { addSubjectRequest, deleteSubjectRequest, addGradeRequest, removeGradeRequest } from "../requests/subjects"

export async function addSubject(student_id, name) {
    return await requestHandler(() => addSubjectRequest(student_id, name), true)
}

export async function deleteSubject(id) {
    return await requestHandler(() => deleteSubjectRequest(id))
}

export async function addGrade(subject_id, grade) {
    if (!isGradeValid(grade)) return false
    return await requestHandler(() => addGradeRequest(subject_id, grade))
}

export async function removeGrade(id) {
    return await requestHandler(() => removeGradeRequest(id))
}

function isGradeValid(grade) {
    return Number.isInteger(Number(grade)) && grade >= 1 && grade <= 100
}