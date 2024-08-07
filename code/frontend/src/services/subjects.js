import { API_URL } from "../utils/constants"
import { getToken } from "./storage"

export async function addSubject(student_id, name) {
    const response = await addSubjectRequest(student_id, name)

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    const data = await response.json()
    return data
}

export async function deleteSubject(id) {
    const response = await deleteSubjectRequest(id) 

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    return true
}

export async function addGrade(subject_id, grade) {
    if (!isGradeValid(grade)) return false
    const response = await addGradeRequest(subject_id, grade) 

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    return true
}

export async function removeGrade(id) {
    const response = await removeGradeRequest(id)   

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    return true
}

async function deleteSubjectRequest(id) {
    return await fetch(`${API_URL}/subject/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

async function addSubjectRequest(student_id, name) {
    return await fetch(`${API_URL}/student/${student_id}/subject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ name })
    })
}

async function removeGradeRequest(id) {
    return await fetch(`${API_URL}/subject/${id}/grade`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

async function addGradeRequest(id, grade) {
    return await fetch(`${API_URL}/subject/${id}/grade`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ grade })
    })
}

function isGradeValid(grade) {
    return Number.isInteger(Number(grade)) && grade >= 1 && grade <= 100
}